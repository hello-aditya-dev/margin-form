"use client";

import * as React from "react";
import { FileDown } from "lucide-react";
import { track } from "@/lib/analytics/taxonomy";
import { cn } from "@/lib/utils";
import { withBase } from "@/lib/config/paths";

interface PreviewDownloadLinkProps {
  /** Course slug — used as the analytics event payload. */
  slug: string;
  href: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Preview download link — tracks a `product_preview_download`-style event
 * when clicked (re-uses the existing taxonomy entry, with the course slug).
 * Renders as a normal anchor so middle-click / cmd-click still work.
 */
export function PreviewDownloadLink({
  slug,
  href,
  children,
  className,
}: PreviewDownloadLinkProps) {
  const onClick = React.useCallback(() => {
    track({ type: "product_preview_download", slug });
  }, [slug]);

  return (
    <a
      href={withBase(href)}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 font-mono-label text-[var(--clay)] hover:text-[var(--ink)] transition-colors link-underline",
        className
      )}
    >
      <FileDown size={14} strokeWidth={1.75} aria-hidden />
      <span>{children}</span>
    </a>
  );
}
