from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from restaurants.views import restaurant_list

urlpatterns = [
    path('home/', restaurant_list, name='home'),  # 主页面
    path('restaurants/', include('restaurants.urls', namespace='restaurants')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)