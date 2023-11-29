# -*- coding: utf-8 -*-
from django.contrib import admin

from .models import Writeup, Comment

@admin.register(Writeup)
class WriteupAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "status",
        "status_changed",
        "will_write",
        "content",
        "comment",
        "user",
    )
    list_filter = ("status_changed", "will_write", "user")

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "writeup",
        "comment",
        "date"
    )
    list_filter = ("writeup", "date")