import type { Metadata } from "next";
import { Newsreader, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ThemeProvider } from "@/components/layout/theme-provider";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hello-aditya-dev.github.io/margin-form"),
  title: {
    default: "Margin / Form — The business of independent creativity",
    template: "%s · Margin / Form",
  },
  description:
    "Practical education, field-tested frameworks, and a considered community for independent designers, consultants, and creative founders. Make excellent work. Build a business that can sustain it.",
  keywords: [
    "creative business",
    "independent practice",
    "freelance design",
    "creative consulting",
    "pricing for creatives",
    "proposal writing",
    "creator education",
  ],
  authors: [{ name: "Elena Mercer (fictional)" }],
  creator: "Margin / Form (fictional demonstration)",
  robots: { index: false, follow: false }, // demo prevention default
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/brand/favicon.svg",
  },
  manifest: undefined,
  openGraph: {
    title: "Margin / Form — The business of independent creativity",
    description:
      "Practical education, frameworks, and community for independent creative professionals. Make excellent work. Build a business that can sustain it.",
    type: "website",
    siteName: "Margin / Form",
    images: [
      {
        url: "https://hello-aditya-dev.github.io/margin-form/images/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Margin / Form — The business of independent creativity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Margin / Form — The business of independent creativity",
    description:
      "The business of independent creativity. Education, frameworks, and community for independent creative professionals.",
    images: ["https://hello-aditya-dev.github.io/margin-form/images/og/twitter-card.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${newsreader.variable} ${dmSans.variable} ${plexMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[var(--ink)] focus:text-[var(--paper)] focus:px-4 focus:py-2 focus:font-mono-label"
          >
            Skip to content
          </a>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
