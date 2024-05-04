# Generated by Django 5.0.3 on 2024-05-04 19:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0017_alter_blog_blog_sahibi'),
        ('profiles', '0002_alter_profile_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='blog_sahibi',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='blog_owner', to='profiles.profile'),
        ),
    ]
