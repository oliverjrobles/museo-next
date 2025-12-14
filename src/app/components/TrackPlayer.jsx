"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { HiVolumeUp } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { BsFillSkipBackwardFill } from "react-icons/bs";
import { BsFillSkipForwardFill } from "react-icons/bs";
import { IoIosPlay } from "react-icons/io";
import { FaPause } from "react-icons/fa6";

function fmt(t) {
  if (!Number.isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function TrackPlayer() {
  const [isHovered, setIsHovered] = useState(false);

  const slides = useMemo(
    () => [
      {
        id: 1,
        title: "YOU BELONG WITH ME 2",
        cover: "/assets/content-img/track2.jpg",
        audio: "/assets/media/black-box-funky.mp3",
        video: "/assets/media/video-crowd.mp4",
        thumbs: ["/assets/content-img/track2.jpg", "/assets/content-img/track1.jpg", "/assets/content-img/track5.jpg", "/assets/content-img/track4.jpg"],
        videoThumb: "/assets/content-img/track2.jpg",
      },
      {
        id: 2,
        title: "EUPHORIA",
        cover: "/assets/content-img/track4.jpg",
        audio: "/assets/media/euphoria.mp3",
        video: "/assets/media/video-dj-crowd1.mp4",
        thumbs: ["/assets/content-img/track4.jpg", "/assets/content-img/track1.jpg", "/assets/content-img/track4.jpg", "/assets/content-img/track2.jpg"],
        videoThumb: "/assets/content-img/track5.jpg",
      },
      {
        id: 3,
        title: "FASHION RED TAPE",
        cover: "/assets/content-img/track1.jpg",
        audio: "/assets/media/fashion-red-tape.mp3",
        video: "/assets/media/video-dj-crowd-2.mp4",
        thumbs: ["/assets/content-img/track1.jpg", "/assets/content-img/track2.jpg", "/assets/content-img/track4.jpg", "/assets/content-img/track5.jpg"],
        videoThumb: "/assets/content-img/track5.jpg",
      },
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const active = slides[activeIndex];

  // audio
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  // video overlay
  const [showVideo, setShowVideo] = useState(false);

  function prev() {
    setActiveIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  }

  function next() {
    setActiveIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
  }

  useEffect(() => {
    setShowVideo(false);

    const a = audioRef.current;
    if (!a) return;

    a.pause();
    a.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(false);
    a.volume = volume;
  }, [activeIndex]);

  // Audio events
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const onLoaded = () => setDuration(a.duration || 0);
    const onTime = () => setCurrentTime(a.currentTime || 0);
    const onEnded = () => setIsPlaying(false);

    a.addEventListener("loadedmetadata", onLoaded);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnded);

    return () => {
      a.removeEventListener("loadedmetadata", onLoaded);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnded);
    };
  }, [activeIndex]);

  function togglePlay() {
    const a = audioRef.current;
    if (!a) return;

    if (a.paused) {
      a.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      a.pause();
      setIsPlaying(false);
    }
  }

  function seek(e) {
    const a = audioRef.current;
    if (!a) return;

    const val = Number(e.target.value);
    a.currentTime = val;
    setCurrentTime(val);
  }

  function changeVolume(e) {
    const a = audioRef.current;
    const v = Number(e.target.value);
    setVolume(v);
    if (a) a.volume = v;
  }

  return (
    <section className="bg-black text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Titel */}
        <div className="text-center mb-10">
          <h2 className="text-3xl tracking-[0.25em] uppercase">Night club track</h2>
          <div className="mt-3 flex justify-center">
            <img src="/assets/bottom_line2.png" alt="underline graphic" className="h-6" />
          </div>
        </div>

        {/* RÆKKE 1 */}
        <div className="px-0 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 items-center text-center md:text-left">
            {/* Cover */}
            <div className="w-full max-w-40 mx-auto md:mx-0">
              <img src={active.cover} alt={active.title} className="w-full h-40 object-cover block" />
            </div>

            {/* Memo */}
            <div className="w-full">
              <p className="text-xs tracking-[0.25em] uppercase mb-4">{active.title}</p>

              <input type="range" min={0} max={duration || 0} value={currentTime} onChange={seek} className="w-full accent-pink-500" />

              <div className="mt-5 flex flex-col items-center gap-5 md:flex-row md:justify-between md:items-center md:gap-4 text-[0.7rem] text-white/80">
                <span className="whitespace-nowrap">
                  {fmt(currentTime)} / {fmt(duration)}
                </span>

                <div className="flex items-center gap-5 text-xl md:text-base">
                  {/* Back */}
                  <Button variant="ghost" size="icon" onClick={prev} aria-label="Previous track" className="text-white hover:text-black">
                    <BsFillSkipBackwardFill className="text-xl" />
                  </Button>

                  {/* Play / Pause */}
                  <Button variant="ghost" size="icon" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"} className="text-white">
                    {isPlaying ? <FaPause className="text-2xl md:text-xl" /> : <IoIosPlay className="text-3xl md:text-2xl" />}
                  </Button>

                  {/* Forward */}
                  <Button variant="ghost" size="icon" onClick={next} aria-label="Next track" className="text-white hover:text-black">
                    <BsFillSkipForwardFill className="text-xl" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <span aria-hidden>
                    <HiVolumeUp />
                  </span>
                  <input type="range" min={0} max={1} step={0.01} value={volume} onChange={changeVolume} className="w-40 md:w-28 accent-pink-500" aria-label="Volume" />
                </div>
              </div>

              <audio ref={audioRef} src={active.audio} preload="metadata" />
            </div>
          </div>
        </div>

        {/* RÆKKE 2 */}
        <div className="relative mt-10">
          <button type="button" onClick={prev} className="hidden md:grid absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 border border-white/40 hover:border-white transition place-items-center" aria-label="Previous">
            ‹
          </button>

          <div className="px-0 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              {/* thumb 1 */}
              <button type="button" onClick={() => setActiveIndex(0)} className="hidden md:block h-24 md:h-28 overflow-hidden">
                <img src={active.thumbs[0]} alt="" className="w-full h-full object-cover block" />
              </button>

              {/* thumb 2 */}
              <button type="button" onClick={() => setActiveIndex(1)} className="hidden md:block h-24 md:h-28 overflow-hidden">
                <img src={active.thumbs[1]} alt="" className="w-full h-full object-cover block" />
              </button>

              <div className="relative h-56 md:h-28 overflow-hidden" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <img src={active.videoThumb} alt="" className="w-full h-full object-cover" />

                {/* DESKTOP hover overlay */}
                <div className={`hidden md:flex absolute inset-0 flex-col items-center justify-center text-center px-6 transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`} style={{ backgroundColor: "rgba(0,0,0,0.92)" }}>
                  <div className="absolute top-0 left-0 w-10 h-10 bg-pink-500" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
                  <div className="absolute bottom-0 right-0 w-10 h-10 bg-pink-500" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />

                  <p className="text-xs tracking-[0.25em] uppercase mb-2">{active.title}</p>

                  {/* play-knap */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowVideo(true);
                    }}
                    className="w-12 h-12 flex items-center justify-center"
                    aria-label="Play video"
                  >
                    <img src="/assets/icon/Play_btn.svg" alt="Play video" className="w-12 h-12 object-contain transition-opacity duration-300 hover:scale-110 hover:opacity-90" />
                  </button>
                </div>

                {/* K mobil play-knap */}
                <button type="button" onClick={() => setShowVideo(true)} className="md:hidden absolute inset-0 z-10 grid place-items-center" aria-label="Play video">
                  <img src="/assets/icon/Play_btn.svg" alt="Play video" className="w-16 h-16 object-contain" />
                </button>
              </div>

              {/* thumb 4 */}
              <button type="button" onClick={() => setActiveIndex(2)} className="hidden md:block h-24 md:h-28 overflow-hidden">
                <img src={active.thumbs[2]} alt="" className="w-full h-full object-cover block" />
              </button>

              {/* thumb 5 */}
              <button type="button" onClick={() => setActiveIndex(0)} className="hidden md:block h-24 md:h-28 overflow-hidden">
                <img src={active.thumbs[3]} alt="" className="w-full h-full object-cover block" />
              </button>
            </div>

            <div className="mt-6 flex justify-center gap-4 md:hidden">
              <button type="button" onClick={prev} className="w-12 h-12 border border-white/40 hover:border-white transition grid place-items-center" aria-label="Previous">
                ‹
              </button>

              <button type="button" onClick={next} className="w-12 h-12 border border-white/40 hover:border-white transition grid place-items-center" aria-label="Next">
                ›
              </button>
            </div>
          </div>

          <button type="button" onClick={next} className="hidden md:grid absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 border border-white/40 hover:border-white transition place-items-center" aria-label="Next">
            ›
          </button>
        </div>

        {/* VIDEO OVERLAY */}
        {showVideo && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setShowVideo(false)}>
            <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={() => setShowVideo(false)} className="absolute -top-10 right-0 text-white/80 hover:text-white">
                ✕ Close
              </button>

              <video src={active.video} controls autoPlay className="w-full max-h-[80vh] object-contain bg-black" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
