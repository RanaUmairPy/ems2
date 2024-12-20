from rest_framework import serializers
from task.models import Task


class taskserializers(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'