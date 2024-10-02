from rest_framework import generics, status
from rest_framework.decorators import api_view,  permission_classes
from rest_framework.response import Response
from .models import Recipe, Bookmark, Comment
from .serializers import RecipeSerializer, RecipeListSerializer, CommentSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.exceptions import NotAuthenticated
from django.contrib.auth.models import User
from rest_framework.exceptions import NotFound

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
@permission_classes([IsAuthenticated])
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

"""
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createRecipe(request):
    serializer = RecipeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)  # Automatically assign the user
        return Response(serializer.data)
    return Response(serializer.errors, status=400)
"""
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

        # Prepare the main recipe data
        recipe_data = {
            'name': request.POST.get('name'),
            'description': request.POST.get('description'),
            'image': request.FILES.get('image'),
            'steps': steps_data,
            'ingredients': ingredients,
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
@permission_classes([IsAuthenticated])
def getUserRecipes(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        raise NotFound("User not found.")

    # Get recipes for the specified user, ordered by id descending
    recipes = Recipe.objects.filter(user=user).order_by('-id')
    serializer = RecipeListSerializer(recipes, many=True)
    return Response(serializer.data)