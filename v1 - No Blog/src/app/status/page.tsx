"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import AdBottom from "@/components/AdBottom";

interface Monitor {
  name: string;
  url: string;
  expectedStatus: number;
  timeout: number;
}

interface PingRecord {
  status: "operational" | "down";
  latency: number;
  timestamp: number;
}

interface Segment {
  ok: boolean;
  percentage: string;
  date: string;
}

interface ApiService {
  name: string;
  url: string;
  status: "operational" | "down";
  responseTime: string;
  uptime: string;
  segments: (Segment | null)[];
}

interface ServiceStatus {
  name: string;
  url: string;
  status: "operational" | "down";
  responseTime: string;
  uptime: string;
  segments: (Segment | null)[];
}

const MONITORS_URL = "https://cdn.acorehosting.com/monitors.json";
const API_URL = "https://acore-status.sqidgeon.uk/api/status";
const REFRESH_INTERVAL = 60000;
const COOLDOWN_MS = 15000;

async function pingMonitor(monitor: Monitor, signal: AbortSignal): Promise<{ online: boolean; latency: number }> {
  const start = performance.now();
  try {
    await fetch(monitor.url, { method: "HEAD", mode: "no-cors", signal: AbortSignal.timeout(monitor.timeout || 8000) });
    const latency = Math.round(performance.now() - start);
    return { online: true, latency };
  } catch {
    const latency = Math.round(performance.now() - start);
    return { online: false, latency };
  }
}

export default function StatusPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const [services, setServices] = useState<ServiceStatus[]>([]);
  const [overall, setOverall] = useState<"operational" | "degraded" | "down">("operational");
  const [overallUptime, setOverallUptime] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fallback, setFallback] = useState(false);
  const cooldownRef = useRef<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const servicesRef = useRef<ServiceStatus[]>([]);

  const checkAll = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const apiRes = await fetch(API_URL, { signal: AbortSignal.timeout(8000) });
      if (apiRes.ok && !controller.signal.aborted) {
        const data = await apiRes.json();
        const mapped: ServiceStatus[] = (data.services || []).map((s: ApiService) => ({
          name: s.name,
          url: s.url,
          status: s.status,
          responseTime: s.responseTime,
          uptime: s.uptime,
          segments: s.segments || [],
        }));
        servicesRef.current = mapped;
        setServices(mapped);
        setOverall(data.overall || "operational");
        setOverallUptime(data.overallUptime || "");
        setLastUpdated(new Date(data.updatedAt));
        setLoading(false);
        setFallback(false);
        return;
      }
    } catch {}

    if (controller.signal.aborted) return;

    try {
      const monRes = await fetch(MONITORS_URL, { signal: controller.signal });
      const monitors: Monitor[] = await monRes.json();
      if (controller.signal.aborted || monitors.length === 0) {
        if (servicesRef.current.length === 0) { setOverall("down"); setLoading(false); }
        return;
      }

        const results: ServiceStatus[] = await Promise.all(
          monitors.map(async (m) => {
            const { online, latency } = await pingMonitor(m, controller.signal);
            const status: "operational" | "down" = online ? "operational" : "down";
            const uptime = online ? "100.00%" : "0.00%";
            return { name: m.name, url: m.url, status, responseTime: `${latency}ms`, uptime, segments: [] };
          })
        );

        if (!controller.signal.aborted) {
          servicesRef.current = results;
          setServices(results);
          const allOnline = results.every(r => r.status === "operational");
          const someOnline = results.some(r => r.status === "operational");
          setOverall(allOnline ? "operational" : someOnline ? "degraded" : "down");
          const avgUptime = results.length > 0 ? (results.filter(r => r.status === "operational").length / results.length * 100).toFixed(2) + "%" : "";
          setOverallUptime(avgUptime);
          setLastUpdated(new Date());
        setLoading(false);
        setFallback(true);
      }
    } catch {
      if (!controller.signal.aborted && servicesRef.current.length === 0) {
        setOverall("down");
        setLoading(false);
        setFallback(true);
      }
    }
  }, []);

  useEffect(() => {
    checkAll();
    const interval = setInterval(checkAll, REFRESH_INTERVAL);
    return () => { clearInterval(interval); if (abortRef.current) abortRef.current.abort(); };
  }, [checkAll]);

  useEffect(() => {
    document.title = "Acore Hosting \u2022 Status";
    const onScroll = () => { setScrolled(window.scrollY > 20); setVisible(window.scrollY > 400); };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleRefresh = () => {
    if (cooldown > 0) return;
    checkAll();
    setCooldown(COOLDOWN_MS / 1000);
    if (cooldownRef.current) clearInterval(cooldownRef.current);
    cooldownRef.current = window.setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) {
          if (cooldownRef.current) clearInterval(cooldownRef.current);
          cooldownRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const overallLabel = overall === "operational" ? "Operational" : overall === "degraded" ? "Degraded" : "Offline";
  const overallColor = overall === "operational" ? "text-emerald-500" : overall === "degraded" ? "text-yellow-500" : "text-red-500";

  const links = [
    { href: "/", label: "Home", color: "green" },
  ];

  return (
    <>
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] lg:w-max max-w-4xl px-12 py-2 flex items-center gap-10 glass-card !rounded-2xl border-none transition-all duration-700 ${scrolled ? "nav-scrolled" : "nav-glass-hidden"}`}>
        <Link href="/" className="flex items-center gap-3">
          <img src="https://cdn.acorehosting.com/logo/logo-dark.webp" alt="Acore Hosting" className="h-11 w-auto" />
        </Link>
        <div className="hidden md:flex items-center gap-3">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`btn-outline backdrop-blur-md text-base font-semibold !px-5 !py-2 rounded-2xl hover:brightness-125 transition-all ${l.color}`}>{l.label}</Link>
          ))}
          <Link href="/services" className="btn-outline backdrop-blur-md text-base font-semibold !px-5 !py-2 rounded-2xl hover:brightness-125 transition-all green">Services</Link>
          <Link href="/zero" className="btn-outline backdrop-blur-md text-base font-semibold !px-5 !py-2 rounded-2xl hover:brightness-125 transition-all blue">Free Hosting</Link>
          <Link href="/login" className="btn-outline backdrop-blur-md text-base font-semibold !px-5 !py-2 rounded-2xl hover:brightness-125 transition-all ">Login</Link>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex items-center justify-center h-10 w-10 glass-card !rounded-xl ml-auto">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
        </button>
      </nav>
      <div className={`fixed inset-0 z-[60] bg-[#0d0d0f] md:hidden transition-all duration-300 ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} />
      <div className={`fixed inset-0 z-[60] flex items-center justify-center md:hidden transition-all duration-300 ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 h-12 w-12 glass-card !rounded-2xl flex items-center justify-center hover:brightness-125 transition-all">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <ul className="flex flex-col items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setMenuOpen(false)} className={`btn-outline backdrop-blur-md text-base font-semibold !px-8 !py-3 rounded-2xl hover:brightness-125 transition-all ${l.color}`}>{l.label}</Link>
            </li>
          ))}
          <li>
            <Link href="/services" onClick={() => setMenuOpen(false)} className="btn-outline backdrop-blur-md text-base font-semibold !px-8 !py-3 rounded-2xl hover:brightness-125 transition-all green">Services</Link>
          </li>
          <li>
            <Link href="/zero" onClick={() => setMenuOpen(false)} className="btn-outline backdrop-blur-md text-base font-semibold !px-8 !py-3 rounded-2xl hover:brightness-125 transition-all blue">Free Hosting</Link>
          </li>
          <li>
            <Link href="/login" onClick={() => setMenuOpen(false)} className="btn-outline backdrop-blur-md text-base font-semibold !px-8 !py-3 rounded-2xl hover:brightness-125 transition-all ">Login</Link>
          </li>
        </ul>
      </div>
      <div className="min-h-screen flex flex-col bg-black">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#22c55e]/5 rounded-full blur-3xl" />
      </div>
      <div className="flex-1 w-screen flex flex-col items-center px-4 pt-32 pb-20 relative z-10">
        <div className="w-full max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <img src="https://cdn.acorehosting.com/logo/logo-dark.webp" alt="Acore Hosting" className="h-16 w-auto drop-shadow-[0_0_30px_rgba(34,197,94,0.3)]" />
            </div>
            <p className="text-zinc-400 text-sm">System Status &amp; Incident Report</p>
          </header>

          {fallback && (
            <div className="flex items-center gap-2 mb-4 text-xs text-orange-400 bg-orange-500/5 border border-orange-500/20 rounded-xl px-4 py-3">
              <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
              Whoops! Could not connect to the status servers, reverting to backup!
            </div>
          )}

          <div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-zinc-800 p-6 md:p-8 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-8 h-8 ${overall === "operational" ? "text-emerald-500" : overall === "degraded" ? "text-yellow-500" : "text-red-500"}`}>
                  {overall === "operational" ? (
                    <><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></>
                  ) : overall === "degraded" ? (
                    <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></>
                  ) : (
                    <><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></>
                  )}
                </svg>
                <div>
                  <div className="text-sm text-zinc-400 font-medium">Current Status</div>
                  <div className={`text-2xl font-semibold ${overallColor}`}>{overallLabel}</div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <div className="text-zinc-400">Uptime</div>
                  <div className="font-semibold text-white">{overallUptime || "—"}</div>
                </div>
                <div className="text-center">
                  <div className="text-zinc-400">Period</div>
                  <div className="font-semibold text-white">14 days</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                disabled={cooldown > 0}
                className={`text-xs px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900/60 text-zinc-400 flex items-center gap-1.5 transition-all ${cooldown > 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-zinc-800 hover:text-white"}`}
              >
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                Refresh{cooldown > 0 ? ` (${cooldown}s)` : ""}
              </button>
              {lastUpdated && (
                <span className="text-xs text-zinc-600">Updated {lastUpdated.toLocaleTimeString()}</span>
              )}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20 text-zinc-500">Loading status...</div>
          ) : services.length === 0 ? (
            <div className="text-center py-20 text-zinc-500">No services available.</div>
          ) : (
            <section className="mb-8">
              <div className="text-lg font-semibold text-zinc-300 mb-4">Services</div>
              <div className="bg-zinc-900/80 backdrop-blur-sm rounded-xl border border-zinc-800 overflow-hidden">
                {services.map((svc, idx) => {
                  const online = svc.status === "operational";
                  return (
                    <div key={svc.name} className={`border-b last:border-b-0 border-zinc-800 p-4 transition-colors duration-200 ${idx < services.length - 1 ? "border-b border-zinc-800" : ""}`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {online ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-emerald-500 flex-shrink-0"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-red-500 flex-shrink-0"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg>
                          )}
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="font-medium text-white truncate">{svc.name}</span>
                            <a href={svc.url} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#22c55e] transition-colors flex-shrink-0">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 text-sm flex-shrink-0">
                          <span className="text-zinc-400 font-mono">{svc.responseTime}</span>
                          <span className={`font-medium ${online ? "text-emerald-500" : "text-red-500"}`}>{online ? "Operational" : "Offline"}</span>
                          <span className="text-zinc-400">{svc.uptime} uptime</span>
                        </div>
                      </div>
                      {fallback ? (
                        <div className="mt-4">
                          <div className={`h-2 w-full rounded-sm ${online ? "bg-emerald-500" : "bg-red-500"}`} />
                        </div>
                      ) : (
                        <div className="mt-4">
                          {svc.segments.length > 0 ? (
                            <>
                              <div className="flex gap-0.5 h-[100px] items-end">
                                {svc.segments.map((seg, i) => (
                                  <div key={i} className="relative flex-1 group flex flex-col items-center justify-end h-full">
                                    {seg ? (
                                      <div
                                        className={`w-full rounded-sm transition-all ${seg.ok ? "bg-emerald-500" : "bg-red-500"}`}
                                        style={{ height: `${Math.max(3, parseFloat(seg.percentage))}%` }}
                                      />
                                    ) : (
                                      <div className="w-full bg-zinc-800/40 rounded-sm" style={{ height: "3px" }} />
                                    )}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20 border border-zinc-700">
                                      {new Date(seg?.date || Date.now()).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}: {seg ? parseFloat(seg.percentage).toFixed(1) : "—"}% uptime
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="flex gap-0.5 mt-1">
                                {svc.segments.map((_, i) => (
                                  <div key={i} className="flex-1 text-[6px] text-zinc-600 text-center uppercase tracking-wider truncate">
                                    {(() => { const d = new Date(); d.setDate(d.getDate() - (13 - i)); return d.toLocaleDateString("en-US", { weekday: "short" }); })()}
                                  </div>
                                ))}
                              </div>
                            </>
                          ) : (
                            <div className={`h-2 w-full rounded-sm ${online ? "bg-emerald-500" : "bg-red-500"}`} />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

        </div>
      </div>
      <AdBottom /><Footer />
    </div>
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={`fixed bottom-6 right-6 z-50 glass-card !rounded-full h-12 w-12 flex items-center justify-center transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`} aria-label="Scroll to top">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
      </button>
    </>
  );
}

function Footer() {
  return (
    <footer className="w-screen px-5 py-16 border-t border-zinc-800 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <img src="https://cdn.acorehosting.com/logo.png" alt="Acore Hosting" className="h-8 w-auto mb-4" />
            <p className="text-sm text-zinc-500 leading-relaxed">Green-powered hosting infrastructure. Fast, reliable, and built for the modern web.</p>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4 text-zinc-300">Product</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><Link href="/service/minecraft" className="hover:text-white transition-colors">Minecraft Hosting</Link></li>
              <li><Link href="/service/code" className="hover:text-white transition-colors">Code Hosting</Link></li>
              <li><Link href="/service/hytale" className="hover:text-white transition-colors">Hytale Hosting</Link></li>
              <li><Link href="/zero" className="hover:text-white transition-colors">Free Hosting</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4 text-zinc-300">Resources</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><Link href="/status" className="hover:text-white transition-colors">Status</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4 text-zinc-300">Company</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><Link href="/fair-use" className="hover:text-white transition-colors">Fair Use</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-800 pt-8 text-center text-sm text-zinc-600">&copy; {new Date().getFullYear()} Acore Hosting. All rights reserved.</div>
      </div>
    </footer>
  );
}
