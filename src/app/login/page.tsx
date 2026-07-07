"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import AdBottom from "@/components/AdBottom";

const panels = [
  {
    title: "Premium Panel",
    desc: "Manage your premium services, servers, and resources.",
    href: "https://gpanel.acorehosting.com",
    theme: "acore",
    logo: "https://cdn.acorehosting.com/logo.png",
  },
  {
    title: "Billing Panel",
    desc: "View invoices, update payment methods, and manage subscriptions.",
    href: "https://my.acorehosting.com",
    theme: "acore",
    logo: "https://cdn.acorehosting.com/logo.png",
  },
  {
    title: "Zero Renewal Panel",
    desc: "Renew your free Zero hosting plans and keep them active.",
    href: "https://zero.acorehosting.com",
    theme: "zero",
    logo: "https://cdn.acorehosting.com/branding/zero/logo-notext-1.png",
  },
  {
    title: "Zero Game Panel",
    desc: "Access your Zero game servers and manage them in real time.",
    href: "https://panel-zero.acorehosting.com",
    theme: "zero",
    logo: "https://cdn.acorehosting.com/branding/zero/logo-notext-1.png",
  },
];

export default function LoginPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.title = "Acore Hosting \u2022 Login";
    AOS.init({ duration: 400, easing: "ease-out-back", delay: 200 });
    const onScroll = () => { setScrolled(window.scrollY > 20); setVisible(window.scrollY > 400); };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] lg:w-max max-w-4xl px-12 py-2 flex items-center gap-10 glass-card !rounded-2xl border-none transition-all duration-700 ${scrolled ? "nav-scrolled" : "nav-glass-hidden"}`}>
        <Link href="/" className="flex items-center gap-3">
          <img src="https://cdn.acorehosting.com/logo/logo-dark.webp" alt="Acore Hosting" className="h-11 w-auto" />
        </Link>
        <div className="hidden md:flex items-center gap-3">
          <Link href="/" className="btn-outline backdrop-blur-md text-base font-semibold !px-5 !py-2 rounded-2xl hover:brightness-125 transition-all green">Home</Link>
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
          <li>
            <Link href="/" onClick={() => setMenuOpen(false)} className="btn-outline backdrop-blur-md text-base font-semibold !px-8 !py-3 rounded-2xl hover:brightness-125 transition-all green">Home</Link>
          </li>
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
      <div className="w-screen min-h-screen flex flex-col items-center justify-center px-5 pt-24">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <div className="glass-card p-1.5 px-5 rounded-full text-[15px] font-semibold text-center inline-block mb-4">Panels</div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">Access your <span className="text-[#22c55e]">panels</span></h1>
          <p className="text-lg text-neutral-500 max-w-xl mx-auto leading-relaxed">Choose a panel below to manage your services, billing, and servers.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full mx-auto px-5">
          {panels.map((p, i) => (
            <Link key={p.title} href={p.href} data-aos="fade-up" data-aos-delay={400 + i * 100} className={`glass-card !rounded-3xl p-8 flex flex-col gap-4 hover:scale-[1.02] transition-all duration-300 group border ${p.theme === "acore" ? "border-[#22c55e]/20 hover:border-[#22c55e]/50" : "border-[#14b8a6]/20 hover:border-[#14b8a6]/50"}`}>
              <div className="flex items-center gap-4">
                <img src={p.logo} alt="" className={`object-contain ${p.theme === "acore" ? "h-10" : "h-12"}`} />
                <div>
                  <h2 className="text-2xl font-black">{p.title}</h2>
                  <p className="text-sm text-neutral-500 leading-relaxed mt-1">{p.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Access panel</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M9 5l7 7-7 7" /></svg>
              </div>
            </Link>
          ))}
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
