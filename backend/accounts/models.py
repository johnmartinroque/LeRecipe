from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserFollow(models.Model):
    user = models.ForeignKey(User, related_name='following', on_delete=models.CASCADE)
    followed_user = models.ForeignKey(User, related_name='followers', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'followed_user')  # Ensure one user can follow another only once

    def __str__(self):
        return f"{self.user.username} follows {self.followed_user.username}"