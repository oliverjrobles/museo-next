"use client";

import { useEffect, useState } from "react";

export default function BookingForm({ selectedTable }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    tableNumber: "",
    guests: "",
    date: "",
    contactNumber: "",
    comment: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Når brugeren klikker på et bord, skriv bordnummeret ind i formen
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      tableNumber: selectedTable ? String(selectedTable) : "",
    }));
  }, [selectedTable]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(false);
    setSubmitError("");
    setIsSubmitting(true);

    try {
      // Hvis date-input er "YYYY-MM-DD", så laver vi en ISO dato kl. 20:00
      const isoDate = form.date ? `${form.date}T20:00:00.000Z` : "";

      // Payload matcher jeres API docs (POST /reservations)
      const payload = {
        name: form.name,
        email: form.email,
        table: String(form.tableNumber),
        guests: String(form.guests),
        date: isoDate,
        phone: form.contactNumber,
        comment: form.comment,
      };

      const res = await fetch("http://localhost:4000/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`API error ${res.status} ${text}`);
      }

      const created = await res.json().catch(() => null);
      console.log("Reservation created:", created);

      setSubmitted(true);

      // reset form fields (tableNumber bliver sat igen via selectedTable/useEffect)
      setForm({
        name: "",
        email: "",
        tableNumber: "",
        guests: "",
        date: "",
        contactNumber: "",
        comment: "",
      });
    } catch (err) {
      console.error(err);
      setSubmitError("Noget gik galt — kunne ikke sende reservationen.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="bg-[#050505] py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="mb-8 text-2xl font-semibold tracking-[0.25em] text-white uppercase">Book a table</h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm text-white">
          {/* ROW 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Your Name
              </label>
              <input id="name" type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required className="h-12 w-full border border-[#8c8c8c] bg-transparent px-4 outline-none placeholder:text-[#b3b3b3]" />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Your Email
              </label>
              <input id="email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="Your Email" required className="h-12 w-full border border-[#8c8c8c] bg-transparent px-4 outline-none placeholder:text-[#b3b3b3]" />
            </div>
          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="tableNumber" className="sr-only">
                Table Number
              </label>
              <input id="tableNumber" type="text" name="tableNumber" value={form.tableNumber} onChange={handleChange} placeholder="Table Number" required readOnly className="h-12 w-full border border-[#8c8c8c] bg-transparent px-4 outline-none placeholder:text-[#b3b3b3] cursor-not-allowed opacity-80" />
            </div>

            <div>
              <label htmlFor="guests" className="sr-only">
                Number of Guests
              </label>
              <input
                id="guests"
                type="number"
                name="guests"
                min="1"
                value={form.guests}
                onChange={handleChange}
                placeholder="Number of Guests"
                required
                className="h-12 w-full border border-[#8c8c8c] bg-transparent px-4 outline-none placeholder:text-[#b3b3b3]
                [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>

          {/* ROW 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="sr-only">
                Date of Reservation
              </label>
              <input id="date" type="date" name="date" value={form.date} onChange={handleChange} required className="h-12 w-full border border-[#8c8c8c] bg-transparent px-4 outline-none placeholder:text-[#b3b3b3]" />
            </div>

            <div>
              <label htmlFor="contactNumber" className="sr-only">
                Your Contact Number
              </label>
              <input id="contactNumber" type="tel" name="contactNumber" value={form.contactNumber} onChange={handleChange} placeholder="Your Contact Number" required className="h-12 w-full border border-[#8c8c8c] bg-transparent px-4 outline-none placeholder:text-[#b3b3b3]" />
            </div>
          </div>

          <div>
            <label htmlFor="comment" className="sr-only">
              Your Comment
            </label>
            <textarea id="comment" name="comment" value={form.comment} onChange={handleChange} placeholder="Your Comment" rows={6} className="w-full border border-[#8c8c8c] bg-transparent p-4 outline-none placeholder:text-[#b3b3b3] resize-none" />
          </div>

          <div className="mt-4 flex justify-end">
            <button type="submit" disabled={isSubmitting} className="relative inline-flex items-center justify-center px-10 py-2 text-xs tracking-[0.35em] uppercase border border-white disabled:opacity-50">
              {isSubmitting ? "Sending..." : "Reserve"}
            </button>
          </div>

          {submitError && (
            <div className="mt-4 flex justify-center">
              <p className="text-red-400 text-sm text-center">{submitError}</p>
            </div>
          )}

          {submitted && (
            <div className="mt-4 flex justify-center">
              <p className="text-pink-500 text-sm text-center">Your reservation has been sent!</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
