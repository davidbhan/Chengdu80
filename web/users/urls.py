from django.conf.urls import include, url

from .api import RegistrationAPI, LoginAPI, UserAPI

urlpatterns = [
    url("^register/$", RegistrationAPI.as_view()),
    url("^login/$", LoginAPI.as_view()),
    url("^user/$", UserAPI.as_view()),
]
