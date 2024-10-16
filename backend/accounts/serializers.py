from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

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
    user = UserSerializer(read_only=True)
    comments = serializers.SerializerMethodField()

    class Meta:
        model = ForumPost
        fields = ['id', 'user', 'title', 'content', 'created_at', 'comments']

    def get_comments(self, obj):
        comments = Comment.objects.filter(post=obj, parent=None)  # Get only top-level comments
        return CommentSerializer(comments, many=True).data


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    post = serializers.PrimaryKeyRelatedField(read_only=True)
    replies = serializers.SerializerMethodField()
    replying_to = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'user', 'post', 'content', 'created_at', 'replies', 'replying_to']

    def get_replies(self, obj):
        replies = Comment.objects.filter(parent=obj)
        return CommentSerializer(replies, many=True).data
    
    def get_replying_to(self, obj):
        if obj.parent:  # Check if there's a parent comment
            return {
                'id': obj.parent.user.id,
                'username': obj.parent.user.username,
            }
        return None  # No parent, so returning None

