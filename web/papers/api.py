# from rest_framework import viewsets, permissions
# from rest_framework.response import Response

# from .models import Paper
# from .serializers import PaperSerializer


# class PaperViewSet(viewsets.ModelViewSet):
#     permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly, ]
#     serializer_class = PaperSerializer
#     queryset = Paper.objects.all()

from django_elasticsearch_dsl_drf.constants import (
    LOOKUP_FILTER_TERMS,
    LOOKUP_FILTER_RANGE,
    LOOKUP_FILTER_PREFIX,
    LOOKUP_FILTER_WILDCARD,
    LOOKUP_QUERY_IN,
    LOOKUP_QUERY_GT,
    LOOKUP_QUERY_GTE,
    LOOKUP_QUERY_LT,
    LOOKUP_QUERY_LTE,
    LOOKUP_QUERY_EXCLUDE,
)
from django_elasticsearch_dsl_drf.filter_backends import (
    FilteringFilterBackend,
    IdsFilterBackend,
    OrderingFilterBackend,
    DefaultOrderingFilterBackend,
    SearchFilterBackend,
)
from django_elasticsearch_dsl_drf.viewsets import BaseDocumentViewSet
from django_elasticsearch_dsl_drf.pagination import PageNumberPagination

from papers.documents import PaperDocument
from papers.serializers import PaperDocumentSerializer


class PaperViewSet(BaseDocumentViewSet):
    """The BookDocument view."""

    document = PaperDocument
    serializer_class = PaperDocumentSerializer
    pagination_class = PageNumberPagination
    lookup_field = 'id'
    filter_backends = [
        FilteringFilterBackend,
        IdsFilterBackend,
        OrderingFilterBackend,
        DefaultOrderingFilterBackend,
        SearchFilterBackend,
    ]
    # Define search fields
    search_fields = (
        'name',
        'description',
    )
    # # Define filter fields
    filter_fields = {
        'id': {
            'field': 'id',
            # Note, that we limit the lookups of id field in this example,
            # to `range`, `in`, `gt`, `gte`, `lt` and `lte` filters.
            'lookups': [
                LOOKUP_FILTER_RANGE,
                LOOKUP_QUERY_IN,
                LOOKUP_QUERY_GT,
                LOOKUP_QUERY_GTE,
                LOOKUP_QUERY_LT,
                LOOKUP_QUERY_LTE,
            ],
        },
        'description': 'description.raw',
    }
    # # Define ordering fields
    ordering_fields = {
        'id': 'id',
        'description': 'description.raw',
    }
    # # Specify default ordering
    # ordering = ('id', 'title', 'price',)