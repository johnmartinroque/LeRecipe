from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserFollow, UserProfilePicture, ForumPost

class UserSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    profile_picture = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', '_id', 'isAdmin', 'profile_picture']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff
    
    def get_profile_picture(self, obj):
        
        profile = UserProfilePicture.objects.filter(user=obj).first()
        if profile:
            return profile.profile_picture.url if profile.profile_picture else None
        return None

class UserFollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollow
        fields = ['id', 'user', 'followed_user']


class ForumPostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # Nested serializer to include user info

    class Meta:
        model = ForumPost
        fields = ['id', 'title', 'content', 'user', 'created_at']