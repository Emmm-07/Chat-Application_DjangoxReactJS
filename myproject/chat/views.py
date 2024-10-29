
from rest_framework import viewsets
from .models import Messages
from serializers import MessageSerializer

# Create your views here.
class MessageViewset(viewsets.ModelViewSet):
    queryset =  Messages.objects.all.order_by('-timestamp')
    serializer_class = MessageSerializer