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
    user_id = request.user.id
    orders = Order.objects.filter(user_id=user_id)

    if request.method == 'GET':
        return render(request, 'orders.html', {'orders': orders})

@csrf_exempt
def create_order(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            total = data.get("total")
            restaurant_id = data.get("restaurant_id")
            user_id = data.get("user_id")
            items = data.get("items", [])

            # 验证必要参数
            if not all([total, restaurant_id, user_id]):
                return JsonResponse({"success": False, "error": "Missing required parameters"}, status=400)

            # 确保 restaurant 和 user 存在
            restaurant = Restaurant.objects.get(id=restaurant_id)
            user = User.objects.get(id=user_id)

            # 创建订单
            order = Order.objects.create(
                user=user,
                restaurant=restaurant,
                total=total,
                status='P'
            )

            # 创建订单项
            for item_data in items:
                try:
                    menu_item = MenuItem.objects.get(id=item_data["item_id"])
                    OrderItem.objects.create(
                        order=order,
                        item=menu_item,
                        quantity=item_data["quantity"]
                    )
                except MenuItem.DoesNotExist:
                    print(f"MenuItem {item_data['item_id']} not found, skipping")
                except KeyError:
                    print("Invalid item data format, skipping")

            return JsonResponse({"success": True, "order_id": order.id})

        except Restaurant.DoesNotExist:
            return JsonResponse({"success": False, "error": "Restaurant not found"}, status=404)
        except User.DoesNotExist:
            return JsonResponse({"success": False, "error": "User not found"}, status=404)
        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)}, status=500)

        return JsonResponse({"success": False, "error": "Method not allowed"}, status=405)