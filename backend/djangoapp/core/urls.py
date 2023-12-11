"""
The `urlpatterns` list routes URLs to views.
https://docs.djangoproject.com/en/4.1/topics/http/urls/
"""
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path(route='api/user/', view=include('apps.user.urls'), name='user'),
    path(route='api/blog', view=include('apps.blog.urls'), name='blog'),
    path(route='api/token/access/', view=TokenObtainPairView.as_view(), name='token_access'),
    path(route='api/token/refresh/', view=TokenRefreshView.as_view(), name='token_refresh'),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )