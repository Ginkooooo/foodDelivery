from django.urls import path
from .views import ProfileView, profile_redirect

urlpatterns = [
    path('profile/', ProfileView.as_view(), name='profile'),  # 个人中心
    path('profile-redirect/', profile_redirect, name='profile_redirect'),  # 头像跳转
]