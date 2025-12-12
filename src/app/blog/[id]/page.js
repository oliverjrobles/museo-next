"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Form from "../../components/Form";

export default function BlogDetailPage() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);

  // Hent selve blogpost
  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogposts/${id}`);

        if (!res.ok) {
          throw new Error("Kunne ikke hente blogindlæg");
        }

        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchPost();
  }, [id]);

  // Hent comments til denne blogpost
  useEffect(() => {
    if (!id) return;

    async function fetchComments() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments?blogpostId=${id}`);
        const data = await res.json();

        setComments([...data, ...data, ...data]);
      } catch (err) {
        console.error("Fejl med comments:", err);
      }
    }

    fetchComments();
  }, [id]);

  // Loading
  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-black text-white flex items-center justify-center">
          <p>Henter blogindlæg…</p>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-black text-red-400 flex items-center justify-center">
          <p>Fejl: {error}</p>
        </main>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-black text-white flex items-center justify-center">
          <p>Ingen blogpost fundet.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white">
        {/* HERO –*/}
        <section className="relative h-40 md:h-56 bg-cover bg-center" style={{ backgroundImage: "url('/assets/bg/footerbg.jpg')" }}>
          <div className="absolute inset-0 bg-black/90" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-sm md:text-3xl tracking-[0.3em] uppercase">Blog Post</h1>

            <div className="mt-3 flex justify-center">
              <img src="/assets/bottom_line2.png" alt="underline" className="h-6" />
            </div>
          </div>
        </section>

        {/* BLOGPOSTEN */}
        <article className="max-w-4xl mx-auto px-4 md:px-0 py-12">
          {/* Billede øverst */}
          {post.asset?.url && (
            <div className="mb-8 overflow-hidden">
              <img src={post.asset.url} alt={post.title} className="w-full max-h-[420px] object-cover block" />
            </div>
          )}

          {/* Sort boks med tekst */}
          <div className="bg-[#050005] p-6 md:p-10 mb-10">
            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-semibold">{post.title}</h3>
              <h2 className="text-xs uppercase tracking-[0.25em] text-pink-400">{post.author || "Admin"} / Night Club Blog</h2>
            </div>

            {/* tekst */}
            <div className="text-sm md:text-base text-gray-200 leading-relaxed space-y-4">
              <p>{post.content.slice(0, 700)}</p>
              <p>{post.content.slice(700, 1400)}</p>
            </div>
          </div>

          {/* COMMENTS */}
          <section className="mt-4 mb-16">
            <div className="pl-6 md:pl-10">
              <h4 className="text-lg md:text-xl uppercase tracking-[0.4em] font-semibold mb-10">{comments.length} comments</h4>
              <div className="space-y-6 text-sm md:text-base text-gray-200">
                {comments.slice(0, 3).map((comment) => (
                  <div key={comment.id}>
                    <p className="font-semibold">
                      {comment.name} <span className="text-xs text-pink-400">– {new Date(comment.date).toLocaleDateString("da-DK")}</span>
                    </p>
                    <p className="mt-1">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </article>
        <section className="max-w-4xl mx-auto px-4 md:px-0 pb-16">
          <Form />
        </section>
      </main>
    </>
  );
}
