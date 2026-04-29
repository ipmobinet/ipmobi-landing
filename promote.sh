#!/bin/bash
# ──────────────────────────────────────────────────────────────
# IPMobi.net Promotion Toolkit
# Boss's auto-promotion scripts for Shah Alam proxy business
# ──────────────────────────────────────────────────────────────

case "${1:-help}" in

  # ── 1. Facebook Posts ─────────────────────────────────────
  fb-shopee)
    echo "📱 Facebook Post — For Shopee Seller Groups"
    echo ""
    echo "Copy this:"
    echo ""
    cat << 'ENDPOST'
【马来西亚本地移动IP — 管理多个Shopee店铺不再被关联封号】

我们在 Shah Alam 拥有实体硬件机房，不是外面的 VM 共享 IP。

✅ 1个端口 = 1台物理4G/5G调制解调器 = 1个真实手机IP
✅ 支持Shopee/Lazada/TikTok Shop多店铺管理
✅ 无限流量，API自动切换IP
✅ 提供15分钟免费试用，先试再买

📌 适合：Shopee卖家、Lazada卖家、TikTok主播、数据采集

有兴趣的可以私信我免费试用 👇
https://ipmobi.net
ENDPOST
    ;;

  fb-english)
    echo "📘 Facebook Post — English (for proxy/scraper groups)"
    echo ""
    echo "Copy this:"
    echo ""
    cat << 'ENDPOST'
🇲🇾 Need Real Malaysian Mobile IPs?

IPMobi.net — Hardware-backed mobile proxies from Shah Alam, Malaysia.

✅ Dedicated physical 4G/5G modem per port (no VMs, no sharing)
✅ Real carrier ASNs (Maxis, Celcom, Digi)
✅ Unlimited bandwidth, no per-GB billing
✅ API-driven IP rotation under 3 seconds
✅ 15-minute free trial available

Who it's for:
• Shopee / Lazada sellers managing multiple accounts
• Sneaker bots needing clean residential IPs  
• Web scrapers hitting anti-bot walls
• Social media account farming

Try for free: https://ipmobi.net
DM me for custom enterprise setups (10+ modems)
ENDPOST
    ;;

  # ── 2. BlackHatWorld BST ──────────────────────────────────
  bhw)
    echo "🖤 BlackHatWorld — 'Selling Mobile Proxies' Post"
    echo ""
    echo "Go to: https://www.blackhatworld.com/forums/selling-proxies.284/post-thread"
    echo ""
    echo "Thread Title:"
    echo "  [Selling] 🇲🇾 Malaysian Mobile 4G/5G Proxies — Real Hardware, Physical Modems, API Rotation"
    echo ""
    echo "Thread Body:"
    echo ""
    cat << 'ENDPOST'
Thread Title: [Selling] 🇲🇾 Malaysian Mobile 4G/5G Proxies — Real Hardware, Physical Modems, API Rotation

About Me:
I run a physical data center in Shah Alam, Selangor, Malaysia. I don't resell botnet IPs or VM slices. Every proxy port connects to a real 4G/5G USB modem with a genuine carrier SIM card (Maxis, Celcom, Digi).

What You Get:
• 1:1 Physical Modem Mapping — Your port = your modem. No sharing.
• Native Mobile IPs — Real carrier ASNs, not datacenter IPs.
• Unlimited Bandwidth — No throttling, no per-GB charges.
• Protocol Agnostic — SOCKS5, HTTP(s), UDP all supported.
• Instant IP Rotation — REST API rotates your IP in <3 seconds (hardware-level).

Pricing:
• Scraper Node — $65/port/month (1 dedicated modem, unlimited bandwidth, manual rotation)
• Automation Pro — $130/port/month (all above + API auto-rotation, high concurrency)
• Enterprise — Custom pricing for 10+ modems (carrier targeting, dedicated farm)

Free Trial:
• 15 minutes, 100MB — test before you buy
• No credit card required
• https://ipmobi.net

Payment: Crypto / Bank Transfer / TNG

Contact: https://ipmobi.net or DM me here
ENDPOST
    ;;

  # ── 3. LowEndTalk ─────────────────────────────────────────
  lowendtalk)
    echo "💬 LowEndTalk Post"
    echo ""
    echo "Go to: https://lowendtalk.com/categories/offers"
    echo ""
    echo "Title: 🇲🇾 Malaysian Mobile 4G/5G Proxies — Physical Modems, $65/mo, Shah Alam DC"
    echo ""
    echo "Body:"
    echo ""
    cat << 'ENDPOST'
Posting from Shah Alam, Malaysia. Running a small data center with 4G/5G USB modems.

What makes mine different:
• Real modems with real SIMs — not VMs or AWS
• Actual carrier IPs (Maxis, Celcom, Digi) — not cloud IPs
• $65/month for a dedicated port with UNLIMITED bandwidth

Free trial: https://ipmobi.net (15 min, no CC needed)

More details: Scraper Node $65/mo | Automation Pro $130/mo | Enterprise custom
ENDPOST
    ;;

  # ── 4. Telegram Groups ────────────────────────────────────
  telegram)
    echo "✈️ Telegram Posts"
    echo ""
    echo "Groups to join and post in:"
    echo "  t.me/shopeemalaysia"
    echo "  t.me/proxysellers"
    echo "  t.me/sneakerbotdiscussion"
    echo "  t.me/webscraping"
    echo ""
    echo "Draft message:"
    echo ""
    cat << 'ENDPOST'
🇲🇾 Malaysian Mobile Proxies — Real Hardware in Shah Alam

Need clean mobile IPs for Shopee, Lazada, TikTok, or scraping?
We run physical 4G/5G modems at our Shah Alam data center.

→ 1 port = 1 physical modem = 1 genuine carrier IP
→ Unlimited bandwidth
→ API rotation in seconds
→ Free 15-min trial at ipmobi.net

DM for enterprise setups (10+ modems, custom carriers).
ENDPOST
    ;;

  # ── 5. Reddit ─────────────────────────────────────────────
  reddit)
    echo "🤖 Reddit Posts"
    echo ""
    echo "Subreddits: r/sneakerbots, r/webscraping, r/shoebots, r/shopee"
    echo ""
    echo "These subreddits usually ban direct selling, so post HELPFUL CONTENT:"
    echo ""
    echo "--- r/webscraping post ---"
    echo "Title: How I solved Cloudflare blocking with Malaysian mobile proxies"
    echo ""
    echo "Body:"
    cat << 'ENDPOST'
I run a proxy service in Malaysia (ipmobi.net) but here's a useful breakdown:

The problem with most cheap proxy services:
1. They use datacenter IPs — instantly blocked
2. They resell the same IPs to 50+ people — you get rate limited
3. They charge per GB — expensive for heavy scraping

What actually works for Malaysian targets:
• Physical 4G/5G modems (real carrier ASNs)
• 1:1 port mapping (your IP isn't shared)
• API-based rotation (rotate on block in <3 seconds)

I built this for my own Shopee scraping operation and it worked, so I opened it up.

Free trial if anyone wants to test: https://ipmobi.net
ENDPOST
    ;;

  # ── 6. Direct DM Template ────────────────────────────────
  dm)
    echo "✉️ Direct Message Template (for Shopee/Lazada sellers)"
    echo ""
    echo "Use this to DM sellers on FB or Shopee:"
    echo ""
    cat << 'ENDPOST'
Hi, I run a mobile proxy service in Shah Alam with physical 4G/5G modems.

If you're managing multiple Shopee/Lazada accounts and dealing with account banning issues — our real mobile IPs can help. Each port gets its own dedicated modem with a genuine Malaysian carrier SIM.

Free 15-minute trial available, no strings attached.

https://ipmobi.net

Thanks,
Boss
ENDPOST
    ;;

  # ── Help ──────────────────────────────────────────────────
  *)
    echo "IPMobi Promotion Toolkit"
    echo "Usage: ./promote.sh <target>"
    echo ""
    echo "Targets:"
    echo "  fb-shopee       Chinese FB post for Shopee seller groups"
    echo "  fb-english      English FB post for proxy/scraper groups"
    echo "  bhw             BlackHatWorld marketplace listing"
    echo "  lowendtalk      LowEndTalk offer post"
    echo "  telegram        Telegram group message"
    echo "  reddit          Reddit helpful content post"
    echo "  dm              Direct message template"
    echo ""
    echo "Example: ./promote.sh fb-shopee"
    ;;
esac
