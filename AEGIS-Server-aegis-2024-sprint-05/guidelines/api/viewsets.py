from django.contrib.auth import get_user_model

from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response

from .serializers import GuidelinesSerializer
from .permissions import IsSelf
from ..models import Guidelines


class GuidelinesViewset(
    mixins.ListModelMixin,
    GenericViewSet,
):
    serializer_class = GuidelinesSerializer
    queryset = Guidelines.objects.all()
    permission_classes = [IsAuthenticated]