"use client";
import { useState } from "react";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email.");

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(false);
    setSubmitError("");
    setIsSubmitting(true);

    const name = form.name.trim();
    const email = form.email.trim();
    const comment = form.comment.trim();

    if (!name) {
      setSubmitError("Please enter your name.");
      setIsSubmitting(false);
      return;
    }

    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      setSubmitError(emailResult.error.issues[0]?.message ?? "Invalid email.");
      setIsSubmitting(false);
      return;
    }

    if (!comment) {
      setSubmitError("Please write a comment.");
      setIsSubmitting(false);
      return;
    }

    try {
      // ✅ SEND TIL API
      const payload = {
        name,
        email,
        message: comment,
        date: new Date().toISOString(),
      };

      const res = await fetch("http://localhost:4000/contact_messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`API error ${res.status} ${text}`);
      }

      setSubmitted(true);
      setForm({ name: "", email: "", comment: "" });
    } catch (err) {
      console.error(err);
      setSubmitError("Something went wrong — message not sent.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full bg-black py-20 flex justify-center">
      <div className="w-full max-w-md px-4 md:max-w-2xl md:border-none">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required className="w-full border border-gray-500 bg-transparent px-4 py-3 text-white outline-none" />

          <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required className="w-full border border-gray-500 bg-transparent px-4 py-3 text-white outline-none" />

          <textarea name="comment" placeholder="Your Comment" rows={7} value={form.comment} onChange={handleChange} required className="w-full border border-gray-500 bg-transparent px-4 py-3 text-white outline-none resize-none" />

          <div className="mt-4 flex justify-center">
            <button type="submit" disabled={isSubmitting} className="border border-gray-500 text-white px-10 py-2 tracking-wide hover:bg-pink-600 hover:border-pink-600 transition disabled:opacity-50">
              {isSubmitting ? "SENDING..." : "SEND"}
            </button>
          </div>

          {submitError && <p className="text-red-400 text-sm text-center">{submitError}</p>}
        </form>

        {submitted && <p className="mt-6 text-pink-500 text-lg text-center">Thank you for contacting us!</p>}
      </div>
    </div>
  );
}
