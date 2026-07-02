"use client";

import Link from "next/link";
import BackButton from "@/components/BackButton";
import { Faq } from "@/components/Faq";
import Script from "next/script";

const grades = [
    { href: "/grades/10", label: "أول ثانوي", num: "١" },
    { href: "/grades/11", label: "ثاني ثانوي", num: "٢" },
    { href: "/grades/12", label: "ثالث ثانوي", num: "٣" },
];

export default function Page() {
    return (
        <>
            <Script
                async
                strategy="afterInteractive"
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4968434285942225"
                crossOrigin="anonymous"
            />
            <Script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        itemListElement: [
                            { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://mo3dly.github.io/" },
                            { "@type": "ListItem", position: 2, name: "المرحلة الثانوية", item: "https://mo3dly.github.io/sec" },
                        ],
                    }),
                }}
            />

            <main className="container mx-auto px-4 py-8" dir="rtl">
                <section className="mx-auto max-w-4xl rounded-2xl border border-black/10 bg-gradient-to-b from-white to-gray-50 p-5 sm:p-8 shadow-lg">
                    <BackButton />

                    {/* ── Header ── */}
                    <div className="mt-2 mb-6">
                        <h1 className="text-2xl font-extrabold text-gray-900">
                            المرحلة الثانوية
                        </h1>
                        <p className="mt-1.5 text-sm text-gray-500">
                            اختر صفك الدراسي لحساب المعدل وفق نظام وزارة التعليم
                        </p>
                    </div>

                    {/* ── Grade Cards ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                        {grades.map((g) => (
                            <Link
                                key={g.href}
                                href={g.href}
                                className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 sm:flex-col sm:items-center sm:text-center sm:py-6"
                            >
                                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#33365B] text-white text-lg font-bold">
                                    {g.num}
                                </div>
                                <div className="min-w-0 sm:mt-1">
                                    <p className="text-sm font-semibold text-gray-900">{g.label}</p>
                                </div>
                                <svg className="w-4 h-4 text-gray-300 flex-shrink-0 rotate-180 mr-auto sm:hidden" viewBox="0 0 24 24" fill="none">
                                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        ))}
                    </div>

                    {/* ── FAQ ── */}
                    <div className="border-t border-gray-100 pt-8">
                        <h2 className="text-base font-bold text-gray-900 text-center mb-5">الأسئلة الشائعة</h2>
                        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                            <Faq>
                                <Faq.Item index={0}>
                                    {(open, toggle) => (
                                        <>
                                            <Faq.Question isOpen={open} onClick={toggle}>
                                                كيف يتم حساب المعدل للمرحلة الثانوية؟
                                            </Faq.Question>
                                            <Faq.Answer isOpen={open}>
                                                تقوم وزارة التعليم بحساب المعدل للمرحلة الثانوية عن طريق ضرب درجة كل مادة في عدد حصصها الأسبوعية، ثم جمع نواتج الضرب لجميع المواد. بعد ذلك يُقسَم المجموع على إجمالي عدد الحصص الأسبوعية — وسوّينا حاسبة معدلي عشان تختصر عليك هذي الحسابات 😉
                                            </Faq.Answer>
                                        </>
                                    )}
                                </Faq.Item>
                                <Faq.Item index={1}>
                                    {(open, toggle) => (
                                        <>
                                            <Faq.Question isOpen={open} onClick={toggle}>
                                                هل تدخل المواظبة والسلوك ضمن المعدل؟
                                            </Faq.Question>
                                            <Faq.Answer isOpen={open}>
                                                نعم، بعد آخر تحديث لنظام احتساب المعدل من وزارة التعليم، أصبحت مادتا السلوك والمواظبة تُحتسبان ضمن المعدل؛ حيث يُحسب للسلوك وزن حصة أسبوعية واحدة، وللمواظبة وزن خمس حصص أسبوعية.
                                            </Faq.Answer>
                                        </>
                                    )}
                                </Faq.Item>
                                <Faq.Item index={2}>
                                    {(open, toggle) => (
                                        <>
                                            <Faq.Question isOpen={open} onClick={toggle}>
                                                هل تدخل مادة النشاط ضمن المعدل؟
                                            </Faq.Question>
                                            <Faq.Answer isOpen={open}>
                                                نعم، إذا كانت مادة النشاط من ضمن مقررات الطالب، فإنها تُحتسب ضمن المعدل، ويختلف وزنها باختلاف الصف الدراسي والمرحلة.
                                            </Faq.Answer>
                                        </>
                                    )}
                                </Faq.Item>
                                <Faq.Item index={3}>
                                    {(open, toggle) => (
                                        <>
                                            <Faq.Question isOpen={open} onClick={toggle}>
                                                هل يدعم الموقع جميع مسارات المرحلة الثانوية؟
                                            </Faq.Question>
                                            <Faq.Answer isOpen={open}>
                                                نعم، يدعم موقع معدلي مسارات الثانوية الخمس جميعها (المسار العام، الصحة والحياة، علوم الحاسب والهندسة، إدارة الأعمال، المسار الشرعي).
                                            </Faq.Answer>
                                        </>
                                    )}
                                </Faq.Item>
                            </Faq>
                        </div>
                    </div>

                </section>
            </main>
        </>
    );
}
