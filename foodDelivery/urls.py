from django.urls import path
from django.urls import include
from django.views.generic import TemplateView

urlpatterns = [
    path('home/', TemplateView.as_view(template_name='Homepage.html')),  #主页面
    path('orders/', include('orders.urls')),
    path('users/', include('users.urls')),
    path('accounts/', include('django.contrib.auth.urls')),# 使用Django内置的登录注册 可更改
]
