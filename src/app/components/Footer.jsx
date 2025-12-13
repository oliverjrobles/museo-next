"use client";

import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaSnapchatGhost } from "react-icons/fa";
import React, { useEffect, useState } from "react";

export default function Footer() {
  const [posts, setPosts] = useState([]);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) return;

    async function load() {
      try {
        const [postsRes, commentsRes] = await Promise.all([fetch(`${baseUrl}/blogposts`, { cache: "no-store" }).catch(() => null), fetch(`${baseUrl}/comments`, { cache: "no-store" }).catch(() => null)]);

        if (postsRes && postsRes.ok) {
          const blogposts = await postsRes.json();
          const mappedPosts = (Array.isArray(blogposts) ? blogposts : []).slice(0, 2).map((p) => ({
            id: p.id,
            title: p.title,
            imageUrl: p.asset?.url || null,
          }));
          setPosts(mappedPosts);
        }

        if (commentsRes && commentsRes.ok) {
          const comments = await commentsRes.json();
          const mappedTweets = (Array.isArray(comments) ? comments : []).slice(0, 2).map((c) => ({
            id: c.id,
            text: c.content,
            timeAgo: c.date
              ? new Date(c.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "",
          }));
          setTweets(mappedTweets);
        }
      } catch {
        // hvis noget går galt, lader vi bare posts/tweets være tomme
      }
    }

    load();
  }, []);

  return (
    <footer
      className="relative bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('/assets/bg/footerbg.jpg')",
      }}
    >
      {/* mørk overlay */}
      <div className="absolute inset-0 bg-black/90" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-20">
        {/* ===== MOBIL-LAYOUT (PSD-STYLE) ===== */}
        <div className="md:hidden max-w-xs mx-auto text-center space-y-10">
          {/* BRAND */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-[0.35em] uppercase">
              NIGHT<span className="text-[#ff3e7f]">CLUB</span>
            </h2>
            <p className="text-[10px] tracking-[0.35em] uppercase">Have a good time</p>
          </div>

          {/* LOCATION */}
          <div className="space-y-2 text-sm">
            <h3 className="text-xs font-semibold tracking-[0.3em] uppercase text-[#ff3e7f]">Location</h3>
            <p>Kompagnistræde 278</p>
            <p>1265 København K</p>
          </div>

          {/* OPENING HOURS */}
          <div className="space-y-2 text-sm">
            <h3 className="text-xs font-semibold tracking-[0.3em] uppercase text-[#ff3e7f]">Opening Hours</h3>
            <p>Wed - Thu: 10:30 PM to 3 AM</p>
            <p>Sat - Sun: 11 PM to 5 AM</p>
          </div>

          {/* SOCIAL */}
          <div className="space-y-3">
            <p className="text-xs tracking-[0.25em] uppercase">Stay Connected With Us</p>
            <div className="flex justify-center gap-3">
              <button className="w-9 h-9 border border-white/80 flex items-center justify-center hover:bg-[#ff3e7f] hover:border-[#ff3e7f] transition-colors">
                <FaFacebookF />
              </button>
              <button className="w-9 h-9 border border-white/80 flex items-center justify-center hover:bg-[#ff3e7f] hover:border-[#ff3e7f] transition-colors">
                <FaTwitter />
              </button>
              <button className="w-9 h-9 border border-white/80 flex items-center justify-center hover:bg-[#ff3e7f] hover:border-[#ff3e7f] transition-colors">
                <FaSnapchatGhost />
              </button>
              <button className="w-9 h-9 border border-white/80 flex items-center justify-center hover:bg-[#ff3e7f] hover:border-[#ff3e7f] transition-colors">
                <FaInstagram />
              </button>
            </div>
          </div>

          {/* COPYRIGHT-TEXT */}
          <div className="space-y-1 text-[11px] text-white/70 leading-relaxed">
            <p>Night Club PSD Template</p>
            <p>All Rights Reserved</p>
            <p>Copyright © NightClub</p>
          </div>
        </div>

        {/* ===== DESKTOP/TABLET GRID ===== */}
        <div className="hidden md:grid gap-12 md:grid-cols-3">
          {/* Lokation + åbningstider */}
          <div className="space-y-6">
            <img src="/assets/logo.png" alt="Nightclub Logo" className="w-36" />

            <div>
              <h3 className="text-pink-500 font-semibold tracking-widest mb-2">LOCATION</h3>
              <p>Kompagnistræde 278</p>
              <p>1265 København K</p>
            </div>

            <div>
              <h3 className="text-pink-500 font-semibold tracking-widest mb-2">OPENING HOURS</h3>
              <p>WED - THU: 10:30 PM TO 3 AM</p>
              <p>SAT - SUN: 11 PM TO 5 AM</p>
            </div>
          </div>

          {/* RECENT POSTS */}
          <div>
            <h3 className="text-sm tracking-[0.25em] uppercase text-center md:text-left text-[#ff3e7f] mb-6">RECENT POSTS</h3>

            {posts.length > 0 ? (
              <div className="space-y-5">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`} // 👈 matcher /blog/[id]
                    className="flex items-start gap-4 group"
                  >
                    {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="w-20 h-20 object-cover flex-shrink-0 group-hover:opacity-80 transition-opacity" />}
                    <div className="text-sm">
                      <p className="mb-2 leading-snug opacity-90 group-hover:text-[#ff3e7f] transition-colors">{post.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs opacity-50 italic text-center md:text-left">No posts available.</p>
            )}
          </div>

          {/* RECENT TWEETS */}
          <div>
            <h3 className="text-sm tracking-[0.25em] uppercase text-center md:text-left text-[#ff3e7f] mb-6">RECENT TWEETS</h3>

            {tweets.length > 0 ? (
              <div className="space-y-5">
                {tweets.map((tweet) => (
                  <div key={tweet.id} className="flex items-start gap-3">
                    <FaTwitter className="mt-1 text-[#ff3e7f] text-lg shrink-0" />
                    <div className="text-sm">
                      <p className="mb-2 leading-snug opacity-90">{tweet.text}</p>
                      {tweet.timeAgo && <p className="text-xs text-[#ff3e7f]">{tweet.timeAgo}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs opacity-50 italic text-center md:text-left">No tweets available.</p>
            )}
          </div>
        </div>

        {/* BUND – SOCIAL + COPYRIGHT (kun desktop/tablet, mobil har egen version ovenfor) */}
        <div className="hidden md:flex mt-12 border-top border-white/10 pt-8 items-center justify-between gap-6 border-t border-white/10">
          <div className="flex flex-col items-center md:items-start gap-3">
            <p className="text-xs tracking-[0.25em] uppercase opacity-70">STAY CONNECTED WITH US</p>
            <div className="flex gap-3">
              <button className="w-9 h-9 md:w-10 md:h-10 border border-white/80 flex items-center justify-center hover:bg-[#ff3e7f] hover:border-[#ff3e7f] transition-colors">
                <FaFacebookF />
              </button>

              <button className="w-9 h-9 md:w-10 md:h-10 border border-white/80 flex items-center justify-center hover:bg-[#ff3e7f] hover:border-[#ff3e7f] transition-colors">
                <FaTwitter />
              </button>

              <button className="w-9 h-9 md:w-10 md:h-10 border border-white/80 flex items-center justify-center hover:bg-[#ff3e7f] hover:border-[#ff3e7f] transition-colors">
                <FaInstagram />
              </button>

              <button className="w-9 h-9 md:w-10 md:h-10 border border-white/80 flex items-center justify-center hover:bg-[#ff3e7f] hover:border-[#ff3e7f] transition-colors">
                <FaSnapchatGhost />
              </button>
            </div>
          </div>

          <p className="text-xs md:text-sm opacity-70 text-center md:text-right">Copyright © NightClub</p>
        </div>
      </div>
    </footer>
  );
}
