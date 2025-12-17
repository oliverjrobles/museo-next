"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

// Styrer rækkefølgen: logo først, så tagline+line
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 1,
    },
  },
};

// Logo: flip + langsomt drop
const logoVariants = {
  hidden: {
    opacity: 0,
    rotateX: 70,
    y: -18,
    transformPerspective: 1200,
  },
  show: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Have a good time + radiantlinje: tydelig dropdown + fade
const subVariants = {
  hidden: {
    opacity: 0,
    y: -40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      y: {
        type: "spring",
        stiffness: 90,
        damping: 20,
        mass: 1.2,
      },
      opacity: {
        duration: 1.1,
        ease: "easeOut",
      },
    },
  },
};

export default function Hero() {
  const [bgReady, setBgReady] = useState(false);
  const [minTimeDone, setMinTimeDone] = useState(false);

  const minLoaderMs = 900;
  const isReady = bgReady && minTimeDone;

  useEffect(() => {
    const t = setTimeout(() => setMinTimeDone(true), minLoaderMs);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="home" className="bg-black">
      <div className="relative w-full h-[100svh] sm:h-[520px] md:h-[430px] lg:h-[500px] overflow-hidden">
        {/* BG */}
        <Image
          src="/assets/bg/header_bg_2.jpg"
          alt="Night club background"
          fill
          priority
          className="
            object-cover
            object-[50%_18%]
            sm:object-[50%_65%]
            md:object-[50%_45%]
          "
          onLoadingComplete={() => setBgReady(true)}
        />

        {/* indhold */}
        <motion.div
          className="
            absolute inset-0
            flex items-end md:items-center
            justify-center
            px-4
            pb-78 sm:pb-0
          "
          variants={containerVariants}
          initial="hidden"
          animate={isReady ? "show" : "hidden"}
        >
          <div className="flex flex-col items-center text-center gap-3 md:gap-5 md:translate-y-6 lg:translate-y-8">
            {/* Logo */}
            <motion.div variants={logoVariants} style={{ transformStyle: "preserve-3d" }}>
              <Image src="/assets/icon/Logo.svg" alt="Night Club logo" width={220} height={60} priority className="h-auto w-[340px] sm:w-[220px] md:w-[720px]" />
            </motion.div>

            {/* have a good time og radiantlinje */}
            <motion.div variants={subVariants} className="flex flex-col items-center">
              <p className="mt-1 text-[0.55rem] sm:text-[0.6rem] md:text-[20px] tracking-[1.25em] font-medium uppercase text-white opacity-90 leading-none">HAVE&nbsp;A&nbsp;GOOD&nbsp;TIME</p>

              <div className="mt-2 w-full max-w-[320px] sm:max-w-[320px] md:max-w-[360px]">
                <Image src="/assets/bottom_line.png" alt="" aria-hidden="true" width={800} height={80} className="mx-auto h-auto w-full opacity-90" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* loader effekt gif halløjsa */}
        <AnimatePresence>
          {!isReady && (
            <motion.div className="absolute inset-0 z-30 grid place-items-center bg-black" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}>
              <img src="/assets/loader/madbars.gif" alt="" aria-hidden="true" className="h-8 w-8 object-contain opacity-90" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
