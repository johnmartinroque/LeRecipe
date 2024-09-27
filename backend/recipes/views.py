from rest_framework.decorators import api_view,  permission_classes
from rest_framework.response import Response
from .models import Recipe, Bookmark
from .serializers import RecipeSerializer, RecipeListSerializer
from rest_framework.permissions import IsAuthenticated

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