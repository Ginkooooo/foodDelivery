from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView

from restaurants.views import restaurant_list, restaurant_search
from users.views import register, login_view, address_list, add_address, delete_address, edit_address_confirm, edit_address

urlpatterns = [
    path('home/', restaurant_list, name='home'),  # 主页面
    path('restaurants/', include('restaurants.urls', namespace='restaurants')),
    path('login/', login_view, name='login'),
    path('merchant/', TemplateView.as_view(template_name='merchant.html'), name='merchant'),
    path('register/', register, name='register'),
    path('info/', TemplateView.as_view(template_name='info.html'), name='info'),
    path('confirm/', TemplateView.as_view(template_name='confirm.html'), name='confirm'),
    path('search/', restaurant_search, name='search'),
    path('orders/', TemplateView.as_view(template_name='orders.html'), name='orders'),
    path('address/', address_list, name='address_list'),
    path('address/add/', add_address, name='add_address'),
    path('address/delete/<int:pk>/', delete_address, name='delete_address'),
    path('address/editcon/<int:pk>/', edit_address_confirm, name='edit_address_confirm'),
    path('address/edit/<int:pk>/', edit_address, name='edit_address'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)