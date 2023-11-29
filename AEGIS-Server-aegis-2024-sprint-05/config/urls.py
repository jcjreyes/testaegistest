"""aegis_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from django.conf import settings
from django.views.generic import TemplateView
from django.conf.urls.static import static

from dj_rest_auth.registration.views import VerifyEmailView

from accounts.api.viewsets import UserViewSet
from accounts.api.views import (
    DownloadWriteups,
    ListCourseCodes,
    ListSchools,
    ListYearLevels,
    GetMe,
    PasswordTooCommon,
    CountWriteupUsers,
    DownloadWriteups
)
from announcements.api.viewsets import AnnouncementViewSet
from writeups.api.viewsets import WriteupViewset, WriteupCommentViewset
from yearbook.api.viewsets import YearbookViewSet
from revisions.api.viewsets import RevisionViewset
from guidelines.api.viewsets import GuidelinesViewset
from photoshoot.api.viewsets import *
from photoshoot.api.views import (
    ListGroupTypes,
    ListCOA,
    ListLIONS,
    ListReschedulingReasons,
    ListLateRegistrationReasons,
    ListRetakeReasons,
    ExportWriteups,
    ModifySlots
)

from documentation.urls import urlpatterns as drfurls

router = routers.DefaultRouter()
router.register(r"announcements", AnnouncementViewSet)
router.register(r"users", UserViewSet, "users")
router.register(r"writeup", WriteupViewset, "writeup")
router.register(r"yearbook", YearbookViewSet, "yearbook")
router.register(r"revision", RevisionViewset, "revision")
router.register(r"writeups", WriteupViewset, "writeups")
router.register(r"writeup-comments", WriteupCommentViewset, "writeup-comments")
router.register(r"photoshoot", PhotoshootViewset, "photoshoot")
router.register(r"enlistment-dates", EnlistmentDatesViewset, "enlistment-dates")
router.register(r"photoshoot-periods-settings", PhotoshootPeriodSettingsViewset, "photoshoot-periods-settings")
router.register(r"photoshoot-periods", PhotoshootPeriodViewset, "photoshoot-periods")
router.register(r"photoshoot-dates", PhotoshootDateViewset, "photoshoot-dates")
router.register(r"photoshoot-times", PhotoshootDateTimeViewset, "photoshoot-datetime")
router.register(r"photoshoot-detail", PhotoshootDetailViewset, "photoshoot-detail")
router.register(r"photoshoot-guidelines", PhotoshootGuidelinesViewset, "photoshoot-guidelines")
router.register(r"individual-photoshoots", IndividualPhotoshootDetailsViewset, "individual-photoshoot-details")
router.register(r"group-photoshoots", GroupPhotoshootDetailsViewset, "group-photoshoot-details")
router.register(r"rescheduling-requests", ReschedulingViewset, "rescheduling-requests")
router.register(r"rescheduling-details", ReschedulingDetailsViewset, "rescheduling-details")
router.register(r"rescheduling-reasons", ReschedulingReasonsViewset, "rescheduling-reasons")
router.register(r"late-registration", LateRegistrationViewset, "late-registration")
router.register(r"late-details", LateRegistrationDetailsViewset, "late-details")
router.register(r"late-reasons", LateRegistrationReasonsViewset, "late-reasons")
router.register(r"retake", RetakeViewset, "retake")
router.register(r"retake-details", RetakeDetailsViewset, "retake-details")
router.register(r"retake-reasons", RetakeReasonsViewset, "retake-reasons")
router.register(r"guidelines", GuidelinesViewset, "guidelines")

urlpatterns = [
    path("api/", include(router.urls)),
    path("api/course-list", ListCourseCodes.as_view(), name="course-codes-list"),
    path("api/school-list", ListSchools.as_view(), name="school-list"),
    path("api/year-list", ListYearLevels.as_view(), name="year-list"),
    path("api/group-list", ListGroupTypes.as_view(), name="group-type-list"),
    path("api/coa-list/", ListCOA.as_view(), name="coa-list"),
    path("api/lions-list/", ListLIONS.as_view(), name="lions-list"),
    path("api/rescheduling-list", ListReschedulingReasons.as_view(), name="rescheduling-reasons-list"),
    path("api/late-registration-list", ListLateRegistrationReasons.as_view(), name="late-registration-reasons-list"),
    path("api/retake-list", ListRetakeReasons.as_view(), name="retake-reasons-list"),
    path("api/export-writeups", ExportWriteups.as_view(), name="export-writeups-csv"),
    path("api/modify-slots/", ModifySlots.as_view(), name="modify-slots"),
    path("api/me", GetMe.as_view(), name="current-user"),
    path("api/writeup-user-count/", CountWriteupUsers.as_view() , name="user-writeup-count"),
    path("api/download-writeups/", DownloadWriteups.as_view() , name="download-writeups"),
    path("api-auth/", include("rest_framework.urls")),
    path("auth/", include("dj_rest_auth.urls")),
    path("auth/registration/", include("dj_rest_auth.registration.urls")),
    path("auth/pw-common-check/", PasswordTooCommon.as_view(), name="pw-common-check"),
    path(
        "auth/verify-email/",
        VerifyEmailView.as_view(),
        name="account_email_verification_sent",
    ),
    path("backdoor/", admin.site.urls),
    re_path(
        r"^reset-password/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$",
        TemplateView.as_view(template_name="password_reset_confirm.html"),
        name="password_reset_confirm",
    ),
    path("account/", include("allauth.urls")),
    path("tinymce/", include("tinymce.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + drfurls


if settings.DEBUG:
    try:
        import debug_toolbar

        urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
    except ModuleNotFoundError:
        pass
