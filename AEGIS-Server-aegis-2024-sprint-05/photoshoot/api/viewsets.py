from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import GenericViewSet
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from .serializers import *
from .permissions import IsSelf
from ..models import *

class PhotoshootGuidelinesViewset(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
):
    serializer_class = PhotoshootGuidelinesSerializer
    queryset = PhotoshootGuidelines.objects.all()
    permission_classes = [AllowAny]

    def get_permissions(self):
        if self.action == "create":
            return [IsAuthenticated()]
        else:
            return [permission() for permission in self.permission_classes]

class PhotoshootPeriodSettingsViewset(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
):
    serializer_class = PhotoshootPeriodSettingsSerializer
    queryset = PhotoshootPeriodSettings.objects.all()
    permission_classes = [AllowAny]

class PhotoshootPeriodViewset(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
):
    serializer_class = PhotoshootPeriodSerializer
    queryset = PhotoshootPeriod.objects.all()
    # permission_classes = [AllowAny] #change to IsAuthenticated
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action == "create":
            return [IsAuthenticated()]
        else:
            return [permission() for permission in self.permission_classes]

class EnlistmentDatesViewset(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
):
    serializer_class = EnlistmentDatesSerializer
    queryset = EnlistmentDates.objects.all()
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action == "create":
            return [IsAuthenticated()]
        else:
            return [permission() for permission in self.permission_classes]

class PhotoshootDateViewset(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
):
    serializer_class = PhotoshootDateSerializer
    queryset = PhotoshootDate.objects.all()
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action == "create":
            return [IsAuthenticated()]
        else:
            return [permission() for permission in self.permission_classes]

    def get_queryset(self):
        queryset = PhotoshootDate.objects.all()
        month = self.request.query_params.get('month')
        school = self.request.query_params.get('school')
        type = self.request.query_params.get('type')
        status = self.request.query_params.get('status')
        if month is not None:
            queryset = queryset.filter(available_date__month=month)
        if school is not None:
            queryset = queryset.filter(group=school)
        if type is not None:
            queryset = queryset.filter(period__type=type)
        if status is not None:
            queryset = queryset.filter(status=status)
        return queryset

class PhotoshootDateTimeViewset(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
):
    serializer_class = PhotoshootDateTimeSerializer
    queryset = PhotoshootDateTime.objects.all()
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action == "create":
            return [IsAuthenticated()]
        else:
            return [permission() for permission in self.permission_classes]

    def get_queryset(self):
        queryset = PhotoshootDateTime.objects.all().order_by("time")
        date = self.request.query_params.get('date')
        school = self.request.query_params.get('school')
        type = self.request.query_params.get('type')
        status = self.request.query_params.get('status')
        if date is not None:
            queryset = queryset.filter(date__available_date=date)
        if school is not None:
            queryset = queryset.filter(date__group=school)
        if type is not None:
            queryset = queryset.filter(date__period__type=type)
        if status is not None:
            queryset = queryset.filter(status=status)
        return queryset

class IndividualPhotoshootDetailsViewset(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
):
    serializer_class = IndividualPhotoshootDetailsSerializer
    queryset = IndividualPhotoshootDetails.objects.all()
    permission_classes = [IsAuthenticated, IsSelf]

    def get_permissions(self):
        if self.action == "create":
            return [IsAuthenticated()]
        else:
            return [permission() for permission in self.permission_classes]

class GroupPhotoshootDetailsViewset(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
):
    serializer_class = GroupPhotoshootDetailsSerializer
    queryset = GroupPhotoshootDetails.objects.all()
    permission_classes = [IsAuthenticated, IsSelf]

    def get_permissions(self):
        if self.action == "create":
            return [IsAuthenticated()]
        else:
            return [permission() for permission in self.permission_classes]

class PhotoshootViewset(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
):
    serializer_class = PhotoshootSerializer
    queryset = Photoshoot.objects.all()
    # permission_classes = [AllowAny] #change to IsAuthenticated
    permission_classes = [IsAuthenticated]

    # def list(self, request):
    #     user = request.user
    #     queryset = Photoshoot.objects.filter(user=user)
    #     serializer = PhotoshootSerializer(queryset, many=True)
    #     return Response(serializer.data)

    def get_queryset(self):
        user = self.request.user
        print(user.is_staff)
        if user.is_superuser or user.is_staff:
            queryset = Photoshoot.objects.all()
        else:
            queryset = Photoshoot.objects.filter(user=user)

        # Photoshoots based on a date
        date = self.request.query_params.get('date')
        print(date)
        if date is not None:
            queryset = queryset.filter(photoshoot_datetime__date__available_date=date)
        
        return queryset

    def get_permissions(self):
        # if self.action == "create":
        #     return [IsAuthenticated()]
        # else:
        return [permission() for permission in self.permission_classes]

    def destroy(self, request, pk):
        photoshoot = Photoshoot.objects.get(id=pk)
        date_time = PhotoshootDateTime.objects.get(id=photoshoot.photoshoot_datetime.id) 
        date_time.status = "available_slots"
        date_time.slots += 1
        date_time.save()
        photoshoot.delete()
        return Response({"message": "Item successfully deleted"})

class PhotoshootDetailViewset(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
):
    serializer_class = PhotoshootDetailSerializer
    queryset = Photoshoot.objects.all()
    permission_classes = [AllowAny] #change to IsAuthenticated
    
class ReschedulingDetailsViewset(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,   
):
    serializer_class = ReschedulingDetailsSerializer
    queryset = ReschedulingDetails.objects.all()
    permission_classes = [IsAuthenticated]

class ReschedulingReasonsViewset(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
):
    serializer_class = ReschedulingReasonsSerializer
    queryset = ReschedulingReasons.objects.all()
    permission_classes = [IsAuthenticated]

class ReschedulingViewset(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
):
    serializer_class = ReschedulingSerializer
    queryset = Rescheduling.objects.all()
    permission_classes = [IsAuthenticated]

class LateRegistrationDetailsViewset(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,   
):
    serializer_class = LateRegistrationDetailsSerializer
    queryset = LateRegistrationDetails.objects.all()
    permission_classes = [IsAuthenticated]

class LateRegistrationReasonsViewset(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
):
    serializer_class = LateRegistrationReasonsSerializer
    queryset = LateRegistrationReasons.objects.all()
    permission_classes = [IsAuthenticated]

class LateRegistrationViewset(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
):
    serializer_class = LateRegistrationSerializer
    queryset = LateRegistration.objects.all()
    permission_classes = [IsAuthenticated]
    

class RetakeDetailsViewset(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,   
):
    serializer_class = RetakeDetailsSerializer
    queryset = RetakeDetails.objects.all()
    permission_classes = [IsAuthenticated]

class RetakeReasonsViewset(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
):
    serializer_class = RetakeReasonsSerializer
    queryset = RetakeReasons.objects.all()
    permission_classes = [IsAuthenticated]

class RetakeViewset(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
):
    serializer_class = RetakeSerializer
    queryset = Retake.objects.all()
    permission_classes = [IsAuthenticated]
