"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import AdBottom from "@/components/AdBottom";

interface BlogPost {
  slug: string;
  data: {
    title: string;
    description?: string;
    author: string;
    authorAvatar?: string;
    date: string;
    banner?: string;
    readTime?: string;
  };
  readTime: string;
}

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 400,
      easing: "ease-out-back",
      delay: 200,
    });
  }, []);

  return (
    <div className="flex flex-col items-center w-screen min-h-screen px-5 md:px-10 2xl:px-[350px] overflow-x-clip">
      <Navbar />
      <ScrollToTop />

      <Hero />
      <Projects />

      <Reviews />

      <Team />
      <Systems />
      <BlogFeed />
      <CtaSection />

      <AdBottom />
      <Footer />
    </div>
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
    { href: "/", label: "Home", color: "green", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { href: "#team", label: "Team", color: "pink", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" },
  ];
  return (
    <>
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] lg:w-max max-w-4xl px-12 py-2 flex items-center gap-10 glass-card !rounded-2xl border-none transition-all duration-700 ${scrolled ? "nav-scrolled" : "nav-glass-hidden"}`}>
        <Link href="/" className="flex items-center gap-3">
          <img src="https://cdn.acorehosting.com/logo/logo-dark.webp" alt="Acore Hosting" className="h-11 w-auto" />
        </Link>
        <div className="hidden md:flex items-center gap-3">
          {links.map((l) => (
            l.href.startsWith("#") ? (
              <button key={l.href} onClick={() => document.getElementById(l.href.slice(1))?.scrollIntoView({ behavior: "smooth" })} className={`btn-outline backdrop-blur-md text-base font-semibold !px-5 !py-2 rounded-2xl hover:brightness-125 transition-all ${l.color}`}>{l.label}</button>
            ) : (
              <Link key={l.href} href={l.href} className={`btn-outline backdrop-blur-md text-base font-semibold !px-5 !py-2 rounded-2xl hover:brightness-125 transition-all ${l.color}`}>{l.label}</Link>
            )
          ))}
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
          {links.map((l) => (
            <li key={l.href}>
              {l.href.startsWith("#") ? (
                <button onClick={() => { setMenuOpen(false); document.getElementById(l.href.slice(1))?.scrollIntoView({ behavior: "smooth" }); }} className={`btn-outline backdrop-blur-md text-base font-semibold !px-8 !py-3 rounded-2xl hover:brightness-125 transition-all ${l.color}`}>{l.label}</button>
              ) : (
                <Link href={l.href} onClick={() => setMenuOpen(false)} className={`btn-outline backdrop-blur-md text-base font-semibold !px-8 !py-3 rounded-2xl hover:brightness-125 transition-all ${l.color}`}>{l.label}</Link>
              )}
            </li>
          ))}
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
    </>
  );
}

function Hero() {
  return (
    <div id="header" className="w-screen flex flex-col gap-10 px-5 py-[150px] min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat relative" style={{backgroundImage: "url(https://cdn.acorehosting.com/backgrounds/6.jpg)"}}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black pointer-events-none" />
      <div className="flex flex-col items-center justify-center gap-10 2xl:px-[350px] w-full relative z-10">
        <div data-aos="fade-up">
          <img alt="Acore Hosting" width={50} height={50} decoding="async" src="https://cdn.acorehosting.com/logo.png" className="object-contain" />
        </div>
        <h2 className="custom-font md:w-2/3 text-6xl xl:text-7xl font-black text-center title-hover" data-aos="fade-up" data-aos-delay="300">
          Infrastructure with integrity
        </h2>
        <p className="text-xl font-medium text-neutral-500 md:w-2/3 lg:w-1/3 text-center" data-aos="fade-up" data-aos-delay="400">
          Fast, reliable infrastructure powered by green energy. We make hosting that doesn&apos;t suck.
        </p>
      </div>
      <div className="2xl:px-[350px] flex flex-col items-center justify-center w-full relative z-10">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col md:flex-row gap-5 items-center" data-aos="fade-up" data-aos-delay="600">
            <Link href="/select" className="btn big rounded scale tilt btn-primary">Get started</Link>
            <Link href="#projects" className="btn big rounded scale tilt btn-dark">Our projects</Link>
          </div>
          <div className="flex flex-col gap-3 justify-center items-center text-neutral-500 animate-bounce text-xl font-semibold mt-[100px] md:mt-[150px]">
            <svg stroke="currentColor" fill="currentColor" viewBox="0 0 384 512" className="object-contain transition-transform duration-300" height="35" width="35">
              <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
            </svg>
            <p>Keep scrolling down</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const cards = [
    {
      title: "Discord Bots",
      desc: "Reliable Discord bot hosting with 24/7 uptime, auto-restarts, and one-click deploy from GitHub. Monitor logs in real time.",
      icon: "https://cdn.acorehosting.com/branding/plans/bot.svg",
    },
    {
      title: "Minecraft Hosting",
      desc: "Low-latency Minecraft servers with one-click modpack installs, DDoS protection, and full FTP access.",
      icon: "https://s3.mcjars.app/icons/vanilla.png",
    },
    {
      title: "Hytale Hosting",
      desc: "Ready for the Hytale release. Pre-configured servers with mod support and instant setup when the game drops.",
      icon: "https://cdn.acorehosting.com/branding/plans/hytale.png",
    },
  ];
  return (
    <div id="projects" className="w-screen flex flex-col gap-10 px-5 py-[150px] min-h-screen bg-black text-white items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-10 2xl:px-[350px] w-full">
        <div className="glass-card p-1.5 px-5 rounded-full text-[15px] font-semibold text-center" data-aos="fade-up">Projects</div>
        <h2 className="custom-font md:w-2/3 text-4xl md:text-6xl font-bold text-center title-hover" data-aos="fade-up" data-aos-delay="300">Explore our infrastructure projects.</h2>
        <p className="text-xl font-medium text-neutral-500 md:w-2/3 lg:w-1/3 text-center" data-aos="fade-up" data-aos-delay="400">We build tools that power thousands of sites, apps, and communities worldwide.</p>
      </div>
      <div className="2xl:px-[350px] flex flex-col items-center justify-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 w-full my-10">
          {cards.map((c, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={600 + i * 100} className="flex-1 h-full">
              <div className="glass-card flex-1 h-full flex flex-col gap-10 p-10 rounded-3xl hover:scale-95 transition-transform duration-300 ease-out">
                <div className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center">
                  <img alt={c.title} width={32} height={32} decoding="async" src={c.icon} className="object-contain" />
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="lg:text-4xl text-2xl font-bold custom-font">{c.title}</h1>
                  <p className="lg:text-xl text-lg text-neutral-300 font-medium">{c.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div data-aos="fade-up" className="flex flex-col md:flex-row gap-5 mt-10">
          <Link href="/services" className="btn expand scale btn-primary px-8 py-3">View all services</Link>
        </div>
      </div>
    </div>
  );
}

function Reviews() {
  const reviews = [
    {
      name: "Mike",
      avatar: "https://cdn.acorehosting.com/logo.png",
      date: "6 July 2026",
      rating: 5,
      review:
        "I've had an amazing experience with Acore Hosting! The server setup was quick and easy, and my Minecraft server has been running smoothly with little to no lag...",
      link: "https://www.trustpilot.com/reviews/6a4b6000d8e8761502c30f38",
    },
    {
      name: "Matt Trubchik",
      avatar: "https://cdn.acorehosting.com/logo.png",
      date: "28 May 2026",
      rating: 5,
      review:
        "W server hosting, W staff and they’re very kind! Easy to host a legit server and also cheap...",
      link: "https://www.trustpilot.com/reviews/6a17a6dc7af321e405e90eea",
    },
    {
      name: "C Akshaj",
      avatar:
        "https://user-images.trustpilot.com/6a114ee38dd5c47d9a83c7cd/73x73.png",
      date: "23 May 2026",
      rating: 5,
      review:
        "wow never seen something as good as this so good earlier I used play hosting but that's trash compared to this...",
      link: "https://www.trustpilot.com/reviews/6a114ee813c5d94119f8e55a",
    },
  ];

  return (
    <div className="w-screen flex flex-col gap-10 px-5 py-[150px] bg-black text-white items-center justify-center">

      <div className="flex flex-col items-center justify-center gap-10 2xl:px-[350px] w-full">

        <div
          className="glass-card p-1.5 px-5 rounded-full text-[15px] font-semibold text-center"
          data-aos="fade-up"
        >
          Reviews
        </div>

        <h2
          className="custom-font md:w-2/3 text-4xl md:text-6xl font-bold text-center title-hover"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Loved by our customers.
        </h2>

        <p
          className="text-xl font-medium text-neutral-500 md:w-2/3 lg:w-1/3 text-center"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          Hundreds of gamers and developers trust Acore Hosting.
        </p>

      </div>


      <div className="2xl:px-[350px] w-full">

        {/* Trustpilot Summary */}
        <div
          className="glass-card rounded-3xl p-8 mb-10 flex flex-col items-center justify-center gap-4 text-center"
          data-aos="fade-up"
          data-aos-delay="400"
        >

          <img
            src="https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-4.5.svg"
            alt="Trustpilot stars"
            className="h-10"
          />

          <h3 className="text-2xl font-bold custom-font">
            Rated{" "}
            <span className="text-[#00b67a]">
              Excellent
            </span>{" "}
            on Trustpilot
          </h3>

          <p className="text-neutral-400">
            <span className="text-white font-semibold">
              4.3 / 5
            </span>{" "}
            based on verified customer reviews.
          </p>

        </div>


        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {reviews.map((review, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={600 + i * 100}
              className="
                glass-card
                flex-1
                h-full
                flex
                flex-col
                gap-10
                p-10
                rounded-3xl
                transition-transform
                duration-300
                ease-out
                hover:scale-[0.95]
              "
            >

              <div className="flex items-center justify-between">

                <div className="flex gap-1 text-yellow-400 text-xl">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <span key={star}>
                      {star < review.rating ? "★" : "☆"}
                    </span>
                  ))}
                </div>

                <a
                  href={review.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 text-sm font-semibold transition-colors"
                >
                  Trustpilot ↗
                </a>

              </div>


              <div className="flex items-center gap-4">

                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover border border-neutral-700"
                />

                <div>
                  <h3 className="text-xl font-bold custom-font">
                    {review.name}
                  </h3>

                  <p className="text-sm text-neutral-500">
                    {review.date}
                  </p>
                </div>

              </div>


              <p className="text-neutral-300 leading-7 flex-grow">
                "{review.review}"
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

function Team() {
  return (
    <div id="team" className="w-screen flex flex-col gap-10 px-5 py-[150px] min-h-screen bg-black text-white border-t-2 border-neutral-800 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-10 2xl:px-[350px] w-full">
        <div className="glass-card p-1.5 px-5 rounded-full text-[15px] font-semibold text-center" data-aos="fade-up">Team</div>
        <h2 className="custom-font md:w-2/3 text-4xl md:text-6xl font-bold text-center title-hover" data-aos="fade-up" data-aos-delay="300">Meet the people behind Acore Hosting.</h2>
        <p className="text-xl font-medium text-neutral-500 md:w-2/3 lg:w-1/3 text-center" data-aos="fade-up" data-aos-delay="400">We&apos;re a focused team building infrastructure that doesn&apos;t fall over.</p>
      </div>
      <div className="2xl:px-[350px] flex flex-col items-center justify-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 w-full mt-10">
          <TeamMember
            delay={400}
            name="Vinny"
            role="Trinity"
            avatar="https://cdn.acorehosting.com/staff/vinny.jpg"
            links={{ web: "https://gollicraft.com" }}
          />
          <TeamMember
            delay={500}
            name="Squid"
            role="Trinity"
            avatar="https://cdn.acorehosting.com/staff/squid.png"
            links={{ web: "https://soko.lol/squidman" }}
          />
          <TeamMember
            delay={600}
            name="Kevin"
            role="Trinity"
            avatar="https://cdn.acorehosting.com/staff/kevin.png"
            links={{ web: "https://sqidgeon.uk", github: "https://github.com/sqidgeon" }}
          />
        </div>
      </div>
    </div>
  );
}

function TeamMember({ delay, name, role, avatar, links }: { delay: number; name: string; role: string; avatar: string; links: { web?: string; discord?: string; github?: string } }) {
  return (
    <div data-aos="fade-up" data-aos-delay={delay} className="flex-1 h-full">
      <div className="glass-card flex-1 h-full flex flex-col gap-10 p-10 rounded-3xl hover:scale-95 transition-transform duration-300 ease-out">
        <img alt={name} width="100" height="100" decoding="async" className="rounded-2xl" src={avatar} />
        <div className="flex flex-col gap-2.5">
          <h1 className="lg:text-4xl text-2xl font-bold custom-font">{name}</h1>
          <p className="lg:text-xl text-lg text-neutral-300 font-medium">{role}</p>
        </div>
        <div className="flex flex-wrap gap-5">
          {links.web && (
            <a target="_blank" className="btn scale btn-dark p-0! h-[60px] w-[60px] flex items-center justify-center" href={links.web}>
              <svg stroke="currentColor" fill="currentColor" viewBox="0 0 512 512" height="24" width="24"><path d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"></path></svg>
            </a>
          )}
          {links.discord && (
            <a target="_blank" className="btn scale btn-dark p-0! h-[60px] w-[60px] flex items-center justify-center" href={links.discord}>
              <svg stroke="currentColor" fill="currentColor" viewBox="0 0 640 512" height="32" width="32"><path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path></svg>
            </a>
          )}
          {links.github && (
            <a target="_blank" className="btn scale btn-dark p-0! h-[60px] w-[60px] flex items-center justify-center" href={links.github}>
              <svg stroke="currentColor" fill="currentColor" viewBox="0 0 496 512" height="32" width="32"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z"></path></svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}


function Systems() {
  const techs = [
    { name: "HTML", img: "https://cdn.worldvectorlogo.com/logos/html-1.svg" },
    { name: "CSS", img: "https://cdn.worldvectorlogo.com/logos/css-3.svg" },
    { name: "Next.js", img: "https://cdn.worldvectorlogo.com/logos/next-js.svg" },
    { name: "Node.js", img: "https://cdn.acorehosting.com/branding/software/node.js.png" },
    { name: "Python", img: "https://cdn.acorehosting.com/branding/software/python.png" },
    { name: "Cloudflare", img: "https://upload.wikimedia.org/wikipedia/commons/9/94/Cloudflare_Logo.png" },
    { name: "Stripe", img: "https://cdn.acorehosting.com/branding/software/stripe.jpeg" },
    { name: "PayPal", img: "https://cdn.acorehosting.com/branding/software/paypal.png" },
    { name: "Pterodactyl", img: "https://cdn.acorehosting.com/branding/software/pterodactyl.svg" },
    { name: "Paymenter", img: "https://cdn.acorehosting.com/branding/software/paymenter.svg" },
  ];

  return (
    <div id="systems" className="w-screen flex flex-col gap-10 px-5 py-[150px] min-h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-10 2xl:px-[350px] w-full">
        <div className="glass-card p-1.5 px-5 rounded-full text-[15px] font-semibold text-center" data-aos="fade-left">Systems</div>
        <h2 className="custom-font md:w-2/3 text-4xl md:text-6xl font-bold text-center title-hover" data-aos="fade-left">Technologies we use & support.</h2>
        <p className="text-xl font-medium text-neutral-500 md:w-2/3 lg:w-1/3 text-center" data-aos="fade-left">We work with a wide range of systems to provide the best hosting experience.</p>
      </div>
      <div className="2xl:px-[350px] flex flex-col items-center justify-center w-full">
        <div className="flex flex-wrap gap-4 w-full justify-center mt-10" data-aos="fade-left">
          {techs.map((t, i) => (
            <div key={i} className="nameplate-container">
              <div className="cursor-pointer">
                <div className="glass-card flex-1 flex flex-col justify-center items-center gap-10 h-[90px] w-[90px] rounded-3xl hover:scale-95 transition-transform duration-300 ease-out">
                  <img src={t.img} alt={t.name} width="40" height="40" />
                </div>
              </div>
              <div className="nameplate-container_text">{t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function BlogFeed() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  useEffect(() => {
    fetch("/data/blog-posts.json")
      .then((r) => r.json())
      .then(setPosts)
      .catch(() => {});
  }, []);
  if (posts.length === 0) return null;
  return (
    <div className="w-screen flex flex-col gap-10 px-5 py-[150px] min-h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-10 2xl:px-[350px] w-full">
        <div className="glass-card p-1.5 px-5 rounded-full text-[15px] font-semibold text-center" data-aos="fade-up">Blog</div>
        <h2 className="custom-font md:w-2/3 text-4xl md:text-6xl font-bold text-center title-hover" data-aos="fade-up">What&apos;s happening at Acore Hosting?</h2>
        <p className="text-xl font-medium text-neutral-500 md:w-2/3 lg:w-1/3 text-center" data-aos="fade-up">The latest news, guides, and updates from our team.</p>
      </div>
      <div className="2xl:px-[350px] flex flex-col items-center justify-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 w-full mt-10">
          {posts.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} data-aos="fade-up" data-aos-delay={400 + i * 100} className="flex-1 h-full">
              <div className="glass-card flex-1 h-full flex flex-col gap-4 p-8 rounded-3xl hover:scale-95 transition-transform duration-300 ease-out">
                {post.data.banner && (
                  <img src={post.data.banner} alt={post.data.title} className="w-full h-40 object-cover rounded-2xl" />
                )}
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <span>{post.data.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-2xl font-bold custom-font">{post.data.title}</h3>
                {post.data.description && (
                  <p className="text-neutral-400 text-sm leading-relaxed">{post.data.description}</p>
                )}
                <div className="flex items-center gap-2 mt-auto pt-2">
                  {post.data.authorAvatar && (
                    <img src={post.data.authorAvatar} alt={post.data.author} className="w-6 h-6 rounded-full" />
                  )}
                  <span className="text-sm text-neutral-500">{post.data.author}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div data-aos="fade-up" className="mt-10">
          <Link href="/blog" className="btn expand scale btn-primary px-8 py-3">View all posts</Link>
        </div>
      </div>
    </div>
  );
}

function CtaSection() {
  return (
    <div className="w-screen flex flex-col gap-10 px-5 py-[150px] min-h-screen bg-[#22c55e] items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-10 2xl:px-[350px] w-full">
        <div data-aos="fade-left"></div>
        <h2 className="custom-font md:w-2/3 text-4xl md:text-6xl font-bold text-center text-[#052e16] title-hover" data-aos="fade-left">
          Ready to host with us?
        </h2>
        <p className="text-xl font-medium text-[#052e16]/80 md:w-2/3 lg:w-1/3 text-center" data-aos="fade-left">
           From shared hosting to dedicated servers — we have a plan for every budget.
        </p>
      </div>
      <div className="2xl:px-[350px] flex flex-col items-center justify-center w-full">
        <div data-aos="fade-left" className="flex flex-col md:flex-row gap-5">
          <Link href="/select" className="btn scale tilt bg-[#052e16] text-white px-8 py-4 font-semibold text-lg hover:bg-[#0a3d1e] hover:rounded-2xl">
            Get started today
          </Link>
        </div>
      </div>
    </div>
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
    <div className="w-screen border-t border-neutral-200 dark:border-neutral-800 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <img src="https://cdn.acorehosting.com/logo/logo-dark.webp" alt="Acore Hosting" className="h-8 w-auto" />
            </div>
            <p className="text-sm leading-relaxed text-neutral-500">Green-powered hosting infrastructure. Fast, reliable, and built for the modern web.</p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li><Link href="/service/minecraft" className="transition-colors hover:text-neutral-900 dark:hover:text-white">Minecraft Hosting</Link></li>
              <li><Link href="/service/code" className="transition-colors hover:text-neutral-900 dark:hover:text-white">Code Hosting</Link></li>
              <li><Link href="/service/hytale" className="transition-colors hover:text-neutral-900 dark:hover:text-white">Hytale Hosting</Link></li>
              <li><Link href="/zero" className="transition-colors hover:text-neutral-900 dark:hover:text-white">Free Hosting</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li><Link href="/status" className="transition-colors hover:text-neutral-900 dark:hover:text-white">Status</Link></li>
              <li><Link href="/blog" className="transition-colors hover:text-neutral-900 dark:hover:text-white">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li><Link href="/fair-use" className="transition-colors hover:text-neutral-900 dark:hover:text-white">Fair Use</Link></li>
              <li><Link href="/privacy" className="transition-colors hover:text-neutral-900 dark:hover:text-white">Privacy</Link></li>
              <li><Link href="/terms" className="transition-colors hover:text-neutral-900 dark:hover:text-white">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8 text-center text-sm text-neutral-500">&copy; {new Date().getFullYear()} Acore Hosting. All rights reserved.</div>
      </div>
    </div>
  );
}
