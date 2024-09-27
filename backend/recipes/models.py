from django.db import models
import os 
import random
from django.contrib.auth.models import User


def get_filename_exit(filepath):
    base_name = os.path.basename(filepath)
    name, ext = os.path.splitext(base_name)
    return name, ext

def upload_image_path(instance, filename):
    new_filename = random.randint(1, 2541781232)
    name, ext = get_filename_exit(filename)
    final_filename = '{new_filename}{ext}'.format(new_filename=new_filename, ext=ext)
    return "img/{new_filename}/{final_filename}".format(new_filename=new_filename, final_filename=final_filename)

class Recipe(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE) 
    name = models.CharField(max_length=255)  
    image = models.ImageField(upload_to=upload_image_path, null=True, blank=True)
    description = models.TextField()

    def __str__(self):
        return self.name
    
class Step(models.Model):
    recipe = models.ForeignKey(Recipe, related_name='steps', on_delete=models.CASCADE)
    stepname = models.CharField(max_length=255) 
    description = models.TextField() 
    image = models.ImageField(upload_to=upload_image_path, null=True, blank=True)
    video = models.FileField(upload_to='videos/', null=True, blank=True)

    def __str__(self):
        return self.stepname
    

class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'recipe')  

    def __str__(self):
        return f"{self.user.username} bookmarked {self.recipe.name}"