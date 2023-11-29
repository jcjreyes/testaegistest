from ..models import Writeup, Comment
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class WriteupSerializer(serializers.ModelSerializer):
    will_write = serializers.BooleanField(required=False)

    class Meta:
        model = Writeup
        fields = [
            "id",
            "status",
            "will_write",
            "content",
            "comment",
            "data",
            "date_submitted"
        ]
        read_only_fields = ["id"]

    def get_writeup_content(self, obj):
        return f"{obj.content}"

    def create(self, validated_data):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user

        data = validated_data.get("data", "")
        will_write = validated_data.get("will_write", "")
        content = validated_data.get("content", "")
        status = validated_data.get("status", "")

        return Writeup.objects.create(
            user=user,
            comment="",
            data=data,
            will_write=will_write,
            content=content,
            status=status,
        )

    def update(self, instance, validated_data):
        instance.status = validated_data.get('status', instance.status)
        instance.content = validated_data.get('content', instance.content)
        instance.data = validated_data.get('data', instance.data)
        instance.comment = validated_data.get('comment', instance.comment)
        instance.save()
        return instance

class WriteupCommentSerializer(serializers.ModelSerializer):
    writeup = WriteupSerializer(read_only=True)
    comment = serializers.CharField(max_length=250)
    writeup_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Comment
        fields = [
            "id",
            "user",
            "writeup",
            "comment",
            "date",
            "writeup_id"
        ]
        read_only_fields = ["id", "user", "date"]

    def create(self, validated_data):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user

        writeup = validated_data.get("writeup_id", "")

        writeup = Writeup.objects.get(id=writeup)
        comment = validated_data.get("comment", "")

        return Comment.objects.create(
            user=user,
            writeup=writeup,
            comment=comment
        )