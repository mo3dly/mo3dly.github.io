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

    const steps = [
        { number: 1, title: 'اختر مرحلتك الدراسية' },
        { number: 2, title: 'أدخل درجات المواد' },
        { number: 3, title: 'احصل على المعدل فوراً' },
    ];

    const features = [
        {
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16v16H4z" stroke="#33365B" strokeWidth="2" rx="2" />
                    <path d="M7 9h10M7 13h6" stroke="#33365B" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            title: 'مطابق لنظام وزارة التعليم',
            description: 'يُحسب المعدل وفق آلية وزارة التعليم مع دعم أوزان المواد والسلوك والمواظبة.',
        },
        {
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path d="M12 4v6" stroke="#33365B" strokeWidth="2" strokeLinecap="round" />
                    <path d="M6 14h12M6 14l-2 4M12 14v4M18 14l2 4" stroke="#33365B" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            title: 'جميع مسارات الثانوية',
            description: 'يشمل المسار العام، علوم الحاسب، الصحي، الشرعي، وإدارة الأعمال.',
        },
        {
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="#33365B" strokeWidth="2" />
                    <path d="M8 15l2-2 2 2 4-4" stroke="#33365B" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            title: 'مشاركة النتيجة كصورة',
            description: 'أنشئ صورة للمعدل وشاركها عبر واتساب ووسائل التواصل.',
        },
    ];

    const navCards = [
        {
            href: '/mid',
            label: 'المرحلة المتوسطة',
            sub: 'حساب المعدل للصف الاول متوسط حتى الثالث متوسط',
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
            sub: 'حساب المعدل للصف الاول ثانوي حتى الثالث ثانوي',
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3l9 5-9 5-9-5 9-5z" stroke="#33365B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 15c0 .8-.7 1.5-1.5 1.5H9.5C8.7 16.5 8 15.8 8 15v-3" stroke="#33365B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            href: '/calc/gpa',
            label: 'المعدل التراكمي',
            sub: 'حساب المعدل التراكمي للمرحلة الثانوية كاملة',
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
            sub: 'حساب النسبة الموزونة المطلوبة للقبول الجامعي مع دعم لاختبار ستيب',
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

            <main className="mx-auto max-w-2xl px-4 py-8" dir="rtl">

                {/* ── Hero ── */}
                <section className="mb-10 text-center">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
                        احسب معدلك الدراسي بدقة
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
                        اختر مرحلتك فقط — حاسبة معدلي تحسب لك المعدل وفق نظام وزارة التعليم في السعودية
                    </p>
                </section>

                {/* ── Nav Cards ── */}
                <section className="mb-10 flex flex-col gap-3">
                    {navCards.map((card) => (
                        <Link
                            key={card.href}
                            href={card.href}
                            className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                        >
                            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#33365B]/6">
                                {card.icon}
                            </div>
                            <div className="flex-1 text-right min-w-0">
                                <p className="text-sm font-semibold text-gray-900">{card.label}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
                            </div>
                            <svg className="w-4 h-4 text-gray-300 flex-shrink-0 rotate-180" viewBox="0 0 24 24" fill="none">
                                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    ))}
                </section>

                {/* ── Ad ── */}
                <div className="mb-10 w-full max-w-full overflow-hidden rounded-xl">
    <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client="ca-pub-4968434285942225"
        data-ad-slot="8269633566"
        data-ad-format="auto"
        data-full-width-responsive="true"
    />
    ...
</div>


                {/* ── How it works ── */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-gray-900 text-center mb-5">
                        كيف يعمل الموقع؟
                    </h2>
                    <div className="flex flex-col gap-3">
                        {steps.map((step, i) => (
                            <div key={step.number} className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white px-5 py-4">
                                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#33365B] text-white text-sm font-bold">
                                    {step.number}
                                </div>
                                <p className="text-sm font-medium text-gray-800">{step.title}</p>
                                {i < steps.length - 1 && (
                                    <div className="flex-1" />
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Features ── */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-gray-900 text-center mb-5">
                        مميزات معدلي
                    </h2>
                    <div className="flex flex-col gap-3">
                        {features.map((f, i) => (
                            <div key={i} className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white px-5 py-4">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#33365B]/6">
                                    {f.icon}
                                </div>
                                <div className="text-right min-w-0">
                                    <p className="text-sm font-semibold text-gray-900">{f.title}</p>
                                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{f.description}</p>
                                </div>
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
