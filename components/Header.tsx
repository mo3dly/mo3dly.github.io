"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[var(--header-bg)] border-b border-black/10">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/icons/mo3dly.webp" alt="شعار معدلي" width={42} height={42} priority />
            <div>
              <h1 className="text-lg font-bold">معدلي</h1>
              <p className="text-xs text-muted">نحسب معدلك بدقة</p>
            </div>
          </Link>
          <button onClick={() => setOpen(true)} aria-label="القائمة" className="text-2xl font-bold">☰</button>
        </div>
      </header>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        />
      )}

      <nav
        className={`
          fixed top-0 right-0 h-full w-80 md:w-72 bg-[var(--background)]
          z-60 transform transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "translate-x-full"}
          flex flex-col
        `}
      >
        <div className="p-5 flex items-center justify-between border-b shrink-0">
          <div className="flex items-center gap-3">
            <Image src="/icons/mo3dly.webp" alt="شعار" width={34} height={34} priority />
            <span className="font-bold text-lg">القائمة</span>
          </div>
          <button onClick={() => setOpen(false)} aria-label="إغلاق" className="text-2xl font-bold">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-6">
          <Link href="/" onClick={() => setOpen(false)} className="block font-medium">
            الرئيسية
          </Link>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold">المرحلة المتوسطة</span>
            </div>
            <div className="grid gap-2">
              <Link href="/grades/7/" onClick={() => setOpen(false)} className="p-3 rounded-xl bg-white/60 border">
                الصف الأول متوسط
              </Link>
              <Link href="/grades/8/" onClick={() => setOpen(false)} className="p-3 rounded-xl bg-white/60 border">
                الصف الثاني متوسط
              </Link>
              <Link href="/grades/9/" onClick={() => setOpen(false)} className="p-3 rounded-xl bg-white/60 border">
                الصف الثالث متوسط
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold">المرحلة الثانوية</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
              جميع المسارات متوفرة
              </span>
            </div>
            <div className="grid gap-2">
              <Link href="/grades/10/" onClick={() => setOpen(false)} className="p-3 rounded-xl bg-white/60 border flex justify-between">
                <span>اول ثانوي</span>
              </Link>
              <Link href="/grades/11/" onClick={() => setOpen(false)} className="p-3 rounded-xl bg-white/60 border flex justify-between">
                <span>ثاني ثانوي</span>
              </Link>
              <Link href="/grades/12/" onClick={() => setOpen(false)} className="p-3 rounded-xl bg-white/60 border flex justify-between">
                <span>ثالث ثانوي</span>
              </Link>
            </div>
          </div>

          <Link
            href="/faq/"
            onClick={() => setOpen(false)}
            className="block p-3 rounded-lg bg-gradient-to-r from-[var(--primary)]/10 to-transparent"
          >
            الأسئلة الشائعة
          </Link>

          <div className="pt-4 border-t">
            <a href="mailto:i9fayez@proton.me" className="text-sm">
              تواصل معنا
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}