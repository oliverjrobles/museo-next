export default function BookHero() {
  return (
    <section className="relative h-40 md:h-56 bg-cover bg-center" style={{ backgroundImage: "url('/assets/bg/footerbg.jpg')" }}>
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl md:text-3xl tracking-[0.3em] uppercase">Book Table</h1>
        <div className="mt-4 flex justify-center">
          <img src="/assets/bottom_line2.png" alt="underline graphic" className="h-6" />
        </div>
      </div>
    </section>
  );
}
