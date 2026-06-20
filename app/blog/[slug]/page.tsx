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

  if (!fs.existsSync(filePath)) {
    return {};
  }

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

  if (!fs.existsSync(filePath)) {
    notFound();
  }

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

      <main className="min-h-screen bg-gray-50 py-10 px-4">
        <article className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm">
          <h1 className="text-3xl font-bold">{data.title || slug}</h1>

          {data.description && (
            <p className="text-gray-500 mt-2">{data.description}</p>
          )}

          <p className="text-sm text-gray-400 mt-2">
            ⏱️ {readingTime} {readingTime === 1 ? "دقيقة قراءة" : "دقائق قراءة"}
          </p>

          <hr className="my-6" />

          <div className="prose max-w-none">
            <MDXRemote source={content} />
          </div>
        </article>
      </main>
    </>
  );
}
