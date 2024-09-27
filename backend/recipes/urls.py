from django.urls import path
from . import views


urlpatterns = [
    path('recipes/', views.getRecipes, name="Recipes"),
    path('recipe/<int:pk>/', views.getRecipe, name='Recipe'),
    path('recipes/bookmarks/', views.getBookmarks, name='getBookmarks'),
    path('recipe/bookmark/<int:pk>/', views.bookmarkRecipe, name='bookmarkRecipe')
]
