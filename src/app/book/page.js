"use client";
import { useState } from "react";

import Navbar from "../components/Navbar";
import BookTableHero from "./BookTableHero";
import Tables from "./Tables";
import BookingForm from "./BookingForm";

const API_URL = "http://localhost:4000/reservations";
const dayKey = (isoOrDateString) => String(isoOrDateString || "").slice(0, 10);

export default function BookPage() {
  const [selectedTable, setSelectedTable] = useState(null);

  // ✅ shared availability state
  const [takenTablesForDate, setTakenTablesForDate] = useState(new Set());
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  // ✅ event-based fetch (no useEffect)
  async function checkAvailability(dateYYYYMMDD) {
    if (!dateYYYYMMDD) {
      setTakenTablesForDate(new Set());
      return new Set();
    }

    setLoadingAvailability(true);
    try {
      const res = await fetch(API_URL, { cache: "no-store" });
      if (!res.ok) throw new Error("Could not load reservations");
      const data = await res.json();

      const taken = new Set(data.filter((r) => dayKey(r.date) === dateYYYYMMDD).map((r) => String(r.table)));

      setTakenTablesForDate(taken);
      return taken;
    } catch (err) {
      console.error(err);
      setTakenTablesForDate(new Set());
      return new Set();
    } finally {
      setLoadingAvailability(false);
    }
  }

  return (
    <>
      <Navbar />
      <BookTableHero />

      <Tables selectedTable={selectedTable} onSelectTable={setSelectedTable} takenTablesForDate={takenTablesForDate} loadingAvailability={loadingAvailability} />

      <BookingForm selectedTable={selectedTable} checkAvailability={checkAvailability} takenTablesForDate={takenTablesForDate} loadingAvailability={loadingAvailability} />
    </>
  );
}
