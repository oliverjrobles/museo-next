import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="bg-black">
      <div className="relative w-full h-[520px] sm:h-[520px] md:h-[430px] lg:h-[500px] overflow-hidden">
        {/* BAGGRUND */}
        <Image
          src="/assets/bg/header_bg_2.jpg"
          alt="Night club background"
          fill
          priority
          // Mobil: fokus længere nede (damen i midten)
          // Desktop: lidt højere fokus
          className="object-cover object-[50%_65%] md:object-[50%_45%]"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/20" />

        {/* TEKSTBLOK (rykket lidt op) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 transform -translate-y-10 md:-translate-y-14">
          {/* NIGHT CLUB */}
          <h1 className="flex items-center gap-2 text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.4em] uppercase mb-3 md:mb-5">
            <span className="text-white">NIGHT</span>
            <span className="text-white">CLUB</span>
          </h1>

          {/* GLOW-LINJE + HAVE A GOOD TIME */}
          <div className="relative mt-1 w-full max-w-[330px] sm:max-w-[380px] md:max-w-[480px]">
            <Image src="/assets/bottom_line.png" alt="Pink glow line" width={800} height={80} className="mx-auto h-auto w-full opacity-90" />
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[0.55rem] sm:text-[0.7rem] md:text-sm tracking-[0.35em] uppercase text-white">Have a good time</span>
          </div>
        </div>
      </div>
    </section>
  );
}
