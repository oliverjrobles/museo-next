"use client";

import React, { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaSnapchatGhost } from "react-icons/fa";

// Fallback-billeder fra API-serveren
const FALLBACK_TESTIMONIAL_IMAGES = ["testimonial_1.jpg", "testimonial_2.jpg", "testimonial_3.jpg"];

export default function TestimonialsCarousel() {
  const [items, setItems] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials`);
        const data = await res.json();

        const mapped = data.map((item, i) => {
          let imagePath = item.imageUrl || item.image || item.photo || item.avatar || item.img || item.picture;

          if (!imagePath) {
            imagePath = FALLBACK_TESTIMONIAL_IMAGES[i % FALLBACK_TESTIMONIAL_IMAGES.length];
          }

          let imageUrl = null;
          if (typeof imagePath === "string" && imagePath.startsWith("http")) {
            imageUrl = imagePath;
          } else {
            if (!imagePath.startsWith("/")) imagePath = `/file-bucket/${imagePath}`;
            imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${imagePath}`;
          }

          const name = item.name || item.fullName || item.author || item.title || "John Doe";
          const text = item.text || item.description || item.content || item.quote || item.message || "";

          return { id: item.id ?? i, name, text, imageUrl };
        });

        setItems(mapped);
      } catch (err) {
        console.error("Fejl ved hentning af testimonials", err);
        setItems([]);
      }
    }

    fetchTestimonials();
  }, []);

  if (items.length === 0) {
    return (
      <section className="py-16 md:py-20 text-white text-center bg-cover bg-center relative" style={{ backgroundImage: "url('/assets/bg/footerbg.jpg')" }}>
        <div className="absolute inset-0 bg-black/90" />
        <p className="relative z-10 opacity-80 text-sm md:text-base">Ingen testimonials tilgængelige.</p>
      </section>
    );
  }

  const active = items[current];

  return (
    <section className="py-16 md:py-20 text-white bg-cover bg-center relative" style={{ backgroundImage: "url('/assets/bg/footerbg.jpg')" }}>
      <div className="absolute inset-0 bg-black/90" />

      <div className="relative z-10 max-w-md md:max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* BILLEDE */}
        {active.imageUrl && (
          <div className="mb-6 md:mb-8 flex justify-center">
            <img src={active.imageUrl} alt={active.name} className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover rounded-sm shadow-lg" />
          </div>
        )}

        {/* NAVN */}
        <h3 className="tracking-[0.4em] text-[11px] sm:text-xs md:text-sm uppercase mb-4 md:mb-6">{active.name}</h3>

        {/* TEKST */}
        <p className="text-xs sm:text-sm md:text-base leading-relaxed opacity-90 max-w-md md:max-w-3xl mx-auto">{active.text}</p>

        {/* ----- SOCIAL IKONER ----- */}
        <div className="mt-6 md:mt-8 flex justify-center gap-3 md:gap-4">
          <button className="w-9 h-9 md:w-10 md:h-10 border border-white/80 flex items-center justify-center text-lg hover:bg-[#ff3e7f] hover:border-[#ff3e7f] transition-colors">
            <FaFacebookF />
          </button>

          <button className="w-9 h-9 md:w-10 md:h-10 border border-white/80 flex items-center justify-center text-lg hover:bg-[#ff3e7f] hover:border-[#ff3e7f] transition-colors">
            <FaTwitter />
          </button>

          <button className="w-9 h-9 md:w-10 md:h-10 border border-white/80 flex items-center justify-center text-lg hover:bg-[#ff3e7f] hover:border-[#ff3e7f] transition-colors">
            <FaSnapchatGhost />
          </button>
        </div>

        {/* DOTS */}
        <div className="mt-6 md:mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <button key={index} onClick={() => setCurrent(index)} aria-label={`Gå til testimonial ${index + 1}`} className={`w-3 h-3 md:w-4 md:h-4 rounded-[3px] border-2 border-[#ff3e7f] transition-colors ${index === current ? "bg-[#ff3e7f]" : "bg-white hover:bg-[#ff3e7f]"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
