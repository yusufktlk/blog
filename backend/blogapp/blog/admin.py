from django.contrib import admin
from . models import Blog, Category, Tag, Yorum

admin.site.register(Blog)
admin.site.register(Category)
admin.site.register(Tag)
admin.site.register(Yorum)