"use client";

import { useState } from "react";

export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }

    setSubmitted(true);

    // ryd felter
    setName("");
    setEmail("");
    setComment("");
  }

  return (
    <section className="bg-black text-white py-10 px-3 flex justify-center">
      <div className="w-full max-w-4xl text-center">
        {/* OVERSKRIFT */}
        <h2 className="text-lg md:text-xl tracking-[0.25em] uppercase mb-10">Leave a comment</h2>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="
            grid gap-8
            md:grid-cols-3 
            md:items-start
          "
        >
          {/* NAME */}
          <div className="border border-white px-4 py-2">
            <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-transparent outline-none text-white placeholder-white text-sm tracking-wide" />
          </div>

          {/* EMAIL */}
          <div className="border border-white px-4 py-2">
            <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent outline-none text-white placeholder-white text-sm tracking-wide" />
          </div>

          {/* COMMENT */}
          <div className="border border-white px-4 py-3 md:col-span-3">
            <textarea placeholder="Your comment" value={comment} onChange={(e) => setComment(e.target.value)} rows={3} className="w-full bg-transparent outline-none text-white placeholder-white text-sm tracking-wide resize-none" />
          </div>
        </form>

        {/* SUBMIT KNAP*/}
        <div className="flex py-3 justify-end md:self-start">
          <button
            type="button"
            onClick={handleSubmit}
            className="
              border-t border-b border-white
              px-10 py-2
              text-[0.7rem] tracking-[0.4em] uppercase
              hover:bg-white hover:text-black
              transition
            "
          >
            Submit
          </button>
        </div>

        {/* TAK-BESKED */}
        {submitted && <p className="mt-10 text-sm text-pink-400 tracking-wide">Thank you for your comment!</p>}
      </div>
    </section>
  );
}
