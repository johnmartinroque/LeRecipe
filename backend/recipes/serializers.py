from rest_framework import serializers
from .models import Recipe, Step, Bookmark

class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = ['id', 'stepname', 'description', 'image', 'video']

class RecipeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['id', 'name', 'image', 'description']

class RecipeSerializer(serializers.ModelSerializer):
    steps = StepSerializer(many=True, read_only=True)

    class Meta:
        model = Recipe
        fields = ['id', 'user', 'name', 'image', 'description', 'steps']
        read_only_fields = ['user']

class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = ['id', 'user', 'recipe']
        read_only_fields = ['user']


        