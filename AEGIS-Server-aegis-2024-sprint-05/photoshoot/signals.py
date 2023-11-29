from django.contrib.auth.models import User
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.db.models import Count
from .models import PhotoshootDate, Photoshoot, PhotoshootDateTime, Retake


@receiver(post_save, sender=PhotoshootDate)
def save_dates(sender, instance, **kwargs):
    if hasattr(instance, "datetime_date"):
        times = PhotoshootDateTime.objects.filter(date=instance.pk)
        available_slots = False
        for time in times:
            if time.slots > 0:
                available_slots = True

        if available_slots:
            instance.status = "available_slots"
            instance.save()
        else:
            instance.status = "full_slots"
            instance.save()
    else:
        instance.status = "no_slots"
        instance.save()


@receiver(post_save, sender=Photoshoot)
def reduce_photoshoot_slots(sender, instance, **kwargs):
    photoshoot_datetime = instance.photoshoot_datetime
    photoshoot_datetime.slots = photoshoot_datetime.slots - 1

    if photoshoot_datetime.slots == 0:
        photoshoot_datetime.status = "full_slots"
    else:
        photoshoot_datetime.status = "available_slots"

    photoshoot_datetime.save()


@receiver(post_delete, sender=Photoshoot)
def add_photoshoot_slots(sender, instance, **kwargs):
    photoshoot_datetime = instance.photoshoot_datetime
    photoshoot_datetime.slots + 1

    if photoshoot_datetime.slots == 0:
        photoshoot_datetime.status = "full_slots"
    else:
        photoshoot_datetime.status = "available_slots"

    photoshoot_datetime.save()


@receiver(post_save, sender=Retake)
def update_retake_status(sender, instance, **kwargs):
    retake_status = instance.status
    photoshoot = instance.photoshoot
    if retake_status == "approved":
        photoshoot.is_retaking = True
        photoshoot.photoshoot_datetime = None
        photoshoot.attended = False
        photoshoot.individual_photoshoot.delete()

