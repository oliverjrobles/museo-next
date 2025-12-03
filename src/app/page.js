"use client";

import { useEffect, useState } from "react";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("da-DK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`);

        if (!res.ok) {
          throw new Error("API-fejl: " + res.status);
        }

        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Henter events…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-black text-red-400 flex items-center justify-center">
        <p>Fejl: {error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-8 py-16">
      <h1 className="text-4xl font-bold mb-8 tracking-wide">Upcoming Events</h1>

      <div className="grid gap-8 md:grid-cols-3">
        {events.map((event) => (
          <article key={event.id} className="border border-pink-500/60 rounded-xl overflow-hidden bg-zinc-900/70 shadow-lg flex flex-col">
            <div className="h-40 overflow-hidden">
              <img src={event.asset?.url} alt={event.title} className="w-full h-full object-cover" />
            </div>

            <div className="p-4 flex flex-col gap-3 flex-1">
              <div className="flex items-center justify-between text-xs uppercase tracking-wide text-pink-400">
                <span>{formatDate(event.date)}</span>
                <span>{event.location}</span>
              </div>

              <h2 className="text-xl font-semibold">{event.title}</h2>

              <p className="text-sm text-gray-300 line-clamp-3">{event.description}</p>

              <button className="mt-2 self-start text-sm font-medium text-pink-400 hover:text-pink-300">Read more →</button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
