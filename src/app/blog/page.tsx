import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Malaysian Mobile Proxy Guides & Tutorials | IPMOBI",
  description: "Expert guides on Malaysian mobile proxies, 4G/5G proxy setup, web scraping, Shopee/Lazada automation, social media farming, and more. From $49/mo.",
  openGraph: {
    title: "IPMOBI Blog — Malaysian Mobile Proxy Guides",
    description: "Expert guides on mobile proxies, web scraping, e-commerce automation, and more.",
    type: "website",
    url: "https://ipmobi.net/blog",
  },
};

const posts = [
  {
    slug: "what-is-malaysian-mobile-proxy",
    title: "What Is a Malaysian Mobile Proxy? Complete Guide (2026)",
    excerpt: "Everything you need to know about Malaysian mobile proxies — how they work, why they beat datacenter proxies, and how to get started.",
    date: "April 29, 2026",
    tags: ["guide", "beginner"],
  },
  {
    slug: "malaysia-proxy-web-scraping",
    title: "Malaysia Proxy Web Scraping: Complete Guide (2026)",
    excerpt: "Complete guide to web scraping with Malaysian mobile proxies — avoid blocks on Shopee, Lazada, and property sites.",
    date: "July 2, 2026",
    tags: ["web scraping", "guide"],
  },
  {
    slug: "malaysia-mobile-proxy-shopee-lazada-automation",
    title: "Shopee & Lazada Multi-Account Automation with Malaysian 4G Proxies",
    excerpt: "Scale your Shopee and Lazada seller accounts with dedicated Malaysian mobile IPs — never get cross-account banned.",
    date: "July 2, 2026",
    tags: ["e-commerce", "Shopee", "Lazada"],
  },
  {
    slug: "social-media-automation-proxy-malaysia",
    title: "Social Media Automation with Malaysian Mobile Proxies (2026)",
    excerpt: "Run TikTok, Instagram, and Facebook account farms on real Malaysian 4G/5G mobile IPs. Avoid shadowbans and device fingerprinting.",
    date: "July 2, 2026",
    tags: ["social media", "TikTok", "Instagram"],
  },
  {
    slug: "4g-proxy-shopee-lazada-malaysia",
    title: "4G Proxy for Shopee & Lazada — Malaysian Mobile IP Guide",
    excerpt: "How Malaysian sellers use dedicated 4G proxy IPs to protect their Shopee and Lazada stores from cross-account bans.",
    date: "July 2, 2026",
    tags: ["4G", "Shopee", "Lazada"],
  },
  {
    slug: "malaysia-mobile-proxy-advantage",
    title: "The Malaysian Mobile Proxy Advantage: Why Local IPs Win",
    excerpt: "Why Malaysian mobile proxies outperform datacenter proxies for Southeast Asian e-commerce, scraping, and automation.",
    date: "July 2, 2026",
    tags: ["comparison", "guide"],
  },
];

export default function BlogIndex() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24">
      <div className="mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">IPMOBI Blog</h1>
        <p className="text-lg text-slate-400 max-w-2xl">
          Expert guides on Malaysian mobile proxies — web scraping, e-commerce automation, social media farming, and more.
          All from our Shah Alam data center.
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "IPMOBI Blog",
            "description": "Expert guides on Malaysian mobile proxies and proxy infrastructure",
            "url": "https://ipmobi.net/blog",
            "publisher": { "@type": "Organization", "name": "IPMOBI.NET", "url": "https://ipmobi.net" },
          }),
        }}
      />

      <div className="grid gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block p-6 rounded-xl bg-surface-card border border-surface-border hover:border-emerald-500/30 transition-all"
          >
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs">
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
              {post.title}
            </h2>
            <p className="text-slate-400 text-sm mb-3">{post.excerpt}</p>
            <span className="text-slate-600 text-xs">{post.date}</span>
          </Link>
        ))}
      </div>

      <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Want to try Malaysian mobile proxies?</h3>
        <p className="text-slate-400 mb-6">15-minute free trial — no credit card. Dedicated 4G/5G modem with real carrier IP.</p>
        <a href="/trial" className="px-8 py-3 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-all">
          Start Free Trial
        </a>
      </div>
    </div>
  );
}
