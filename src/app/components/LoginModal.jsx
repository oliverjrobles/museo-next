"use client";

import { useState } from "react";
import { useAuth } from "./auth/AuthProvider";

export default function LoginModal({ open, onOpenChange }) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!open) return null;

  function handleLogin() {
    // acceptér random input (ingen validering)
    login({ email: email || "guest@museo.local" });

    // reset + luk
    setEmail("");
    setPassword("");
    onOpenChange(false);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => onOpenChange(false)}>
      <div className="relative w-full max-w-sm bg-black border border-white/20 p-6 text-center" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xs tracking-[0.25em] uppercase mb-6 text-white">Login</h2>

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-4 bg-transparent border border-white/30 px-3 py-2 text-xs tracking-[0.25em] uppercase text-white placeholder:text-white/40 outline-none" />

        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-6 bg-transparent border border-white/30 px-3 py-2 text-xs tracking-[0.25em] uppercase text-white placeholder:text-white/40 outline-none" />

        <button type="button" onClick={handleLogin} className="w-full border border-white/40 py-2 text-xs tracking-[0.25em] uppercase text-white/90 hover:bg-white hover:text-black transition">
          Log in
        </button>

        {/* Close inde i popuppen */}
        <button type="button" onClick={() => onOpenChange(false)} className="mt-6 text-xs tracking-[0.25em] uppercase text-white/60 hover:text-white transition">
          Close
        </button>
      </div>
    </div>
  );
}
