from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework import authentication, permissions

from django.http import HttpResponse
import csv
from django.http import StreamingHttpResponse

from ..models import AcademicInformation, User

from .serializers import UserDetailSerializer

from django.contrib.auth.password_validation import CommonPasswordValidator
from django.core.exceptions import ValidationError
import re
from rest_framework.renderers import JSONRenderer
from django.db.models.functions import Concat
from django.db.models import Value
from django.db.models import Q
from bs4 import BeautifulSoup

class PasswordTooCommon(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        cpv = CommonPasswordValidator()
        pw = request.data.get("pw", "")
        try:
            cpv.validate(pw)
            return Response({"common": False})
        except ValidationError:
            return Response({"common": True})


class ListCourseCodes(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, format=None):
        return Response(AcademicInformation.Courses.values)


class ListSchools(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, format=None):
        return Response(AcademicInformation.Schools.values)


class ListYearLevels(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, format=None):
        return Response(AcademicInformation.YearLevels.values)


class GetMe(APIView):
    serializer_class = UserDetailSerializer
    permissions_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get(self, request):
        if self.request.user.is_authenticated:
            serializer = UserDetailSerializer(self.request.user)
            return Response({"is_logged_in": True, "user": serializer.data})
        else:
            return Response({"is_logged_in": False, "user": None})


class CountWriteupUsers(APIView):
    renderer_classes = [JSONRenderer]

    def get(self, request, format=None):
        search_input = request.query_params.get('searchInput')

        query = User.objects.annotate(full_name=Concat('first_name', Value(' '), 'middle_initial', Value(' '), 'last_name')).exclude(writeup__isnull=True)

        if (search_input is not None):
            if (search_input.isdecimal()):
                # filter by id
                user_count = query.filter(username__icontains=search_input).count()
            else:
                # filter by full name
                user_count = query.filter(Q(full_name__icontains=search_input) | Q(academic_information__school__icontains=search_input) | Q(academic_information__primary_course__icontains=search_input) | Q(writeup__status__icontains=search_input)).count()
        else:
            user_count = query.count()
            
        content = {'length': user_count}
        return Response(content)


# Exporting CSV
class Echo:
    """An object that implements just the write method of the file-like
    interface.
    """
    def write(self, value):
        """Write the value by returning it, instead of storing in a buffer."""
        return value

class DownloadWriteups(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        queryset = User.objects.values(
            "writeup__date_submitted", 
            "username", 
            "last_name", 
            "first_name", 
            "academic_information__realschool",
            "academic_information__year_level",
            "academic_information__primary_course",
            "writeup__content"
        )

        all_users = []
        for row in queryset:
            fields_list = [
                row["writeup__date_submitted"], 
                row["username"], 
                row["last_name"], 
                row["first_name"],
                row["academic_information__realschool"],
                row["academic_information__year_level"],
                row["academic_information__primary_course"],
            ]

            if row["writeup__content"]:
                html_to_text = BeautifulSoup(row["writeup__content"]).get_text()
                fields_list.append(html_to_text)
            else:
                fields_list.append('')

            all_users.append(fields_list)

        
        echo_buffer = Echo()
        csv_writer = csv.writer(echo_buffer)

        # By using a generator expression to write each row in the queryset
        # python calculates each row as needed, rather than all at once.
        # Note that the generator uses parentheses, instead of square
        # brackets – ( ) instead of [ ].
        rows = (csv_writer.writerow(row) for row in all_users)

        response = StreamingHttpResponse(rows, content_type="text/csv")

        response["Content-Disposition"] = 'attachment; filename="writeups.csv"'
        return response


    
    
                

            