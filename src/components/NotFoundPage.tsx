import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import logoWordmark from "@/assets/logo-wordmark.png";

export function NotFoundPage() {
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const path = window.location.pathname + window.location.search;

    let cancelled = false;

    (async () => {
      // 1. Check for a matching redirect
      const { data: redirect } = await supabase
        .from("redirects")
        .select("to_path")
        .eq("from_path", window.location.pathname)
        .maybeSingle();

      if (cancelled) return;

      if (redirect?.to_path) {
        setRedirecting(true);
        window.location.replace(redirect.to_path);
        return;
      }

      // 2. Otherwise log the 404
      await supabase.from("not_found_logs").insert({
        path,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent || null,
      });
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (redirecting) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <p className="text-sm text-muted-foreground">Redirecting…</p>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at top, color-mix(in oklab, var(--brand) 18%, transparent), transparent 60%)",
        }}
      />
      <div className="relative z-10 max-w-xl text-center">
        <img
          src={logoWordmark}
          alt="Digital Solution"
          className="mx-auto mb-10 h-10 w-auto"
        />
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Error 404
        </p>
        <h1 className="mt-4 font-display text-7xl font-bold tracking-tight text-foreground sm:text-8xl">
          Lost in the{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, var(--brand), var(--cyan))",
            }}
          >
            void
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-base text-muted-foreground">
          The page you're looking for doesn't exist, has moved, or was never
          here to begin with. Let's get you back on track.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
          >
            Back to home
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
