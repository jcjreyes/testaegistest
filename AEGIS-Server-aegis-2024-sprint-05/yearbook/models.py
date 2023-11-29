from django.db import models
from django.conf import settings
from model_utils import Choices
from model_utils.models import StatusModel
import os

#Image field guide
#https://www.geeksforgeeks.org/imagefield-django-models/

#Using Image Field for front end:
#https://stackoverflow.com/questions/17846290/django-display-imagefield

def get_image_path(instance,filename):
    return os.path.join('yearbook',str(instance.id),filename)

class Yearbook(StatusModel):
    STATUS = Choices("empty", "draft", "pending", "approved", "rejected")

    user = models.OneToOneField(
                settings.AUTH_USER_MODEL, 
                related_name="yearbook", 
                on_delete=models.CASCADE
                )
    image = models.ImageField(upload_to=get_image_path)
    date_submitted = models.DateTimeField(auto_now_add=True, blank=True)

    def id_number(self):
        return self.user.username