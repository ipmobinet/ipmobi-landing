import type { Metadata } from "next";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found | IPMOBI" };
  return {
    title: `${post.title} | IPMOBI`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `https://ipmobi.net/blog/posts/${slug}/`,
      publishedTime: post.date,
    },
  };
}

export async function generateStaticParams() {
  const { getAllPosts } = await import("@/lib/posts");
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Post Not Found</h1>
        <Link href="/blog/" className="text-emerald-400 hover:underline">← Back to blog</Link>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    inLanguage: "en",
    datePublished: post.date,
    publisher: { "@type": "Organization", name: "IPMOBI.NET", url: "https://ipmobi.net" },
    about: post.tags,
  };

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-slate-300">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href="/blog/" className="text-emerald-400 hover:underline text-sm mb-8 inline-block">
        ← Back to blog
      </Link>

      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{post.title}</h1>

      <p className="text-slate-500 text-sm mb-2">
        Published: {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} · Shah Alam, Malaysia
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {post.tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs">{tag}</span>
        ))}
      </div>

      <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg mb-8">
        <p className="text-emerald-400 font-semibold mb-1">IPMOBI — Malaysian Mobile Proxies</p>
        <p className="text-slate-300 text-sm">Dedicated 4G/5G modems · Maxis/CelcomDigi carriers · Shah Alam DC · $49-$89/mo · Unlimited bandwidth</p>
      </div>

      <div className="prose prose-invert max-w-none prose-headings:text-white prose-headings:font-bold prose-a:text-emerald-400 prose-strong:text-white prose-code:text-emerald-300 prose-pre:bg-surface-card prose-pre:border prose-pre:border-surface-border prose-pre:rounded-lg prose-th:text-white prose-th:py-2 prose-th:px-3 prose-td:py-2 prose-td:px-3 prose-tr:border-b prose-tr:border-slate-700/50">
        <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
      </div>

      <hr className="border-slate-800 my-12" />

      <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Try it yourself</h3>
        <p className="text-slate-400 mb-6">15-minute free trial — no credit card. Dedicated 4G/5G modem with real Malaysian carrier IP.</p>
        <a href="/trial/" className="px-8 py-3 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-all">Start Free Trial</a>
      </div>
    </article>
  );
}
