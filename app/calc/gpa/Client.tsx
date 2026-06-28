"use client";

import { useState, useMemo } from "react";
import DrawrProgressbar from "@/components/DrawrProgressbar";
import BackButton from "@/components/BackButton";
import Script from "next/script";

function normalizeNumberInput(raw: string): number {
  if (!raw) return NaN;
  const cleaned = String(raw).trim().replace(/\s+/g, "").replace(",", ".");
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : NaN;
}

function clampToRange(v: number) {
  if (isNaN(v)) return 0;
  return Math.min(100, Math.max(0, v));
}

export default function SecondaryGPA() {
  const [first, setFirst] = useState<string>("100");
  const [second, setSecond] = useState<string>("100");
  const [third, setThird] = useState<string>("100");

  const { gpa, anyInvalid, errors } = useMemo(() => {
    const fRaw = normalizeNumberInput(first);
    const sRaw = normalizeNumberInput(second);
    const tRaw = normalizeNumberInput(third);

    const errors = {
      firstInvalid: isNaN(fRaw) || fRaw < 0 || fRaw > 100,
      secondInvalid: isNaN(sRaw) || sRaw < 0 || sRaw > 100,
      thirdInvalid: isNaN(tRaw) || tRaw < 0 || tRaw > 100,
    };

    const fClamped = clampToRange(fRaw);
    const sClamped = clampToRange(sRaw);
    const tClamped = clampToRange(tRaw);

    const gpa = +(fClamped * 0.2 + sClamped * 0.4 + tClamped * 0.4).toFixed(2);
    const anyInvalid = errors.firstInvalid || errors.secondInvalid || errors.thirdInvalid;

    return { gpa, anyInvalid, errors };
  }, [first, second, third]);

  const filledCount = [first, second, third].filter((v) => v !== "").length;

  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4968434285942225"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <main className="container mx-auto px-4 py-8" dir="rtl">
        <section className="mx-auto max-w-xl rounded-2xl border border-black/10 bg-gradient-to-b from-white to-gray-50 p-5 sm:p-8 shadow-lg">
          <BackButton />

          {/* ── Header ── */}
          <div className="mt-2 mb-6">
            <h1 className="text-2xl font-extrabold text-gray-900">
              حساب المعدل التراكمي الثانوي
            </h1>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              أدخل معدلاتك لكل من الصف الأول الثانوي، الثاني الثانوي، والثالث الثانوي. يتم احتساب المعدل
              التراكمي باستخدام النسب التالية: معدل أول ثانوي (20%) — معدل ثاني ثانوي (40%) — معدل ثالث ثانوي (40%).
              الحقول تقبل أرقام عشرية (مثال: 95.5). القيم يجب أن تكون بين 0 و 100.
            </p>
          </div>

          {/* ── GPA Hero Card ── */}
          <div className="mb-6 rounded-2xl bg-[#f8f9ff] border border-[#33365B]/8 px-4 py-5">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <DrawrProgressbar value={!anyInvalid ? Number(gpa) : 0} size={100} />
              </div>
              <div className="flex-1 min-w-0 text-right">
                <p className="text-xs text-gray-400 mb-1">المعدل التراكمي</p>
                <div className="text-4xl font-extrabold text-[#33365B] leading-none tracking-tight">
                  {!anyInvalid ? gpa.toFixed(2) : "—"}
                  {!anyInvalid && (
                    <span className="text-xl font-bold text-gray-400 mr-1">%</span>
                  )}
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  النسبة: أول 20% · ثاني 40% · ثالث 40%
                </p>
              </div>
            </div>
          </div>

          {/* ── Inputs ── */}
          <div className="flex flex-col gap-4">
            <NumberInput
              label="أول ثانوي"
              subtitle="الوزن 20%"
              value={first}
              onChange={setFirst}
              invalid={errors.firstInvalid}
            />
            <NumberInput
              label="ثاني ثانوي"
              subtitle="الوزن 40%"
              value={second}
              onChange={setSecond}
              invalid={errors.secondInvalid}
            />
            <NumberInput
              label="ثالث ثانوي"
              subtitle="الوزن 40%"
              value={third}
              onChange={setThird}
              invalid={errors.thirdInvalid}
            />
          </div>

          {anyInvalid && (
            <p className="mt-3 text-xs text-red-500 text-right">
              تأكد أن القيم بين 0 و 100
            </p>
          )}

          <div className="mb-10 overflow-hidden rounded-xl">
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-4968434285942225"
              data-ad-slot="8269633566"
              data-ad-format="auto"
              data-full-width-responsive="true"
              />
              <Script id="adsense-home" strategy="afterInteractive">
                  {`(adsbygoogle = window.adsbygoogle || []).push({});`}
              </Script>
          </div>

          {/* ── Progress bar ── */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-gray-400">{filledCount} من 3 صفوف</span>
              <span className="text-xs font-medium text-[#33365B]">
                {Math.round((filledCount / 3) * 100)}%
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#33365B] transition-all duration-300"
                style={{ width: `${Math.round((filledCount / 3) * 100)}%` }}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

type NumberInputProps = {
  label: string;
  subtitle: string;
  value: string;
  onChange: (v: string) => void;
  invalid?: boolean;
};

function NumberInput({ label, subtitle, value, onChange, invalid = false }: NumberInputProps) {
  const hasValue = value !== "";

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowed = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete", "Home", "End"];
    if (allowed.includes(e.key)) return;
    if (e.key === "." || e.key === ",") {
      if (value.includes(".") || value.includes(",")) e.preventDefault();
      return;
    }
    if (!/^\d$/.test(e.key)) e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value.replace(",", "."));
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = (e.clipboardData || (window as any).clipboardData).getData("text").trim();
    const normalized = text.replace(",", ".");
    if (!/^\d*\.?\d*$/.test(normalized)) {
      e.preventDefault();
    } else {
      e.preventDefault();
      const input = e.currentTarget;
      const start = input.selectionStart ?? input.value.length;
      const end = input.selectionEnd ?? input.value.length;
      onChange(input.value.slice(0, start) + normalized + input.value.slice(end));
    }
  };

  return (
    <div
      className={`
        rounded-xl border p-4 bg-white transition-all duration-200
        ${invalid
          ? "border-red-300 bg-red-50/30"
          : hasValue
          ? "border-[#33365B]/20 bg-[#f8f9ff]"
          : "border-gray-200 hover:border-gray-300"
        }
      `}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-800">{label}</p>
          <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
        </div>

        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-400">/100</span>
            <input
              type="text"
              inputMode="decimal"
              pattern="[0-9]*[.,]?[0-9]*"
              placeholder="100"
              aria-label={label}
              aria-invalid={invalid}
              value={value}
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              onPaste={handlePaste}
              onWheel={(e) => (e.currentTarget as HTMLElement).blur()}
              className={`
                w-20 rounded-lg border px-3 py-2 text-sm text-center
                outline-none transition-all
                focus:ring-2 focus:ring-[#33365B]/20
                ${invalid
                  ? "border-red-400 bg-red-50 text-red-700 focus:border-red-400"
                  : hasValue
                  ? "border-[#33365B]/30 bg-white text-gray-900 focus:border-[#33365B]"
                  : "border-gray-300 bg-white text-gray-900 focus:border-[#33365B]"
                }
              `}
            />
          </div>
          {invalid && (
            <p className="text-[11px] text-red-500">قيمة غير صالحة</p>
          )}
        </div>
      </div>
    </div>
  );
}