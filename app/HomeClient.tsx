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
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16v16H4z" stroke="#33365B" strokeWidth="2" rx="2" />
                    <path d="M7 9h10M7 13h6" stroke="#33365B" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            title: 'مطابق لنظام التعليم',
            description: 'يُحسب المعدل وفق آلية وزارة التعليم مع أوزان المواد والسلوك والمواظبة.',
        },
        {
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path d="M12 4v6" stroke="#33365B" strokeWidth="2" strokeLinecap="round" />
                    <path d="M6 14h12M6 14l-2 4M12 14v4M18 14l2 4" stroke="#33365B" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            title: 'جميع مسارات الثانوية',
            description: 'العام، الصحي، الحاسب، الشرعي، وإدارة الأعمال كاملة.',
        },
        {
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="#33365B" strokeWidth="2" />
                    <path d="M8 15l2-2 2 2 4-4" stroke="#33365B" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            title: 'مشاركة سريعة',
            description: 'احفظ نتيجتك صورة وشاركها عبر واتساب والتواصل.',
        },
    ];

    const stageCards = [
        {
            href: '/mid',
            label: 'المرحلة المتوسطة',
            sub: 'الصف الأول حتى الثالث متوسط',
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path d="M3 5.5C3 4.67 3.67 4 4.5 4H19.5C20.33 4 21 4.67 21 5.5V18.5C21 19.33 20.33 20 19.5 20H4.5C3.67 20 3 19.33 3 18.5V5.5Z" stroke="#33365B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 8.5H17M7 11.5H13" stroke="#33365B" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
            ),
        },
        {
            href: '/sec',
            label: 'المرحلة الثانوية',
            sub: 'الصف الأول حتى الثالث ثانوي',
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
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
            description: 'احسب معدلك التراكمي للمرحلة الثانوية كاملة',
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path d="M5 4H19C20.1 4 21 4.9 21 6V18C21 19.1 20.1 20 19 20H5C3.9 20 3 19.1 3 18V6C3 4.9 3.9 4 5 4Z" stroke="#33365B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 8H17M7 12H11M14 12H17M9 16H15" stroke="#33365B" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
            ),
        },
        {
            href: '/calc/weighted',
            label: 'النسبة الموزونة',
            description: 'احسب نسبتك الموزونة للقبول الجامعي',
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
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

            <main className="w-full overflow-x-hidden px-3 sm:px-4 py-6 sm:py-10" dir="rtl">

                {/* ── Hero Section ── */}
                <section className="mb-12 text-center max-w-3xl mx-auto">
                    <div className="mb-6">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-3">
                            احسب معدلك بدقة
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                            موقع دقيق لحساب المعدل الدراسي وفق نظام وزارة التعليم، مع دعم حسابات القبول الجامعي
                        </p>
                    </div>
                </section>

                {/* ── GPA Calculator Tools Section ── */}
                <section className="mb-12">
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-5">
                            <h2 className="text-lg font-bold text-gray-900">أداة حساب المعدل</h2>
                            <p className="text-sm text-gray-500 mt-1">اختر مرحلتك الدراسية وابدأ حساب معدلك</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {stageCards.map((card) => (
                                <Link
                                    key={card.href}
                                    href={card.href}
                                    className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 hover:shadow-md transition-all duration-200"
                                >
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#33365B]/6 group-hover:bg-[#33365B]/10 transition-colors">
                                        {card.icon}
                                    </div>
                                    <div className="text-right flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900">{card.label}</p>
                                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{card.sub}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── College Admission Tools Section ── */}
                <section className="mb-12">
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-5">
                            <h2 className="text-lg font-bold text-gray-900">أدوات القبول الجامعي</h2>
                            <p className="text-sm text-gray-500 mt-1">حسابات إضافية لمساعدتك في رحلة القبول الجامعي</p>
                        </div>
                        <div className="rounded-2xl border border-[#33365B]/20 bg-gradient-to-br from-[#33365B]/5 to-white p-6 sm:p-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {calcCards.map((card) => (
                                    <Link
                                        key={card.href}
                                        href={card.href}
                                        className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 hover:shadow-md transition-all duration-200"
                                    >
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#33365B]/6 group-hover:bg-[#33365B]/10 transition-colors">
                                            {card.icon}
                                        </div>
                                        <div className="text-right flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-gray-900">{card.label}</p>
                                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{card.description}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Features Section ── */}
                <section className="mb-12">
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-6 text-center">
                            <h2 className="text-lg font-bold text-gray-900">لماذا معدلي؟</h2>
                            <p className="text-sm text-gray-500 mt-1">المميزات التي تجعل موقعنا الخيار الأفضل</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {features.map((f, i) => (
                                <div key={i} className="rounded-xl border border-gray-200 bg-white p-6 text-center hover:shadow-md transition-shadow">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#33365B]/6 mx-auto mb-4">
                                        {f.icon}
                                    </div>
                                    <p className="font-semibold text-gray-900 text-sm mb-2">{f.title}</p>
                                    <p className="text-xs text-gray-500 leading-relaxed">{f.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── FAQ Section ── */}
                <section className="mb-8 max-w-2xl mx-auto">
                    <div className="mb-6 text-center">
                        <h2 className="text-lg font-bold text-gray-900">الأسئلة الشائعة</h2>
                        <p className="text-sm text-gray-500 mt-1">إجابات على أكثر الأسئلة التي تصلنا</p>
                    </div>
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
