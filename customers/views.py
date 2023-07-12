from django.shortcuts import render
from rest_framework import viewsets, filters
from .serializer import CustomerSerializer
from .models import Customer
# Create your views here.

class CustomerView(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ['name','lastname','dni']
