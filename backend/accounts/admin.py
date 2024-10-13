from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from django.contrib import admin
from .models import *



class UserProfilePictureInline(admin.StackedInline):
    model = UserProfilePicture
    can_delete = False
    verbose_name_plural = 'Profile Picture'
    fk_name = 'user'


class CustomUserAdmin(UserAdmin):
    model = User

    list_display = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active']

    inlines = [UserProfilePictureInline]
    fieldsets = UserAdmin.fieldsets  

# Unregister the default User admin
admin.site.unregister(User)

# Register the custom User admin
admin.site.register(User, CustomUserAdmin)




class UserFollowAdmin(admin.ModelAdmin):
    list_display = ('user', 'followed_user')  # Fields to display in the admin list view
    search_fields = ('user__username', 'followed_user__username')  # Enable search by username

admin.site.register(UserFollow, UserFollowAdmin)


@admin.register(UserProfilePicture)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'profile_picture')


@admin.register(ForumPost)
class ForumPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'id', 'user', 'created_at']  # Fields to display in the list view
    search_fields = ['title', 'user__username']  # Fields to search
    list_filter = ['created_at', 'user']  # Filters based on date created and user
    ordering = ['-created_at']  # Order by latest posts first
    autocomplete_fields = ['user'] 

# Customizing the display for the Comment model in the admin interface
@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['user', 'id', 'post', 'parent', 'content', 'created_at']  # Display these fields
    search_fields = ['user__username', 'content', 'post__title']  # Searchable fields
    list_filter = ['created_at', 'post', 'user']  # Filterable fields
    ordering = ['-created_at']  # Latest comments first
    autocomplete_fields = ['user', 'post', 'parent']  # Use lookup widgets for user, post, and parent comment


