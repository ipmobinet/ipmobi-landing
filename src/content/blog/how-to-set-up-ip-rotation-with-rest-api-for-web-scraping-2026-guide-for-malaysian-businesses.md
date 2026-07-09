---
title: How to Set Up IP Rotation with REST API for Web Scraping – 2026 Guide for Malaysian Businesses  
description: Learn how to automate IP rotation using IPMOBI’s REST API to keep your web scraping projects undetected and efficient. This guide walks Malaysian developers through real‑world examples for Shopee, Lazada, and Mudah.my, shows pricing vs. global competitors, and answers the most common questions about mobile proxies in Malaysia.
date: 2026-07-09
tags: mobile proxy, web scraping, 中文, rest, guide, shopee, lazada
---



## Executive Summary  
Learn how to automate IP rotation using IPMOBI’s REST API to keep your web scraping projects undetected and efficient. This guide walks Malaysian developers through real‑world examples for Shopee, Lazada, and Mudah.my, shows pricing vs. global competitors, and answers the most common questions about mobile proxies in Malaysia.  

---  

## Understanding IP Rotation and Why It Matters for Malaysian Web Scraping  

Web scraping in Malaysia faces unique challenges: local e‑commerce platforms aggressively block repeated requests from the same IP, and government‑mandated data‑centre IPs are often flagged as suspicious. Mobile IP addresses—especially those from Maxis (AS9791), CelcomDigi (AS4788), and Digi (AS4788)—appear as genuine user traffic, making them ideal for bypassing rate limits and CAPTCHAs on sites like Shopee Malaysia, Lazada.my, and Mudah.my.  

IP rotation changes the outgoing IP address after a set number of requests or a time interval, distributing traffic across a pool of mobile IPs. This reduces the chance of any single address being blacklisted and mimics natural browsing behaviour from different Kuala Lumpur neighbourhoods, Penang suburbs, or even rural Sabah locations. For Malaysian businesses, the benefits are concrete:  

* **Higher success rates** – Shopee product pages that return 429 errors after 50 requests from a static IP can be scraped continuously when rotating through a 10 k‑IP mobile pool.  
* **Lower operational cost** – Unlimited bandwidth plans mean you pay a flat fee regardless of data volume, unlike metered global providers that charge per GB.  
* **Compliance with local norms** – Using Malaysian mobile IPs respects data‑sovereignty expectations and avoids the latency penalties of routing through overseas nodes.  

When you combine IPMOBI’s Malaysian mobile pool with a REST‑API‑driven rotation script, you gain full control over session persistence, geographic targeting, and failover—all essential for reliable data extraction in a competitive market.  

---  

## Step‑by‑Step: Configuring IPMOBI’s REST API for Automatic IP Rotation  

1. **Create an API token**  
   Log in to the IPMOBI dashboard, navigate to *API Settings*, and generate a token with the `scrape:rotate` scope. Store this token securely (e.g., in an environment variable `IPMOBI_TOKEN`).  

2. **Obtain your session endpoint**  
   The base URL for all rotation calls is `https://api.ipmobi.net/v1/session`. Append your token as a Bearer header:  
   ```http  
   Authorization: Bearer $IPMOBI_TOKEN  
   ```  

3. **Request a new mobile IP**  
   Send a `POST` to `/v1/session/new` with a JSON body specifying the desired carrier and location:  
   ```json  
   {  
     "carrier": "maxis",  
     "region": "kuala_lumpur",  
     "session_ttl": 300  
   }  
   ```  
   The response returns a session ID and the assigned IP address, e.g., `{"session_id":"abc123","ip":"103.XX.XX.XX"}`.  

4. **Integrate the IP into your scraper**  
   In your Python (or Node.js) script, use the returned IP as the proxy for HTTP requests:  
   ```python  
   proxies = {  
       "http":  f"http://user:{IPMOBI_TOKEN}@{ip}:3128",  
       "https": f"http://user:{IPMOBI_TOKEN}@{ip}:3128"  
   }  
   requests.get(url, proxies=proxies, timeout=15)  
   ```  
   Replace `user` with the username provided in your IPMOBI account (often `scraper`).  

5. **Automate rotation**  
   Set a counter or timer (e.g., every 20 requests or every 2 minutes) to call `/v1/session/rotate/{session_id}`. This endpoint releases the current IP and provisions a new one from the same carrier/region pool, preserving session cookies if needed.  

6. **Handle errors gracefully**  
   If the API returns `429 Too Many Requests`, back off exponentially and retry after the `Retry-After` header. For `401 Unauthorized`, verify your token hasn’t expired—tokens are valid for 30 days and can be refreshed via `/v1/auth/refresh`.  

7. **Monitor usage**  
   The `/v1/usage` endpoint returns bandwidth consumed and remaining IP pool size. Set up a simple cron job to log this data to Google Sheets or a local dashboard, ensuring you stay within the unlimited bandwidth promise without surprises.  

**Malaysian tip:** When scraping Shopee’s Kuala Lumpur‑based sellers, set `"region": "kuala_lumpur"` to get IPs geolocated to KL’s central business district. For Penang‑focused Lazada deals, switch to `"region": "penang"` to appear as a local shopper from Georgetown. This geo‑targeting improves data relevance and reduces the chance of serving region‑specific blockers.  

---  

## Pricing Comparison  

| Provider | Price | Bandwidth | IP Pool | Best For |
|----------|-------|-----------|---------|----------|
| IPMOBI Scraper Node | $49/mo | Unlimited | Malaysian mobile | Web scraping, Shopee |
| IPMOBI Automation Pro | $89/mo | Unlimited | Malaysian mobile | Multi‑account, automation |
| BrightData | $500+/mo | Metered | Global | Enterprise |
| Oxylabs | $300+/mo | Metered | Global | Enterprise |
| SmartProxy | $75+/mo | 50GB | Mixed | Small projects |

*Note: IPMOBI’s plans include unlimited bandwidth, no hidden overage fees, and direct access to Maxis, CelcomDigi, and Digi mobile networks.*  

---  

## FAQ  

**Q: Are IPMOBI’s Malaysian mobile IPs truly residential‑grade?**  
A: Yes. Our IPs originate from actual 4G/5G devices on Maxis (AS9791), CelcomDigi (AS4788), and Digi (AS4788) networks. They appear as regular consumer traffic, not data‑centre IPs, which makes them far less likely to be blocked by local sites like Mudah.my or Lazada.  

**Q: Can I rotate IPs based on geographic location within Malaysia?**  
A: Absolutely. When creating a session you can specify `region` values such as `kuala_lumpur`, `penang`, `johor_bahru`, or `sabah`. The API will return an IP whose geolocation matches that state or city, letting you emulate a shopper from that exact area.  

**Q: How does unlimited bandwidth work with mobile proxies?**  
A: Unlike metered providers that charge per gigabyte, IPMOBI purchases bulk data capacity directly from Malaysian carriers. As long as you stay within fair‑use policies (no illegal activity), you can scrape as much as you need without extra cost.  

**Q: What authentication method should I use for the REST API?**  
A: Use Bearer token authentication. Generate a token in the dashboard with the `scrape:rotate` scope and include it in the `Authorization: Bearer <token>` header for every request. Tokens expire after 30 days and can be refreshed via the `/v1/auth/refresh` endpoint.  

**Q: Is it possible to maintain sticky sessions while still rotating IPs?**  
A: Yes. By calling `/v1/session/rotate/{session_id}` you keep the same `session_id` (and thus cookies) while the underlying IP changes. This is useful for sites that require login persistence but still penalise repeated requests from a single address.  

**Q: How do I know if an IP has been blacklisted by a target site?**  
A: Monitor HTTP response codes. A sudden rise in 403 or 429 errors from a specific IP suggests it may be flagged. Our API automatically removes compromised IPs from the pool and replaces them with fresh ones on the next rotation request.  

**Q: Can I use IPMOBI for scraping government portals or financial data?**  
A: While technically possible, we advise reviewing Malaysia’s Personal Data Protection Act (PDPA) and any site‑specific terms of service. IPMOBI’s service is intended for legitimate data collection; misuse may result in account termination.  

**Q: What support options are available if I run into issues?**  
A: IPMOBI offers 24/7 live chat and email support from our Shah Alam office. Enterprise‑tier clients (Automation Pro) also receive a dedicated account manager and SLA‑guaranteed response times under 15 minutes.  

---  

**Ready to get started?** → [Visit ipmobi.net/order](https://ipmobi.net/order) — plans from $49/mo, setup in 5 minutes.  

---  

*Published by IPMOBI.NET — Malaysia's mobile proxy service. Maxis (AS9791), CelcomDigi (AS4788), Digi (AS4788).*