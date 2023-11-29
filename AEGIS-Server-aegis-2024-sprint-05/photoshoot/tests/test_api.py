import json
import datetime

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from accounts.models import User
from ..models import PhotoshootDates, PhotoshootDateTime


class PhotoshootsTest(APITestCase):
    def setUp(self):
        self.photoshoot_url = "/api/photoshoot/"
        data = {
            "username": "161111",
            "password1": "eightlongpw",
            "password2": "eightlongpw",
            "email": "tomy@obf.ateneo.edu",
            "first_name": "Juan",
            "middle_initial": "F",
            "last_name": "Dela Cruz",
            "mobile_number": "09111111111",
        }
        self.data = data
        user = User(
            username=data.get("username", ""),
            email=data.get("email", ""),
            first_name=data.get("first_name"),
            middle_initial=data.get("middle_initial"),
            last_name=data.get("last_name"),
            mobile_number=data.get("mobile_number"),
        )
        user.set_password(data.get("password"))
        user.save()

        photoshoot_date = PhotoshootDates.objects.create(
            status="available_slots",
            available_date=datetime.date.today()
        )
        photoshoot_date.save()

        photoshoot_datetime = PhotoshootDateTime.objects.create(
            status="available_slots",
            date=photoshoot_date,
            time=datetime.now().strftime("%H:%M"),
            slots=1
        )
        photoshoot_datetime.save()

        self.photoshoot_datetime = photoshoot_datetime 
        self.pre_created_user = user

    def test_individual_photoshoot(self):
        """
        Ensure we can create an individual photoshoot object
        """
        data = {
            "user": self.pre_created_user,
            "photoshoot_type": "Individual",
            "photoshoot_datetime": self.photoshoot_datetime,
        }
        response = self.client.post(self.registration_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # def test_should_create_account_with_secondary_course(self):
    #     """
    #     Ensure we can create an account object with a secondary course
    #     """
    #     data = self.data
    #     data["username"] = "161112"
    #     data["email"] = "tomy2@obf.ateneo.edu"
    #     data["secondary_course"] = "AB HUM"
    #     response = self.client.post(self.registration_url, data, format="json")
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    #     self.assertEqual(User.objects.count(), 2)
    #     self.assertEqual(User.objects.filter(username="161111").count(), 1)

    # def test_should_fail_if_duplicate_email(self):
    #     """
    #     Ensures no accounts with an existing email are created
    #     """
    #     data = self.data
    #     data["username"] = "161114"  # we're testing email not username
    #     response = self.client.post(self.registration_url, data, format="json")
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # def test_should_fail_if_duplicate_username(self):
    #     """
    #     Ensures no accounts 
    #     with an existing username are created
    #     """
    #     data = self.data
    #     data["email"] = "bayot@obf.ateneo.edu"  # we're testing username not email
    #     response = self.client.post(self.registration_url, data, format="json")
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # def test_should_fail_if_primary_and_secondary_matches(self):
    #     """
    #     Ensures no accounts with the
    #     same primary course and secondary
    #     course are created
    #     """
    #     data = self.data
    #     data["username"] = "161234"
    #     data["email"] = "pandit@obf.ateneo.edu"
    #     data["secondary_course"] = "BS CS"
    #     response = self.client.post(self.registration_url, data, format="json")
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # def test_should_fail_if_passwords_dont_match(self):
    #     """
    #     Ensures no accounts with
    #     different password1 & password 2
    #     are created
    #     """
    #     data = self.data
    #     data["username"] = "161234"
    #     data["email"] = "pandit@obf.ateneo.edu"
    #     data["password2"] = "wasdnasldhasd"  # wrong password
    #     response = self.client.post(self.registration_url, data, format="json")
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # # email cases
    # def test_should_fail_if_email_not_valid_obf_email(self):
    #     """
    #     Ensures no accounts with 
    #     invalid emails are created
    #     """
    #     data = self.data
    #     data["username"] = "161234"
    #     data["email"] = "new@obf.sss.edu"
    #     response = self.client.post(self.registration_url, data, format="json")
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # # id cases
    # def test_should_fail_if_id_number_case_length(self):
    #     """
    #     Ensures no accounts with invalid id lengths are created
    #     """
    #     data = self.data
    #     data["username"] = "16123411"
    #     data["email"] = "hellothere@obf.ateneo.edu"
    #     response = self.client.post(self.registration_url, data, format="json")
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # def test_should_fail_if_id_number_case_initial_digits(self):
    #     """
    #     Ensures no accounts with invalid id initial digits are created
    #     """
    #     data = self.data
    #     data["username"] = "211111"
    #     data["email"] = "hellothere@obf.ateneo.edu"
    #     response = self.client.post(self.registration_url, data, format="json")
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # def test_should_fail_if_id_number_case_less_than_14_or_greater_than_16(self):
    #     """
    #     Ensures no accounts with invalid id initial values are created
    #     Fails when id[0] & id[1] > 16 || < 14
    #     """
    #     data = self.data
    #     data["username"] = "131111"
    #     data["email"] = "hellothere@obf.ateneo.edu"
    #     response = self.client.post(self.registration_url, data, format="json")
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # #  user
    # ## retrieve user
    # def test_should_retrieve_user_details(self):
    #     user = self.pre_created_user
    #     self.client.force_login(user=user)
    #     response = self.client.get(self.user_url)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    # ## update user
    # def test_should_update_user_details(self):
    #     user = self.pre_created_user
    #     self.client.force_login(user=user)
    #     new_data = {
    #         "username": "161111",
    #         "email": "tomy@obf.ateneo.edu",
    #         "first_name": "Updated Name",
    #         "middle_initial": "le",
    #         "last_name": "Dela Cruz",
    #         "mobile_number": "09111111111",
    #         "academic_information": {
    #             "school": "SOSS",
    #             "year_level": "4",
    #             "primary_course": "BS CS",
    #             "secondary_course": "",
    #         },
    #     }
    #     response = self.client.put(self.user_url, new_data)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_should_fail_if_update_user_details_provides_an_existing_id(self):
    #     new_user_data = {
    #         "username": "161112",  # diff with self.pre_created_user
    #         "password1": "eightlongpw",
    #         "password2": "eightlongpw",
    #         "email": "tomypogi@obf.ateneo.edu",  # diff with self.pre_created_user
    #         "first_name": "Juan",
    #         "middle_initial": "F",
    #         "last_name": "Dela Cruz",
    #         "mobile_number": "09111111111",
    #         "school": "SOSE",
    #         "year_level": "4",
    #         "primary_course": "BS CS",
    #         "secondary_course": "",
    #     }
    #     new_user = User(
    #         username=new_user_data.get("username", ""),
    #         email=new_user_data.get("email", ""),
    #         first_name=new_user_data.get("first_name"),
    #         middle_initial=new_user_data.get("middle_initial"),
    #         last_name=new_user_data.get("last_name"),
    #         mobile_number=new_user_data.get("mobile_number"),
    #     )
    #     new_user.set_password(new_user_data.get("password"))
    #     new_user.save()
    #     new_academic_information = AcademicInformation.objects.create(
    #         user=new_user,
    #         school=new_user_data.get("school"),
    #         year_level=new_user_data.get("year_level"),
    #         primary_course=new_user_data.get("primary_course"),
    #         secondary_course=new_user_data.get("secondary_course"),
    #     )

    #     self.client.force_login(user=new_user)

    #     new_user_data = {
    #         "username": "161111",  # same as pre_created_user
    #         "email": "tomypogi@obf.ateneo.edu",  # same as old data as we're testing id
    #         "first_name": "Updated Name",
    #         "middle_initial": "le",
    #         "last_name": "Dela Cruz",
    #         "mobile_number": "09111111111",
    #         "academic_information": {
    #             "school": "SOSS",
    #             "year_level": "4",
    #             "primary_course": "BS CS",
    #             "secondary_course": "",
    #         },
    #     }

    #     response = self.client.put(f"/api/users/{new_user.id}/", new_user_data)
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # def test_should_fail_if_update_user_details_provides_an_existing_obf_email(self):
    #     new_user_data = {
    #         "username": "161112",  # diff with self.pre_created_user
    #         "password1": "eightlongpw",
    #         "password2": "eightlongpw",
    #         "email": "tomypogi@obf.ateneo.edu",  # diff with self.pre_created_user
    #         "first_name": "Juan",
    #         "middle_initial": "F",
    #         "last_name": "Dela Cruz",
    #         "mobile_number": "09111111111",
    #         "school": "SOSE",
    #         "year_level": "4",
    #         "primary_course": "BS CS",
    #         "secondary_course": "",
    #     }
    #     new_user = User(
    #         username=new_user_data.get("username", ""),
    #         email=new_user_data.get("email", ""),
    #         first_name=new_user_data.get("first_name"),
    #         middle_initial=new_user_data.get("middle_initial"),
    #         last_name=new_user_data.get("last_name"),
    #         mobile_number=new_user_data.get("mobile_number"),
    #     )
    #     new_user.set_password(new_user_data.get("password"))
    #     new_user.save()
    #     new_academic_information = AcademicInformation.objects.create(
    #         user=new_user,
    #         school=new_user_data.get("school"),
    #         year_level=new_user_data.get("year_level"),
    #         primary_course=new_user_data.get("primary_course"),
    #         secondary_course=new_user_data.get("secondary_course"),
    #     )

    #     self.client.force_login(user=new_user)

    #     new_user_data = {
    #         "username": "161112",  # same as old data as we're testing email
    #         "email": "tomy@obf.ateneo.edu",  # same as old data as we're testing id
    #         "first_name": "Updated Name",
    #         "middle_initial": "le",
    #         "last_name": "Dela Cruz",
    #         "mobile_number": "09111111111",
    #         "academic_information": {
    #             "school": "SOSS",
    #             "year_level": "4",
    #             "primary_course": "BS CS",
    #             "secondary_course": "",
    #         },
    #     }

    #     response = self.client.put(f"/api/users/{new_user.id}/", new_user_data)
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
