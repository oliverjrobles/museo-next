"use client";

import { useEffect, useState, useRef, useMemo } from "react";
const LOREM_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const galleryRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // popup state (index så vi kan prev/next)
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Hent billeder fra API
  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery`);
        const data = await res.json();
        setPhotos(data);
      } catch (err) {
        console.error("Fejl med galleri API:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
  }, []);

  // Scroll-animation
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (galleryRef.current) observer.observe(galleryRef.current);

    return () => {
      if (galleryRef.current) observer.unobserve(galleryRef.current);
    };
  }, [loading]);

  const list = useMemo(() => photos.slice(0, 7), [photos]);

  if (loading) {
    return <p className="text-center text-white py-20">Henter galleri…</p>;
  }

  const openPopup = (index) => setSelectedIndex(index);
  const closePopup = () => setSelectedIndex(null);

  const prevPopup = () => setSelectedIndex((i) => (i === 0 ? list.length - 1 : i - 1));

  const nextPopup = () => setSelectedIndex((i) => (i === list.length - 1 ? 0 : i + 1));

  const selectedPhoto = selectedIndex !== null ? list[selectedIndex] : null;

  return (
    <section ref={galleryRef} className={`bg-black text-white py-16 px-0 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"}`}>
      {/* OVERSKRIFT */}
      <div className="text-center mb-10">
        <h2 className="text-3xl tracking-[0.25em] uppercase">Gallery</h2>
        <div className="mt-3 flex justify-center">
          <img src="/assets/bottom_line2.png" alt="underline graphic" className="h-6" />
        </div>
      </div>

      {/* GRID */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-0">
        {list.map((photo, index) => (
          <div key={photo.id} onClick={() => openPopup(index)} className={`relative overflow-hidden group cursor-pointer ${index <= 3 ? "lg:col-span-3" : "lg:col-span-4"}`}>
            <img src={photo.asset?.url} alt={photo.description || ""} className="w-full h-72 object-cover" />

            {/* hover overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* pink hjørner */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute top-0 left-0 w-16 h-16 bg-pink-500" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-pink-500" style={{ clipPath: "polygon(100% 100%, 0 100%, 100% 0)" }} />
            </div>
          </div>
        ))}
      </div>

      {/* POPUP */}

      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={closePopup}>
          <div className="relative w-full max-w-5xl bg-black shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* close */}
            <button type="button" className="absolute top-4 right-4 z-20 text-white/80 hover:text-white" onClick={closePopup} aria-label="Close">
              ✕
            </button>

            {/* arrows */}
            <button type="button" onClick={prevPopup} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 border border-white/40 hover:border-white transition grid place-items-center" aria-label="Previous">
              ‹
            </button>

            <button type="button" onClick={nextPopup} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 border border-white/40 hover:border-white transition grid place-items-center" aria-label="Next">
              ›
            </button>

            {/* IMAGE */}
            <img src={selectedPhoto.asset?.url} alt={selectedPhoto.description || ""} className="w-full max-h-[70vh] object-contain bg-black" />

            {/* TEXT UNDER IMAGE */}
            <div className="bg-black px-6 py-6">
              <p className="text-xs tracking-[0.25em] uppercase mb-2">{selectedPhoto.title || "GALLERY"}</p>

              {/* lorem fallback */}
              <p className="text-sm text-white/80 mb-6">{String(selectedPhoto.description ?? "").trim() ? String(selectedPhoto.description) : LOREM_TEXT}</p>

              {/* READ MORE */}
              <div className="flex justify-end">
                <button type="button" className="text-xs tracking-[0.25em] uppercase text-white/80 hover:text-white transition">
                  <div className="flex flex-col items-end">
                    <div className="w-full h-px bg-white/40 mb-2" />
                    <span className="pb-1 border-b border-white/40">READ MORE</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
