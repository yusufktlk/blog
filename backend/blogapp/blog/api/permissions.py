from rest_framework import permissions
from pprint import pprint
from blog.models import Blog

class IsAdminUserOrReadOnly(permissions.IsAdminUser):
    def has_permission(self, request, view):
        is_admin = super().has_permission(request, view)
        return  request.method in permissions.SAFE_METHODS or is_admin


class IsYorumSahibiOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user == obj.yorum_sahibi
    

from rest_framework import permissions
from blog.models import Blog

class IsOwnerOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return True

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        blog = obj

        if request.user.is_staff:
            return True
        return request.user.profile == blog.blog_sahibi
