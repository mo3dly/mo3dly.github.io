"use client";

import BackButton from "@/components/BackButton";
import type { SecSubjectsType, Term, PathwaySystem, Grade } from "@/types/gpa";
import { PATHWAYS_BY_GRADE, PATHWAY_LABELS } from "@/types/gpa";
import Result from "@/components/Result";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { useGradePage } from "@/components/useGrade";
import SubjectIcon from "@/components/SubjectIcon";
import { useEffect, useState } from "react";

export const Subjects: SecSubjectsType = {
    cy: {
        first: [
            { name: "القرآن الكريم وتفسيره", weight: 4 },
            { name: "الرياضيات", weight: 5 },
            { name: "اللغة الإنجليزية", weight: 5 },
            { name: "التقنية الرقمية", weight: 3 },
            { name: "الأحياء", weight: 3 },
            { name: "الكيمياء", weight: 3 },
            { name: "الكفايات اللغوية", weight: 4 },
            { name: "التفكير الناقد", weight: 3 },
            { name: "التربية الصحية والبدنية", weight: 2 },
            { name: "السلوك", weight: 1 },
            { name: "المواظبة", weight: 5 }
        ],
        second: [
            { name: "الرياضيات", weight: 5 },
            { name: "اللغة الإنجليزية", weight: 5 },
            { name: "التقنية الرقمية", weight: 3 },
            { name: "فيزياء", weight: 3 },
            { name: "علم بيئة", weight: 2 },
            { name: "كفايات لغوية", weight: 3 },
            { name: "حديث", weight: 2 },
            { name: "معرفة مالية", weight: 2 },
            { name: "دراسات اجتماعية", weight: 3 },
            { name: "تربية مهنية", weight: 2 },
            { name: "التربية الصحية والبدنية", weight: 2 },
            { name: "السلوك", weight: 1 },
            { name: "المواظبة", weight: 5 }
        ]
    }
};

export default function Grade() {
    const grade = 10;

    const availablePathwaysFromTypes = PATHWAYS_BY_GRADE[grade] ?? [];

    const fallbackInitialPathway = availablePathwaysFromTypes.length
        ? (availablePathwaysFromTypes[0] as PathwaySystem)
        : (Object.keys(Subjects)[0] as PathwaySystem);

    const {
        term,
        setTerm,
        pathway,
        setPathway,
        currentSubjects,
        tempGrades,
        errors,
        handleInputChange,
        onCalculate,
        anyErrors,
        calculationResult,
        setCalculationResult,
        showResult,
        setShowResult,
        headingRef,
        readableTerm,
        scrollToTop,
        loading,
        availablePathways,
    } = useGradePage({
        Subjects,
        gradeLevel: grade,
        hasPathways: true,
        initialPathway: fallbackInitialPathway
    });

    const hasPathways = Boolean(availablePathways && availablePathways.length > 0);

    useEffect(() => {
        if (hasPathways && !pathway) {
            setPathway(availablePathways[0]);
        }
    }, [availablePathways, hasPathways, pathway, setPathway]);

    return (
        <>
            <BreadcrumbSchema grade={grade as unknown as Grade} />
            <main className="container mx-auto px-4 py-10">
                <section className="mx-auto max-w-4xl rounded-2xl border border-black/10 bg-gradient-to-b from-white to-gray-50 p-6 sm:p-8 shadow-lg overflow-hidden">
                    <BackButton />
                    <div className="mb-6 text-right">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                                    اول ثانوي - حاسبة معدلي
                                </h1>
                                <p className="mt-2 text-sm text-gray-500">أدخل درجاتك واحصل على معدلك الدقيق وفق طريقة حساب وزارة التعليم السعودية —  <strong>{readableTerm}</strong></p>
                            </div>
                        </div>
                    </div>

                    <section ref={headingRef} className="mb-6 text-right grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                        {hasPathways && (
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">المسار</label>
                                <div className="relative max-w-sm">
                                    <select
                                        value={pathway ?? ""}
                                        onChange={(e) => setPathway(e.target.value as PathwaySystem)}
                                        className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm transition focus:border-[#33365B] focus:ring-2 focus:ring-[#33365B]/20"
                                    >
                                        {availablePathways.map((p) => (
                                            <option key={p} value={p}>
                                                {PATHWAY_LABELS[p as PathwaySystem]}
                                            </option>
                                        ))}
                                    </select>

                                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">▼</span>
                                </div>
                            </div>
                        )}

                        <div>
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
                                {currentSubjects.map((subject, idx) => (
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

                            <div
                                className="fixed bottom-4 left-1/2 z-50 w-[90%] max-w-[420px]
                                     -translate-x-1/2"
                                style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
                            >
                                <button
                                    onClick={onCalculate}
                                    disabled={anyErrors}
                                    className={`relative flex w-full items-center justify-center gap-2
                              rounded-2xl px-4 py-3
                              text-sm font-semibold text-white
                              transition
                              ${anyErrors
                                            ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                                            : "bg-[#0f172a] shadow-xl hover:shadow-2xl hover:-translate-y-0.5 hover:brightness-[1.05] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0f172a]/40 focus-visible:ring-offset-2"
                                        }`}
                                >

                                    {!anyErrors && (
                                        <span
                                            aria-hidden
                                            className="absolute right-4 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[#f59e0b]"
                                        />
                                    )}

                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
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
                                <Result
                                    calculationResult={calculationResult}
                                    onReset={() => {
                                        setCalculationResult(null);
                                    }}
                                />
                            )}
                        </section>
                    ) : (
                        showResult && calculationResult && (
                            <Result
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
        </>
    );
}