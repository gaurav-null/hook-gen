from django.urls import path
from .views import CreateJobView, JobDetailView

urlpatterns = [
    path('jobs/', CreateJobView.as_view(), name='create-job'),
    path('jobs/<uuid:job_id>/', JobDetailView.as_view(), name='job-detail'),
]