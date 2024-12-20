from rest_framework.routers import DefaultRouter
from django.urls import path,include
from task.views import task_view

router = DefaultRouter()
router.register(r'task',task_view,basename="task")

urlpatterns = [
    path('api/',include(router.urls)),
]
