import { Outlet, createRootRoute, HeadContent, Scripts, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";

const GA_MEASUREMENT_ID = "G-XVRBS8W3QK";
import { NotFoundPage } from "@/components/NotFoundPage";

const PRIMARY_ORIGIN = "https://digitalsolution.com";

function isEditorContext() {
  if (typeof window === "undefined") return true;
  const host = window.location.hostname;
  // Lovable editor preview hostnames
  if (host.startsWith("id-preview--")) return true;
  // Iframed (Lovable editor embeds the preview)
  try {
    if (window.self !== window.top) return true;
  } catch {
    return true;
  }
  return false;
}

import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    // Site-wide defaults only. Per-route metadata (title, description,
    // og:image, canonical) is set with buildSeo() in each route file.
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Digital Solution" },
      { name: "theme-color", content: "#0a0a0a" },
      { name: "google-site-verification", content: "WzZctgZuIyLW2A6ggaIoVEI_Ab86GS6VNIIpUpWfJ10" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&family=Geist+Mono:wght@400;500&display=swap" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
    ],
    scripts: [
      { src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`, async: true },
      {
        children: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });`,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundPage,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.location.hostname.endsWith(".lovable.app")) return;
    if (isEditorContext()) return;

    // Tell JS-executing crawlers to drop this copy.
    if (!document.querySelector('meta[name="robots"]')) {
      const meta = document.createElement("meta");
      meta.name = "robots";
      meta.content = "noindex";
      document.head.appendChild(meta);
    }

    // Visitor-side redirect to the primary domain (not a true 301).
    const { pathname, search, hash } = window.location;
    window.location.replace(PRIMARY_ORIGIN + pathname + search + hash);
  }, []);

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const search = useRouterState({ select: (s) => s.location.searchStr });
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof w.gtag !== "function") return;
    w.gtag("event", "page_view", {
      page_path: pathname + (search ? `?${search}` : ""),
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, search]);

  return <Outlet />;
}
