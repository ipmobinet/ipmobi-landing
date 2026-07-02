import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Malaysian Mobile Proxy Guides & Tutorials | IPMOBI",
  description: "Expert guides on Malaysian mobile proxies, 4G/5G proxy setup, web scraping, Shopee/Lazada automation, social media farming. $49/mo.",
  openGraph: { title: "IPMOBI Blog", description: "Malaysian mobile proxy guides and tutorials", type: "website", url: "https://ipmobi.net/blog/" },
};

const posts = [
  { slug: "4g-proxy-for-shopee-seller-account", title: "4G Proxy for Shopee Seller Account Malaysia", excerpt: "Dedicated Malaysian 4G mobile proxy for Shopee seller accounts. $49/mo.", date: "July 3, 2026", tags: ["Shopee", "4G"] },
  { slug: "lazada-multi-login-proxy", title: "Lazada Multi-Login Proxy — Malaysian Mobile IP", excerpt: "Manage multiple Lazada seller accounts with dedicated Malaysian IPs.", date: "July 3, 2026", tags: ["Lazada", "multi-account"] },
  { slug: "dedicated-mobile-proxy-for-e-commerce", title: "Dedicated Mobile Proxy for E-Commerce Malaysia", excerpt: "1 modem = 1 shop. Dedicated Malaysian 4G/5G IPs for Shopee/Lazada.", date: "July 3, 2026", tags: ["e-commerce", "dedicated"] },
  { slug: "shopee-account-farming-proxy", title: "Shopee Account Farming Proxy Malaysia", excerpt: "Scale to 100+ Shopee accounts with dedicated Malaysian mobile proxies.", date: "July 3, 2026", tags: ["Shopee", "farming"] },
  { slug: "malaysia-proxy-for-dropshipping", title: "Malaysia Proxy for Dropshipping — Multi-Store Setup", excerpt: "Run multiple dropshipping stores on Shopee/Lazada with dedicated IPs.", date: "July 3, 2026", tags: ["dropshipping", "Shopee"] },
  { slug: "tiktok-live-proxy-malaysia", title: "TikTok Live Proxy Malaysia — 4G/5G Setup Guide", excerpt: "Stable Malaysian mobile IP for TikTok live streaming. No shadowbans.", date: "July 3, 2026", tags: ["TikTok", "live"] },
  { slug: "instagram-automation-proxy", title: "Instagram Automation Proxy Malaysia", excerpt: "Run Instagram automation bots with undetectable Malaysian 4G/5G IPs.", date: "July 3, 2026", tags: ["Instagram", "automation"] },
  { slug: "social-media-farming-with-mobile-proxies", title: "Social Media Farming with Malaysian Mobile Proxies", excerpt: "Scale TikTok, Instagram, Facebook account farms with dedicated IPs.", date: "July 3, 2026", tags: ["social media", "farming"] },
  { slug: "whatsapp-business-proxy-malaysia", title: "WhatsApp Business Proxy Malaysia 2026", excerpt: "Run multiple WhatsApp Business accounts without bans. $49/mo dedicated IP.", date: "July 3, 2026", tags: ["WhatsApp", "business"] },
  { slug: "facebook-ads-proxy-malaysia", title: "Facebook Ads Proxy Malaysia — Multi-Account Setup", excerpt: "Run multiple FB ad accounts with dedicated Malaysian 4G/5G mobile IPs.", date: "July 3, 2026", tags: ["Facebook", "ads"] },
  { slug: "what-is-malaysian-mobile-proxy", title: "What Is a Malaysian Mobile Proxy? Complete Guide", excerpt: "Everything about Malaysian mobile proxies — how they work, carriers, pricing.", date: "April 29, 2026", tags: ["guide", "beginner"] },
  { slug: "shopee-account-ban-avoid-zh", title: "Shopee账号被封怎么办？防封终极指南 — 中文", excerpt: "Shopee多账号防关联完整教程。8种检测方式详解。$49/月起。", date: "2026年7月2日", tags: ["中文", "Shopee"] },
  { slug: "shopee-lazada-duozhanghao-zh", title: "Shopee & Lazada 多账号防关联指南 — 中文", excerpt: "马来西亚4G移动代理防止Shopee/Lazada跨账号封禁。", date: "2026年7月2日", tags: ["中文", "Lazada"] },
  { slug: "socks5-mobile-proxy-malaysia", title: "SOCKS5 Mobile Proxy Malaysia — UDP/TCP Support", excerpt: "Full SOCKS5 protocol support on Malaysian 4G/5G mobile IPs. $49/mo.", date: "July 3, 2026", tags: ["SOCKS5", "technical"] },
];

export default function BlogIndex() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24">
      <div className="mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">IPMOBI Blog</h1>
        <p className="text-lg text-slate-400 max-w-2xl">
          Expert guides on Malaysian mobile proxies — web scraping, e-commerce automation, social media farming.
          From Shah Alam, Malaysia. $49/mo dedicated modem.
        </p>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Blog",
        "name": "IPMOBI Blog", "url": "https://ipmobi.net/blog/",
        "publisher": { "@type": "Organization", "name": "IPMOBI.NET", "url": "https://ipmobi.net" },
      }) }} />

      <div className="grid gap-8">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}/`}
            className="group block p-6 rounded-xl bg-surface-card border border-surface-border hover:border-emerald-500/30 transition-all">
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag: string) => (
                <span key={tag} className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs">{tag}</span>
              ))}
            </div>
            <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">{post.title}</h2>
            <p className="text-slate-400 text-sm mb-3">{post.excerpt}</p>
            <span className="text-slate-600 text-xs">{post.date}</span>
          </Link>
        ))}
      </div>

      <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Ready to try Malaysian mobile proxies?</h3>
        <p className="text-slate-400 mb-6">15-minute free trial — no credit card. Dedicated 4G/5G modem with real carrier IP.</p>
        <a href="/trial/" className="px-8 py-3 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-all">Start Free Trial</a>
      </div>
    </div>
  );
}
