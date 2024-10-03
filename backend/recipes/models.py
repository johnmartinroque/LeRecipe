from django.db import models
import os 
import random
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from recipes.validators import validate_rating
from django.utils import timezone

def get_filename_exit(filepath):
    base_name = os.path.basename(filepath)
    name, ext = os.path.splitext(base_name)
    return name, ext

def upload_image_path(instance, filename):
    new_filename = random.randint(1, 2541781232)
    name, ext = get_filename_exit(filename)
    final_filename = '{new_filename}{ext}'.format(new_filename=new_filename, ext=ext)
    return "img/{new_filename}/{final_filename}".format(new_filename=new_filename, final_filename=final_filename)

def upload_video_path(instance, filename):
    new_filename = random.randint(1, 2541781232)
    name, ext = get_filename_exit(filename)
    final_filename = '{new_filename}{ext}'.format(new_filename=new_filename, ext=ext)
    return "videos/{new_filename}/{final_filename}".format(new_filename=new_filename, final_filename=final_filename)

def validate_video_file(value):
    if not value.name.endswith(('.mp4', '.avi', '.mov', '.wmv', '.mkv')):
        raise ValidationError('Unsupported file extension. Please upload a video file in .mp4, .avi, .mov, .wmv, or .mkv format.')


class Recipe(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE) 
    name = models.CharField(max_length=255)  
    image = models.ImageField(upload_to=upload_image_path, null=True, blank=True)
    ingredients = models.JSONField(default=list)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    tags = models.JSONField(blank=True, null=True)

    
    CATEGORY_CHOICES = [
    ('', 'Not specified'),
    ('Appetizers & Snacks', 'Appetizers & Snacks'),
    ('Breakfast & Brunch', 'Breakfast & Brunch'),
    ('Main Dishes', 'Main Dishes'),
    ('Soups & Stews', 'Soups & Stews'),
    ('Salads', 'Salads'),
    ('Side Dishes', 'Side Dishes'),
    ('Desserts & Sweets', 'Desserts & Sweets'),
    ('Beverages', 'Beverages'),
    ('Vegan & Vegetarian', 'Vegan & Vegetarian'),
    ('Gluten-Free', 'Gluten-Free'),
    ('Low-Carb & Keto', 'Low-Carb & Keto'),
    ('Quick & Easy Meals', 'Quick & Easy Meals'),
    ('Seafood & Fish', 'Seafood & Fish'),
    ('Pasta & Noodles', 'Pasta & Noodles'),
    ('Breads & Baked Goods', 'Breads & Baked Goods'),
    ('Casseroles', 'Casseroles'),
    ('Grilling & BBQ', 'Grilling & BBQ'),
    ('International Cuisine', 'International Cuisine'),
    ('Comfort Food', 'Comfort Food'),
    ('Healthy Recipes', 'Healthy Recipes'),

    
]
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='', null=True, blank=True)

    def __str__(self):
        return self.name

class Step(models.Model):
    recipe = models.ForeignKey(Recipe, related_name='steps', on_delete=models.CASCADE)
    stepname = models.CharField(max_length=255) 
    description = models.TextField() 
    image = models.ImageField(upload_to=upload_image_path, null=True, blank=True)
    video = models.FileField(upload_to=upload_video_path, null=True, blank=True, validators=[validate_video_file])

    def __str__(self):
        return self.stepname

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, related_name='comments', on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    rating = models.FloatField(validators=[validate_rating])

    def __str__(self):
        return self.text
    

class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)  # Add timestamp

    class Meta:
        unique_together = ('user', 'recipe')
        ordering = ['-created_at']  # Orders by created_at in descending order

    def __str__(self):
        return f"{self.user.username} bookmarked {self.recipe.name}"
