"use client";

import { useState } from "react";

const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/comments`;

export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // validering
    if (!name.trim() || !email.trim() || !comment.trim()) {
      setError("All fields are required");
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
        body: JSON.stringify({
          name,
          email,
          comment,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setComment("");
    } catch (err) {
      setError(err.message || "Server error");
    }
  }

  return (
    <section className="bg-black text-white py-10 px-3 flex justify-center">
      <div className="w-full max-w-4xl text-center">
        {/* OVERSKRIFT */}
        <h2 className="text-lg md:text-xl tracking-[0.25em] uppercase mb-10">Leave a comment</h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid gap-8 md:grid-cols-3 md:items-start">
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

          {/* SUBMIT */}
          <div className="md:col-span-3 flex justify-end">
            <button type="submit" className="border-t border-b border-white px-10 py-2 text-[0.7rem] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition">
              Submit
            </button>
          </div>
        </form>

        {/* FEJL */}
        {error && <p className="mt-8 text-sm text-red-400 tracking-wide">{error}</p>}

        {/* SUCCESS */}
        {success && <p className="mt-8 text-sm text-pink-400 tracking-wide">Thank you for your comment!</p>}
      </div>
    </section>
  );
}
