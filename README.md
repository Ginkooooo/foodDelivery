Two operating modes:

1. The interface can be accessed directly via the url: https://fooddelivery-w663.onrender.com

2. Create a local database food_delivery.sql;
   Import food_delivery_backup.sql into food_delivery.sql: mysql -u root -p food_delivery< food_delivery_backup.sql
   Modify the settings.py configuration in the foodDelivery folder:
   DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": 'food_delivery',
        'USER': 'root',       
        'PASSWORD': 'your_password',   # Change to the local database password
        'HOST': 'localhost', 
        'PORT': '3306', 
    }
    }
    Database Migration: python manage.py makemigrations
                        python manage.py migrate
    Run the server: python manage.py runserver
    Visit url: http://127.0.0.1:8000/login/

Available test accounts:
user: name: Koreyoshi password: 111
merchant: name: Macdonald password: mac