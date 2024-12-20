from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import Baseusermanager  

class Cusers(AbstractUser):
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, unique=True)

    USERNAME_FIELD = 'email'  
    REQUIRED_FIELDS = ['phone_number']  

    objects = Baseusermanager()  

    def __str__(self):
        return self.email
