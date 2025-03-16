from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView

from restaurants.views import restaurant_list, restaurant_search, register_merchant, create_menu_item, merchant_edit_list, merchant_edit_change, merchant_edit_delete, item_list
from users.views import register, login_view, address_list, add_address, delete_address, edit_address_confirm, edit_address
from orders.views import confirm_order, pay, orders_list, create_order, merchant_orders_list, merchant_confirm_await, merchant_confirm_finish, merchant_confirm_preparing

urlpatterns = [
    path('home/', restaurant_list, name='home'),  # 主页面
    path('login/', login_view, name='login'),
    path('merchant/<int:pk>/', item_list, name='merchant'),
    path('merchant/edit/', merchant_edit_list, name='merchant_edit'),
    path('merchant/edit/create/', create_menu_item, name='create_menu_item'),
    path('merchant/edit/change/<int:pk>/', merchant_edit_change, name='merchant_edit_change'),
    path('merchant/edit/delete/<int:pk>/', merchant_edit_delete, name='merchant_edit_delete'),
    path('merchant/orders/<int:pk>/', merchant_orders_list, name='merchant_orders_list'),
    path('merchant/confirm/await/', merchant_confirm_await, name='merchant_confirm_await'),
    path('merchant/confirm/preparing/', merchant_confirm_preparing, name='merchant_confirm_preparing'),
    path('merchant/confirm/finish/', merchant_confirm_finish, name='merchant_confirm_finish'),
    path('register/', register, name='register'),
    path('register/merchant/', register_merchant, name='register_merchant'),
    path('info/', TemplateView.as_view(template_name='info.html'), name='info'),
    path('confirm/', confirm_order, name='confirm_order'),
    path('search/', restaurant_search, name='search'),
    path('orders/', orders_list, name='orders_list'),
    path('orders/create/', create_order, name='create_order'),
    path('address/', address_list, name='address_list'),
    path('address/add/', add_address, name='add_address'),
    path('address/delete/<int:pk>/', delete_address, name='delete_address'),
    path('address/editcon/<int:pk>/', edit_address_confirm, name='edit_address_confirm'),
    path('address/edit/<int:pk>/', edit_address, name='edit_address'),
    path('pay/', pay, name='pay'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)