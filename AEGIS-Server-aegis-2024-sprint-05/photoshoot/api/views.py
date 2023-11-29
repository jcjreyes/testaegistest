from django.contrib.auth import get_user_model

import datetime
from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import authentication, permissions

from ..models import Photoshoot, GroupPhotoshoot, Rescheduling, LateRegistration, Retake, PhotoshootDateTime
from ..services import export_writeups

User = get_user_model()

class ListGroupTypes(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, format=None):
        return Response(GroupPhotoshoot.Type.values)

class ListCOA(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, format=None):
        return Response(GroupPhotoshoot.COA.values)

class ListLIONS(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, format=None):
        return Response(GroupPhotoshoot.LIONS.values)

class ListReschedulingReasons(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, format=None):
        return Response(Rescheduling.Reasons.values)

class ListLateRegistrationReasons(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, format=None):
        return Response(LateRegistration.Reasons.values)

class ListRetakeReasons(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, format=None):
        return Response(Retake.Reasons.values)

class ModifySlots(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        datetime_id = request.data.get("id")
        method = request.data.get("method")
        print(datetime_id, method)

        datetime = PhotoshootDateTime.objects.get(id=datetime_id)

        if method == "subtract":
            datetime.slots -= 1
            if datetime.slots <= 0:
                datetime.status = "full_slots"
        else:
            datetime.slots += 1
            if datetime.slots > 0:
                datetime.status = "available_slots"

        datetime.save()
        return Response("Slot modified")


class ExportWriteups(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        queryset = User.objects.all()
        output = export_writeups(queryset)
        response = HttpResponse(
            output.read(),
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )
        response[
            "Content-Disposition"
        ] = f"attachment; filename=Approved_Writeups-{datetime.datetime.now().time()}.xlsx"
        return response