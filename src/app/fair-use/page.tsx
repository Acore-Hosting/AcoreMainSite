"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdBottom from "@/components/AdBottom";

export default function FairUsePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    document.title = "Acore Hosting \u2022 Fair Use";
    const onScroll = () => { setScrolled(window.scrollY > 20); setVisible(window.scrollY > 400); };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
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
      <div className="w-screen px-5 pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="glass-card px-4 py-1.5 rounded-full inline-block text-sm font-semibold text-[#22c55e] mb-6">Legal</div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">Fair Use <span className="text-[#22c55e]">Policy</span></h1>
            <p className="text-neutral-500 dark:text-neutral-400">Effective Date: May 14, 2026</p>
          </div>
          <div className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed space-y-6" data-aos="fade-up">
            <h2 className="text-xl font-black mt-8">1. Purpose of This Policy</h2>
            <p className="text-neutral-600 dark:text-neutral-400">This Fair Use Policy (&ldquo;FUP&rdquo;) is designed to ensure that all customers using Acore Hosting services receive a stable, fair, and high-quality hosting experience. It prevents excessive or abusive use of shared resources that could negatively affect other users.</p>
            <p className="text-neutral-600 dark:text-neutral-400">By using Acore Hosting services, you agree to comply with this policy in addition to our Terms of Service.</p>

            <hr className="border-neutral-200 dark:border-neutral-800" />

            <h2 className="text-xl font-black mt-8">2. Scope of Policy</h2>
            <p className="text-neutral-600 dark:text-neutral-400">This policy applies to all Acore Hosting services, including but not limited to:</p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-600 dark:text-neutral-400">
              <li>Game server hosting</li>
              <li>Databases</li>
              <li>Any associated network or computing resources</li>
            </ul>

            <h2 className="text-xl font-black mt-8">3. Fair Use Principles</h2>
            <p className="text-neutral-600 dark:text-neutral-400">Acore Hosting operates on shared infrastructure. This means all users must use resources responsibly and avoid activities that degrade service quality for others.</p>
            <p className="text-neutral-600 dark:text-neutral-400">Users must:</p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-600 dark:text-neutral-400">
              <li>Use only the resources reasonably required for their service</li>
              <li>Avoid continuous or unnecessary high CPU, RAM, or bandwidth usage</li>
              <li>Ensure applications are optimized and not poorly configured</li>
              <li>Respect allocated limits and usage guidelines</li>
              <li>Avoid running processes that simulate denial-of-service behavior (intentional or accidental)</li>
            </ul>

            <h2 className="text-xl font-black mt-8">4. Prohibited Usage</h2>
            <p className="text-neutral-600 dark:text-neutral-400">The following activities are considered unfair use and are not allowed:</p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-600 dark:text-neutral-400">
              <li>Running abusive or malicious scripts (including botnets or crypto-mining without permission)</li>
              <li>Launching or participating in DDoS attacks</li>
              <li>Excessive resource consumption that impacts server stability</li>
              <li>Hosting illegal content or services</li>
              <li>Running open proxies or VPN exit nodes (unless explicitly approved)</li>
              <li>Spamming, phishing, or bulk unsolicited messaging</li>
              <li>Any activity that violates applicable laws or regulations</li>
            </ul>

            <h2 className="text-xl font-black mt-8">5. Resource Management</h2>
            <p className="text-neutral-600 dark:text-neutral-400">Acore Hosting may monitor resource usage to ensure fair distribution across all users. If your usage consistently exceeds acceptable levels, we may:</p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-600 dark:text-neutral-400">
              <li>Throttle or limit resource usage</li>
              <li>Suspend or temporarily restrict services</li>
              <li>Request optimization or configuration changes</li>
              <li>Recommend upgrading to a higher plan</li>
            </ul>

            <h2 className="text-xl font-black mt-8">6. Abuse Response</h2>
            <p className="text-neutral-600 dark:text-neutral-400">If a user is found violating this policy, Acore Hosting reserves the right to take action, including but not limited to:</p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-600 dark:text-neutral-400">
              <li>Temporary suspension of services</li>
              <li>Permanent termination of accounts in severe cases</li>
              <li>Removal of offending content or processes</li>
              <li>Reporting illegal activity to relevant authorities</li>
            </ul>

            <h2 className="text-xl font-black mt-8">7. Changes to This Policy</h2>
            <p className="text-neutral-600 dark:text-neutral-400">Acore Hosting may update this Fair Use Policy at any time. Changes will take effect once published. Continued use of services indicates acceptance of the updated policy.</p>

            <h2 className="text-xl font-black mt-8">8. Contact</h2>
            <p className="text-neutral-600 dark:text-neutral-400">For questions or clarification regarding this policy, please contact:</p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-600 dark:text-neutral-400">
              <li>Email: <a href="mailto:support@acorehosting.com" className="text-[#22c55e] hover:underline">support@acorehosting.com</a></li>
              <li>Website: <a href="https://www.acorehosting.com" className="text-[#22c55e] hover:underline">www.acorehosting.com</a></li>
            </ul>
          </div>
        </div>
      </div>
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={`fixed bottom-6 right-6 z-50 glass-card !rounded-full h-12 w-12 flex items-center justify-center transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`} aria-label="Scroll to top">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
      </button>
      <AdBottom /><Footer />
    </>
  );
}

function Footer() {
  return (
    <footer className="w-screen px-5 py-16 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <img src="https://cdn.acorehosting.com/logo.png" alt="Acore Hosting" className="h-8 w-auto mb-4" />
            <p className="text-sm text-neutral-500 leading-relaxed">Green-powered hosting infrastructure. Fast, reliable, and built for the modern web.</p>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li><Link href="/service/minecraft" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Minecraft Hosting</Link></li>
              <li><Link href="/service/code" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Code Hosting</Link></li>
              <li><Link href="/service/hytale" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Hytale Hosting</Link></li>
              <li><Link href="/zero" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Free Hosting</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li><Link href="/status" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Status</Link></li>
              <li><Link href="/blog" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li><Link href="/fair-use" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Fair Use</Link></li>
              <li><Link href="/privacy" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8 text-center text-sm text-neutral-500">&copy; {new Date().getFullYear()} Acore Hosting. All rights reserved.</div>
      </div>
    </footer>
  );
}
