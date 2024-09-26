from django.urls import path
from . import views


urlpatterns = [
    path('recipes/', views.getRecipes, name="Recipes"),
    path('recipe/<int:pk>/', views.getRecipe, name='Recipe'),
]
