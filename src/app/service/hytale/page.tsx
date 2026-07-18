"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import AdBottom from "@/components/AdBottom";

const plans = [
  {
    name: "Bee",
    image: "https://cdn.acorehosting.com/icon/plan/bee.png",
    ram: "2 GB RAM",
    desc: "For a super small server",
    cpu: "10 GB NVMe Storage",
    storage: "1 vCPU Core",
    plugins: "3 Backups",
    backups: "Unlimited ports on request",
    price: "$3.99",
    popular: false,
  },
  {
    name: "Allay",
    image: "https://cdn.acorehosting.com/icon/plan/allay.png",
    ram: "4 GB RAM",
    desc: "Alright for a few friends",
    cpu: "20 GB NVMe Storage",
    storage: "2 vCPU Cores",
    plugins: "3 Backups",
    backups: "Unlimited ports on request",
    price: "$7.99",
    popular: false,
  },
  {
    name: "Axolotl",
    image: "https://cdn.acorehosting.com/icon/plan/axolotl.png",
    ram: "6 GB RAM",
    desc: "You can add some heavier mods or plugins",
    cpu: "30 GB NVMe Storage",
    storage: "3 vCPU Cores",
    plugins: "2 Backups",
    backups: "Unlimited ports on request",
    price: "$11.99",
    popular: false,
  },
  {
    name: "Wolf",
    image: "https://cdn.acorehosting.com/icon/plan/wolf.png",
    ram: "8 GB RAM",
    desc: "Great for a server for a small community",
    cpu: "40 GB NVMe Storage",
    storage: "4 vCPU Cores",
    plugins: "2 Backups",
    backups: "Unlimited ports on request",
    price: "$15.99",
    popular: false,
  },
  {
    name: "Spider",
    image: "https://cdn.acorehosting.com/icon/plan/spider.png",
    ram: "10 GB RAM",
    desc: "Perfect for a lot of plugins / mods",
    cpu: "50 GB NVMe Storage",
    storage: "5 vCPU Cores",
    plugins: "1 Backup",
    backups: "Unlimited ports on request",
    price: "$19.99",
    popular: false,
  },
  {
    name: "Blaze",
    image: "https://cdn.acorehosting.com/icon/plan/blaze.png",
    ram: "12 GB RAM",
    desc: "Amazing for many plugins / mods / large worlds",
    cpu: "60 GB NVMe Storage",
    storage: "6 vCPU Cores",
    plugins: "1 Backup",
    backups: "Unlimited ports on request",
    price: "$23.99",
    popular: false,
  },
];

export default function HytalePage() {
  useEffect(() => {
    document.title = "Acore Hosting \u2022 Hytale Hosting";
    AOS.init({ duration: 400, easing: "ease-out-back", delay: 200 });
  }, []);

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Header />
      <Plans />
      <FreeHosting />
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
    <div className="w-screen min-h-screen flex flex-col items-center justify-center px-5 pt-24 bg-cover bg-center bg-no-repeat relative" style={{backgroundImage: "url(https://wallpapercave.com/wp/wp6208636.jpg)"}}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-[#0a0a0a] pointer-events-none" />
      <div className="max-w-4xl mx-auto text-center relative z-10" data-aos="fade-up">
        <div className="glass-card px-4 py-1.5 rounded-full inline-block text-sm font-semibold text-[#3b82f6] mb-6">
          Hytale Hosting
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
          Ready for Hytale
          <br />
          <span className="text-[#3b82f6]">server hosting</span>
        </h1>
        <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
          Pre-configured Hytale servers with mod support and instant setup when the game drops.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mt-10 relative z-10" data-aos="fade-up" data-aos-delay="300">
        <Link href="#plans" className="btn scale tilt bg-[#3b82f6] text-[#1e3a5f] px-8 py-4 text-lg font-bold">
          View plans
        </Link>
        <Link href="/contact" className="btn scale glass-card px-8 py-4 text-lg font-semibold">
          Contact sales
        </Link>
      </div>
    </div>
  );
}

function Plans() {
  return (
    <section id="plans" className="w-screen px-5 py-28">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="glass-card px-4 py-1.5 rounded-full inline-block text-sm font-semibold text-[#3b82f6] mb-6">Pricing</div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Hytale plans
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
            Secure your server now and be ready to play the moment Hytale launches.
          </p>
        </div>
        <div data-aos="fade-up" className="mb-10">
          <div className="glass-card !rounded-2xl px-6 py-4 flex items-center gap-3 border-l-4 border-yellow-500">
            <svg className="h-5 w-5 text-yellow-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">You&apos;ll need to open a ticket on <a href="https://discord.gg/cqT5zpNVEd" className="text-[#3b82f6] font-bold hover:underline">Discord</a> to start your purchase. We&apos;ll help you pick the right plan and give you a discount code.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="flex-1 h-full"
            >
              <div className="glass-card flex-1 h-full flex flex-col gap-6 p-8 rounded-3xl hover:scale-95 transition-transform duration-300 ease-out will-change-transform">
                {plan.popular && (
                  <div className="text-xs font-bold text-[#3b82f6] uppercase tracking-widest">Most Popular</div>
                )}
                <div className="flex items-center gap-4">
                  <img src={plan.image} alt={plan.name} className="h-12 w-12 object-contain shrink-0" />
                  <div>
                    <h3 className="text-xl font-black">{plan.name}</h3>
                    <div className="text-lg font-semibold text-neutral-500">{plan.ram}</div>
                  </div>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{plan.desc}</p>
                <hr className="border-t border-neutral-200 dark:border-neutral-800" />
                <ul className="flex flex-col gap-3 text-base">
                  {[
                    { label: plan.cpu, icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" },
                    { label: plan.storage, icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
                    { label: plan.plugins, icon: "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" },
                    { label: plan.backups, icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                  ].map((feature, fi) => (
                    <li key={fi} className="flex items-center gap-3">
                      <svg className="h-5 w-5 text-[#3b82f6] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} /></svg>
                      <span>{feature.label}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-end justify-between mt-auto gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-neutral-500">Starting at</span>
                    <div className="text-3xl font-black">{plan.price}<span className="text-base font-semibold text-neutral-400">/mo</span></div>
                  </div>
                  <Link href="https://my.acorehosting.com" className="btn scale shrink-0 bg-[#3b82f6] text-[#1e3a5f] font-bold px-6 py-3 text-sm rounded-full hover:rounded-2xl transition-all duration-300">
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center" data-aos="fade-up">
          <div className="glass-card rounded-3xl px-8 py-6 flex flex-col items-center gap-4 w-full">
            <h3 className="text-xl font-black">Looking for something more?</h3>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-[#3b82f6] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                <span>Up to <span className="font-bold">1024 GB</span> RAM</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-[#3b82f6] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>Up to <span className="font-bold">48 vCPU</span> Cores</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-[#3b82f6] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                <span>Up to <span className="font-bold">15 TB</span> NVMe SSD</span>
              </div>
            </div>
            <Link href="https://my.acorehosting.com" className="btn scale bg-[#3b82f6] text-[#1e3a5f] font-bold px-8 py-3 text-sm rounded-full hover:rounded-2xl transition-all duration-300">
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FreeHosting() {
  return (
    <section className="w-screen px-5 py-28 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
        <div className="glass-card px-4 py-1.5 rounded-full inline-block text-sm font-semibold text-[#3b82f6] mb-6">Free</div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
          Try Hytale hosting for free
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto mb-10">
          Get started with a free server. 3 GB RAM, 300% CPU, 10 GB storage, 3 ports — no credit card required.
        </p>
        <Link href="/zero" className="btn scale tilt bg-[#3b82f6] text-[#1e3a5f] px-10 py-4 text-lg font-bold">
          Learn more about free hosting
        </Link>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="w-screen bg-[#3b82f6] px-5 py-28">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-black text-[#1e3a5f] tracking-tight mb-6" data-aos="fade-up">
          Ready for launch?
        </h2>
        <p className="text-lg text-[#1e3a5f]/80 max-w-lg mx-auto mb-10" data-aos="fade-up" data-aos-delay="150">
          Pre-order your Hytale server today. 30-day money-back guarantee.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="300">
          <Link href="/contact" className="btn scale tilt bg-[#1e3a5f] text-white font-bold px-10 py-4 text-lg hover:bg-[#0f172a] rounded-full hover:rounded-2xl transition-all duration-300">
            Get started today
          </Link>
          <Link href="/" className="btn scale tilt bg-white/20 text-[#1e3a5f] font-bold px-10 py-4 text-lg hover:bg-white/30">
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
