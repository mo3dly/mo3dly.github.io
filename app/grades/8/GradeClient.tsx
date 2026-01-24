"use client";

import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import { getTerm } from "@/utils/getTerm";
import { calculateGPA } from "@/utils/calculateGPA";
import type {
    GradeLevel,
    Term,
    PathwaySystem,
    SubjectInput,
    GPAResult,
    SubjectsType,

} from "@/types/gpa";
import MidResult from "@/components/MidResult";
import { useRef } from "react";


export const Subjects: SubjectsType = {
    first: [
        { name: "القرآن الكريم والدراسات الاسلامية", weight: 5 },
        { name: "اللغة العربية", weight: 5 },
        { name: "الدراسات الاجتماعية", weight: 3 },
        { name: "الرياضيات", weight: 6 },
        { name: "العلوم", weight: 4 },
        { name: "اللغة الإنجليزية", weight: 4 },
        { name: "المهارات الرقمية", weight: 2 },
        { name: "التربية الفنية", weight: 2 },
        { name: "التربية البدنية", weight: 2 },
        { name: "المهارات الحياتية والاسرية", weight: 1 },
        { name: "السلوك", weight: 1 },
        { name: "المواظبة", weight: 5 },
        { name: "النشاط", weight: 1 }
    ],
    second: [
        { name: "القرآن الكريم والدراسات الاسلامية", weight: 5 },
        { name: "اللغة العربية", weight: 5 },
        { name: "الدراسات الاجتماعية", weight: 3 },
        { name: "الرياضيات", weight: 6 },
        { name: "العلوم", weight: 4 },
        { name: "اللغة الإنجليزية", weight: 4 },
        { name: "المهارات الرقمية", weight: 2 },
        { name: "التربية الفنية", weight: 2 },
        { name: "التربية البدنية", weight: 2 },
        { name: "المهارات الحياتية والاسرية", weight: 1 },
        { name: "السلوك", weight: 1 },
        { name: "المواظبة", weight: 5 },
        { name: "النشاط", weight: 1 }
    ],
};

function SubjectIcon({ index }: { index: number }) {
    const mod = index % 6;
    switch (mod) {
        case 0:
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M7 8H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            );
        case 1:
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M5 20c1-4 7-6 7-6s6 2 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            );
        case 2:
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M4 7h16M4 12h10M4 17h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            );
        case 3:
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            );
        case 4:
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M3 6h18v12H3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M8 10h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            );
        default:
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M12 2l3 7h7l-5.5 4 2 7L12 17l-6.5 3 2-7L2 9h7z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                </svg>
            );
    }
}

export default function Grade() {
    const [term, setTerm] = useState<Term | "">("");
    const [subjectsInput, setSubjectsInput] = useState<SubjectInput[]>([]);
    const [loading, setLoading] = useState(true);
    const [calculationResult, setCalculationResult] = useState<GPAResult | null>(null);
    const [tempGrades, setTempGrades] = useState<Record<string, string>>({});
    const [errors, setErrors] = useState<Record<string, string | null>>({});
    const [showResult, setShowResult] = useState(false);
    const headingRef = useRef<HTMLHeadingElement | null>(null);

    const scrollToTop = () => {
        headingRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    };

    const readableTerm = term === "second" ? "الفصل الدراسي الثاني" : "الفصل الدراسي الأول";
    const defaultGradeLevel = 8 as GradeLevel;

    useEffect(() => {
        const detectedTerm = getTerm();
        const initialTerm = detectedTerm === "first" || detectedTerm === "second" ? detectedTerm : "first";
        setTerm(initialTerm as Term);
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!term) return;
        const initial: Record<string, string> = {};
        const initialErrors: Record<string, string | null> = {};
        Subjects[term].forEach((s) => {
            initial[s.name] = String(100);
            initialErrors[s.name] = null;
        });
        setTempGrades(initial);
        setErrors(initialErrors);
        setSubjectsInput([]);
        setCalculationResult(null);
    }, [term]);

    useEffect(() => {
        if (showResult) {
            headingRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [showResult]);

    const validateField = (name: string, value: string) => {
        if (value.trim() === "") return "لازم تدخل درجة";
        const num = Number(value);
        if (!Number.isFinite(num) || String(value).match(/[^0-9.\-]/)) return "يجب إدخال رقم صالح";
        if (num < 0 || num > 100) return "الدرجة لازم تكون بين 0 و 100";
        return null;
    };

    const handleInputChange = (name: string, value: string) => {
        setTempGrades(prev => ({ ...prev, [name]: value }));
        const err = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: err }));
    };

    const onCalculate = () => {
        if (!term) return;
        const newErrors: Record<string, string | null> = {};
        let hasError = false;
        Subjects[term].forEach((s) => {
            const val = tempGrades[s.name] ?? "";
            const err = validateField(s.name, val);
            newErrors[s.name] = err;
            if (err) hasError = true;
        });
        setErrors(newErrors);
        if (hasError) {
            const firstInvalid = Object.keys(newErrors).find(k => newErrors[k]);
            if (firstInvalid) {
                const el = document.querySelector(`input[data-subject="${CSS.escape(firstInvalid)}"]`) as HTMLInputElement | null;
                el?.focus();
            }
            return;
        }

        const built: SubjectInput[] = Subjects[term].map((s) => ({
            name: s.name,
            weeklyUnits: s.weight,
            gradeValue: Number(tempGrades[s.name] ?? 100)
        }));
        setSubjectsInput(built);

        try {
            const result = calculateGPA({
                gradeLevel: defaultGradeLevel,
                term: term as Term,
                pathwaySystem: null as PathwaySystem | null,
                subjects: built
            });
            setCalculationResult(result);
            setShowResult(true);
        } catch (e: any) {
            setCalculationResult(null);
            alert(e?.message ?? "حدث خطأ أثناء الحساب");
        }
    };

    const anyErrors = Object.values(errors).some(Boolean);

    return (
        <main ref={headingRef} className="container mx-auto px-4 py-10">
            <section className="mx-auto max-w-4xl rounded-2xl border border-black/10 bg-gradient-to-b from-white to-gray-50 p-6 sm:p-8 shadow-lg overflow-hidden">
                <BackButton />
                <div className="mb-6 text-right">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                                ثاني متوسط - حاسبة معدلي
                            </h1>
                            <p className="mt-2 text-sm text-gray-500">أدخل درجاتك واحصل على معدلك الدقيق وفق طريقة حساب وزارة التعليم السعودية —  <strong>{readableTerm}</strong></p>
                        </div>
                    </div>
                </div>
                <section className="mb-6 text-right">
                    <label className="mb-2 block text-sm font-medium text-gray-700">الفصل الدراسي</label>
                    <div className="relative max-w-sm">
                        <select
                            value={term}
                            onChange={(e) => setTerm(e.target.value as Term)}
                            disabled={loading}
                            aria-busy={loading}
                            className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm transition focus:border-[#33365B] focus:ring-2 focus:ring-[#33365B]/20"
                        >
                            <option value="first">الفصل الدراسي الأول</option>
                            <option value="second">الفصل الدراسي الثاني</option>
                        </select>
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">▼</span>
                    </div>
                </section>

                {loading ? (
                    <section className="space-y-6" aria-hidden>
                        <h2 className="text-lg font-semibold text-gray-800 text-right">المواد الدراسية</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="rounded-xl border border-gray-200 p-4 animate-pulse">
                                    <div className="mb-3 flex items-center justify-between">
                                        <div className="h-4 w-3/4 rounded bg-gray-200" />
                                        <div className="h-4 w-8 rounded bg-gray-200" />
                                    </div>
                                    <div className="h-10 w-full rounded bg-gray-200" />
                                </div>
                            ))}
                        </div>
                    </section>
                ) : !showResult ? (
                    <section className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-800 text-right">المواد الدراسية</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {Subjects[term as Term].map((subject, idx) => (
                                <div key={subject.name} className="rounded-xl border border-gray-200 p-4 bg-white transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                                    <div className="mb-3 flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#33365B]/6 text-[#33365B]">
                                                <SubjectIcon index={idx} />
                                            </div>
                                            <div className="text-right">
                                                <div className="block text-sm font-medium text-gray-800">{subject.name}</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-400">100/</span>
                                                <input
                                                    data-subject={subject.name}
                                                    type="text"
                                                    inputMode="decimal"
                                                    min={0}
                                                    max={100}
                                                    aria-invalid={Boolean(errors[subject.name])}
                                                    placeholder="100"
                                                    value={tempGrades[subject.name] ?? ''}
                                                    onChange={(e) => {
                                                        handleInputChange(subject.name, e.target.value);
                                                    }}
                                                    className={`w-24 rounded-lg border px-3 py-2 text-sm focus:border-[#33365B] focus:ring-2 focus:ring-[#33365B]/20 outline-none text-right ${errors[subject.name] ? 'border-red-500' : 'border-gray-300'}`}
                                                />
                                            </div>
                                            {errors[subject.name] && (
                                                <div className="mt-1 text-xs text-red-600 text-right">{errors[subject.name]}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
                            <button
                                onClick={onCalculate}
                                disabled={anyErrors}
                                className={`flex items-center gap-2 rounded-xl px-4 py-2
    text-sm font-semibold text-white shadow transition
    ${anyErrors
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'bg-[#33365B] hover:brightness-[1.05]'
                                    }`}
                            >
                                {/* Calculator icon */}
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden
                                    className="shrink-0"
                                >
                                    <rect
                                        x="4"
                                        y="2"
                                        width="16"
                                        height="20"
                                        rx="3"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <rect
                                        x="7"
                                        y="5"
                                        width="10"
                                        height="4"
                                        rx="1"
                                        fill="currentColor"
                                        opacity="0.15"
                                    />
                                    <path
                                        d="M8 12h2M12 12h2M16 12h0M8 16h2M12 16h2M16 16h0"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>

                                احسب المعدل
                            </button>
                        </div>
                        {calculationResult && (
                            <MidResult
                                calculationResult={calculationResult}
                                onReset={() => {
                                    setCalculationResult(null);
                                }}
                            />
                        )}
                    </section>
                ) : (
                    showResult && calculationResult && (
                        <MidResult
                            calculationResult={calculationResult}
                            onReset={() => {
                                setCalculationResult(null);
                                setShowResult(false);
                                scrollToTop();
                            }}
                        />
                    )
                )}
            </section>
        </main>
    );
}