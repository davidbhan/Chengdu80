from rest_framework import viewsets, permissions
from rest_framework.response import Response

from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly, ]
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
