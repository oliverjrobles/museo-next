"use client";

import { useState } from "react";

const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/newsletters`;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // 🟡 Frontend-validering
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(err.message || "Server error");
    }
  }

  return (
    <section className="bg-black text-white py-24 px-6 flex justify-center">
      <div className="w-full max-w-4xl text-center">
        <h2 className="text-lg md:text-xl tracking-[0.25em] uppercase mb-4">Want the latest night club news</h2>

        <p className="text-sm md:text-base text-gray-300 mb-12">
          Subscribe to our newsletter and never miss an <span className="text-pink-500">Event</span>
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="w-full md:w-[380px] border-b border-white pb-2">
            <input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent outline-none text-white placeholder-white text-sm tracking-wide" />
          </div>

          <button type="submit" className="border-t border-b border-white px-10 py-2 text-[0.7rem] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition">
            Subscribe
          </button>
        </form>

        {/* FEJL */}
        {error && <p className="mt-6 text-sm text-red-400 tracking-wide">{error}</p>}

        {/* SUCCESS */}
        {success && <p className="mt-6 text-sm text-pink-400 tracking-wide">Thank you for subscribing!</p>}
      </div>
    </section>
  );
}
