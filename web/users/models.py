from django.db import models
from django.contrib.auth.models import PermissionsMixin, AbstractBaseUser, BaseUserManager

class AccountManager(BaseUserManager):
    def create_user(self, email, password, name):
        user = self.model(email=email, password=password, name=name)
        user.set_password(password)
        user.is_staff = False
        user.is_superuser = False
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, name):
        user = self.create_user(email=email, password=password, name=name)
        user.is_active = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

    def get_by_natural_key(self, email_):
        return self.get(email=email_)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=30)
    is_staff = models.BooleanField(default=False)
    REQUIRED_FIELDS = ['name']
    USERNAME_FIELD = 'email'

    objects = AccountManager()

    def get_short_name(self):
        return self.name

    def natural_key(self):
        return self.email

    def __str__(self):
        return self.email
