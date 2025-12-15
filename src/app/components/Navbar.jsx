"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginModal from "./LoginModal";
import { useAuth } from "./auth/AuthProvider";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const { isLoggedIn, logout } = useAuth();
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isBlog = pathname === "/blog";
  const isBook = pathname === "/book";
  const isContact = pathname === "/contact";

  const mobileLinkClass = "cursor-pointer text-white/90 transition-colors duration-200 " + "hover:text-[#ff2b80] hover:underline hover:underline-offset-8";

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
              <button type="button" onClick={!isLoggedIn ? () => setLoginOpen(true) : logout} className="bg-transparent p-0 m-0 text-[0.85rem] tracking-[0.2em] uppercase hover:text-[#ff2b80] cursor-pointer">
                {!isLoggedIn ? "Log in" : "Log out"}
              </button>
            </li>
          </ul>

          {/* MOBILE BURGER */}
          {!isOpen && (
            <motion.button className="md:hidden inline-flex flex-col justify-between h-6 w-8 cursor-pointer select-none" onClick={() => setIsOpen(true)} aria-label="Open menu" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.92 }}>
              <span className="h-0.5 w-full bg-white" />
              <span className="h-0.5 w-full bg-white" />
              <span className="h-0.5 w-full bg-white" />
            </motion.button>
          )}
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div className="fixed inset-0 z-50 bg-black/90" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-4 sm:px-8">
                <Image src="/assets/logo.png" alt="Museo Nightclub Logo" width={150} height={40} className="h-10 w-auto object-contain" />

                <motion.button className="text-4xl text-white/90 hover:text-[#ff2b80] transition-colors cursor-pointer select-none" onClick={() => setIsOpen(false)} aria-label="Close menu" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.92 }}>
                  &times;
                </motion.button>
              </div>

              <motion.ul className="flex h-[calc(100%-5rem)] flex-col items-center justify-center gap-8 text-sm tracking-[0.35em] uppercase" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.2 }}>
                <li>
                  <Link href="/" onClick={() => setIsOpen(false)} className={mobileLinkClass}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/blog" onClick={() => setIsOpen(false)} className={mobileLinkClass}>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/book" onClick={() => setIsOpen(false)} className={mobileLinkClass}>
                    Book table
                  </Link>
                </li>
                <li>
                  <Link href="/contact" onClick={() => setIsOpen(false)} className={mobileLinkClass}>
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
                    className={"text-sm tracking-[0.35em] uppercase cursor-pointer text-white/90 " + "transition-colors duration-200 hover:text-[#ff2b80] hover:underline hover:underline-offset-8"}
                  >
                    {!isLoggedIn ? "Log in" : "Log out"}
                  </button>
                </li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* LOGIN MODAL */}
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
