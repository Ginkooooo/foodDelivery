from django.shortcuts import render

from orders.models import OrderItem
from restaurants.models import MenuItem
from users.models import Address


#确认订单
def confirm_order(request):
    restaurant_id = request.session.get('restaurant_id')
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

    print("[DEBUG] Full GET parameters:", request.GET)  # 打印所有参数
    item_params = request.GET.getlist('items')
    print("[DEBUG] Raw items data:", item_params)

    items_data = []
    for item_param in item_params:
        try:
            print("[DEBUG] Processing item_param:", item_param)
            item_id, quantity = item_param.split(":")
            item = MenuItem.objects.get(id=int(item_id))  # 获取 Item 实例
            items_data.append({"item": item, "quantity": int(quantity)})
        except (ValueError, MenuItem.DoesNotExist):
            continue  # 跳过无效数据

    print(f"Items received: {items_data}")  # 调试信息

    if request.method == 'GET':
        return render(request, 'confirm.html', {
            'address': address,
            'items_data': items_data,
            'restaurant_id': restaurant_id,
        })

