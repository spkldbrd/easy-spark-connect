import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const SPLASHTOP_URL = "https://my.splashtop.com/team_deployment/download/R44TWRZA3TP4";

export const Route = createFileRoute("/splashtop")({
  head: () => ({
    meta: [
      { title: "Splashtop Download — Digital Solution" },
      { name: "description", content: "Redirecting to Splashtop download." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SplashtopRedirect,
});

function SplashtopRedirect() {
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    if (seconds <= 0) {
      window.location.href = SPLASHTOP_URL;
      return;
    }

    const timer = setTimeout(() => {
      setSeconds((s) => s - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <div className="max-w-md">
        <p className="text-lg font-medium text-foreground">
          Hold on, we are taking you there...
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Redirecting in {seconds} second{seconds !== 1 ? "s" : ""}.
        </p>
        <a
          href={SPLASHTOP_URL}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
        >
          Go to Splashtop now
        </a>
      </div>
    </div>
  );
}
