"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginModal from "./LoginModal";
import { useAuth } from "./auth/AuthProvider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const { isLoggedIn, logout } = useAuth();
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isBlog = pathname === "/blog";
  const isBook = pathname === "/book";
  const isContact = pathname === "/contact";

  return (
    <>
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
            <li className="relative">
              <Link href="/" className={isHome ? "text-[#ff2b80]" : "hover:text-[#ff2b80]"}>
                Home
              </Link>
              {isHome && <span className="absolute left-1/2 top-6 h-0.5 w-10 -translate-x-1/2 bg-[#ff2b80]" />}
            </li>

            <li className="relative">
              <Link href="/blog" className={isBlog ? "text-[#ff2b80]" : "hover:text-[#ff2b80]"}>
                Blog
              </Link>
              {isBlog && <span className="absolute left-1/2 top-6 h-0.5 w-10 -translate-x-1/2 bg-[#ff2b80]" />}
            </li>

            <li className="relative">
              <Link href="/book" className={isBook ? "text-[#ff2b80]" : "hover:text-[#ff2b80]"}>
                Book table
              </Link>
              {isBook && <span className="absolute left-1/2 top-6 h-0.5 w-10 -translate-x-1/2 bg-[#ff2b80]" />}
            </li>

            <li>
              <Link href="/contact" className={isContact ? "text-[#ff2b80]" : "hover:text-[#ff2b80]"}>
                Contact us
              </Link>
            </li>

            {/* LOGIN / LOGOUT */}
            <li>
              <button type="button" onClick={!isLoggedIn ? () => setLoginOpen(true) : logout} className="bg-transparent p-0 m-0 text-[0.85rem] tracking-[0.2em] uppercase hover:text-[#ff2b80]">
                {!isLoggedIn ? "Log in" : "Log out"}
              </button>
            </li>
          </ul>

          {/* MOBILE BURGER */}
          {!isOpen && (
            <button className="md:hidden inline-flex flex-col justify-between h-6 w-8" onClick={() => setIsOpen(true)} aria-label="Open menu">
              <span className="h-0.5 w-full bg-white" />
              <span className="h-0.5 w-full bg-white" />
              <span className="h-0.5 w-full bg-white" />
            </button>
          )}
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-black/90">
            <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-4 sm:px-8">
              <Image src="/assets/logo.png" alt="Museo Nightclub Logo" width={150} height={40} className="h-10 w-auto object-contain" />
              <button className="text-4xl text-white" onClick={() => setIsOpen(false)} aria-label="Close menu">
                &times;
              </button>
            </div>

            <ul className="flex h-[calc(100%-5rem)] flex-col items-center justify-center gap-8 text-sm tracking-[0.35em] uppercase">
              <li>
                <Link href="/" onClick={() => setIsOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" onClick={() => setIsOpen(false)}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/book" onClick={() => setIsOpen(false)}>
                  Book table
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  Contact us
                </Link>
              </li>

              {/* LOGIN / LOGOUT MOBILE */}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    !isLoggedIn ? setLoginOpen(true) : logout();
                  }}
                  className="text-white text-sm tracking-[0.35em] uppercase"
                >
                  {!isLoggedIn ? "Log in" : "Log out"}
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* LOGIN MODAL */}
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
