import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto bg-primary text-white">
      <div className="px-4 py-6 text-center text-sm">
        <p className="mb-2">
          <Link
            href="/privacy-policy"
            className="text-white/90 hover:underline"
          >
            سياسة الخصوصية
          </Link>
          <span className="mx-2">|</span>
          <Link
            href="/faq"
            className="text-white/90 hover:underline"
          >
            الأسئلة الشائعة
          </Link>
        </p>

        <p className="mb-3">© 2026 معدلي - جميع الحقوق محفوظة</p>

        <p className="border-t border-white/20 pt-3 text-xs opacity-80">
          Powered by Fayez Al-Muaiqly
        </p>
      </div>
    </footer>
  );
}