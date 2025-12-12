"use client";
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    // hvis du vil resette:
    // setForm({ name: "", email: "", comment: "" });
  }

  return (
    <div className="w-full bg-black py-20 flex justify-center">
      {/* Ydre ramme som på mobil (lodrette linjer) */}
      <div className="w-full max-w-md  px-4 md:max-w-2xl md:border-none">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* NAME */}
          <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required className="w-full border border-gray-500 bg-transparent px-4 py-3 text-white outline-none" />

          {/* EMAIL */}
          <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required className="w-full border border-gray-500 bg-transparent px-4 py-3 text-white outline-none" />

          {/* COMMENT */}
          <textarea name="comment" placeholder="Your Comment" rows={7} value={form.comment} onChange={handleChange} required className="w-full border border-gray-500 bg-transparent px-4 py-3 text-white outline-none resize-none" />

          {/* SEND BUTTON – ligger under felterne som på mockup */}
          <div className="mt-4 flex justify-center">
            <button type="submit" className="border border-gray-500 text-white px-10 py-2 tracking-wide hover:bg-pink-600 hover:border-pink-600 transition">
              SEND
            </button>
          </div>
        </form>

        {/* SUCCESS MESSAGE */}
        {submitted && <p className="mt-6 text-pink-500 text-lg text-center">Thank you for contacting us!</p>}
      </div>
    </div>
  );
}
