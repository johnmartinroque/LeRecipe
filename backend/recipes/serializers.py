from rest_framework import serializers
from django.db.models import Avg
from .models import Recipe, Step, Bookmark, Comment
from accounts.serializers import UserSerializer

class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = ['id', 'stepname', 'description', 'image', 'video']

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'username', 'text', 'created_at', 'rating']
        read_only_fields = ['username', 'recipe', 'created_at']

    def get_username(self, obj):
        return obj.user.username

class RecipeListSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()
    total_comments = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = ['id', 'name', 'image', 'description', 'tags', 'average_rating', 'total_comments', 'category']

    def get_average_rating(self, obj):
        comments = obj.comments.all()
        if comments.exists():
            avg_rating = comments.aggregate(avg=Avg('rating'))['avg']
            return round_to_nearest_valid_rating(avg_rating) if avg_rating is not None else None
        return None
    def get_total_comments(self, obj):
        return obj.comments.count()

class RecipeSerializer(serializers.ModelSerializer):
    steps = StepSerializer(many=True)  # Removed read_only=True to allow writable steps
    comments = CommentSerializer(many=True, read_only=True)
    total_comments = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()
    user = UserSerializer(read_only=True)

    class Meta:
        model = Recipe
        fields = '__all__'
        read_only_fields = ['comments', 'total_comments', 'average_rating']  # user is not read-only


    def get_total_comments(self, obj):
        return obj.comments.count()

    def create(self, validated_data):
        steps_data = validated_data.pop('steps')
        recipe = Recipe.objects.create(**validated_data)
        
        # Create the steps associated with the recipe
        for step_data in steps_data:
            Step.objects.create(recipe=recipe, **step_data)
        
        return recipe

    def update(self, instance, validated_data):
        steps_data = validated_data.pop('steps', None)
        
        # Update recipe fields
        instance.name = validated_data.get('name', instance.name)
        instance.image = validated_data.get('image', instance.image)
        instance.description = validated_data.get('description', instance.description)
        instance.image = validated_data.get('image', instance.image)
        instance.category = validated_data.get('category', instance.category)
        instance.ingredients = validated_data.get('ingredients', instance.ingredients)
        instance.tags = validated_data.get('tags', instance.tags)
        instance.save()

        if steps_data is not None:
            # Clear existing steps and create new ones
            instance.steps.all().delete()
            for step_data in steps_data:
                Step.objects.create(recipe=instance, **step_data)
        
        return instance

    def get_average_rating(self, obj):
        comments = obj.comments.all()
        if comments.exists():
            avg_rating = comments.aggregate(avg=Avg('rating'))['avg']
            return round_to_nearest_valid_rating(avg_rating) if avg_rating is not None else None
        return None
    
def round_to_nearest_valid_rating(avg_rating):
    acceptable_ratings = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
    return min(acceptable_ratings, key=lambda x: abs(x - avg_rating))

class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = ['id', 'user', 'recipe', 'created_at']
        read_only_fields = ['user', 'created_at']


        
