"use client";

import { useEffect, useState } from "react";

export default function NotFound() {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown === 0) {
      window.location.href = "/";
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-extrabold text-[#33365B] mb-4">404</h1>

      <p className="text-gray-500 text-lg mb-3">
        الصفحة اللي تبحث عنها غير موجودة
      </p>

      <p className="text-[#33365B] text-base mb-2 font-medium">
        يمكن ضعت شوي، خلّنا نرجّعك للمكان الصح
      </p>

      <p className="text-sm text-gray-500 mb-6">
        صفحة حساب المعدل موجود في الصفحة الرئيسية
      </p>

      <p className="text-sm text-gray-400 mb-8">
        سيتم تحويلك للصفحة الرئيسية خلال {countdown} ثواني
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-[#33365B] px-6 py-3 text-white font-medium shadow-sm hover:opacity-90 transition"
        >
          الصفحة الرئيسية
        </a>

        <a
          href="/"
          className="inline-flex items-center justify-center rounded-xl border border-[#33365B] px-6 py-3 text-[#33365B] font-medium hover:bg-[#33365B] hover:text-white transition"
        >
          صفحة حساب المعدل
        </a>
      </div>
    </div>
  );
}