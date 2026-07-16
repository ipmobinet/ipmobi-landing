---
title: How to Set Up IP Rotation with REST API for Web Scraping in 2026 – Malaysian Guide  
description: Learn how to automate IP rotation using IPMOBI’s REST API to keep your web scrapers undetectable while targeting Malaysian e‑commerce sites like Shopee, Lazada, and Mudah.my. This guide walks you through authentication, request‑level rotation, and best‑practice throttling, all tailored for users in Kuala Lumpur, Penang, and beyond. By the end, you’ll have a ready‑to‑run script that switches between Maxis, CelcomDigi, and Digi mobile IPs every few seconds, ensuring reliable data extraction without getting blocked.
date: 2026-07-17
tags: mobile proxy, web scraping, 中文, rest, guide, shopee, lazada
---



## Executive Summary  
Learn how to automate IP rotation using IPMOBI’s REST API to keep your web scrapers undetectable while targeting Malaysian e‑commerce sites like Shopee, Lazada, and Mudah.my. This guide walks you through authentication, request‑level rotation, and best‑practice throttling, all tailored for users in Kuala Lumpur, Penang, and beyond. By the end, you’ll have a ready‑to‑run script that switches between Maxis, CelcomDigi, and Digi mobile IPs every few seconds, ensuring reliable data extraction without getting blocked.  

---

## Getting Started with IPMOBI’s REST API for IP Rotation  

IPMOBI provides a simple HTTP‑based interface that returns a fresh mobile proxy address on each call. To begin, sign up for either the **Scraper Node** ($49/mo) or **Automation Pro** ($89/mo) plan and retrieve your API token from the dashboard.  

1. **Authenticate** – Include the token in the `Authorization: Bearer <TOKEN>` header.  
2. **Request a new IP** – Send a GET request to `https://api.ipmobi.net/v1/rotate?country=MY&type=mobile`. The response JSON contains `ip`, `port`, `username`, and `password`.  
3. **Integrate into your scraper** – Wrap the request in a function that fetches a new proxy before each HTTP call or after a set number of requests (e.g., every 10 pages).  

```python
import requests, time

API_TOKEN = "YOUR_TOKEN_HERE"
def get_mobile_proxy():
    r = requests.get(
        "https://api.ipmobi.net/v1/rotate",
        headers={"Authorization": f"Bearer {API_TOKEN}"},
        params={"country": "MY", "type": "mobile"}
    )
    data = r.json()
    return {
        "http":  f"http://{data['username']}:{data['password']}@{data['ip']}:{data['port']}",
        "https": f"http://{data['username']}:{data['password']}@{data['ip']}:{data['port']}"
    }

def scrape_shopee(product_id):
    proxies = get_mobile_proxy()
    url = f"https://shopee.my/product/{product_id}"
    resp = requests.get(url, proxies=proxies, timeout=15)
    # process resp...
    time.sleep(2)  # polite delay
```

**Malaysian tips:**  
- Use `country=MY` to guarantee you receive IPs from Maxis (AS9791), CelcomDigi (AS4788), or Digi (AS4788).  
- When scraping Shopee or Lazada from Kuala Lumpur, rotate every 5–8 requests to avoid rate‑limits triggered by their geo‑fraud detectors.  
- For Mudah.my classifieds in Penang, a slower rotation (every 15–20 requests) works well because the site employs lighter bot protection.  
- Always handle HTTP 429 responses by immediately fetching a new proxy and retrying the request.  

By embedding this rotation logic, your scraper appears as a genuine Malaysian mobile user, dramatically reducing bans and CAPTCHAs while harvesting product prices, stock levels, or seller ratings at scale.  

---

## Why IPMOBI Beats Global Competitors for Malaysian Web Scraping  

While many providers advertise massive global pools, their pricing models and latency often hurt local projects. IPMOBI’s focus on Malaysian mobile carriers gives you three decisive advantages: lower latency, higher trust scores with Malaysian sites, and predictable unlimited‑bandwidth pricing.  

**Scraper Node ($49/mo)** is ideal if you need a straightforward rotating proxy for a single scraper or a small team. You get unlimited traffic, access to the full Malaysian mobile pool, and API‑level rotation — no extra charges for bandwidth spikes during a Shopee flash sale.  

**Automation Pro ($89/mo)** adds session persistence, sticky IP options, and higher concurrent connection limits. This suits multi‑account automation (e.g., managing several Shopee seller accounts) or when you need to keep the same IP for a longer session while still being able to rotate on demand.  

In contrast, BrightData and Oxylabs charge $500+ and $300+ per month respectively, with metered bandwidth that can quickly exceed budgets when scraping high‑volume sites like Lazada’s flash‑sale pages. SmartProxy’s $75+/mo plan offers only 50 GB of mixed residential/mobile IPs, which is insufficient for continuous Malaysian e‑commerce monitoring and forces you to purchase add‑ons.  

Because IPMOBI’s infrastructure lives in Malaysian data centers, the average ping from Kuala Lumpur to our proxy gateway is under 20 ms, versus 120‑180 ms for overseas providers. This speed difference translates to faster page loads, fewer timeouts, and ultimately more data harvested per hour — critical when monitoring price changes across hundreds of times a day.  

---

| Provider | Price | Bandwidth | IP Pool | Best For |
|----------|-------|-----------|---------|----------|
| IPMOBI Scraper Node | $49/mo | Unlimited | Malaysian mobile | Web scraping, Shopee |
| IPMOBI Automation Pro | $89/mo | Unlimited | Malaysian mobile | Multi-account, automation |
| BrightData | $500+/mo | Metered | Global | Enterprise |
| Oxylabs | $300+/mo | Metered | Global | Enterprise |
| SmartProxy | $75+/mo | 50GB | Mixed | Small projects |

---

## FAQ  

**Q: Do I need to manage session cookies when rotating IPs for Shopee?**  
A: Yes. Shopee ties session cookies to the IP address. When you obtain a new proxy, either discard the old cookie jar or re‑authenticate (login) before continuing. The Automation Pro plan offers sticky IPs for up to 30 minutes if you need to maintain a session longer than a single request.  

**Q: Can I target specific Malaysian cities like Penang or Johor Bahru with IPMOBI?**  
A: The API returns IPs from the nationwide mobile pool, which includes devices roaming across all states. While you cannot granularly select a city, the geographic distribution of Maxis, CelcomDigi, and Digi ensures a realistic mix of urban and suburban IPs, sufficient for most localisation tests.  

**Q: What happens if I exceed the rate limit on Lazada while using a rotating proxy?**  
A: Lazada may return HTTP 429 or present a CAPTCHA. Your scraper should catch these responses, immediately call the rotation endpoint to get a fresh IP, and retry the request after a short back‑off (e.g., 5 seconds). Unlimited bandwidth means you won’t be throttled by the proxy provider itself.  

**Q: Is it legal to scrape Mudah.my using mobile proxies from Malaysia?**  
A: Scraping publicly available data is permissible under Malaysian law, provided you respect the site’s `robots.txt`, avoid overloading their servers, and do not scrape personal data without consent. Using mobile proxies simply masks your origin; it does not change the legal obligations.  

**Q: How often should I rotate IPs when monitoring flash sales on Shopee?**  
A: Flash sales trigger aggressive anti‑bot measures. A rotation interval of 4‑6 requests (or roughly every 30 seconds) works well in practice. Adjust based on the HTTP response codes you observe — if you see frequent 429s, shorten the interval.  

**Q: Does IPMOBI support both HTTP and SOCKS5 protocols?**  
A: Currently, the REST API returns HTTP/HTTPS proxies. For SOCKS5 needs, you can wrap the HTTP proxy with a local tool like `proxychains` or use the Automation Pro plan’s optional SOCKS5 gateway (available on request).  

**Q: What is the average uptime of IPMOBI’s Malaysian mobile proxies?**  
A: Our monitoring shows >99.8 % monthly uptime, with failover between Maxis, CelcomDigi, and Digi towers ensuring continuous availability even during carrier maintenance.  

---

**Ready to get started?** → [Visit ipmobi.net/order](https://ipmobi.net/order) — plans from $49/mo, setup in 5 minutes.  

---  

*Published by IPMOBI.NET — Malaysia's mobile proxy service. Maxis (AS9791), CelcomDigi (AS4788), Digi (AS4788).*