"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function NotFound() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
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
          <Link href="/login" className="btn-outline backdrop-blur-md text-base font-semibold !px-5 !py-2 rounded-2xl hover:brightness-125 transition-all">Login</Link>
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
            <Link href="/login" onClick={() => setMenuOpen(false)} className="btn-outline backdrop-blur-md text-base font-semibold !px-8 !py-3 rounded-2xl hover:brightness-125 transition-all">Login</Link>
          </li>
        </ul>
      </div>
      <div className="w-screen min-h-screen flex flex-col items-center justify-center px-5 pt-24">
        <div className="max-w-lg mx-auto text-center" data-aos="fade-up">
          <div className="text-8xl md:text-9xl font-black text-[#22c55e]/20 mb-6">404</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Page not <span className="text-[#22c55e]">found</span></h1>
          <p className="text-neutral-500 dark:text-neutral-400 mb-10">The page you're looking for doesn't exist or has been moved.</p>
          <Link href="/" className="btn scale tilt bg-[#22c55e] text-[#052e16] px-10 py-4 text-lg font-bold">Back to home</Link>
        </div>
      </div>
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={`fixed bottom-6 right-6 z-50 glass-card !rounded-full h-12 w-12 flex items-center justify-center transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`} aria-label="Scroll to top">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
      </button>
    </>
  );
}
