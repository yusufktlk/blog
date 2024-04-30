from django.contrib import admin
from django.urls import path, include
from profiles.api import views

urlpatterns = [
    path('profiles', views.ProfileList.as_view(), name="profiles")
]
