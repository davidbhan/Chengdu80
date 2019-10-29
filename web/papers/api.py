from rest_framework import viewsets, permissions
from rest_framework.response import Response

from .models import Paper
from .serializers import PaperSerializer

class PaperViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly, ]
    serializer_class = PaperSerializer
    queryset = Paper.objects.all()
