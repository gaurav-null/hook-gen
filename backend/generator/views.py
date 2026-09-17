from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import VideoJob
from .serializers import VideoJobSerializer
from .tasks import process_video_pipeline

class CreateJobView(APIView):
    """
    Endpoint: POST /api/jobs/
    Accepts: JSON {"youtube_url": "..."} OR multipart form-data with file "source_file"
    """
    def post(self, request):
        serializer = VideoJobSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            job = serializer.save()
            
            # Dispatch background Celery task
            process_video_pipeline.delay(str(job.id))
            
            return Response(VideoJobSerializer(job, context={'request': request}).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class JobDetailView(APIView):
    """
    Endpoint: GET /api/jobs/<job_id>/
    Returns: Current status, progress percentage, and final output URL once completed.
    """
    def get(self, request, job_id):
        job = get_object_or_404(VideoJob, id=job_id)
        serializer = VideoJobSerializer(job, context={'request': request})
        return Response(serializer.data)