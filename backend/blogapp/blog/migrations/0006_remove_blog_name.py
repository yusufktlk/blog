# Generated by Django 5.0.3 on 2024-04-30 12:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0005_blog_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blog',
            name='name',
        ),
    ]
