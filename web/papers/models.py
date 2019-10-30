from django.db import models

# Create your models here.
class Paper(models.Model):
    displayName = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.name
