"use client";

import { useEffect, useState, useRef } from "react";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const galleryRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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

  //  Scroll-animation – starter først når loading er færdig
  useEffect(() => {
    if (loading) return; // vent til vi har data

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("Gallery er synlig, starter animation ✨");
          setIsVisible(true);
          observer.unobserve(entry.target); // kun én gang
        }
      },
      {
        threshold: 0.5, // sektionen skal være synlig
        rootMargin: "0px 0px", // kan justeres hvis det ikke trigger
      }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current);
      }
    };
  }, [loading]);

  // Loading-state
  if (loading) {
    return <p className="text-center text-white py-20">Henter galleri…</p>;
  }

  // Selve galleriet med animation på <section>
  return (
    <section ref={galleryRef} className={`bg-black text-white py-16 px-0 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"}`}>
      {/* OVERSKRIFT */}
      <div className="text-center mb-10">
        <h2 className="text-3xl tracking-[0.25em] uppercase">Gallery</h2>
        <div className="mt-3 flex justify-center">
          <img src="/assets/bottom_line2.png" alt="underline graphic" className="h-6" />
        </div>
      </div>

      {/* GRID – 4 øverst / 3 nederst */}
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-0">
        {photos.slice(0, 7).map((photo, index) => (
          <div key={photo.id} className={`relative overflow-hidden group ${index <= 3 ? "lg:col-span-3" : "lg:col-span-4"}`}>
            {/* Billede */}
            <img src={photo.asset.url} alt={photo.description} className="w-full h-72 object-cover" />

            {/* Mørkt hover overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Pink hjørner */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div
                className="absolute top-0 left-0 w-16 h-16 bg-pink-500"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 0 100%)",
                }}
              />
              <div
                className="absolute bottom-0 right-0 w-16 h-16 bg-pink-500"
                style={{
                  clipPath: "polygon(100% 100%, 0 100%, 100% 0)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
