from django.db import models

class Restaurant(models.Model):

    #餐厅的类别 可更改
    CATEGORY_CHOICES = [
        ('chinese', 'Chinese'),
        ('western', 'Western'),
        ('fastfood', 'Fastfood'),
        ('hotpot', 'Hotpot'),
        ('japanese', 'Japanese'),
        ('cafe', 'Cafe'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=100)
    address = models.TextField()
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        default='other',
        verbose_name='Restaurant category'
    )

    class Meta:
        verbose_name = ' restaurant'
        verbose_name_plural = 'restaurant list'  # 后台显示名称

    def get_absolute_url(self):
        from django.urls import reverse
        return reverse('restaurant_detail', args=[str(self.id)])

class MenuItem(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)
