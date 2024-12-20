from django.urls import path,include
from rest_framework.routers import DefaultRouter
from employee.views import cuser_view

router = DefaultRouter()
router.register(r'user',cuser_view,basename="cusers")

urlpatterns = [
    path('api/',include(router.urls)),
]
