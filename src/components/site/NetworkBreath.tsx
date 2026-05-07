import { useEffect, useMemo, useRef } from "react";

/**
 * Animated "breathing" network of nodes — soft cyan dots connected by
 * thin lines, drifting slowly so the graphic feels alive.
 */
export function NetworkBreath({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // Stable seed of nodes (positions in [0,1] space, plus drift params)
  const nodes = useMemo(() => {
    const N = 46;
    return Array.from({ length: N }, (_, i) => {
      const seed = i * 9301 + 49297;
      const r = (n: number) => ((Math.sin(n) + 1) / 2);
      return {
        x: r(seed),
        y: r(seed * 1.3),
        ax: 0.012 + r(seed * 2.1) * 0.02, // amplitude
        ay: 0.012 + r(seed * 2.7) * 0.02,
        sx: 0.15 + r(seed * 3.1) * 0.35, // speed
        sy: 0.15 + r(seed * 3.7) * 0.35,
        px: r(seed * 4.1) * Math.PI * 2, // phase
        py: r(seed * 4.9) * Math.PI * 2,
        pulse: r(seed * 5.3) * Math.PI * 2,
      };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const start = performance.now();
    const LINK_DIST = 0.18; // in normalized space

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);

      // compute current positions
      const pts = nodes.map((n) => {
        const x = (n.x + Math.sin(t * n.sx + n.px) * n.ax) * w;
        const y = (n.y + Math.cos(t * n.sy + n.py) * n.ay) * h;
        const pulse = 0.6 + 0.4 * Math.sin(t * 1.2 + n.pulse);
        return { x, y, pulse };
      });

      // links
      const linkPx = LINK_DIST * Math.max(w, h);
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < linkPx) {
            const a = (1 - d / linkPx) * 0.35;
            ctx.strokeStyle = `rgba(94, 234, 212, ${a.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const p of pts) {
        const r = 1.6 + p.pulse * 1.8;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
        grad.addColorStop(0, `rgba(165, 243, 252, ${0.9 * p.pulse})`);
        grad.addColorStop(1, "rgba(34, 211, 238, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(224, 252, 255, ${0.85 * p.pulse})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [nodes]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden
    />
  );
}
