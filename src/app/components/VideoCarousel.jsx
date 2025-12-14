"use client";

import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

const videos = [
  { id: 1, title: "Crowd 1", src: "/assets/media/video-crowd.mp4" },
  { id: 2, title: "DJ Crowd 2", src: "/assets/media/video-dj-crowd-2.mp4" },
  { id: 3, title: "DJ Crowd 1", src: "/assets/media/video-dj-crowd1.mp4" },
];

export default function VideoCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const video = videos[current];

  function handlePrev() {
    setCurrent((i) => {
      const nextIndex = (i - 1 + videos.length) % videos.length;
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      return nextIndex;
    });
  }

  function handleNext() {
    setCurrent((i) => {
      const nextIndex = (i + 1) % videos.length;
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      return nextIndex;
    });
  }

  function togglePlay() {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }

  function handleEnded() {
    setIsPlaying(false);
  }

  return (
    <section className="bg-[#050505] text-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* OVERSKRIFT + UNDERLINE */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl tracking-[0.35em] uppercase">Latest Video</h2>
          <div className="relative w-full max-w-[260px] mx-auto mt-3">
            <Image src="/assets/bottom_line.png" alt="Section underline" width={600} height={40} className="mx-auto opacity-90" />
          </div>
        </div>

        {/* VIDEO-KORT */}
        <Card className="bg-black/80 border-none shadow-xl max-w-5xl mx-auto">
          <CardContent className="p-0">
            <div className="relative">
              <AspectRatio ratio={16 / 9}>
                <video
                  key={video.id}
                  ref={videoRef}
                  src={video.src}
                  className="h-full w-full object-cover"
                  onEnded={handleEnded}
                  onClick={togglePlay} // klik på video toggler play/pause
                />
              </AspectRatio>

              {/* PLAY OVERLAY – KUN NÅR VIDEOEN IKKE SPILLER */}
              {!isPlaying && (
                <Button
                  type="button"
                  aria-label="Play Video"
                  variant="outline"
                  size="icon"
                  onClick={togglePlay}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                             w-20 h-20 rounded-full border-4 border-[#ff3e7f]
                             bg-black/60 hover:bg-black/80
                             flex items-center justify-center"
                >
                  <FaPlay className="w-8 h-8 text-[#ff3e7f] ml-1" />
                </Button>
              )}
            </div>
          </CardContent>

          {/* NAVIGATION KNAPPER */}
          <CardFooter className="flex justify-center gap-4 py-4">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="w-12 h-12 rounded-xl border-2 border-white bg-black/40
                         flex items-center justify-center hover:bg-[#ff3e7f] hover:border-[#ff3e7f] 
                         transition"
              aria-label="Previous video"
            >
              <FaChevronLeft className="h-5 w-5 text-white" />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="w-12 h-12 rounded-xl border-2 border-white bg-black/40
                         flex items-center justify-center hover:bg-[#ff3e7f] hover:border-[#ff3e7f] 
                         transition"
              aria-label="Next video"
            >
              <FaChevronRight className="h-5 w-5 text-white" />
            </Button>
          </CardFooter>
        </Card>

        {/* TITEL UNDER VIDEOEN */}
      </div>
    </section>
  );
}
