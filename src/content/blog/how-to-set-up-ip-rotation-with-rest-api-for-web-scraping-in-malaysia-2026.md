---
title: How to Set Up IP Rotation with REST API for Web Scraping in Malaysia 2026  
description: Learn how to automate IP rotation using IPMOBI’s REST API so your web‑scraping bots stay undetected on Malaysian sites like Shopee, Lazada, and Mudah.my. This guide walks you through authentication, endpoint usage, and best‑practice throttling, all tailored to local carriers such as Maxis, CelcomDigi, and Digi. By the end, you’ll have a ready‑to‑run script that rotates Malaysian mobile IPs every few minutes, keeping your data collection smooth and cost‑effective.
date: 2026-07-09
tags: mobile proxy, web scraping, 中文, rest, guide, shopee, lazada
---



## Executive Summary  
Learn how to automate IP rotation using IPMOBI’s REST API so your web‑scraping bots stay undetected on Malaysian sites like Shopee, Lazada, and Mudah.my. This guide walks you through authentication, endpoint usage, and best‑practice throttling, all tailored to local carriers such as Maxis, CelcomDigi, and Digi. By the end, you’ll have a ready‑to‑run script that rotates Malaysian mobile IPs every few minutes, keeping your data collection smooth and cost‑effective.

---

## Why IP Rotation Matters for Malaysian Web Scraping  

Malaysia’s e‑commerce platforms have grown increasingly sophisticated at blocking scrapers. Shopee, Lazada, and Mudah.my employ rate‑limiting, CAPTCHAs, and IP‑based bans that trigger after just a handful of requests from a single address. If you’re harvesting product prices from Kuala Lumpur’s bustling Bukit Bintang district or monitoring flash sales in Penang’s George Town, a static IP will quickly get flagged, leading to failed jobs and lost data.  

IP rotation solves this by distributing requests across a pool of addresses, making each appear as a genuine mobile user. Malaysian mobile networks—Maxis (AS9791), CelcomDigi (AS4788), and Digi (AS4788)—assign dynamic IPs to smartphones, which sites trust far more than data‑center addresses. By rotating through these carrier IPs, you mimic real‑world browsing patterns, reduce the chance of triggering anti‑bot mechanisms, and stay within each platform’s acceptable usage thresholds.  

Beyond evasion, rotation improves data quality. When you scrape from multiple IPs, you avoid geographic biasing; a product priced differently in Johor Bahru versus Kota Bharu will be captured accurately. Additionally, unlimited bandwidth plans—like IPMOBI’s Scraper Node—let you run continuous jobs without worrying about overage fees, a crucial factor for long‑term price‑tracking or sentiment‑analysis projects. In short, IP rotation isn’t just a technical nicety; it’s the foundation for reliable, scalable scraping in Malaysia’s competitive online marketplace.  

---

## Step‑by‑Step Guide: Configuring IPMOBI’s REST API for Automatic Rotation  

1. **Create an API token**  
   Log in to your IPMOBI dashboard, navigate to **API → Tokens**, and click **Generate New Token**. Copy the token; you’ll need it for every request. Store it securely (e.g., in an environment variable) rather than hard‑coding it into scripts.  

2. **Check your current IP pool**  
   Send a GET request to `https://api.ipmobi.net/v1/pool?country=MY` with the header `Authorization: Bearer <YOUR_TOKEN>`. The response returns a JSON array of available Malaysian mobile IPs, each tagged with its carrier (Maxis, CelcomDigi, Digi) and city (e.g., Kuala Lumpur, Penang).  

3. **Request a new IP for each session**  
   To rotate, call the allocation endpoint:  
   ```  
   POST https://api.ipmobi.net/v1/ip  
   Header: Authorization: Bearer <YOUR_TOKEN>  
   Body: { "country": "MY", "session_id": "scrape_001" }  
   ```  
   The API replies with a fresh IP address and port. Use this pair as your proxy in the scraping tool (e.g., Python’s `requests` with `proxies={"http": "http://<ip>:<port>", "https": "http://<ip>:<port>"}`).  

4. **Automate the rotation loop**  
   A simple Python snippet illustrates the flow:  

   ```python  
   import requests, time  

   API_TOKEN = "your_token_here"  
   BASE_URL = "https://api.ipmobi.net/v1"  

   def get_new_ip(session_id):  
       resp = requests.post(  
           f"{BASE_URL}/ip",  
           headers={"Authorization": f"Bearer {API_TOKEN}"},  
           json={"country": "MY", "session_id": session_id}  
       )  
       data = resp.json()  
       return data["ip"], data["port"]  

   session_id = "shopee_price_tracker"  
   ip, port = get_new_ip(session_id)  
   proxies = {"http": f"http://{ip}:{port}", "https": f"http://{ip}:{port}"}  

   # Example request to Shopee  
   r = requests.get("https://shopee.com.my/api/v2/item/get", proxies=proxies)  
   print(r.json())  

   # Rotate every 5 minutes  
   time.sleep(300)  
   ip, port = get_new_ip(session_id)  
   proxies = {"http": f"http://{ip}:{port}", "https": f"http://{ip}:{port}"}  
   ```  

   Adjust the sleep interval based on the target site’s rate limits; for Shopee and Lazada, a 3‑5 minute rotation works well, while Mudah.my tolerates slightly shorter intervals.  

5. **Handle errors and fallback**  
   If the API returns `429 Too Many Requests`, wait a minute before retrying. Should an IP become unresponsive, immediately call the allocation again for a new IP and replace the proxy. Logging each rotation (timestamp, IP, carrier) helps you audit performance and prove compliance with each platform’s terms of service.  

6. **Testing locally**  
   Before deploying to a server, run the script from a home connection in Shah Alam or Johor Bahru to verify that the returned IPs resolve to Malaysian mobile carriers. Websites like `https://whatismyipaddress.com` will show the carrier name and city, confirming that your traffic appears as a genuine local user.  

By following these steps, you’ll have a robust, self‑healing rotation system that keeps your scrapers running smoothly across Malaysia’s top e‑commerce sites, all powered by IPMOBI’s unlimited‑bandwidth mobile proxy network.  

---

## Pricing Comparison  

| Provider | Price | Bandwidth | IP Pool | Best For |
|----------|-------|-----------|---------|----------|
| IPMOBI Scraper Node | $49/mo | Unlimited | Malaysian mobile | Web scraping, Shopee |
| IPMOBI Automation Pro | $89/mo | Unlimited | Malaysian mobile | Multi‑account, automation |
| BrightData | $500+/mo | Metered | Global | Enterprise |
| Oxylabs | $300+/mo | Metered | Global | Enterprise |
| SmartProxy | $75+/mo | 50GB | Mixed | Small projects |

---

## FAQ  

**Q: Why choose a Malaysian mobile proxy instead of a global data‑center IP for scraping Shopee?**  
A: Shopee’s anti‑bot systems trust traffic originating from local mobile carriers like Maxis and CelcomDigi because those IPs are assigned to real smartphones. Data‑center IPs are easily flagged as synthetic, leading to CAPTCHAs or bans. A Malaysian mobile IP mimics a genuine shopper browsing from Kuala Lumpur or Penang, drastically reducing detection risk.  

**Q: How often should I rotate IPs when scraping Lazada flash sales?**  
A: Flash sales trigger aggressive rate‑limiting; we recommend rotating every 2–3 minutes during high‑traffic windows. IPMOBI’s API allows on‑demand allocation, so your script can request a fresh IP right before each batch of requests, keeping you under Lazada’s per‑IP request threshold.  

**Q: Can I use the same IPMOBI token for multiple scraping projects simultaneously?**  
A: Yes. The token is account‑wide; you can generate separate `session_id` values for each project (e.g., `shopee_prices`, `mudah_jobs`). The API will allocate distinct IPs per session, ensuring isolation and preventing cross‑project interference.  

**Q: Does IPMOBI throttle bandwidth on the Unlimited plans?**  
A: No. Both the Scraper Node ($49/mo) and Automation Pro ($89/mo) plans provide true unlimited bandwidth. You can run continuous 24/7 scraping without worrying about overage charges, unlike metered competitors that bill per GB.  

**Q: What happens if an allocated IP gets blocked by a target site?**  
A: Simply call the allocation endpoint again with the same `session_id`; IPMOBI will supply a new Malaysian mobile IP. Implementing a retry loop in your script ensures zero downtime.  

**Q: Are the IPs truly from Malaysian carriers, or are they routed through overseas servers?**  
A: IPMOBI’s infrastructure resides in Malaysia, and the IPs are native to Maxis (AS9791), CelcomDigi (AS4788), and Digi (AS4788). When you query an IP geolocation service, it will show the carrier and a Malaysian city (e.g., Kuala Lumpur, Johor Bahru), confirming genuine local origin.  

**Q: Is there a setup fee or minimum contract length?**  
A: IPMOBI offers month‑to‑month billing with no setup fees. You can start, upgrade, or cancel at any time, making it ideal for short‑term campaigns or long‑term monitoring projects.  

**Q: How do I verify that my scraper is using the IPMOBI proxy correctly?**  
A: Before each request, make a test call to `https://api.ipmobi.net/v1/ipinfo` (same auth). The response includes the current IP, carrier, and location. Log this data alongside your scraping output to confirm rotation is functioning as intended.  

---

**Ready to get started?** → [Visit ipmobi.net/order](https://ipmobi.net/order) — plans from $49/mo, setup in 5 minutes.  

---  

*Published by IPMOBI.NET — Malaysia's mobile proxy service. Maxis (AS9791), CelcomDigi (AS4788), Digi (AS4788).*