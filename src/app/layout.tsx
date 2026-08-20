import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HARLOW — A Motorcycle Brand, Reimagined in Bloom",
  description:
    "What if a legendary motorcycle marque never built engines — and built a fragrance house instead? Harlow reimagines the open road as bespoke florals, rare fragrances, and hand-poured candles for those who demand the extraordinary.",
  keywords: "luxury flowers, perfume, fragrance, candles, floral, premium, reimagined brand",
  openGraph: {
    title: "HARLOW — A Motorcycle Brand, Reimagined in Bloom",
    description: "The rebel spirit of the open road, reimagined as luxury florals, perfume & candles.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
