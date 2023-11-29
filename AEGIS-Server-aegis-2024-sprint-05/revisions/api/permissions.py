from rest_framework import permissions
from ..models import Revision


class IsSelf(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user
