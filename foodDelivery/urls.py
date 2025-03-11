from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView

urlpatterns = [
    path('home/', TemplateView.as_view(template_name='Homepage.html'), name='home'),  #主页面
    path('restaurants/', include('restaurants.urls', namespace='restaurants')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)