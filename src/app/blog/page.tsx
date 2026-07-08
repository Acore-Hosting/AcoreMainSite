import { readFileSync, existsSync } from "fs";
import { join } from "path";
import type { Metadata } from "next";
import Link from "next/link";
import BlogNav from "./BlogNav";
import AdBottom from "@/components/AdBottom";

export const metadata: Metadata = {
  title: "Blog",
};

interface PostData {
  title: string;
  description?: string;
  author: string;
  authorAvatar?: string;
  date: string;
  banner?: string;
  readTime?: string;
}

export default function BlogPage() {
  let posts: { slug: string; data: PostData; readTime: string }[] = [];
  const jsonPath = join(process.cwd(), "public", "data", "blog-posts.json");
  if (existsSync(jsonPath)) {
    try { posts = JSON.parse(readFileSync(jsonPath, "utf-8")); } catch {}
  }
  const latest = posts[0];
  const rest = posts.slice(1);
  const bgNum = posts.length > 0 ? (latest.slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 5) + 1 : 1;

  return (
    <>
      <BlogNav />
      <div className="w-screen min-h-[60vh] flex flex-col items-center justify-center px-5 pt-44 pb-20 bg-cover bg-center bg-no-repeat relative" style={{backgroundImage: `url(https://cdn.acorehosting.com/img/blog/background${bgNum}.png)`}}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-[#0a0a0a] pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10" data-aos="fade-up">
          <div className="glass-card px-4 py-1.5 rounded-full inline-block text-sm font-semibold text-[#22c55e] mb-6">Blog</div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">Latest <span className="text-[#22c55e]">news</span></h1>
          <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">Updates, guides, and announcements from the Acore Hosting team.</p>
        </div>
      </div>
      <div className="w-screen px-5 py-20">
        <div className="max-w-5xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-neutral-500 text-center">No posts yet.</p>
          ) : (
            <>
              <div className="mb-12">
                <h2 className="text-2xl font-black tracking-tight mb-6">Latest post</h2>
                <Link href={`/blog/${latest.slug}`} className="glass-card !rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-300 group block">
                  {latest.data.banner && <img src={latest.data.banner} alt={latest.data.title} className="w-full h-48 md:h-64 object-cover" />}
                  <div className="p-8">
                    <p className="text-xs text-neutral-500 mb-3">{latest.data.author} &bull; {latest.data.date} &bull; {latest.readTime}</p>
                    <h3 className="text-2xl md:text-3xl font-black tracking-tight group-hover:text-[#22c55e] transition-colors mb-3">{latest.data.title}</h3>
                    {latest.data.description && (
                      <p className="text-sm text-neutral-500 leading-relaxed">{latest.data.description}</p>
                    )}
                  </div>
                </Link>
              </div>
              {posts.length > 1 && (
                <>
                  <h2 className="text-2xl font-black tracking-tight mb-6">All posts</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {rest.map((post) => (
                      <Link key={post.slug} href={`/blog/${post.slug}`} className="glass-card !rounded-3xl overflow-hidden hover:scale-95 transition-all duration-300 group">
                        {post.data.banner && <img src={post.data.banner} alt={post.data.title} className="w-full h-40 object-cover" />}
                        <div className="p-6">
                          <p className="text-xs text-neutral-500 mb-3">{post.data.author} &bull; {post.data.date} &bull; {post.readTime}</p>
                          <h3 className="text-xl font-black tracking-tight group-hover:text-[#22c55e] transition-colors">{post.data.title}</h3>
                          {post.data.description && (
                            <p className="text-sm text-neutral-500 mt-2 leading-relaxed">{post.data.description}</p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
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
