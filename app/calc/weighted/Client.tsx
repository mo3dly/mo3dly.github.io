"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import DrawrProgressbar from "@/components/DrawrProgressbar";
import BackButton from "@/components/BackButton";
import Script from "next/script";

type Field = {
    id: string;
    label: string;
    defaultWeight: number;
    note?: React.ReactNode;
};

const DEFAULT_FIELDS: Field[] = [
    {
        id: "gpa",
        label: "المعدل التراكمي للثانوية",
        defaultWeight: 30,
        note: (
            <Link href="/calc/gpa" className="text-[10px] text-[#33365B] underline underline-offset-2 mt-0.5 block">
                مو متأكد من التراكمي؟ استخدم حاسبة المعدل التراكمي
            </Link>
        ),
    },
    {
        id: "qudurat",
        label: "القدرات العامة",
        defaultWeight: 30,
    },
    {
        id: "tahsili",
        label: "التحصيلي",
        defaultWeight: 40,
    },
    {
        id: "step",
        label: "ستيب (STEP)",
        defaultWeight: 0,
    },
];

function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, value: string) {
    const allowed = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete", "Home", "End"];
    if (allowed.includes(e.key)) return;
    if (e.key === "." || e.key === ",") {
        if (value.includes(".") || value.includes(",")) e.preventDefault();
        return;
    }
    if (!/^\d$/.test(e.key)) e.preventDefault();
}

function handlePaste(e: React.ClipboardEvent<HTMLInputElement>, onChange: (v: string) => void) {
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
}

function normalizeInput(raw: string) {
    if (!raw) return NaN;
    const cleaned = raw.trim().replace(",", ".");
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : NaN;
}

export default function WeightedScore() {
    const [scores, setScores] = useState<Record<string, string>>({
        gpa: "100", qudurat: "100", tahsili: "100", step: "100",
    });
    const [weights, setWeights] = useState<Record<string, string>>({
        gpa: "30", qudurat: "30", tahsili: "40", step: "0",
    });
    const [editingWeights, setEditingWeights] = useState(false);
    const [copied, setCopied] = useState(false);
    
    const [showStep, setShowStep] = useState(false);
    const [isCalculated, setIsCalculated] = useState(false);

    const activeFields = useMemo(() => {
        return showStep ? DEFAULT_FIELDS : DEFAULT_FIELDS.filter(f => f.id !== "step");
    }, [showStep]);

    const parsed = useMemo(() => activeFields.map((f) => {
        const score = normalizeInput(scores[f.id]);
        const weight = normalizeInput(weights[f.id]);
        const scoreInvalid = scores[f.id] !== "" && (isNaN(score) || score < 0 || score > 100);
        return { ...f, score, weight, scoreInvalid };
    }), [scores, weights, activeFields]);

    const totalWeight = useMemo(
        () => parsed.reduce((sum, f) => sum + (isNaN(f.weight) ? 0 : f.weight), 0),
        [parsed]
    );
    
    const weightError = Math.abs(totalWeight - 100) > 0.01;

    const result = useMemo(() => {
        if (weightError) return null;
        let sum = 0; let hasAny = false;
        for (const f of parsed) {
            if (f.scoreInvalid) return null;
            if (!isNaN(f.score) && f.weight > 0) {
                sum += (f.score * f.weight) / 100;
                hasAny = true;
            }
        }
        return hasAny ? sum : null;
    }, [parsed, weightError]);

    const anyInvalid = parsed.some((f) => f.scoreInvalid) || weightError;
    const filledCount = activeFields.filter(
        (f) => scores[f.id] !== "" && !isNaN(normalizeInput(scores[f.id]))
    ).length;

    const resetWeights = () =>
        setWeights(Object.fromEntries(DEFAULT_FIELDS.map((f) => [f.id, String(f.defaultWeight)])));

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
                        <h1 className="text-2xl font-extrabold text-gray-900">حساب النسبة الموزونة</h1>
                        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                            النسبة الموزونة هي النسبة المطلوبة للقبول الجامعي في السعودية، ويتم حسابها بناءً على درجاتك في: الثانوية العامة، والقدرات العامة، والتحصيلي، واختبار ستيب (STEP).

عادةً تكون الأوزان الافتراضية: 30% للثانوية، 30% للقدرات، و40% للتحصيلي. وبإمكانك تعديل هذي الأوزان لكل درجة، أو إضافة نسبة لاختبار "ستيب"، حسب متطلبات الجامعة اللي ترغب بالتقديم عليها.
                        </p>
                    </div>

                    {isCalculated ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="mb-6 rounded-2xl bg-[#f8f9ff] border border-[#33365B]/8 px-4 py-5">
                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    <div className="flex-shrink-0">
                                        <DrawrProgressbar value={result !== null ? Number(result.toFixed(2)) : 0} size={110} />
                                    </div>
                                    <div className="flex-1 min-w-0 text-center sm:text-right">
                                        <p className="text-sm font-medium text-gray-500 mb-1">نسبتك الموزونة النهائية</p>
                                        <div className="text-4xl font-extrabold text-[#33365B] leading-none tracking-tight mb-3">
                                            {result !== null ? result.toFixed(2) : "—"}
                                            {result !== null && <span className="text-xl font-bold text-gray-400 mr-1">%</span>}
                                        </div>
                                        
                                        {/* تفاصيل الدرجات والأوزان */}
                                        <div className="bg-white rounded-lg p-3 border border-gray-100 text-right">
                                            <p className="text-xs text-gray-600 font-semibold mb-1.5 border-b pb-1">الدرجات المدخلة:</p>
                                            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
                                                {parsed.map(f => (
                                                    <span key={f.id}><span className="text-gray-400">{f.label}:</span> <span className="font-medium text-gray-700">{f.score}</span></span>
                                                ))}
                                            </div>
                                            <p className="mt-2 text-[10px] text-gray-400 flex flex-wrap gap-2">
                                                <span className="font-semibold">النسب:</span> 
                                                {parsed.map(f => (
                                                    <span key={`${f.id}-w`}>{f.label} ({f.weight}%)</span>
                                                ))}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex gap-3 mt-5">
                                    <button
                                        onClick={() => setIsCalculated(false)}
                                        className="flex-1 rounded-xl bg-[#33365B] px-4 py-3 text-sm font-medium text-white transition-all hover:bg-[#252746] active:scale-95"
                                    >
                                        حساب نسبة جديدة
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-center mt-8">
                                <ins
                                    className="adsbygoogle"
                                    style={{ display: "block" }}
                                    data-ad-client="ca-pub-4968434285942225"
                                    data-ad-slot="3746520262"
                                    data-ad-format="auto"
                                    data-full-width-responsive="true"
                                />
                                <Script id="adsense-result" strategy="afterInteractive">
                                    {`(adsbygoogle = window.adsbygoogle || []).push({});`}
                                </Script>
                            </div>
                        </div>
                    ) : (
                        <div className="animate-in fade-in duration-300">
                            {/* ── Weight toggle header ── */}
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-sm font-semibold text-gray-800">الدرجات والنسب</h2>
                                <div className="flex items-center gap-2">
                                    {editingWeights && (
                                        <button onClick={resetWeights} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                                            إعادة تعيين
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setEditingWeights((v) => !v)}
                                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                                            editingWeights
                                                ? "bg-[#33365B] text-white"
                                                : "border border-gray-200 bg-white text-gray-600 hover:border-[#33365B]/30"
                                        }`}
                                    >
                                        {editingWeights ? "إخفاء" : "تعديل النسب"}
                                    </button>
                                </div>
                            </div>

                            {editingWeights && weightError && (
                                <div className="mb-3 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-600">
                                    مجموع النسب = {totalWeight.toFixed(0)}% — يجب أن يساوي 100%
                                </div>
                            )}

                            {/* ── Fields ── */}
                            <div className="flex flex-col gap-3">
                                {activeFields.map((f) => {
                                    const p = parsed.find((x) => x.id === f.id)!;
                                    const hasValue = scores[f.id] !== "" && !isNaN(p.score);
                                    const hasError = p.scoreInvalid;

                                    return (
                                        <div
                                            key={f.id}
                                            className={`rounded-xl border p-4 bg-white transition-all duration-200 ${
                                                hasError ? "border-red-300 bg-red-50/30"
                                                : hasValue ? "border-[#33365B]/20 bg-[#f8f9ff]"
                                                : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                {/* Label */}
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-sm font-medium text-gray-800">{f.label}</p>
                                                        {f.id === "step" && (
                                                            <button onClick={() => setShowStep(false)} className="text-[10px] text-red-500 hover:text-red-700 bg-red-50 px-2 py-0.5 rounded-full">
                                                                إزالة
                                                            </button>
                                                        )}
                                                    </div>
                                                    {f.note}
                                                    {editingWeights ? (
                                                        <div className="flex items-center gap-1.5 mt-2">
                                                            <span className="text-xs text-gray-400">النسبة:</span>
                                                            <input
                                                                type="text"
                                                                inputMode="decimal"
                                                                value={weights[f.id]}
                                                                onChange={(e) => setWeights((prev) => ({ ...prev, [f.id]: e.target.value }))}
                                                                className="w-14 rounded-md border border-gray-300 px-2 py-1 text-xs text-center outline-none focus:border-[#33365B] focus:ring-1 focus:ring-[#33365B]/20"
                                                            />
                                                            <span className="text-xs text-gray-400">%</span>
                                                        </div>
                                                    ) : (
                                                        <p className="text-xs text-gray-400 mt-0.5">النسبة: {weights[f.id]}%</p>
                                                    )}
                                                </div>

                                                {/* Score input */}
                                                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-xs text-gray-400">/100</span>
                                                        <input
                                                            type="text"
                                                            inputMode="decimal"
                                                            placeholder="100"
                                                            value={scores[f.id]}
                                                            onChange={(e) => setScores((prev) => ({ ...prev, [f.id]: e.target.value.replace(",", ".") }))}
                                                            onKeyDown={(e) => handleKeyDown(e, scores[f.id])}
                                                            onPaste={(e) => handlePaste(e, (v) => setScores((prev) => ({ ...prev, [f.id]: v })))}
                                                            onWheel={(e) => (e.currentTarget as HTMLElement).blur()}
                                                            className={`w-20 rounded-lg border px-3 py-2 text-sm text-center outline-none transition-all focus:ring-2 focus:ring-[#33365B]/20 ${
                                                                hasError ? "border-red-400 bg-red-50 text-red-700"
                                                                : hasValue ? "border-[#33365B]/30 bg-white text-gray-900 focus:border-[#33365B]"
                                                                : "border-gray-300 bg-white text-gray-900 focus:border-[#33365B]"
                                                            }`}
                                                        />
                                                    </div>
                                                    {hasError && <p className="text-[11px] text-red-500">0 — 100 فقط</p>}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {!showStep && (
                                <button
                                    onClick={() => setShowStep(true)}
                                    className="mt-3 flex items-center justify-center w-full gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                                    إضافة درجة ستيب (STEP)
                                </button>
                            )}

                            {anyInvalid && !weightError && (
                                <p className="mt-3 text-xs text-red-500 text-right">تأكد أن القيم بين 0 و 100</p>
                            )}

                            <button
                                onClick={() => setIsCalculated(true)}
                                disabled={anyInvalid || weightError || filledCount === 0}
                                className="mt-6 w-full rounded-xl bg-[#33365B] px-4 py-3.5 text-base font-bold text-white transition-all hover:bg-[#252746] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                            >
                                حساب النسبة
                            </button>
                        </div>
                    )}

                    {/* ── Ad ── */}
                    <div className="flex justify-center mt-8">
                        <ins
                            className="adsbygoogle"
                            style={{ display: "inline-block", width: "300px", height: "250px" }}
                            data-ad-client="ca-pub-4968434285942225"
                            data-ad-slot="8269633566"
                        />
                        <Script id="adsense-bottom" strategy="afterInteractive">
                            {`(adsbygoogle = window.adsbygoogle || []).push({});`}
                        </Script>
                    </div>

                </section>
            </main>
        </>
    );
}