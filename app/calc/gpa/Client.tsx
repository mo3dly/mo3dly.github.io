"use client";

import { useState, useMemo } from "react";
import DrawrProgressbar from "@/components/DrawrProgressbar";
import BackButton from "@/components/BackButton";


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

  return (
    <div className="min-h-screen flex items-start justify-center px-4 py-8 bg-slate-50">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-6 sm:p-8">
        <div className="flex flex-col gap-4">
            <BackButton />
          <div>
            <h1 className="text-right text-xl sm:text-2xl font-extrabold">حساب المعدل التراكمي الثانوي</h1>
            <p className="mt-2 text-right text-sm text-gray-600 max-w-full">
              أدخل معدلاتك لكل من الصف الأول الثانوي، الثاني الثانوي، والثالث الثانوي. يتم احتساب المعدل
              التراكمي باستخدام النسب التالية: معدل أول ثانوي (20%) — معدل ثاني ثانوي (40%) — معدل ثالث ثانوي (40%).
              الحقول تقبل أرقام عشرية (مثال: 95.5). القيم يجب أن تكون بين 0 و 100.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div className="flex items-center justify-center sm:justify-start">
              <div className="w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
                <DrawrProgressbar value={Number(gpa)} size={140} />
              </div>
            </div>

            <div className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <NumberInput
                  label="أول ثانوي"
                  value={first}
                  onChange={setFirst}
                  invalid={errors.firstInvalid}
                />
                <NumberInput
                  label="ثاني ثانوي"
                  value={second}
                  onChange={setSecond}
                  invalid={errors.secondInvalid}
                />
                <NumberInput
                  label="ثالث ثانوي"
                  value={third}
                  onChange={setThird}
                  invalid={errors.thirdInvalid}
                />
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="text-right">
                  <div className="text-base sm:text-lg font-semibold">
                    المعدل: <span className="text-indigo-600">{gpa.toFixed(2)}%</span>
                  </div>
                  <div className="text-xs text-gray-500">نسبة: أول 20% · ثاني 40% · ثالث 40%</div>
                </div>

                <div
                  aria-hidden
                  className={`px-3 py-1 rounded-md text-xs font-medium ${
                    anyInvalid ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"
                  }`}
                >
                  {anyInvalid ? "فيه قيم غير صالحة" : "القيم صالحة"}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

type NumberInputProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  invalid?: boolean;
};

function NumberInput({ label, value, onChange, invalid = false }: NumberInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowed = [
      "Backspace",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      "Home",
      "End",
    ];
    if (allowed.includes(e.key)) return;

    if (e.key === "." || e.key === ",") {
      if (value.includes(".") || value.includes(",")) {
        e.preventDefault();
      }
      return;
    }

    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(",", ".");
    onChange(raw);
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
      const next = input.value.slice(0, start) + normalized + input.value.slice(end);
      onChange(next);
    }
  };

  return (
    <label className="flex flex-col gap-2 text-right">
      <span className="text-sm font-medium">{label}</span>
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
        className={`w-full px-4 py-3 rounded-xl border transition-shadow transition-colors shadow-sm focus:outline-none
          ${invalid
            ? "border-red-500 ring-2 ring-red-200 bg-red-50 placeholder-red-400"
            : "border-gray-200 focus:ring-2 focus:ring-indigo-200 bg-white"
          }`}
      />
    </label>
  );
}