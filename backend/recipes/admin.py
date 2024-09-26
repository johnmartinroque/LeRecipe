from django.contrib import admin
from .models import Recipe, Step

class RecipeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description' )  # Specify the fields you want to display in the list view
    search_fields = ('id', 'name', 'description')  # Add a search box for the name field

admin.site.register(Recipe, RecipeAdmin)


class StepAdmin(admin.ModelAdmin):
    list_display = ('id', 'recipe', 'stepname')  # Display the step's recipe and name
    search_fields = ('stepname',)  # Add a search box for the step name
    list_filter = ('recipe',) 
admin.site.register(Step, StepAdmin) 