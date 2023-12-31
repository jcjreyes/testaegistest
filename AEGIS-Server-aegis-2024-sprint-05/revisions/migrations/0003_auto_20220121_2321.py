# Generated by Django 3.0.6 on 2022-01-21 15:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('revisions', '0002_auto_20210611_1413'),
    ]

    operations = [
        migrations.AlterField(
            model_name='revision',
            name='primary_course',
            field=models.CharField(blank=True, choices=[('AB HUM', 'Bachelor of Arts in Humanities'), ('AB IS', 'Bachelor of Arts in Interdisciplinary Studies'), ('AB LIT ENG', 'Bachelor of Arts in Literature (English)'), ('AB LIT FIL', 'Bachelor of Arts in Literature (Filipino)'), ('AB PH', 'Bachelor of Arts in Philosophy'), ('BFA AM', 'Bachelor of Fine Arts in Art Management'), ('BFA CW', 'Bachelor of Fine Arts in Creative Writing'), ('BFA ID', 'Bachelor of Fine Arts in Information Design'), ('BFA TA', 'Bachelor of Fine Arts in Theater Arts'), ('BS MGT-H', 'Bachelor of Science in Management (Honors Program)'), ('BS MGT', 'Bachelor of Science in Management'), ('BS COMTECH', 'Bachelor of Science in Communications Technology Management'), ('BS LM', 'Bachelor of Science in Legal Management'), ('BS MAC', 'Bachelor of Science in Management of Applied Chemistry'), ('BS ME', 'Bachelor of Science in Management Engineering'), ('BS ITE', 'Bachelor of Science in Information Technology Entrepreneurship'), ('BS RENT', 'Bachelor of Science in Restaurant Entrepreneurship'), ('BS BIO', 'Bachelor of Science in Biology'), ('BS LfSci', 'Bachelor of Science in Life Sciences'), ('BS CH', 'Bachelor of Science in Chemistry'), ('BS CS', 'Bachelor of Science in Computer Science'), ('BS DGDD', 'Bachelor of Science in Digital Game Design and Development'), ('BS MIS', 'Bachelor of Science in Management Information Systems'), ('BS EcE', 'Bachelor of Science in Electronics and Communications Engineering'), ('BS CoE', 'Bachelor of Science in Computer Engineering'), ('BS ES', 'Bachelor of Science in Environmental Science'), ('BS HS', 'Bachelor of Science in Health Sciences'), ('BS MSE', 'Bachelor of Science in Materials Science and Engineering'), ('BS MA', 'Bachelor of Science in Mathematics'), ('BS AMF', 'Bachelor of Science in Applied Mathematics with Specialization in Mathematical Finance'), ('BS PS', 'Bachelor of Science in Physics'), ('BS APS', 'Bachelor of Science in Applied Physics'), ('AB ChnS', 'Bachelor of Arts in Chinese Studies'), ('AB COM', 'Bachelor of Arts in Communication'), ('AB DS', 'Bachelor of Arts in Development Studies'), ('AB EC-H', 'Bachelor of Arts in Economics (Honors Program)'), ('AB EC', 'Bachelor of Arts in Economics'), ('AB MEC', 'Bachelor of Arts in Management Economics'), ('AB EU', 'Bachelor of Arts in European Studies'), ('AB HI', 'Bachelor of Arts in History'), ('AB POS', 'Bachelor of Arts in Political Science'), ('AB DipIR', 'Bachelor of Arts in Diplomacy and International Relations with Specialization in East and Southeast Asian Studies'), ('AB PSY', 'Bachelor of Arts in Psychology'), ('BS PSY', 'Bachelor of Science in Psychology'), ('AB SOS', 'Bachelor of Arts in Social Sciences')], max_length=10, null=True),
        ),
    ]
