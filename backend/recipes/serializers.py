from rest_framework import serializers
from .models import Recipe, Step, Bookmark, Comment

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
    class Meta:
        model = Recipe
        fields = ['id', 'name', 'image', 'description']

class RecipeSerializer(serializers.ModelSerializer):
    steps = StepSerializer(many=True)  # Removed read_only=True to allow writable steps
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Recipe
        fields = ['id', 'user', 'name', 'image', 'description', 'steps', 'comments', 'average_rating']
        read_only_fields = ['user']

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
        instance.save()

        if steps_data is not None:
            # Clear existing steps and create new ones
            instance.steps.all().delete()
            for step_data in steps_data:
                Step.objects.create(recipe=instance, **step_data)
        
        return instance

class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = ['id', 'user', 'recipe']
        read_only_fields = ['user']


        
