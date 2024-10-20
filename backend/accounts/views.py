from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import *
from .models import *
from rest_framework import serializers, generics, permissions
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from .models import UserProfilePicture, ForumPost
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Create your views here.
@api_view(['GET'])
def getText(request):
    text = [
        'hello hello'
    ]

    return Response(text)


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        try:
            data = super().validate(attrs)

            serializer = UserSerializerWithToken(self.user).data

            for k, v in serializer.items():
                data[k] = v

            return data

        except Exception:
            
            raise serializers.ValidationError({
                'detail': 'Incorrect email or password'
            })
    

class MyTokenObtainPairView(TokenObtainPairView):
	serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model=User
        fields = ['id', '_id', 'username', 'email', 'profile_picture', 'isAdmin', 'token']

    def get_token(self, obj):
            token = RefreshToken.for_user(obj)
            return str(token.access_token)
    
    def get_profile_picture(self, obj):
        profile = UserProfilePicture.objects.filter(user=obj).first()
        if profile and profile.profile_picture:
            return profile.profile_picture.url
        return None
    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)



@api_view(['POST'])
def registerUser(request):
    data = request.data
    password1 = data.get('password1')
    password2 = data.get('password2')

    if password1 != password2:
        return Response({'detail': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the username or email already exists
    if User.objects.filter(username=data['name']).exists():
        return Response({'detail': 'User with this username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=data['email']).exists():
        return Response({'detail': 'User with this email already exists'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.create(
            username=data['name'],
            email=data['email'],
            password=make_password(password1)
        )
        
        # Create UserProfile with profile picture if it exists
        profile_picture = request.FILES.get('profile_picture')
        if profile_picture:
            UserProfilePicture.objects.create(user=user, profile_picture=profile_picture)
        
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow_user(request, user_id):
    try:
        followed_user = User.objects.get(id=user_id)
        follow_relationship, created = UserFollow.objects.get_or_create(user=request.user, followed_user=followed_user)

        if created:
            return Response({'detail': 'User followed successfully.'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'detail': 'You are already following this user.'}, status=status.HTTP_400_BAD_REQUEST)

    except User.DoesNotExist:
        return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def unfollow_user(request, user_id):
    try:
        followed_user = User.objects.get(id=user_id)
        follow_relationship = UserFollow.objects.get(user=request.user, followed_user=followed_user)
        follow_relationship.delete()
        return Response({'detail': 'User unfollowed successfully.'}, status=status.HTTP_204_NO_CONTENT)

    except User.DoesNotExist:
        return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
    except UserFollow.DoesNotExist:
        return Response({'detail': 'You are not following this user.'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_following_list(request):
    user = request.user
    following_users = UserFollow.objects.filter(user=user).select_related('followed_user')

    # Building a list with id, username, and profile picture
    following_data = [
        {
            'id': followed_user.followed_user.id,
            'username': followed_user.followed_user.username,
            # Access profile picture through the related UserProfilePicture model
            'profile_picture': followed_user.followed_user.userprofilepicture.profile_picture.url 
                                if hasattr(followed_user.followed_user, 'userprofilepicture') 
                                and followed_user.followed_user.userprofilepicture.profile_picture 
                                else None
        }
        for followed_user in following_users
    ]

    return Response(following_data, status=status.HTTP_200_OK)



class ForumPostCreateView(generics.CreateAPIView):
    queryset = ForumPost.objects.all()
    serializer_class = ForumPostSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can create posts

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# 2. View for listing all forum posts (GET request)
class ForumPostListView(generics.ListAPIView):
    queryset = ForumPost.objects.all()
    serializer_class = ForumPostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  # Anyone can view the list

# 3. View for retrieving a single forum post (GET request)
class ForumPostDetailView(generics.RetrieveAPIView):
    queryset = ForumPost.objects.all()
    serializer_class = ForumPostSerializer
    lookup_field = 'id'  # Retrieve post by id
    permission_classes = [IsAuthenticatedOrReadOnly]  # Anyone can view post details


class ForumPostCommentListView(generics.ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        # Get the forum post by ID from the URL
        post_id = self.kwargs.get('post_id')
        # Filter comments that are related to the post and are top-level (no parent)
        return Comment.objects.filter(post_id=post_id, parent=None)

# View to retrieve a specific comment and its replies
class CommentDetailView(generics.RetrieveAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    def retrieve(self, request, *args, **kwargs):
        # Get the comment by ID
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class CommentCreateView(generics.CreateAPIView):
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        # Optionally, you can set the user and post before saving
        serializer.save(user=self.request.user, post_id=self.kwargs['post_id'])

    def post(self, request, *args, **kwargs):
        # Include the post_id in the request data for saving
        self.kwargs['post_id'] = kwargs['post_id']
        return self.create(request, *args, **kwargs)
    

class CreateReplyView(generics.CreateAPIView):
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        # Set the user, post, and parent before saving the reply
        serializer.save(
            user=self.request.user,
            post_id=self.kwargs['post_id'],
            parent_id=self.kwargs['parent_comment_id']
        )