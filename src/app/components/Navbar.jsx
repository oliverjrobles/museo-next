"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./auth/AuthProvider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // auth
  const { isLoggedIn, login, logout } = useAuth();

  const pathname = usePathname();

  const isHome = pathname === "/";
  const isBlog = pathname === "/blog";
  const isBook = pathname === "/book";
  const isContact = pathname === "/contact";

  return (
    <nav className="relative overflow-hidden bg-[#060008] text-white border-y-2 border-[#ff2b80]">
      {/* pink hjørner */}
      <span className="pointer-events-none absolute left-0 top-0 h-9 w-5 bg-[#ff2b80] [clip-path:polygon(0_0,0_100%,100%_0)]" />
      <span className="pointer-events-none absolute right-0 bottom-0 h-9 w-5 bg-[#ff2b80] [clip-path:polygon(100%_100%,0_100%,100%_0)]" />

      {/* TOP BAR */}
      <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-4 sm:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/assets/logo.png" alt="Museo Nightclub Logo" width={150} height={40} className="h-10 w-auto object-contain" priority />
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex list-none gap-8 text-[0.85rem] tracking-[0.2em] uppercase">
          {/* HOME */}
          <li className="relative">
            <Link href="/" className={isHome ? "text-[#ff2b80]" : "transition-colors hover:text-[#ff2b80]"}>
              Home
            </Link>
            {isHome && <span className="pointer-events-none absolute left-1/2 top-6 h-0.5 w-10 -translate-x-1/2 bg-[#ff2b80]" />}
          </li>

          {/* BLOG */}
          <li className="relative">
            <Link href="/blog" className={isBlog ? "text-[#ff2b80]" : "transition-colors hover:text-[#ff2b80]"}>
              Blog
            </Link>
            {isBlog && <span className="pointer-events-none absolute left-1/2 top-6 h-0.5 w-10 -translate-x-1/2 bg-[#ff2b80]" />}
          </li>

          {/* BOOK TABLE */}
          <li className="relative">
            <Link href="/book" className={isBook ? "text-[#ff2b80]" : "transition-colors hover:text-[#ff2b80]"}>
              Book table
            </Link>
            {isBook && <span className="pointer-events-none absolute left-1/2 top-6 h-0.5 w-10 -translate-x-1/2 bg-[#ff2b80]" />}
          </li>

          {/* CONTACT */}
          <li>
            <Link href="/contact" className={isContact ? "text-[#ff2b80]" : "transition-colors hover:text-[#ff2b80]"}>
              Contact us
            </Link>
          </li>

          {/* LOGIN / LOGOUT */}
          <li>
            {!isLoggedIn ? (
              <button type="button" onClick={login} className="bg-transparent border-0 p-0 m-0 text-[0.85rem] tracking-[0.2em] uppercase transition-colors hover:text-[#ff2b80]">
                Log in
              </button>
            ) : (
              <button type="button" onClick={logout} className="bg-transparent border-0 p-0 m-0 text-[0.85rem] tracking-[0.2em] uppercase transition-colors hover:text-[#ff2b80]">
                Log out
              </button>
            )}
          </li>
        </ul>

        {/* MOBILE BURGER (kun når menuen er LUKKET) */}
        {!isOpen && (
          <button className="md:hidden inline-flex flex-col justify-between h-6 w-8 focus:outline-none" onClick={() => setIsOpen(true)} aria-label="Open menu">
            <span className="h-0.5 w-full bg-white" />
            <span className="h-0.5 w-full bg-white" />
            <span className="h-0.5 w-full bg-white" />
          </button>
        )}
      </div>

      {/* MOBILE FULLSCREEN MENU */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/90">
          {/* top of overlay: logo + X */}
          <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-4 sm:px-8">
            <Image src="/assets/logo.png" alt="Museo Nightclub Logo" width={150} height={40} className="h-10 w-auto object-contain" />

            {/* KRYDS */}
            <button className="text-4xl leading-none text-white" onClick={() => setIsOpen(false)} aria-label="Close menu">
              &times;
            </button>
          </div>

          {/* menu-links i midten */}
          <ul className="flex h-[calc(100%-5rem)] flex-col items-center justify-center gap-8 text-sm tracking-[0.35em] uppercase">
            <li>
              <Link href="/" onClick={() => setIsOpen(false)} className={isHome ? "text-[#ff2b80]" : "text-white"}>
                Home
              </Link>
            </li>

            <li>
              <Link href="/blog" onClick={() => setIsOpen(false)} className={isBlog ? "text-[#ff2b80]" : "text-white"}>
                Blog
              </Link>
            </li>

            <li>
              <Link href="/book" onClick={() => setIsOpen(false)} className={isBook ? "text-[#ff2b80]" : "text-white"}>
                Book table
              </Link>
            </li>

            <li>
              <Link href="/contact" onClick={() => setIsOpen(false)} className={isContact ? "text-[#ff2b80]" : "text-white"}>
                Contact us
              </Link>
            </li>

            {/* LOGIN / LOGOUT */}
            <li>
              {!isLoggedIn ? (
                <button
                  type="button"
                  onClick={() => {
                    login();
                    setIsOpen(false);
                  }}
                  className="text-white text-sm tracking-[0.35em] uppercase"
                >
                  Log in
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="text-white text-sm tracking-[0.35em] uppercase"
                >
                  Log out
                </button>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
