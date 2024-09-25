from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

class CustomUserAdmin(UserAdmin):
    model = User

    list_display = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active']

    # Optionally, you can add the user ID to the fields in the detail view
    fieldsets = UserAdmin.fieldsets  # Remove the custom id field here

# Unregister the default User admin
admin.site.unregister(User)

# Register the custom User admin
admin.site.register(User, CustomUserAdmin)
