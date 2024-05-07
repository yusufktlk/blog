from rest_framework import serializers
from profiles.models import Profile, ProfileState
from blog.models import Blog
from blog.api.serializers import YorumSerializer, ProfileSerializer

class BlogSerializer(serializers.ModelSerializer):

    category = serializers.StringRelatedField()
    tags = serializers.StringRelatedField(many=True)
    yorumlar = YorumSerializer(read_only=True, many=True)
    blog_sahibi = ProfileSerializer(read_only=True)
    image = serializers.ImageField()

    class Meta:
        model = Blog
        fields = '__all__'
        # fields = ['user', 'text',]


class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    photo = serializers.ImageField(read_only=True)
    blogs = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = '__all__'

    def get_blogs(self, obj):
        blogs = Blog.objects.filter(blog_sahibi=obj)
        serializer = BlogSerializer(blogs, many=True)
        return serializer.data

class ProfilePhotoSerializer(serializers.ModelSerializer):
     class Meta:
        model = Profile
        fields = ['photo']


class ProfileStateSerializer(serializers.ModelSerializer):
     user_profile = serializers.StringRelatedField(read_only=True)

     class Meta:
        model = ProfileState
        fields = '__all__'