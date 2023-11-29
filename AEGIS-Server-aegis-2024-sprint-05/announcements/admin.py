from django.contrib import admin

from .models import Announcements


@admin.register(Announcements)
class AnnouncementsAdmin(admin.ModelAdmin):
    list_display = ("id", "created", "modified", "title", "description")
    list_filter = ("created", "modified")

    
