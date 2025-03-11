from django.urls import path
from . import views

app_name = 'restaurants'

urlpatterns = [
    path('search/', views.restaurant_search, name='restaurant_search'),
    path('<int:pk>/', views.restaurant_detail, name='restaurant_detail'),
]