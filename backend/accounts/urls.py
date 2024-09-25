from django.urls import path
from . import views


urlpatterns = [
    path('', views.getText, name="Text" )
]
