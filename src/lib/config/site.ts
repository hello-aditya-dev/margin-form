/**
 * Central site navigation config.
 * Single source of truth for header + footer link lists.
 */

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export const PRIMARY_NAV: NavItem[] = [
  { label: "Learn", href: "/courses", description: "Courses & curriculum" },
  { label: "Membership", href: "/membership", description: "The Practice Room" },
  { label: "Shop", href: "/shop", description: "Frameworks & toolkits" },
  { label: "Journal", href: "/journal", description: "Essays on independent practice" },
  { label: "About", href: "/about", description: "The founder & the philosophy" },
  { label: "Free Resources", href: "/resources", description: "Lead magnets & audits" },
];

export const FOOTER_NAV: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Learn",
    items: [
      { label: "The Independent Practice", href: "/courses/the-independent-practice" },
      { label: "The Client Pipeline", href: "/courses/the-client-pipeline" },
      { label: "Course Catalogue", href: "/courses" },
      { label: "The Practice Room", href: "/membership" },
    ],
  },
  {
    heading: "Shop",
    items: [
      { label: "The Proposal System", href: "/shop/the-proposal-system" },
      { label: "The Pricing Workbook", href: "/shop/the-pricing-workbook" },
      { label: "The Client Brief Kit", href: "/shop/the-client-brief-kit" },
      { label: "All Products", href: "/shop" },
    ],
  },
  {
    heading: "Read",
    items: [
      { label: "The Journal", href: "/journal" },
      { label: "The Monday Letter", href: "/newsletter" },
      { label: "Search", href: "/search" },
      { label: "Free Resources", href: "/resources" },
    ],
  },
  {
    heading: "Studio",
    items: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Support", href: "/support" },
    ],
  },
];

export const LEGAL_NAV: NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Demo Information", href: "/demo-information" },
];

export const SITE_CONFIG = {
  name: "Margin / Form",
  tagline: "The business of independent creativity.",
  description:
    "Make excellent work. Build a business that can sustain it. Education, frameworks, and community for independent creative professionals.",
  founder: "Elena Mercer",
  disclosure:
    "Portfolio demonstration · Margin / Form is a fictional creator business.",
};
