from django.contrib import admin
from .models import Recipe

class RecipeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description' )  # Specify the fields you want to display in the list view
    search_fields = ('id', 'name', 'description')  # Add a search box for the name field

admin.site.register(Recipe, RecipeAdmin)
