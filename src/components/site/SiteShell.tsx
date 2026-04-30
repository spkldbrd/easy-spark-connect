import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteShell({ children, overDark = false }: { children: ReactNode; overDark?: boolean }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header overDark={overDark} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
