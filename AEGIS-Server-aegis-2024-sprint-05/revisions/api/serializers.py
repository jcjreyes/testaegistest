from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.decorators import action
from .permissions import IsSelf

from ..models import Revision

User = get_user_model()

class RevisionSerializer(serializers.ModelSerializer):
    status = serializers.BooleanField()

    class Meta:
        model = Revision
        fields = [
            "status",
            "full_name",
            "primary_course",
            "minor",
            "content",
            "data",
            "requests",
        ]
        read_only_fields = ["photos"]

    def get_cleaned_data(self):
        return {
            "full_name": self.validated_data.get("full_name", ""),
            "primary_course": self.validated_data.get("primary_course", ""),
            "minor": self.validated_data.get("minor", ""),
            "content": self.validated_data.get("content", ""),
            "data": self.validated_data.get("data", ""),
            "requests": self.validated_data.get("requests", ""),
        }

    def create(self, validated_data):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user

        revision = Revision.objects.create(
            user=user,
            full_name=validated_data.get("full_name", ""),
            primary_course=validated_data.get("primary_course", ""),
            minor=validated_data.get("minor", ""),
            content=validated_data.get("content", ""),
            data=validated_data.get("data", ""),
            requests=validated_data.get("requests", ""),
        )
        revision.save()
        return revision