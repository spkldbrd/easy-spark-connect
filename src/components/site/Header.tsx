import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { HexMark } from "./HexMark";

const nav = [
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header({ overDark = false }: { overDark?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // When over a dark hero and not scrolled, render transparent + white text.
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
        <Link to="/" className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight">
          <HexMark className={transparent ? "h-8 w-8 text-cyan" : "h-8 w-8 text-brand"} />
          <span className="font-display tracking-tight">Digital Solution</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
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
          <a
            href="tel:+18055550100"
            className={`text-sm font-medium ${transparent ? "text-white/80 hover:text-white" : "text-foreground/80 hover:text-foreground"}`}
          >
            (805) 555-0100
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
          className="lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background text-foreground lg:hidden">
          <nav className="flex flex-col p-4">
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
    </header>
  );
}
