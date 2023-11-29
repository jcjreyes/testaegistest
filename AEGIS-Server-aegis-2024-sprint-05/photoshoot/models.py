from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _

from model_utils.models import StatusModel
from model_utils import Choices
from tinymce import models as tinymce_models


# Create your models here.
class PhotoshootGuidelines(models.Model):
    things_to_accomplish = tinymce_models.HTMLField()
    reminders = tinymce_models.HTMLField()

    def __str__(self):
        return f"Photoshoot Guidelines"


class PhotoshootPeriodSettings(models.Model):
    total_slots = models.IntegerField(null=True)
    slots_per_hour = models.IntegerField(null=True)
    slots_per_day = models.IntegerField(null=True)

    def __str__(self):
        return f"Total Slots: {self.total_slots} (Per hour: {self.slots_per_hour}, Per day: {self.slots_per_day})"


# Available Photoshoot Periods for Admin to Create
class PhotoshootPeriod(models.Model):
    class Type(models.TextChoices):
        INDIV = "Individual", _("Individual")
        GROUP = "Group", _("Group")
        LATER = "Add Later", _("Add Later")

    title = models.CharField(
        _("photoshoot period title"), null=True, unique=True, max_length=25
    )
    type = models.CharField(
        _("photoshoot period type"), null=True, max_length=15, choices=Type.choices
    )

    def __str__(self):
        return f"{self.title}"

    @property
    def get_earliest_date(self):
        dates = self.datetime_period.all()
        if dates:
            earliest_date = dates.order_by('available_date').first()
            return earliest_date.available_date
        return None

    @property
    def get_latest_date(self):
        dates = self.datetime_period.all()
        if dates:
            latest_date = dates.order_by('available_date').last()
            return latest_date.available_date
        return None


# Enlistment Dates for Students
class EnlistmentDates(models.Model):
    class Type(models.TextChoices):
        SOM = "SOM", _("School of Management")
        SOH = "SOH", _("School of Humanities")
        SOSE = "SOSE", _("School of Science and Engineering")
        SOSS = "SOSS", _("School of Social Sciences")
        FFA = "FFA", _("Free for All")

    class CoursesType(models.TextChoices):
        AB_AM = "AB AM", "Bachelor of Arts in Art Management"
        AB_CHNS = "AB ChnS", "Bachelor of Arts in Chinese Studies"
        AB_COM = "AB COM", "Bachelor of Arts in Communication"
        AB_DS = "AB DS", "Bachelor of Arts in Development Studies"
        AB_DIPIR = (
            "AB DipIR",
            "Bachelor of Arts in Diplomacy and International Relations with Specialization in East and Southeast Asian Studies",
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
        AB_POS = "AB POS", "Bachelor of Arts in Political Science"
        AB_PSY = "AB PSY", "Bachelor of Arts in Psychology"
        AB_SOS = "AB SOS", "Bachelor of Arts in Social Sciences"
        AB_SOC = "AB SOCIO", "Bachelor of Arts in Sociology"
        BFA_AM = "BFA AM", "Bachelor of Fine Arts in Art Management"
        BFA_CW = "BFA CW", "Bachelor of Fine Arts in Creative Writing"
        BFA_ID = "BFA ID", "Bachelor of Fine Arts in Information Design"
        BFA_TA = "BFA TA", "Bachelor of Fine Arts in Theater Arts"
        BS_AMF = (
            "BS AMF",
            "Bachelor of Science in Applied Mathematics with Specialization in Mathematical Finance",
        )
        BS_AMDSC = "BS AMDSc", "Bachelor of Science in Applied Mathematics"
        BS_APS = "BS APS", "Bachelor of Science in Applied Physics"
        BS_MSE = "BS MSE", "Bachelor of Science in Materials Science and Engineering"
        BS_BIO = "BS BIO", "Bachelor of Science in Biology"
        BS_CH = "BS CH", "Bachelor of Science in Chemistry"
        BS_COMTECH = (
            "BS COMTECH",
            "Bachelor of Science in Communications Technology Management",
        )
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

    group = models.CharField(
        _("enlistment dates group"), null=True, max_length=15, choices=Type.choices + CoursesType.choices
    )
    date = models.DateField(null=True)
    periods = models.ManyToManyField(PhotoshootPeriod)
    time_from = models.TimeField(null=True)
    time_to = models.TimeField(null=True)

    def __str__(self):
        return f"{self.group}: {self.date} ({self.time_from} - {self.time_to})"


# Available Photoshoot Dates for Admin to Create
class PhotoshootDate(StatusModel):
    class Type(models.TextChoices):
        SOM = "SOM", _("School of Management")
        SOH = "SOH", _("School of Humanities")
        SOSE = "SOSE", _("School of Science and Engineering")
        SOSS = "SOSS", _("School of Social Sciences")
        GROUP = "GROUP", _("Group")
        AB_AM = "AB AM", "Bachelor of Arts in Art Management"
        AB_CHNS = "AB ChnS", "Bachelor of Arts in Chinese Studies"
        AB_COM = "AB COM", "Bachelor of Arts in Communication"
        AB_DS = "AB DS", "Bachelor of Arts in Development Studies"
        AB_DIPIR = (
            "AB DipIR",
            "Bachelor of Arts in Diplomacy and International Relations with Specialization in East and Southeast Asian Studies",
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
        AB_POS = "AB POS", "Bachelor of Arts in Political Science"
        AB_PSY = "AB PSY", "Bachelor of Arts in Psychology"
        AB_SOS = "AB SOS", "Bachelor of Arts in Social Sciences"
        AB_SOC = "AB SOCIO", "Bachelor of Arts in Sociology"
        BFA_AM = "BFA AM", "Bachelor of Fine Arts in Art Management"
        BFA_CW = "BFA CW", "Bachelor of Fine Arts in Creative Writing"
        BFA_ID = "BFA ID", "Bachelor of Fine Arts in Information Design"
        BFA_TA = "BFA TA", "Bachelor of Fine Arts in Theater Arts"
        BS_AMF = (
            "BS AMF",
            "Bachelor of Science in Applied Mathematics with Specialization in Mathematical Finance",
        )
        BS_AMDSC = "BS AMDSc", "Bachelor of Science in Applied Mathematics"
        BS_APS = "BS APS", "Bachelor of Science in Applied Physics"
        BS_MSE = "BS MSE", "Bachelor of Science in Materials Science and Engineering"
        BS_BIO = "BS BIO", "Bachelor of Science in Biology"
        BS_CH = "BS CH", "Bachelor of Science in Chemistry"
        BS_COMTECH = (
            "BS COMTECH",
            "Bachelor of Science in Communications Technology Management",
        )
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

    STATUS = Choices('available_slots', 'full_slots', 'no_slots')

    group = models.CharField(
        _("photoshoot dates group"),
        null=True,
        max_length=15,
        choices=Type.choices,
    )

    period = models.ForeignKey(
        PhotoshootPeriod,
        related_name="datetime_period",
        null=True,
        on_delete=models.CASCADE,
    )
    available_date = models.DateField(null=True)

    def __str__(self):
        return f"{self.period.title}: {self.available_date} ({self.group})"


# Assigned Photoshoot Date and Time for Students
class PhotoshootDateTime(StatusModel):
    STATUS = Choices('available_slots', 'full_slots')
    date = models.ForeignKey(
        PhotoshootDate,
        related_name="datetime_date",
        null=True,
        on_delete=models.CASCADE,
    )
    time = models.TimeField(null=True)
    slots = models.PositiveSmallIntegerField(null=True, default=0)

    def __str__(self):
        return f"{self.date.available_date} [{self.date.group}] — {self.time} ({self.id}) | Slots: {self.slots} "


# class PhotoshootTimes(models.Model):
#     available_date = models.OneToOneField()


class Photoshoot(models.Model):
    class Type(models.TextChoices):
        INDIV = "Individual", _("Individual")
        GROUP = "Group", _("Group")

    reference_id = models.CharField(_("photoshoot reference id"), max_length=25)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="photoshoot",
        on_delete=models.CASCADE,
        null=True,
    )
    photoshoot_type = models.CharField(
        _("photoshoot type"), max_length=15, choices=Type.choices
    )
    photoshoot_datetime = models.ForeignKey(
        PhotoshootDateTime,
        related_name="photoshoot_datetime",
        on_delete=models.CASCADE,
        null=True,
    )
    is_rescheduling = models.BooleanField(null=True, default=False)
    is_late = models.BooleanField(null=True, default=False)
    is_retaking = models.BooleanField(null=True, default=False)
    attended = models.BooleanField(null=True, default=False)
    will_makeup = models.BooleanField(
        _("photoshoot student will avail makeup"), null=True, blank=False, default=False
    )

    def get_reference_id(self):
        return f"PE21-G-{self.id:02d}"

    def id_number(self):
        return self.user.username

    def __str__(self):
        return f"{self.reference_id}"


class IndividualPhotoshoot(models.Model):
    photoshoot = models.OneToOneField(
        Photoshoot, related_name="individual_photoshoot", on_delete=models.CASCADE
    )
    school = models.CharField(
        _("photoshoot student school"), null=True, blank=True, max_length=4
    )
    realschool = models.CharField(
        _("photoshoot student school"), null=True, blank=True, max_length=4
    )
    name = models.CharField(
        _("photoshoot student name"), null=True, blank=True, max_length=150
    )
    id_number = models.CharField(
        _("photoshoot student id number"), null=True, blank=True, max_length=6
    )
    email = models.EmailField(
        _("photoshoot student email"), null=True, blank=True, max_length=55
    )
    is_scholar = models.BooleanField(
        _("photoshoot student is scholar"), null=True, blank=False, default=False
    )

    # is_accredited = models.BooleanField(_("photoshoot student is accredited"), null=True, blank=False, default=False)

    def __str__(self):
        return f"{self.photoshoot.reference_id}: {self.name}"


class IndividualPhotoshootDetails(models.Model):
    activated = models.BooleanField(null=True, default=True)
    photoshoot_packages = models.URLField(null=True, max_length=255)
    icon = models.FileField(upload_to="photoshoot_icons/", null=True)
    description = models.CharField(
        _("individual photoshoot description"), null=True, blank=False, max_length=255
    )
    # soss_enlistment_start = models.DateField(
    #     _("individual photoshoot soss enlistment start date"), null=True, blank=False
    # )
    # soss_enlistment_end = models.DateField(
    #     _("individual photoshoot soss enlistment end date"), null=True, blank=False
    # )
    # sose_enlistment_start = models.DateField(
    #     _("individual photoshoot sose enlistment start date"), null=True, blank=False
    # )
    # sose_enlistment_end = models.DateField(
    #     _("individual photoshoot sose enlistment end date"), null=True, blank=False
    # )
    # jgsom_enlistment_start = models.DateField(
    #     _("individual photoshoot jgsom enlistment start date"), null=True, blank=False
    # )
    # jgsom_enlistment_end = models.DateField(
    #     _("individual photoshoot jgsom enlistment end date"), null=True, blank=False
    # )
    # soh_enlistment_start = models.DateField(
    #     _("individual photoshoot soh enlistment start date"), null=True, blank=False
    # )
    # soh_enlistment_end = models.DateField(
    #     _("individual photoshoot soh enlistment end date"), null=True, blank=False
    # )
    firstchoice_enlistment_start = models.DateField(
        _("individual photoshoot first choice enlistment start date"),
        null=True,
        blank=False,
    )
    firstchoice_enlistment_end = models.DateField(
        _("individual photoshoot first choice enlistment end date"),
        null=True,
        blank=False,
    )

    secondchoice_enlistment_start = models.DateField(
        _("individual photoshoot second choice enlistment start date"),
        null=True,
        blank=False,
    )
    secondchoice_enlistment_end = models.DateField(
        _("individual photoshoot second choice enlistment end date"),
        null=True,
        blank=False,
    )

    thirdchoice_enlistment_start = models.DateField(
        _("individual photoshoot third choice enlistment start date"),
        null=True,
        blank=False,
    )
    thirdchoice_enlistment_end = models.DateField(
        _("individual photoshoot third choice enlistment end date"),
        null=True,
        blank=False,
    )

    fourthchoice_enlistment_start = models.DateField(
        _("individual photoshoot fourth choice enlistment start date"),
        null=True,
        blank=False,
    )
    fourthchoice_enlistment_end = models.DateField(
        _("individual photoshoot fourth choice enlistment end date"),
        null=True,
        blank=False,
    )

    def __str__(self):
        return f"Individual Photoshoot Details"


class GroupPhotoshoot(models.Model):
    class Type(models.TextChoices):
        COA = "COA", "Council of Organizations of the Ateneo"
        LIONS = "LIONS", "League of Independent Organizations"
        COP = "COP", "Communication Officers"
        UAAP = "UAAP", "Varsity"

    class COA(models.TextChoices):
        ADS = "ADS", "Ateneo Debate Society"
        AEuSS = "AEuSS", "Ateneo Association of European Studies Students"
        AEA = "AEA", "Ateneo Economics Association"
        APAIR = "APAIR", "Ateneo Project for Asian and International Relations"
        ASTAT = "A-Stat", "Ateneo Statistics Circle"
        DEVSOC = "DevSoc", "Development Society of the Ateneo"
        ENTABLADO = "ENTABLADO", "Enterteynment para sa Tao, Bayan, Lansangan at Diyos"
        TAA = "The Ateneo Assembly", "The Ateneo Assembly"
        ACTM = "ACTM", "Association for Communications Technology Management"
        AIESEC = "AIESEC ADMU", "AIESEC Ateneo de Manila"
        AJMA = "AJMA", "Ateneo Junior Marketing Association"
        LEX = "LEX", "Ateneo Lex"
        AMA = "AMA", "Ateneo Management Association"
        MACA = "MACA", "Ateneo Management of Applied Chemistry Association"
        MEA = "MEA", "Ateneo Management Engineering Association"
        MECO = "MEcO", "Ateneo Management Economics Organization"
        ACIL = "ACIL", "Ateneo Catechetical Instruction League"
        ACLC = "ACLC", "Ateneo Christian Life Community"
        ACMG = "ACMG", "Ateneo College Ministry Group"
        ATSCA = "AtSCA", "Ateneo Student Catholic Action"
        YFC = "YFC - A", "Youth for Christ - Ateneo"
        AESS = "AESS", "Ateneo Environmental Science Society"
        LM = "LM", "Loyola Mountaineers"
        PEERS = "Ateneo PEERS", "Ateneo PEERS"
        PMSA = "PMSA", "Pre-Medical Society of the Ateneo"
        ALAC = "ALAC", "Ateneo Lingua Ars Cultura"
        ASEC = "ASEC", "Ateneo Student Exchange Council"
        CELADON = "CELADON", "Ateneo Celadon"
        ACOMM = "ACOMM", "Ateneo Association of Communication Majors"
        AMP = "AMP", "Ateneo Musicians' Pool"
        COSA = "CoSA", "Collegiate Society of Advertising"
        LFC = "LFC", "Loyola Film Circle"
        ACGC = "ACGC", "Ateneo de Manila College Glee Club"
        BR = "BlueRep", "Ateneo Blue Repertory"
        CADs = "CADs", "Company of Ateneo Dancers"
        TA = "TA", "Tanghalang Ateneo"
        CODE = (
            "Ateneo CODE",
            "Ateneo Consultants for Organization Development and Empowerment",
        )
        GABAY = "Ateneo Gabay", "Ateneo Gabay"
        KAINGIN = "Kaingin", "Kaingin"
        KYTHE = "Kythe", "Kythe-Ateneo"
        MUSMOS = "Musmos Organization", "Musmos Organization"
        SPEED = "SPEED", "Ateneo Special Education Society"
        TUGON = "Tugon", "Tugon"
        ACHES = "ACheS", "Ateneo Chemistry Society"
        AECES = "AECES", "Ateneo Electronics and Computer Engineering Society"
        AMS = "AMS", "Ateneo Mathematics Society"
        BOX = "BOx", "Ateneo Biological Organization - eXplore eXperience eXcel"
        COMPSAT = "CompSAt", "Computer Society of the Ateneo"
        LEAPS = "LeaPs", "Ateneo League of Physicists"
        MISA = "MISA", "Ateneo Management Information Systems Association"
        AP = "Ateneo Psyche", "Ateneo Psyche"

    class LIONS(models.TextChoices):
        AGILA = "AGILA", "Ateneans Guided and Inspired by their Love for Animals"
        ACE = "ACE", "Atenean Car Enthusiasts"
        BLINK = "BLINK", "Blue Indie Komiks"
        BBI = "Blue Bird Improv", "Blue Bird Improv"
        BH = "BlueHan", "Blue Hanguk Society"
        BS = "BlueSymph", "Blue Symphony Orchestra"
        BYTE = "BYTE", "Building Young Tech Entrepreneurs"
        CASA = "CASA", "Contemporary A cappella Singers Assocation"
        CYA = "CYA", "Christ's Youth in Action"
        CUISINA = "Cuisina", "Cuisina"
        DECO = "DECO", "The Designer Community"
        DSC = "DSC Loyola", "Developer Student Clubs - Loyola"
        EAB = "EA Blue", "Effective Altruism Blue"
        FIT = "FIT", "Fitness Improvement Team"
        HFH = "HFH-BC", "Habitat for Humanity Blue Chapter"
        JFEL = "JFEL", "Junior Fellowship for Financial Literacy"
        KSA = "KSA", "Kalipunang Sosyolohiya at Antropolohiya"
        LAHI = "LAHi", "League of Atenean Historians"
        LG = "LG", "Loyola Gaming"
        MOKOA = "Mokoa", "Mokoa Animation Studio"
        OS = "OpenSource", "OpenSource"
        PK = "Project KaBUHAYan", "Project KaBUHAYan"
        PL = "Project LAAN", "Project LAAN"
        RCL = "RC Life Loyola", "Regnum Christi: Love Inspired by Faith and Encounter"
        THINC = "THINC", "Tabletop Hobbyists and Interests Collaborative"
        TOUSHIN = "Toushin", "Touhou no Shinju or Pearl of the Orient"
        UXS = "UX Society", "User Experience Society"
        WS = "WriterSkill", "WriterSkill"

    class COP(models.TextChoices):
        LOREM = "Lorem Ipsum 1", "Lorem Ipsum 1"
        IPSUM = "Lorem Ipsum 2", "Lorem Ipsum 2"

    class VARSITY(models.TextChoices):
        LOREM = "Lorem Ipsum 1", "Lorem Ipsum 1"
        IPSUM = "Lorem Ipsum 2", "Lorem Ipsum 2"

    photoshoot = models.OneToOneField(
        Photoshoot, related_name="group_photoshoot", on_delete=models.CASCADE
    )

    # Group Details
    name = models.CharField(
        _("photoshoot group name"), null=True, blank=True, max_length=55
    )
    group_type = models.CharField(
        _("photoshoot group type"),
        null=True,
        blank=True,
        max_length=55,
        choices=Type.choices,
    )
    subgroup = models.CharField(
        _("photoshoot subgroup"), null=True, blank=True, max_length=55
    )
    size = models.PositiveSmallIntegerField(null=True, blank=True)

    # Emergency Contact
    emergency_contact_name = models.CharField(
        _("emergency contact name"), null=True, blank=True, max_length=125
    )
    emergency_contact_number = models.CharField(
        _("emergency contact mobile number"), null=True, blank=True, max_length=55
    )
    emergency_contact_email = models.EmailField(
        _("emergency contact email"), null=True, blank=True, max_length=125
    )

    is_accredited = models.BooleanField(
        _("photoshoot group is accredited"), null=True, blank=False, default=False
    )

    def __str__(self):
        return f"{self.photoshoot.reference_id}: {self.name}"


class GroupPhotoshootDetails(models.Model):
    activated = models.BooleanField(null=True, default=True)
    photoshoot_packages = models.URLField(null=True, max_length=255)
    icon = models.FileField(upload_to="photoshoot_icons/", null=True)
    description = models.CharField(
        _("individual photoshoot description"), null=True, blank=False, max_length=255
    )
    # soss_enlistment_start = models.DateField(
    #     _("individual photoshoot soss enlistment start date"), null=True, blank=False
    # )
    # soss_enlistment_end = models.DateField(
    #     _("individual photoshoot soss enlistment end date"), null=True, blank=False
    # )
    # sose_enlistment_start = models.DateField(
    #     _("individual photoshoot sose enlistment start date"), null=True, blank=False
    # )
    # sose_enlistment_end = models.DateField(
    #     _("individual photoshoot sose enlistment end date"), null=True, blank=False
    # )
    # jgsom_enlistment_start = models.DateField(
    #     _("individual photoshoot jgsom enlistment start date"), null=True, blank=False
    # )
    # jgsom_enlistment_end = models.DateField(
    #     _("individual photoshoot jgsom enlistment end date"), null=True, blank=False
    # )
    # soh_enlistment_start = models.DateField(
    #     _("individual photoshoot soh enlistment start date"), null=True, blank=False
    # )
    # soh_enlistment_end = models.DateField(
    #     _("individual photoshoot soh enlistment end date"), null=True, blank=False
    # )
    firstchoice_enlistment_start = models.DateField(
        _("individual photoshoot first choice enlistment start date"),
        null=True,
        blank=False,
    )
    firstchoice_enlistment_end = models.DateField(
        _("individual photoshoot first choice enlistment end date"),
        null=True,
        blank=False,
    )

    secondchoice_enlistment_start = models.DateField(
        _("individual photoshoot second choice enlistment start date"),
        null=True,
        blank=False,
    )
    secondchoice_enlistment_end = models.DateField(
        _("individual photoshoot second choice enlistment end date"),
        null=True,
        blank=False,
    )

    thirdchoice_enlistment_start = models.DateField(
        _("individual photoshoot third choice enlistment start date"),
        null=True,
        blank=False,
    )
    thirdchoice_enlistment_end = models.DateField(
        _("individual photoshoot third choice enlistment end date"),
        null=True,
        blank=False,
    )

    fourthchoice_enlistment_start = models.DateField(
        _("individual photoshoot fourth choice enlistment start date"),
        null=True,
        blank=False,
    )
    fourthchoice_enlistment_end = models.DateField(
        _("individual photoshoot fourth choice enlistment end date"),
        null=True,
        blank=False,
    )

    def __str__(self):
        return f"Group Photoshoot Details"


class ReschedulingDetails(models.Model):
    activated = models.BooleanField(null=True, default=False)
    description = tinymce_models.HTMLField()

    def __str__(self):
        return f"Rescheduling Photoshoot: {self.description}"


class ReschedulingReasons(models.Model):
    reason = models.CharField(null=True, blank=True, max_length=250)

    def __str__(self):
        return f"{self.reason}"


class Rescheduling(StatusModel):
    class Reasons(models.TextChoices):
        ACADS = "Academics (exam, presentation, test conflict)", _(
            "Academics (exam, presentation, test conflict)"
        )
        FAMILY = "Family emergency", _("Family emergency")
        MIP = "Missed initial photoshoot", _("Missed initial photoshoot")
        OTHER = "Other", _("Other")

    STATUS = Choices('pending', 'approved', 'declined')

    admin = models.CharField(null=True, blank=True, max_length=255)

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        related_name="rescheduling",
        on_delete=models.CASCADE,
        null=True,
    )
    photoshoot = models.OneToOneField(
        Photoshoot, related_name="rescheduling_photoshoot", on_delete=models.CASCADE
    )
    reason = models.CharField(null=True, blank=True, max_length=250)
    excuse_letter = models.FileField(null=True)
    charge_slip = models.FileField(null=True)
    date_submitted = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return f"{self.reason}"


class LateRegistrationDetails(models.Model):
    activated = models.BooleanField(null=True, default=False)
    description = tinymce_models.HTMLField()

    def __str__(self):
        return f"Late Registration: {self.description}"


class LateRegistrationReasons(models.Model):
    reason = models.CharField(null=True, blank=True, max_length=250)

    def __str__(self):
        return f"{self.reason}"


class LateRegistration(StatusModel):
    class Reasons(models.TextChoices):
        INTERNET = "Internet connectivity problems", _("Internet connectivity problems")

    STATUS = Choices('pending', 'approved', 'declined')

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        related_name="late",
        on_delete=models.CASCADE,
        null=True,
    )
    photoshoot = models.OneToOneField(
        Photoshoot, related_name="late_photoshoot", on_delete=models.CASCADE
    )
    reason = models.CharField(null=True, blank=True, max_length=250)
    excuse_letter = models.FileField(
        upload_to="late_registration_excuse_letters/%Y/%m/%d", null=True
    )
    charge_slip = models.FileField(
        upload_to="late_registration_excuse_letters/%Y/%m/%d", null=True
    )
    date_submitted = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return f"{self.reason}"


class RetakeDetails(models.Model):
    activated = models.BooleanField(null=True, default=False)
    description = tinymce_models.HTMLField()

    def __str__(self):
        return f"Retake Photoshoot: {self.description}"


class RetakeReasons(models.Model):
    reason = models.CharField(null=True, blank=True, max_length=250)

    def __str__(self):
        return f"{self.reason}"


class Retake(StatusModel):
    STATUS = Choices('pending', 'approved', 'declined')

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        related_name="retake",
        on_delete=models.CASCADE,
        null=True,
    )
    photoshoot = models.OneToOneField(
        Photoshoot,
        related_name="retake_photoshoot",
        on_delete=models.CASCADE,
        null=True,
    )
    reason = models.CharField(null=True, blank=True, max_length=250)
    date_submitted = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return f"{self.reason}"

