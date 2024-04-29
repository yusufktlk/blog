from django.urls import path
from blog.api import views 

urlpatterns = [
    path("blogs/", views.BlogListCreateAPIView.as_view(), name='blog_list'),
    path("blogs/<int:pk>", views.BlogDetailAPIView.as_view(), name='blog_detail'),
    path("blogs/<int:blog_pk>/yorum-yap", views.YorumCreateAPIView.as_view(), name='yorum-yap'),
    path("yorumlar/<int:pk>", views.YorumDetailAPIView.as_view(), name="yorumlar")
]
