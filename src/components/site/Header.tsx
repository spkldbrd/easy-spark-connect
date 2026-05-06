import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoWordmark from "@/assets/logo-wordmark.png";
import logoIcon from "@/assets/logo-icon.png";

const nav = [
  { to: "/about", label: "Our Story" },
  { to: "/contact", label: "Contact Us" },
] as const;


const PHONE_DISPLAY = "805-466-4722";
const PHONE_HREF = "tel:+18054664722";

export function Header({ overDark = false }: { overDark?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Transparent over a dark hero only while at the top of the page.
  const transparent = overDark && !scrolled;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        transparent
          ? "bg-transparent text-white"
          : "border-b border-border/60 bg-background/80 text-foreground backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Digital Solution — home">
          {transparent ? (
            // White wordmark over the dark hero (invert the black logo)
            <img
              src={logoWordmark}
              alt="Digital Solution"
              className="h-8 w-auto invert brightness-0 contrast-100"
              style={{ filter: "invert(1) brightness(2)" }}
            />
          ) : (
            <img src={logoWordmark} alt="Digital Solution" className="h-8 w-auto" />
          )}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <a
            href="/#services"
            className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
              transparent
                ? "text-white/70 hover:text-white"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            IT Services
          </a>
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                transparent
                  ? "text-white/70 hover:text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              activeProps={{
                className: transparent ? "text-white" : "text-foreground",
              }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {navRight.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                transparent
                  ? "text-white/70 hover:text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              activeProps={{
                className: transparent ? "text-white" : "text-foreground",
              }}
            >
              {n.label}
            </Link>
          ))}
          <a
            href={PHONE_HREF}
            className={`text-sm font-medium transition-colors ${
              transparent
                ? "text-white/80 hover:text-white"
                : "text-foreground/80 hover:text-foreground"
            }`}
          >
            {PHONE_DISPLAY}
          </a>
          <Link
            to="/contact"
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              transparent
                ? "bg-white text-ink hover:bg-cyan"
                : "bg-foreground text-background hover:bg-brand"
            }`}
          >
            Talk to us
          </Link>
        </div>

        <button
          className={`lg:hidden ${transparent ? "text-white" : "text-foreground"}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background text-foreground lg:hidden">
          <nav className="flex flex-col p-4">
            <a
              href="/#services"
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-secondary"
            >
              IT Services
            </a>
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-secondary"
              >
                {n.label}
              </Link>
            ))}
            {navRight.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-secondary"
              >
                {n.label}
              </Link>
            ))}
            <a
              href={PHONE_HREF}
              className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-secondary"
            >
              {PHONE_DISPLAY}
            </a>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-foreground px-5 py-3 text-center text-sm font-semibold text-background"
            >
              Talk to us
            </Link>
          </nav>
        </div>
      )}
      <img src={logoIcon} alt="" aria-hidden className="hidden" />
    </header>
  );
}
