from ..models import *
from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from datetime import datetime, timedelta, date

# from accounts.api.serializers import UserSerializer


class PhotoshootGuidelinesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhotoshootGuidelines
        fields = ["things_to_accomplish", "reminders"]

    def save(self):
        things_to_accomplish = self.validated_data.get("things_to_accomplish", "")
        reminders = self.validated_data.get("reminders", "")
        return PhotoshootGuidelines.objects.create(
            things_to_accomplish=things_to_accomplish, reminders=reminders
        )

    def update(self, instance):
        return super().update(instance, self.validated_data)


class PhotoshootPeriodSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhotoshootPeriodSettings
        fields = ["total_slots", "slots_per_hour", "slots_per_day"]

    def save(self, *args, **kwargs):
        if not self.pk and PhotoshootPeriodSettings.objects.exists():
            # if you'll not check for self.pk
            # then error will also raised in update of exists model
            raise serializers.ValidationError(
                'There is can be only one Photoshoot Period Settings instance'
            )
        return super(PhotoshootPeriodSettings, self).save(*args, **kwargs)


class PhotoshootPeriodSerializer(serializers.ModelSerializer):
    earliest = serializers.SerializerMethodField()
    latest = serializers.SerializerMethodField()

    first_choice = serializers.CharField(write_only=True)
    second_choice = serializers.CharField(required=False, write_only=True)
    third_choice = serializers.CharField(required=False, write_only=True)
    fourth_choice = serializers.CharField(required=False, write_only=True)
    first_choice_slots = serializers.IntegerField(required=False, write_only=True)
    second_choice_slots = serializers.IntegerField(required=False, write_only=True)
    third_choice_slots = serializers.IntegerField(required=False, write_only=True)
    fourth_choice_slots = serializers.IntegerField(required=False, write_only=True)
    group_slots = serializers.IntegerField(required=False, write_only=True)

    start_date = serializers.DateField(required=False, write_only=True)
    end_date = serializers.DateField(required=False, write_only=True)
    # som_day = serializers.DateField(required=False, write_only=True)
    # soh_day = serializers.DateField(required=False, write_only=True)
    # sose_day = serializers.DateField(required=False, write_only=True)
    # soss_day = serializers.DateField(required=False, write_only=True)
    # group_day = serializers.DateField(required=False, write_only=True)

    time_from = serializers.TimeField(write_only=True)
    time_to = serializers.TimeField(write_only=True)

    class Meta:
        model = PhotoshootPeriod
        fields = [
            "id",
            "title",
            "type",
            "earliest",
            "latest",
            "time_from",
            "time_to",
            "start_date",
            "end_date",
            # "som_day",
            # "soh_day",
            # "sose_day",
            # "soss_day",
            # "group_day",
            "first_choice_slots",
            "second_choice_slots",
            "third_choice_slots",
            "fourth_choice_slots",
            # "som_slots",
            # "soh_slots",
            # "sose_slots",
            # "soss_slots",
            "group_slots",
            "first_choice",
            "second_choice",
            "third_choice",
            "fourth_choice",
        ]

    def get_earliest(self, obj):
        if hasattr(obj, 'get_earliest_date'):
            return obj.get_earliest_date
        return None

    def get_latest(self, obj):
        if hasattr(obj, 'get_latest_date'):
            return obj.get_latest_date
        return None

    def save(self):
        cleaned_data = self.validated_data
        type = cleaned_data.get("type", "")

        period = PhotoshootPeriod.objects.create(
            title=cleaned_data.get("title", ""),
            type=type,
        )

        time_from = cleaned_data.get("time_from")
        time_to = cleaned_data.get("time_to")
        time_delta = datetime.combine(date.min, time_to) - datetime.combine(
            date.min, time_from
        )

        start_date = cleaned_data.get("start_date")
        end_date = cleaned_data.get("end_date")
        delta = timedelta(days=1)

        first_choice = cleaned_data.get("first_choice")
        second_choice = cleaned_data.get("second_choice", "")
        third_choice = cleaned_data.get("third_choice", "")
        fourth_choice = cleaned_data.get("fourth_choice", "")
        print(cleaned_data)

        # When type is individual
        if type == "Individual":
            first_choice_slots = cleaned_data.get("first_choice_slots")
            second_choice_slots = cleaned_data.get("second_choice_slots")
            third_choice_slots = cleaned_data.get("third_choice_slots")
            fourth_choice_slots = cleaned_data.get("fourth_choice_slots")

            while start_date <= end_date:
                print(start_date.strftime("%Y-%m-%d"))
                if first_choice_slots and first_choice_slots > 0:
                    photoshoot_date = PhotoshootDate.objects.create(
                        status="available_slots",
                        group=first_choice,
                        period=period,
                        available_date=start_date,
                    )
                    photoshoot_date.save()

                    for i in range(int(str(time_delta).split(":")[0])):
                        hour = (
                            datetime.combine(date.min, time_from) + timedelta(hours=i)
                        ).time()
                        time = PhotoshootDateTime.objects.create(
                            status="available_slots",
                            date=photoshoot_date,
                            time=hour,
                            slots=first_choice_slots,
                        )
                        time.save()

                if second_choice and second_choice_slots and second_choice_slots > 0:
                    photoshoot_date = PhotoshootDate.objects.create(
                        status="available_slots",
                        group=second_choice,
                        period=period,
                        available_date=start_date,
                    )
                    photoshoot_date.save()

                    for i in range(int(str(time_delta).split(":")[0])):
                        hour = (
                            datetime.combine(date.min, time_from) + timedelta(hours=i)
                        ).time()
                        time = PhotoshootDateTime.objects.create(
                            status="available_slots",
                            date=photoshoot_date,
                            time=hour,
                            slots=second_choice_slots,
                        )
                        time.save()

                if third_choice and third_choice_slots and third_choice_slots > 0:
                    photoshoot_date = PhotoshootDate.objects.create(
                        status="available_slots",
                        group=third_choice,
                        period=period,
                        available_date=start_date,
                    )
                    photoshoot_date.save()

                    for i in range(int(str(time_delta).split(":")[0])):
                        hour = (
                            datetime.combine(date.min, time_from) + timedelta(hours=i)
                        ).time()
                        time = PhotoshootDateTime.objects.create(
                            status="available_slots",
                            date=photoshoot_date,
                            time=hour,
                            slots=third_choice_slots,
                        )
                        time.save()

                if fourth_choice and fourth_choice_slots and fourth_choice_slots > 0:
                    photoshoot_date = PhotoshootDate.objects.create(
                        status="available_slots",
                        group=fourth_choice,
                        period=period,
                        available_date=start_date,
                    )
                    photoshoot_date.save()

                    for i in range(int(str(time_delta).split(":")[0])):
                        hour = (
                            datetime.combine(date.min, time_from) + timedelta(hours=i)
                        ).time()
                        time = PhotoshootDateTime.objects.create(
                            status="available_slots",
                            date=photoshoot_date,
                            time=hour,
                            slots=fourth_choice_slots,
                        )
                        time.save()
                start_date += delta

        # When type is Group
        elif type == "Group":
            while start_date <= end_date:
                group_slots = cleaned_data.get("group_slots")
                if group_slots and group_slots > 0:
                    photoshoot_date = PhotoshootDate.objects.create(
                        status="available_slots",
                        group="GROUP",
                        period=period,
                        available_date=start_date,
                    )
                    photoshoot_date.save()

                    for i in range(int(str(time_delta).split(":")[0])):
                        hour = (
                            datetime.combine(date.min, time_from) + timedelta(hours=i)
                        ).time()
                        time = PhotoshootDateTime.objects.create(
                            status="available_slots",
                            date=photoshoot_date,
                            time=hour,
                            slots=group_slots,
                        )
                        time.save()

                start_date += delta


class EnlistmentDatesSerializer(serializers.ModelSerializer):
    periods = PhotoshootPeriodSerializer(read_only=True, many=True)
    period_ids = serializers.ListField(write_only=True)
    time_from = serializers.TimeField()
    time_to = serializers.TimeField()

    class Meta:
        model = EnlistmentDates
        fields = ["group", "date", "periods", "period_ids", "time_from", "time_to"]

    def save(self):
        cleaned_data = self.validated_data
        group = cleaned_data.get("group")
        date = cleaned_data.get("date")
        period_ids = cleaned_data.get("period_ids")
        time_from = cleaned_data.get("time_from")
        time_to = cleaned_data.get("time_to")

        periods = PhotoshootPeriod.objects.filter(id__in=period_ids)
        enlistment_date = EnlistmentDates.objects.create(
            group=group, date=date, time_from=time_from, time_to=time_to
        )

        for period in periods:
            enlistment_date.periods.add(period)

        return enlistment_date


class PhotoshootDateSerializer(serializers.ModelSerializer):
    period = PhotoshootPeriodSerializer()

    class Meta:
        model = PhotoshootDate
        fields = [
            "id",
            "status",
            "group",
            "period",
            "available_date",
        ]

    def save(self):
        cleaned_data = self.validated_data

        period = PhotoshootPeriod.objects.create(type=cleaned_data.get("type", ""))
        period.title = f"Set {period.id}"
        period.save()

        date = PhotoshootDate.objects.create(
            status="available_slots",
            period=period,
            available_date=cleaned_data.get("available_date", ""),
        )
        date.save()
        return date


class PhotoshootDateTimeSerializer(serializers.ModelSerializer):
    date = PhotoshootDateSerializer()

    class Meta:
        model = PhotoshootDateTime
        fields = ["id", "status", "date", "time", "slots"]

    def save(self):
        cleaned_data = self.validated_data
        time = PhotoshootDateTime.objects.create(
            status="available_slots",
            date=cleaned_data.get("date", ""),
            time=cleaned_data.get("time", ""),
            slots=cleaned_data.get("slots", ""),
        )
        time.save()
        if time.slots == 0:
            time.status == "no_slots"
            time.save()
            return time
        else:
            return time


class IndividualPhotoshootSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndividualPhotoshoot
        fields = [
            "photoshoot",
            "name",
            "realschool",
            "school",
            "id_number",
            "email",
            "is_scholar",
        ]


class GroupPhotoshootSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupPhotoshoot
        fields = [
            "photoshoot",
            "name",
            "group_type",
            "subgroup",
            "size",
            "emergency_contact_name",
            "emergency_contact_number",
            "emergency_contact_email",
            "is_accredited",
        ]

    def update(self, instance):
        return super().update(instance, self.validated_data)


class PhotoshootSerializer(serializers.ModelSerializer):
    # Can't be null nor blank
    individual_photoshoot = IndividualPhotoshootSerializer(read_only=True)
    group_photoshoot = GroupPhotoshootSerializer(read_only=True)
    photoshoot_datetime = PhotoshootDateTimeSerializer(read_only=True)

    # Individual Photoshoot Fields
    time_id = serializers.IntegerField(write_only=True, required=True)

    # Group Photoshoot Fields
    name = serializers.CharField(
        write_only=True,
        required=False,
        allow_null=True,
        allow_blank=True,
    )
    group_type = serializers.CharField(
        write_only=True,
        required=False,
        allow_null=True,
        allow_blank=True,
    )
    subgroup = serializers.CharField(
        write_only=True,
        required=False,
        allow_null=True,
        allow_blank=True,
    )
    size = serializers.IntegerField(
        write_only=True,
        required=False,
        allow_null=True,
    )
    emergency_contact_name = serializers.CharField(
        write_only=True,
        required=False,
        allow_null=True,
        allow_blank=True,
    )
    emergency_contact_number = serializers.CharField(
        write_only=True,
        required=False,
        allow_null=True,
        allow_blank=True,
    )
    emergency_contact_email = serializers.EmailField(
        write_only=True,
        required=False,
        allow_null=True,
        allow_blank=True,
    )
    photoshoot_type = serializers.CharField(
        write_only=True,
        required=False,
        allow_null=True,
        allow_blank=True,
    )
    rescheduling_photoshoot = serializers.BooleanField(
        write_only=True,
        required=False,
        allow_null=True,
    )
    retake_photoshoot = serializers.BooleanField(
        write_only=True,
        required=False,
        allow_null=True,
    )
    late_photoshoot = serializers.BooleanField(
        write_only=True,
        required=False,
        allow_null=True,
    )
    will_makeup = serializers.BooleanField(required=False, allow_null=True)

    user_phone = serializers.CharField(read_only=True, source="user.mobile_number")
    user_email = serializers.CharField(read_only=True, source="user.email")
    user_first = serializers.CharField(read_only=True, source="user.first_name")
    user_last = serializers.CharField(read_only=True, source="user.last_name")

    # # Create a custom method field
    # current_user = serializers.SerializerMethodField('_user')

    # # Use this method for the custom field
    # def _user(self, obj):
    #     request = self.context.get('request', None)
    #     if request:
    #         return request.user

    class Meta:
        model = Photoshoot
        fields = [
            "id",
            "reference_id",
            "photoshoot_type",
            "photoshoot_datetime",
            "individual_photoshoot",
            "group_photoshoot",
            "is_rescheduling",
            "is_late",
            "is_retaking",
            "time_id",
            "name",
            "group_type",
            "subgroup",
            "size",
            "emergency_contact_name",
            "emergency_contact_number",
            "emergency_contact_email",
            "attended",
            "rescheduling_photoshoot",
            "retake_photoshoot",
            "late_photoshoot",
            "user_phone",
            "user_email",
            "user_first",
            "user_last",
            "will_makeup",
        ]
        read_only_fields = ["reference_id"]

    def create(self, validated_data):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user

        print(self.validated_data)

        time_id = validated_data.get("time_id", "")
        will_makeup = validated_data.get("will_makeup", "")
        photoshoot_datetime = PhotoshootDateTime.objects.get(id=time_id)

        if photoshoot_datetime.slots <= 0:
            raise serializers.ValidationError(
                "No slots remaining! Please choose another date/time."
            )

        # Add validator if slots > 0
        # photoshoot_datetime.slots = photoshoot_datetime.slots - 1
        # photoshoot_datetime.save()

        if photoshoot_datetime.slots > 0:
            photoshoot_datetime.slots = photoshoot_datetime.slots - 1

        if photoshoot_datetime.slots <= 0:
            photoshoot_datetime.status = "full_slots"
        else:
            photoshoot_datetime.status = "available_slots"

        photoshoot_datetime.save()

        photoshoot = Photoshoot.objects.create(
            user=user,
            photoshoot_type=validated_data.get("photoshoot_type", ""),
            photoshoot_datetime=photoshoot_datetime,
            will_makeup=bool(will_makeup),
        )

        photoshoot.save()
        photoshoot.reference_id = photoshoot.get_reference_id()
        photoshoot.save()

        if photoshoot.photoshoot_type == "Individual":
            return IndividualPhotoshoot.objects.create(
                photoshoot=photoshoot,
                school=f"{photoshoot.user.academic_information.school}",
                realschool=f"{photoshoot.user.academic_information.realschool}",
                name=f"{photoshoot.user.first_name} {photoshoot.user.middle_initial}. {photoshoot.user.last_name}",
                id_number=f"{photoshoot.user.username}",
                email=f"{photoshoot.user.email}",
            )
        elif photoshoot.photoshoot_type == "Group":
            return GroupPhotoshoot.objects.create(
                photoshoot=photoshoot,
                name=validated_data.get('name'),
                group_type=validated_data.get('group_type'),
                subgroup=validated_data.get('subgroup'),
                size=validated_data.get('size'),
                emergency_contact_name=validated_data.get('emergency_contact_name'),
                emergency_contact_number=validated_data.get('emergency_contact_number'),
                emergency_contact_email=validated_data.get('emergency_contact_email'),
            )

    def update(self, instance, validated_data):
        instance.attended = validated_data.get('attended', instance.attended)
        instance.save()
        return instance

    # def delete(self, instance):
    #     print(instance)
    #     instance.delete()
    #     return instance


class PhotoshootDetailSerializer(serializers.ModelSerializer):
    individual_photoshoot = IndividualPhotoshootSerializer()
    group_photoshoot = GroupPhotoshootSerializer()

    # photoshoot = PhotoshootSerializer()
    class Meta:
        model = Photoshoot
        fields = [
            "individual_photoshoot",
            "group_photoshoot",
            "reference_id",
        ]


class IndividualPhotoshootDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndividualPhotoshootDetails
        fields = [
            "activated",
            "photoshoot_packages",
            "icon",
            "description",
            # "soss_enlistment_start",
            # "soss_enlistment_end",
            # "sose_enlistment_start",
            # "sose_enlistment_end",
            # "jgsom_enlistment_start",
            # "jgsom_enlistment_end",
            # "soh_enlistment_start",
            # "soh_enlistment_end",
            "firstchoice_enlistment_start",
            "secondchoice_enlistment_start",
            "thirdchoice_enlistment_start",
            "fourthchoice_enlistment_start",
            "firstchoice_enlistment_end",
            "secondchoice_enlistment_end",
            "thirdchoice_enlistment_end",
            "fourthchoice_enlistment_end",
        ]

    def update(self, instance):
        return super().update(instance, self.validated_data)


class GroupPhotoshootDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupPhotoshootDetails
        fields = [
            "activated",
            "photoshoot_packages",
            "icon",
            "description",
            # "soss_enlistment_start",
            # "soss_enlistment_end",
            # "sose_enlistment_start",
            # "sose_enlistment_end",
            # "jgsom_enlistment_start",
            # "jgsom_enlistment_end",
            # "soh_enlistment_start",
            # "soh_enlistment_end",
            "firstchoice_enlistment_start",
            "secondchoice_enlistment_start",
            "thirdchoice_enlistment_start",
            "fourthchoice_enlistment_start",
            "firstchoice_enlistment_end",
            "secondchoice_enlistment_end",
            "thirdchoice_enlistment_end",
            "fourthchoice_enlistment_end",
        ]

    def update(self, instance):
        return super().update(instance, self.validated_data)


class ReschedulingDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReschedulingDetails
        fields = ["activated", "description"]

    def update(self, instance):
        return super().update(instance, self.validated_data)


class ReschedulingReasonsSerializer(serializers.ModelSerializer):
    reason = serializers.CharField(max_length=250)

    class Meta:
        model = ReschedulingReasons
        fields = ["reason"]

    def save(self):
        reason = self.validated_data.get("reason", "")
        return ReschedulingReasons.objects.create(reason=reason)

    def update(self, instance):
        return super().update(instance, self.validated_data)


class ReschedulingSerializer(serializers.ModelSerializer):
    photoshoot = PhotoshootSerializer(read_only=True)
    reason = serializers.CharField(max_length=250, required=False)
    excuse_letter = serializers.FileField(allow_null=True, required=False)
    charge_slip = serializers.FileField(allow_null=True, required=False)

    class Meta:
        model = Rescheduling
        fields = [
            "user",
            "id",
            "photoshoot",
            "status",
            "admin",
            "status_changed",
            "reason",
            "excuse_letter",
            "charge_slip",
            "date_submitted",
        ]

    # Create Reschedule Request
    def create(self, request):
        user = None
        request = self.context.get("request")
        if request.method == "POST":
            if request and hasattr(request, "user"):
                user = request.user
                photoshoot = Photoshoot.objects.filter(
                    user=user,
                    individual_photoshoot__isnull=False,
                    group_photoshoot__isnull=True,
                ).first()

            reason = self.validated_data.get("reason", "")
            excuse_letter = self.validated_data.get("excuse_letter", "")
            charge_slip = self.validated_data.get("charge_slip", "")

            reschedule = Rescheduling.objects.create(
                user=user,
                photoshoot=photoshoot,
                reason=reason,
                excuse_letter=excuse_letter,
                charge_slip=charge_slip,
            )
            reschedule.save()
            photoshoot.is_rescheduling = True
            photoshoot.save()

            return reschedule

    # Update Reschedule Request (params: reschedule request ID)
    def update(self, instance, validated_data):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user

        instance.status = validated_data.get('status', instance.status)
        instance.admin = f"{user.first_name} {user.last_name}"
        instance.save()
        return instance


class LateRegistrationDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LateRegistrationDetails
        fields = ["activated", "description"]

    def update(self, instance):
        return super().update(instance, self.validated_data)


class LateRegistrationReasonsSerializer(serializers.ModelSerializer):
    reason = serializers.CharField(max_length=250)

    class Meta:
        model = LateRegistrationReasons
        fields = ["reason"]

    def save(self):
        reason = self.validated_data.get("reason", "")
        return LateRegistrationReasons.objects.create(reason=reason)

    def update(self, instance):
        return super().update(instance, self.validated_data)


class LateRegistrationSerializer(serializers.ModelSerializer):
    photoshoot = PhotoshootSerializer(read_only=True)
    reason = serializers.CharField(max_length=250)
    excuse_letter = serializers.FileField()
    charge_slip = serializers.FileField(allow_null=True, required=False)

    class Meta:
        model = LateRegistration
        fields = ["status", "photoshoot", "reason", "excuse_letter", "charge_slip"]

    # Create Late Registration Request
    def save(self):
        user = None
        request = self.context.get("request")
        if request.method == "POST":
            if request and hasattr(request, "user"):
                user = request.user
                photoshoot = Photoshoot.objects.filter(
                    user=user,
                    individual_photoshoot__isnull=False,
                    group_photoshoot__isnull=True,
                ).first()

        reason = self.validated_data.get("reason", "")
        excuse_letter = self.validated_data.get("excuse_letter", "")
        charge_slip = self.validated_data.get("charge_slip", "")

        late_registration = LateRegistration.objects.create(
            user=user,
            photoshoot=photoshoot,
            reason=reason,
            excuse_letter=excuse_letter,
            charge_slip=charge_slip,
        )
        late_registration.save()
        photoshoot.is_late = True
        photoshoot.save()
        return late_registration

    # Update Late Registration Request (params: reschedule request ID)
    def update(self, instance):
        return super().update(instance, self.validated_data)


class RetakeDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RetakeDetails
        fields = ["activated", "description"]

    def update(self, instance):
        return super().update(instance, self.validated_data)


class RetakeReasonsSerializer(serializers.ModelSerializer):
    reason = serializers.CharField(max_length=250)

    class Meta:
        model = LateRegistrationReasons
        fields = ["reason"]

    def save(self):
        reason = self.validated_data.get("reason", "")
        return LateRegistrationReasons.objects.create(reason=reason)

    def update(self, instance):
        return super().update(instance, self.validated_data)


class RetakeSerializer(serializers.ModelSerializer):
    photoshoot = PhotoshootSerializer(read_only=True)
    reason = serializers.CharField(max_length=250)

    class Meta:
        model = Retake
        fields = ["photoshoot", "reason", "date_submitted"]

    # Create Retake Request
    def save(self):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
            photoshoot = Photoshoot.objects.filter(
                user=user,
                individual_photoshoot__isnull=False,
                group_photoshoot__isnull=True,
            ).first()

        reason = self.validated_data.get("reason", "")

        retake = Retake.objects.create(
            user=user,
            photoshoot=photoshoot,
            reason=reason,
        )
        retake.save()
        # photoshoot.is_retaking = True
        # photoshoot.save()

        return retake

    # Update Retake Request (params: reschedule request ID)
    def update(self, instance):
        return super().update(instance, self.validated_data)
