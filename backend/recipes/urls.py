from django.urls import path
from . import views
from .views import RecipeCreateView

urlpatterns = [
    path('recipes/', views.getRecipes, name="Recipes"),
    path('recipe/<int:pk>/', views.getRecipe, name='Recipe'),
    path('recipe/<int:pk>/comments/', views.RecipeCommentListCreateView.as_view(), name='recipe-comment-list-create'),
    path('recipes/bookmarks/', views.getBookmarks, name='getBookmarks'),
    path('recipe/bookmark/<int:pk>/', views.bookmarkRecipe, name='bookmarkRecipe'),
    path('recipe/create/', RecipeCreateView.as_view(), name='createRecipe'),
    
]
