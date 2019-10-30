from django.db import models


# Create your models here.
class Paper(models.Model):
    title = models.CharField(max_length=1000)
    abstract = models.TextField()

    def __str__(self):
        return self.title
