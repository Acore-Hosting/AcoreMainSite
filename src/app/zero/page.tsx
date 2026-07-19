"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import AdBottom from "@/components/AdBottom";

const software = [
  { name: "Python", img: "https://zero.acorehosting.com/assets/python.svg" },
  { name: "Minecraft", img: "https://zero.acorehosting.com/assets/minecraft.svg" },
  { name: "BeamMP", img: "https://zero.acorehosting.com/assets/beammp.svg" },
  { name: "Java", img: "https://zero.acorehosting.com/assets/java.svg" },
  { name: "Node.js", img: "https://zero.acorehosting.com/assets/nodejs.svg" },
  { name: "MCXboxBroadcast", img: "https://zero.acorehosting.com/assets/mcxboxbroadcast.svg" },
];

const features = [
  {
    title: "4 GB RAM",
    desc: "Plenty of memory for Minecraft.",
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
  },
  {
    title: "200% CPU",
    desc: "Fair-share CPU allocation with plenty of headroom.",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    title: "10 GB Storage",
    desc: "Space for code, assets, databases, and more.",
    icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  },
  {
    title: "5 Ports",
    desc: "Run up to 5 ports simultaneously on your free server.",
    icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
  },
  {
    title: "24/7 Uptime",
    desc: "Your services stay online around the clock.",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "DDoS Protection",
    desc: "Basic DDoS protection included on all free plans.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
];

export default function FreeHostingPage() {
  useEffect(() => {
    document.title = "Acore Hosting \u2022 Zero";
    AOS.init({ duration: 400, easing: "ease-out-back", delay: 200 });
  }, []);

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Header />
      <Features />
      <Software />
      <Limits />
      <CTA />
      <AdBottom /><Footer />
    </>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
    </>
  );
}

function Header() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center px-5 pt-24 bg-cover bg-center bg-no-repeat relative" style={{backgroundImage: "url(https://wallpapercave.com/wp/wp6005703.png)"}}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-[#0a0a0a] pointer-events-none" />
      <div className="max-w-4xl mx-auto text-center relative z-10" data-aos="fade-up">
        <img src="https://cdn.acorehosting.com/branding/zero/logo-notext-1.png" alt="Zero" className="h-20 w-auto mx-auto mb-6" />
        <div className="glass-card px-4 py-1.5 rounded-full inline-block text-sm font-semibold text-[#14b8a6] mb-6">Free</div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
          Free hosting
          <br />
          <span className="text-[#14b8a6]">for everyone</span>
        </h1>
        <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed mb-8">
          4 GB RAM &bull; 200% CPU &bull; 10 GB storage &bull; 5 ports. No credit card required.
        </p>
        <a href="https://zero.acorehosting.com" target="_blank" rel="noopener noreferrer" className="btn scale tilt bg-[#14b8a6] text-[#0f766e] px-10 py-4 text-lg font-bold">
          Get started
        </a>
      </div>
    </div>
  );
}

function Features() {
  return (
    <section className="w-screen px-5 py-28 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            What you get for free
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
            All the essentials to get your project off the ground — at no cost.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={i * 100} className="glass-card rounded-2xl p-6 flex flex-col gap-4">
              <div className="w-10 h-10 glass-card !rounded-xl flex items-center justify-center">
                <svg className="h-5 w-5 text-[#14b8a6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={f.icon} /></svg>
              </div>
              <div>
                <h3 className="font-bold">{f.title}</h3>
                <p className="text-sm text-neutral-500 mt-1">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Software() {
  return (
    <section className="w-screen px-5 py-28 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Supported software
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
            Run the tools and games you love — all on the free tier.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 justify-center" data-aos="fade-up">
          {software.map((s, i) => (
            <div key={i} className="glass-card flex items-center gap-4 rounded-2xl px-6 py-4 hover:scale-95 transition-transform duration-300 ease-out">
              <img src={s.img} alt={s.name} className="h-8 w-8 object-contain" />
              <span className="font-semibold text-sm">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Limits() {
  return (
    <section className="w-screen px-5 py-28 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
        <div className="w-14 h-14 rounded-2xl bg-[#f59e0b]/10 flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 8L6 20H18L20 8M4 8L5.71624 9.37299C6.83218 10.2657 7.39014 10.7121 7.95256 10.7814C8.4453 10.8421 8.94299 10.7173 9.34885 10.4314C9.81211 10.1051 10.0936 9.4483 10.6565 8.13476L12 5M4 8C4.55228 8 5 7.55228 5 7C5 6.44772 4.55228 6 4 6C3.44772 6 3 6.44772 3 7C3 7.55228 3.44772 8 4 8ZM20 8L18.2838 9.373C17.1678 10.2657 16.6099 10.7121 16.0474 10.7814C15.5547 10.8421 15.057 10.7173 14.6511 10.4314C14.1879 10.1051 13.9064 9.4483 13.3435 8.13476L12 5M20 8C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6C19.4477 6 19 6.44772 19 7C19 7.55228 19.4477 8 20 8ZM12 5C12.5523 5 13 4.55228 13 4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4C11 4.55228 11.4477 5 12 5ZM12 4H12.01M20 7H20.01M4 7H4.01" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
          Go <span className="text-[#f59e0b]">Premium</span>
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto mb-10">
          Need more power? Upgrade to a premium plan for dedicated resources, higher limits, and priority support.
        </p>
        <a href="/select" className="btn scale tilt bg-[#f59e0b] text-[#78350f] px-10 py-4 text-lg font-bold inline-flex items-center gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 8L6 20H18L20 8M4 8L5.71624 9.37299C6.83218 10.2657 7.39014 10.7121 7.95256 10.7814C8.4453 10.8421 8.94299 10.7173 9.34885 10.4314C9.81211 10.1051 10.0936 9.4483 10.6565 8.13476L12 5M4 8C4.55228 8 5 7.55228 5 7C5 6.44772 4.55228 6 4 6C3.44772 6 3 6.44772 3 7C3 7.55228 3.44772 8 4 8ZM20 8L18.2838 9.373C17.1678 10.2657 16.6099 10.7121 16.0474 10.7814C15.5547 10.8421 15.057 10.7173 14.6511 10.4314C14.1879 10.1051 13.9064 9.4483 13.3435 8.13476L12 5M20 8C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6C19.4477 6 19 6.44772 19 7C19 7.55228 19.4477 8 20 8ZM12 5C12.5523 5 13 4.55228 13 4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4C11 4.55228 11.4477 5 12 5ZM12 4H12.01M20 7H20.01M4 7H4.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Premium
        </a>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="w-screen bg-[#14b8a6] px-5 py-28">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-black text-[#0a4d44] tracking-tight mb-6" data-aos="fade-up">
          Start building for free
        </h2>
        <p className="text-lg text-[#0f766e]/80 max-w-lg mx-auto mb-10" data-aos="fade-up" data-aos-delay="150">
          No credit card required. 30-day money-back guarantee on upgrades.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="300">
          <a href="https://zero.acorehosting.com" target="_blank" rel="noopener noreferrer" className="btn scale tilt bg-[#0f766e] text-white font-bold px-10 py-4 text-lg hover:bg-[#115e59] rounded-full hover:rounded-2xl transition-all duration-300">
            Get started free
          </a>
          <Link href="/" className="btn scale tilt bg-white/20 text-[#0f766e] font-bold px-10 py-4 text-lg hover:bg-white/30">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={`fixed bottom-6 right-6 z-50 glass-card !rounded-full h-12 w-12 flex items-center justify-center transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`} aria-label="Scroll to top">
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
    </button>
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
