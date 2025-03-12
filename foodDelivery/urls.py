from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView

from restaurants.views import restaurant_list, restaurant_search
from users.views import register,login_view


urlpatterns = [
    path('home/', restaurant_list, name='home'),  # 主页面
    path('restaurants/', include('restaurants.urls', namespace='restaurants')),
    path('login/', login_view, name='login'),
    path('merchant/', TemplateView.as_view(template_name='merchant.html'), name='merchant'),
    path('register/', register, name='register'),
    path('address/', TemplateView.as_view(template_name='address.html'), name='address'),
    path('info/', TemplateView.as_view(template_name='info.html'), name='info'),
    path('search/', restaurant_search, name='search'),
    path('orders/', TemplateView.as_view(template_name='orders.html'), name='orders'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)