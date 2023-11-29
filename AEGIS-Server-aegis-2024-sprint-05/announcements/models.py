from django.db import models
from django.utils.translation import gettext_lazy as _

from django_extensions.validators import NoWhitespaceValidator
from model_utils.models import TimeStampedModel
from tinymce.models import HTMLField


class Announcements(TimeStampedModel):
    title = models.CharField(
        _("title"), max_length=150, validators=[NoWhitespaceValidator()]
    )
    # description = models.TextField(
    #     _("description"), validators=[NoWhitespaceValidator()]
    # )
    description = HTMLField()

    def __str__(self):
        return self.title
