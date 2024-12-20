from employee.serializer import userserializer
from employee.models import Cusers
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password
from django.contrib.auth import login as django_login
from django.contrib.auth.models import AnonymousUser
from django.http import JsonResponse

class cuser_view(viewsets.ModelViewSet):
    queryset = Cusers.objects.all()
    serializer_class = userserializer

    @action(detail=False, methods=['POST'], url_path='login')
    def login(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = Cusers.objects.get(email=email)
            if check_password(password, user.password):
                # Create a session for the user (use Django's built-in session management)
                django_login(request, user)
                
                return Response({
                    "message": "Login successfully!...",
                    "user_id": user.id,
                    "first_name": user.first_name,
                    "email": user.email,
                    "is_superuser": user.is_superuser,
                }, status=status.HTTP_200_OK)
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
    
    # You can also define a logout function
    @action(detail=False, methods=['POST'], url_path='logout')
    def logout(self, request):
        request.user.logout()  # Django's built-in logout
        return Response({"message": "Logout successful!"}, status=status.HTTP_200_OK)
