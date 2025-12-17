"use client";

import { useState } from "react";

const API_URL = "http://localhost:4000/reservations";

function dayKey(isoOrDateString) {
  return String(isoOrDateString || "").slice(0, 10); // "YYYY-MM-DD"
}

export default function BookingForm({ selectedTable }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    guests: "",
    date: "",
    contactNumber: "",
    comment: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [takenTablesForDate, setTakenTablesForDate] = useState(new Set());
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  async function fetchTakenTablesForDate(dateYYYYMMDD) {
    if (!dateYYYYMMDD) return new Set();

    const res = await fetch(API_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("Could not load reservations");
    const data = await res.json();

    return new Set(data.filter((r) => dayKey(r.date) === dateYYYYMMDD).map((r) => String(r.table)));
  }

  async function handleDateChange(e) {
    const value = e.target.value; // "YYYY-MM-DD"
    setForm((prev) => ({ ...prev, date: value }));
    setSubmitted(false);
    setSubmitError("");

    setLoadingAvailability(true);
    try {
      const taken = await fetchTakenTablesForDate(value);
      setTakenTablesForDate(taken);
    } catch (err) {
      console.error(err);
      // Hvis availability fejler, lad brugeren stadig prøve (server bør stoppe conflict)
      setTakenTablesForDate(new Set());
    } finally {
      setLoadingAvailability(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(false);
    setSubmitError("");
    setIsSubmitting(true);

    const guestsNumber = Number(form.guests);

    if (!selectedTable) {
      setSubmitError("Please select a table before reserving.");
      setIsSubmitting(false);
      return;
    }

    if (!Number.isFinite(guestsNumber) || guestsNumber < 1 || guestsNumber > 10) {
      setSubmitError("You can only book a table for 1–10 guests.");
      setIsSubmitting(false);
      return;
    }

    if (!form.date) {
      setSubmitError("Please pick a date.");
      setIsSubmitting(false);
      return;
    }

    try {
      // ✅ Re-check availability at submit-time (vigtigt!)
      const takenNow = await fetchTakenTablesForDate(form.date);
      setTakenTablesForDate(takenNow);

      if (takenNow.has(String(selectedTable))) {
        setSubmitError("That table is already reserved on that date. Please pick another table.");
        setIsSubmitting(false);
        return;
      }

      // ISO dato kl. 20:00
      const isoDate = `${form.date}T20:00:00.000Z`;

      const payload = {
        name: form.name,
        email: form.email,
        table: String(selectedTable),
        guests: String(guestsNumber),
        date: isoDate,
        phone: form.contactNumber,
        comment: form.comment,
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // Hvis du får 409 fra serveren (hvis du har lavet den regel), vis den pænt
        if (res.status === 409) {
          const data = await res.json().catch(() => ({}));
          setSubmitError(data.message || "That table is already reserved on that date.");
          setIsSubmitting(false);
          return;
        }

        const text = await res.text().catch(() => "");
        throw new Error(`API error ${res.status} ${text}`);
      }

      setSubmitted(true);

      setForm({
        name: "",
        email: "",
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

  const tableIsTaken = !!form.date && !!selectedTable && takenTablesForDate.has(String(selectedTable));

  return (
    <section className="bg-[#050505] py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="mb-8 text-2xl font-semibold tracking-[0.25em] text-white uppercase">Book a table</h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm text-white">
          {/* ROW 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required className="h-12 w-full border border-[#8c8c8c] bg-transparent px-4 outline-none" />

            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Your Email" required className="h-12 w-full border border-[#8c8c8c] bg-transparent px-4 outline-none" />
          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" value={selectedTable ?? ""} readOnly placeholder="Table Number" className="h-12 w-full border border-[#8c8c8c] bg-transparent px-4 outline-none opacity-80 cursor-not-allowed" />

            <input
              type="number"
              name="guests"
              value={form.guests}
              onChange={handleChange}
              placeholder="Number of Guests"
              required
              className="h-12 w-full border border-[#8c8c8c] bg-transparent px-4 outline-none
              [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          {/* ROW 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <input type="date" name="date" value={form.date} onChange={handleDateChange} required className="h-12 w-full border border-[#8c8c8c] bg-transparent px-4 outline-none" />

              {loadingAvailability && <p className="text-xs opacity-70">Checking available tables…</p>}

              {!loadingAvailability && tableIsTaken && <p className="text-xs text-red-400">That table is already booked on this date.</p>}
            </div>

            <input type="tel" name="contactNumber" value={form.contactNumber} onChange={handleChange} placeholder="Your Contact Number" required className="h-12 w-full border border-[#8c8c8c] bg-transparent px-4 outline-none" />
          </div>

          <textarea name="comment" value={form.comment} onChange={handleChange} placeholder="Your Comment" rows={6} className="w-full border border-[#8c8c8c] bg-transparent p-4 outline-none resize-none" />

          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || (loadingAvailability && !!form.date)}
              className="border border-gray-500 text-white px-10 py-2 tracking-[0.35em] uppercase
             hover:bg-pink-600 hover:border-pink-600 transition
             disabled:opacity-50"
            >
              {isSubmitting ? "SENDING..." : "RESERVE"}
            </button>
          </div>

          {submitError && <p className="text-red-400 text-sm text-center">{submitError}</p>}
          {submitted && <p className="text-pink-500 text-sm text-center">Your reservation has been sent!</p>}
        </form>
      </div>
    </section>
  );
}
