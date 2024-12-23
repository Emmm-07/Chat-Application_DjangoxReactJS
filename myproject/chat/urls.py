from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MessageViewset
import views

router = DefaultRouter()
router.register('message',MessageViewset)

urlpatterns = [
    path('api/', include(router.urls)),

    path('login',views.login),
]
    