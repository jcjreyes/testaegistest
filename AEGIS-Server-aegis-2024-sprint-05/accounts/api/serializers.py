from dj_rest_auth.models import TokenModel
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from allauth.account.adapter import get_adapter
from allauth.utils import email_address_exists

from django.utils.translation import gettext_lazy as _

from ..models import AcademicInformation
from writeups.api.serializers import WriteupSerializer
from yearbook.api.serializers import YearbookSerializer
from revisions.api.serializers import RevisionSerializer
from photoshoot.api.serializers import (
    PhotoshootSerializer,
    ReschedulingSerializer,
    LateRegistrationSerializer,
    RetakeSerializer,
)

User = get_user_model()


class AcademicInformationSerializer(serializers.ModelSerializer):
    secondary_course = serializers.ChoiceField(
        allow_blank=True, choices=AcademicInformation.Courses.choices
    )
    primary_course_string = serializers.SerializerMethodField()
    secondary_course_string = serializers.SerializerMethodField()

    class Meta:
        model = AcademicInformation
        fields = [
            "id",
            "school",
            "realschool",
            "year_level",
            "primary_course",
            "secondary_course",
            "primary_course_string",
            "secondary_course_string",
        ]
        read_only_fields = ["primary_course_string", "secondary_course_string"]

    def get_primary_course_string(self, obj):
        return f"{obj.year_level} {obj.get_primary_course_display()}"

    def get_secondary_course_string(self, obj):
        if not obj.secondary_course:
            return None
        return f"{obj.year_level} {obj.get_secondary_course_display()}"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "middle_initial",
            "last_name",
            "mobile_number",
        ]
        read_only_fields = ["id"]


class UserDetailSerializer(serializers.ModelSerializer):
    academic_information = AcademicInformationSerializer()
    writeup = WriteupSerializer()
    photoshoot = PhotoshootSerializer(many=True)
    rescheduling = ReschedulingSerializer()
    late = LateRegistrationSerializer()
    retake = RetakeSerializer()
    # needed validation
    # doesn't go through usual validation
    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=User.objects.all())],
        required=False,
        read_only=True,
    )
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "is_staff",
            "username",
            "email",
            "first_name",
            "middle_initial",
            "last_name",
            "full_name",
            "mobile_number",
            "academic_information",
            "writeup",
            "yearbook",
            "revision",
            "photoshoot",
            "rescheduling",
            "late",
            "retake",
        ]
        read_only_fields = [
            "id",
            "email",
            "is_staff",
            "username",
            "writeup",
            "yearbook",
        ]

    def to_representation(self, instance):
        representation = super(UserDetailSerializer, self).to_representation(instance)
        try:
            writeup_exists = instance.writeup
            representation["writeup"] = WriteupSerializer(instance.writeup).data
        except instance._meta.model.writeup.RelatedObjectDoesNotExist:
            representation["writeup"] = None

        try:
            yearbook_exists = instance.yearbook
            representation["yearbook"] = YearbookSerializer(instance.yearbook).data
        except instance._meta.model.yearbook.RelatedObjectDoesNotExist:
            representation["yearbook"] = None

        try:
            revision_exists = instance.revision
            representation["revision"] = RevisionSerializer(instance.revision).data
        except instance._meta.model.revision.RelatedObjectDoesNotExist:
            representation["revision"] = None

        return representation

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.middle_initial} {obj.last_name}"

    def validate_username(self, username):
        # 164567 => ['1','6','4','5','6','7']
        list_converted = list(username)
        if len(list_converted) != 6:
            raise serializers.ValidationError(_("ID Number must be 6 characters long"))

        if int(list_converted[0]) >= 3:
            raise serializers.ValidationError(_("ID Number should begin with 1 or 2."))

        # if int(list_converted[1]) > 8:
        #     raise serializers.ValidationError(_("ID Number should be less than 18"))

        return username

    # needed as nested fields aren't supported by default
    def update(self, instance, validated_data):
        academic_information = validated_data.pop("academic_information")

        if academic_information.get("primary_course") == academic_information.get(
            "secondary_course", ""
        ):
            raise serializers.ValidationError(
                {"course": [_("Primary and secondary course should not match.")]}
            )

        instance.username = validated_data.get("username", instance.username)
        instance.email = instance.email
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.middle_initial = validated_data.get(
            "middle_initial", instance.middle_initial
        )
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.mobile_number = validated_data.get(
            "mobile_number", instance.mobile_number
        )
        instance.save()

        # academic informations
        instance.academic_information.school = academic_information.get(
            "school", instance.academic_information.school
        )
        instance.academic_information.year_level = academic_information.get(
            "year_level", instance.academic_information.year_level
        )
        instance.academic_information.primary_course = academic_information.get(
            "primary_course", instance.academic_information.primary_course
        )
        instance.academic_information.secondary_course = academic_information.get(
            "secondary_course", instance.academic_information.secondary_course
        )
        instance.academic_information.save()

        return instance


# remove
class TokenSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="user.id", read_only=True)
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = TokenModel
        # Include field "key" once frontend actually uses token auth
        # instead of the current session auth
        fields = ("id", "username")


class RegistrationSerializer(serializers.Serializer):
    # User
    username = serializers.CharField(
        min_length=6,
        required=True,
    )
    email = serializers.EmailField(required=True)
    secondary_email = serializers.EmailField()
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    first_name = serializers.CharField(required=True, max_length=150)
    middle_initial = serializers.CharField(max_length=255, allow_blank=True)
    last_name = serializers.CharField(required=True, max_length=150)
    mobile_number = serializers.CharField(required=True, max_length=15)
    # Academic Information
    school = serializers.ChoiceField(
        choices=AcademicInformation.Schools.choices, allow_blank=False
    )
    year_level = serializers.ChoiceField(
        choices=AcademicInformation.YearLevels.choices, allow_blank=False
    )
    primary_course = serializers.ChoiceField(
        choices=AcademicInformation.Courses.choices, allow_blank=False
    )
    secondary_course = serializers.ChoiceField(
        choices=AcademicInformation.Courses.choices, allow_blank=True
    )

    def validate_username(self, username):
        username = get_adapter().clean_username(username)
        # 164567 => ['1','6','4','5','6','7']
        list_converted = list(username)
        if len(list_converted) != 6:
            raise serializers.ValidationError(_("ID Number must be 6 characters long"))

        if int(list_converted[0]) >= 3:
            raise serializers.ValidationError(_("ID Number should begin with 1 or 2."))

        # if int(list_converted[1]) > 8:
        #     raise serializers.ValidationError(_("ID Number should be less than 18"))

        return username

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if email and email_address_exists(email):
            raise serializers.ValidationError(
                _("A user is already registered with this e-mail address.")
            )

        stripped_email = email.strip()
        if stripped_email.split("@")[1] != "obf.ateneo.edu":
            raise serializers.ValidationError(_("Email must be a valid obf email"))

        return email

    def validate_password1(self, password):
        return get_adapter().clean_password(password)

    def validate(self, data):
        if data["password1"] != data["password2"]:
            raise serializers.ValidationError(
                {"password": _("The two password fields didn't match.")}
            )

        if data.get("primary_course") == data.get("secondary_course", ""):
            raise serializers.ValidationError(
                {"course": [_("Primary and secondary course should not match.")]}
            )
        return data

    def get_cleaned_data(self):
        return {
            "username": self.validated_data.get("username", ""),
            "password": self.validated_data.get("password1", ""),
            "email": self.validated_data.get("email", ""),
            "secondary_email": self.validated_data.get("secondary_email", ""),
            "first_name": self.validated_data.get("first_name", ""),
            "middle_initial": self.validated_data.get("middle_initial", ""),
            "last_name": self.validated_data.get("last_name", ""),
            "mobile_number": self.validated_data.get("mobile_number", ""),
            "school": self.validated_data.get("school", ""),
            "year_level": self.validated_data.get("year_level", ""),
            "primary_course": self.validated_data.get("primary_course", ""),
            "secondary_course": self.validated_data.get("secondary_course", None),
        }

    def save(self, request):
        cleaned_data = self.get_cleaned_data()
        realschool = cleaned_data.get("school")
        print(realschool)
        primary_course = cleaned_data.get("primary_course")
        print(primary_course)

        if realschool == "SOSS":
            if primary_course == "BS PSY":
                school = "SOSE"
            else:
                school = "SOH"
        elif realschool == "SOSE":
            if primary_course in ["BS EcE", "BS CoE", "BS MSE"]:
                school = "SOSS"
            else:
                school = realschool
        else:
            school = realschool

        user = User(
            username=cleaned_data.get("username"),
            email=cleaned_data.get("email"),
            secondary_email = cleaned_data.get("secondary_email"),
            first_name=cleaned_data.get("first_name"),
            middle_initial=cleaned_data.get("middle_initial", ""),
            last_name=cleaned_data.get("last_name"),
            mobile_number=cleaned_data.get("mobile_number"),
        )

        user.set_password(cleaned_data.get("password"))
        user.save()

        academic_information = AcademicInformation.objects.create(
            user=user,
            school=school,
            realschool=realschool,
            year_level=cleaned_data.get("year_level"),
            primary_course=cleaned_data.get("primary_course"),
            secondary_course=cleaned_data.get("secondary_course"),
        )

        return user
