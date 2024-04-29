from django.contrib.auth.models import User
from profiles.models import Profile, ProfileState
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=Profile)
def create_first_state_message(sender, instance, created, **kwargs):
    if created:
        ProfileState.objects.create(
            user_profile = instance,
            state_message = f'{instance.user.username} joined!'
        )