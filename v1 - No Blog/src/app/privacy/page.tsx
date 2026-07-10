"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdBottom from "@/components/AdBottom";

export default function PrivacyPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    document.title = "Acore Hosting \u2022 Privacy";
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
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">Privacy <span className="text-[#22c55e]">policy</span></h1>
            <p className="text-neutral-500 dark:text-neutral-400">Effective Date: May 25, 2026</p>
          </div>
          <div className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed space-y-6" data-aos="fade-up">
            <p className="text-neutral-500 dark:text-neutral-400">Welcome to <strong>Acore Hosting</strong> (&ldquo;Acore Hosting&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). This Privacy Policy explains how we collect, use, store, and protect your information when you use our Minecraft hosting services, including both free and paid hosting plans.</p>
            <p className="text-neutral-500 dark:text-neutral-400">This policy applies to:</p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-600 dark:text-neutral-400">
              <li>Our website</li>
              <li>Minecraft hosting services</li>
              <li>Client panel and billing systems</li>
              <li>Discord support servers</li>
              <li>Any related services operated by Acore Hosting</li>
            </ul>

            <hr className="border-neutral-200 dark:border-neutral-800" />

            <h2 className="text-xl font-black mt-8">1. Information We Collect</h2>
            <h3 className="text-lg font-bold mt-6">Account Information</h3>
            <p className="text-neutral-600 dark:text-neutral-400">When you register for an account, we may collect: Username, Email address, Password (encrypted/hashed), Discord ID or username (if linked).</p>
            <h3 className="text-lg font-bold mt-6">Billing Information</h3>
            <p className="text-neutral-600 dark:text-neutral-400">For paid hosting services, we may collect: Billing name, Billing address (optional), Transaction IDs, Payment method details processed through third-party payment providers (Stripe / PayPal). We do <strong>not</strong> store full credit card information on our servers.</p>
            <h3 className="text-lg font-bold mt-6">Server &amp; Technical Data</h3>
            <p className="text-neutral-600 dark:text-neutral-400">To operate and secure our services, we may collect: IP addresses, Login timestamps, Browser and device information, Minecraft server logs, Resource usage statistics, Crash reports and error logs.</p>
            <h3 className="text-lg font-bold mt-6">Support Communications</h3>
            <p className="text-neutral-600 dark:text-neutral-400">If you contact support, we may store: Support tickets, Emails, Discord messages, Attachments you provide.</p>

            <h2 className="text-xl font-black mt-8">2. How We Use Your Information</h2>
            <p className="text-neutral-600 dark:text-neutral-400">We use collected information to: Provide and maintain hosting services, Create and manage accounts, Process payments, Prevent abuse, fraud, and attacks, Improve performance and stability, Respond to support requests, Enforce our Terms of Service, Comply with legal obligations.</p>

            <h2 className="text-xl font-black mt-8">3. Free Hosting Services</h2>
            <p className="text-neutral-600 dark:text-neutral-400">Users of free hosting plans may have additional limitations and monitoring to prevent abuse and maintain service stability. Free hosting servers may: Automatically suspend inactive servers, Display limited advertisements or branding, Have usage statistics monitored more closely for abuse prevention. We do not sell personal information collected from free hosting users.</p>

            <h2 className="text-xl font-black mt-8">4. Cookies &amp; Tracking Technologies</h2>
            <p className="text-neutral-600 dark:text-neutral-400">We may use cookies and similar technologies to: Keep you logged in, Remember preferences, Improve website functionality, Analyze website traffic. You may disable cookies in your browser, though some features may not function correctly.</p>

            <h2 className="text-xl font-black mt-8">5. Third-Party Services</h2>
            <p className="text-neutral-600 dark:text-neutral-400">We may share limited data with trusted third parties required to operate our services, including: Payment processors (such as Stripe or PayPal), DDoS protection providers, Cloud hosting providers, Analytics providers, Discord for customer support. These third parties process data according to their own privacy policies.</p>

            <h2 className="text-xl font-black mt-8">6. Data Security</h2>
            <p className="text-neutral-600 dark:text-neutral-400">We take reasonable security measures to protect your data, including: SSL/HTTPS encryption, Password hashing, Firewall and DDoS protection, Restricted staff access, Secure server infrastructure. However, no internet transmission or storage system can be guaranteed 100% secure.</p>

            <h2 className="text-xl font-black mt-8">7. Data Retention</h2>
            <p className="text-neutral-600 dark:text-neutral-400">We retain information only as long as necessary to: Provide services, Meet legal requirements, Resolve disputes, Enforce agreements. Inactive or terminated accounts may have data deleted after a reasonable retention period.</p>

            <h2 className="text-xl font-black mt-8">8. Your Rights</h2>
            <p className="text-neutral-600 dark:text-neutral-400">Depending on your location, you may have rights under privacy laws including the UK GDPR and EU GDPR, such as: Access to your personal data, Correction of inaccurate data, Deletion of your data, Restriction of processing, Data portability, Withdrawal of consent. To exercise these rights, contact us using the information below.</p>

            <h2 className="text-xl font-black mt-8">9. Children&rsquo;s Privacy</h2>
            <p className="text-neutral-600 dark:text-neutral-400">Acore Hosting does not knowingly collect personal information from children under 13 without parental consent. (Then again the minimum age to use Acore is 13, no questions asked) If you believe a child has provided personal information, contact us and we will remove it where required.</p>

            <h2 className="text-xl font-black mt-8">10. International Users</h2>
            <p className="text-neutral-600 dark:text-neutral-400">Your data may be processed or stored in countries outside your own. By using our services, you consent to such transfers where legally permitted.</p>

            <h2 className="text-xl font-black mt-8">11. Changes to This Privacy Policy</h2>
            <p className="text-neutral-600 dark:text-neutral-400">We may update this Privacy Policy from time to time. Changes become effective once posted on our website. Continued use of our services after updates means you accept the revised policy.</p>

            <h2 className="text-xl font-black mt-8">12. Contact Information</h2>
            <p className="text-neutral-600 dark:text-neutral-400">If you have any questions about this Privacy Policy or your personal data, contact us:</p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-600 dark:text-neutral-400">
              <li>Email: <a href="mailto:hello@acorehosting.com" className="text-[#22c55e] hover:underline">hello@acorehosting.com</a></li>
              <li>Discord: <a href="https://discord.gg/cqT5zpNVEd" className="text-[#22c55e] hover:underline">https://discord.gg/cqT5zpNVEd</a></li>
              <li>Website: <a href="https://acorehosting.com" className="text-[#22c55e] hover:underline">acorehosting.com</a></li>
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
