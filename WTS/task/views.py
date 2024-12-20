from rest_framework import viewsets
from task.models import Task
from task.serializers import taskserializers



class task_view(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = taskserializers
   
   