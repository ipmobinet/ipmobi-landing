import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/providers/LanguageProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiveChatWidget from "@/components/LiveChatWidget";

export const metadata: Metadata = {
  title: "IPMobi | Enterprise Mobile Proxies",
  description:
    "🇲🇾 Malaysian mobile proxy service from Shah Alam. Dedicated 4G/5G modems with real carrier SIMs (Maxis, Celcom, Digi). API-driven IP rotation, unlimited bandwidth, no sharing. Physical hardware proxy infrastructure for e-commerce, scraping, and social media automation.",
  openGraph: {
    title: "IPMobi | Enterprise Malaysian Mobile Proxies",
    description:
      "Deploy dedicated mobile proxies with 1:1 physical modem mapping. Real carrier ASNs, zero VM overlap. Malaysian 4G/5G proxy infrastructure from Shah Alam — API-driven IP rotation, unlimited bandwidth, physical hardware.",
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
    languages: {
      "en": "https://ipmobi.net",
      "zh": "https://ipmobi.net",
      "ru": "https://ipmobi.net",
      "ja": "https://ipmobi.net",
      "ko": "https://ipmobi.net",
      "vi": "https://ipmobi.net",
      "th": "https://ipmobi.net",
      "id": "https://ipmobi.net",
      "ms": "https://ipmobi.net",
      "hi": "https://ipmobi.net",
      "ar": "https://ipmobi.net",
      "pt": "https://ipmobi.net",
      "es": "https://ipmobi.net",
      "de": "https://ipmobi.net",
      "fr": "https://ipmobi.net",
    },
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://ipmobi.net/#website",
          "name": "IPMobi",
          "url": "https://ipmobi.net",
          "description": "Malaysian mobile proxy service with dedicated 4G/5G hardware modems in Shah Alam. Real carrier SIMs, API rotation, unlimited bandwidth.",
          "inLanguage": "en",
          "publisher": {
            "@type": "Organization",
            "name": "GreenTech Network",
            "url": "https://ipmobi.net",
            "areaServed": "Malaysia"
          }
        },
        {
          "@type": "FAQPage",
          "@id": "https://ipmobi.net/#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is a mobile proxy?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A mobile proxy routes your traffic through a real 4G/5G mobile modem with a genuine carrier SIM card. Unlike datacenter proxies, mobile IPs come from real cellular networks (Maxis, Celcom, Digi in Malaysia) and are much harder for anti-bot systems to detect and block."
              }
            },
            {
              "@type": "Question",
              "name": "How is IPMobi different from other proxy services?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "IPMobi uses dedicated physical 4G/5G modems — one modem per port. Your IP is never shared with anyone else. We operate our own hardware in a Shah Alam data center. Most proxy services resell VMs or cloud IPs; we sell real Malaysian mobile infrastructure."
              }
            },
            {
              "@type": "Question",
              "name": "Do you offer a free trial?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. IPMobi offers a 15-minute free trial with 100MB of bandwidth. No credit card required. Sign in with Google or GitHub to get instant access to a dedicated mobile proxy port."
              }
            },
            {
              "@type": "Question",
              "name": "Which Malaysian mobile carriers do you use?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We use Maxis, Celcom, and Digi SIM cards in our physical modems. Each modem gets a real carrier-assigned IP address with a native Malaysian ASN."
              }
            },
            {
              "@type": "Question",
              "name": "Can I rotate my IP address?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Manual IP rotation is available on all plans. The Automation Pro and Enterprise plans include REST API-based automatic IP rotation that changes your IP in under 3 seconds."
              }
            }
          ]
        }
      ]
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

          {/* Floating Telegram Button */}
          <a
            href="https://t.me/IPMobiNetBot"
            target="_blank"
            rel="noopener noreferrer"
            className="telegram-float"
            aria-label="Contact us on Telegram"
          >
            <span className="pulse" />
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.127.087.669.087.669l-1.488 7.013c-.123.555-.456.69-.771.44-.346-.275-2.148-1.4-2.574-1.666-.346-.216-.688-.324-.06-.58l3.123-2.1c.34-.25.174-.535-.19-.314l-4.656 3c-.29.175-.554.1-.647-.12l-1.26-3.123c-.225-.543.107-.766.44-.913.28-.123.547-.17.855-.034l4.198 1.685c.36.128.69-.043.542-.33L8.557 8.137c-.165-.307.034-.648.335-.733.53-.154 1-.333 1.677-.546.688-.218 1.288-.412 1.755-.662.54-.293.72-.12.72-.12s.273.048.462.132z"/>
            </svg>
          </a>

          {/* Live Chat Widget */}
          <LiveChatWidget />

          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
