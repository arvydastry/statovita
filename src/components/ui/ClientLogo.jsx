import { cn } from "@/lib/utils";

/**
 * Client logo sized by equal visual AREA (not equal height), so a square emblem and an 8:1 wordmark
 * read as equally prominent. Files are trimmed of white margins (/img/clients/*-trim.png).
 * area: target px² at scale 1; maxHeight caps square logos. Scale per breakpoint via the
 * CSS variable --logo-scale on any ancestor (e.g. "[--logo-scale:0.8] sm:[--logo-scale:1]").
 */
export function ClientLogo({ client, area = 6000, maxHeight = 72, alt = "", className, style, ...rest }) {
  const ratio = client.logoW && client.logoH ? client.logoW / client.logoH : 2;
  const h = Math.min(maxHeight, Math.sqrt(area / ratio));
  return (
    <img
      src={client.logo}
      alt={alt}
      width={client.logoW}
      height={client.logoH}
      loading="lazy"
      draggable="false"
      style={{ height: `calc(${h.toFixed(1)}px * var(--logo-scale, 1))`, width: "auto", ...style }}
      className={cn("max-w-full object-contain", className)}
      {...rest}
    />
  );
}
