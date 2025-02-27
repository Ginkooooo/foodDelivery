from django.shortcuts import get_object_or_404
from django.core.exceptions import PermissionDenied
from .models import Restaurant


def owner_required(view_func):
#验证当前用户是否为餐厅所有者的装饰器

    def wrapper(request, *args, **kwargs):
        # 通过URL参数获取餐厅ID
        restaurant = get_object_or_404(
            Restaurant,
            pk=kwargs.get('restaurant_id')  # 或根据实际参数名调整
        )

        # 权限验证核心逻辑
        if request.user != restaurant.owner:
            raise PermissionDenied("您无权操作其他商家的数据")

        return view_func(request, *args, **kwargs)

    return wrapper