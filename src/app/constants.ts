// Code samples for the Developer section (API-Driven Rotation)
// Proxy connection strings for IPMobi dedicated modem ports

export interface CodeSamples {
  curl: string;
  python: string;
  node: string;
}

export const proxyConnectionString = "http://user:pass@modem-01.ipmobi.net:8080";

export const codeSamples: Record<string, CodeSamples> = {
  en: {
    curl: `curl -x http://user:pass@modem-01.ipmobi.net:8080 \\
  -H "X-IPMobi-Rotate: true" \\
  https://api.ipmobi.net/v1/ports/modem-01/rotate \\
  -X POST`,
    python: `import requests

proxy = {
  "http": "http://user:pass@modem-01.ipmobi.net:8080",
  "https": "http://user:pass@modem-01.ipmobi.net:8080"
}

# Rotate IP via API
response = requests.post(
  "https://api.ipmobi.net/v1/ports/modem-01/rotate",
  proxies=proxy,
  headers={"X-IPMobi-Rotate": "true"}
)
print(response.json())`,
    node: `const fetch = require('node-fetch');

const proxyUrl = 'http://user:pass@modem-01.ipmobi.net:8080';

// Rotate IP via API
fetch('https://api.ipmobi.net/v1/ports/modem-01/rotate', {
  method: 'POST',
  headers: { 'X-IPMobi-Rotate': 'true' },
  agent: new (require('https-proxy-agent'))(proxyUrl)
})
  .then(res => res.json())
  .then(data => console.log(data));`,
  },
  zh: {
    curl: `curl -x http://user:pass@modem-01.ipmobi.net:8080 \\
  -H "X-IPMobi-Rotate: true" \\
  https://api.ipmobi.net/v1/ports/modem-01/rotate \\
  -X POST`,
    python: `import requests

proxy = {
  "http": "http://user:pass@modem-01.ipmobi.net:8080",
  "https": "http://user:pass@modem-01.ipmobi.net:8080"
}

# 通过 API 轮换 IP
response = requests.post(
  "https://api.ipmobi.net/v1/ports/modem-01/rotate",
  proxies=proxy,
  headers={"X-IPMobi-Rotate": "true"}
)
print(response.json())`,
    node: `const fetch = require('node-fetch');

const proxyUrl = 'http://user:pass@modem-01.ipmobi.net:8080';

// 通过 API 轮换 IP
fetch('https://api.ipmobi.net/v1/ports/modem-01/rotate', {
  method: 'POST',
  headers: { 'X-IPMobi-Rotate': 'true' },
  agent: new (require('https-proxy-agent'))(proxyUrl)
})
  .then(res => res.json())
  .then(data => console.log(data));`,
  },
  ru: {
    curl: `curl -x http://user:pass@modem-01.ipmobi.net:8080 \\
  -H "X-IPMobi-Rotate: true" \\
  https://api.ipmobi.net/v1/ports/modem-01/rotate \\
  -X POST`,
    python: `import requests

proxy = {
  "http": "http://user:pass@modem-01.ipmobi.net:8080",
  "https": "http://user:pass@modem-01.ipmobi.net:8080"
}

# Ротация IP через API
response = requests.post(
  "https://api.ipmobi.net/v1/ports/modem-01/rotate",
  proxies=proxy,
  headers={"X-IPMobi-Rotate": "true"}
)
print(response.json())`,
    node: `const fetch = require('node-fetch');

const proxyUrl = 'http://user:pass@modem-01.ipmobi.net:8080';

// Ротация IP через API
fetch('https://api.ipmobi.net/v1/ports/modem-01/rotate', {
  method: 'POST',
  headers: { 'X-IPMobi-Rotate': 'true' },
  agent: new (require('https-proxy-agent'))(proxyUrl)
})
  .then(res => res.json())
  .then(data => console.log(data));`,
  },
};

export const jsonOutput = `{
  "status": "success",
  "port": "modem-01",
  "previous_ip": "124.13.xx.xxx",
  "new_ip": "115.134.xx.xxx",
  "carrier": "CelcomDigi",
  "asn": "AS9791",
  "rotated_at": "2026-04-28T19:42:00Z"
}`;
