"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const tables = Array.from({ length: 15 }, (_, i) => i + 1);

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const tableVariants = {
  hidden: { opacity: 0, y: -25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 18, stiffness: 200 },
  },
};

export default function Tables({ selectedTable, onSelectTable }) {
  const toggleTable = (num) => {
    const next = selectedTable === num ? null : num;
    onSelectTable?.(next);
  };

  return (
    <section className="bg-[#050505] py-20">
      <div className="mx-auto max-w-5xl px-4">
        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-y-10 sm:gap-y-14" variants={containerVariants} initial="hidden" animate="visible">
          {tables.map((num) => {
            const tableSvgIndex = ((num - 1) % 3) + 1;
            const isSelected = selectedTable === num;

            return (
              <motion.button
                key={num}
                type="button"
                variants={tableVariants}
                onClick={() => toggleTable(num)}
                whileHover={
                  !isSelected
                    ? {
                        scale: 1.06,
                        filter: "brightness(1.35) drop-shadow(0 0 24px rgba(0,255,140,0.9))",
                      }
                    : {}
                }
                animate={{
                  filter: isSelected ? "brightness(1.4) drop-shadow(0 0 26px rgba(255,0,80,0.95))" : "brightness(1)",
                }}
                transition={{ type: "spring", stiffness: 240, damping: 18 }}
                className="relative mx-auto flex items-center justify-center bg-transparent"
              >
                <Image src={`/assets/icon/table${tableSvgIndex}.svg`} alt={`Table ${num}`} width={120} height={120} className="pointer-events-none" />
                <span className="pointer-events-none absolute text-white text-sm font-semibold tracking-widest">{num}</span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
