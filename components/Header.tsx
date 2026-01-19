"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--header-bg)] border-b border-black/10">
      <div className="px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/icons/mo3dly.webp"
            alt="شعار معدلي"
            width={42}
            height={42}
            priority
          />
          <div>
            <h1 className="text-lg font-bold">معدلي</h1>
            <p className="text-xs text-muted">نحسب معدلك بدقة</p>
          </div>
        </Link>

        <button
          onClick={() => setOpen(!open)}
          aria-label="القائمة"
          className="text-2xl font-bold transition-transform duration-300"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      <nav
        className={`
          overflow-hidden transition-all duration-300 ease-out
          ${open ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}
        `}
      >
        <div className="border-t border-border/40 bg-muted/60 backdrop-blur px-4 py-4 flex flex-col gap-4 font-medium">
          <Link href="/" onClick={() => setOpen(false)}>الرئيسية</Link>
          <Link href="/mid/" onClick={() => setOpen(false)}>المرحلة المتوسطة</Link>
          <Link href="/sec/" onClick={() => setOpen(false)}>المرحلة الثانوية</Link>
          <Link href="/faq/" onClick={() => setOpen(false)}>الأسئلة الشائعة</Link>
        </div>
      </nav>
    </header>
  );
}