# Generated by Django 3.0.6 on 2021-05-13 16:00

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('yearbook', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='yearbook',
            name='date_submitted',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
