import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Acore Hosting",
  description:
    "Premium hosting solutions with blazing-fast performance, 99.99% uptime, and 24/7 expert support.",
  applicationName: "Acore Hosting",
  keywords:
    "web hosting,cloud hosting,VPS,dedicated servers,Acore,performance hosting",
  category: "technology",
  openGraph: {
    title: "Acore Hosting",
    description:
      "Premium hosting solutions with blazing-fast performance and 99.99% uptime.",
    siteName: "Acore Hosting",
    type: "website",
    locale: "en_US",
  },
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4882312961880141" crossOrigin="anonymous" strategy="afterInteractive" />
      <body className="w-screen overflow-x-hidden font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
