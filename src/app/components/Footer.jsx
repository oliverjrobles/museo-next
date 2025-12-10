"use client";

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
          // vi tager de første 2 blogposts
          const mappedPosts = (Array.isArray(blogposts) ? blogposts : []).slice(0, 2).map((p) => ({
            id: p.id,
            title: p.title,
            imageUrl: p.asset?.url || null,
          }));
          setPosts(mappedPosts);
        }

        if (commentsRes && commentsRes.ok) {
          const comments = await commentsRes.json();
          // vi tager de første 2 comments
          const mappedTweets = (Array.isArray(comments) ? comments : []).slice(0, 2).map((c) => ({
            id: c.id,
            text: c.content,
            // meget enkel "time ago"
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
        // baggrundsbillede som er sat lokalt i projektet
        backgroundImage: "url('/assets/bg/footerbg.jpg')",
      }}
    >
      {/* mørk overlay = lav exposure */}
      <div className="absolute inset-0 bg-black/90" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-20">
        {/* TOP GRID */}
        <div className="grid gap-12 md:grid-cols-3">
          {/* Lokation skrevet lokalt */}
          <div className="space-y-8 text-center md:text-left">
            <div>
              <h3 className="text-sm tracking-[0.25em] uppercase text-[#ff3e7f] mb-3">LOCATION</h3>
              <p className="text-sm opacity-90">Kompagnistræde 278</p>
              <p className="text-sm opacity-90">1265 København K</p>
            </div>

            <div>
              <h3 className="text-sm tracking-[0.25em] uppercase text-[#ff3e7f] mb-3">OPENING HOURS</h3>
              <p className="text-sm opacity-90">WED – THU: 10:30 PM TO 3 AM</p>
              <p className="text-sm opacity-90">SAT – SUN: 11 PM TO 5 AM</p>
            </div>
          </div>

          {/* RECENT POSTS (fra /blogposts hvis muligt) */}
          <div>
            <h3 className="text-sm tracking-[0.25em] uppercase text-center md:text-left text-[#ff3e7f] mb-6">RECENT POSTS</h3>

            {posts.length > 0 ? (
              <div className="space-y-5">
                {posts.map((post) => (
                  <div key={post.id} className="flex items-start gap-4">
                    {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="w-20 h-20 object-cover flex-shrink-0" />}
                    <div className="text-sm">
                      <p className="mb-2 leading-snug opacity-90">{post.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs opacity-50 italic text-center md:text-left">No posts available.</p>
            )}
          </div>

          {/* RECENT TWEETS (fake, fra /comments) */}
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

        {/* BUND – SOCIAL + COPYRIGHT også skrevet lokalt */}
        <div className="mt-12 border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-3">
            <p className="text-xs tracking-[0.25em] uppercase opacity-70">STAY CONNECTED WITH US</p>
            <div className="flex gap-3">
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
          </div>

          <p className="text-xs md:text-sm opacity-70 text-center md:text-right">Copyright © NightClub</p>
        </div>
      </div>
    </footer>
  );
}
