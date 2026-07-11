'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Faq } from "@/components/Faq";
import Script from "next/script";

export default function Home() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isDialogOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isDialogOpen]);

    const features = [
        {
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16v16H4z" stroke="#33365B" strokeWidth="2" rx="2" />
                    <path d="M7 9h10M7 13h6" stroke="#33365B" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            title: 'مطابق لنظام وزارة التعليم',
        },
        {
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M12 4v6" stroke="#33365B" strokeWidth="2" strokeLinecap="round" />
                    <path d="M6 14h12M6 14l-2 4M12 14v4M18 14l2 4" stroke="#33365B" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            title: 'يشمل جميع مسارات الثانوية',
        },
        {
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="#33365B" strokeWidth="2" />
                    <path d="M8 15l2-2 2 2 4-4" stroke="#33365B" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            title: 'مشاركة النتيجة كصورة',
        },
    ];

    const stageCards = [
        {
            href: '/mid',
            label: 'المرحلة المتوسطة',
            sub: 'الصف الأول متوسط حتى الثالث متوسط',
            icon: (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                    <path d="M3 5.5C3 4.67 3.67 4 4.5 4H19.5C20.33 4 21 4.67 21 5.5V18.5C21 19.33 20.33 20 19.5 20H4.5C3.67 20 3 19.33 3 18.5V5.5Z" stroke="#33365B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 8.5H17M7 11.5H13" stroke="#33365B" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
            ),
        },
        {
            href: '/sec',
            label: 'المرحلة الثانوية',
            sub: 'الصف الأول ثانوي حتى الثالث ثانوي',
            icon: (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3l9 5-9 5-9-5 9-5z" stroke="#33365B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 15c0 .8-.7 1.5-1.5 1.5H9.5C8.7 16.5 8 15.8 8 15v-3" stroke="#33365B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
    ];

    const calcCards = [
        {
            href: '/calc/gpa',
            label: 'المعدل التراكمي',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M5 4H19C20.1 4 21 4.9 21 6V18C21 19.1 20.1 20 19 20H5C3.9 20 3 19.1 3 18V6C3 4.9 3.9 4 5 4Z" stroke="#33365B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 8H17M7 12H11M14 12H17M9 16H15" stroke="#33365B" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
            ),
        },
        {
            href: '/calc/weighted',
            label: 'النسبة الموزونة',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L9 9H2l5.5 4-2 7L12 16l6.5 4-2-7L22 9h-7L12 2z" stroke="#33365B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
    ];

    return (
        <>
            <Script
                id="schema-website"
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "حاسبة معدلي - الصفحة الرئيسية",
                        "url": "https://mo3dly.github.io",
                        "inLanguage": "ar-SA",
                        "description": "معدلي أول موقع دقيق لحساب المعدل الدراسي لطلاب المرحلتين المتوسطة والثانوية في السعودية وفق نظام وزارة التعليم.",
                    }),
                }}
            />
            <Script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4968434285942225"
                crossOrigin="anonymous"
                strategy="afterInteractive"
            />

            <main className="w-full overflow-x-hidden px-3 sm:px-4 py-8" dir="rtl">

                {/* ── Hero ── */}
                <section className="mb-8 text-center">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
                        احسب معدلك الدراسي بدقة
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
                        اختر مرحلتك، أدخل درجاتك، واحصل على معدلك فوراً وفق نظام وزارة التعليم
                    </p>
                </section>

                {/* ── Stage Cards ── */}
                <section className="mb-4 grid grid-cols-2 gap-3">
                    {stageCards.map((card) => (
                        <Link
                            key={card.href}
                            href={card.href}
                            className="flex flex-col items-center text-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                        >
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#33365B]/6">
                                {card.icon}
                            </div>
                            <p className="text-sm font-bold text-gray-900">{card.label}</p>
                            <p className="text-xs text-gray-400 leading-relaxed">{card.sub}</p>
                        </Link>
                    ))}
                </section>

                {/* ── Calc Cards ── */}
                <section className="mb-10 grid grid-cols-2 gap-3">
                    {calcCards.map((card) => (
                        <Link
                            key={card.href}
                            href={card.href}
                            className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 hover:shadow-sm transition-shadow duration-200"
                        >
                            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#33365B]/6">
                                {card.icon}
                            </div>
                            <p className="text-xs font-semibold text-gray-800">{card.label}</p>
                        </Link>
                    ))}
                </section>

                {/* ── Features ── */}
                <section className="mb-10">
                    <div className="rounded-2xl border border-gray-200 bg-white px-5 py-4 flex flex-col gap-3">
                        {features.map((f, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#33365B]/6">
                                    {f.icon}
                                </div>
                                <p className="text-xs font-medium text-gray-700">{f.title}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── FAQ ── */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-gray-900 text-center mb-5">
                        الأسئلة الشائعة
                    </h2>
                    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                        <Faq>
                            <Faq.Item index={0}>
                                {(open, toggle) => (
                                    <>
                                        <Faq.Question isOpen={open} onClick={toggle}>
                                            ماهو موقع حاسبة معدلي؟
                                        </Faq.Question>
                                        <Faq.Answer isOpen={open}>
                                            حاسبة معدلي هي خدمة إلكترونية لحساب المعدل الدراسي بدقة لطلاب المتوسطة والثانوية في السعودية وفق آلية وزارة التعليم.
                                        </Faq.Answer>
                                    </>
                                )}
                            </Faq.Item>
                            <Faq.Item index={1}>
                                {(open, toggle) => (
                                    <>
                                        <Faq.Question isOpen={open} onClick={toggle}>
                                            كيف يتم حساب المعدل؟
                                        </Faq.Question>
                                        <Faq.Answer isOpen={open}>
                                            يقوم موقع حاسبة معدلي بحساب المعدل بقسمة مجموع الدرجات الموزونة على إجمالي الحصص وفق النظام المعتمد من وزارة التعليم.
                                        </Faq.Answer>
                                    </>
                                )}
                            </Faq.Item>
                            <Faq.Item index={2}>
                                {(open, toggle) => (
                                    <>
                                        <Faq.Question isOpen={open} onClick={toggle}>
                                            هل يدعم الموقع جميع مسارات المرحلة الثانوية؟
                                        </Faq.Question>
                                        <Faq.Answer isOpen={open}>
                                            نعم، يدعم موقع حاسبة معدلي مسارات الثانوية الخمس جميعها (المسار العام، الصحة والحياة، علوم الحاسب والهندسة، إدارة الأعمال، المسار الشرعي).
                                        </Faq.Answer>
                                    </>
                                )}
                            </Faq.Item>
                            <Faq.Item index={3}>
                                {(open, toggle) => (
                                    <>
                                        <Faq.Question isOpen={open} onClick={toggle}>
                                            هل يتم احتساب مادة المواظبة ضمن المعدل؟
                                        </Faq.Question>
                                        <Faq.Answer isOpen={open}>
                                            نعم، يتم احتساب مادة المواظبة ضمن المعدل حسب الإجراءات التنفيذية للائحة تقويم الطالب المعتمدة من وزارة التعليم، ويكون وزنها خمس حصص أسبوعية.
                                        </Faq.Answer>
                                    </>
                                )}
                            </Faq.Item>
                        </Faq>
                    </div>
                </section>

            </main>
        </>
    );
}
