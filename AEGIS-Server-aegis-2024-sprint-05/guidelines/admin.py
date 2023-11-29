from django.contrib import admin

# Register your models here.
from .models import Guidelines


@admin.register(Guidelines)
class GuidelinesAdmin(admin.ModelAdmin):
    list_display = (
        "icon",
        "title",
        "content",
    )
