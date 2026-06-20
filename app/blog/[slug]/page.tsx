import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";

export const dynamic = "force-static";
export const dynamicParams = false;

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

interface Props {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return {};

  const file = fs.readFileSync(filePath, "utf8");
  const { data } = matter(file);

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `https://mo3dly.github.io/blog/${slug}`,
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: `https://mo3dly.github.io/blog/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
    },
  };
}

export async function generateStaticParams() {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ""),
    }));
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;

  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) notFound();

  const file = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(file);

  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4968434285942225"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
        {/* HEADER */}
        <div className="border-b bg-white/70 backdrop-blur-md sticky top-0 z-10">
          <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between text-sm text-gray-600">
            <span>📖 {readingTime} دقيقة قراءة</span>
            <span className="hidden sm:inline text-gray-400">
              مدونة معدلي الدراسي
            </span>
          </div>
        </div>

        {/* ARTICLE */}
        <article className="max-w-3xl mx-auto px-4 py-10">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10 transition-all">

            {/* TITLE */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              {data.title || slug}
            </h1>

            {/* DESCRIPTION */}
            {data.description && (
              <p className="mt-4 text-lg text-gray-600 leading-8">
                {data.description}
              </p>
            )}

            {/* META */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-gray-500">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600">
                ⏱ {readingTime} دقيقة قراءة
              </span>
              <span className="px-3 py-1 rounded-full bg-gray-100">
                مقال تعليمي
              </span>
            </div>

            <hr className="my-8 border-gray-100" />

            {/* CONTENT */}
            <div className="prose prose-slate max-w-none prose-p:leading-8 prose-headings:scroll-mt-24">
              <MDXRemote source={content} />
            </div>

          </div>
        </article>
      </main>
    </>
  );
}
