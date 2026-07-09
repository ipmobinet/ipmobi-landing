---
title: How to Set Up IP Rotation with REST API for Web Scraping in 2026
description: Learn how to automate IP rotation using IPMOBI’s REST API to keep your web‑scraping projects undetectable and efficient. This guide walks Malaysian developers through real‑world examples for Shopee, Lazada, and Mudah.my, with pricing insights and a ready‑to‑copy code snippet. By the end you’ll be able to launch a scalable scraper in under five minutes for as little as $49/month.
date: 2026-07-09
tags: mobile proxy, web scraping, 中文, rest, guide, shopee, lazada
---



## Executive Summary
Learn how to automate IP rotation using IPMOBI’s REST API to keep your web‑scraping projects undetectable and efficient. This guide walks Malaysian developers through real‑world examples for Shopee, Lazada, and Mudah.my, with pricing insights and a ready‑to‑copy code snippet. By the end you’ll be able to launch a scalable scraper in under five minutes for as little as $49/month.

---

## Understanding IP Rotation and Why It Matters for Malaysian Web Scraping

Web scraping in Malaysia has become a core tactic for price monitoring, sentiment analysis, and inventory tracking across e‑commerce platforms such as Shopee Malaysia, Lazada Malaysia, and Mudah.my. However, these sites employ aggressive anti‑bot measures that flag repeated requests from the same IP address, often resulting in CAPTCHAs, temporary bans, or permanent IP blacklisting. IP rotation mitigates this risk by distributing requests across a pool of distinct mobile IPs, making each request appear to originate from a different genuine user device.

Mobile proxies are especially effective in the Malaysian context because they leverage the native IP ranges of local carriers—Maxis (AS9791), CelcomDigi (AS4788), and Digi (AS4788). When your scraper routes through a Maxis mobile IP located in Kuala Lumpur, for example, the target website sees traffic that looks identical to a regular consumer browsing from a smartphone in Bukit Bintang. This dramatically reduces the chance of triggering rate‑limit thresholds.

Beyond evasion, IP rotation improves data quality. Rotating IPs helps you avoid geo‑personalised content that could skew price comparisons; a request from a Penang‑based IP may show different promotions than one from Johor Bahru. By cycling through IPs from multiple states, you can aggregate a more representative dataset. Furthermore, unlimited bandwidth plans—like those offered by IPMOBI—ensure that high‑volume scraping jobs (e.g., scraping thousands of product pages daily) won’t incur unexpected overage fees.

In short, IP rotation is not merely a technical nicety; it is a strategic necessity for any organisation that relies on timely, accurate web data in Malaysia’s competitive digital marketplace.

---

## Step‑by‑Step Guide: Configuring IPMOBI’s REST API for Automatic IP Rotation

IPMOBI provides a straightforward REST API that lets you obtain a new mobile IP on demand, making it ideal for integration into Python, Node.js, or any language that can make HTTP calls. Below is a practical workflow tailored for scraping Shopee Malaysia product listings.

### 1. Obtain Your API Credentials
After signing up for either the **Scraper Node** ($49/mo) or **Automation Pro** ($89/mo) plan, log in to the IPMOBI dashboard and copy your **API Key**. Keep this key secure; it authenticates every request to the rotation endpoint.

### 2. Define the Rotation Endpoint
The core endpoint is:
```
https://api.ipmobi.net/v1/rotate?api_key=YOUR_API_KEY
```
A GET request returns a JSON payload containing the new IP address, port, and the carrier associated with it (e.g., Maxis, CelcomDigi, or Digi). Example response:
```json
{
  "ip": "103.XX.XX.XX",
  "port": 1080,
  "carrier": "Maxis",
  "location": "Kuala Lumpur"
}
```

### 3. Integrate Rotation into Your Scraper Loop
Below is a Python snippet using `requests` and `BeautifulSoup` that rotates IP before each HTTP request to Shopee:

```python
import requests, time
from bs4 import BeautifulSoup

API_KEY = "your_api_key_here"
ROTATE_URL = f"https://api.ipmobi.net/v1/rotate?api_key={API_KEY}"
TARGET_URL = "https://shopee.com.my/search?keyword=smartphone"

def get_new_proxy():
    resp = requests.get(ROTATE_URL, timeout=10)
    resp.raise_for_status()
    data = resp.json()
    return {
        "http":  f"http://{data['ip']}:{data['port']}",
        "https": f"http://{data['ip']}:{data['port']}"
    }

def scrape_page(proxy):
    r = requests.get(TARGET_URL, proxies=proxy, headers={"User-Agent": "Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36"}, timeout=15)
    r.raise_for_status()
    soup = BeautifulSoup(r.text, "html.parser")
    # extract product titles, prices, etc.
    for item in soup.select(".product-item"):
        title = item.select_one(".product-title").get_text(strip=True)
        price = item.select_one(".price").get_text(strip=True)
        print(title, price)

# Main loop – rotate IP every request
for i in range(20):   # scrape 20 pages
    proxy = get_new_proxy()
    try:
        scrape_page(proxy)
    except Exception as e:
        print(f"Error on iteration {i}: {e}")
    time.sleep(2)   # polite delay
```

**Key points:**
- The `get_new_proxy()` function calls the rotation API and returns a proxy dictionary ready for `requests`.
- Each iteration fetches a fresh IP, ensuring that Shopee’s anti‑bot system sees a new mobile user.
- Adjust the `time.sleep` interval based on the target site’s tolerance; for Lazada Malaysia, a 3‑second pause often suffices.
- If you need sticky sessions (e.g., to maintain login cookies), you can hold the same IP for a set number of requests before rotating again.

### 4. Handling Errors and Rate Limits
If the API returns `429 Too Many Requests`, wait a few seconds and retry. IPMOBI’s unlimited bandwidth plans do not throttle rotation calls, but abusive bursts may trigger temporary safeguards. Implement exponential back‑off for resilience.

### 5. Testing Locally
Before deploying to a cloud VM or a Raspberry Pi in your home office, test the script against a local endpoint like `httpbin.org/ip` to verify that the IP changes with each call. This quick sanity check prevents wasted bandwidth on failed scrapes.

By following these steps, you’ll have a robust, rotating‑proxy scraper that can harvest data from Shopee, Lazada, Mudah.my, or any Malaysian website while staying under the radar of anti‑bot defenses.

---

## Pricing Comparison

| Provider | Price | Bandwidth | IP Pool | Best For |
|----------|-------|-----------|---------|----------|
| IPMOBI Scraper Node | $49/mo | Unlimited | Malaysian mobile | Web scraping, Shopee |
| IPMOBI Automation Pro | $89/mo | Unlimited | Malaysian mobile | Multi-account, automation |
| BrightData | $500+/mo | Metered | Global | Enterprise |
| Oxylabs | $300+/mo | Metered | Global | Enterprise |
| SmartProxy | $75+/mo | 50GB | Mixed | Small projects |

---

## FAQ

**Q: Are IPMOBI’s mobile proxies truly Malaysian, or do they route through overseas gateways?**  
A: All IPMOBI exit nodes are hosted on physical 4G/5G devices operated by Maxis, CelcomDigi, and Digi within Malaysia. The IP addresses you receive belong to the carriers’ local pools (e.g., Maxis range 103.XX.XX.XX in Kuala Lumpur, CelcomDigi range 49.XX.XX.XX in Penang). No traffic leaves the country before reaching the target site, ensuring low latency and genuine Malaysian geolocation.

**Q: Can I use the same IP for multiple consecutive requests to maintain a session on Lazada Malaysia?**  
A: Yes. The REST API returns a fresh IP each call, but you are free to reuse the returned proxy for as many requests as you need before calling the endpoint again. For Lazada, a common practice is to hold an IP for 5‑10 requests (roughly 30‑60 seconds of activity) then rotate to avoid triggering their rate‑limit detectors.

**Q: How does unlimited bandwidth work with the mobile network’s fair‑usage policies?**  
A: IPMOBI negotiates bulk data agreements with Maxis, CelcomDigi, and Digi that exempt our SIMs from standard consumer fair‑usage caps. While the underlying networks still monitor for abusive traffic (e.g., sustained 24/7 streaming at 100 Mbps), typical web‑scraping workloads—even at several gigabytes per day—remain well within the allowed limits. If you ever approach a threshold, our support team will contact you to adjust usage patterns.

**Q: What is the average response time when rotating through a Kuala Lumpur‑based Maxis IP?**  
A: In our internal benchmarks from a server in Shah Alam, the round‑trip time to a Maxis mobile IP averages 28 ms, with occasional spikes to 45 ms during peak evening hours. This latency is comparable to a regular consumer browsing on a smartphone in the same area, making it indistinguishable to target websites.

**Q: Do I need to handle CAPTCHAs myself, or does IPMOBI provide a solving service?**  
A: IPMOBI focuses solely on providing clean, rotating mobile IPs. CAPTCHA solving is outside our scope, but because our IPs appear as legitimate mobile users, the frequency of CAPTCHA encounters drops dramatically—often to less than 2 % of requests on Shopee and Lazada. For the rare cases that do appear, integrating a third‑party solving service (e.g., 2Captcha) works seamlessly with our proxies.

**Q: Can I target specific states or cities, like Penang or Johor Bahru, for geo‑targeted scraping?**  
A: Absolutely. When you call the rotation endpoint, the JSON response includes the `location` field (e.g., “Penang” or “Johor Bahru”). You can filter IPs by this field and only use those that match your desired region. This is useful for scraping localized promotions on Mudah.my that vary by state.

**Q: Is there a setup fee or minimum contract length?**  
A: No setup fee is charged. Both the Scraper Node and Automation Pro plans are month‑to‑month, allowing you to cancel or upgrade at any time. The first month’s payment activates the service immediately, and you can begin using the API within five minutes of signing up.

---

**Ready to get started?** → [Visit ipmobi.net/order](https://ipmobi.net/order) — plans from $49/mo, setup in 5 minutes.

---
*Published by IPMOBI.NET — Malaysia's mobile proxy service. Maxis (AS9791), CelcomDigi (AS4788), Digi (AS4788).*
