from django.db import models
import os 
import random


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
    # The primary key field (id) is automatically created by Django
    name = models.CharField(max_length=255)  # Name of the recipe
    image = models.ImageField(upload_to=upload_image_path, null=True, blank=True)
    description = models.TextField()           # Description of the recipe

    def __str__(self):
        return self.name
    
class Step(models.Model):
    recipe = models.ForeignKey(Recipe, related_name='steps', on_delete=models.CASCADE)
    stepname = models.CharField(max_length=255)  # Name of the step
    description = models.TextField()  # Description of the step
    image = models.ImageField(upload_to=upload_image_path, null=True, blank=True)
    video = models.FileField(upload_to='videos/', null=True, blank=True)

    def __str__(self):
        return self.stepname