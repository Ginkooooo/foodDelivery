from django.urls import path
from .views import OrderListView

urlpatterns = [
    path('my-orders/', OrderListView.as_view(), name='order_list'),
]