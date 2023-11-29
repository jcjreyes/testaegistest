from django.contrib import admin
from .models import Yearbook
# Register your models here.

@admin.register(Yearbook)
class YearbookAdmin(admin.ModelAdmin):
    list_display = ("id","user","id_number")
