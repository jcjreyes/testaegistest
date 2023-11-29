from django.contrib.auth import get_user_model

from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet

from .serializers import WriteupSerializer, WriteupCommentSerializer
from .permissions import IsSelf
from ..models import Writeup, Comment


class WriteupViewset(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
):
    serializer_class = WriteupSerializer
    queryset = Writeup.objects.all()
    permission_classes = [IsAuthenticated] #Removed IsSelf so that admin can PUT request without permission

    def get_permissions(self):
        if self.action == "create":
            return [IsAuthenticated()]
        else:
            return [permission() for permission in self.permission_classes]

    def get_queryset(self):
        queryset = Writeup.objects.all()
        user = self.request.user
        if not (user.is_staff or user.is_superuser):
            queryset = queryset.filter(user=user)
        return queryset

class WriteupCommentViewset(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
):
    serializer_class = WriteupCommentSerializer
    queryset = Comment.objects.all()
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action == "create":
            return [IsAuthenticated()]
        else:
            return [permission() for permission in self.permission_classes]

    def get_queryset(self):
        queryset = Comment.objects.all()
        writeup = self.request.query_params.get('writeup')
        if writeup is not None:
            queryset = queryset.filter(writeup=writeup)
        return queryset