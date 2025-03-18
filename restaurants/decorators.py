from django.shortcuts import get_object_or_404
from django.core.exceptions import PermissionDenied
from .models import Restaurant


def owner_required(view_func):
# Decorator to verify that the current user is the restaurant owner

    def wrapper(request, *args, **kwargs):
        # Get the restaurant ID through the URL parameter
        restaurant = get_object_or_404(
            Restaurant,
            pk=kwargs.get('restaurant_id')  # Or change the value based on the actual parameter name
        )

        # Permission verification core logic
        if request.user != restaurant.owner:
            raise PermissionDenied("You have no right to manipulate other merchants' data")

        return view_func(request, *args, **kwargs)

    return wrapper