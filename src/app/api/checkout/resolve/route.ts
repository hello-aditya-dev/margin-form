import { NextRequest, NextResponse } from "next/server";
import { resolveCheckoutDestination } from "@/lib/commerce/offers";

/**
 * Server-side checkout resolver. Keeps env/Whop URLs server-only.
 * Returns a destination the client can navigate to.
 */
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }
  const dest = resolveCheckoutDestination(slug);
  return NextResponse.json({
    href: dest.href,
    external: dest.external,
    mode: dest.mode,
    configurationError: dest.configurationError,
  });
}
