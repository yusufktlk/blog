from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.generics import GenericAPIView, get_object_or_404
from rest_framework.mixins import ListModelMixin, CreateModelMixin
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from blog.models import Blog
import json
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from rest_framework import permissions
from blog.api.permissions import IsAdminUserOrReadOnly, IsYorumSahibiOrReadOnly, IsOwnerOrAdmin
from blog.api.pagination import SinglePagination, SmallPagination, MediumPagination
from blog.models import Blog, Category, Tag, Yorum
from blog.api.serializers import BlogSerializer, YorumSerializer, CategorySerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import BlogSerializer
from django.http import HttpResponse
import datetime
from profiles.models import Profile
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from profiles.models import Profile, ProfileState
from profiles.api.serializer import ProfileSerializer, ProfileStateSerializer, ProfilePhotoSerializer
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework import mixins
from profiles.api.permissions import UpdateYourselfOrReadOnly, UpdateStateYourselfOrReadOnly


class BlogListCreateAPIView(generics.ListCreateAPIView):
      queryset = Blog.objects.all().order_by('id')
      serializer_class = BlogSerializer
      permission_classes = [permissions.IsAuthenticatedOrReadOnly]
      pagination_class = MediumPagination

      def get_or_create_profile(self, user):
        # Kullanıcının profilini alın, yoksa oluşturun
        profile, created = Profile.objects.get_or_create(user=user)
        return profile
      
      def create(self, request, *args, **kwargs):
        data = request.data
        user = request.user
        print(data)
        user_profile = self.get_or_create_profile(user)  # Kullanıcının profili
        newBlog = Blog(
            blog_title=data["blog_title"],
            blog_text=data["blog_text"],
            # category=data["category"],
            # tags=data["tags"],
            # image=data["image"],
            blog_sahibi=user_profile 
        )
        newBlog.save()
        return Response(status=status.HTTP_201_CREATED)

      

class BlogDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
      queryset = Blog.objects.all()
      serializer_class = BlogSerializer
      permission_classes = [permissions.IsAuthenticatedOrReadOnly ,IsOwnerOrAdmin]


class YorumCreateAPIView(generics.CreateAPIView):
      queryset = Yorum.objects.all()
      serializer_class = YorumSerializer
      permission_classes = [IsOwnerOrAdmin]
      
      def perform_create(self, serializer):
        blog_pk = self.kwargs.get('blog_pk')
        blog = get_object_or_404(Blog, pk=blog_pk)
        kullanici = self.request.user
        serializer.save(blog=blog, yorum_sahibi = kullanici)

class YorumDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
     queryset = Yorum.objects.all()
     serializer_class = YorumSerializer
     permission_classes = [IsYorumSahibiOrReadOnly]


class CategoriesAPIView(generics.ListCreateAPIView):
     queryset = Category.objects.all()
     serializer_class = CategorySerializer
     permission_classes = [permissions.IsAuthenticatedOrReadOnly]
