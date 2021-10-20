from django.db import models
import datetime as dt
from cloudinary.models import CloudinaryField
from django.contrib.auth.models import User
from django.db.models.fields import related
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    photo = CloudinaryField('image')
    name = models.CharField(blank=True, max_length=120)
    bio = models.TextField(max_length=500, default="My Bio", blank=True)
    email = models.CharField(blank=True, max_length=120)
    
    @receiver(post_save, sender=User)
    def create_user(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()
    def save_profile(self):
        self.save()

    def delete_profile(self):
        self.delete()
    
    def update_profile(self, new_caption):
        self.image_caption = new_caption
        self.save()
    
    def __str__(self):
        return f'{self.user.username} Profile'

    @classmethod
    def search(cls, name):
        return cls.objects.filter(user__username__icontains=name).all()
class Image(models.Model):
    user = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name='images', null=True)
    image = CloudinaryField('image')
    image_name = models.CharField(max_length=50)
    image_caption = models.TextField()
    like_count = models.IntegerField(default=0)
    comments_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def save_image(self):
        self.save()

    def delete_image(self):
        self.delete()

    def update_caption(self, new_caption):
        self.image_caption = new_caption
        self.save()

    def get_comments(self):
        return self.comments.all()
    @classmethod
    def get_single_image(cls, id):
        image = cls.objects.get(id=id)
        return image
    @classmethod
    def get_images_by_user(cls, user):
        images = cls.objects.filter(user=user)
        return images
    def __str__(self):
        return self.name


    
class Comment(models.Model):
    comment = models.TextField()
    image = models.ForeignKey(Image, on_delete=models.CASCADE, related_name='comments',null=True)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='comments',null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save_comment(self):
        self.save()

    def __str__(self):
        return self.comment
class Likes(models.Model):
    image = models.ForeignKey(Image, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.likes