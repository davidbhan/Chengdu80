from django.urls import path

from . import api

urlpatterns = [
    path('', api.index, name='index'),
    path('update_basket/', api.update_basket, name='update_basket')
]
