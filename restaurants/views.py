from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from restaurants.models import Restaurant
from restaurants.serializers import RestaurantSerializer


#餐厅列表视图
def restaurant_list(request):
    restaurants = Restaurant.objects.all()
    return render(request, 'restaurants/list.html', {'restaurants': restaurants})


