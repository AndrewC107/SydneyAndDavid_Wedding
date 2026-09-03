import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes, Outfit } from "next/font/google";
import { wedding, coupleNames } from "@/config/wedding";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-outfit",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  title: wedding.meta.title,
  description: wedding.meta.description,
  openGraph: {
    title: wedding.meta.title,
    description: wedding.meta.description,
    type: "website",
    locale: "en_CA",
    siteName: coupleNames,
    images: [
      {
        url: "/images/og-orchard.jpg",
        width: 1200,
        height: 675,
        alt: `Peach orchard at sunset — ${coupleNames} Save the Date`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: wedding.meta.title,
    description: wedding.meta.description,
    images: ["/images/og-orchard.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf8f2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${greatVibes.variable} ${outfit.variable}`}
    >
      <body className="min-h-dvh bg-cream font-sans text-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}
