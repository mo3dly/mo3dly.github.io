"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import DrawrProgressbar from "@/components/DrawrProgressbar";
import BackButton from "@/components/BackButton";
import AdUnit from "@/components/AdUnit";

type ScoreField = {
    id: string;
    label: string;
    weight: number;
    locked?: boolean;
    icon: React.ReactNode;
};

const CapIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10L12 5 2 10l10 5 10-5z" />
        <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
    </svg>
);

const DocIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6" />
    </svg>
);

const TargetIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
    </svg>
);

const StarIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9-6.3 3.9 1.7-7L2 9.2l7.1-.6z" />
    </svg>
);

const TrashIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18" />
        <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
    </svg>
);

const PlusIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
);

const DEFAULT_FIELDS: ScoreField[] = [
    { id: "gpa", label: "الثانوية العامة", weight: 30, icon: <CapIcon /> },
    { id: "qudurat", label: "القدرات", weight: 30, icon: <DocIcon /> },
    { id: "tahsili", label: "التحصيلي", weight: 40, icon: <TargetIcon /> },
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

function readUrlWeight(sp: URLSearchParams, id: string) {
    const raw = sp.get(id);
    if (raw === null) return null;
    const n = parseFloat(raw.replace(",", "."));
    if (!Number.isFinite(n) || n < 0 || n > 100) return null;
    return n;
}

function WeightedScoreContent() {
    const searchParams = useSearchParams();

    const initialFields = useMemo(() => {
        return DEFAULT_FIELDS.map((f) => {
            const urlW = readUrlWeight(searchParams, f.id);
            return urlW !== null ? { ...f, weight: urlW } : f;
        });
    }, [searchParams]);

    const [fields, setFields] = useState<ScoreField[]>(initialFields);
    const [scores, setScores] = useState<Record<string, string>>(
        Object.fromEntries(initialFields.map((f) => [f.id, "100"]))
    );
    const [editing, setEditing] = useState(false);
    const [isCalculated, setIsCalculated] = useState(false);
    const [copied, setCopied] = useState(false);
    const [newLabel, setNewLabel] = useState("");
    const [newWeight, setNewWeight] = useState("");

    const totalWeight = useMemo(
        () => fields.reduce((s, f) => s + (isNaN(f.weight) ? 0 : f.weight), 0),
        [fields]
    );
    const available = Math.max(0, Math.round((100 - totalWeight) * 10) / 10);
    const weightError = Math.abs(totalWeight - 100) > 0.5;

    const parsed = useMemo(() => fields.map((f) => {
        const score = normalizeInput(scores[f.id] ?? "");
        const scoreInvalid = (scores[f.id] ?? "") !== "" && (isNaN(score) || score < 0 || score > 100);
        return { ...f, score, scoreInvalid };
    }), [fields, scores]);

    const anyInvalid = parsed.some((f) => f.scoreInvalid);
    const filledCount = fields.filter(
        (f) => (scores[f.id] ?? "") !== "" && !isNaN(normalizeInput(scores[f.id] ?? ""))
    ).length;

    const result = useMemo(() => {
        let sum = 0; let hasAny = false;
        for (const f of parsed) {
            if (f.scoreInvalid) return null;
            if (!isNaN(f.score) && f.weight > 0) {
                sum += (f.score * f.weight) / 100;
                hasAny = true;
            }
        }
        return hasAny ? sum : null;
    }, [parsed]);

    const updateWeight = (id: string, raw: string) => {
        setFields((prev) => prev.map((f) => f.id === id ? { ...f, weight: raw === "" ? 0 : Math.max(0, Math.min(100, parseFloat(raw) || 0)) } : f));
    };

    const removeField = (id: string) => {
        setFields((prev) => prev.filter((f) => f.id !== id));
        setScores((prev) => {
            const next = { ...prev };
            delete next[id];
            return next;
        });
    };

    const addField = () => {
        const label = newLabel.trim();
        if (!label || available <= 0) return;
        const w = Math.max(0, Math.min(available, parseFloat(newWeight) || 0));
        const id = `custom_${Date.now()}`;
        setFields((prev) => [...prev, { id, label, weight: w, icon: <StarIcon /> }]);
        setScores((prev) => ({ ...prev, [id]: "100" }));
        setNewLabel("");
        setNewWeight("");
    };

    const clearScores = () => {
        setScores(Object.fromEntries(fields.map((f) => [f.id, ""])));
    };

    const copyWeightsLink = async () => {
        const qs = new URLSearchParams();
        fields.forEach((f) => {
            if (["gpa", "qudurat", "tahsili"].includes(f.id)) qs.set(f.id, String(f.weight));
        });
        const url = `${window.location.origin}${window.location.pathname}?${qs.toString()}`;
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {}
    };

    return (
        <>

            <main className="container mx-auto px-4 py-8" dir="rtl">
                <section className="mx-auto max-w-xl rounded-2xl border border-black/10 bg-gradient-to-b from-white to-gray-50 p-5 sm:p-8 shadow-lg">
                    <BackButton />

                    <div className="mt-2 mb-6">
                        <h1 className="text-2xl font-extrabold text-gray-900">حساب النسبة الموزونة</h1>
                        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                            النسبة الموزونة هي النسبة المطلوبة للقبول الجامعي في السعودية. أدخل درجاتك، وخصص الاختبارات والنسب حسب متطلبات جامعتك أو تخصصك.
                            <Link href="/calc/gpa" className="text-[#33365B] underline underline-offset-2 mr-1">
                                مو متأكد من التراكمي؟ احسبه هنا
                            </Link>
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
                                        <p className="text-sm font-medium text-gray-500 mb-1">نسبتك الموزونة</p>
                                        <div className="text-4xl font-extrabold text-[#33365B] leading-none tracking-tight">
                                            {result !== null ? result.toFixed(2) : "—"}
                                            {result !== null && <span className="text-xl font-bold text-gray-400 mr-1">%</span>}
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
                                    <button
                                        onClick={copyWeightsLink}
                                        className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-600 transition-all hover:border-[#33365B]/30 active:scale-95"
                                    >
                                        {copied ? "تم النسخ" : "نسخ رابط"}
                                    </button>
                                </div>
                            </div>
                            <AdUnit slot="3746520262" />
                        </div>
                    ) : (
                        <div className="animate-in fade-in duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-sm font-semibold text-gray-800">الاختبارات والنسب</h2>
                                <button
                                    onClick={() => setEditing((v) => !v)}
                                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                                        editing
                                            ? "bg-[#33365B] text-white"
                                            : "border border-gray-200 bg-white text-gray-600 hover:border-[#33365B]/30"
                                    }`}
                                >
                                    {editing ? "إنهاء التخصيص" : "تخصيص النسب"}
                                </button>
                            </div>

                            {editing && weightError && (
                                <div className="mb-3 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-700">
                                    مجموع النسب الحالي {totalWeight.toFixed(0)}% — يفضل يكون المجموع 100%
                                </div>
                            )}

                            <div className="flex flex-col gap-3">
                                {parsed.map((f, i) => {
                                    const hasValue = (scores[f.id] ?? "") !== "" && !isNaN(f.score);
                                    const hasError = f.scoreInvalid;

                                    return (
                                        <div
                                            key={f.id}
                                            className={`rounded-xl border p-4 bg-white transition-all duration-200 ${
                                                hasError ? "border-red-300 bg-red-50/30"
                                                : hasValue ? "border-[#33365B]/20 bg-[#f8f9ff]"
                                                : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        >
                                            <div className="flex items-center justify-between gap-3 mb-2">
                                                <div className="flex items-center gap-1.5 text-gray-500">
                                                    <span className="text-[#33365B]">{f.icon}</span>
                                                    <p className="text-sm font-medium text-gray-800">
                                                        {f.label}{!editing && <span className="text-gray-400 font-normal"> ({f.weight}%)</span>}
                                                    </p>
                                                </div>
                                                {editing && (
                                                    <div className="flex items-center gap-1.5">
                                                        <input
                                                            type="text"
                                                            inputMode="decimal"
                                                            value={f.weight === 0 ? "0" : String(f.weight)}
                                                            onChange={(e) => updateWeight(f.id, e.target.value)}
                                                            className="w-12 rounded-md border border-gray-300 px-1.5 py-1 text-xs text-center outline-none focus:border-[#33365B] focus:ring-1 focus:ring-[#33365B]/20"
                                                        />
                                                        <span className="text-xs text-gray-400">%</span>
                                                        <button
                                                            onClick={() => removeField(f.id)}
                                                            className="text-red-500 hover:text-red-700 p-1"
                                                        >
                                                            <TrashIcon />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <input
                                                    type="text"
                                                    inputMode="decimal"
                                                    placeholder={`أدخل درجة ${f.label} من 100`}
                                                    autoFocus={i === 0}
                                                    value={scores[f.id] ?? ""}
                                                    onChange={(e) => setScores((prev) => ({ ...prev, [f.id]: e.target.value.replace(",", ".") }))}
                                                    onKeyDown={(e) => handleKeyDown(e, scores[f.id] ?? "")}
                                                    onPaste={(e) => handlePaste(e, (v) => setScores((prev) => ({ ...prev, [f.id]: v })))}
                                                    onWheel={(e) => (e.currentTarget as HTMLElement).blur()}
                                                    onKeyDownCapture={(e) => {
                                                        if (e.key === "Enter" && !anyInvalid && filledCount > 0) setIsCalculated(true);
                                                    }}
                                                    className={`w-full rounded-lg border px-3 py-2.5 text-sm text-right outline-none transition-all focus:ring-2 focus:ring-[#33365B]/20 ${
                                                        hasError ? "border-red-400 bg-red-50 text-red-700"
                                                        : "border-gray-300 bg-white text-gray-900 focus:border-[#33365B]"
                                                    }`}
                                                />
                                            </div>
                                            {hasError && <p className="mt-1 text-[11px] text-red-500">0 — 100 فقط</p>}
                                        </div>
                                    );
                                })}
                            </div>

                            {editing && (
                                <div className="mt-3 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4">
                                    <p className="text-xs font-semibold text-gray-600 mb-3">إضافة اختيار جديد</p>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={addField}
                                            disabled={!newLabel.trim() || available <= 0}
                                            className="flex items-center gap-1 rounded-lg bg-[#33365B] px-3 py-2 text-xs font-medium text-white disabled:opacity-40 flex-shrink-0"
                                        >
                                            <PlusIcon /> إضافة
                                        </button>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="0"
                                            value={newWeight}
                                            onChange={(e) => setNewWeight(e.target.value.replace(",", "."))}
                                            onKeyDown={(e) => handleKeyDown(e, newWeight)}
                                            disabled={available <= 0}
                                            className="w-12 rounded-md border border-gray-300 px-1.5 py-2 text-xs text-center outline-none focus:border-[#33365B] disabled:bg-gray-100"
                                        />
                                        <span className="text-xs text-gray-400 flex-shrink-0">%</span>
                                        <input
                                            type="text"
                                            placeholder="مثال: ستيب، آيلتس..."
                                            value={newLabel}
                                            onChange={(e) => setNewLabel(e.target.value)}
                                            onKeyDown={(e) => { if (e.key === "Enter") addField(); }}
                                            disabled={available <= 0}
                                            className="flex-1 min-w-0 rounded-md border border-gray-300 px-2 py-2 text-xs outline-none focus:border-[#33365B] disabled:bg-gray-100"
                                        />
                                    </div>
                                    {available <= 0 ? (
                                        <p className="mt-2 text-[10px] text-red-500">لا يمكن تجاوز 100% — النسبة المتبقية 0%</p>
                                    ) : (
                                        <>
                                            {parseFloat(newWeight) > available && (
                                                <p className="mt-2 text-[10px] text-red-500">أقصى نسبة متاحة {available}%</p>
                                            )}
                                            <p className="mt-2 text-[10px] text-gray-400 text-left">متاح: {available}%</p>
                                        </>
                                    )}
                                </div>
                            )}

                            {anyInvalid && (
                                <p className="mt-3 text-xs text-red-500 text-right">تأكد أن القيم بين 0 و 100</p>
                            )}

                            <div className="mt-6 flex gap-3">
                                <button
                                    onClick={clearScores}
                                    className="rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-medium text-gray-600 hover:border-[#33365B]/30 active:scale-95"
                                >
                                    مسح الدرجات
                                </button>
                                <button
                                    onClick={() => setIsCalculated(true)}
                                    disabled={anyInvalid || filledCount === 0}
                                    className="flex-1 rounded-xl bg-[#33365B] px-4 py-3.5 text-base font-bold text-white transition-all hover:bg-[#252746] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                                >
                                    احسب النسبة الموزونة
                                </button>
                            </div>
                        </div>
                    )}

                </section>
            </main>
        </>
    );
}

export default function WeightedScore() {
    return (
        <Suspense fallback={null}>
            <WeightedScoreContent />
        </Suspense>
    );
}
