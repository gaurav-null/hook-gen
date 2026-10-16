<h1 align=center>Hook Gen</h1>

<div align=center>

![Python](https://img.shields.io/badge/python-%233776AB.svg?style=for-the-badge&logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![GitHub last commit](https://img.shields.io/github/last-commit/gaurav-null/monoRice?style=for-the-badge&labelColor=101418&color=9ccbfb)
![GitHub Repo stars](https://img.shields.io/github/stars/gaurav-null/monoRice?style=for-the-badge&labelColor=101418&color=b9c8da)
![GitHub repo size](https://img.shields.io/github/repo-size/gaurav-null/monoRice?style=for-the-badge&labelColor=101418&color=d3bfe6)
![Linux](https://img.shields.io/badge/Linux-%23FCC624.svg?style=for-the-badge&logo=linux&logoColor=black)

</div>












## Components

-   **Video Pipeline**: Automated YouTube-to-9:16 viral hook extraction using yt-dlp, FFmpeg, and Gemini AI
-   **Backend**: Django REST API with Celery for background job processing
-   **Frontend**: React + TypeScript + Vite interface for job submission and monitoring
-   **AI Transcription**: Groq Whisper or OpenAI Whisper for audio transcription
-   **Video Processing**: FFmpeg-based cutting and reframing to portrait 9:16 format


## Installation

> [!NOTE]
> Only Manuel install, No Script or Package **YET**

> [!WARNING]
> Beware of malicious pip packages!


### Manual installation

Requirements:
-   [`Python 3.9+`](https://python.org/)
-   [`FFmpeg`](https://ffmpeg.org/)
-   [`yt-dlp`](https://yt-dlp.org/)
-   [`Gemini API Key`](https://google.github.io/google-cloud-python/)
-   [`Groq API Key`](https://groq.com/) **or** [`OpenAI API Key`](https://openai.com/)
-   [`Redis`](https://redis.io/) (for Celery)
-   [`Docker`](https://docker.com/) (optional, for containerized deployment)

Build dependencies:

-   [`venv`](https://docs.python.org/3/library/venv.html) (Python virtual environment)
-   [`pip`](https://pip.pypa.io/en/stable/)

### Installation
```sh
git clone https://github.com/your-username/hook-gen.git
cd hook-gen
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your API keys (GEMINI_API_KEY, GROQ_API_KEY or OPENAI_API_KEY)
docker compose up -d  # Start Redis and Django
python manage.py migrate
python manage.py runserver
# Frontend will be at http://127.0.0.1:5173
# Backend API at http://127.0.0.1:8000/api
```



## Screenshot

<img width="1663" height="1008" alt="Capture" src="https://github.com/user-attachments/assets/1b8821fb-0895-4a38-8ce4-7deeafc60714" />




## Those Who Like my Repo <3

<a href="https://www.star-history.com/?repos=your-username%2Fhook-gen&type=date&logscale=&legend=bottom-right">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=your-username/hook-gen&type=date&theme=dark&legend=bottom-right" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=your-username/hook-gen&type=date&legend=bottom-right" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=your-username/hook-gen&type=date&legend=bottom-right" />
 </picture>
</a>
