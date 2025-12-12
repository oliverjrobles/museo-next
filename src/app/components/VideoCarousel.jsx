"use client";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";

const videos = [
  { id: 1, title: "Crowd 1", src: "/assets/media/video-crowd.mp4" },
  { id: 2, title: "DJ Crowd 2", src: "/assets/media/video-dj-crowd-2.mp4" },
  { id: 3, title: "DJ Crowd 1", src: "/assets/media/video-dj-crowd1.mp4" },
];

export default function VideoCarousel() {
  const [current, setCurrent] = useState(0);
  const currentVideo = videos[current];

  function prev() {
    setCurrent((i) => (i - 1 + videos.length) % videos.length);
  }
  function next() {
    setCurrent((i) => (i + 1) % videos.length);
  }

  return (
    <section className="bg-[#050505] text-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* headeren */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl tracking-[0.35em] uppercase">Latest Video</h2>

          {/* radiant underlinje */}
          <div className="relative w-full max-w-[300px] mx-auto mt-2">
            <Image src="/assets/bottom_line.png" alt="Section underline" width={600} height={40} className="mx-auto opacity-90" />
          </div>
        </div>

        {/* video wrapper */}
        <div className="mx-auto mb-8 max-w-5xl bg-black">
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            <video key={currentVideo.id} src={currentVideo.src} controls className="h-full w-full object-cover" />
          </div>
        </div>

        {/* navigations knapper */}
        <div className="flex justify-center gap-4">
          <button type="button" onClick={prev} className="flex h-10 w-10 items-center justify-center border border-white text-white text-sm hover:bg-pink-600 transition">
            <FaChevronLeft className="text-xs" />
          </button>

          <button type="button" onClick={next} className="flex h-10 w-10 items-center justify-center border border-white text-white text-sm hover:bg-pink-600 transition">
            <FaChevronRight className="text-xs" />
          </button>
        </div>

        {/* VIDEO TITLE */}
        <p className="mt-4 text-center text-sm text-gray-300">{currentVideo.title}</p>
      </div>
    </section>
  );
}
