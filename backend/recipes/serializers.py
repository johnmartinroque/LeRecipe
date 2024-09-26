from rest_framework import serializers
from .models import Recipe, Step

class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = ['id', 'stepname', 'description', 'image', 'video']

class RecipeSerializer(serializers.ModelSerializer):
    steps = StepSerializer(many=True, read_only=True)

    class Meta:
        model = Recipe
        fields = ['id', 'name', 'image', 'description', 'steps']