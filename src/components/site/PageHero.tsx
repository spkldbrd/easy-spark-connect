import type { ReactNode } from "react";
import { HexPattern, HexOutline } from "./HexMark";

export function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: ReactNode; subtitle?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-white">
      <HexPattern className="absolute inset-0 h-full w-full text-white/[0.07]" />
      <HexOutline className="absolute -right-24 -top-24 h-80 w-80 text-cyan/20" strokeWidth={1.5} />
      <HexOutline className="absolute -left-32 -bottom-24 h-96 w-96 text-white/10" strokeWidth={1} />
      <div className="relative mx-auto max-w-7xl px-6 py-24 text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">{eyebrow}</span>
        <h1 className="mt-3 font-display text-5xl font-bold tracking-tight sm:text-6xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-5 max-w-2xl text-lg text-white/75">{subtitle}</p>}
      </div>
    </section>
  );
}
