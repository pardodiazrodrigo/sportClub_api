from django.db import models

# Create your models here.
class Customer(models.Model):
    dni = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    dob = models.DateField()
    is_gba = models.BooleanField(default=False)

    def __str__(self):
        return self.name + " " + self.lastname
