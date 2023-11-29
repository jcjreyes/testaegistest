from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response

from .serializers import YearbookSerializer
from ..models import Yearbook
from .permissions import IsSelf

class YearbookViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
    ):
    queryset = Yearbook.objects.all()
    serializer_class = YearbookSerializer
    permission_classes = [IsAuthenticated, IsSelf]

    def list(self, request):
        user = request.user
        queryset = Yearbook.objects.get(user=user)
        serializer = YearbookSerializer(queryset, many=True)
        return Response(serializer.data)

    def get_permissions(self):
        if self.action == "create":
            return [IsAuthenticated()]
        else:
            return [permission() for permission in self.permission_classes]
