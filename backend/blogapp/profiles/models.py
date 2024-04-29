from django.db import models
from django.contrib.auth.models import User
from PIL import Image


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    firstname = models.CharField(max_length=150, null=True, blank=True)
    lastname = models.CharField(max_length=150, null=True, blank=True)
    title = models.CharField(max_length=150, null=True, blank=True)
    photo = models.ImageField(null=True, blank=True, upload_to="profile_photos/%Y/%m")

    def __str__(self):
        return self.user.username
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        
        if self.photo:
            img = Image.open(self.photo.path)
            if img.height > 600 or img.width > 600:
                output_size = (600,600)
                img.thumbnail(output_size)
                img.save(self.photo.path)
    

class ProfileState(models.Model):
    user_profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    state_message = models.CharField(max_length=250)
    created_date = models.DateField(auto_now_add=True)
    updated_date = models.DateField(auto_now=True)

    def __str__(self):
        return str(self.state_message)