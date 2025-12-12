import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="bg-black">
      <div className="relative w-full h-[520px] sm:h-[520px] md:h-[430px] lg:h-[500px] overflow-hidden">
        {/* BAGGRUND */}
        <Image src="/assets/bg/header_bg_2.jpg" alt="Night club background" fill priority className="object-cover object-[50%_65%] md:object-[50%_45%]" />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/20" />

        {/* TEKST – justeret ned under hagen */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 translate-y-10 md:translate-y-16 lg:translate-y-20">
          {/* NIGHT CLUB */}
          <h1 className="flex items-center text-3xl sm:text-4xl md:text-5xl font-black tracking-[0.15em] uppercase mb-2 md:mb-3 text-white">
            N
            <Image src="/assets/icon/Favicon.svg" alt="Nightclub Icon" width={40} height={40} className="inline-block w-6 sm:w-8 md:w-10 h-auto invert brightness-0" />
            GHT&nbsp;CLUB
          </h1>

          {/* GLOW-LINJE + HAVE A GOOD TIME */}
          <div className="relative mt-1 w-full max-w-[330px] sm:max-w-[380px] md:max-w-[480px]">
            <Image src="/assets/bottom_line.png" alt="Pink glow line" width={800} height={80} className="mt-8 mx-auto h-auto w-full opacity-90" />

            <span
              className="pointer-events-none absolute inset-0 flex items-center justify-center
              -translate-y-2 md:-translate-y-3
              text-[0.55rem] sm:text-[0.7rem] md:text-sm tracking-[1.25em] uppercase text-white"
            >
              Have a good time
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
