from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ReadOnlyModelViewSet


from .serializers import AnnouncementsSerializer
from ..models import Announcements


class AnnouncementViewSet(ReadOnlyModelViewSet):
    queryset = Announcements.objects.all()
    serializer_class = AnnouncementsSerializer
    permission_classes = [AllowAny]

