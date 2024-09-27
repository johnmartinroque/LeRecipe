from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from django.contrib import admin
from .models import UserFollow

class CustomUserAdmin(UserAdmin):
    model = User

    list_display = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active']

    # Optionally, you can add the user ID to the fields in the detail view
    fieldsets = UserAdmin.fieldsets  # Remove the custom id field here

# Unregister the default User admin
admin.site.unregister(User)

# Register the custom User admin
admin.site.register(User, CustomUserAdmin)




class UserFollowAdmin(admin.ModelAdmin):
    list_display = ('user', 'followed_user')  # Fields to display in the admin list view
    search_fields = ('user__username', 'followed_user__username')  # Enable search by username

admin.site.register(UserFollow, UserFollowAdmin)
