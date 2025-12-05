import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="bg-black">
      <div className="relative w-full h-[520px] sm:h-[380px] md:h-[420px] lg:h-[480px] overflow-hidden">
        {/* BAGGRUND */}
        <Image src="/assets/bg/header_bg_2.jpg" alt="Night club background" fill priority className="object-cover object-[50%_20%] sm:object-center" />

        {/* LET OVERLAY */}
        <div className="absolute inset-0 bg-black/20" />

        {/* HERO CONTENT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          {/* LOGO – større på mobil */}
          <Image src="/assets/Logo.png" alt="Nightclub logo" width={320} height={80} className="h-auto w-[75%] max-w-[300px] sm:w-[240px] drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]" />

          {/* PINK GLOW LINE */}
          <div className="relative mt-6 w-full max-w-md">
            <Image src="/assets/bottom_line.png" alt="Pink line" width={800} height={80} className="mx-auto h-auto w-full opacity-80" />
          </div>
        </div>
      </div>
    </section>
  );
}
