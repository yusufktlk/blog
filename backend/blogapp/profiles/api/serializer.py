from rest_framework import serializers
from profiles.models import Profile, ProfileState


class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    photo = serializers.ImageField(read_only=True)

    class Meta:
        model = Profile
        fields = '__all__'


class ProfilePhotoSerializer(serializers.ModelSerializer):
     class Meta:
        model = Profile
        fields = ['photo']


class ProfileStateSerializer(serializers.ModelSerializer):
     user_profile = serializers.StringRelatedField(read_only=True)

     class Meta:
        model = ProfileState
        fields = ['photo']