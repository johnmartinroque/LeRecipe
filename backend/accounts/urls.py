from django.urls import path
from . import views
from .views import ForumPostDetailView, ForumPostCreateView, ForumPostListView



urlpatterns = [
    path('', views.getText, name="Text" ),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user/profile/', views.getUserProfile, name="user-profile"),
    path('users/', views.getUsers, name="users"),
    path('users/register/', views.registerUser, name="register"),
    path('follow/<int:user_id>/', views.follow_user, name='follow_user'),
    path('unfollow/<int:user_id>/', views.unfollow_user, name='unfollow_user'),
    path('following/', views.get_following_list, name='get_following_list'),
    path('post/create/', ForumPostCreateView.as_view(), name='post-create'),  # For creating a post
    path('posts/', ForumPostListView.as_view(), name='post-list'),  # For listing all posts
    path('post/<int:id>/', ForumPostDetailView.as_view(), name='post-detail'),
    
]
