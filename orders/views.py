import json

from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from orders.models import OrderItem, Order
from restaurants.models import MenuItem, Restaurant
from users.models import Address, User


#确认订单
def confirm_order(request):
    restaurant_id = request.session.get('restaurant_id')
    restaurant = Restaurant.objects.get(id=restaurant_id)
    address_id = request.GET.get('address_id')
    if address_id:
        try:
            address = Address.objects.get(id=address_id, user=request.user)
        except Address.DoesNotExist:
            # 处理无效地址ID
            address = Address.objects.filter(user=request.user).first()
    else:
        # 没有提供address_id时，获取用户第一个地址
        address = Address.objects.filter(user=request.user).first()
    item_params = request.GET.getlist('items')
    items_data = []
    for item_param in item_params:
        try:
            item_id, quantity = item_param.split(":")
            item = MenuItem.objects.get(id=int(item_id))  # 获取 Item 实例
            items_data.append({"item": item, "quantity": int(quantity)})
        except (ValueError, MenuItem.DoesNotExist):
            continue  # 跳过无效数据

    if request.method == 'GET':
        return render(request, 'confirm.html', {
            'address': address,
            'items_data': items_data,
            'restaurant': restaurant,
        })

def pay(request):
    if request.method == 'GET':
        return render(request, 'pay.html')

def orders_list(request):
    if request.method == 'GET':
        return render(request, 'orders.html')

@csrf_exempt
def create_order(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            total = data.get("total")
            restaurant_id = data.get("restaurant_id")
            user_id = data.get("user_id")

            # 确保 restaurant 和 user 存在
            restaurant = Restaurant.objects.get(id=restaurant_id)
            user = User.objects.get(id=user_id)

            # 创建订单
            order = Order.objects.create(
                user=user,
                restaurant=restaurant,
                total=total
            )

            return JsonResponse({"success": True, "order_id": order.id})
        except Restaurant.DoesNotExist:
            return JsonResponse({"success": False, "error": "Restaurant not found"}, status=400)
        except User.DoesNotExist:
            return JsonResponse({"success": False, "error": "User not found"}, status=400)
        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)}, status=400)

    return JsonResponse({"success": False, "error": "Invalid request"}, status=405)