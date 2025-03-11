from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView

from restaurants.views import restaurant_list

urlpatterns = [
    path('home/', restaurant_list, name='home'),  # 主页面
    path('restaurants/', include('restaurants.urls', namespace='restaurants')),
    path('login/', TemplateView.as_view(template_name='login.html'), name='login'),
    path('merchant/', TemplateView.as_view(template_name='merchant.html'), name='merchant'),
    path('register/', TemplateView.as_view(template_name='register.html'), name='register'),
    path('address/', TemplateView.as_view(template_name='address.html'), name='address'),
    path('info/', TemplateView.as_view(template_name='info.html'), name='info'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)