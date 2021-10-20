from django.shortcuts import render,redirect,get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import *
import cloudinary
import cloudinary.uploader
import cloudinary.api
from django.http import HttpResponseRedirect, JsonResponse
from .forms import RegistrationForm, UpdateUserForm, UpdateUserProfileForm, ImageForm, CommentForm
from django.contrib.auth import login, authenticate
from .models import Image, Comment, Profile
from django.contrib.auth.models import User
from django.template.loader import render_to_string
from django.views.generic import RedirectView
from .email import send_welcome_email

# Create your views here.
def registration(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            email = form.cleaned_data.get('email')
            login(request, user)
            recipient = Profile(user = user,email =email)
            recipient.save()
            send_welcome_email(user,email)
            return redirect('index')
    else:
        form = RegistrationForm()
    return render(request, 'registration/registration.html', {'form': form})

@login_required(login_url='login')
def index(request):
    images = Image.objects.all()
    users = User.objects.exclude(id=request.user.id)
    if request.method == 'POST':
        form = ImageForm(request.POST, request.FILES)
        if form.is_valid():
            image = form.save(commit=False)
            # image.user = request.user.profile
            image.save()
            return HttpResponseRedirect(request.path_info)
    else:
        form = ImageForm()
    params = {
        'images': images,
        'form': form,
        'users': users,

    }
    return render(request, 'insta/index.html', params)

@login_required(login_url='login')
def profile(request, username):
    if request.method == 'POST':
        profile_form = UpdateUserProfileForm(request.POST, request.FILES)
        user_form = UpdateUserForm(request.POST, instance=request.user)
        
        if user_form.is_valid() and profile_form.is_valid():
            profile_form.save()
            user_form.save()
            
            return HttpResponseRedirect(request.path_info)
    else:
        profile_form = UpdateUserProfileForm(instance=request.user)
        user_form = UpdateUserForm(instance=request.user)
        
    params = {
        'profile_form': profile_form,
        'user_form': user_form,
       

    }
    return render(request, 'insta/profile.html', params)


@login_required(login_url='login')
def user_profile(request, username):
    user_prof = get_object_or_404(User, username=username)
    if request.user == user_prof:
        return redirect('profile', username=request.user.username)
    user_posts = user_prof.profile.images.all()
    
    
    params = {
        'user_prof': user_prof,
        'user_posts': user_posts,
    }
    return render(request, 'insta/user.html', params)


@login_required(login_url='/accounts/login/')
def like_image(request, id):
    likes = Likes.objects.filter(image_id=id).first()
    if Likes.objects.filter(image_id=id, user_id=request.user.id).exists():
        likes.delete()
        image = Image.objects.get(id=id)
        if image.like_count == 0:
            image.like_count = 0
            image.save()
        else:
            image.like_count -= 1
            image.save()
        return redirect('/')
    else:
        likes = Likes(image_id=id, user_id=request.user.id)
        likes.save()
        # increase the number of likes by 1 for the image
        image = Image.objects.get(id=id)
        image.like_count = image.like_count + 1
        image.save()
        return redirect('/')

@login_required(login_url='login')
def search(request):
    if 'search_user' in request.GET and request.GET['search_user']:
        search_term = request.GET.get('search_user')
        results = Profile.search(search_term)
        print(results)
        message = f'{search_term}'
        title = message

        return render(request, 'search.html', {'success': message})
    else:
        message = 'You havent searched for any term'
        return render(request, 'insta/search.html', {'danger': message})
@login_required(login_url='login')
def comment(request, id):
    image = get_object_or_404(Image, pk=id)
    comments = image.comments.all()
    if request.method == 'POST':
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comments = form.cleaned_data['comment']
            comment.image = image
            comment.user = request.user.profile
            image.save()
            comment.save()
            return HttpResponseRedirect(request.path_info)
    else:
        form = CommentForm()
    params = {
        'image': image,
        'form': form,
        'comments':comments,
    }
    # image = Image.objects.get(id=id)
    image.comments_count = image.comments_count + 1
    image.save()

    return render(request, 'insta/single.html', params)