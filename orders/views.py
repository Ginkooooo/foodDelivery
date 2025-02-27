from django.db import transaction
from django.shortcuts import redirect
from orders.models import Order, OrderItem


#订单创建
@transaction.atomic
def create_order(request):
    cart = request.user.cart
    order = Order.objects.create(user=request.user)
    for item in cart.items.all():
        OrderItem.objects.create(order=order, item=item.menu_item, quantity=item.quantity)
    cart.items.all().delete()
    return redirect('order_detail', order.id)