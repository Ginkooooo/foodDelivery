from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    ]

    username = models.CharField(max_length=150, unique=True)  # 用户名（必须唯一）
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True)  # 性别
    email = models.CharField(max_length=128)  # 邮箱（唯一）
    password = models.CharField(max_length=128)  # 密码（Django 默认哈希存储）
    phone = models.CharField(max_length=15, blank=True)  # 电话
    latitude = models.FloatField(blank=True, null=True, help_text="User's latitude")  # 纬度
    longitude = models.FloatField(blank=True, null=True, help_text="User's longitude")  # 经度

    def __str__(self):
        return self.username


class Address(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='addresses'
    )
    name = models.CharField(max_length=50)
    tel = models.CharField(max_length=20)
    address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Addresses"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.address[:20]}"