from django.db import transaction
from django.shortcuts import redirect
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView
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


class OrderListView(LoginRequiredMixin, ListView):
    model = Order
    template_name = 'orders/order_list.html'  # 模板路径
    context_object_name = 'orders'
    paginate_by = 10  # 分页设置

    def get_queryset(self):
        """获取当前用户的订单，按时间倒序排列"""
        return Order.objects.filter(
            user=self.request.user
        ).select_related('restaurant').prefetch_related('items').order_by('-created_at')