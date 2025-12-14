"use client";

import { useState } from "react";

export default function Newsletter() {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!value.trim()) return;

    setSubmitted(true);
    setValue("");
  }

  return (
    <section className="bg-black text-white py-24 px-6 flex justify-center">
      <div className="w-full max-w-4xl text-center">
        {/* OVERSKRIFT */}
        <h2 className="text-lg md:text-xl tracking-[0.25em] uppercase mb-4">Want the latest night club news</h2>

        <p className="text-sm md:text-base text-gray-300 mb-12">
          Subscribe to our newsletter and never miss an <span className="text-pink-500"> Event</span>
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="w-full md:w-[380px] border-b border-white pb-2">
            <input type="text" placeholder="Enter Your Email" value={value} onChange={(e) => setValue(e.target.value)} className="w-full bg-transparent outline-none text-white placeholder-white text-sm tracking-wide" />
          </div>

          {/* knap */}
          <button type="submit" className="border-t border-b border-white px-10 py-2 text-[0.7rem] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition">
            Subscribe
          </button>
        </form>

        {/* TAK-BESKED */}
        {submitted && <p className="mt-6 text-sm text-pink-400 tracking-wide">Thank you for subscribing!</p>}
      </div>
    </section>
  );
}
