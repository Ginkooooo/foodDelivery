import json

from MySQLdb import IntegrityError
from django.contrib.auth.hashers import make_password
from django.core.paginator import Paginator
from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt

from .models import Restaurant, MenuItem


#餐厅列表视图
def restaurant_list(request):
    category = request.GET.get('category')

    # 获取基础查询集
    restaurants = Restaurant.objects.all().order_by('name')

    # 应用分类过滤
    if category and category in dict(Restaurant.CATEGORY_CHOICES):
        restaurants = restaurants.filter(category=category)
        category_name = dict(Restaurant.CATEGORY_CHOICES)[category]
    else:
        category_name = "Recommended Merchants"

    # 分页
    paginator = Paginator(restaurants, 8)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'home.html', {
        'page_obj': page_obj,
        'category_name': category_name,
        'Restaurant': Restaurant
    })


#主页面搜索
def restaurant_search(request):
        search_key = request.GET.get('q', '').strip()

        if not search_key:
            return render(request, 'search.html', {'restaurants': []})  # 如果没有输入关键词，返回空列表

        # 过滤餐厅
        restaurants = Restaurant.objects.filter(name__icontains=search_key)
        return render(request, 'search.html', {'restaurants': restaurants})


#注册
@csrf_exempt
def register_merchant(request):
    if request.method == 'GET':
        return render(request, 'merchant_register.html')
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            errors = {}

            required_fields = ['name', 'latitude', 'longitude', 'minimum_order', 'username', 'password']
            for field in required_fields:
                if not data.get(field):
                    errors[field] = 'This field cannot be empty'

            # 数值类型验证
            if 'latitude' in data:
                try:
                    float(data['latitude'])
                except ValueError:
                    errors['latitude'] = 'Latitude must be a number'
            if 'longitude' in data:
                try:
                    float(data['longitude'])
                except ValueError:
                    errors['longitude'] = 'Longitude must be a number'
            if 'minimum_order' in data:
                try:
                    float(data['minimum_order'])
                except ValueError:
                    errors['minimum_order'] = 'The minimum order amount must be a number'

            # 分类选项验证
            valid_categories = ['fastFood', 'chineseFood', 'sushi', 'drinkAndCoffee', 'groceries']
            if data.get('category') not in valid_categories:
                errors['category'] = '无效的分类'

            if errors:
                return JsonResponse({'success': False, 'errors': errors}, status=400)

            # 创建商家对象
            restaurant = Restaurant.objects.create(
                name=data['name'],
                latitude=data['latitude'],
                longitude=data['longitude'],
                minimum_order=data['minimum_order'],
                category=data['category'],
                username=data['username'],
                password=make_password(data['password'])  # 加密密码
            )

            return JsonResponse({
                'success': True,
                'message': 'Merchant registration successful！'
            }, status=201)

        except IntegrityError as e:
            return JsonResponse({
                'success': False,
                'errors': {'username': 'The user name already exists'}
            }, status=400)
        except Exception as e:
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=500)

    return JsonResponse({'error': 'Method not allowed'}, status=405)

#增加商品
def create_menu_item(request):
    try:
        restaurant_id = request.session.get('restaurant_id')
        restaurant = Restaurant.objects.get(id=restaurant_id)

        # 创建菜单项
        menu_item = MenuItem(
            restaurant=restaurant,
            name=request.POST.get('name'),
            price=request.POST.get('price'),
        )

        # 处理图片上传
        if 'image' in request.FILES:
            menu_item.image = request.FILES['image']

        menu_item.save()

        return JsonResponse({
            'success': True,
            'id': menu_item.id,
            'name': menu_item.name,
            'price': str(menu_item.price)
        })

    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=400)


#编辑商品列表
def merchant_edit_list(request):

    restaurant_id = request.session.get('restaurant_id')
    restaurant_name = request.session.get('restaurant_username')

    # 获取基础查询集
    items = MenuItem.objects.filter(restaurant_id=restaurant_id)

    return render(request, 'merchant_editlist.html', {
        'items': items,
        'restaurant_name': restaurant_name
    })


#更改商品
def merchant_edit_change(request, pk):
    try:
        # 获取餐厅信息
        restaurant_id = request.session['restaurant_id']
        restaurant_name = request.session['restaurant_username']

        # 获取菜单项
        item = get_object_or_404(MenuItem, pk=pk, restaurant_id=restaurant_id)

        if request.method == 'GET':
            return render(request, 'merchant_edit_change.html', {
                'restaurant_name': restaurant_name,
                'item': item,
            })

        elif request.method == 'POST':
            try:
                # 处理文本字段
                item.name = request.POST.get('name', item.name)
                item.price = request.POST.get('price', item.price)

                if 'image' in request.FILES:
                    item.image = request.FILES['image']

                item.save()

                return JsonResponse({
                    'success': True,
                    'id': item.id,
                    'name': item.name,
                    'price': str(item.price),
                    'new_image_url': item.image.url
                })

            except json.JSONDecodeError:
                return JsonResponse({'success': False, 'error': 'Invalid JSON'}, status=400)
            except Exception as e:
                return JsonResponse({'success': False, 'error': str(e)}, status=500)

        else:
            # 处理其他HTTP方法
            return HttpResponseNotAllowed(['GET', 'POST'])

    except KeyError:
        return JsonResponse({'success': False, 'error': 'Session data missing'}, status=400)
    except MenuItem.DoesNotExist:
        return JsonResponse({'success': False, 'error': 'Menu item not found'}, status=404)


#删除商品
def merchant_edit_delete(request, pk):
    item = get_object_or_404(MenuItem, pk=pk)
    item.delete()
    return redirect('/merchant/edit/')


#商品列表（用户端）
def item_list(request,pk):
    restaurant = Restaurant.objects.get(id=pk)
    items = MenuItem.objects.filter(restaurant_id=restaurant.id)

    if request.method == 'GET':
        return render(request, 'merchant.html', {
            'restaurant_name': restaurant.name,
            'items': items
        })