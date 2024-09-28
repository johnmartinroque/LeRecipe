from django.db import models
from django.contrib.auth.models import User
import os 
import random
# Create your models here.

def get_filename_exit(filepath):
    base_name = os.path.basename(filepath)
    name, ext = os.path.splitext(base_name)
    return name, ext

def upload_image_path(instance, filename):
    new_filename = random.randint(1, 2541781232)
    name, ext = get_filename_exit(filename)
    final_filename = '{new_filename}{ext}'.format(new_filename=new_filename, ext=ext)
    return "img/{new_filename}/{final_filename}".format(new_filename=new_filename, final_filename=final_filename)


class UserFollow(models.Model):
    user = models.ForeignKey(User, related_name='following', on_delete=models.CASCADE)
    followed_user = models.ForeignKey(User, related_name='followers', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'followed_user')  # Ensure one user can follow another only once

    def __str__(self):
        return f"{self.user.username} follows {self.followed_user.username}"
    
class UserProfilePicture(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to=upload_image_path, null=True, blank=True)

    def __str__(self):
        return self.user.username