from django.db import models


class Restaurant(models.Model):
    CATEGORY_CHOICES = [
        ('chineseFood', 'Chinese Food'),
        ('fastFood', 'Fast Food'),
        ('drinkAndCoffee', 'Drink And Coffee'),
        ('sushi', 'Sushi'),
        ('groceries', 'Groceries'),
    ]

    name = models.CharField(max_length=100)
    latitude = models.FloatField(default=0.0, help_text="Latitude of the restaurant")
    longitude = models.FloatField(default=0.0, help_text="Longitude of the restaurant")
    minimum_order = models.DecimalField(max_digits=6, decimal_places=2, default=0.0)
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        default='other',
        verbose_name='Restaurant category'
    )

    image = models.ImageField(upload_to='restaurant_images/', blank=True, null=True, help_text="Restaurant image")

    def __str__(self):
        return f"{self.name} ({self.latitude}, {self.longitude})"


class MenuItem(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)
