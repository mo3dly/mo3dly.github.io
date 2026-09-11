"use client";

import BackButton from "@/components/BackButton";
import type { SecSubjectsType, Term, PathwaySystem, Grade } from "@/types/gpa";
import { PATHWAYS_BY_GRADE, PATHWAY_LABELS } from "@/types/gpa";
import Result from "@/components/Result";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { useGradePage } from "@/components/useGrade";
import SubjectIcon from "@/components/SubjectIcon";
import { useEffect } from "react";

export const Subjects: SecSubjectsType = {
    gen: {
        first: [
            { name: "الرياضيات", weight: 4 },
            { name: "اللغة الانجليزية", weight: 4 },
            { name: "الكيمياء", weight: 3 },
            { name: "الفيزياء", weight: 5 },
            { name: "علوم الارض والفضاء", weight: 3 },
            { name: "التقنية الرقمية", weight: 2 },
            { name: "التربية الصحية والبدنية", weight: 3 },
            { name: "البحث ومصادر المعلومات", weight: 2 },
            { name: "المجال الاختياري", weight: 5 },
            { name: "النشاط", weight: 1 },
            { name: "السلوك", weight: 1 },
            { name: "المواظبة", weight: 5 }
        ],
        second: [
            { name: "الرياضيات", weight: 4 },
            { name: "اللغة الانجليزية", weight: 4 },
            { name: "الفيزياء", weight: 5 },
            { name: "علوم الارض والفضاء", weight: 3 },
            { name: "الفقة", weight: 2 },
            { name: "الدراسات الادبية", weight: 2 },
            { name: "الدراسات النفسية والاجتماعية", weight: 2 },
            { name: "المواطنة الرقمية", weight: 2 },
            { name: "الجغرافيا", weight: 2 },
            { name: "المهارات الحياتية", weight: 2 },
            { name: "المجال الاختياري", weight: 2 },
            { name: "النشاط", weight: 2 },
            { name: "السلوك", weight: 1 },
            { name: "المواظبة", weight: 5 }
        ]
    },

    eng: {
        first: [
            { name: "الرياضيات", weight: 4 },
            { name: "اللغة الانجليزية", weight: 4 },
            { name: "الكيمياء", weight: 3 },
            { name: "الفيزياء", weight: 5 },
            { name: "علوم الارض والفضاء", weight: 3 },
            { name: "الدراسات الادبية", weight: 2 },
            { name: "الذكاء الاصطناعي", weight: 2 },
            { name: "الامن السيبراني", weight: 2 },
            { name: "التصميم الهندسي", weight: 3 },
            { name: "البحث ومصادر المعلومات", weight: 2 },
            { name: "النشاط", weight: 2 },
            { name: "السلوك", weight: 1 },
            { name: "المواظبة", weight: 5 }
        ],
        second: [
            { name: "الرياضيات", weight: 4 },
            { name: "اللغة الانجليزية", weight: 4 },
            { name: "الفيزياء", weight: 5 },
            { name: "علوم الارض والفضاء", weight: 3 },
            { name: "الفقة", weight: 2 },
            { name: "الذكاء الاصطناعي", weight: 3 },
            { name: "هندسة البرمجيات", weight: 3 },
            { name: "المهارات الحياتية", weight: 2 },
            { name: "التربية الصحية والبدنية", weight: 3 },
            { name: "مشروع التخرج", weight: 2 },
            { name: "النشاط", weight: 1 },
            { name: "السلوك", weight: 1 },
            { name: "المواظبة", weight: 5 }
        ]
    },

    hlth: {
        first: [
            { name: "الرياضيات", weight: 4 },
            { name: "اللغة الانجليزية", weight: 4 },
            { name: "الكيمياء", weight: 3 },
            { name: "الفيزياء", weight: 5 },
            { name: "علوم الارض والفضاء", weight: 3 },
            { name: "الدراسات الادبية", weight: 2 },
            { name: "الرعاية الصحية", weight: 3 },
            { name: "انظمة جسم الانسان", weight: 3 },
            { name: "الاحصاء", weight: 2 },
            { name: "البحث ومصادر المعلومات", weight: 2 },
            { name: "النشاط", weight: 1 },
            { name: "السلوك", weight: 1 },
            { name: "المواظبة", weight: 5 }
        ],
        second: [
            { name: "الرياضيات", weight: 4 },
            { name: "اللغة الانجليزية", weight: 4 },
            { name: "الفيزياء", weight: 5 },
            { name: "علوم الارض والفضاء", weight: 3 },
            { name: "الفقة", weight: 2 },
            { name: "الرعاية الصحية", weight: 3 },
            { name: "انظمة جسم الانسان", weight: 2 },
            { name: "المهارات الحياتية", weight: 2 },
            { name: "التربية الصحية والبدنية", weight: 3 },
            { name: "مشروع التخرج", weight: 2 },
            { name: "النشاط", weight: 2 },
            { name: "السلوك", weight: 1 },
            { name: "المواظبة", weight: 5 }
        ]
    },

    biz: {
        first: [
            { name: "اللغة الانجليزية", weight: 4 },
            { name: "الفقه", weight: 2 },
            { name: "الدراسات الادبية", weight: 2 },
            { name: "مبادئ الادارة", weight: 3 },
            { name: "ادارة الفعاليات", weight: 4 },
            { name: "تخطيط الحملات التسويقية", weight: 3 },
            { name: "مبادئ القانون", weight: 3 },
            { name: "الاحصاء", weight: 2 },
            { name: "الجغرافيا", weight: 2 },
            { name: "التربية الصحية والبدنية", weight: 3 },
            { name: "البحث ومصادر المعلومات", weight: 2 },
            { name: "النشاط", weight: 2 },
            { name: "السلوك", weight: 1 },
            { name: "المواظبة", weight: 5 }
        ],
        second: [
            { name: "اللغة الانجليزية", weight: 4 },
            { name: "الدراسات النفسية والاجتماعية", weight: 2 },
            { name: "الدراسات البلاغية والنقدية", weight: 3 },
            { name: "ادارة الفعاليات", weight: 3 },
            { name: "تخطيط الحملات التسويقية", weight: 4 },
            { name: "السكرتارية والادارة المكتبية", weight: 3 },
            { name: "مبادئ القانون", weight: 4 },
            { name: "تطبيقات في القانون", weight: 2 },
            { name: "المواطنة الرقمية", weight: 2 },
            { name: "المهارات الحياتية", weight: 2 },
            { name: "مشروع التخرج", weight: 2 },
            { name: "النشاط", weight: 1 },
            { name: "السلوك", weight: 1 },
            { name: "المواظبة", weight: 5 }
        ]
    },

    shar: {
        first: [
            { name: "القران الكريم", weight: 5 },
            { name: "اللغة الانجليزية", weight: 4 },
            { name: "التفسير", weight: 2 },
            { name: "الفقه 1", weight: 2 },
            { name: "مصطلح الحديث", weight: 2 },
            { name: "الدراسات الادبية", weight: 2 },
            { name: "مبادئ القانون", weight: 3 },
            { name: "المواطنة الرقمية", weight: 2 },
            { name: "الجغرافيا", weight: 2 },
            { name: "المهارات الحياتية", weight: 2 },
            { name: "التربية الصحية والبدنية", weight: 3 },
            { name: "البحث ومصادر المعلومات", weight: 2 },
            { name: "النشاط", weight: 1 },
            { name: "السلوك", weight: 1 },
            { name: "المواظبة", weight: 5 }
        ],
        second: [
            { name: "القران الكريم", weight: 5 },
            { name: "اللغة الانجليزية", weight: 4 },
            { name: "الفقه 2", weight: 4 },
            { name: "اصول الفقه", weight: 2 },
            { name: "الفرائض", weight: 2 },
            { name: "الدراسات النفسية والاجتماعية", weight: 2 },
            { name: "الدراسات البلاغية والنقدية", weight: 3 },
            { name: "مبادئ القانون", weight: 4 },
            { name: "تطبيقات في القانون", weight: 2 },
            { name: "مشروع التخرج", weight: 2 },
            { name: "النشاط", weight: 2 },
            { name: "السلوك", weight: 1 },
            { name: "المواظبة", weight: 5 }
        ]
    }
};

export default function Grade() {
    const grade = 12;

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
        initialPathway: fallbackInitialPathway,
    });

    const hasPathways = Boolean(availablePathways && availablePathways.length > 0);

    useEffect(() => {
        if (hasPathways && !pathway) {
            setPathway(availablePathways[0]);
        }
    }, [availablePathways, hasPathways, pathway, setPathway]);

    const subjects = currentSubjects ?? [];
    const filledCount = subjects.filter(
        (s) => tempGrades[s.name] !== undefined && tempGrades[s.name] !== ""
    ).length;
    const totalCount = subjects.length;
    const allFilled = filledCount === totalCount;
    const progressPct = totalCount > 0 ? Math.round((filledCount / totalCount) * 100) : 0;

    return (
        <>
            <BreadcrumbSchema grade={grade as unknown as Grade} />

            <main className="container mx-auto px-4 py-8 pb-36" dir="rtl">
                <section className="mx-auto max-w-4xl rounded-2xl border border-black/10 bg-gradient-to-b from-white to-gray-50 p-5 sm:p-8 shadow-lg">
                    <BackButton />

                    {/* ── Header ── */}
                    <div className="mb-5 mt-1">
                        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                            ثالث ثانوي — حاسبة معدلي
                        </h1>
                        <p className="mt-1.5 text-sm text-gray-500">
                            أدخل درجاتك واحصل على معدلك وفق طريقة حساب وزارة التعليم •{" "}
                            <strong className="text-gray-700">{readableTerm}</strong>
                        </p>
                    </div>

                    {/* ── Selectors ── */}
                    <section ref={headingRef} className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {hasPathways && (
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">المسار</label>
                                <div className="relative">
                                    <select
                                        value={pathway ?? ""}
                                        onChange={(e) => setPathway(e.target.value as PathwaySystem)}
                                        className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm transition focus:border-[#33365B] focus:ring-2 focus:ring-[#33365B]/20 outline-none"
                                    >
                                        {availablePathways.map((p) => (
                                            <option key={p} value={p}>
                                                {PATHWAY_LABELS[p as PathwaySystem]}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▼</span>
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">الفصل الدراسي</label>
                            <div className="relative">
                                <select
                                    value={term}
                                    onChange={(e) => setTerm(e.target.value as Term)}
                                    disabled={loading}
                                    aria-busy={loading}
                                    className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm transition focus:border-[#33365B] focus:ring-2 focus:ring-[#33365B]/20 outline-none"
                                >
                                    <option value="first">الفصل الدراسي الأول</option>
                                    <option value="second">الفصل الدراسي الثاني</option>
                                </select>
                                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▼</span>
                            </div>
                        </div>
                    </section>

                    {/* ── Progress Bar ── */}
                    {!loading && !showResult && (
                        <div className="mb-5">
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-xs text-gray-400">{filledCount} من {totalCount} مادة</span>
                                <span className="text-xs font-medium text-[#33365B]">{progressPct}%</span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-[#33365B] transition-all duration-300"
                                    style={{ width: `${progressPct}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* ── Loading Skeleton ── */}
                    {loading ? (
                        <section className="space-y-6" aria-hidden>
                            <h2 className="text-base font-semibold text-gray-800">المواد الدراسية</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                        <section className="space-y-5">
                            <h2 className="text-base font-semibold text-gray-800">المواد الدراسية</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {subjects.map((subject, idx) => {
                                    const hasValue = tempGrades[subject.name] !== undefined && tempGrades[subject.name] !== "";
                                    const hasError = Boolean(errors[subject.name]);

                                    return (
                                        <div
                                            key={subject.name}
                                            className={`
                                                rounded-xl border p-4 bg-white transition-all duration-200
                                                ${hasError
                                                    ? "border-red-300 bg-red-50/30"
                                                    : hasValue
                                                    ? "border-[#33365B]/20 bg-[#f8f9ff]"
                                                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                                                }
                                            `}
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <div className="flex items-center gap-2.5 min-w-0">
                                                    <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-[#33365B] transition-colors ${hasValue ? "bg-[#33365B]/10" : "bg-gray-100"}`}>
                                                        <SubjectIcon index={idx} />
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-800 leading-snug">{subject.name}</span>
                                                </div>

                                                <div className="flex-shrink-0 flex flex-col items-end gap-1">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-xs text-gray-400">/100</span>
                                                        <input
                                                            data-subject={subject.name}
                                                            type="text"
                                                            inputMode="decimal"
                                                            min={0}
                                                            max={100}
                                                            aria-invalid={hasError}
                                                            placeholder="—"
                                                            value={tempGrades[subject.name] ?? ""}
                                                            onChange={(e) => handleInputChange(subject.name, e.target.value)}
                                                            className={`
                                                                w-20 rounded-lg border px-3 py-2 text-sm text-center
                                                                outline-none transition-all
                                                                focus:ring-2 focus:ring-[#33365B]/20
                                                                ${hasError
                                                                    ? "border-red-400 bg-red-50 text-red-700 focus:border-red-400"
                                                                    : hasValue
                                                                    ? "border-[#33365B]/30 bg-white text-gray-900 focus:border-[#33365B]"
                                                                    : "border-gray-300 bg-white text-gray-900 focus:border-[#33365B]"
                                                                }
                                                            `}
                                                        />
                                                    </div>
                                                    {hasError && (
                                                        <p className="text-[11px] text-red-500 text-right max-w-[90px]">
                                                            {errors[subject.name]}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {calculationResult && (
                                <Result
                                    calculationResult={calculationResult}
                                    onReset={() => setCalculationResult(null)}
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

            {/* ── Fixed Calculate Button ── */}
            {!showResult && !loading && (
                <div
                    className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-gray-100 px-4 pt-3 pb-4"
                    style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)" }}
                >
                    <div className="mx-auto max-w-[420px]">
                        <button
                            onClick={onCalculate}
                            disabled={anyErrors || filledCount === 0}
                            className={`
                                relative flex w-full items-center justify-center gap-2
                                rounded-2xl px-4 py-3.5 text-sm font-semibold text-white
                                transition-all active:scale-[0.98]
                                ${anyErrors || filledCount === 0
                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    : "bg-[#0f172a] shadow-xl hover:brightness-[1.05] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0f172a]/40"
                                }
                            `}
                        >
                            {!anyErrors && allFilled && (
                                <span aria-hidden className="absolute right-4 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[#f59e0b] animate-pulse" />
                            )}
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
                                <rect x="4" y="2" width="16" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
                                <rect x="7" y="5" width="10" height="4" rx="1" fill="currentColor" opacity="0.2" />
                                <path d="M8 12h2M12 12h2M16 12h0M8 16h2M12 16h2M16 16h0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            {filledCount === 0
                                ? "أدخل درجاتك أولاً"
                                : !allFilled
                                ? `احسب المعدل — ${filledCount}/${totalCount} مادة`
                                : "احسب المعدل"}
                        </button>

                        {filledCount > 0 && !allFilled && !anyErrors && (
                            <p className="mt-2 text-center text-xs text-gray-400">
                                يمكنك الحساب الآن أو إكمال باقي المواد
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
