"use client";

import { useState } from "react";

export default function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    tableNumber: "",
    guests: "",
    date: "",
    contactNumber: "",
    comment: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // basic "real form" behaviour
    const reservation = {
      ...form,
      guests: Number(form.guests || 0),
    };

    console.log("Reservation submitted:", reservation);
    alert("Your table request has been sent! (check console for data)");

    // reset form
    setForm({
      name: "",
      email: "",
      tableNumber: "",
      guests: "",
      date: "",
      contactNumber: "",
      comment: "",
    });
  }

  return (
    <section className="bg-[#050505] py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="mb-8 text-2xl font-semibold tracking-[0.25em] text-white uppercase">Book a table</h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm text-white">
          {/* ROW 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required className="h-12 border border-[#8c8c8c] bg-transparent px-4 outline-none placeholder:text-[#b3b3b3]" />
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Your Email" required className="h-12 border border-[#8c8c8c] bg-transparent px-4 outline-none placeholder:text-[#b3b3b3]" />
          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="tableNumber" value={form.tableNumber} onChange={handleChange} placeholder="Table Number" required className="h-12 border border-[#8c8c8c] bg-transparent px-4 outline-none placeholder:text-[#b3b3b3]" />
            <input type="number" min="1" name="guests" value={form.guests} onChange={handleChange} placeholder="Number of Guests" required className="h-12 border border-[#8c8c8c] bg-transparent px-4 outline-none placeholder:text-[#b3b3b3] [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
          </div>

          {/* ROW 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input type="date" name="date" value={form.date} onChange={handleChange} required className="h-12 w-full border border-[#8c8c8c] bg-transparent px-4 pr-10 text-sm outline-none placeholder:text-[#b3b3b3]" />
              {/* lille “v” kan erstattes af rigtig ikon hvis du vil */}
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs">▼</span>
            </div>

            <input type="tel" name="contactNumber" value={form.contactNumber} onChange={handleChange} placeholder="Your Contact Number" required className="h-12 border border-[#8c8c8c] bg-transparent px-4 outline-none placeholder:text-[#b3b3b3]" />
          </div>

          {/* COMMENT */}
          <div>
            <textarea name="comment" value={form.comment} onChange={handleChange} placeholder="Your Comment" rows={6} className="w-full border border-[#8c8c8c] bg-transparent p-4 outline-none placeholder:text-[#b3b3b3] resize-none" />
          </div>

          {/* BUTTON */}
          <div className="mt-4 flex justify-end">
            <button type="submit" className="relative inline-flex items-center justify-center px-10 py-2 text-xs tracking-[0.35em] uppercase border border-white">
              Reserve
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
