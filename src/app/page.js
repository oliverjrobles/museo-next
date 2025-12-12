"use client";

import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Section1 from "./components/Section1";
import Gallery from "./components/Gallery";
import EventsCarousel from "./components/EventsCarousel";
import TestimonialCarousel from "./components/TestimonialCarousel";
import BlogSection from "./components/Blog";
import Newsletter from "./components/Newsletter";
import TrackPlayer from "./components/TrackPlayer";
import VideoCarousel from "./components/VideoCarousel";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <Navbar />
      <Section1 />
      <EventsCarousel />
      <Gallery />
      <TrackPlayer />
      <VideoCarousel />
      <TestimonialCarousel />
      <BlogSection />
      <Newsletter />
    </main>
  );
}
