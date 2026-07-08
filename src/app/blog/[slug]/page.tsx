import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { load } from "js-yaml";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import BlogNav from "../BlogNav";
import AdBottom from "@/components/AdBottom";

interface PostData {
  title: string;
  description?: string;
  author: string;
  authorAvatar?: string;
  date: string;
  banner?: string;
  readTime?: string;
}

const CDN_BASE = "https://cdn.acorehosting.com/blog/blogs";
const DATA_FILE = "data.yml";
const CONTENT_FILE = "content.md";

async function fetchCDN(slug: string) {
  try {
    const res = await fetch(`${CDN_BASE}/${slug}/${DATA_FILE}`);
    if (!res.ok) throw new Error(String(res.status));
    const text = await res.text();
    try { return JSON.parse(text); } catch { return load(text); }
  } catch {
    return null;
  }
}

async function fetchCDNContent(slug: string) {
  try {
    const res = await fetch(`${CDN_BASE}/${slug}/${CONTENT_FILE}`);
    if (!res.ok) throw new Error(String(res.status));
    return await res.text();
  } catch {
    return null;
  }
}

async function getData(slug: string): Promise<PostData | null> {
  const fromCDN = await fetchCDN(slug);
  if (fromCDN) return fromCDN as PostData;
  const ymlPath = join(process.cwd(), "blog", slug, "data.yml");
  if (!existsSync(ymlPath)) return null;
  return load(readFileSync(ymlPath, "utf-8")) as PostData;
}

async function getContent(slug: string): Promise<string | null> {
  const fromCDN = await fetchCDNContent(slug);
  if (fromCDN) return fromCDN;
  const mdPath = join(process.cwd(), "blog", slug, "contents.md");
  if (!existsSync(mdPath)) return null;
  return readFileSync(mdPath, "utf-8");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getData(slug);
  return { title: (data && data.title) || "Blog" };
}

function readTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const min = Math.max(1, Math.ceil(words / 200));
  return `${min} min read`;
}

export function generateStaticParams() {
  const blogDir = join(process.cwd(), "blog");
  if (!existsSync(blogDir)) return [];
  const { readdirSync } = require("fs") as typeof import("fs");
  return readdirSync(blogDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => ({ slug: d.name }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getData(slug);
  const content = await getContent(slug);
  if (!data || !content) notFound();
  const rt = data.readTime || readTime(content);

  return (
    <>
      <BlogNav />
      <div className="w-screen min-h-[40vh] flex flex-col items-center justify-center px-5 pt-44 pb-20 bg-cover bg-center bg-no-repeat relative" style={{backgroundImage: "url(https://cdn.acorehosting.com/img/blog/background1.png)"}}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-[#0a0a0a] pointer-events-none" />
      </div>
      <div className="w-screen px-5 py-20 -mt-24 relative z-10">
        <article className="max-w-3xl mx-auto">
          <Link href="/blog" className="text-sm text-neutral-500 hover:text-white transition-colors mb-8 inline-block">&larr; Back to blog</Link>
          {data.banner && <img src={data.banner} alt={data.title} className="w-full h-48 md:h-64 object-cover rounded-3xl mb-10" />}
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">{data.title}</h1>
          <p className="text-xs text-neutral-500 mb-6">{data.author} &bull; {data.date} &bull; {rt}</p>
          {data.description && (
            <p className="text-lg text-neutral-500 leading-relaxed mb-10">{data.description}</p>
          )}
          <div className="prose prose-neutral dark:prose-invert max-w-none mb-16">
            <Markdown>{content}</Markdown>
          </div>
          <div className="flex items-center gap-3 pt-8 border-t border-neutral-800">
            {data.authorAvatar && (
              <img src={data.authorAvatar} alt={data.author} className="h-12 w-12 rounded-full object-cover" />
            )}
            <div>
              <p className="font-semibold">{data.author}</p>
              <p className="text-sm text-neutral-500">{data.date}</p>
              <p className="text-sm text-neutral-500">{rt}</p>
            </div>
          </div>
        </article>
      </div>
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
