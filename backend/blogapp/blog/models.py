from django.db import models
from django.contrib.auth.models import User
from profiles.models import Profile

class Category(models.Model):
    name = models.CharField(max_length = 50, null=True)
    slug = models.SlugField(max_length = 50, unique=True, null=True)

    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length = 50, null=True)
    slug = models.SlugField(max_length = 50, unique=True, null=True)

    def __str__(self):
        return self.name

class Blog(models.Model):
    blog_title = models.CharField(max_length = 50, default="blog_title")
    blog_text = models.TextField(blank=True, null=True, verbose_name = "blog_text")
    # blog_sahibi = models.OneToOneField(User, on_delete=models.CASCADE, related_name="blog_owner", default=1)
    blog_sahibi = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="blog_owner",)
    category = models.ForeignKey(Category, null=True, on_delete=models.DO_NOTHING)
    tags = models.ManyToManyField(Tag, blank=True, null=True, default="programming")
    image = models.ImageField(upload_to='courses/%Y/%m/%d/', null=True)
    date = models.DateTimeField(auto_now = True)
    available = models.BooleanField(default = True)

    def __str__(self):
        return self.blog_title
    

class Yorum(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name="yorumlar")

    # yorum_sahibi = models.CharField(max_length=100)
    yorum_sahibi = models.ForeignKey(User, on_delete=models.CASCADE, related_name="kullanıcı_yorumları")
    yorum = models.TextField(null=True, blank=True)
    yaratılma_tarihi = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.yorum
    