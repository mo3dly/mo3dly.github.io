import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc"; // استخدام نسخة الـ RSC الحديثة
import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const dynamicParams = false;


const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export async function generateStaticParams() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  
  const files = fs.readdirSync(BLOG_DIR);
  
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ""),
    }));
}

interface Props {
  params: Promise<{ slug: string }> | { slug: string }; 
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;

  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const file = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(file);

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <article className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm">
        <h1 className="text-3xl font-bold">{data.title || slug}</h1>
        
        {data.description && (
          <p className="text-gray-500 mt-2">{data.description}</p>
        )}

        <hr className="my-6" />

        <div className="prose max-w-none">
          <MDXRemote source={content} />
        </div>
      </article>
    </main>
  );
}