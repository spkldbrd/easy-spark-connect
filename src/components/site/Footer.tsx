import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import logoWordmark from "@/assets/logo-wordmark.png";
import logoIcon from "@/assets/logo-icon.png";
import callTextIcon from "@/assets/call-text-icon.png";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black text-white">
      {/* Decorative hex icons scattered through the footer */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <img
          src={logoIcon}
          alt=""
          className="absolute -left-16 -top-10 h-72 w-72 opacity-[0.13] invert"
        />
        <img
          src={logoIcon}
          alt=""
          className="absolute right-[8%] top-1/3 h-40 w-40 opacity-10 invert -rotate-12"
        />
        <img
          src={logoIcon}
          alt=""
          className="absolute -bottom-16 left-1/3 h-96 w-96 opacity-[0.08] invert rotate-12"
        />
        <img
          src={logoIcon}
          alt=""
          className="absolute -right-10 -bottom-10 h-56 w-56 opacity-[0.135] invert"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-4">
          <div>
            <Link to="/" aria-label="Digital Solution — home" className="inline-block">
              <img
                src={logoWordmark}
                alt="Digital Solution"
                className="h-7 w-auto invert"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-white/60">
              Trusted IT partner for businesses across San Luis Obispo County since 2015.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">Services</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li><a href="/#services" className="hover:text-white">Managed IT</a></li>
              <li><a href="/#services" className="hover:text-white">Cybersecurity</a></li>
              <li><a href="/#services" className="hover:text-white">Cloud & Microsoft 365</a></li>
              <li><a href="/#services" className="hover:text-white">Backup & Disaster Recovery</a></li>
              <li><a href="/#services" className="hover:text-white">Business VoIP</a></li>
              <li><a href="/#services" className="hover:text-white">AI Solutions</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">Company</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              
              
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">Get in touch</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0" />8am to 5pm Monday - Friday </li>
              <li className="flex items-start gap-2"><img src={callTextIcon} alt="Call or text" className="mt-0.5 h-5 w-5 shrink-0 brightness-0 invert opacity-60" /><a href="tel:+18054664722" className="hover:text-white">805-466-4722</a></li>
              <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0" />hello@digitalsolution.com</li>
              <li className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0" />24/7 Emergency Support</li>
            </ul>
          </div>
        </div>
        {/* City row — local SEO + trust signal */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
            Proudly serving San Luis Obispo County
          </div>
          <nav
            aria-label="Service area"
            className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-2 text-xs uppercase tracking-[0.18em] text-white/55"
          >
            {([
              { label: "Atascadero", to: "/locations/atascadero" },
              { label: "Templeton" },
              { label: "Paso Robles", to: "/locations/paso-robles" },
              { label: "Santa Margarita" },
              { label: "San Luis Obispo", to: "/locations/san-luis-obispo" },
              { label: "Morro Bay" },
              { label: "Cayucos" },
              { label: "Avila Beach" },
              { label: "Pismo Beach" },
              { label: "Grover Beach" },
              { label: "Arroyo Grande" },
            ] as const).map((c, i, arr) => (
              <span key={c.label} className="flex items-center gap-1">
                {"to" in c ? (
                  <Link to={c.to} className="transition hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white/35">{c.label}</span>
                )}
                {i < arr.length - 1 && <span className="text-white/25">·</span>}
              </span>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Central Coast Digital Solution, LLC. All rights reserved.</p>
          <p>Atascadero · California</p>
        </div>
      </div>
    </footer>
  );
}
