from django.test import TestCase

# Create your tests here.
from django.test import TestCase

from .models import Image, Comment, Profile

# Create your tests here.
class ImageTestClass:
    def setUp(self):
        self.img = Image(image = "https://en.wikipedia.org/wiki/File:Image_created_with_a_mobile_phone.png", img_name = "Wikipedia", img_caption = "An image from Wikipedia", likes = 10)
    
    def test_instance(self):
        self.assertTrue(isinstance(self.img, Image))
    
    def test_save_method(self):
        self.img.save_image()
        imgs = Image.objects.all()
        self.assertTrue(len(imgs) > 0)

class ProfileTestClass:
    from django.contrib.auth.models import User
    def setUp(self):
        self.user = User(username='tess')
        self.user.save()
        self.profile = Profile(id=1,user=self.user,photo='download.jpeg',bio='Stemist', name='person')
        self.profile.save_profile()

    def tearDown(self):
        Profile.objects.all().delete()
        User.objects.all().delete()
        Image.objects.all().delete()

    def test_instance(self):
        self.assertTrue(isinstance(self.user,User))
        self.assertTrue(isinstance(self.profile, Profile))

    def test_save_method(self):
        self.profile.save_profile()
        profile = Profile.objects.all()
        self.assertTrue(len(profile) > 0)





