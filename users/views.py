import json
import re

from django.contrib.auth import login, authenticate
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import redirect, render
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView
from users.models import User


#注册
@csrf_exempt
def register(request):
    if request.method == 'GET':
        return render(request, 'register.html')

    if request.method == 'POST':
        try:
            # 解析JSON数据
            try:
                data = json.loads(request.body)
            except json.JSONDecodeError:
                return JsonResponse({
                    'success': False,
                    'error': 'Invalid JSON format'
                }, status=400)

            errors = {}

            # 验证必填字段
            required_fields = ['username', 'phone', 'email', 'password']
            for field in required_fields:
                if not data.get(field):
                    errors[field] = 'This field is required'

            # 邮箱格式验证
            if data.get('email'):
                try:
                    validate_email(data['email'])
                except ValidationError:
                    errors['email'] = 'Invalid email format'

            # 手机号格式验证（11位数字）
            if data.get('phone') and not re.match(r'^\d{11}$', data['phone']):
                errors['phone'] = 'Phone number must be 11 digits'

            if errors:
                return JsonResponse({  # 返回JSON
                    'success': False,
                    'errors': errors
                }, status=400)

                # 创建用户对象
            user = User.objects.create(
                username=data['username'],
                gender=data.get('gender', ''),
                phone=data['phone'],
                email=data['email'],
                password=data['password']
            )

            return JsonResponse({
                'success': True,
                'message': 'Registration successful!'
            }, status=201)


        except IntegrityError as e:
            return JsonResponse({
                'success': False,
                'errors': {
                    'database': str(e)
                }
            }, status=400)

        except Exception as e:
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=500)

    return JsonResponse({  # 非POST请求返回JSON
        'error': 'Method not allowed'
    }, status=405)

#用户个人页面
class ProfileView(LoginRequiredMixin, TemplateView):
    template_name = 'users/profile.html'

    #将用户信息用在模板中
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['user'] = self.request.user
        return context

#头像跳转逻辑
def profile_redirect(request):
    if request.user.is_authenticated:
        return redirect('profile')
    return redirect('login')