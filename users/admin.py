from django.contrib.auth.admin import UserAdmin
from django.contrib import admin
from users.models import User


class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Custom Fields', {'fields': ('phone', 'address')}),
    )
admin.site.register(User, CustomUserAdmin)