export default function Navbar() {
  return (
    <nav className="relative overflow-hidden bg-[#060008] text-white border-y-2 border-[#ff2b80]">
      {/* pink hjørner */}
      <span className="pointer-events-none absolute left-0 top-0 h-9 w-5 bg-[#ff2b80] [clip-path:polygon(0_0,0_100%,100%_0)]" />
      <span className="pointer-events-none absolute right-0 bottom-0 h-9 w-5 bg-[#ff2b80] [clip-path:polygon(100%_100%,0_100%,100%_0)]" />

      <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-8">
        {/* Logo lavet med almindeligt tekst, ikken noget billede */}
        <div className="flex flex-col gap-1">
          <div className="text-[1.4rem] font-bold tracking-[0.2em] uppercase">
            <span className="text-[#ff2b80]">MUSEO</span> NIGHTCLUB
          </div>
          <div className="text-[0.65rem] tracking-[0.3em] uppercase text-zinc-400">Nightlife • Drinks • Dance</div>
        </div>

        {/* Menu */}
        <ul className="flex list-none gap-8 text-[0.85rem] tracking-[0.2em] uppercase">
          <li className="relative">
            <a href="#home" className="text-[#ff2b80]">
              Home
            </a>
            {/* underline på aktiv link */}
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
      </div>
    </nav>
  );
}
