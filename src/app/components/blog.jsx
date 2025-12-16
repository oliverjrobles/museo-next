"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BlogSection() {
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

  // Loading / fejl-tekster
  if (loading) {
    return (
      <section id="blog" className="bg-black text-white py-16 text-center">
        <p>Henter blogindlæg…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blog" className="bg-black text-red-400 py-16 text-center">
        <p>Fejl: {error}</p>
      </section>
    );
  }

  return (
    <section id="blog" className="bg-black text-white py-16 px-6">
      {/* Overskrift */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl tracking-[0.25em] uppercase">Recent blog</h2>
        <div className="mt-3 flex justify-center">
          <img src="/assets/bottom_line2.png" alt="underline graphic" className="h-6" />
        </div>
      </div>

      {/* 3 seneste posts i grid */}
      <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`} className="group block">
            <article
              className=" bg-[#050005] flex flex-col transition-colors duration-300 group-hover:-translate-y-1
                group-hover:border-pink-500"
            >
              {/* Billede */}
              {post.asset?.url && (
                <div className="h-40 overflow-hidden">
                  <img src={post.asset.url} alt={post.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
              )}

              {/* Tekst */}
              <div className="p-4 flex flex-col gap-3 flex-1">
                <p className="text-[0.65rem] uppercase tracking-[0.25em] text-pink-400">{post.author || "Admin"}</p>

                <h3 className="text-base md:text-lg font-semibold">{post.title}</h3>

                <p className="text-xs md:text-sm text-gray-300 line-clamp-4">{post.content.slice(0, 100)}…</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
