"use client";

import { useState } from "react";

export default function Section1() {
  // Liste (array) af billeder
  const items = [
    {
      image: "/assets/content-img/thumb1.jpg",
      title: "Night Club",
      text: "Try exclusive cocktails crafted by our mixology masters.",
      icon: "/assets/icon/favicon.png",
    },
    {
      image: "/assets/content-img/reastaurant_1.jpg",
      title: "Restaurant",
      text: "Enjoy delicious cuisine in an elegant modern setting.",
      icon: "",
    },
    {
      image: "/assets/content-img/thumb2.jpg",
      title: "Bar",
      text: "Relax in luxury with bottle service and private seating.",
      icon: "",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="bg-black text-white py-16">
      {/* Overskrift */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-1xl tracking-[0.3em] uppercase">Welcome in Nightclub</h2>

        {/* Pink linje + grafik */}
        <div className="mt-4 flex flex-col items-center justify-center gap-2">
          <img src="/assets/bottom_line2.png" alt="underline graphic" className="h-6" />
        </div>
      </div>

      {/* Grid med billeder */}
      <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3 px-4">
        {items.map((item, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <div key={index} className="relative h-80 overflow-hidden rounded-sm cursor-pointer" onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
              {/* Billedet */}
              <img src={item.image} alt={item.title} className={`w-full h-full object-cover transition-opacity duration-500 ${isHovered ? "opacity-0" : "opacity-100"}`} />

              {/* Hover-kortet */}
              <div className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`} style={{ backgroundColor: "rgba(0,0,0,0.92)" }}>
                {/* Pink hjørner */}
                <div className="absolute top-0 left-0 w-16 h-16 bg-pink-500" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-pink-500" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />

                {/* Ikon-boks (smart emoji + image detection) */}
                <div className="mb-6 flex items-center justify-center">
                  <div className="w-20 h-20 border-2 border-pink-500 flex items-center justify-center rounded-sm">{item.icon.startsWith("/") ? <img src={item.icon} alt={`${item.title} icon`} className="w-12 h-12 object-contain" /> : <span className="text-pink-500 text-3xl">{item.icon}</span>}</div>
                </div>

                {/* Titel */}
                <h3 className="text-xl font-semibold tracking-[0.2em] uppercase mb-4">{item.title}</h3>

                {/* Brødtekst */}
                <p className="text-sm text-gray-200 leading-relaxed">{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
