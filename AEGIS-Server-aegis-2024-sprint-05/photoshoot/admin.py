# -*- coding: utf-8 -*-
from django.contrib import admin
from .models import *

admin.site.register(EnlistmentDates)
admin.site.register(PhotoshootPeriodSettings)
admin.site.register(PhotoshootPeriod)
admin.site.register(PhotoshootDate)
admin.site.register(PhotoshootDateTime)

admin.site.register(Photoshoot)
admin.site.register(PhotoshootGuidelines)
admin.site.register(IndividualPhotoshoot)
admin.site.register(IndividualPhotoshootDetails)
admin.site.register(GroupPhotoshoot)
admin.site.register(GroupPhotoshootDetails)

admin.site.register(Rescheduling)
admin.site.register(ReschedulingDetails)
admin.site.register(ReschedulingReasons)

admin.site.register(LateRegistration)
admin.site.register(LateRegistrationDetails)
admin.site.register(LateRegistrationReasons)

admin.site.register(Retake)
admin.site.register(RetakeDetails)
admin.site.register(RetakeReasons)