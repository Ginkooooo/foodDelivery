import json

from django.db import transaction
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

#用户端订单列表
def orders_list(request):
    # 获取当前用户的所有订单，并预取关联的订单项和商品
    orders = Order.objects.filter(user=request.user).prefetch_related(
        'orderitem_set__item'
    ).select_related('restaurant')

    # 为每个订单构造商品信息列表（不直接操作多对多字段）
    for order in orders:
        order.item_details = []  # 使用新字段名避免冲突
        for order_item in order.orderitem_set.all():
            order.item_details.append({
                'name': order_item.item.name,
                'price': order_item.item.price,
                'quantity': order_item.quantity,
                'subtotal': order_item.item.price * order_item.quantity
            })
        # 计算总价（假设配送费为3）
        order.calculated_total = sum(item['subtotal'] for item in order.item_details) + 3

    return render(request, 'orders.html', {'orders': orders})

#创建订单
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

            with transaction.atomic():
                # 创建订单
                order = Order.objects.create(
                    user=user,
                    restaurant=restaurant,
                    total=total,
                    status='P'
                )

                # 批量创建订单项
                order_items = []
                for item_data in items:
                    try:
                        menu_item = MenuItem.objects.get(id=item_data["item_id"])
                        order_items.append(OrderItem(
                            order=order,
                            item=menu_item,
                            quantity=item_data["quantity"]
                        ))
                    except MenuItem.DoesNotExist:
                        print(f"MenuItem {item_data['item_id']} not found, skipping")
                OrderItem.objects.bulk_create(order_items)  # 批量插入

            return JsonResponse({"success": True, "order_id": order.id})

        except Restaurant.DoesNotExist:
            return JsonResponse({"success": False, "error": "Restaurant not found"}, status=404)
        except User.DoesNotExist:
            return JsonResponse({"success": False, "error": "User not found"}, status=404)
        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)}, status=500)

        return JsonResponse({"success": False, "error": "Method not allowed"}, status=405)