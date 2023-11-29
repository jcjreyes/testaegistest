from django.db import models
from django.conf import settings
from markdown_deux import markdown
from tinymce import models as tinymce_models

# Create your models here.

class Guidelines(models.Model):
    icon = models.FileField(null=True)
    title = models.CharField(null=True, max_length=255, blank=False)
    content = tinymce_models.HTMLField()

    def get_markdown(self):
        content = self.content
        return markdown(content)