from django.urls import path
from . import views



urlpatterns = [
    path('', views.getText, name="Text" ),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user/profile/', views.getUserProfile, name="user-profile"),
    path('users/', views.getUsers, name="users"),
    path('users/register/', views.registerUser, name="register"),

]
