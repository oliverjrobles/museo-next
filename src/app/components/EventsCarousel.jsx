"use client";

import React, { useEffect, useState } from "react";

const DESKTOP_ITEMS_PER_SLIDE = 2;

const FALLBACK_EVENT_IMAGES = ["event-thumb1.jpg", "event-thumb2.jpg", "event-thumb3.jpg", "event-thumb4.jpg", "event-thumb5.jpg", "event-thumb6.jpg"];

export default function EventsCarousel() {
  const [events, setEvents] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(1);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`);
        const data = await res.json();

        const mapped = data.map((item, i) => {
          // ---------- BILLEDE ----------
          let imagePath = item.imageUrl || item.image || item.img;

          if (!imagePath) {
            imagePath = FALLBACK_EVENT_IMAGES[i % FALLBACK_EVENT_IMAGES.length];
          }

          let imageUrl;
          if (typeof imagePath === "string" && imagePath.startsWith("http")) {
            imageUrl = imagePath;
          } else {
            if (!imagePath.startsWith("/")) {
              imagePath = `/file-bucket/${imagePath}`;
            }
            imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${imagePath}`;
          }

          // ---------- DATO + TID ----------
          const rawDateTime = item.date || item.datetime || item.startDate || item.start;

          let displayDate = "";
          let displayTime = "";

          if (rawDateTime) {
            const d = new Date(rawDateTime);
            if (!isNaN(d.getTime())) {
              displayDate = d.toLocaleDateString("da-DK", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              });
              displayTime = d.toLocaleTimeString("da-DK", {
                hour: "2-digit",
                minute: "2-digit",
              });
            } else {
              displayDate = String(rawDateTime);
            }
          }

          return {
            id: item.id ?? i,
            title: item.title,
            description: item.description,
            location: item.location || item.venue || "",
            date: displayDate,
            time: displayTime,
            imageUrl,
          };
        });

        setEvents(mapped);
      } catch (err) {
        console.error("Kunne ikke hente events fra API", err);
        setEvents([]); // ingenting når API'et er nede
      }
    }

    fetchEvents();
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setItemsPerSlide(1);
      } else {
        setItemsPerSlide(DESKTOP_ITEMS_PER_SLIDE);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slides = [];
  for (let i = 0; i < events.length; i += itemsPerSlide) {
    slides.push(events.slice(i, i + itemsPerSlide));
  }

  if (events.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-[#3a002b] via-[#120012] to-[#050007] text-white text-center">
        <h2 className="text-3xl md:text-4xl tracking-[0.2em] mb-6 uppercase">Events of the Month</h2>
        <p className="opacity-80">Loading events...</p>
      </section>
    );
  }

  const safeCurrentSlide = Math.min(currentSlide, slides.length - 1);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-[#000000] via-[#120012] to-[#050007] text-white">
      <div className="text-center mb-8 md:mb-10">
        <h2 className="text-2xl md:text-4xl tracking-[0.25em] uppercase">EVENTS OF THE MONTH</h2>
        <img src="/assets/bottom_line2.png" alt="underline" className="mx-auto mt-2 h-[6px] w-auto max-w-[220px] opacity-90 object-contain" />
      </div>

      <div className="mx-auto w-[92%] max-w-5xl overflow-hidden rounded-md">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${safeCurrentSlide * 100}%)` }}>
          {slides.map((slideEvents, slideIndex) => (
            <div key={slideIndex} className="min-w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 p-2">
              {slideEvents.map((event) => (
                <article key={event.id} className="relative overflow-hidden rounded group cursor-pointer">
                  <img src={event.imageUrl} alt={event.title} className="w-full h-72 md:h-80 object-cover transform transition-transform duration-300 group-hover:scale-105" />

                  {/* PINK BOTTOM BAR */}
                  <div className="absolute inset-x-0 bottom-0 z-20 bg-[#ff3e7f] text-white flex flex-wrap gap-4 px-4 py-2 text-xs md:text-sm font-semibold">
                    {event.date && <span>{event.date}</span>}
                    {event.time && <span>{event.time}</span>}
                    {event.location && <span className="truncate">{event.location}</span>}
                  </div>

                  {/* HOVER OVERLAY (uændret) */}
                  <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-black/40 to-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-0 left-0 w-0 h-0 border-t-[70px] border-r-[70px] border-t-[#ff3e7f] border-r-transparent" />
                    <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[70px] border-l-[70px] border-b-[#ff3e7f] border-l-transparent" />

                    <div className="absolute inset-x-0 top-10 flex justify-center z-20">
                      <button className="px-6 py-2 rounded bg-[#ff3e7f] text-xs md:text-sm font-semibold">Book Now</button>
                    </div>

                    <div className="absolute inset-x-0 bottom-[48px] z-10 px-6">
                      <div className="translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                        <div className="bg-black/85 px-4 py-4 max-h-32 overflow-hidden">
                          <h3 className="text-lg md:text-xl font-semibold mb-2">{event.title}</h3>
                          <p className="text-xs md:text-sm leading-relaxed opacity-90">{event.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button key={index} onClick={() => setCurrentSlide(index)} aria-label={`Gå til slide ${index + 1}`} className={`w-4 h-4 rounded-[3px] border-2 border-[#ff3e7f] transition-colors ${index === safeCurrentSlide ? "bg-[#ff3e7f]" : "bg-white hover:bg-[#ff3e7f]"}`} />
        ))}
      </div>
    </section>
  );
}
