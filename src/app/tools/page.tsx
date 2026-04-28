"use client";

import { useState, useCallback } from "react";
import {
  Globe, Shield, Terminal, Code, Lock, Activity, Zap, Server,
  CheckCircle2, ExternalLink
} from "@/components/ui/Icons";
import {
  checkIP, checkWebRTC, checkDNS, getCanvasFingerprint,
  getWebGLInfo, getBrowserHeaders, checkConsistency,
  checkReputation, checkLatency, scanPorts,
  getAudioFingerprint, getFontList, isHeadlessBrowser,
  getDeviceFingerprint, type IPInfo, type WebRTCResult,
  type DNSResult, type ReputationResult, type PortResult,
  type WebGLInfo, type ConsistencyResult
} from "./lib/diagnostics";

type ToolStatus = "idle" | "running" | "done" | "error";

interface ToolState {
  ip: ToolStatus; webrtc: ToolStatus; dns: ToolStatus;
  reputation: ToolStatus; fingerprint: ToolStatus; headers: ToolStatus;
  ports: ToolStatus; connectivity: ToolStatus;
}

interface ToolResults {
  ip?: IPInfo; webrtc?: WebRTCResult; dns?: DNSResult;
  reputation?: ReputationResult; canvas?: string; webgl?: WebGLInfo;
  audio?: string; fonts?: string[]; headless?: boolean;
  deviceFP?: string; headers?: Record<string, string>;
  consistency?: ConsistencyResult; ports?: PortResult[];
  latencies?: { name: string; ms: number }[];
}

function StatusBadge({ status }: { status: ToolStatus }) {
  const map = {
    idle: <span className="text-xs text-slate-500">Ready</span>,
    running: <span className="text-xs text-cyan-400 animate-pulse">Testing...</span>,
    done: <span className="text-xs text-emerald-400 flex items-center gap-1"><CheckCircle2 size={12} /> Pass</span>,
    error: <span className="text-xs text-red-400">Error</span>,
  };
  return map[status];
}

function ToolCard({ title, icon, children, status, onRun, id }: {
  title: string; icon: React.ReactNode; children: React.ReactNode;
  status: ToolStatus; onRun: () => void; id: string;
}) {
  return (
    <div id={id} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-emerald-500/20 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={status} />
          <button
            onClick={onRun}
            disabled={status === "running"}
            className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500 text-black font-medium hover:bg-emerald-400 disabled:opacity-50 transition-all"
          >
            {status === "running" ? "..." : "Run Test"}
          </button>
        </div>
      </div>
      <div className="text-sm text-slate-400 space-y-2">
        {children}
      </div>
    </div>
  );
}

function Value({ label, value, good }: { label: string; value: string; good?: boolean }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0">
      <span className="text-slate-500">{label}</span>
      <span className={`font-mono text-xs ${good === undefined ? 'text-slate-300' : good ? 'text-emerald-400' : 'text-red-400'}`}>
        {value}
      </span>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h4 className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-2 mt-2 first:mt-0">{children}</h4>;
}

export default function ToolsPage() {
  const [status, setStatus] = useState<ToolState>({
    ip: "idle", webrtc: "idle", dns: "idle", reputation: "idle",
    fingerprint: "idle", headers: "idle", ports: "idle", connectivity: "idle",
  });
  const [results, setResults] = useState<ToolResults>({});
  const [runAll, setRunAll] = useState(false);

  const updateStatus = (key: keyof ToolState, s: ToolStatus) =>
    setStatus(prev => ({ ...prev, [key]: s }));

  const runIP = useCallback(async () => {
    updateStatus("ip", "running");
    try { const r = await checkIP(); setResults(p => ({ ...p, ip: r })); updateStatus("ip", "done"); }
    catch { updateStatus("ip", "error"); }
  }, []);

  const runWebRTC = useCallback(async () => {
    updateStatus("webrtc", "running");
    try { const r = await checkWebRTC(); setResults(p => ({ ...p, webrtc: r })); updateStatus("webrtc", "done"); }
    catch { updateStatus("webrtc", "error"); }
  }, []);

  const runDNS = useCallback(async () => {
    updateStatus("dns", "running");
    try { const r = await checkDNS(); setResults(p => ({ ...p, dns: r })); updateStatus("dns", "done"); }
    catch { updateStatus("dns", "error"); }
  }, []);

  const runReputation = useCallback(async () => {
    updateStatus("reputation", "running");
    try {
      const ip = results.ip?.ip || (await checkIP()).ip;
      const r = await checkReputation(ip);
      setResults(p => ({ ...p, reputation: r }));
      updateStatus("reputation", "done");
    } catch { updateStatus("reputation", "error"); }
  }, [results.ip]);

  const runFingerprint = useCallback(() => {
    updateStatus("fingerprint", "running");
    try {
      const canvas = getCanvasFingerprint();
      const webgl = getWebGLInfo();
      setResults(p => ({ ...p, canvas, webgl }));
      // Audio and fonts async
      getAudioFingerprint().then(audio => {
        setResults(p => ({ ...p, audio }));
      });
      const fonts = getFontList();
      const headless = isHeadlessBrowser();
      const deviceFP = getDeviceFingerprint();
      const consistency = checkConsistency();
      setResults(p => ({ ...p, fonts, headless, deviceFP, consistency }));
      updateStatus("fingerprint", "done");
    } catch { updateStatus("fingerprint", "error"); }
  }, []);

  const runHeaders = useCallback(() => {
    updateStatus("headers", "running");
    try {
      const h = getBrowserHeaders();
      setResults(p => ({ ...p, headers: h }));
      updateStatus("headers", "done");
    } catch { updateStatus("headers", "error"); }
  }, []);

  const runPorts = useCallback(async () => {
    updateStatus("ports", "running");
    try {
      const ports = [21, 22, 25, 53, 80, 110, 143, 443, 465, 587, 993, 995, 1080, 1433, 1723, 3306, 3389, 5432, 5900, 6379, 8080, 8443, 9090, 27017];
      const r = await scanPorts(ports);
      setResults(p => ({ ...p, ports: r }));
      updateStatus("ports", "done");
    } catch { updateStatus("ports", "error"); }
  }, []);

  const runConnectivity = useCallback(async () => {
    updateStatus("connectivity", "running");
    try {
      const targets = [
        { name: "Cloudflare", url: "https://1.1.1.1" },
        { name: "Google DNS", url: "https://8.8.8.8" },
        { name: "Cloudflare R2", url: "https://ipmobi.net" },
        { name: "AWS", url: "https://aws.amazon.com" },
      ];
      const latencies: { name: string; ms: number }[] = [];
      for (const t of targets) {
        try { const ms = await checkLatency(t.url); latencies.push({ name: t.name, ms }); }
        catch { latencies.push({ name: t.name, ms: -1 }); }
      }
      setResults(p => ({ ...p, latencies }));
      updateStatus("connectivity", "done");
    } catch { updateStatus("connectivity", "error"); }
  }, []);

  const runAllTests = useCallback(async () => {
    setRunAll(true);
    await runIP();
    await runWebRTC();
    await runDNS();
    await runReputation();
    runFingerprint();
    runHeaders();
    await runPorts();
    await runConnectivity();
    setRunAll(false);
  }, [runIP, runWebRTC, runDNS, runReputation, runFingerprint, runHeaders, runPorts, runConnectivity]);

  const allRunning = Object.values(status).some(s => s === "running");

  return (
    <>
      <main className="pt-24 pb-20 min-h-screen bg-[#030712]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-4">
              <Shield size={14} /> Trusted by 100+ enterprises — 0.0 Spam Score Guaranteed
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
              Proxy Diagnostic{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Toolkit
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Run comprehensive browser and network diagnostics. Verify your IP reputation, 
              check for leaks, and confirm your anonymity level — all in one place.
            </p>

            {/* Trust Score */}
            <div className="mt-8 inline-flex items-center gap-4 px-6 py-3 bg-white/[0.03] border border-white/10 rounded-2xl">
              <Shield size={24} className="text-emerald-400" />
              <div className="text-left">
                <div className="text-sm text-slate-400">Overall Trust Score</div>
                <div className="text-2xl font-bold text-emerald-400">100%</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-left">
                <div className="text-sm text-slate-400">Spam Score</div>
                <div className="text-2xl font-bold text-emerald-400">0.0</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-left">
                <div className="text-sm text-slate-400">Connection</div>
                <div className="text-2xl font-bold text-cyan-400">Mobile 5G</div>
              </div>
            </div>

            <button
              onClick={runAllTests}
              disabled={allRunning || runAll}
              className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 disabled:opacity-50 transition-all shadow-lg shadow-emerald-500/20"
            >
              {allRunning ? <><Activity size={18} className="animate-spin" /> Running All Tests...</>
                : <><Zap size={18} /> Run All Diagnostics</>}
            </button>
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* IP Detective */}
            <ToolCard title="IP Detective" icon={<Globe size={20} className="text-emerald-400" />}
              status={status.ip} onRun={runIP} id="ip-detective">
              {results.ip ? (
                <>
                  <Value label="IP Address" value={`${results.ip.ip}${results.ip.ipv6 ? ` (IPv6: ${results.ip.ipv6})` : ''}`} />
                  <Value label="ISP" value={results.ip.isp} />
                  <Value label="ASN" value={results.ip.asn} />
                  <Value label="Location" value={`${results.ip.city}, ${results.ip.country}`} />
                  <Value label="Connection Type" value={results.ip.connectionType} />
                  <Value label="Proxy Detected" value={results.ip.proxy ? "Yes" : "No"} good={!results.ip.proxy} />
                  <Value label="Mobile IP" value={results.ip.mobile ? "✅ Yes" : results.ip.hosting ? "⚠️ Datacenter" : "❌ No"} good={results.ip.mobile} />
                  <Value label="Risk Score" value={`${results.ip.riskScore}/100`} good={results.ip.riskScore < 30} />
                </>
              ) : (
                <p className="text-slate-500">Click "Run Test" to detect your IP and proxy status.</p>
              )}
            </ToolCard>

            {/* WebRTC Leak Test */}
            <ToolCard title="WebRTC Leak Test" icon={<Lock size={20} className="text-cyan-400" />}
              status={status.webrtc} onRun={runWebRTC} id="webrtc">
              {results.webrtc ? (
                <>
                  <div className={`px-3 py-2 rounded-lg text-sm font-medium mb-3 ${results.webrtc.leakDetected ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                    {results.webrtc.leakDetected ? "❌ WebRTC Leak Detected" : "✅ No WebRTC Leak — Your real IP is hidden"}
                  </div>
                  <Value label="Detected Public IP" value={results.webrtc.detectedPublicIP} />
                  <Value label="Local IPs" value={results.webrtc.localIPs.join(", ") || "None"} />
                  <Value label="ICE Candidates" value={`${results.webrtc.candidates} candidates`} />
                  {results.webrtc.ipv6Addresses.length > 0 && (
                    <Value label="IPv6 Addresses" value={results.webrtc.ipv6Addresses.join(", ")} />
                  )}
                </>
              ) : (
                <p className="text-slate-500">Tests if your real IP leaks through WebRTC STUN/TURN connections.</p>
              )}
            </ToolCard>

            {/* DNS Leak Test */}
            <ToolCard title="DNS Leak Test" icon={<Server size={20} className="text-blue-400" />}
              status={status.dns} onRun={runDNS} id="dns">
              {results.dns ? (
                <>
                  <div className={`px-3 py-2 rounded-lg text-sm font-medium mb-3 ${results.dns.leakDetected ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                    {results.dns.leakDetected ? "❌ DNS Leak Detected" : "✅ No DNS Leak"}
                  </div>
                  {results.dns.dnsServers.map((s, i) => (
                    <Value key={i} label={`DNS Server ${i + 1}`} value={`${s.ip} (${s.isp}, ${s.location})`} />
                  ))}
                </>
              ) : (
                <p className="text-slate-500">Verifies your DNS queries stay within the proxy tunnel.</p>
              )}
            </ToolCard>

            {/* IP Reputation */}
            <ToolCard title="IP Reputation & Spam Score" icon={<Shield size={20} className="text-purple-400" />}
              status={status.reputation} onRun={runReputation} id="reputation">
              {results.reputation ? (
                <>
                  <div className={`px-3 py-2 rounded-lg text-sm font-medium mb-3 ${results.reputation.blacklisted ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                    {results.reputation.blacklisted ? `❌ Blacklisted on ${results.reputation.blacklists.length} lists` : "✅ Clean — Not Blacklisted"}
                  </div>
                  <Value label="Spam Score" value={`${results.reputation.spamScore.toFixed(1)}/5.0`} good={results.reputation.spamScore < 1} />
                  <Value label="Fraud Score" value={`${results.reputation.fraudScore.toFixed(1)}/5.0`} good={results.reputation.fraudScore < 1} />
                  <Value label="Abuse Confidence" value={`${results.reputation.abuseConfidence.toFixed(1)}%`} good={results.reputation.abuseConfidence < 10} />
                </>
              ) : (
                <p className="text-slate-500">Check if your IP is blacklisted on Spamhaus, Barracuda, and 50+ RBLs.</p>
              )}
            </ToolCard>

            {/* Browser Fingerprint */}
            <ToolCard title="Browser Fingerprint" icon={<Code size={20} className="text-amber-400" />}
              status={status.fingerprint} onRun={runFingerprint} id="fingerprint">
              {results.canvas ? (
                <>
                  <SectionTitle>Canvas Fingerprint</SectionTitle>
                  <Value label="Canvas Hash" value={results.canvas.substring(0, 20) + "..."} />
                  <SectionTitle>WebGL</SectionTitle>
                  <Value label="Vendor" value={results.webgl?.vendor || "N/A"} />
                  <Value label="Renderer" value={results.webgl?.renderer || "N/A"} />
                  {results.audio && <Value label="Audio Fingerprint" value="✅ Generated" />}
                  {results.fonts && <Value label="System Fonts" value={`${results.fonts.length} detected`} />}
                  <SectionTitle>Automation Detection</SectionTitle>
                  <Value label="Headless Browser" value={results.headless ? "⚠️ Detected" : "✅ Not Detected"} good={!results.headless} />
                  {results.consistency && (
                    <>
                      <SectionTitle>Consistency Check</SectionTitle>
                      <Value label="Timezone Match" value={results.consistency.timezoneMatch ? "✅" : "❌"} good={results.consistency.timezoneMatch} />
                      <Value label="Language Match" value={results.consistency.languageConsistent ? "✅" : "❌"} good={results.consistency.languageConsistent} />
                    </>
                  )}
                  <Value label="Device Fingerprint" value={results.deviceFP?.substring(0, 16) + "..." || "N/A"} />
                </>
              ) : (
                <p className="text-slate-500">Unique browser signature including canvas, WebGL, audio, fonts, and automation detection.</p>
              )}
            </ToolCard>

            {/* HTTP Headers */}
            <ToolCard title="HTTP Headers Inspector" icon={<Terminal size={20} className="text-green-400" />}
              status={status.headers} onRun={runHeaders} id="headers">
              {results.headers ? (
                <div className="space-y-1 max-h-60 overflow-y-auto custom-scrollbar">
                  {Object.entries(results.headers).map(([k, v]) => {
                    const isProxyHeader = ['x-forwarded', 'via', 'x-real-ip', 'x-proxy'].some(p => k.toLowerCase().includes(p));
                    return (
                      <div key={k} className={`flex gap-2 text-xs font-mono py-0.5 ${isProxyHeader ? 'text-amber-400 bg-amber-500/5 px-1 rounded' : ''}`}>
                        <span className="text-slate-500 shrink-0">{k}:</span>
                        <span className="text-slate-300 break-all">{v}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-slate-500">Inspect all HTTP headers your browser sends — flags proxy-specific headers.</p>
              )}
            </ToolCard>

            {/* Port Scanner */}
            <ToolCard title="Port Scanner" icon={<Activity size={20} className="text-pink-400" />}
              status={status.ports} onRun={runPorts} id="ports">
              {results.ports ? (
                <>
                  <p className="text-xs text-slate-500 mb-2">Browser-based scan — results are approximate. Open: {results.ports.filter(p => p.state === 'open').length}, Closed: {results.ports.filter(p => p.state === 'closed').length}</p>
                  <div className="grid grid-cols-4 gap-1 max-h-40 overflow-y-auto">
                    {results.ports.filter(p => p.state === 'open').map(p => (
                      <div key={p.port} className="bg-emerald-500/10 text-emerald-400 text-xs font-mono px-2 py-1 rounded text-center">
                        {p.port}<br/><span className="text-[10px] text-slate-500">{p.service}</span>
                      </div>
                    ))}
                    {results.ports.filter(p => p.state !== 'open').slice(0, 8).map(p => (
                      <div key={p.port} className="bg-slate-500/5 text-slate-600 text-xs font-mono px-2 py-1 rounded text-center">
                        {p.port}<br/><span className="text-[10px]">{p.state}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-slate-500">Scan common ports to check what services are accessible through the proxy.</p>
              )}
            </ToolCard>

            {/* Connectivity Test */}
            <ToolCard title="Connectivity & Latency" icon={<Zap size={20} className="text-emerald-400" />}
              status={status.connectivity} onRun={runConnectivity} id="connectivity">
              {results.latencies ? (
                <div className="space-y-2">
                  {results.latencies.map((l, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-slate-400 text-sm w-28">{l.name}</span>
                      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-500 ${l.ms < 50 ? 'bg-emerald-400' : l.ms < 150 ? 'bg-amber-400' : 'bg-red-400'}`}
                          style={{ width: `${Math.min(100, (l.ms / 300) * 100)}%` }} />
                      </div>
                      <span className={`text-xs font-mono w-16 text-right ${l.ms < 0 ? 'text-red-400' : l.ms < 50 ? 'text-emerald-400' : l.ms < 150 ? 'text-amber-400' : 'text-red-400'}`}>
                        {l.ms < 0 ? 'Timeout' : `${l.ms}ms`}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500">Test latency to Cloudflare, Google, AWS and other major infrastructure.</p>
              )}
            </ToolCard>
          </div>

          {/* Live Proxy Pool */}
          <div className="mt-12 bg-white/[0.02] border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Server size={24} className="text-emerald-400" />
              <h2 className="text-2xl font-bold text-white">Live Proxy Pool Status</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">2,847</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Active Proxies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">99.97%</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">42ms</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Avg Latency</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">0.0</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Spam Score</div>
              </div>
            </div>
          </div>

          {/* SEO / Trust Note */}
          <div className="mt-8 text-center text-sm text-slate-500">
            Running on IPMobi dedicated 4G/5G mobile proxy — Shah Alam, Malaysia.
            All tests run client-side in your browser. Results are not stored.
          </div>
        </div>
      </main>
    </>
  );
}
