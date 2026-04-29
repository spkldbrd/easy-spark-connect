import type { SVGProps } from "react";

/**
 * Three interlocking hexagons — recreated from the Digital Solution mark.
 * Uses currentColor so it inherits text color (white in headers, brand in light, etc.).
 */
export function HexMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={5}
      strokeLinejoin="round"
      strokeLinecap="round"
      className={className}
      aria-hidden
      {...props}
    >
      {/* top-left hex */}
      <polygon points="32,8 56,8 68,28 56,48 32,48 20,28" />
      {/* right hex */}
      <polygon points="68,28 92,28 100,48 92,68 68,68 56,48" transform="translate(-8 0)" />
      {/* bottom-left hex */}
      <polygon points="32,48 56,48 68,68 56,88 32,88 20,68" transform="translate(0 0)" />
    </svg>
  );
}

/**
 * Single hex outline — used as a giant decorative motif tiled around the site.
 */
export function HexOutline({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className={className}
      aria-hidden
      {...props}
    >
      <polygon points="50,4 91,27 91,73 50,96 9,73 9,27" />
    </svg>
  );
}

/**
 * Honeycomb pattern — perfect tiling of hexagons. Use as a background overlay.
 */
export function HexPattern({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <defs>
        <pattern id="hex-pattern" x="0" y="0" width="56" height="96.99" patternUnits="userSpaceOnUse">
          <path
            d="M28 0 L56 16.166 L56 48.497 L28 64.663 L0 48.497 L0 16.166 Z M28 64.663 L56 80.829 M28 64.663 L0 80.829"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex-pattern)" />
    </svg>
  );
}
