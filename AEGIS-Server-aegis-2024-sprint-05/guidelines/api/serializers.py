from ..models import Guidelines
from rest_framework import serializers
from rest_framework.decorators import action

class GuidelinesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guidelines
        fields = [
            "icon",
            "title",
            "content"
        ]

    def create(self, validated_data):
        icon = validated_data.get("icon", "")
        title = validated_data.get("title", "")
        content = validated_data.get("content", "")

        return Guidelines.objects.create(
            icon=icon,
            title=title,
            content=content,
        )

    def view(self, validated_data):
        guidelines = []
        guidelines_obj = Guidelines.objects.all()
        for obj in guidelines_obj:
            serialized_obj = serializers.serialize('json', guidelines_obj)
            guidelines.append(serialized_obj)
        return guidelines