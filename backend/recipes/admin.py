from django.contrib import admin
from .models import Recipe, Step, Comment, Bookmark

class RecipeAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'name', 'description' )  # Specify the fields you want to display in the list view
    search_fields = ('id', 'user__username', 'name', 'description')  # Add a search box for the name field

admin.site.register(Recipe, RecipeAdmin)


class StepAdmin(admin.ModelAdmin):
    list_display = ('id', 'recipe', 'stepname')  # Display the step's recipe and name
    search_fields = ('stepname',)  # Add a search box for the step name
    list_filter = ('recipe',) 
admin.site.register(Step, StepAdmin) 

class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'text', 'rating')  
    search_fields = ('text',)  
    list_filter = ('recipe',) 
admin.site.register(Comment, CommentAdmin) 


class BookmarkAdmin(admin.ModelAdmin):
    list_display = ('user', 'recipe', 'created_at')  # Fields to display in the admin list view
    search_fields = ('user__username', 'recipe__name')  # Enable searching by user and recipe
    list_filter = ('user', 'recipe')  # Filters for the sidebar

# Registering the Bookmark model with the custom BookmarkAdmin
admin.site.register(Bookmark, BookmarkAdmin)