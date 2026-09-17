import os
from celery import shared_task
from .models import VideoJob
from .pipeline import (
    download_youtube_video,
    extract_audio_ffmpeg,
    transcribe_with_whisper,
    find_viral_hook_llm,
    cut_and_reframe_ffmpeg
)

@shared_task(bind=True)
def process_video_pipeline(self, job_id):
    job = VideoJob.objects.get(id=job_id)
    temp_dir = "media/temp"
    os.makedirs(temp_dir, exist_ok=True)
    
    try:
        # Step 1: Download or locate source video
        if job.youtube_url:
            job.status = 'DOWNLOADING'
            job.progress = 10
            job.save()
            input_video_path = download_youtube_video(job.youtube_url, temp_dir, str(job.id))
        else:
            input_video_path = job.source_file.path

        # Step 2: Extract audio
        job.status = 'EXTRACTING_AUDIO'
        job.progress = 30
        job.save()
        audio_path = os.path.join(temp_dir, f"{job.id}_audio.mp3")
        extract_audio_ffmpeg(input_video_path, audio_path)

        # Step 3: Transcribe
        job.status = 'TRANSCRIBING'
        job.progress = 50
        job.save()
        segments = transcribe_with_whisper(audio_path)

        # Step 4: Hook Intelligence with Gemini
        job.status = 'ANALYZING_HOOK'
        job.progress = 70
        job.save()
        hook_info = find_viral_hook_llm(segments)
        
        job.hook_start = hook_info.get('start_time', 0.0)
        job.hook_end = hook_info.get('end_time', 30.0)
        job.hook_title = hook_info.get('hook_headline', 'Viral Hook')
        job.hook_reasoning = hook_info.get('hook_reasoning', '')
        job.save()

        # Step 5: Cut & Reframe 9:16 Video
        job.status = 'CUTTING_VIDEO'
        job.progress = 85
        job.save()
        
        output_rel_path = f"hooks/{job.id}_hook.mp4"
        output_full_path = os.path.join("media", output_rel_path)
        cut_and_reframe_ffmpeg(input_video_path, output_full_path, job.hook_start, job.hook_end)

        # Step 6: Complete & cleanup temp audio
        job.output_video = output_rel_path
        job.status = 'COMPLETED'
        job.progress = 100
        job.save()

        # Clean up temporary audio file to preserve HDD space
        if os.path.exists(audio_path):
            os.remove(audio_path)

    except Exception as e:
        job.status = 'FAILED'
        job.error_message = str(e)
        job.save()
        raise e