import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import logoWordmark from "@/assets/logo-wordmark.png";
import logoIcon from "@/assets/logo-icon.png";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black text-white">
      {/* Decorative hex icons scattered through the footer */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <img
          src={logoIcon}
          alt=""
          className="absolute -left-16 -top-10 h-72 w-72 opacity-[0.06] invert"
        />
        <img
          src={logoIcon}
          alt=""
          className="absolute right-[8%] top-1/3 h-40 w-40 opacity-[0.05] invert -rotate-12"
        />
        <img
          src={logoIcon}
          alt=""
          className="absolute -bottom-16 left-1/3 h-96 w-96 opacity-[0.04] invert rotate-12"
        />
        <img
          src={logoIcon}
          alt=""
          className="absolute -right-10 -bottom-10 h-56 w-56 opacity-[0.07] invert"
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
              Trusted IT partner for businesses across San Luis Obispo County since 1997.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">Services</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li><Link to="/services" className="hover:text-white">Managed IT</Link></li>
              <li><Link to="/services" className="hover:text-white">Cybersecurity</Link></li>
              <li><Link to="/services" className="hover:text-white">Cloud & Backup</Link></li>
              <li><Link to="/services" className="hover:text-white">VoIP & Internet</Link></li>
              <li><Link to="/services" className="hover:text-white">AI Solutions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">Company</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/industries" className="hover:text-white">Industries</Link></li>
              <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">Get in touch</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />San Luis Obispo, CA</li>
              <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0" /><a href="tel:+18054664722" className="hover:text-white">805-466-4722</a></li>
              <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0" />hello@digitalsolution.com</li>
              <li className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0" />24/7 Emergency Support</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Central Coast Digital Solution, LLC. All rights reserved.</p>
          <p>Proudly serving San Luis Obispo County.</p>
        </div>
      </div>
    </footer>
  );
}
