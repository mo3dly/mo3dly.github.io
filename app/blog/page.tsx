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

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
        المدونة
      </h1>

      <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">
        مقالات ونصائح حول المعدل الدراسي، الدراسة، والاختبارات لمساعدتك على
        تحقيق أفضل النتائج.
      </p>
    </div>

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
        >
          <span className="inline-flex w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            {getPublishedText(post.date)}
          </span>

          <h2 className="mt-4 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
            {post.title}
          </h2>

          {post.description && (
            <p className="mt-3 line-clamp-2 text-sm leading-7 text-gray-600">
              {post.description}
            </p>
          )}

          <div className="mt-auto pt-6 flex items-center justify-between">
            <span className="text-sm font-semibold text-blue-600">
              قراءة المقال
            </span>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
              →
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
</main>
    </>
  );
}
