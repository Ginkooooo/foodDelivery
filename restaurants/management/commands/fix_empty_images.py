from django.core.management.base import BaseCommand
from restaurants.models import Restaurant

class Command(BaseCommand):
    help = 'Fix empty image fields by setting a default image path'

    def handle(self, *args, **options):
        restaurants = Restaurant.objects.filter(image__isnull=True)
        count = 0
        for restaurant in restaurants:
            restaurant.image = 'defaults/default.png'
            restaurant.save()
            count += 1
        self.stdout.write(f'Updated {count} restaurants.')