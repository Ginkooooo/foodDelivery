from django.core.paginator import Paginator
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Restaurant, MenuItem


#餐厅列表视图
def restaurant_list(request):
    category = request.GET.get('category')

    # 获取基础查询集（包含优化预加载）
    restaurants = Restaurant.objects.all() \
        .select_related('owner') \
        .prefetch_related('menuitem_set')

    # 应用分类过滤
    if category and category in dict(Restaurant.CATEGORY_CHOICES):
        restaurants = restaurants.filter(category=category)
        category_name = dict(Restaurant.CATEGORY_CHOICES)[category]
    else:
        category_name = "All Restaurants"

    # 分页
    paginator = Paginator(restaurants, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'merchants/restaurant_list.html', {
        'page_obj': page_obj,
        'category_name': category_name,
    })

#主页面搜索
def restaurant_search(request):

    search_key = request.GET.get('q', '').strip()
    if not search_key:
        return JsonResponse({'restaurants': []})
    restaurants = Restaurant.objects.filter(name__icontains=search_key)
    results = [{
        'id': r.id,
        'name': r.name,
        'address': r.address,
    } for r in restaurants]

    # 返回JSON响应
    return JsonResponse({'restaurants': results})
    # return render(request, 'search_results.html', {'restaurants': restaurants})

#餐厅详情页
def restaurant_detail(request, pk):

    # 获取餐厅对象（包含预加载优化）
    restaurant = get_object_or_404(
        Restaurant.objects.select_related('owner')
        .prefetch_related('menuitem_set'),
        pk=pk
    )

    return render(request, 'merchants/restaurant_detail.html', {
        'restaurant': restaurant
    })