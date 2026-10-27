"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Hiring Me" },
];

const pill =
  "block bg-linear-[90deg] from-blue-400 bg-blue-300 font-bold text-white px-4 py-1 rounded shadow-blue-950 shadow-[2px_2px_0px] text-center max-md:py-2.5";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  // Close the mobile menu on Escape or when the viewport grows to desktop size.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);

    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-gutter">
        <div className="name invisible font-bold text-blue-400 lg:visible">
          FOLIO
        </div>

        {/* Tablet / desktop menu */}
        <nav className="hidden md:block" aria-label="Main">
          <ul className="flex flex-row gap-3 lg:gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={pill}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded bg-red-400 shadow-blue-950 shadow-[2px_2px_0px] md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span
            className={`h-0.5 w-5 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-5 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile dropdown.
          It is an overlay (absolute) so opening/closing it never changes the
          page height - otherwise the page jumps while smooth-scrolling to a
          section and lands too far down. Inert while closed so hidden links
          can't be tabbed to. */}
      <nav
        id="mobile-menu"
        aria-label="Mobile"
        inert={!open}
        className={`absolute inset-x-0 top-full bg-white px-gutter pb-4 shadow-md transition-[opacity,translate] duration-300 ease-out md:hidden ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-3">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={pill} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
