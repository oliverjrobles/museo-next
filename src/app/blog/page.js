"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Hent blogposts fra API
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogposts`);

        if (!res.ok) {
          throw new Error("Kunne ikke hente blogposts");
        }

        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // Loading / fejl
  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Henter blogindlæg…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-black text-red-400 flex items-center justify-center">
        <p>Fejl: {error}</p>
      </main>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        {/* HERO */}
        <section className="relative h-40 md:h-56 bg-cover bg-center" style={{ backgroundImage: "url('/assets/bg/footerbg.jpg')" }}>
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
            <h1 className="text-2xl md:text-3xl tracking-[0.3em] uppercase">Blog</h1>
            <div className="mt-4 flex justify-center">
              <img src="/assets/bottom_line2.png" alt="underline graphic" className="h-6" />
            </div>
          </div>
        </section>

        {/* LISTE MED BLOGRÆKKER */}
        <section className="w-full px-0 py-12 space-y-10">
          {posts.slice(0, 3).map((post, index) => {
            const reverse = index === 1;

            return (
              <article key={post.id} className="grid md:grid-cols-2 bg-[#050005]">
                {/* BILLEDE */}
                <div className={"relative h-60 md:h-72 overflow-hidden" + (reverse ? " md:order-2" : "")}>{post.asset?.url && <img src={post.asset.url} alt={post.title} className="w-full h-full object-cover block" />}</div>

                {/* TEKST */}
                <div className={"p-6 md:p-8 flex flex-col justify-between" + (reverse ? " md:order-1" : "")}>
                  <header className="mb-4">
                    <h3 className="text-lg md:text-xl font-semibold mb-3">{post.title}</h3>
                    <h2 className="text-xs uppercase tracking-[0.25em] text-pink-400 mb-2">{post.author || "Admin"} / Night Club Blog</h2>
                  </header>

                  <p className="text-sm text-gray-200 leading-relaxed mb-6 line-clamp-5">{post.content}</p>

                  <div className="flex justify-end">
                    <Link href={`/blog/${post.id}`} className="border border-white px-6 py-2 text-[0.7rem] tracking-[0.25em] uppercase hover:bg-white hover:text-black transition-colors">
                      Read more
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* NEDERST */}
        <div className="pb-10 flex justify-center gap-6 text-[0.7rem] tracking-[0.35em] uppercase text-gray-400">
          <button className="text-white">1</button>
          <button className="hover:text-white">2</button>
          <button className="hover:text-white">3</button>
          <button className="hover:text-pink-400">næste &gt;</button>
        </div>
      </main>
    </>
  );
}
