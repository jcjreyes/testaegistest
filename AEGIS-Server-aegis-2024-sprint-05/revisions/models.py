from django.contrib.auth import get_user_model
from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from tinymce import models as tinymce_models
from django.contrib.postgres.fields import JSONField
from model_utils.models import StatusModel
from model_utils import Choices

from accounts.models import AcademicInformation

User = get_user_model()

# Create your models here.


class Revision(StatusModel):
    STATUS = Choices("pending", "approved", "declined")

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, related_name="revision", on_delete=models.CASCADE
    )

    full_name = models.CharField(null=True, blank=True, max_length=150)

    primary_course = models.CharField(
        null=True,
        blank=True,
        max_length=10,
        choices=AcademicInformation.Courses.choices,
    )

    minor = models.CharField(null=True, blank=True, max_length=55)

    content = tinymce_models.HTMLField(null=True, blank=True)

    data = JSONField(blank=True, null=True)

    requests = models.TextField(null=True, blank=True, max_length=500)
