from rest_framework import serializers
from employee.models import Cusers

class userserializer(serializers.ModelSerializer):
    class Meta:
        model = Cusers
        fields = ['first_name','username','email','phone_number','password']
        extra_kwargs = {'password': {'write_only': True}}  # Password won't be returned in responses

    def create(self, validated_data):
        return Cusers.objects.create_user(**validated_data)