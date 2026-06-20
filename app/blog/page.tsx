import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import matter from "gray-matter";
import Script from "next/script";

export const dynamic = "force-static";

export const metadata = {
  title: "معدلي الدراسي - المدونة",
  description: "مقالات مع موقع معدلي الدراسي",
  alternates: {
    canonical: "https://mo3dly.github.io/blog",
  },
};

function getPublishedText(date: Date) {
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays <= 0) return "نُشر اليوم";
  if (diffDays === 1) return "نُشر قبل يوم";
  if (diffDays === 2) return "نُشر قبل يومين";
  if (diffDays <= 10) return `نُشر قبل ${diffDays} أيام`;
  if (diffDays < 30) return `نُشر قبل ${diffDays} يومًا`;

  const months = Math.floor(diffDays / 30);
  if (months === 1) return "نُشر قبل شهر";
  if (months === 2) return "نُشر قبل شهرين";
  if (months <= 10) return `نُشر قبل ${months} أشهر`;

  const years = Math.floor(months / 12);
  if (years === 1) return "نُشر قبل سنة";
  if (years === 2) return "نُشر قبل سنتين";
  return `نُشر قبل ${years} سنوات`;
}

export default function BlogPage() {
  const postsPath = path.join(process.cwd(), "content", "blog");

  const posts = fs
    .readdirSync(postsPath)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(".mdx", "");

      const fileContent = fs.readFileSync(
        path.join(postsPath, file),
        "utf8"
      );

      const { data } = matter(fileContent);

      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        date: new Date(data.date),
      };
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4968434285942225"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <main className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
            المدونة
          </h1>

          <div className="grid gap-5 sm:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
                  {post.title}
                </h2>

                {post.description && (
                  <p className="text-sm text-gray-500 mt-2">
                    {post.description}
                  </p>
                )}

                <p className="text-xs text-gray-400 mt-3">
                  {getPublishedText(post.date)}
                </p>

                <div className="mt-4 text-blue-600 text-sm font-medium">
                  قراءة المزيد →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
