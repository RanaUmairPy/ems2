from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status, viewsets
from django.contrib.auth.hashers import check_password
from employee.models import Cusers
from employee.serializer import userserializer

class cuser_view(viewsets.ModelViewSet):
    queryset = Cusers.objects.all()
    serializer_class = userserializer

    # Custom action for login
    @action(detail=False, methods=['post'], url_path='login')
    def login(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = Cusers.objects.get(email=email)
            if check_password(password, user.password):  # Assuming passwords are hashed
                return Response(
                    {
                        "message": "Login successful!",
                        "user_id": user.id,
                        "first_name": user.first_name,
                        "email": user.email
                    },
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {"error": "Invalid email or password."},
                    status=status.HTTP_401_UNAUTHORIZED
                )
        except Cusers.DoesNotExist:
            return Response(
                {"error": "Invalid email or password."},
                status=status.HTTP_401_UNAUTHORIZED
            )
