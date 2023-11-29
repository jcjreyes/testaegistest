from rest_framework import serializers

from ..models import Yearbook

class YearbookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Yearbook
        fields = ["id","image", "date_submitted", "status"]
        read_only_fields = ["id","image"]

    def create(self, validated_data):
        image = validated_data.get("image", "")

        return Yearbook.objects.create(
            image=image
        )