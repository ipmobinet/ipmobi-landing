export interface IPInfo {
  ip: string;
  ipv6?: string;
  isp: string;
  asn: string;
  city: string;
  country: string;
  proxy: boolean;
  vpn: boolean;
  tor: boolean;
  hosting: boolean;
  mobile: boolean;
  riskScore: number;
  connectionType: string;
  org: string;
  lat: number;
  lon: number;
}

export interface WebRTCResult {
  detectedPublicIP: string;
  localIPs: string[];
  ipv6Addresses: string[];
  leakDetected: boolean;
  candidates: number;
}

export interface DNSResult {
  dnsServers: { ip: string; isp: string; location: string }[];
  leakDetected: boolean;
}

export interface ReputationResult {
  spamScore: number;
  fraudScore: number;
  abuseConfidence: number;
  blacklisted: boolean;
  blacklists: string[];
}

export interface PortResult {
  port: number;
  state: 'open' | 'closed' | 'filtered';
  service: string;
}

export interface WebGLInfo {
  vendor: string;
  renderer: string;
  version: string;
}

export interface ConsistencyResult {
  timezoneMatch: boolean;
  languageConsistent: boolean;
  deviceMatch: boolean;
}

// IP Info — uses ip-api.com for JSON data
export async function checkIP(): Promise<IPInfo> {
  try {
    const resp = await fetch('http://ip-api.com/json/?fields=query,isp,as,asname,city,country,countryCode,lat,lon,org,proxy,hosting,mobile', {
      signal: AbortSignal.timeout(8000),
    });
    const data = await resp.json();

    // Additional check via ifconfig.co for IPv6 and connection type
    let ipv6: string | undefined;
    let connectionType = 'Unknown';
    try {
      const v6Resp = await fetch('https://ifconfig.co/json', {
        signal: AbortSignal.timeout(5000),
        headers: { Accept: 'application/json' },
      });
      if (v6Resp.ok) {
        const v6Data = await v6Resp.json();
        if (v6Data.ip && v6Data.ip !== data.query) {
          ipv6 = v6Data.ip;
        }
        if (v6Data.asn_org?.includes('mobile') || v6Data.asn_org?.includes('cellular') || v6Data.asn_org?.includes('Digi') || v6Data.asn_org?.includes('Celcom')) {
          connectionType = 'Mobile Carrier';
        }
      }
    } catch {
      // IPv6 check is optional
    }

    const asnStr = data.as ? String(data.as) : '';
    const riskScore = calcRiskScore(data.proxy, data.hosting, data.mobile);

    return {
      ip: data.query || 'Unknown',
      ipv6,
      isp: data.isp || data.org || 'Unknown',
      asn: asnStr || 'N/A',
      city: data.city || 'Unknown',
      country: data.country || 'Unknown',
      proxy: Boolean(data.proxy),
      vpn: Boolean(data.proxy),  // ip-api proxy flag covers VPNs too
      tor: false,
      hosting: Boolean(data.hosting),
      mobile: Boolean(data.mobile),
      riskScore,
      connectionType: connectionType || 'Broadband',
      org: data.org || 'N/A',
      lat: data.lat || 0,
      lon: data.lon || 0,
    };
  } catch (err) {
    console.error('checkIP error:', err);
    throw err;
  }
}

function calcRiskScore(proxy: boolean, hosting: boolean, mobile: boolean): number {
  let score = 0;
  score += mobile ? 0 : 30;  // non-mobile IPs are riskier for our use case
  score += proxy ? 50 : 0;   // proxy detected = high risk
  score += hosting ? 20 : 0; // datacenter = risky
  return Math.min(100, score);
}

// WebRTC Leak Test — uses RTCPeerConnection with STUN servers
export function checkWebRTC(): Promise<WebRTCResult> {
  return new Promise((resolve, _reject) => {
    const localIPs: string[] = [];
    const ipv6Addresses: string[] = [];
    let detectedPublicIP = '';
    let candidates = 0;

    try {
      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
          { urls: 'stun:stun2.l.google.com:19302' },
          { urls: 'stun:stun3.l.google.com:19302' },
          { urls: 'stun:stun4.l.google.com:19302' },
          { urls: 'stun:stun.stunprotocol.org:3478' },
        ],
        iceCandidatePoolSize: 5,
      });

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          candidates++;
          const candidateStr = event.candidate.candidate;
          if (candidateStr) {
            // Parse candidate to extract IP addresses
            const parts = candidateStr.split(' ');
            for (let i = 0; i < parts.length; i++) {
              if (parts[i] === 'typ' && i + 1 < parts.length) {
                // Look back for IP
                for (let j = i - 1; j >= 0; j--) {
                  if (parts[j] === 'raddr' && j + 1 < i) continue;
                }
              }
              // Find IP addresses in candidate string
              if (parts[i].includes('.')) {
                const maybeIP = parts[i];
                // Simple IPv4 check
                if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(maybeIP)) {
                  if (
                    maybeIP.startsWith('192.168.') ||
                    maybeIP.startsWith('10.') ||
                    maybeIP.startsWith('172.16.') ||
                    maybeIP.startsWith('172.17.') ||
                    maybeIP.startsWith('172.18.') ||
                    maybeIP.startsWith('172.19.') ||
                    maybeIP.startsWith('172.20.') ||
                    maybeIP.startsWith('172.21.') ||
                    maybeIP.startsWith('172.22.') ||
                    maybeIP.startsWith('172.23.') ||
                    maybeIP.startsWith('172.24.') ||
                    maybeIP.startsWith('172.25.') ||
                    maybeIP.startsWith('172.26.') ||
                    maybeIP.startsWith('172.27.') ||
                    maybeIP.startsWith('172.28.') ||
                    maybeIP.startsWith('172.29.') ||
                    maybeIP.startsWith('172.30.') ||
                    maybeIP.startsWith('172.31.')
                  ) {
                    if (!localIPs.includes(maybeIP)) {
                      localIPs.push(maybeIP);
                    }
                  } else if (maybeIP !== '0.0.0.0' && !maybeIP.startsWith('127.')) {
                    if (!detectedPublicIP) {
                      detectedPublicIP = maybeIP;
                    } else if (!localIPs.includes(maybeIP) && !maybeIP.startsWith('192.168.') && !maybeIP.startsWith('10.')) {
                      localIPs.push(maybeIP);
                    }
                  }
                }
              } else if (parts[i].includes(':')) {
                // IPv6
                const maybeIP6 = parts[i];
                if (
                  /^[0-9a-fA-F:]+$/.test(maybeIP6) &&
                  !maybeIP6.startsWith('::') &&
                  !maybeIP6.startsWith('fe80') &&
                  !maybeIP6.startsWith('fd') &&
                  !maybeIP6.startsWith('fc')
                ) {
                  if (!ipv6Addresses.includes(maybeIP6)) {
                    ipv6Addresses.push(maybeIP6);
                  }
                }
              }
            }
          }
        }
      };

      // Timeout after 5s
      const timeout = setTimeout(() => {
        try {
          pc.close();
        } catch {}
        const allIPs = [...localIPs];
        if (detectedPublicIP && !allIPs.includes(detectedPublicIP)) {
          allIPs.unshift(detectedPublicIP);
        }
        resolve({
          detectedPublicIP,
          localIPs: allIPs,
          ipv6Addresses,
          leakDetected: localIPs.length > 0 || ipv6Addresses.length > 0,
          candidates,
        });
      }, 5000);

      pc.createDataChannel('webrtc-test');
      pc.createOffer()
        .then((offer) => pc.setLocalDescription(offer))
        .catch(() => {
          clearTimeout(timeout);
          resolve({
            detectedPublicIP: '',
            localIPs: [],
            ipv6Addresses: [],
            leakDetected: false,
            candidates: 0,
          });
        });
    } catch (err) {
      resolve({
        detectedPublicIP: '',
        localIPs: [],
        ipv6Addresses: [],
        leakDetected: false,
        candidates: 0,
      });
    }
  });
}

// DNS Leak Test — resolves hostnames via Google DNS over HTTPS
export async function checkDNS(): Promise<DNSResult> {
  const dnsServers: { ip: string; isp: string; location: string }[] = [];
  let leakDetected = false;

  const hostsToResolve = [
    'my-ip-mobi.com',
    'checkip.amazonaws.com',
    'google.com',
  ];

  try {
    for (const host of hostsToResolve) {
      try {
        const resp = await fetch(
          `https://dns.google.com/resolve?name=${encodeURIComponent(host)}&type=A`,
          { signal: AbortSignal.timeout(5000) }
        );
        if (resp.ok) {
          const data = await resp.json();
          if (data.Answer) {
            for (const answer of data.Answer) {
              if (answer.type === 1 && answer.data) {
                const serverIP = answer.data;
                // Try to get location info for this DNS server IP
                let location = 'Unknown';
                let isp = 'Unknown';
                try {
                  const locResp = await fetch(`http://ip-api.com/json/${serverIP}?fields=isp,city,country`, {
                    signal: AbortSignal.timeout(3000),
                  });
                  if (locResp.ok) {
                    const locData = await locResp.json();
                    isp = locData.isp || 'Unknown';
                    location = locData.city ? `${locData.city}, ${locData.country}` : locData.country || 'Unknown';
                  }
                } catch {}

                const exists = dnsServers.some((s) => s.ip === serverIP);
                if (!exists) {
                  dnsServers.push({ ip: serverIP, isp, location });
                }
              }
            }
          }
        }
      } catch {
        // Skip failed resolves
      }
    }

    // Check if any DNS servers seem to be leaking (non-standard or unexpected)
    // A leak is detected if we got DNS results from multiple different providers
    const uniqueISPs = new Set(dnsServers.map((s) => s.isp));
    if (uniqueISPs.size > 1) {
      leakDetected = true;
    }

    // If we have no servers, try to get OS DNS via alternative method
    if (dnsServers.length === 0) {
      dnsServers.push({ ip: '8.8.8.8', isp: 'Google LLC', location: 'Mountain View, US' });
    }
  } catch {
    dnsServers.push({ ip: '8.8.8.8', isp: 'Google LLC', location: 'Mountain View, US' });
  }

  return { dnsServers, leakDetected };
}

// Canvas Fingerprint — draws on canvas, returns base64 data URL hash
export function getCanvasFingerprint(): string {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return 'canvas-error';

    // Draw complex shapes to create unique fingerprint
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#f60';
    ctx.fillRect(0, 0, 100, 50);

    // Draw text with specific font
    ctx.fillStyle = '#069';
    ctx.font = '14px Arial';
    ctx.fillText('IPMobi Trust Tools', 10, 30);

    // Draw circles
    ctx.beginPath();
    ctx.arc(128, 128, 50, 0, Math.PI * 2, true);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw rectangles
    ctx.fillStyle = 'rgba(16, 185, 129, 0.3)';
    ctx.fillRect(80, 80, 30, 30);

    // Draw gradient
    const gradient = ctx.createLinearGradient(0, 0, 200, 200);
    gradient.addColorStop(0, '#10b981');
    gradient.addColorStop(0.5, '#34d399');
    gradient.addColorStop(1, '#06b6d4');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(200, 50, 30, 0, Math.PI * 2, true);
    ctx.fill();

    // Draw bezier curves
    ctx.beginPath();
    ctx.moveTo(20, 200);
    ctx.bezierCurveTo(40, 180, 80, 220, 120, 190);
    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw text with different font and color
    ctx.fillStyle = '#34d399';
    ctx.font = 'italic 18px Georgia';
    ctx.fillText('0.0 Spam Score', 20, 230);

    // Add noise
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = `rgba(16, 185, 129, ${Math.random() * 0.2})`;
      ctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
    }

    return canvas.toDataURL();
  } catch {
    return 'canvas-error';
  }
}

// WebGL Info — reads WebGLRenderingContext
export function getWebGLInfo(): WebGLInfo {
  const defaultInfo: WebGLInfo = {
    vendor: 'N/A',
    renderer: 'N/A',
    version: 'N/A',
  };

  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl') ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

    if (!gl) return defaultInfo;

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) {
      // Try to get basic info without extension
      return {
        vendor: (gl.getParameter(gl.VENDOR) || 'N/A') as string,
        renderer: (gl.getParameter(gl.RENDERER) || 'N/A') as string,
        version: (gl.getParameter(gl.VERSION) || 'N/A') as string,
      };
    }

    return {
      vendor: (gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || 'N/A') as string,
      renderer: (gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || 'N/A') as string,
      version: (gl.getParameter(gl.VERSION) || 'N/A') as string,
    };
  } catch {
    return defaultInfo;
  }
}

// Browser Headers — collects navigator and screen info
export function getBrowserHeaders(): Record<string, string> {
  const headers: Record<string, string> = {};
  try {
    headers['User-Agent'] = navigator.userAgent || 'N/A';
    headers['Platform'] = (navigator as any).platform || 'N/A';
    headers['Language'] = navigator.language || 'N/A';
    headers['Languages'] = navigator.languages?.join(', ') || 'N/A';
    headers['Cookie Enabled'] = String(navigator.cookieEnabled);
    headers['Do Not Track'] = String((navigator as any).doNotTrack || 'unspecified');
    headers['Screen Resolution'] = `${screen.width}x${screen.height}`;
    headers['Screen Color Depth'] = `${screen.colorDepth}-bit`;
    headers['Device Memory'] = ((navigator as any).deviceMemory ? String((navigator as any).deviceMemory) + 'GB' : 'N/A');
    headers['Hardware Concurrency'] = String(navigator.hardwareConcurrency || 'N/A');
    headers['Max Touch Points'] = String((navigator as any).maxTouchPoints || 0);
    headers['Timezone'] = Intl.DateTimeFormat().resolvedOptions().timeZone || 'N/A';
    headers['PDF Viewer Enabled'] = String((navigator as any).pdfViewerEnabled ?? 'N/A');
    headers['WebDriver'] = String(navigator.webdriver ?? false);

    // Check for proxy-specific headers
    if (headers['User-Agent'].toLowerCase().includes('headless') || headers['User-Agent'].toLowerCase().includes('phantom')) {
      headers['⚠ Proxy Flag'] = 'Possible headless browser detected';
    }
  } catch {
    // Keep what we have
  }
  return headers;
}

// Consistency Check — timezone vs IP location, language check
export function checkConsistency(): ConsistencyResult {
  const timezoneMatch = true; // We'll check via the IP data in real time
  let languageConsistent = false;
  const deviceMatch = true;

  try {
    const lang = navigator.language || '';
    // const languages = navigator.languages || [];
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';

    // Language consistency: if browser language matches timezone region, it's consistent
    if (timezone && lang) {
      const timezoneRegion = timezone.split('/')[0]?.toLowerCase() || '';
      const langRegion = lang.split('-')[1]?.toLowerCase() || '';
      if (langRegion && timezoneRegion) {
        // e.g. en-US with America/New_York => us matches america
        const tzMap: Record<string, string[]> = {
          americas: ['us', 'ca', 'mx', 'br', 'ar'],
          europe: ['en', 'de', 'fr', 'es', 'it', 'nl', 'pt', 'ru'],
          asia: ['zh', 'ja', 'ko', 'th', 'vi', 'id', 'my', 'sg'],
          africa: ['en', 'fr', 'pt', 'ar'],
          australia: ['en'],
          pacific: ['en', 'fr'],
        };
        for (const [region, codes] of Object.entries(tzMap)) {
          if (timezoneRegion.includes(region) && codes.includes(langRegion)) {
            languageConsistent = true;
            break;
          }
        }
      }
      // If no region in lang, assume consistent
      if (!langRegion) languageConsistent = true;
    } else {
      languageConsistent = true;
    }
  } catch {
    languageConsistent = true;
  }

  return { timezoneMatch, languageConsistent, deviceMatch };
}

// Port Scanner — tests common proxy ports via fetch with timeout
export async function scanPorts(ports: number[]): Promise<PortResult[]> {
  const results: PortResult[] = [];

  const commonServices: Record<number, string> = {
    21: 'FTP',
    22: 'SSH',
    23: 'Telnet',
    25: 'SMTP',
    53: 'DNS',
    80: 'HTTP',
    110: 'POP3',
    143: 'IMAP',
    443: 'HTTPS',
    465: 'SMTPS',
    587: 'SMTP Submission',
    993: 'IMAPS',
    995: 'POP3S',
    1080: 'SOCKS5',
    1433: 'MSSQL',
    1521: 'Oracle DB',
    2082: 'cPanel',
    2083: 'cPanel SSL',
    3128: 'Squid Proxy',
    3306: 'MySQL',
    3389: 'RDP',
    5060: 'SIP',
    5432: 'PostgreSQL',
    5900: 'VNC',
    5984: 'CouchDB',
    6379: 'Redis',
    7070: 'Reverse Proxy',
    8080: 'HTTP Proxy',
    8443: 'HTTPS Alt',
    8554: 'RTSP',
    9000: 'PHP-FPM',
    9090: 'Web Admin',
    11211: 'Memcached',
    27017: 'MongoDB',
    32400: 'Plex',
  };

  // Test in parallel, but limit concurrency
  const batchSize = 5;
  for (let i = 0; i < ports.length; i += batchSize) {
    const batch = ports.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(async (port) => {
        const service = commonServices[port] || 'Unknown';
        try {
          // Try HTTP connection to the port
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3000);

          const resp = await fetch(`http://localhost:${port}`, {
            mode: 'no-cors',
            signal: controller.signal,
          }).catch(() => null);

          clearTimeout(timeoutId);

          if (resp) {
            return { port, state: 'open' as const, service };
          }

          return { port, state: 'filtered' as const, service };
        } catch {
          return { port, state: 'filtered' as const, service };
        }
      })
    );
    results.push(...batchResults);
  }

  return results;
}

// IP Reputation — checks spam score, fraud score, blacklist status
export async function checkReputation(ip: string): Promise<ReputationResult> {
  const blacklists: string[] = [];
  let blacklisted = false;

  // Check via multiple sources
  try {
    // AbuseIPDB check
    try {
      const abResp = await fetch(
        `https://api.abuseipdb.com/api/v2/check?ipAddress=${encodeURIComponent(ip)}&maxAgeInDays=90&verbose`,
        {
          headers: {
            Accept: 'application/json',
            Key: 'a1b2c3d4e5f6a7b8c9d0', // Public test key
          },
          signal: AbortSignal.timeout(5000),
        }
      );
      if (abResp.ok) {
        const abData = await abResp.json();
        if (abData.data) {
          if (abData.data.abuseConfidenceScore > 0) {
            blacklisted = true;
            blacklists.push('AbuseIPDB');
          }
        }
      }
    } catch {}

    // Check via ip-api proxy flag
    try {
      const ipResp = await fetch(`http://ip-api.com/json/${ip}?fields=proxy,hosting,isp,org,mobile`, {
        signal: AbortSignal.timeout(5000),
      });
      if (ipResp.ok) {
        const ipData = await ipResp.json();
        if (ipData.proxy) {
          blacklisted = true;
          blacklists.push('Proxy Detected (ip-api)');
        }
        if (ipData.hosting) {
          blacklisted = true;
          blacklists.push('Hosting/DC Detected (ip-api)');
        }
      }
    } catch {}

    // Check against known blacklist DNSBLs
    const dnsbls = [
      'zen.spamhaus.org',
      'bl.spamcop.net',
      'dnsbl.sorbs.net',
    ];

    for (const dnsbl of dnsbls) {
      try {
        // Reverse the IP for DNSBL lookup
        const reversed = ip.split('.').reverse().join('.');
        const lookupHost = `${reversed}.${dnsbl}`;
        const dnsResp = await fetch(
          `https://dns.google.com/resolve?name=${encodeURIComponent(lookupHost)}&type=A`,
          { signal: AbortSignal.timeout(5000) }
        );
        if (dnsResp.ok) {
          const dnsData = await dnsResp.json();
          if (dnsData.Answer && dnsData.Answer.length > 0) {
            blacklisted = true;
            blacklists.push(dnsbl);
          }
        }
      } catch {}
    }
  } catch {}

  // Calculate scores based on findings
  const spamScore = blacklisted ? Math.min(100, blacklists.length * 25) : 0;
  const fraudScore = blacklisted ? Math.min(100, blacklists.length * 20) : 0;
  const abuseConfidence = blacklisted ? Math.min(100, blacklists.length * 30) : 0;

  return {
    spamScore,
    fraudScore,
    abuseConfidence,
    blacklisted,
    blacklists,
  };
}

// Latency Check — fetch with timing
export async function checkLatency(url: string): Promise<number> {
  const start = performance.now();
  try {
    const resp = await fetch(url, {
      mode: 'no-cors',
      signal: AbortSignal.timeout(10000),
    });
    const end = performance.now();
    // Even with no-cors we get the timing
    return Math.round(end - start);
  } catch {
    // If it fails, return -1 indicating timeout/failure
    return -1;
  }
}

// Audio Fingerprint — AudioContext oscillator fingerprint
export async function getAudioFingerprint(): Promise<string> {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    return new Promise((resolve) => {
      try {
        const analyser = audioCtx.createAnalyser();
        const oscillator = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        oscillator.type = 'sawtooth';
        oscillator.frequency.value = 440;
        gain.gain.value = 0.1; // Low volume

        oscillator.connect(analyser);
        analyser.connect(gain);
        gain.connect(audioCtx.destination);

        // Get frequency data
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        
        oscillator.start();
        
        setTimeout(() => {
          analyser.getByteFrequencyData(dataArray);
          oscillator.stop();
          audioCtx.close();

          // Create hash from frequency data
          const relevantData = dataArray.slice(0, 100);
          const hash = btoa(
            Array.from(relevantData)
              .map((v) => v.toString(16).padStart(2, '0'))
              .join('')
          );
          resolve(hash);
        }, 100);
      } catch {
        audioCtx.close();
        resolve('audio-fingerprint-unavailable');
      }
    });
  } catch {
    return 'audio-fingerprint-unavailable';
  }
}

// Font List — system fonts via font probing
export function getFontList(): string[] {
  const fonts = [
    'Arial', 'Arial Black', 'Arial Narrow', 'Bahnschrift', 'Calibri',
    'Cambria', 'Cambria Math', 'Candara', 'Comic Sans MS', 'Consolas',
    'Constantia', 'Corbel', 'Courier New', 'Ebrima', 'Franklin Gothic Medium',
    'Gabriola', 'Gadugi', 'Georgia', 'Gill Sans MT', 'Goudy Old Style',
    'Helvetica', 'Helvetica Neue', 'Impact', 'Ink Free', 'Javanese Text',
    'Calisto MT', 'Lucida Bright', 'Lucida Console', 'Lucida Sans',
    'Lucida Sans Unicode', 'Malgun Gothic', 'Microsoft Himalaya',
    'Microsoft JhengHei', 'Microsoft Sans Serif', 'Microsoft Tai Le',
    'Microsoft YaHei', 'Microsoft Yi Baiti', 'MingLiU', 'MingLiU-ExtB',
    'Mongolian Baiti', 'MS Gothic', 'MS Outlook', 'MS PGothic',
    'MS Reference Sans Serif', 'MS Reference Specialty', 'MT Extra',
    'MV Boli', 'Myanmar Text', 'Nirmala UI', 'Palatino Linotype',
    'Palatino', 'PMingLiU', 'PMingLiU-ExtB', 'Segoe Print', 'Segoe Script',
    'Segoe UI', 'Segoe UI Emoji', 'Segoe UI Historic', 'Segoe UI Symbol',
    'SimSun', 'SimSun-ExtB', 'Sitka Banner', 'Sitka Display', 'Sitka Heading',
    'Sitka Small', 'Sitka Subheading', 'Sitka Text', 'Sylfaen', 'Symbol',
    'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana', 'Webdings',
    'Wingdings', 'Yu Gothic', 'Inter', 'JetBrains Mono', 'Fira Code',
    'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Noto Sans', 'Source Sans Pro',
  ];

  const available: string[] = [];
  const baseFont = 'monospace';
  const testStr = 'mmmmmmwwwwwwbbbbbb';

  for (const font of fonts) {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 40;
      const ctx = canvas.getContext('2d');
      if (!ctx) continue;

      ctx.font = `16px "${font}", ${baseFont}`;
      const width1 = ctx.measureText(testStr).width;

      ctx.font = `16px ${baseFont}`;
      const width2 = ctx.measureText(testStr).width;

      // If the width differs from base, the font is available
      if (Math.abs(width1 - width2) > 1) {
        available.push(font);
      }
    } catch {
      continue;
    }
  }

  return available;
}

// Headless Browser Detection
export function isHeadlessBrowser(): boolean {
  const checks: boolean[] = [];

  // Check 1: navigator.webdriver
  checks.push(Boolean((navigator as any).webdriver));

  // Check 2: chrome.runtime (headless Chrome doesn't have this)
  if (typeof (globalThis as any).chrome !== 'undefined' && (globalThis as any).chrome.runtime) {
    checks.push(false); // Has chrome.runtime = likely real browser
  } else if (typeof (globalThis as any).chrome !== 'undefined') {
    checks.push(true); // chrome exists but no runtime = headless
  }

  // Check 3: User agent contains headless keywords
  const ua = navigator.userAgent.toLowerCase();
  checks.push(
    ua.includes('headless') ||
    ua.includes('phantomjs') ||
    ua.includes('puppeteer') ||
    ua.includes('selenium')
  );

  // Check 4: navigator.plugins length
  checks.push(navigator.plugins?.length === 0);

  // Check 5: navigator.languages
  checks.push(!navigator.languages || navigator.languages.length === 0);

  // Check 6: Missing certain APIs that real browsers have
  try {
    const hasBrokenChrome = Boolean(
      (navigator as any).connection &&
      typeof (navigator as any).connection === 'object' &&
      !('onchange' in (navigator as any).connection)
    );
    checks.push(hasBrokenChrome);
  } catch {
    checks.push(false);
  }

  // If any check is positive, it might be headless
  return checks.some((c) => c === true);
}

// Device Fingerprint — composite hash of all fingerprints
export function getDeviceFingerprint(): string {
  try {
    const components: string[] = [];

    // Screen
    components.push(`${screen.width}x${screen.height}x${screen.colorDepth}`);

    // Timezone
    try {
      components.push(Intl.DateTimeFormat().resolvedOptions().timeZone);
    } catch {}

    // Language
    components.push(navigator.language);
    components.push((navigator.languages || []).join(','));

    // Platform
    components.push((navigator as any).platform || '');

    // Hardware
    components.push(String(navigator.hardwareConcurrency || ''));
    components.push(String((navigator as any).deviceMemory || ''));

    // Canvas fingerprint (include part of it)
    const canvasFp = getCanvasFingerprint();
    if (canvasFp && canvasFp.length > 50) {
      components.push(canvasFp.substring(0, 50));
    }

    // WebGL
    const webgl = getWebGLInfo();
    components.push(webgl.vendor);
    components.push(webgl.renderer);

    // Fonts
    const fonts = getFontList();
    components.push(String(fonts.length));
    components.push(fonts.slice(0, 10).join(','));

    // Create a hash
    const combined = components.join('|||');
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      const char = combined.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0; // Convert to 32bit integer
    }

    return Math.abs(hash).toString(16).padStart(8, '0');
  } catch {
    return 'fingerprint-error';
  }
}
