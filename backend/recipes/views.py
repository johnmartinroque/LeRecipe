from rest_framework import generics, status
from rest_framework.decorators import api_view,  permission_classes
from rest_framework.response import Response
from .models import Recipe, Bookmark, Comment
from .serializers import RecipeSerializer, RecipeListSerializer, CommentSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.exceptions import NotAuthenticated, PermissionDenied
from django.contrib.auth.models import User
from rest_framework.exceptions import NotFound
from django.utils import timezone
from django.db.models import Avg, Count
import random
from django.shortcuts import get_object_or_404

@api_view(['GET'])
def getRecipes(request):
    recipes = Recipe.objects.all()
    serializer = RecipeListSerializer(recipes, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getRecipe(request, pk):
    try:
        recipe = Recipe.objects.get(pk=pk)
        serializer = RecipeSerializer(recipe)
        return Response(serializer.data)
    except Recipe.DoesNotExist:
        return Response({'error': 'Recipe not found'}, status=404)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getBookmarks(request):
    bookmarks = Bookmark.objects.filter(user=request.user)
    recipes = [bookmark.recipe for bookmark in bookmarks]  # Get the bookmarked recipes
    serializer = RecipeListSerializer(recipes, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def bookmarkRecipe(request, pk):
    try:
        recipe = Recipe.objects.get(pk=pk)
        bookmark, created = Bookmark.objects.get_or_create(user=request.user, recipe=recipe)
        if created:
            return Response({'message': 'Recipe bookmarked successfully'})
        else:
            return Response({'message': 'Recipe is already bookmarked'}, status=400)
    except Recipe.DoesNotExist:
        return Response({'error': 'Recipe not found'}, status=404)
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def removeBookmark(request, pk):
    try:
        recipe = Recipe.objects.get(pk=pk)
        bookmark = Bookmark.objects.get(user=request.user, recipe=recipe)
        bookmark.delete()  # Remove the bookmark
        return Response({'message': 'Bookmark removed successfully'})
    except Recipe.DoesNotExist:
        return Response({'error': 'Recipe not found'}, status=404)
    except Bookmark.DoesNotExist:
        return Response({'error': 'Bookmark not found'}, status=404)


@api_view(['GET'])
def list_recipe_comments(request, pk):
    comments = Comment.objects.filter(recipe_id=pk)  # Fetch comments for the given recipe
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_recipe_comment(request, pk):
    try:
        recipe = Recipe.objects.get(id=pk)  # Get the recipe by its ID
    except Recipe.DoesNotExist:
        return Response({'error': 'Recipe not found.'}, status=status.HTTP_404_NOT_FOUND)

    # Deserialize the incoming data
    serializer = CommentSerializer(data=request.data)

    if serializer.is_valid():
        # Save the comment with the current user and recipe
        serializer.save(user=request.user, recipe=recipe)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_comment(request, pk, comment_id):
    try:
        comment = Comment.objects.get(id=comment_id, recipe_id=pk)  # Get the comment by its ID and recipe ID
    except Comment.DoesNotExist:
        return Response({'error': 'Comment not found.'}, status=status.HTTP_404_NOT_FOUND)

    # Check if the current user is the owner of the comment
    if comment.user != request.user:
        return Response({'error': 'You do not have permission to edit this comment.'}, status=status.HTTP_403_FORBIDDEN)

    # Deserialize the incoming data and update the comment
    serializer = CommentSerializer(comment, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_comment(request, pk, comment_id):
    try:
        comment = Comment.objects.get(id=comment_id, recipe_id=pk)  # Get the comment by its ID and recipe ID
    except Comment.DoesNotExist:
        return Response({'error': 'Comment not found.'}, status=status.HTTP_404_NOT_FOUND)

    # Check if the current user is the owner of the comment
    if comment.user != request.user:
        return Response({'error': 'You do not have permission to delete this comment.'}, status=status.HTTP_403_FORBIDDEN)

    # Delete the comment
    comment.delete()
    return Response({'message': 'Comment deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)


class RecipeCreateView(APIView):
    permission_classes = [IsAuthenticated]  # If you want only authenticated users to create recipes

    def get(self, request, *args, **kwargs):
        recipes = Recipe.objects.all()
        serializer = RecipeListSerializer(recipes, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        # Extract steps from form-data manually
        steps_data = []
        step_index = 0

        while True:
            stepname = request.POST.get(f'steps[{step_index}][stepname]')
            if stepname is None:
                break  # Stop if there's no more step data

            steps_data.append({
                'stepname': stepname,
                'description': request.POST.get(f'steps[{step_index}][description]'),
                'image': request.FILES.get(f'steps[{step_index}][image]'),
                'video': request.FILES.get(f'steps[{step_index}][video]'),
            })
            step_index += 1

        ingredients = request.POST.getlist('ingredients[]')
        tags = request.POST.getlist('tags[]')

        # Prepare the main recipe data (user field is removed)
        recipe_data = {
            'name': request.POST.get('name'),
            'description': request.POST.get('description'),
            'image': request.FILES.get('image'),
            'steps': steps_data,
            'ingredients': ingredients,
            'category': request.POST.get('category'),
            'tags': tags,
        }

        # Validate and save the recipe
        serializer = RecipeSerializer(data=recipe_data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # Attach the current logged-in user to the recipe
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        # Add logging to help debug if needed
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOwnRecipes(request):
    # Get recipes for the authenticated user, ordered by created_at descending
    recipes = Recipe.objects.filter(user=request.user).order_by('-id')
    serializer = RecipeListSerializer(recipes, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def getUserRecipes(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        raise NotFound("User not found.")

    # Get recipes for the specified user, ordered by id descending
    recipes = Recipe.objects.filter(user=user).order_by('-id')
    serializer = RecipeSerializer(recipes, many=True)
    return Response(serializer.data)


class FoodOfTheWeekView(generics.ListAPIView):
    """
    Get the recipe with the highest average rating for the current week, requiring at least 5 ratings.
    """
    serializer_class = RecipeListSerializer

    def get_queryset(self):
        # Calculate the start of the week (Monday)
        start_of_week = timezone.now() - timezone.timedelta(days=timezone.now().weekday())
        end_of_week = start_of_week + timezone.timedelta(days=7)

        # Get recipes with their average ratings for the week, requiring at least 5 ratings
        return (
            Recipe.objects
            .annotate(average_rating=Avg('comments__rating'), rating_count=Count('comments'))
            .filter(comments__created_at__range=(start_of_week, end_of_week), rating_count__gte=5)
            .order_by('-average_rating')[:1]  # Get the highest-rated recipe
        )


class FoodOfTheMonthView(generics.ListAPIView):
    """
    Get the recipe with the highest average rating for the current month, requiring at least 5 ratings.
    """
    serializer_class = RecipeListSerializer

    def get_queryset(self):
        # Calculate the start of the month
        start_of_month = timezone.now().replace(day=1)
        end_of_month = start_of_month + timezone.timedelta(days=31)
        end_of_month = end_of_month.replace(day=1)  # Move to the first of the next month

        # Get recipes with their average ratings for the month, requiring at least 5 ratings
        return (
            Recipe.objects
            .annotate(average_rating=Avg('comments__rating'), rating_count=Count('comments'))
            .filter(comments__created_at__range=(start_of_month, end_of_month), rating_count__gte=5)
            .order_by('-average_rating')[:1]  # Get the highest-rated recipe
        )
    

class RandomRecipesView(generics.ListAPIView):
    serializer_class = RecipeSerializer

    def get_queryset(self):
        # Get all recipes and return a random selection of 6
        recipes = list(Recipe.objects.all())
        return random.sample(recipes, min(len(recipes), 6))  # Ensure not to exceed available recipes


class RecipeDeleteView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can delete

    def delete(self, request, pk, *args, **kwargs):
        # Fetch the recipe based on the primary key (pk) from the URL
        recipe = get_object_or_404(Recipe, pk=pk)

        # Check if the requesting user is the owner of the recipe
        if recipe.user != request.user:
            raise PermissionDenied("You do not have permission to delete this recipe.")

        # Delete the recipe
        recipe.delete()

        return Response({"detail": "Recipe deleted successfully."}, status=status.HTTP_204_NO_CONTENT)



class RecipeUpdateView(APIView):
    permission_classes = [IsAuthenticated]  # Only authenticated users can update recipes

    def get_object(self, recipe_id):
        return get_object_or_404(Recipe, id=recipe_id)

    def put(self, request, recipe_id, *args, **kwargs):
        recipe = self.get_object(recipe_id)
        steps_data = []
        step_index = 0

        # Extract steps data from the request
        while True:
            stepname = request.POST.get(f'steps[{step_index}][stepname]')
            if stepname is None:
                break  # Stop if there's no more step data

            steps_data.append({
                'stepname': stepname,
                'description': request.POST.get(f'steps[{step_index}][description]'),
                'image': request.FILES.get(f'steps[{step_index}][image]'),
                'video': request.FILES.get(f'steps[{step_index}][video]'),
            })
            step_index += 1

        ingredients = request.POST.getlist('ingredients[]')
        tags = request.POST.getlist('tags[]')

        # Prepare the main recipe data
        recipe_data = {
            'name': request.POST.get('name'),
            'description': request.POST.get('description'),
            'image': request.FILES.get('image'),
            'steps': steps_data,
            'ingredients': ingredients,
            'category': request.POST.get('category'),
            'tags': tags,
        }

        # Validate and update the recipe
        serializer = RecipeSerializer(instance=recipe, data=recipe_data)
        if serializer.is_valid():
            serializer.save()  # Save the updated recipe
            return Response(serializer.data, status=status.HTTP_200_OK)

        # Add logging to help debug if needed
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, recipe_id, *args, **kwargs):
        # If you want to allow partial updates, you can implement a PATCH method
        recipe = self.get_object(recipe_id)
        steps_data = []
        step_index = 0

        # Extract steps data from the request
        while True:
            stepname = request.POST.get(f'steps[{step_index}][stepname]')
            if stepname is None:
                break  # Stop if there's no more step data

            steps_data.append({
                'stepname': stepname,
                'description': request.POST.get(f'steps[{step_index}][description]'),
                'image': request.FILES.get(f'steps[{step_index}][image]'),
                'video': request.FILES.get(f'steps[{step_index}][video]'),
            })
            step_index += 1

        ingredients = request.POST.getlist('ingredients[]')
        tags = request.POST.getlist('tags[]')

        # Prepare the main recipe data
        recipe_data = {
            'name': request.POST.get('name', recipe.name),  # Keep existing name if not updated
            'description': request.POST.get('description', recipe.description),  # Keep existing description
            'image': request.FILES.get('image', recipe.image),  # Keep existing image if not updated
            'steps': steps_data,
            'ingredients': ingredients,
            'category': request.POST.get('category', recipe.category),  # Keep existing category
            'tags': tags,
        }

        # Validate and update the recipe
        serializer = RecipeSerializer(instance=recipe, data=recipe_data, partial=True)  # Allow partial updates
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        # Add logging to help debug if needed
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)