from rest_framework import serializers
from .models import Recipe, Step, Bookmark, Comment

class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = ['id', 'stepname', 'description', 'image', 'video']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'user', 'text', 'created_at', 'rating']
        read_only_fields = ['user', 'recipe', 'created_at']

class RecipeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['id', 'name', 'image', 'description']

class RecipeSerializer(serializers.ModelSerializer):
    steps = StepSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Recipe
        fields = ['id', 'user', 'name', 'image', 'description', 'steps', 'comments', 'average_rating']
        read_only_fields = ['user']

class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = ['id', 'user', 'recipe']
        read_only_fields = ['user']


        
