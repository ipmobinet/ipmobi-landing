---
title: How to Set Up IP Rotation with REST API for Web Scraping in 2026 – Malaysian Guide  
description: Learn how to automate IP rotation using IPMOBI’s REST API so your web scrapers stay undetected on Malaysian sites like Shopee, Lazada and Mudah.my. This guide walks you through obtaining an API key, configuring rotation intervals, and integrating the service with a Python scraper for reliable, unlimited‑bandwidth data collection from Kuala Lumpur to Penang.
date: 2026-08-01
tags: mobile proxy, web scraping, 中文, rest, guide, shopee, lazada
---



## Executive Summary  
Learn how to automate IP rotation using IPMOBI’s REST API so your web scrapers stay undetected on Malaysian sites like Shopee, Lazada and Mudah.my. This guide walks you through obtaining an API key, configuring rotation intervals, and integrating the service with a Python scraper for reliable, unlimited‑bandwidth data collection from Kuala Lumpur to Penang.  

---  

## Why IP Rotation Matters for Malaysian Web Scraping  

Malaysian e‑commerce platforms have tightened anti‑bot measures in recent years. Shopee Malaysia, for example, employs device‑fingerprinting and rate‑limit checks that trigger CAPTCHAs after a handful of requests from the same IP address. Lazada’s Kuala Lumpur‑based servers monitor request patterns per subnet, while Mudah.my’s classifieds backend flags rapid successive posts from a single mobile carrier. When you scrape from a static IP, you quickly hit these thresholds, resulting in blocked requests, incomplete data, or even account bans.  

Using Malaysian mobile IPs solves two problems at once. First, the IPs belong to real cellular networks — Maxis (AS9791), CelcomDigi (AS4788) and Digi (AS4788) — making traffic look like genuine user activity from Kuala Lumpur, Penang, Johor Bahru or any other city. Second, mobile carriers frequently rotate their NAT pools, so each request appears to come from a different subscriber, which dramatically reduces the chance of being flagged.  

IPMOBI’s Scraper Node plan gives you unlimited bandwidth on a pool of Malaysian mobile IPs sourced directly from these carriers. By rotating IPs every few seconds or after a set number of requests, you mimic natural browsing behaviour. For instance, a scraper targeting Shopee’s product listings in Kuala Lumpur can request 10 pages, rotate to a new IP from CelcomDigi, then continue — keeping the request rate well below the threshold that triggers a challenge. The same approach works for Lazada’s flash‑sale pages in Penang, where inventory updates happen every minute, and for Mudah.my’s property listings, where posting frequency is high but detection is aggressive.  

In short, IP rotation with a local mobile proxy provider transforms a brittle scraper into a resilient data‑gathering tool that can run 24/7 without manual intervention, delivering complete datasets for price monitoring, sentiment analysis, or inventory tracking across Malaysia’s major online marketplaces.  

---  

## Step‑by‑Step: Configuring IPMOBI’s REST API for Automatic IP Rotation  

### 1. Obtain Your API Credentials  
Log in to the IPMOBI dashboard at https://ipmobi.net/dashboard, navigate to **API Keys**, and click **Generate New Key**. Copy the token; you’ll need it for every request. Store it securely — never hard‑code it in a public repository.  

### 2. Understand the Rotation Endpoint  
IPMOBI exposes a simple GET endpoint:  

```
https://api.ipmobi.net/v1/rotate?token=YOUR_TOKEN
```  

Calling this URL returns a JSON payload with the newly assigned IP address, port, and the carrier providing it. Example response:  

```json
{
  "ip": "103.5.142.87",
  "port": 1080,
  "carrier": "Maxis",
  "asn": 9791,
  "location": "Kuala Lumpur, MY"
}
```  

### 3. Automate Rotation in Your Scraper  
Below is a Python snippet that integrates the rotation call with a requests‑based scraper targeting Shopee Malaysia. The script rotates IP after every 15 requests (adjust based on your target’s tolerance).  

```python
import time
import requests

API_TOKEN = "your_token_here"
BASE_URL = "https://api.ipmobi.net/v1/rotate"
TARGET = "https://shopee.com.my/search?keyword=smartphone"

def get_proxy():
    resp = requests.get(BASE_URL, params={"token": API_TOKEN})
    resp.raise_for_status()
    data = resp.json()
    return {
        "http": f"http://{data['ip']}:{data['port']}",
        "https": f"http://{data['ip']}:{data['port']}"
    }

def fetch_page(session, url, proxy):
    return session.get(url, proxies=proxy, timeout=15)

session = requests.Session()
request_count = 0
proxy = get_proxy()

while request_count < 200:   # example limit
    try:
        r = fetch_page(session, TARGET, proxy)
        if r.status_code == 200:
            # parse r.content here …
            pass
        else:
            print(f"Non‑200 status: {r.status_code}")
    except Exception as e:
        print(f"Request failed: {e}")
        # On failure, rotate immediately and retry
        proxy = get_proxy()
        continue

    request_count += 1
    if request_count % 15 == 0:   # rotate every 15 requests
        proxy = get_proxy()
        time.sleep(2)             # polite pause to avoid bursts
```

**Key points:**  
- The `get_proxy()` function hits the rotation API and returns a proxy dictionary ready for `requests`.  
- After a defined number of successful requests, we call the API again to fetch a fresh IP.  
- Errors trigger an immediate rotation, preventing the scraper from staying on a blacklisted address.  
- The `time.sleep(2)` call introduces a short delay, further mimicking human behaviour and reducing the chance of hitting rate limits.  

### 4. Handling Session Persistence  
Some sites rely on cookies for session continuity. To keep cookies while rotating IPs, create a new `requests.Session()` only when you need to clear cookies (e.g., after logging out). Otherwise, reuse the same session object and simply update its `proxies` attribute with the new proxy dictionary.  

### 5. Monitoring and Logging  
Log each rotation event: timestamp, new IP, carrier, and location. This helps you verify that IPs are indeed changing and provides evidence if a target site later questions your traffic. A simple CSV log works fine for small projects; for larger ops, push logs to a monitoring service like Elasticsearch or Google Sheets via its API.  

### 6. Scaling Up  
If you need concurrent scrapers, launch multiple worker processes, each with its own API token (you can generate several keys under the same account). IPMOBI’s unlimited bandwidth ensures that adding workers does not incur extra cost, only the modest $49/mo (Scraper Node) or $89/mo (Automation Pro) fee.  

By following these steps, you’ll have a fully automated IP‑rotation pipeline that keeps your web scrapers running smoothly on Malaysian platforms — whether you’re monitoring Shopee flash sales in Kuala Lumpur, tracking Lazada price drops in Penang, or aggregating Mudah.my property listings nationwide.  

---  

| Provider | Price | Bandwidth | IP Pool | Best For |
|----------|-------|-----------|---------|----------|
| IPMOBI Scraper Node | $49/mo | Unlimited | Malaysian mobile | Web scraping, Shopee |
| IPMOBI Automation Pro | $89/mo | Unlimited | Malaysian mobile | Multi-account, automation |
| BrightData | $500+/mo | Metered | Global | Enterprise |
| Oxylabs | $300+/mo | Metered | Global | Enterprise |
| SmartProxy | $75+/mo | 50GB | Mixed | Small projects |

---  

### FAQ  

**Q: Why should I choose a Malaysian mobile proxy instead of a global residential pool for scraping Shopee Malaysia?**  
A: Malaysian mobile IPs are recognized by Shopee’s anti‑bot systems as legitimate local traffic. Global residential pools often route through data‑center IPs or foreign carriers, which trigger geo‑safety checks and result in CAPTCHAs or blocks. Using Maxis, CelcomDigi or Digi IPs ensures your requests appear as genuine shoppers from Kuala Lumpur, Penang or other Malaysian cities, dramatically reducing detection rates.  

**Q: How often should I rotate IP when scraping Lazada’s flash‑sale pages?**  
A: Lazada enforces a strict request‑per‑minute limit per subnet. A safe practice is to rotate after every 8‑10 requests, or roughly every 30‑45 seconds, depending on your concurrency. Monitor the HTTP 429 responses; if you see them, shorten the interval.  

**Q: Can I use the same API key for multiple scraper instances running on different servers?**  
A: Yes. IPMOBI’s API keys are not tied to a single IP address; you can distribute them across any number of worker nodes, virtual machines or containers. Just ensure each node handles its own rotation calls to avoid race conditions where two workers receive the same IP simultaneously.  

**Q: What happens if the rotation API returns an error or times out?**  
A: Treat any non‑200 response as a signal to retry after a brief back‑off (e.g., 2‑5 seconds). The API is highly available, but transient network glitches can occur. Implement exponential back‑off in your code to avoid hammering the endpoint.  

**Q: Does IP rotation affect session cookies or login states on sites like Mudah.my?**  
A: Rotating the outgoing IP does not invalidate cookies stored in your session object. As long as you keep the same `requests.Session()` (or equivalent) and only update its proxy dictionary, cookies persist across IP changes. If you need to log out and start fresh, simply create a new session after rotation.  

**Q: Is there a limit to how many IPs I can request per hour with the Scraper Node plan?**  
A: No. The Scraper Node plan provides unlimited bandwidth and unlimited API calls for IP rotation. You can rotate as frequently as your scraping logic requires without incurring extra charges.  

**Q: How do I verify that the IP I’m using is truly from a Malaysian mobile carrier?**  
A: Each rotation response includes the `carrier` and `asn` fields. You can also perform a quick reverse‑DNS lookup or use an external service like `https://ipinfo.io/{ip}` to confirm the ISP and location. The logs will show entries such as “carrier: Maxis, asn: 9