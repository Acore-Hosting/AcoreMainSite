const { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } = require("fs");
const { join } = require("path");
const { load } = require("js-yaml");

const blogDir = join(__dirname, "..", "blog");
const outDir = join(__dirname, "..", "public", "data");

if (!existsSync(blogDir)) {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "blog-posts.json"), "[]");
  process.exit(0);
}

const posts = readdirSync(blogDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => {
    const ymlPath = join(blogDir, d.name, "data.yml");
    const mdPath = join(blogDir, d.name, "contents.md");
    let data = { title: d.name, author: "unknown", date: "" };
    try {
      data = load(readFileSync(ymlPath, "utf-8"));
    } catch {}
    let readTime = data.readTime || "";
    if (!readTime) {
      try {
        const content = readFileSync(mdPath, "utf-8");
        const words = content.trim().split(/\s+/).length;
        readTime = `${Math.max(1, Math.ceil(words / 200))} min read`;
      } catch {}
    }
    return { slug: d.name, data, readTime };
  })
  .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "blog-posts.json"), JSON.stringify(posts));
