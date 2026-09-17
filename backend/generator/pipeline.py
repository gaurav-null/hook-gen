import os
import subprocess
import json
import yt_dlp
from dotenv import load_dotenv

load_dotenv()

def download_youtube_video(url: str, output_dir: str, job_id: str) -> str:
    """Downloads YouTube video as MP4 using yt-dlp."""
    os.makedirs(output_dir, exist_ok=True)
    out_template = os.path.join(output_dir, f"{job_id}_source.%(ext)s")
    
    ydl_opts = {
        # Select 720p or lower to save HDD space and speed up Pentium processing
        'format': 'bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]/best[height<=720][ext=mp4]/best',
        'outtmpl': out_template,
        'merge_output_format': 'mp4',
        'quiet': True,
        'no_warnings': True,
    }
    
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
        
    return os.path.join(output_dir, f"{job_id}_source.mp4")


def extract_audio_ffmpeg(video_path: str, audio_path: str):
    """
    Extracts lightweight 16kHz mono MP3 audio.
    Very fast, consumes minimal memory and upload bandwidth.
    """
    os.makedirs(os.path.dirname(audio_path), exist_ok=True)
    cmd = [
        "ffmpeg", "-y",
        "-i", video_path,
        "-vn",
        "-acodec", "libmp3lame",
        "-ar", "16000",
        "-ac", "1",
        "-b:a", "64k",
        audio_path
    ]
    result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if result.returncode != 0:
        raise RuntimeError(f"FFmpeg audio extraction failed: {result.stderr}")


def transcribe_with_whisper(audio_path: str) -> list:
    """
    Transcribes audio using Groq Whisper (ultra fast) or OpenAI Whisper.
    Returns a list of segments with start, end, and text.
    """
    groq_key = os.getenv("GROQ_API_KEY")
    openai_key = os.getenv("OPENAI_API_KEY")

    if groq_key:
        from groq import Groq
        client = Groq(api_key=groq_key)
        with open(audio_path, "rb") as file:
            transcription = client.audio.transcriptions.create(
                file=(os.path.basename(audio_path), file.read()),
                model="whisper-large-v3",
                response_format="verbose_json",
            )
            # transcription.segments contains [{'start': 0.0, 'end': 3.5, 'text': '...'}]
            return transcription.segments

    elif openai_key:
        from openai import OpenAI
        client = OpenAI(api_key=openai_key)
        with open(audio_path, "rb") as file:
            transcription = client.audio.transcriptions.create(
                file=file,
                model="whisper-1",
                response_format="verbose_json",
            )
            return transcription.segments
    else:
        raise ValueError("Missing GROQ_API_KEY or OPENAI_API_KEY in .env")


def find_viral_hook_llm(segments: list) -> dict:
    """
    Sends timestamped transcript to Gemini Flash to pick the viral 30s hook.
    Returns: {"start_time": float, "end_time": float, "hook_headline": str, "hook_reasoning": str}
    """
    gemini_key = os.getenv("GEMINI_API_KEY")
    if not gemini_key:
        raise ValueError("Missing GEMINI_API_KEY in .env")

    # Format transcript with timestamps
    transcript_text = ""
    for s in segments:
        # Handle dict or object access depending on client
        start = s.get('start') if isinstance(s, dict) else getattr(s, 'start', 0.0)
        end = s.get('end') if isinstance(s, dict) else getattr(s, 'end', 0.0)
        text = s.get('text') if isinstance(s, dict) else getattr(s, 'text', '')
        transcript_text += f"[{start:.2f}s - {end:.2f}s]: {text}\n"

    prompt = f"""
You are a viral TikTok, YouTube Shorts, and Instagram Reels editor.
Below is a timestamped transcript of a video.

Find the single most viral, exciting 20 to 45-second segment with the highest emotional tension, curiosity hook, or surprising insight.
The segment MUST:
1. Start immediately with high energy / intrigue (no fluff).
2. End on a complete punchline or thought (do not cut off mid-sentence).
3. Be between 20 and 45 seconds total duration.

TRANSCRIPT:
{transcript_text}

Respond ONLY with valid JSON in this exact structure:
{{
  "start_time": 12.5,
  "end_time": 42.0,
  "hook_headline": "The shocking truth about...",
  "hook_reasoning": "Starts with an intense question and delivers a surprising revelation."
}}
"""

    from google import genai
    from google.genai import types

    client = genai.Client(api_key=gemini_key)
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json"
        )
    )

    data = json.loads(response.text)
    return data


def cut_and_reframe_ffmpeg(input_video: str, output_video: str, start_time: float, end_time: float):
    """
    Cuts the video segment and reframes to 9:16 portrait.
    Optimized for Intel Pentium:
    - Puts -ss and -to before -i (instant fast seek, no HDD lag)
    - Uses -preset veryfast and direct 9:16 center crop (very low CPU usage)
    """
    os.makedirs(os.path.dirname(output_video), exist_ok=True)
    duration = end_time - start_time
    if duration <= 0:
        duration = 30.0

    cmd = [
        "ffmpeg", "-y",
        "-ss", str(start_time),
        "-t", str(duration),
        "-i", input_video,
        "-vf", "crop=ih*(9/16):ih,scale=1080:1920",
        "-c:v", "libx264",
        "-preset", "veryfast",
        "-crf", "23",
        "-c:a", "aac",
        "-b:a", "128k",
        output_video
    ]
    result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if result.returncode != 0:
        raise RuntimeError(f"FFmpeg cutting failed: {result.stderr}")