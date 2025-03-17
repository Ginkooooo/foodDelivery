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
    restaurant_id = request.GET.get('restaurant_id')
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

def pay(request, amount):
    amount = float(amount)

    if request.method == 'GET':
        return render(request, 'pay.html', {'amount':amount} )

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
                    status='X'
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


#商家端订单列表
def merchant_orders_list(request, pk):
    # 获取当前餐厅的所有订单
    orders = Order.objects.filter(restaurant_id=pk).prefetch_related(
        'orderitem_set__item'
    ).select_related('user', 'restaurant')

    # 按新状态分类
    preparing_orders = []
    finished_orders = []
    awaiting_orders = []

    for order in orders:
        # 处理订单项详情
        order.item_details = []
        for order_item in order.orderitem_set.all():
            order.item_details.append({
                'name': order_item.item.name,
                'price': order_item.item.price,
                'quantity': order_item.quantity,
                'subtotal': order_item.item.price * order_item.quantity
            })

        # 计算总价
        order.calculated_total = sum(item['subtotal'] for item in order.item_details) + 3

        # 获取用户地址
        order.user_address = Address.objects.filter(user=order.user).first()

        # 按新状态分类
        if order.status == 'P':
            preparing_orders.append(order)
        elif order.status == 'C':
            finished_orders.append(order)
        elif order.status == 'X':
            awaiting_orders.append(order)

    return render(request, 'merchant_orders.html', {
        'preparing_orders': preparing_orders,
        'finished_orders': finished_orders,
        'awaiting_orders': awaiting_orders
    })


def merchant_confirm_await(request,oid):
    restaurant_id = request.session.get('restaurant_id')
    order = Order.objects.get(id=oid)
    order_address = Address.objects.filter(user=order.user).first()
    order_items = OrderItem.objects.filter(order=order)
    items_ids = order_items.values_list('item_id', flat=True)
    menu_items = MenuItem.objects.filter(id__in=items_ids)
    quantities = list(order_items.values_list('quantity', flat=True))
    quantities_dict = dict(zip(items_ids, quantities))
    if request.method == "GET":
        return render(request, 'merchant_confirm_await.html', {'restaurant_id': restaurant_id, 'order': order, 'order_address': order_address, 'order_items': order_items, 'menu_items': menu_items, 'quantities': quantities, 'quantities_dict': quantities_dict})


def merchant_confirm_finish(request,oid):
    restaurant_id = request.session.get('restaurant_id')
    order = Order.objects.get(id=oid)
    order_address = Address.objects.filter(user=order.user).first()
    order_items = OrderItem.objects.filter(order=order)
    items_ids = order_items.values_list('item_id', flat=True)
    menu_items = MenuItem.objects.filter(id__in=items_ids)
    quantities = order_items.values_list('quantity', flat=True)
    quantities_dict = dict(zip(items_ids, quantities))
    if request.method == "GET":
        return render(request, 'merchant_confirm_finish.html', {'restaurant_id': restaurant_id, 'order': order, 'order_address': order_address, 'order_items': order_items, 'menu_items': menu_items, 'quantities': quantities, 'quantities_dict': quantities_dict})


def merchant_confirm_preparing(request,oid):
    restaurant_id = request.session.get('restaurant_id')
    order = Order.objects.get(id=oid)
    order_address = Address.objects.filter(user=order.user).first()
    order_items = OrderItem.objects.filter(order=order)
    items_ids = order_items.values_list('item_id', flat=True)
    menu_items = MenuItem.objects.filter(id__in=items_ids)
    quantities = order_items.values_list('quantity', flat=True)
    quantities_dict = dict(zip(items_ids, quantities))
    if request.method == "GET":
        return render(request, 'merchant_confirm_preparing.html', {'restaurant_id': restaurant_id, 'order': order, 'order_address': order_address, 'order_items': order_items, 'menu_items': menu_items, 'quantities': quantities, 'quantities_dict': quantities_dict})




@csrf_exempt
def update_order_status(request):
    if request.method == "POST":
        try:
            order_id = request.POST.get('order_id')
            new_status = request.POST.get('status')
            print("order_id", order_id)

            if not order_id:
                return JsonResponse({"success": False, "error": "Order ID is required"}, status=400)

            # 获取订单并更新状态
            try:
                order = Order.objects.get(id=order_id)
                order.status = new_status
                order.save()

                return JsonResponse({"success": True, "message": "Order status updated!"})
            except Order.DoesNotExist:
                return JsonResponse({"success": False, "error": "Order not found"}, status=404)

        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)}, status=500)

    return JsonResponse({"success": False, "error": "Invalid request"}, status=400)