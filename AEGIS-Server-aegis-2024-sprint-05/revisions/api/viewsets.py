from django.contrib.auth import get_user_model

from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response

from .serializers import RevisionSerializer
from .permissions import IsSelf
from ..models import Revision


class RevisionViewset(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
):
    serializer_class = RevisionSerializer
    queryset = Revision.objects.all()
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action == "create":
            return [IsAuthenticated()]
        else:
            return [permission() for permission in self.permission_classes]