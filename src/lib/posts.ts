import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
};

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map((f) => parsePost(f));
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return parsePost(`${slug}.md`);
}

function parsePost(filename: string): BlogPost {
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
  const slug = filename.replace(/\.md$/, "");

  // Parse YAML frontmatter (--- ... ---)
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fmMatch) {
    // Fallback: use filename as slug, no metadata
    return { slug, title: slug, description: "", date: "2026-01-01", tags: [], content: raw };
  }

  const fm: Record<string, string> = {};
  fmMatch[1].split("\n").forEach((line) => {
    const idx = line.indexOf(": ");
    if (idx > 0) {
      fm[line.slice(0, idx).trim()] = line.slice(idx + 2).trim();
    }
  });

  const content = raw.slice(fmMatch[0].length).trim();
  const tags = (fm.tags || "")
    .split(",")
    .map((t: string) => t.trim())
    .filter(Boolean);

  return {
    slug,
    title: fm.title || slug,
    description: fm.description || "",
    date: fm.date || "2026-01-01",
    tags,
    content,
  };
}
