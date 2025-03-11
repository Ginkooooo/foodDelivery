from django.urls import path
from . import views

urlpatterns = [
    path('search/', views.restaurant_search, name='restaurant_search'),
    path('restaurant/<int:pk>/', views.restaurant_detail, name='restaurant_detail'),
    path('', views.restaurant_list, name='restaurant_list'),  # 显示全部餐厅
    path('category/<str:category>/', views.restaurant_list, name='restaurant_category'),  #按分类显示餐厅
]