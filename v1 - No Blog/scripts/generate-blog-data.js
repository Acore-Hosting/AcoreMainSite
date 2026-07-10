const { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } = require("fs");
const { join } = require("path");

const blogDir = join(__dirname, "..", "blog");
const outDir = join(__dirname, "..", "public", "data");
const BASE = "https://cdn.acorehosting.com/blog/blogs";
const DATA_FILE = "data.yml";
const CONTENT_FILE = "content.md";

async function fetchJSON(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.status);
    const text = await res.text();
    try { return JSON.parse(text); } catch { return text; }
  } catch {
    return null;
  }
}

async function fetchText(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.status);
    return await res.text();
  } catch {
    return null;
  }
}

async function main() {
  let slugs = [];

  if (existsSync(blogDir)) {
    slugs = readdirSync(blogDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
  }

  const { load } = require("js-yaml");

  const results = await Promise.allSettled(
    slugs.map(async (slug) => {
      const raw = await fetchJSON(`${BASE}/${slug}/${DATA_FILE}`);
      let data;
      if (!raw) {
        const ymlPath = join(blogDir, slug, "data.yml");
        try {
          data = load(readFileSync(ymlPath, "utf-8"));
        } catch {
          data = { title: slug, author: "unknown", date: "" };
        }
      } else if (typeof raw === "string") {
        data = load(raw) || { title: slug, author: "unknown", date: "" };
      } else {
        data = raw;
      }

      let readTime = data.readTime || "";
      if (!readTime) {
        const content = await fetchText(`${BASE}/${slug}/${CONTENT_FILE}`);
        if (content) {
          const words = content.trim().split(/\s+/).length;
          readTime = `${Math.max(1, Math.ceil(words / 200))} min read`;
        }
      }

      return { slug, data, readTime };
    })
  );

  const posts = results
    .filter((r) => r.status === "fulfilled")
    .map((r) => r.value)
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "blog-posts.json"), JSON.stringify(posts));
  console.log(`Generated ${posts.length} blog posts`);
}

main().catch(() => process.exit(1));
