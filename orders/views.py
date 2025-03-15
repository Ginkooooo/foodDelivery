from django.shortcuts import render
from users.models import Address


#确认订单
def confirm_order(request):
    address = Address.objects.filter(user=request.user).first()
    print(f"Address found: {address}")  # **调试信息**

    if request.method == 'GET':
        return render(request, 'confirm.html', {
            'address': address
        })
