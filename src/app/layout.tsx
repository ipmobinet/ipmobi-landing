import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/providers/LanguageProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "IPMobi | Enterprise Mobile Proxies",
  description:
    "Raw mobile IP infrastructure from Shah Alam's premier data center. Dedicated physical modems, real carrier ASNs, protocol-agnostic routing, and unlimited bandwidth.",
  openGraph: {
    title: "IPMobi | Enterprise Mobile Proxies",
    description:
      "Deploy dedicated mobile proxies with 1:1 physical modem mapping. Real carrier ASNs, zero VM overlap, protocol-agnostic traffic routing.",
    url: "https://ipmobi.net",
    siteName: "IPMobi",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IPMobi | Enterprise Mobile Proxies",
    description:
      "Raw mobile IP infrastructure from Shah Alam's premier data center. Dedicated modems, real carrier ASNs, unlimited bandwidth.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://ipmobi.net",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "IPMobi",
      url: "https://ipmobi.net",
      description:
        "Enterprise mobile proxy infrastructure with dedicated physical modems, real carrier ASNs, and API-driven IP rotation from Shah Alam, Malaysia.",
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#030712] text-slate-300">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
