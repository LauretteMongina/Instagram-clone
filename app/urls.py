from django.urls import path,include
from . import views
from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static


urlpatterns = [
    path('registration/', views.registration, name='registration'),
    path('account/', include('django.contrib.auth.urls')),
    path('', views.index, name='index'),
    path('profile/<username>/', views.profile, name='profile'),
    url('user_profile/<username>/', views.user_profile, name='user_profile'),
    path('comment/<id>', views.comment, name='comment'),
    path('like<int:id>/', views.like_image, name='like'),
    path('search/', views.search, name='search'),
    
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)