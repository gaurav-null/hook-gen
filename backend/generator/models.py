from django.db import models
import uuid

class VideoJob(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('DOWNLOADING', 'Downloading Video'),
        ('EXTRACTING_AUDIO', 'Extracting Audio'),
        ('TRANSCRIBING', 'Transcribing Audio'),
        ('ANALYZING_HOOK', 'Finding Viral Hook'),
        ('CUTTING_VIDEO', 'Rendering 9:16 Clip'),
        ('COMPLETED', 'Completed'),
        ('FAILED', 'Failed'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    youtube_url = models.URLField(blank=True, null=True)
    source_file = models.FileField(upload_to='sources/', blank=True, null=True)
    
    # Progress tracking
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='PENDING')
    progress = models.IntegerField(default=0)
    
    # AI Hook Details
    hook_start = models.FloatField(null=True, blank=True)
    hook_end = models.FloatField(null=True, blank=True)
    hook_title = models.CharField(max_length=255, blank=True)
    hook_reasoning = models.TextField(blank=True)
    
    # Output file
    output_video = models.FileField(upload_to='hooks/', blank=True, null=True)
    error_message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Job {self.id} - {self.status} ({self.progress}%)"