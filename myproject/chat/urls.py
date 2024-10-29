from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MessageViewset

router = DefaultRouter()
router.register('message',MessageViewset)

urlpatterns = [
    path('api/', include(router.urls)),
]
