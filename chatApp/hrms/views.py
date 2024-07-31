from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Message
from .serializer import MessageSerializer
from rest_framework.permissions import IsAuthenticated

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    # permission_classes = [IsAuthenticated]
    

    def get_queryset(self):
        user = self.request.user
        return Message.objects.filter(recipient=user) | Message.objects.filter(sender=user)
