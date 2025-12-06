"use client";

import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Section1 from "./components/Section1";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <Navbar />
      <Section1 />
    </main>
  );
}
