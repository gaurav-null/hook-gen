import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import axios from 'axios';
import {
  Sparkles,
  Upload,
  CheckCircle2,
  AlertCircle,
  Download,
  Loader2,
  Clock,
  FileVideo,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import Button from './components/Button';
import Input from './components/Input';
import Label from './components/Label';
import Navigation from './components/Navigation';
import {
  NewsprintTexture,
  Divider,
  MarqueeTicker,
  HalftonePattern,
} from './components/Decorative';

const API_BASE = "http://127.0.0.1:8000/api";

export type JobStatus =
  | 'PENDING'
  | 'DOWNLOADING'
  | 'EXTRACTING_AUDIO'
  | 'TRANSCRIBING'
  | 'ANALYZING_HOOK'
  | 'CUTTING_VIDEO'
  | 'COMPLETED'
  | 'FAILED';

export interface VideoJob {
  id: string;
  youtube_url: string | null;
  source_file: string | null;
  status: JobStatus;
  progress: number;
  hook_start: number | null;
  hook_end: number | null;
  hook_title: string;
  hook_reasoning: string;
  output_video: string | null;
  output_video_url: string | null;
  error_message: string;
  created_at: string;
}

const MARQUEE_ITEMS = [
  { tag: 'DISPATCH', text: 'A man cannot remake himself without suffering, for he is both the marble and sculptor' },
  { tag: 'NOTE', text: 'Life is not about waiting for the storm to pass, but learning to dance in the rain' },
  { tag: 'MAXIM', text: 'The same water that softens the potato hardens the egg.' },
  { tag: 'RULE', text: 'If its worth doing, its worth overdoing' },
  { tag: 'PROVERB', text: 'We must accept finite disappointment, but never loose infinite hope' },
];

export default function App() {
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [job, setJob] = useState<VideoJob | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Poll job status every 1.5 seconds while active
  useEffect(() => {
    if (!job || job.status === 'COMPLETED' || job.status === 'FAILED') {
      return;
    }

    const interval = setInterval(async () => {
      try {
        const res = await axios.get<VideoJob>(`${API_BASE}/jobs/${job.id}/`);
        setJob(res.data);
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [job]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setYoutubeUrl('');
      setError(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setJob(null);
    setLoading(true);

    try {
      const formData = new FormData();
      if (youtubeUrl.trim()) {
        formData.append('youtube_url', youtubeUrl.trim());
      } else if (file) {
        formData.append('source_file', file);
      } else {
        setError('Please provide a valid YouTube URL or upload an MP4 video.');
        setLoading(false);
        return;
      }

      const res = await axios.post<VideoJob>(`${API_BASE}/jobs/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setJob(res.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || err.message);
      } else {
        setError('Failed to start viral hook generation job.');
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setYoutubeUrl('');
    setFile(null);
    setJob(null);
    setError(null);
  };

  const getStatusHeadline = (status: JobStatus): string => {
    switch (status) {
      case 'DOWNLOADING':
        return 'INGESTING YOUTUBE STREAM';
      case 'EXTRACTING_AUDIO':
        return 'ISOLATING 16KHZ MASTER AUDIO';
      case 'TRANSCRIBING':
        return 'WHISPER SPEECH RECOGNITION';
      case 'ANALYZING_HOOK':
        return 'GEMINI NARRATIVE PEAK EVALUATION';
      case 'CUTTING_VIDEO':
        return 'FFMPEG 9:16 VERTICAL REFRACTOR';
      case 'COMPLETED':
        return 'EXTRACTION COMPLETE';
      case 'FAILED':
        return 'PROCESS TERMINATED WITH ERRORS';
      default:
        return 'QUEUED IN DISPATCH ENGINE';
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F7] text-[#111111] flex flex-col selection:bg-[#111111] selection:text-[#F9F9F7] relative">
      <NewsprintTexture />

      {/* ========================================================================= */}
      {/* 1. SLIM TOP NAVBAR */}
      {/* ========================================================================= */}
      <header className="relative z-20 border-b-2 border-[#111111] bg-[#F9F9F7] flex-shrink-0">
        <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Navigation portfolioUrl="https://gaurav-nile.nya.je/" />
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://gaurav-nile.nya.je/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-wider text-[#111111] hover:text-[#CC0000] transition-colors flex items-center gap-1 font-bold px-2.5 py-1 border border-[#111111] bg-white hover:bg-[#111111] hover:text-white"
            >
              <span>Portfolio</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. SLIM TICKER CRAWL */}
      {/* ========================================================================= */}
      <section aria-label="Live Ticker" className="relative z-10 border-b-2 border-[#111111] flex-shrink-0">
        <MarqueeTicker items={MARQUEE_ITEMS} className="py-1.5" />
      </section>

      {/* ========================================================================= */}
      {/* 3. EXPANDED MAIN WORKSPACE */}
      {/* ========================================================================= */}
      <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 py-6 md:py-8 relative z-10 flex flex-col" id="generator">
        
        {/* Newspaper 12-Column Grid Container with Generous Height */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 border-4 border-[#111111] bg-[#F9F9F7] min-h-[620px] shadow-sm">
          
          {/* ----------------------------------------------------------------------- */}
          {/* LEFT 7 COLUMNS: Hook Extraction Engine Form */}
          {/* ----------------------------------------------------------------------- */}
          <section className="lg:col-span-7 p-6 sm:p-8 lg:p-10 border-b-4 lg:border-b-0 lg:border-r-4 border-[#111111] flex flex-col justify-between h-full">
            <div>
              {/* Category Badge & Headline */}
              <div className="flex items-center gap-2 mb-3">
                <Label variant="badge">FRONT PAGE EXCLUSIVE</Label>
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                  SECTION A • PAGE 1
                </span>
              </div>

              {/* Main Title */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.08] tracking-tight text-[#111111] mb-6">
                Hook Gen Running on local home server <span className="text-[#CC0000]">&lt;3</span>
              </h1>

              <Divider variant="medium" className="mb-6" />

              {/* Hook Generator Input Form */}
              <div className="bg-white border-2 border-[#111111] p-6 sm:p-8 hard-shadow-hover relative">
                <div className="flex items-center justify-between mb-5 border-b border-[#111111] pb-3">
                  <span className="font-mono text-xs uppercase tracking-widest font-bold text-[#111111] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#CC0000]" />
                    Hook Dispatch Terminal
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">
                    FIG. 01 — INPUT
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* YouTube URL Input */}
                  <div>
                    <Input
                      label="1. YouTube Video URL"
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={youtubeUrl}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setYoutubeUrl(e.target.value);
                        setFile(null);
                        setError(null);
                      }}
                      hint="Paste any public YouTube URL for automatic download & transcription."
                    />
                  </div>

                  {/* Editorial 'OR' Divider */}
                  <div className="flex items-center gap-3 py-1">
                    <div className="flex-1 h-px bg-[#111111]" />
                    <span className="font-mono text-xs uppercase font-bold tracking-widest px-2 py-0.5 border border-[#111111] bg-[#F9F9F7]">
                      OR UPLOAD MP4
                    </span>
                    <div className="flex-1 h-px bg-[#111111]" />
                  </div>

                  {/* MP4 File Upload Dropzone */}
                  <div>
                    <label className="block border-2 border-[#111111] bg-[#F9F9F7] hover:bg-neutral-100 transition-colors p-5 cursor-pointer group relative overflow-hidden">
                      <HalftonePattern />
                      <div className="relative z-10 flex items-center gap-4">
                        <div className="w-11 h-11 border-2 border-[#111111] bg-white group-hover:bg-[#111111] group-hover:text-white transition-all flex items-center justify-center flex-shrink-0">
                          {file ? (
                            <FileVideo className="w-5 h-5 text-[#CC0000]" />
                          ) : (
                            <Upload className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-mono text-xs uppercase font-bold tracking-wider text-[#111111] truncate">
                            {file ? file.name : 'Select Master MP4 File'}
                          </p>
                          <p className="font-mono text-[11px] text-neutral-500 uppercase tracking-widest mt-0.5">
                            {file
                              ? `${(file.size / (1024 * 1024)).toFixed(2)} MB • Ready for processing`
                              : 'Supports .mp4, .mov (Max 500MB)'}
                          </p>
                        </div>
                      </div>
                      <input
                        type="file"
                        accept="video/mp4,video/quicktime"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>

                  {/* Error Notification Callout */}
                  {error && (
                    <div className="p-3 border-2 border-[#CC0000] bg-red-50 text-[#111111]">
                      <div className="flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-[#CC0000] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-mono text-[11px] uppercase font-bold text-[#CC0000] tracking-widest">
                            Dispatch Error
                          </p>
                          <p className="font-body text-xs text-neutral-800 mt-0.5">
                            {error}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit Action Button */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={loading || (job !== null && job.status !== 'COMPLETED' && job.status !== 'FAILED')}
                      className="flex-1 gap-2 min-h-[46px]"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Transmitting to Queue...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-[#CC0000]" />
                          <span>Generate Viral Hook</span>
                        </>
                      )}
                    </Button>

                    {job && (
                      <Button
                        type="button"
                        variant="secondary"
                        size="lg"
                        onClick={resetForm}
                        className="gap-2 min-h-[46px] px-4"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Reset</span>
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Editorial Footer Note inside column */}
            <div className="mt-6 pt-3 border-t border-[#111111] flex items-center justify-between text-neutral-500 font-mono text-xs uppercase tracking-widest">
              <span>Whisper ASR • Gemini 2.5 • FFmpeg</span>
              <span>100% Deterministic</span>
            </div>
          </section>

          {/* ----------------------------------------------------------------------- */}
          {/* RIGHT 5 COLUMNS: Live Analysis, Progress Bar & Video Result */}
          {/* ----------------------------------------------------------------------- */}
          <section className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-[#F9F9F7] h-full">
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b-2 border-[#111111] pb-3 mb-5">
                <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#111111] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#CC0000]" />
                  Real-Time Dispatch Desk
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">
                  {job ? `JOB #${job.id.slice(0, 8)}` : 'STANDBY'}
                </span>
              </div>

              {/* Active / Polling Job Tracker */}
              {job ? (
                <div className="space-y-5 flex-1 flex flex-col">
                  {/* Status Banner */}
                  <div className="border-2 border-[#111111] bg-white p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0">
                        {job.status === 'COMPLETED' ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                        ) : job.status === 'FAILED' ? (
                          <AlertCircle className="w-5 h-5 text-[#CC0000]" />
                        ) : (
                          <Loader2 className="w-5 h-5 text-[#111111] animate-spin" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-neutral-500 block">
                          Current Stage
                        </span>
                        <h3 className="font-serif text-base font-bold text-[#111111] uppercase tracking-tight">
                          {getStatusHeadline(job.status)}
                        </h3>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="flex justify-between items-center font-mono text-xs uppercase tracking-widest mb-1.5">
                        <span className="text-neutral-600">Pipeline Completion</span>
                        <span className="font-bold text-[#111111]">{job.progress}%</span>
                      </div>
                      <div className="w-full bg-[#E5E5E0] border border-[#111111] h-2.5">
                        <div
                          className="bg-[#111111] h-full transition-all duration-300 ease-out"
                          style={{ width: `${Math.max(job.progress, 5)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* ----------------------------------------------------------------- */}
                  {/* COMPLETED STATE: Video Player & Hook Dossier */}
                  {/* ----------------------------------------------------------------- */}
                  {job.status === 'COMPLETED' && job.output_video_url && (
                    <div className="border-4 border-[#111111] bg-white p-5 hard-shadow space-y-4 flex-1 flex flex-col justify-between">
                      {/* Video Player in 9:16 Aspect Ratio Frame */}
                      <div>
                        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest pb-1.5 mb-2 border-b border-[#111111]">
                          <span className="font-bold text-[#111111]">FIG 1.1 • VIRAL 9:16 EXCERPT</span>
                          <span className="bg-[#CC0000] text-white px-2 py-0.5 text-[10px] font-bold">READY</span>
                        </div>

                        <div className="w-full max-w-[240px] mx-auto aspect-[9/16] bg-[#111111] border-2 border-[#111111] overflow-hidden relative shadow-lg">
                          <video
                            controls
                            autoPlay
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                            src={job.output_video_url}
                          />
                        </div>
                      </div>

                      {/* Editorial Hook Analysis Dossier */}
                      <div className="space-y-3 pt-2 border-t-2 border-[#111111]">
                        <div>
                          <Label variant="accent" className="mb-1 text-xs">
                            IDENTIFIED NARRATIVE HOOK
                          </Label>
                          <blockquote className="font-serif italic text-base font-bold text-[#111111] leading-snug">
                            "{job.hook_title}"
                          </blockquote>
                        </div>

                        {/* Monospace Metadata Table */}
                        <div className="border border-[#111111] divide-y divide-[#111111] font-mono text-xs">
                          <div className="flex justify-between p-2 bg-[#F9F9F7]">
                            <span className="text-neutral-500 uppercase">Timestamp Range</span>
                            <span className="font-bold text-[#111111]">
                              {job.hook_start}s — {job.hook_end}s
                            </span>
                          </div>
                          {job.hook_start !== null && job.hook_end !== null && (
                            <div className="flex justify-between p-2 bg-white">
                              <span className="text-neutral-500 uppercase">Clip Duration</span>
                              <span className="font-bold text-[#111111]">
                                {(job.hook_end - job.hook_start).toFixed(1)} Seconds
                              </span>
                            </div>
                          )}
                        </div>

                        {/* AI Editorial Reasoning */}
                        {job.hook_reasoning && (
                          <div className="bg-[#F9F9F7] border-l-4 border-[#111111] p-3 text-xs font-body leading-relaxed text-neutral-700">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500 block mb-1">
                              Editorial Evaluation:
                            </span>
                            "{job.hook_reasoning}"
                          </div>
                        )}

                        {/* Download CTA Button */}
                        <a
                          href={job.output_video_url}
                          download={`viral-hook-${job.id.slice(0, 8)}.mp4`}
                          className="block pt-1"
                        >
                          <Button
                            variant="primary"
                            size="lg"
                            className="w-full gap-2 text-xs min-h-[44px]"
                          >
                            <Download className="w-4 h-4" />
                            <span>Download 9:16 MP4 Video</span>
                          </Button>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* ----------------------------------------------------------------- */}
                  {/* FAILED STATE */}
                  {/* ----------------------------------------------------------------- */}
                  {job.status === 'FAILED' && (
                    <div className="border-4 border-[#CC0000] bg-white p-5 space-y-3">
                      <div className="flex items-center gap-2 text-[#CC0000] font-mono text-xs font-bold uppercase tracking-widest">
                        <AlertCircle className="w-5 h-5" />
                        Execution Aborted
                      </div>
                      <p className="font-body text-xs text-neutral-700">
                        The video processing pipeline encountered an error during execution.
                      </p>
                      <pre className="p-2.5 bg-red-50 border border-red-200 text-[#CC0000] font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                        {job.error_message || 'Unknown processing failure occurred.'}
                      </pre>
                      <Button
                        variant="secondary"
                        size="md"
                        onClick={resetForm}
                        className="w-full"
                      >
                        Try Another Video
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                /* Standby / Awaiting Input State */
                <div className="border-2 border-dashed border-[#111111] p-8 sm:p-12 text-center bg-white relative overflow-hidden flex-1 flex flex-col items-center justify-center">
                  <HalftonePattern />
                  <div className="relative z-10 space-y-3 max-w-sm">
                    <div className="w-12 h-12 border-2 border-[#111111] bg-[#F9F9F7] mx-auto flex items-center justify-center">
                      <Clock className="w-5 h-5 text-neutral-400" />
                    </div>
                    <h3 className="font-serif text-xl font-bold uppercase tracking-tight text-[#111111]">
                      Awaiting Dispatch Stream
                    </h3>
                    <p className="font-body text-xs text-neutral-600 leading-relaxed">
                      Submit a YouTube URL or MP4 master file to observe real-time Whisper transcription, Gemini analysis, and automated 9:16 vertical video reframing.
                    </p>
                    <div className="font-mono text-xs uppercase tracking-widest text-[#CC0000] font-bold pt-2">
                      ◆ Standby for Dispatch ◆
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Section Metadata */}
            <div className="mt-6 pt-3 border-t border-[#111111] flex items-center justify-between text-neutral-500 font-mono text-xs uppercase tracking-widest">
              <span>Status: Online</span>
              <span>Port: 8000</span>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}