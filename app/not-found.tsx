export const metadata = {
  title: "الصفحة غير موجودة",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-extrabold text-[#33365B] mb-4">404</h1>

      <p className="text-gray-500 text-lg mb-8">
        عذرًا، الصفحة اللي تبحث عنها غير موجودة
      </p>

      <a
        href="/"
        className="inline-flex items-center gap-2 rounded-xl bg-[#33365B] px-6 py-3 text-white font-medium shadow-sm hover:opacity-90 transition"
      >
        الرجوع للصفحة الرئيسية
      </a>
    </div>
  );
}