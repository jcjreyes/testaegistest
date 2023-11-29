from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from ..models import Announcements


class AnnouncementsAPITest(APITestCase):
    def setUp(self):
        self.announcements_url = reverse()

