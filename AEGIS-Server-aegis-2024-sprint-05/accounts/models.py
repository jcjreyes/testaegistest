from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import UnicodeUsernameValidator
from django.core.validators import MinLengthValidator
from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.


class User(AbstractUser):
    username = models.CharField(
        _("username"),
        max_length=150,
        unique=True,
        help_text=_(
            "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
        ),
        validators=[UnicodeUsernameValidator(), MinLengthValidator(6)],
        error_messages={"unique": _("A user with that username already exists."),},
    )
    first_name = models.CharField(_("first name"), max_length=150)
    middle_initial = models.CharField(
        _("middle initial"), max_length=255, blank=True, default=""
    )
    mobile_number = models.CharField(_("mobile number"), max_length=15)
    secondary_email = models.EmailField(_("secondary email"), max_length=255, default="")

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        if(self.first_name == "" and self.last_name == ""):
            return ""
        else:
            return "{}, {}".format(self.last_name,self.first_name)

class AcademicInformation(models.Model):
    class Schools(models.TextChoices):
        SOSE = "SOSE", "School of Science and Engineering"
        SOM = "SOM", "School of Management"
        SOSS = "SOSS", "School of Social Studies"
        SOH = "SOH", "School of Humanities"

    class Courses(models.TextChoices):
        AB_AM = "AB AM", "Bachelor of Arts in Art Management"
        AB_CHNS = "AB ChnS", "Bachelor of Arts in Chinese Studies"
        AB_COM = "AB COM", "Bachelor of Arts in Communication"
        AB_DS = "AB DS", "Bachelor of Arts in Development Studies"
        AB_DIPIR = (
            "AB DipIR", 
            "Bachelor of Arts in Diplomacy and International Relations with Specialization in East and Southeast Asian Studies"
        )
        AB_ECH = "AB EC-H", "Bachelor of Arts in Economics (Honors Program)"
        AB_EC = "AB EC", "Bachelor of Arts in Economics"
        AB_EU = "AB EU", "Bachelor of Arts in European Studies"
        AB_HI = "AB HI", "Bachelor of Arts in History"
        AB_HUM = "AB HUM", "Bachelor of Arts in Humanities"
        AB_IS = "AB IS", "Bachelor of Arts in Interdisciplinary Studies"
        AB_LIT_ENG = "AB LIT ENG", "Bachelor of Arts in Literature (English)"
        AB_LIT_FIL = "AB LIT FIL", "Bachelor of Arts in Literature (Filipino)"
        AB_MEC = "AB MEC", "Bachelor of Arts in Management Economics"
        AB_PH = "AB PH", "Bachelor of Arts in Philosophy"
        # AB_POS_MPM = "AB POS MPM", "Bachelor of Arts in Political Science - Masters in Public Management"
        # AB_POS_MPOS = "AB MA POS", "Bachelor of Arts in Political Science - Masters of Arts in Political Science"
        AB_POS = "AB POS", "Bachelor of Arts in Political Science"
        # AB_POS_MPM = "AB POS-MPM", "Bachelor of Arts in Political Science, Master in Public Management"
        AB_PSY = "AB PSY", "Bachelor of Arts in Psychology"
        AB_SOS = "AB SOS", "Bachelor of Arts in Social Sciences"
        AB_SOC = "AB SOCIO", "Bachelor of Arts in Sociology"
        BFA_AM = "BFA AM", "Bachelor of Fine Arts in Art Management"
        BFA_CW = "BFA CW", "Bachelor of Fine Arts in Creative Writing"
        BFA_ID = "BFA ID", "Bachelor of Fine Arts in Information Design"
        BFA_TA = "BFA TA", "Bachelor of Fine Arts in Theater Arts"
        # BS_AMDSC_MDSC = "BS AMDSc-M DSc", "Bachelor of Science in Applied Mathematics - Master in Data Science"
        BS_AMF = "BS AMF", "Bachelor of Science in Applied Mathematics with Specialization in Mathematical Finance",
        BS_AMDSC = "BS AMDSc", "Bachelor of Science in Applied Mathematics"
        BS_APS = "BS APS", "Bachelor of Science in Applied Physics"
        BS_MSE = "BS MSE", "Bachelor of Science in Materials Science and Engineering"
        BS_BIO = "BS BIO", "Bachelor of Science in Biology"
        BS_CH = "BS CH", "Bachelor of Science in Chemistry"
        BS_COMTECH = "BS COMTECH", "Bachelor of Science in Communications Technology Management"
        BS_COE = "BS CoE", "Bachelor of Science in Computer Engineering"
        BS_CS = "BS CS", "Bachelor of Science in Computer Science"
        BS_DGDD = (
            "BS DGDD",
            "Bachelor of Science in Digital Game Design and Development",
        )
        BS_ECE = (
            "BS EcE",
            "Bachelor of Science in Electronics and Communications Engineering",
        )
        BS_ES = "BS ES", "Bachelor of Science in Environmental Science"
        BS_HS = "BS HS", "Bachelor of Science in Health Sciences"
        BS_ITE = (
            "BS ITE",
            "Bachelor of Science in Information Technology Entrepreneurship",
        )
        BS_LM = "BS LM", "Bachelor of Science in Legal Management"
        BS_LFSCI = "BS LfSci", "Bachelor of Science in Life Sciences"
        BS_MGT = "BS MGT", "Bachelor of Science in Management"
        BS_MGT_H = "BS MGT-H", "Bachelor of Science in Management (Honors Program)"
        BS_ME = "BS ME", "Bachelor of Science in Management Engineering"
        BS_MIS = "BS MIS", "Bachelor of Science in Management Information Systems"
        BS_MAC = "BS MAC", "Bachelor of Science in Management of Applied Chemistry"
        BS_MA = "BS MA", "Bachelor of Science in Mathematics"
        BS_PS = "BS PS", "Bachelor of Science in Physics"
        BS_PSY = "BS PSY", "Bachelor of Science in Psychology"
        BS_RENT = ("BS RENT", "Bachelor of Science in Restaurant Entrepreneurship")

    class YearLevels(models.TextChoices):
        FOUR = "4", "4"
        FIVE = "5", "5"
        SIX = "6", "6"
        SEVEN = "7", "7"
        EIGHT = "8", "8"
        NINE = "9", "9"
        TEN = "10", "10"

    user = models.OneToOneField(
        User, related_name="academic_information", on_delete=models.CASCADE
    )
    school = models.CharField(max_length=4, choices=Schools.choices, default="SOSE")
    year_level = models.CharField(max_length=2, choices=YearLevels.choices, default="4")
    primary_course = models.CharField(
        max_length=10, choices=Courses.choices, default="AB HUM"
    )
    secondary_course = models.CharField(
        max_length=10, choices=Courses.choices, default=None, blank=True
    )
    realschool = models.CharField(max_length=4, choices=Schools.choices, default="SOSE")

    def __str__(self):
        return f"{self.get_year_level_display()} {self.get_primary_course_display()}"
