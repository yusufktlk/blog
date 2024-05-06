from django.contrib import admin
from django.urls import path, include
from profiles.api import views
from profiles.api.views import ProfileViewSet, ProfileStateViewSet, ProfilePhotoUpdateView, UserProfileView
from rest_framework.routers import DefaultRouter

# profiles = ProfileViewSet.as_view({'get': 'list'})
# profile_detail = ProfileViewSet.as_view({'get': 'retrieve'})

# urlpatterns = [
#     path('profiles', profiles, name="profiles"),
#     path('profiles/<int:pk>', profile_detail, name="profile-detail")
# ]


router = DefaultRouter()
router.register(r'profiles', ProfileViewSet) 


urlpatterns = [
    path('', include(router.urls)),
    path('photos', ProfilePhotoUpdateView.as_view(), name='photos' ),
    path('user/profile/', UserProfileView.as_view(), name='user_profile' ),
]

