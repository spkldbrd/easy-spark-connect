import type { ReactNode } from "react";
import heroOrb from "@/assets/hero-orb.jpg";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  meta,
  videoSrc,
  imageSrc,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Optional hairline detail row (4 short labels) */
  meta?: string[];
  /** Optional background video — plays once then freezes on last frame */
  videoSrc?: string;
  /** Optional background image override (defaults to heroOrb) */
  imageSrc?: string;
}) {
  return (
    <section className="relative -mt-[72px] overflow-hidden bg-black text-white">
      {videoSrc ? (
        <video
          src={videoSrc}
          autoPlay
          muted
          playsInline
          preload="auto"
          poster={heroOrb}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70"
        />
      ) : (
        <img
          src={imageSrc ?? heroOrb}
          alt=""
          width={1920}
          height={1280}
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover ${imageSrc ? "object-right opacity-90" : "opacity-70"}`}
        />
      )}
      {imageSrc ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" aria-hidden />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" aria-hidden />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.55)_70%,_#000_100%)]" aria-hidden />
        </>
      )}

      <div className="relative mx-auto flex min-h-[60vh] max-w-7xl flex-col justify-end px-6 pb-20 pt-40">
        <div className="max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
            {eyebrow}
          </span>
          <h1 className="mt-5 font-display text-[clamp(2.5rem,6.5vw,6rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-7 max-w-2xl text-lg text-white/65 sm:text-xl">{subtitle}</p>
          )}
        </div>

        {meta && meta.length > 0 && (
          <div className="mt-20 flex flex-wrap items-end justify-between gap-6 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.2em] text-white/40">
            {meta.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Reusable cinematic CTA used at the bottom of every subpage,
 * mirroring the homepage closer.
 */
export function CinematicCTA({
  title,
  subtitle,
  ctaLabel = "Talk to us",
  ctaTo = "/contact",
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  ctaLabel?: string;
  ctaTo?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-black py-32 text-white">
      <img
        src={heroOrb}
        alt=""
        width={1920}
        height={1280}
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-display text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/65">{subtitle}</p>
        )}
        <a
          href={ctaTo}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition hover:bg-cyan"
        >
          {ctaLabel}
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
