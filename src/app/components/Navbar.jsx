"use client";

import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative overflow-hidden bg-[#060008] text-white border-y-2 border-[#ff2b80]">
      {/* pink hjørner */}
      <span className="pointer-events-none absolute left-0 top-0 h-9 w-5 bg-[#ff2b80] [clip-path:polygon(0_0,0_100%,100%_0)]" />
      <span className="pointer-events-none absolute right-0 bottom-0 h-9 w-5 bg-[#ff2b80] [clip-path:polygon(100%_100%,0_100%,100%_0)]" />

      {/* TOP BAR */}
      <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-4 sm:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/assets/logo.png" // læg logoet i: public/assets/logo.png
            alt="Museo Nightclub Logo"
            width={150}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex list-none gap-8 text-[0.85rem] tracking-[0.2em] uppercase">
          <li className="relative">
            <a href="#home" className="text-[#ff2b80]">
              Home
            </a>
            <span className="pointer-events-none absolute left-1/2 top-6 h-0.5 w-10 -translate-x-1/2 bg-[#ff2b80]" />
          </li>
          <li>
            <a href="#blog" className="transition-colors hover:text-[#ff2b80]">
              Blog
            </a>
          </li>
          <li>
            <a href="#book" className="transition-colors hover:text-[#ff2b80]">
              Book table
            </a>
          </li>
          <li>
            <a href="#contact" className="transition-colors hover:text-[#ff2b80]">
              Contact us
            </a>
          </li>
          <li>
            <a href="#login" className="transition-colors hover:text-[#ff2b80]">
              Log in
            </a>
          </li>
        </ul>

        {/* MOBILE BURGER (kun når menuen er LUKKET) */}
        {!isOpen && (
          <button className="md:hidden inline-flex flex-col justify-between h-6 w-8 focus:outline-none" onClick={() => setIsOpen(true)} aria-label="Open menu">
            <span className="h-[2px] w-full bg-white" />
            <span className="h-[2px] w-full bg-white" />
            <span className="h-[2px] w-full bg-white" />
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
              <a href="#home" onClick={() => setIsOpen(false)} className="text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#blog" onClick={() => setIsOpen(false)} className="text-white">
                Blog
              </a>
            </li>
            <li>
              <a href="#book" onClick={() => setIsOpen(false)} className="text-white">
                Book table
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => setIsOpen(false)} className="text-white">
                Contact us
              </a>
            </li>
            <li>
              <a href="#login" onClick={() => setIsOpen(false)} className="text-white">
                Log in
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
