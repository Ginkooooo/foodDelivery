from django.urls import path
from django.urls import include
from django.views.generic import TemplateView

urlpatterns = [
    path('home/', TemplateView.as_view(template_name='Homepage.html'), name='home'),  #主页面
    path('restaurants/', include('restaurants.urls', namespace='restaurants')),
]
