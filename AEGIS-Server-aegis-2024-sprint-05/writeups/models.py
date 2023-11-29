from django.db import models
from django.conf import settings
from django.contrib.postgres.fields import JSONField
from tinymce import models as tinymce_models
from model_utils.models import StatusModel
from model_utils import Choices

# Create your models here.
class Writeup(StatusModel):
    STATUS = Choices("empty", "draft", "pending", "approved", "declined")

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, related_name="writeup", on_delete=models.CASCADE
    )

    will_write = models.BooleanField(null=True, default=True, blank=True)

    content = tinymce_models.HTMLField(null=True, blank=True)
    
    date_submitted = models.DateTimeField(null=True, auto_now_add=True, blank=True)

    data = JSONField(null=True, blank=True)

    comment = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}'s Writeup"

class Comment(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="writeup_commenter", on_delete=models.CASCADE
    )
    writeup = models.ForeignKey(
        Writeup, related_name="writeup_comment", on_delete=models.CASCADE
    )
    comment = tinymce_models.HTMLField(null=True)
    date = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}'s comments for {self.writeup.user.first_name} {self.writeup.user.last_name}'s writeup"