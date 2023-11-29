from django.contrib.auth import get_user_model

from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet

from .serializers import UserSerializer, UserDetailSerializer
from .permissions import IsSelf
from django.db.models.functions import Concat
from django.db.models import Value
from django.db.models import Q

User = get_user_model()


class UserViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin, 
    mixins.UpdateModelMixin, 
    GenericViewSet):
    serializer_class = UserDetailSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated, IsSelf]

    def get_queryset(self):
        queryset = User.objects.all().annotate(full_name=Concat('first_name', Value(' '), 'middle_initial', Value(' '), 'last_name'))

        # Pagination
        page = self.request.query_params.get('page')
        limit = self.request.query_params.get('limit')
        has_writeup = self.request.query_params.get('hasWriteup')
        sort_by = self.request.query_params.get('sortBy')
        search_input = self.request.query_params.get('searchInput')

        # If only people with writeups should be fetched
        if (has_writeup is not None):
            if has_writeup == "1":
                queryset = queryset.exclude(writeup__isnull=True)

        # Check if search input is ID or name
        if (search_input is not None):
            if (search_input.isdecimal()):
                # filter by id
                queryset = queryset.filter(username__icontains=search_input)
            else:
                # filter by full name
                queryset = queryset.filter(Q(full_name__icontains=search_input) | Q(academic_information__school__icontains=search_input) | Q(academic_information__primary_course__icontains=search_input) | Q(writeup__status__icontains=search_input))


        # Do sorting
        if (sort_by is not None):
            if sort_by == "date":
                # Sort by date
                queryset = queryset.order_by("-writeup__date_submitted")
            elif sort_by == "school":
                # Sort by school
                queryset = queryset.order_by("academic_information__school")
            elif sort_by == "course":
                # Sort by course
                queryset = queryset.order_by("academic_information__year_level","academic_information__primary_course")
            elif sort_by == "writeup" and (has_writeup is not None):
                # Sort by writeup
                queryset = queryset.order_by("-writeup__status")
            elif sort_by == "id_number":
                # Sort by id
                queryset = queryset.order_by("username")
            elif sort_by == "last_name":
                # Sort by lastname
                queryset = queryset.order_by("last_name", "first_name")

        # What page and limit
        if (page is not None) and (limit is not None):
            start_index = (int(page) - 1) * int(limit)
            end_index = int(page) * int(limit)
            return queryset[start_index:end_index]

        return queryset
