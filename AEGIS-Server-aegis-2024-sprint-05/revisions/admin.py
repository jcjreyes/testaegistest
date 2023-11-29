# -*- coding: utf-8 -*-
from django.contrib import admin

from .models import Revision


@admin.register(Revision)
class RevisionAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "status",
        "full_name",
        "primary_course",
        "minor",
        "content",
        "data",
        "requests",
    )
