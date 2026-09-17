from rest_framework import serializers
from .models import VideoJob

class VideoJobSerializer(serializers.ModelSerializer):
    output_video_url = serializers.SerializerMethodField()

    class Meta:
        model = VideoJob
        fields = [
            'id',
            'youtube_url',
            'source_file',
            'status',
            'progress',
            'hook_start',
            'hook_end',
            'hook_title',
            'hook_reasoning',
            'output_video',
            'output_video_url',
            'error_message',
            'created_at',
        ]
        read_only_fields = ['id', 'status', 'progress', 'output_video', 'created_at']

    def get_output_video_url(self, obj):
        if obj.output_video:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.output_video.url)
            return obj.output_video.url
        return None