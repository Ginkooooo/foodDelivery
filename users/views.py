import json
import re
import traceback

from urllib.parse import urlencode
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password, check_password
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.http import JsonResponse
from django.shortcuts import redirect, render, get_object_or_404
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from restaurants.models import Restaurant
from users.models import User, Address


#register
@csrf_exempt
def register(request):
    if request.method == 'GET':
        return render(request, 'register.html')

    if request.method == 'POST':
        try:
            # Parsing JSON data
            try:
                data = json.loads(request.body)
            except json.JSONDecodeError as e:
                return JsonResponse({
                    'success': False,
                    'error': 'Invalid JSON format'
                }, status=400)

            errors = {}

            # Verify required fields
            required_fields = ['username', 'phone', 'email', 'password']
            for field in required_fields:
                if not data.get(field):
                    errors[field] = 'This field is required'

            # Mailbox format verification
            if data.get('email'):
                try:
                    validate_email(data['email'])
                except ValidationError as e:
                    errors['email'] = 'Invalid email format'

            # Mobile number format verification (11 digits)
            if data.get('phone') and not re.match(r'^\d{11}$', data['phone']):
                errors['phone'] = 'Phone number must be 11 digits'

            if errors:
                return JsonResponse({
                    'success': False,
                    'errors': errors
                }, status=400)

             # Create user objects
            try:
                user = User.objects.create(
                    username=data['username'],
                    gender=data.get('gender', ''),
                    phone=data['phone'],
                    email=data['email'],
                    password=make_password(data['password'])
                )
                return JsonResponse({
                    'success': True,
                    'message': 'Registration successful!'
                }, status=201)
            except Exception as e:
                traceback.print_exc()
                return JsonResponse({
                    'success': False,
                    'error': f'Database error: {str(e)}'
                }, status=500)

        except Exception as e:
            traceback.print_exc()
            return JsonResponse({
                'success': False,
                'error': f'Unexpected error: {str(e)}'
            }, status=500)

    return JsonResponse({  # Non-post requests return JSON
        'error': 'Method not allowed'
    }, status=405)

#log in
@csrf_exempt
def login_view(request):
    if request.method == 'GET':
        return render(request, 'login.html')

    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            user_type = data.get('user_type', 'user')

            response_data = {}

            # Merchant logon logic
            if user_type == 'merchant':
                try:
                    merchant = Restaurant.objects.get(username=username)
                    if check_password(password, merchant.password) or password == merchant.password:
                        request.session['restaurant_id'] = merchant.id
                        request.session['restaurant_username'] = merchant.username
                        request.session['is_merchant'] = True
                        request.session.modified = True
                        request.session.save()  # Make sure to save the session immediately

                        return JsonResponse({
                            'success': True,
                            'message': 'Merchant login successful!',
                            'redirect': '/merchant/edit'
                        }, status=200)
                    else:
                        return JsonResponse({
                            'success': False,
                            'error': 'Invalid password'
                        }, status=401)
                except Restaurant.DoesNotExist:
                    return JsonResponse({
                        'success': False,
                        'error': 'Merchant not found'
                    }, status=404)

            # Common user login logic
            else:
                user = authenticate(request, username=username, password=password)
                if user is not None:
                    login(request, user)
                    return JsonResponse({
                        'success': True,
                        'message': 'User login successful!',
                        'redirect': '/home'
                    }, status=200)
                else:
                    return JsonResponse({
                        'success': False,
                        'error': 'Invalid credentials'
                    }, status=401)

        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=500)

    return JsonResponse({'success': False, 'error': 'Method not allowed'}, status=405)

#address list

@login_required
def address_list(request):
    addresses = request.user.addresses.all().order_by('-created_at')
    params = {
        'restaurant_id': request.GET.get('restaurant_id'),
        'items': request.GET.getlist('items')
    }
    return render(request, 'address.html', {
        'addresses': addresses,
        'preserve_params': urlencode(params, doseq=True)
    })

#delete address
@login_required
def delete_address(request, pk):
    address = get_object_or_404(Address, pk=pk, user=request.user)
    address.delete()
    return redirect('address_list')

#add address
@login_required
def add_address(request):
    preserve_params = request.GET.urlencode()

    if request.method == 'POST':
        try:

            data = json.loads(request.body)
            Address.objects.create(
                user=request.user,
                name=data['name'],
                tel=data['tel'],
                address=data['address']
            )

            return JsonResponse({'success': True, 'redirect': f"{reverse('address_list')}?{preserve_params}"})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})

    preserve_params = request.GET.urlencode()
    return render(request, 'add_address.html', {
        'preserve_params': preserve_params
    })

#edit address
@login_required
def edit_address(request, pk):
    address = get_object_or_404(Address, pk=pk, user=request.user)
    return render(request, 'edit_address.html', {'address': address})


# confirm edit address
@login_required
def edit_address_confirm(request, pk):
    address = get_object_or_404(Address, pk=pk, user=request.user)
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            required_fields = ['name', 'tel', 'address']
            if not all(field in data for field in required_fields):
                return JsonResponse({'success': False, 'error': 'Missing required fields'}, status=400)

            # update
            address.name = data['name']
            address.tel = data['tel']
            address.address = data['address']
            address.save()

            return JsonResponse({'success': True})

        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'error': 'Invalid JSON data'}, status=400)
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=500)
    return JsonResponse({'error': 'Method not allowed'}, status=405)