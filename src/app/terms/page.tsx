"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdBottom from "@/components/AdBottom";

export default function TermsPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    document.title = "Acore Hosting \u2022 Terms";
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
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">Terms of <span className="text-[#22c55e]">service</span></h1>
            <p className="text-neutral-500 dark:text-neutral-400">Last Updated: May 13, 2026</p>
          </div>
          <div className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed space-y-6" data-aos="fade-up">
            <p className="text-neutral-500 dark:text-neutral-400">Welcome to AcoreHosting. By using our services, websites, servers, or infrastructure, you agree to the following Terms of Service (&ldquo;Terms&rdquo;). If you do not agree with these Terms, you must not use our services.</p>

            <hr className="border-neutral-200 dark:border-neutral-800" />

            <h2 className="text-xl font-black mt-8">1. Definitions</h2>
            <ul className="list-disc pl-5 space-y-1 text-neutral-600 dark:text-neutral-400">
              <li><strong>&ldquo;AcoreHosting&rdquo;</strong> refers to the paid hosting services operated under the AcoreHosting brand.</li>
              <li><strong>&ldquo;AcoreZero&rdquo;</strong> refers to the free hosting platform provided by AcoreHosting.</li>
              <li><strong>&ldquo;Services&rdquo;</strong> means all hosting related products provided by us.</li>
              <li><strong>&ldquo;User&rdquo;</strong>, <strong>&ldquo;Client&rdquo;</strong>, or <strong>&ldquo;You&rdquo;</strong> refers to any individual or organization using our Services.</li>
            </ul>

            <h2 className="text-xl font-black mt-8">2. Eligibility</h2>
            <p className="text-neutral-600 dark:text-neutral-400">You must be at least 13 years old to use our Services. By using AcoreHosting or AcoreZero, you confirm that you have permission and legal capacity to agree to these Terms. If you are under 18 you <strong>Must</strong> get permission from a parent or guardian.</p>

            <h2 className="text-xl font-black mt-8">3. Acceptable Use Policy</h2>
            <p className="text-neutral-600 dark:text-neutral-400">You agree not to use our Services for:</p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-600 dark:text-neutral-400">
              <li>Illegal activities</li>
              <li>Malware, phishing, or hacking</li>
              <li>DDoS attacks or abusive network behavior</li>
              <li>Hosting copyrighted content without permission</li>
              <li>Spam or unsolicited advertising</li>
              <li>Exploiting vulnerabilities or abusing system resources</li>
              <li>Content involving exploitation, abuse, or harmful material</li>
              <li>Using our services as a honey pot</li>
              <li>Using up a lot of bandwidth</li>
            </ul>
            <p className="text-neutral-600 dark:text-neutral-400">We reserve the right to suspend or terminate any service that violates these rules.</p>

            <h2 className="text-xl font-black mt-8">4. Service Availability</h2>
            <p className="text-neutral-600 dark:text-neutral-400">We aim to provide reliable uptime and performance, but we do not guarantee uninterrupted or error-free service. Maintenance, hardware failures, attacks, or circumstances beyond our control may temporarily affect availability.</p>

            <h2 className="text-xl font-black mt-8">5. Payments &amp; Billing (AcoreHosting)</h2>
            <p className="text-neutral-600 dark:text-neutral-400">For paid services, payments must be completed on time.</p>

            <h2 className="text-xl font-black mt-8">6. AcoreZero Free Hosting Terms</h2>
            <p className="text-neutral-600 dark:text-neutral-400">AcoreZero is our free hosting platform intended for learning, development, testing, and small community projects.</p>
            <p className="text-neutral-600 dark:text-neutral-400">By using AcoreZero, you agree to the following additional terms:</p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-600 dark:text-neutral-400">
              <li>Free hosting is provided <strong>as-is</strong> with <strong>no uptime guarantee</strong>.</li>
              <li>Resources may be limited, throttled, suspended, or reclaimed at any time.</li>
              <li>Inactive services may be automatically removed after extended inactivity.</li>
              <li>Abuse of free resources may result in immediate suspension without warning.</li>
              <li>AcoreHosting reserves the right to discontinue AcoreZero or modify limitations at any time.</li>
              <li>Free hosting users may receive lower support priority compared to paid users.</li>
            </ul>
            <p className="text-neutral-600 dark:text-neutral-400">AcoreZero may not be used for:</p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-600 dark:text-neutral-400">
              <li>Cryptocurrency mining</li>
              <li>Large-scale file storage</li>
              <li>Public proxy or VPN services</li>
              <li>High-resource applications that negatively affect platform stability</li>
            </ul>

            <h2 className="text-xl font-black mt-8">7. Backups &amp; Data Loss</h2>
            <p className="text-neutral-600 dark:text-neutral-400">Users are responsible for maintaining their own backups. AcoreHosting is not responsible for data loss, corruption, accidental deletion, or service interruptions.</p>

            <h2 className="text-xl font-black mt-8">8. User Content</h2>
            <p className="text-neutral-600 dark:text-neutral-400">You retain ownership of your content. However, by hosting content through our Services, you grant us permission to store, transmit, and process it as necessary to operate the Services. We may remove content that violates these Terms or applicable law.</p>

            <h2 className="text-xl font-black mt-8">9. Suspension &amp; Termination</h2>
            <p className="text-neutral-600 dark:text-neutral-400">We may suspend or terminate services immediately if:</p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-600 dark:text-neutral-400">
              <li>These Terms are violated</li>
              <li>Abuse is detected</li>
              <li>Payment obligations are not met</li>
              <li>Your service threatens platform stability or security</li>
            </ul>
            <p className="text-neutral-600 dark:text-neutral-400">Termination may result in permanent deletion of stored data.</p>

            <h2 className="text-xl font-black mt-8">10. Limitation of Liability</h2>
            <p className="text-neutral-600 dark:text-neutral-400">To the maximum extent permitted by law, AcoreHosting shall not be liable for:</p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-600 dark:text-neutral-400">
              <li>Loss of profits</li>
              <li>Data loss</li>
              <li>Downtime</li>
              <li>Business interruption</li>
              <li>Indirect or consequential damages</li>
            </ul>
            <p className="text-neutral-600 dark:text-neutral-400">All Services are provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo;</p>

            <h2 className="text-xl font-black mt-8">11. Privacy</h2>
            <p className="text-neutral-600 dark:text-neutral-400">We may collect and process account, billing, technical, and usage data required to operate our Services. Users are responsible for ensuring their hosted content complies with privacy laws applicable in their jurisdiction.</p>

            <h2 className="text-xl font-black mt-8">12. Changes to These Terms</h2>
            <p className="text-neutral-600 dark:text-neutral-400">We may update these Terms at any time. Continued use of the Services after changes become effective constitutes acceptance of the updated Terms.</p>

            <h2 className="text-xl font-black mt-8">13. Contact</h2>
            <p className="text-neutral-600 dark:text-neutral-400">For support or legal inquiries, contact:</p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-600 dark:text-neutral-400">
              <li>Email: <a href="mailto:support@acorehosting.com" className="text-[#22c55e] hover:underline">support@acorehosting.com</a></li>
              <li>Website: <a href="https://www.acorehosting.com" className="text-[#22c55e] hover:underline">www.acorehosting.com</a></li>
            </ul>

            <h2 className="text-xl font-black mt-8">14. Agreement</h2>
            <p className="text-neutral-600 dark:text-neutral-400">By using AcoreHosting or AcoreZero, you acknowledge that you have read, understood, and agreed to these Terms of Service.</p>
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
