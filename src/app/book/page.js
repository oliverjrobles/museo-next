"use client";
import { useState } from "react";

import Navbar from "../components/Navbar";
import BookTableHero from "./BookTableHero";
import Tables from "./Tables";
import BookingForm from "./BookingForm";

export default function BookPage() {
  const [selectedTable, setSelectedTable] = useState(null);

  return (
    <>
      <Navbar />
      <BookTableHero />
      <Tables selectedTable={selectedTable} onSelectTable={setSelectedTable} />
      <BookingForm selectedTable={selectedTable} />
    </>
  );
}
