---
title: How to Set Up IP Rotation with REST API for Web Scraping in 2026: A Malaysian Guide  
description: Learn how to automate IP rotation using IPMOBI’s REST API to scrape Malaysian e‑commerce sites like Shopee, Lazada, and Mudah.my without getting blocked. This guide walks you through the exact API calls, authentication steps, and best‑practice rate limits, plus a pricing showdown that shows why IPMOBI’s $49‑$89/mo plans beat global competitors for local projects.
date: 2026-08-01
tags: mobile proxy, web scraping, 中文, rest, guide, shopee, lazada
---



## Executive Summary  
Learn how to automate IP rotation using IPMOBI’s REST API to scrape Malaysian e‑commerce sites like Shopee, Lazada, and Mudah.my without getting blocked. This guide walks you through the exact API calls, authentication steps, and best‑practice rate limits, plus a pricing showdown that shows why IPMOBI’s $49‑$89/mo plans beat global competitors for local projects.  

---  

## Why IP Rotation Matters for Malaysian Web Scraping  

Malaysia’s digital economy is booming, and businesses increasingly rely on data from platforms such as Shopee, Lazada, and Mudah.my to monitor prices, track product availability, and gauge consumer sentiment. However, these sites employ aggressive anti‑bot measures that flag repeated requests from the same IP address, often resulting in CAPTCHAs, temporary bans, or outright IP blacklisting. For a scraper running from a Kuala Lumpur office or a Penang‑based startup, getting blocked after a few hundred requests can derail a whole day’s work and inflate operational costs.  

IP rotation solves this by distributing each request across a pool of distinct mobile IPs, making traffic appear as if it originates from genuine Malaysian mobile users on networks like Maxis (AS9791), CelcomDigi (AS4788), or Digi (AS4788). Because the IPs are tied to real 4G/5G devices, they carry the same trust signals as organic traffic, dramatically reducing the chance of detection. Moreover, Malaysian e‑commerce platforms often serve localized content—different prices for Selangor versus Johor, or region‑specific promotions on Lazada—so rotating through IPs geolocated to specific states lets you capture accurate, location‑aware data without needing multiple physical devices.  

When you combine IP rotation with a REST‑API‑driven approach, you gain programmable control: you can switch IPs after a set number of requests, after a time interval, or in response to HTTP status codes (e.g., 429 Too Many Requests). This flexibility is essential for scraping dynamic sites that adjust their rate limits based on traffic patterns. In short, IP rotation via a reliable Malaysian mobile proxy provider like IPMOBI transforms web scraping from a fragile, manual chore into a scalable, repeatable process that delivers clean data for market research, price intelligence, and competitive analysis.  

---  

## Step‑by‑Step: Setting Up IP Rotation via IPMOBI REST API  

### 1. Obtain Your API Credentials  
Log in to the IPMOBI dashboard at https://ipmobi.net/dashboard and navigate to **API Keys**. Click **Generate New Key**, give it a label such as “Shopee‑Scraper‑KL”, and copy the generated token. Store it securely—this token will be used in the `Authorization: Bearer <token>` header for every request.  

### 2. Understand the Endpoints  
IPMOBI’s REST API exposes two core endpoints for rotation:  

- **GET /v1/proxy** – Returns a fresh mobile IP address (with port) from the Malaysian pool.  
- **POST /v1/proxy/rotate** – Forces an immediate IP change for the current session.  

Both endpoints require the Bearer token and return JSON in the form:  

```json
{
  "ip": "103.XX.XX.XX",
  "port": 3128,
  "country": "MY",
  "city": "Kuala Lumpur",
  "carrier": "Maxis"
}
```  

### 3. Basic Rotation Logic (Python Example)  
Below is a minimal, production‑ready script that scrapes a product listing page on Shopee while rotating IPs every 50 requests. Adjust the `ROTATE_EVERY` constant to match your target site’s tolerance.  

```python
import requests
import time

API_TOKEN = "YOUR_IPMOBI_API_TOKEN"
API_BASE = "https://api.ipmobi.net/v1"
ROTATE_EVERY = 50
request_count = 0

def get_proxy():
    resp = requests.get(
        f"{API_BASE}/proxy",
        headers={"Authorization": f"Bearer {API_TOKEN}"}
    )
    resp.raise_for_status()
    data = resp.json()
    return f"http://{data['ip']}:{data['port']}"

def rotate_proxy():
    requests.post(
        f"{API_BASE}/proxy/rotate",
        headers={"Authorization": f"Bearer {API_TOKEN}"}
    ).raise_for_status()

proxy = get_proxy()
proxies = {"http": proxy, "https": proxy}

url = "https://shopee.my/search?keyword=smartphone"

while request_count < 500:  # example limit
    try:
        r = requests.get(url, proxies=proxies, timeout=15)
        if r.status_code == 429:
            # Too many requests – rotate and retry
            rotate_proxy()
            proxy = get_proxy()
            proxies = {"http": proxy, "https": proxy}
            continue
        # Process r.text … (parse with BeautifulSoup, etc.)
        print(f"[{request_count}] Fetched {len(r.text)} bytes")
        request_count += 1
        if request_count % ROTATE_EVERY == 0:
            rotate_proxy()
            proxy = get_proxy()
            proxies = {"http": proxy, "https": proxy}
        time.sleep(1)  # be courteous
    except requests.RequestException as e:
        print(f"Error: {e}")
        break
```  

**Key points:**  
- The script calls `/proxy` only when a new IP is needed, keeping API overhead low.  
- On a 429 response, it instantly rotates via `/proxy/rotate` and retries—ideal for sites that enforce strict per‑IP limits.  
- The returned JSON includes city and carrier info, letting you log which Malaysian region each request originated from (useful for geo‑targeted analysis).  

### 4. Integrating with Popular Scraping Frameworks  
If you prefer Scrapy, you can implement a custom middleware that fetches a new IP from IPMOBI’s API before each request. For Selenium‑based scraping of Lazada’s dynamic pages, wrap the WebDriver initialization with a proxy string obtained from `/proxy`. Both approaches keep the rotation logic centralized and avoid hard‑coding IPs.  

### 5. Monitoring and Error Handling  
Enable logging of the `ip`, `city`, and `carrier` fields from each API response. If you notice a high proportion of requests coming from a single carrier (e.g., only Maxis), you can manually trigger a rotation to diversify the pool. Additionally, set up alerts for consecutive 403 or 429 responses—these often indicate that a particular IP has been flagged, prompting an immediate rotate.  

---  

## Pricing Comparison  

| Provider | Price | Bandwidth | IP Pool | Best For |
|----------|-------|-----------|---------|----------|
| IPMOBI Scraper Node | $49/mo | Unlimited | Malaysian mobile | Web scraping, Shopee |
| IPMOBI Automation Pro | $89/mo | Unlimited | Malaysian mobile | Multi-account, automation |
| BrightData | $500+/mo | Metered | Global | Enterprise |
| Oxylabs | $300+/mo | Metered | Global | Enterprise |
| SmartProxy | $75+/mo | 50GB | Mixed | Small projects |  

*All IPMOBI plans include unlimited bandwidth, no hidden overage fees, and access to a rotating pool of 4G/5G IPs sourced from Maxis, CelcomDigi, and Digi across Kuala Lumpur, Penang, Johor Bahru, and other major Malaysian cities.*  

---  

## FAQ  

**Q: Are IPMOBI’s Malaysian mobile IPs suitable for scraping Shopee and Lazada?**  
A: Yes. Shopee and Lazada employ geo‑targeted anti‑bot systems that trust traffic originating from local mobile carriers. IPMOBI’s IPs are assigned to real 4G/5G devices on Maxis, CelcomDigi, and Digi, making your requests appear as genuine Malaysian users. This reduces CAPTCHA challenges and extends the lifespan of your scraping sessions.  

**Q: How often should I rotate IPs when scraping Mudah.my?**  
A: Mudah.my enforces a relatively strict rate limit of about 60 requests per IP per minute. A safe practice is to rotate every 30–40 requests or after receiving a 429 status. Using IPMOBI’s `/proxy/rotate` endpoint lets you switch IPs instantly without interrupting your script.  

**Q: Can I target specific Malaysian cities or states with IPMOBI’s API?**  
A: The API returns the city and carrier for each IP. While you cannot request an IP from a specific city directly, you can filter the responses: keep only those where `"city":"Penang"` or `"state":"Johor"` and discard others. Over a large pool, you’ll consistently get IPs from major metros like Kuala Lumpur, Selangor, and Penang, enabling localized data collection.  

**Q: What authentication method does IPMOBI’s REST API use?**  
A: IPMOBI uses Bearer token authentication. Generate a token in the dashboard, then include `Authorization: Bearer <your_token>` in the header of every API request. Tokens can be revoked or regenerated at any time for security.  

**Q: Is there a limit on how many IPs I can request per hour?**  
A: No. The Scraper Node and Automation Pro plans provide unlimited IP requests. You can call `/proxy` as frequently as your scraping logic requires, making it feasible to rotate on every request if needed.  

**Q: How does IPMOBI compare to global providers like BrightData for Malaysia‑focused tasks?**  
A: Global providers charge premium rates for metered bandwidth and often route traffic through overseas exit points, which can trigger geo‑blocks on Shopee, Lazada, or Mudah.my. IPMOBI’s Malaysian‑only pool delivers lower latency, higher trust scores, and flat‑rate pricing—resulting in up to 90% cost savings for local scraping projects.  

**Q: Can I use IPMOBI’s API with headless browsers like Playwright?**  
A: Absolutely. Retrieve the proxy string (`http://ip:port`) from `/proxy` and launch Playwright with `--proxy-server=http://ip:port`. For rotating mid‑crawl, call `/proxy/rotate` and update the browser context’s proxy settings without restarting the browser.  

**Q: What kind of uptime and reliability does IPMOBI guarantee?**  
A: IPMOBI operates its own mobile gateway infrastructure in Malaysia with redundant links to Maxis, CelcomDigi, and Digi. Historical uptime exceeds 99.9%, and the API includes automatic failover—if one carrier experiences degradation, the system seamlessly switches to another carrier’s IP pool.  

---  

**Ready to get started?** → [Visit ipmobi.net/order](https://ipmobi.net/order) — plans from $49/mo, setup in 5 minutes.  

---  

*Published by IPMOBI.NET — Malaysia's mobile proxy service. Maxis (AS9791), CelcomDigi (AS4788), Digi (AS4788).*