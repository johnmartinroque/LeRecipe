from django.urls import path
from . import views
from .views import RecipeCreateView, FoodOfTheMonthView, FoodOfTheWeekView, RandomRecipesView

urlpatterns = [
    path('recipes/', views.getRecipes, name="Recipes"),
    path('recipe/<int:pk>/', views.getRecipe, name='Recipe'),
    path('recipe/<int:pk>/comments/', views.list_recipe_comments, name='recipe-comment-list'),
    path('recipe/<int:pk>/comments/create/', views.create_recipe_comment, name='recipe-comment-list-create'),
    path('recipe/<int:pk>/comments/<int:comment_id>/update/', views.update_comment, name='recipe-comment-update'),
    path('recipe/<int:pk>/comments/<int:comment_id>/delete/', views.delete_comment, name='recipe-comment-delete'),
    path('recipes/bookmarks/', views.getBookmarks, name='getBookmarks'),
    path('recipe/bookmark/<int:pk>/', views.bookmarkRecipe, name='bookmarkRecipe'),
    path('recipe/remove-bookmark/<int:pk>/', views.removeBookmark, name='remove-bookmarkRecipe'),
    path('recipe/create/', RecipeCreateView.as_view(), name='createRecipe'),
    path('recipes/own-recipes/', views.getOwnRecipes, name='get-own-recipes'),
    path('recipes/user-recipes/<int:user_id>/', views.getUserRecipes, name='get-user-recipes'),
    path('food-of-the-week/', FoodOfTheWeekView.as_view(), name='food-of-the-week'),
    path('food-of-the-month/', FoodOfTheMonthView.as_view(), name='food-of-the-month'),
    path('random-recipes/', RandomRecipesView.as_view(), name='random-recipes'),
    path('recipe/delete/<int:pk>/', views.RecipeDeleteView.as_view(), name='delete-recipe'),
    path('recipe/update/<recipe_id>/', views.RecipeUpdateView.as_view(), name='update-recipe' ),
]
