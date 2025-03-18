import json

from django.db import transaction
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from orders.models import OrderItem, Order
from restaurants.models import MenuItem, Restaurant
from users.models import Address, User


#confirm an order
def confirm_order(request):
    restaurant_id = request.GET.get('restaurant_id')
    restaurant = Restaurant.objects.get(id=restaurant_id)
    address_id = request.GET.get('address_id')
    if address_id:
        try:
            address = Address.objects.get(id=address_id, user=request.user)
        except Address.DoesNotExist:
            # Processing invalid address ID
            address = Address.objects.filter(user=request.user).first()
    else:
        # If no address id is provided, the first address of the user is obtained
        address = Address.objects.filter(user=request.user).first()
    item_params = request.GET.getlist('items')
    items_data = []
    for item_param in item_params:
        try:
            item_id, quantity = item_param.split(":")
            item = MenuItem.objects.get(id=int(item_id))  # Get Item instance
            items_data.append({"item": item, "quantity": int(quantity)})
        except (ValueError, MenuItem.DoesNotExist):
            continue  # Skip invalid data

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

#Client order list
def orders_list(request):
    # Gets all orders for the current user and prefetches associated order items and items
    orders = Order.objects.filter(user=request.user).prefetch_related(
        'orderitem_set__item'
    ).select_related('restaurant')

    # Construct a list of product information for each order (without directly manipulating many-to-many fields)
    for order in orders:
        order.item_details = []  # Use new field names to avoid collisions
        for order_item in order.orderitem_set.all():
            order.item_details.append({
                'name': order_item.item.name,
                'price': order_item.item.price,
                'quantity': order_item.quantity,
                'subtotal': order_item.item.price * order_item.quantity
            })
        # Calculate total price (assuming delivery cost is 3)
        order.calculated_total = sum(item['subtotal'] for item in order.item_details) + 3

    return render(request, 'orders.html', {'orders': orders})

#create order
@csrf_exempt
def create_order(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            total = data.get("total")
            restaurant_id = data.get("restaurant_id")
            user_id = data.get("user_id")
            items = data.get("items", [])

            # Verify necessary parameters
            if not all([total, restaurant_id, user_id]):
                return JsonResponse({"success": False, "error": "Missing required parameters"}, status=400)

            # Make sure the restaurant and user exist
            restaurant = Restaurant.objects.get(id=restaurant_id)
            user = User.objects.get(id=user_id)

            with transaction.atomic():
                # create order
                order = Order.objects.create(
                    user=user,
                    restaurant=restaurant,
                    total=total,
                    status='X'
                )

                # Create order items in bulk
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
                OrderItem.objects.bulk_create(order_items)  # Batch insertion

            return JsonResponse({"success": True, "order_id": order.id})

        except Restaurant.DoesNotExist:
            return JsonResponse({"success": False, "error": "Restaurant not found"}, status=404)
        except User.DoesNotExist:
            return JsonResponse({"success": False, "error": "User not found"}, status=404)
        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)}, status=500)

        return JsonResponse({"success": False, "error": "Method not allowed"}, status=405)


#Merchant side order list
def merchant_orders_list(request, pk):
    # Get all orders for the current restaurant
    orders = Order.objects.filter(restaurant_id=pk).prefetch_related(
        'orderitem_set__item'
    ).select_related('user', 'restaurant')

    # Sort by new status
    preparing_orders = []
    finished_orders = []
    awaiting_orders = []

    for order in orders:
        # Process order item details
        order.item_details = []
        for order_item in order.orderitem_set.all():
            order.item_details.append({
                'name': order_item.item.name,
                'price': order_item.item.price,
                'quantity': order_item.quantity,
                'subtotal': order_item.item.price * order_item.quantity
            })

        # calculate the total price
        order.calculated_total = sum(item['subtotal'] for item in order.item_details) + 3

        # Get user address
        order.user_address = Address.objects.filter(user=order.user).first()

        # Sort by new status
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

            if not order_id:
                return JsonResponse({"success": False, "error": "Order ID is required"}, status=400)

            # Get orders and update status
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