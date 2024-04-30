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
from blog.api.permissions import IsAdminUserOrReadOnly, IsYorumSahibiOrReadOnly
from blog.api.pagination import SinglePagination, SmallPagination
from blog.models import Blog, Category, Tag, Yorum
from blog.api.serializers import BlogSerializer, YorumSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import BlogSerializer
from django.http import HttpResponse
import datetime


class BlogListCreateAPIView(generics.ListCreateAPIView):
      queryset = Blog.objects.all().order_by('id')
      serializer_class = BlogSerializer
      permission_classes = [permissions.IsAuthenticated]
      pagination_class = SmallPagination

class BlogDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
      queryset = Blog.objects.all()
      serializer_class = BlogSerializer


class YorumCreateAPIView(generics.CreateAPIView):
      queryset = Yorum.objects.all()
      serializer_class = YorumSerializer
      permission_classes = [permissions.IsAuthenticatedOrReadOnly]

      def perform_create(self, serializer):
        blog_pk = self.kwargs.get('blog_pk')
        blog = get_object_or_404(Blog, pk=blog_pk)
        kullanici = self.request.user
        serializer.save(blog=blog, yorum_sahibi = kullanici)

class YorumDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
     queryset = Yorum.objects.all()
     serializer_class = YorumSerializer
     permission_classes = [IsYorumSahibiOrReadOnly]
