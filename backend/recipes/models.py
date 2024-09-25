from django.db import models

class Recipe(models.Model):
    # The primary key field (id) is automatically created by Django
    name = models.CharField(max_length=255)  # Name of the recipe
    description = models.TextField()           # Description of the recipe

    def __str__(self):
        return self.name