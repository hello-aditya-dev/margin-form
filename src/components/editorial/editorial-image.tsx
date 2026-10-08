import * as React from "react";
import { withBase } from "@/lib/config/paths";
import { cn } from "@/lib/utils";

interface EditorialImageProps {
  src: string;       // e.g. "/images/hero/hero-studio.jpg"
  webp?: string;     // e.g. "/images/hero/hero-studio.webp"
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  /** priority = eager load (for LCP hero). Default lazy. */
  priority?: boolean;
  sizes?: string;
  /** Optional caption displayed below */
  caption?: string;
  /** Optional overlay treatment */
  overlay?: "none" | "ink-15" | "ink-30";
  /** When true, the image fills its parent container (absolute inset-0 + object-cover).
   *  Use for full-bleed / background-style images. Parent must be position:relative. */
  fill?: boolean;
}

/**
 * Editorial image component.
 *
 * Handles:
 *  - basePath prefixing via withBase() (GitHub Pages /margin-form)
 *  - WebP <picture> with JPEG fallback
 *  - Eager loading for above-the-fold (priority) images, lazy otherwise
 *  - Stable dimensions to prevent layout shift
 *  - Accessible alt text
 *  - Optional editorial caption
 *
 * Uses a plain <img> rather than next/image because the site is a static
 * export and next/image's loader requires a server in some configs.
 * The unoptimized static export works, but a plain <picture> gives us
 * full control over WebP/JPEG fallback and art direction without the
 * runtime cost.
 */
export function EditorialImage({
  src,
  webp,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
  caption,
  overlay = "none",
  fill = false,
}: EditorialImageProps) {
  const jpgSrc = withBase(src);
  const webpSrc = webp ? withBase(webp) : undefined;

  const overlayClass =
    overlay === "ink-15"
      ? "after:absolute after:inset-0 after:bg-[var(--ink)]/15 after:pointer-events-none"
      : overlay === "ink-30"
      ? "after:absolute after:inset-0 after:bg-[var(--ink)]/30 after:pointer-events-none"
      : "";

  return (
    <figure className={cn("relative", fill && "absolute inset-0 w-full h-full", className)}>
      <picture className={cn(fill && "absolute inset-0 w-full h-full")}>
        {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
        <source srcSet={jpgSrc} type="image/jpeg" />
        <img
          src={jpgSrc}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "auto" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          sizes={sizes}
          className={cn(
            "block object-cover",
            fill ? "absolute inset-0 w-full h-full" : "w-full h-auto",
            overlayClass
          )}
        />
      </picture>
      {caption && (
        <figcaption className="mt-3 font-mono text-[0.6875rem] tracking-[0.12em] uppercase text-[var(--warm-gray)] leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
