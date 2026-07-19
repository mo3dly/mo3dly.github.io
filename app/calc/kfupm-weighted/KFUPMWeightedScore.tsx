"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import DrawrProgressbar from "@/components/DrawrProgressbar";

type Track = "early" | "transfer";

const DATA_SOURCE = "اجتهاد طلابي";
const AD_INTERVAL = 8;
const MAX_ADS = 3;

interface Major {
    name: string;
    earlyMinScore: number;
    transferMinScore: number;
}

const majors: Major[] = [
    { name: "المحاسبة", earlyMinScore: 82.0, transferMinScore: 99.0 },
    { name: "هندسة الطيران والفضاء", earlyMinScore: 85.5, transferMinScore: 99.978 },
    { name: "الهندسة المعمارية", earlyMinScore: 83.25, transferMinScore: 99.2 },
    { name: "العلوم الإكتوارية", earlyMinScore: 82.1, transferMinScore: 99.062 },
    { name: "الهندسة الحيوية", earlyMinScore: 83.25, transferMinScore: 99.499 },
    { name: "الهندسة المدنية", earlyMinScore: 82.6, transferMinScore: 99.406 },
    { name: "الهندسة الكيميائية", earlyMinScore: 84.35, transferMinScore: 99.6 },
    { name: "الكيمياء", earlyMinScore: 82.35, transferMinScore: 0 },
    { name: "هندسة التحكم والقياس", earlyMinScore: 83.7, transferMinScore: 99.56 },
    { name: "هندسة الحاسب", earlyMinScore: 83.0, transferMinScore: 99.578 },
    { name: "علوم الحاسب الآلي", earlyMinScore: 82.7, transferMinScore: 99.544 },
    { name: "الهندسة الكهربائية", earlyMinScore: 85.5, transferMinScore: 99.576 },
    { name: "الهندسة الكهربائية والفيزياء", earlyMinScore: 84.1, transferMinScore: 0 },
    { name: "العلوم والهندسة البيئية", earlyMinScore: 82.15, transferMinScore: 99.483 },
    { name: "الإدارة المالية", earlyMinScore: 82.25, transferMinScore: 99.195 },
    { name: "جيولوجيا", earlyMinScore: 83.8, transferMinScore: 0 },
    { name: "الجيوفيزياء", earlyMinScore: 82.3, transferMinScore: 0 },
    { name: "إدارة الموارد البشرية", earlyMinScore: 82.35, transferMinScore: 99.091 },
    { name: "الهندسة الصناعية والنظم", earlyMinScore: 85.2, transferMinScore: 99.567 },
    { name: "التصميم المتكامل", earlyMinScore: 82.15, transferMinScore: 99.0 },
    { name: "الرياضيات", earlyMinScore: 82.7, transferMinScore: 0 },
    { name: "الهندسة الميكانيكية", earlyMinScore: 85.45, transferMinScore: 99.987 },
    { name: "علوم وهندسة التعدين", earlyMinScore: 83.95, transferMinScore: 99.472 },
    { name: "نظم المعلومات الإدارية", earlyMinScore: 82.0, transferMinScore: 0 },
    { name: "التسويق", earlyMinScore: 82.45, transferMinScore: 99.104 },
    { name: "علوم وهندسة المواد", earlyMinScore: 82.9, transferMinScore: 99.394 },
    { name: "هندسة البترول", earlyMinScore: 86.25, transferMinScore: 0 },
    { name: "الفيزياء", earlyMinScore: 82.1, transferMinScore: 99.478 },
    { name: "المدن الذكية والمستدامة", earlyMinScore: 82.75, transferMinScore: 99.196 },
    { name: "هندسة البرمجيات", earlyMinScore: 84.0, transferMinScore: 99.499 },
    { name: "علوم البيانات والهندسة", earlyMinScore: 82.8, transferMinScore: 0 },
    { name: "الذكاء الاصطناعي والأمن السيبراني", earlyMinScore: 84.5, transferMinScore: 0 },
    { name: "تصميم أشباه الموصلات والهندسة", earlyMinScore: 82.95, transferMinScore: 0 },
    { name: "الهندسة الحيوية (ما قبل الطب)", earlyMinScore: 86.3, transferMinScore: 0 },
];

function clamp(value: number, min: number, max: number) {
    if (Number.isNaN(value)) return 0;
    return Math.min(Math.max(value, min), max);
}

export default function KFUPMWeightedScore() {
    const [track, setTrack] = useState<Track>("early");
    const [tahsiliEarly, setTahsiliEarly] = useState("");
    const [qudurat, setQudurat] = useState("");
    const [tahsiliTransfer, setTahsiliTransfer] = useState("");
    const [thanawiya, setThanawiya] = useState("");
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState("");

    const handleCalculate = () => {
        setError("");

        if (track === "early") {
            const t = parseFloat(tahsiliEarly);
            const q = parseFloat(qudurat);

            if (!tahsiliEarly || !qudurat) {
                setError("الرجاء إدخال جميع الدرجات");
                return;
            }
            if (t < 0 || t > 1000 || q < 0 || q > 100) {
                setError("تأكد من صحة الدرجات المدخلة");
                return;
            }

            const tScaled = clamp(t / 10, 0, 100) * 0.5;
            const qScaled = clamp(q, 0, 100) * 0.5;
            setResult(tScaled + qScaled);
        } else {
            const q = parseFloat(qudurat);
            const t = parseFloat(tahsiliTransfer);
            const s = parseFloat(thanawiya);

            if (!qudurat || !tahsiliTransfer || !thanawiya) {
                setError("الرجاء إدخال جميع الدرجات");
                return;
            }
            if (q < 0 || q > 100 || t < 0 || t > 100 || s < 0 || s > 100) {
                setError("تأكد من صحة الدرجات المدخلة");
                return;
            }

            const qScaled = clamp(q, 0, 100) * 0.5;
            const tScaled = clamp(t, 0, 100) * 0.4;
            const sScaled = clamp(s, 0, 100) * 0.1;
            setResult(qScaled + tScaled + sScaled);
        }
    };

    const handleReset = () => {
        setResult(null);
        setTahsiliEarly("");
        setQudurat("");
        setTahsiliTransfer("");
        setThanawiya("");
        setError("");
    };

    const nearestMajors = useMemo(() => {
        if (result === null) return [];
        const key = track === "early" ? "earlyMinScore" : "transferMinScore";
        return [...majors]
            .filter((m) => m[key] > 0)
            .sort((a, b) => Math.abs(a[key] - result) - Math.abs(b[key] - result));
    }, [result, track]);

    const scoreKey = track === "early" ? "earlyMinScore" : "transferMinScore";

    const adIndices = useMemo(() => {
        const indices: number[] = [];
        for (let i = AD_INTERVAL - 1; i < nearestMajors.length && indices.length < MAX_ADS; i += AD_INTERVAL) {
            indices.push(i);
        }
        return indices;
    }, [nearestMajors]);

    useEffect(() => {
        if (result === null) return;
        try {
            adIndices.forEach(() => {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            });
        } catch (e) {}
    }, [result, adIndices]);

    return (
        <main dir="rtl" className="w-full overflow-x-hidden bg-gray-50 min-h-screen py-6 sm:py-10 px-3 sm:px-4">
            <div className="max-w-xl mx-auto space-y-4 sm:space-y-6">
                <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 space-y-4">
                    <h1 className="text-xl sm:text-2xl font-bold text-[#33365B] leading-snug">
                        حساب النسبة الموزونة لجامعة الملك فهد للبترول والمعادن
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        هذه الأداة تساعدك على حساب نسبتك الموزونة للقبول في جامعة الملك فهد للبترول والمعادن، بناءً على المسار الذي تقدمت من خلاله سواءً كان المسار المبكر أو المسار الالحاقي، ومعرفة أقرب التخصصات لموزونتك.
                    </p>
                    <div className="flex items-start gap-2 bg-[#33365B]/5 border border-[#33365B]/10 rounded-xl p-3 sm:p-4">
                        <svg className="w-5 h-5 text-[#33365B] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-xs sm:text-sm text-[#33365B]">
                            هذه الآلة الحسابية مخصصة فقط لطريقة احتساب النسبة المومونة لجامعة الملك فهد للبترول والمعادن، وتختلف معادلتها عن باقي الجامعات.
                        </p>
                    </div>
                    <Link
                        href="/calc/weighted"
                        className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition rounded-xl p-3 sm:p-4 text-[#33365B] font-medium"
                    >
                        <span className="text-sm sm:text-base">تحتاج تحسب موزونتك لجامعة ثانية؟ اضغط هنا</span>
                        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 space-y-4 sm:space-y-5">
                    <h2 className="text-base sm:text-lg font-bold text-[#33365B]">اختر مسار التقديم</h2>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        <button
                            onClick={() => {
                                setTrack("early");
                                handleReset();
                            }}
                            className={`flex flex-col items-center gap-2 rounded-xl border-2 p-3 sm:p-4 transition ${track === "early" ? "border-[#33365B] bg-[#33365B]/5" : "border-gray-200"
                                }`}
                        >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#33365B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-xs sm:text-sm font-medium text-[#33365B] text-center">المسار المبكر</span>
                        </button>
                        <button
                            onClick={() => {
                                setTrack("transfer");
                                handleReset();
                            }}
                            className={`flex flex-col items-center gap-2 rounded-xl border-2 p-3 sm:p-4 transition ${track === "transfer" ? "border-[#33365B] bg-[#33365B]/5" : "border-gray-200"
                                }`}
                        >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#33365B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582M20 20v-5h-.581M5.635 8.5a8 8 0 0113.365-2M18.365 15.5a8 8 0 01-13.365 2" />
                            </svg>
                            <span className="text-xs sm:text-sm font-medium text-[#33365B] text-center">المسار الإلحاقي (الشواغر)</span>
                        </button>
                    </div>

                    {result === null && (
                        <div className="space-y-4">
                            {track === "early" ? (
                                <>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-gray-700">
                                            درجة التحصيلي المبكر (من 1000)
                                        </label>
                                        <input
                                            type="number"
                                            inputMode="decimal"
                                            step="0.01"
                                            value={tahsiliEarly}
                                            onChange={(e) => setTahsiliEarly(e.target.value)}
                                            placeholder="مثال: 850.5"
                                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#33365B]/30"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-gray-700">
                                            درجة القدرات (من 100)
                                        </label>
                                        <input
                                            type="number"
                                            inputMode="decimal"
                                            step="0.01"
                                            value={qudurat}
                                            onChange={(e) => setQudurat(e.target.value)}
                                            placeholder="مثال: 85.5"
                                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#33365B]/30"
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-gray-700">
                                            درجة اختبار القدرات (من 100)
                                        </label>
                                        <input
                                            type="number"
                                            inputMode="decimal"
                                            step="0.01"
                                            value={qudurat}
                                            onChange={(e) => setQudurat(e.target.value)}
                                            placeholder="مثال: 85.5"
                                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#33365B]/30"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-gray-700">
                                            درجة اختبار التحصيلي (من 100)
                                        </label>
                                        <input
                                            type="number"
                                            inputMode="decimal"
                                            step="0.01"
                                            value={tahsiliTransfer}
                                            onChange={(e) => setTahsiliTransfer(e.target.value)}
                                            placeholder="مثال: 80.5"
                                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#33365B]/30"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-gray-700">
                                            نسبة الثانوية العامة (من 100)
                                        </label>
                                        <input
                                            type="number"
                                            inputMode="decimal"
                                            step="0.01"
                                            value={thanawiya}
                                            onChange={(e) => setThanawiya(e.target.value)}
                                            placeholder="مثال: 95.5"
                                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#33365B]/30"
                                        />
                                    </div>
                                </>
                            )}

                            {error && <p className="text-sm text-red-500">{error}</p>}

                            <button
                                onClick={handleCalculate}
                                className="w-full bg-[#33365B] text-white font-medium rounded-xl py-3 hover:opacity-90 transition"
                            >
                                احسب الموزونة
                            </button>
                        </div>
                    )}

                    {result !== null && (
                        <div className="flex flex-col items-center gap-4 py-2 sm:py-4">
                            <DrawrProgressbar value={result} size={120} />
                            <button
                                onClick={handleReset}
                                className="text-sm text-[#33365B] font-medium underline"
                            >
                                إعادة الحساب
                            </button>
                        </div>
                    )}
                </div>

                {result !== null && (
                    <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <h2 className="text-base sm:text-lg font-bold text-[#33365B]">أقرب التخصصات لموزونتك</h2>
                            <span className="text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-1">
                                المصدر: {DATA_SOURCE}
                            </span>
                        </div>

                        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
                            <svg className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>
                            <p className="text-xs text-amber-700 leading-relaxed">
                                نعتذر عن عدم توفر جميع تخصصات الجامعة في القائمة حاليًا نظرًا لعدم توفر بيانات كافية عنها، وسيتم تحديث القائمة أولًا بأول.
                            </p>
                        </div>

                        <div className="space-y-2">
                            {nearestMajors.map((m, index) => {
                                const minScore = m[scoreKey];
                                const diff = result - minScore;
                                const status =
                                    diff > 0 ? "above" : diff === 0 ? "equal" : "below";

                                const badge = {
                                    above: { text: "أعلى من الموزونة", cls: "bg-green-100 text-green-700" },
                                    equal: { text: "تساوي الموزونة", cls: "bg-blue-100 text-blue-700" },
                                    below: { text: "أقل من الموزونة", cls: "bg-red-100 text-red-700" },
                                }[status];

                                return (
                                    <div key={m.name}>
                                        <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3 gap-2">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm font-medium text-gray-800">{m.name}</span>
                                                <span className={`text-[11px] w-fit rounded-full px-2 py-0.5 ${badge.cls}`}>
                                                    {badge.text}
                                                </span>
                                            </div>
                                            <span className="text-sm font-bold text-[#33365B] shrink-0">{minScore}%</span>
                                        </div>
                                        {adIndices.includes(index) && (
                                            <ins
                                                key={`ad-${index}`}
                                                className="adsbygoogle"
                                                style={{ display: "block" }}
                                                data-ad-format="fluid"
                                                data-ad-layout-key="-hb-7+2h-1m-4u"
                                                data-ad-client="ca-pub-4968434285942225"
                                                data-ad-slot="5503304771"
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
