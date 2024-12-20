from django.db import models
from employee.models import Cusers

class Task(models.Model):
    task_title = models.CharField(max_length=100)
    task_des = models.TextField()
    task_type = models.CharField(max_length=100,choices=
                                 (
                                     ("IT","IT"),
                                     ("Non IT","Non IT")
                                 ))
    task_assign_to =models.ManyToManyField(Cusers,related_name="Employee")