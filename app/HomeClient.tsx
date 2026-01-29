'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Faq } from "@/components/Faq";
import Script from "next/script";

const Divider = ({ label }: { label?: string }) => (
    <div className="my-12 flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200" />
        {label && (
            <span className="text-sm text-gray-400 whitespace-nowrap">
                {label}
            </span>
        )}
        <div className="h-px flex-1 bg-gray-200" />
    </div>
);

export default function Home() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isDialogOpen ? 'hidden' : 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isDialogOpen]);

    const steps = [
        { number: 1, title: 'اختر مرحلتك الدراسية', description: '' },
        { number: 2, title: 'أدخل درجات المواد', description: '' },
        { number: 3, title: 'احصل على المعدل', description: '' }
    ];

    const features = [
        {
            icon: (
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16v16H4z" stroke="#33365B" strokeWidth="2" rx="2" />
                    <path d="M7 9h10M7 13h6" stroke="#33365B" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            title: 'مطابق لنظام وزارة التعليم',
            description: 'يتم حساب المعدل وفق آلية وزارة التعليم في المملكة العربية السعودية، مع دعم أوزان المواد، السلوك، والمواظبة.'
        },
        {
            icon: (
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                    <path d="M12 4v6" stroke="#33365B" strokeWidth="2" strokeLinecap="round" />
                    <path d="M6 14h12" stroke="#33365B" strokeWidth="2" strokeLinecap="round" />
                    <path d="M6 14l-2 4M12 14v4M18 14l2 4" stroke="#33365B" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            title: 'دعم جميع مسارات المرحلة الثانوية',
            description: 'يشمل المسار العام، مسار علوم الحاسب والهندسة، المسار الصحي، والمسار الشرعي، مسار ادارة الاعمال.'
        },
        {
            icon: (
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="#33365B" strokeWidth="2" />
                    <path d="M8 15l2-2 2 2 4-4" stroke="#33365B" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            title: 'مشاركة المعدل عبر الصور',
            description: 'إنشاء صورة تلقائية لنتيجة المعدل قابلة للمشاركة عبر واتساب ووسائل التواصل الاجتماعي.'
        }
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
                        "mainEntity": {
                            "@type": "SiteNavigationElement",
                            "name": "التنقل الرئيسي",
                            "hasPart": [
                                {
                                    "@type": "WebPage",
                                    "name": "أول متوسط",
                                    "url": "https://mo3dly.github.io/grades/7"
                                },
                                {
                                    "@type": "WebPage",
                                    "name": "ثاني متوسط",
                                    "url": "https://mo3dly.github.io/grades/8"
                                },
                                {
                                    "@type": "WebPage",
                                    "name": "ثالث متوسط",
                                    "url": "https://mo3dly.github.io/grades/9"
                                },
                                {
                                    "@type": "WebPage",
                                    "name": "أول ثانوي",
                                    "url": "https://mo3dly.github.io/grades/10"
                                },
                                {
                                    "@type": "WebPage",
                                    "name": "ثاني ثانوي",
                                    "url": "https://mo3dly.github.io/grades/11"
                                },
                                {
                                    "@type": "WebPage",
                                    "name": "ثالث ثانوي",
                                    "url": "https://mo3dly.github.io/grades/12"
                                }
                            ]
                        }


                    }),
                }}
            />

            <main className="mx-auto max-w-5xl px-4 md:px-6 py-8" style={{ backgroundColor: '#ffffff', color: '#2c3e50' }}>
                <section className="mb-12 px-2">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 text-center" style={{ border: '1px solid #e5e7eb' }}>
                            <div className="mb-6">
                                <h2 className="text-xl md:text-2xl font-bold mb-3" style={{ color: '#33365B' }}>
                                    احسب معدلك الدراسي بدقة مع حاسبة معدلي
                                </h2>
                                <p className="text-base md:text-lg mb-6" style={{ color: '#6c757d' }}>
                                    اختر مرحلتك فقط، ودع حاسبة معدلي تحسب لك معدلك الدراسي بدقة للمرحلتين المتوسطة والثانوية حسب نظام وزارة التعليم في السعودية.
                                </p>
                            </div>
                            <div className="flex flex-col items-center gap-4">
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link
                                        href="/mid"
                                        aria-label="المرحلة المتوسطة"
                                        title="المرحلة المتوسطة"
                                        className="w-full sm:w-56 inline-flex items-center justify-center gap-3 px-6 py-3 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transform transition duration-200 hover:-translate-y-1 text-sm font-semibold text-gray-800"
                                    >
                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                            <path d="M3 5.5C3 4.67 3.67 4 4.5 4H19.5C20.33 4 21 4.67 21 5.5V18.5C21 19.33 20.33 20 19.5 20H4.5C3.67 20 3 19.33 3 18.5V5.5Z" stroke="#33365B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M7 8.5H17" stroke="#33365B" strokeWidth="1.6" strokeLinecap="round" />
                                            <path d="M7 11.5H13" stroke="#33365B" strokeWidth="1.6" strokeLinecap="round" />
                                            <path d="M14.5 14.5l4-4" stroke="#33365B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M18 13l1 1l-1 1l-1-1 1-1z" stroke="#33365B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                        <span>المرحلة المتوسطة</span>
                                    </Link>

                                    <Link
                                        href="/sec"
                                        aria-label="المرحلة الثانوية"
                                        title="المرحلة الثانوية"
                                        className="w-full sm:w-56 inline-flex items-center justify-center gap-3 px-6 py-3 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transform transition duration-200 hover:-translate-y-1 text-sm font-semibold text-gray-800"
                                    >
                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                            <path d="M12 3l9 5-9 5-9-5 9-5z" stroke="#33365B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 8v5" stroke="#33365B" strokeWidth="1.6" strokeLinecap="round" />
                                            <path d="M12 13l2 2" stroke="#33365B" strokeWidth="1.6" strokeLinecap="round" />
                                            <path d="M16 15c0 .8-.7 1.5-1.5 1.5H9.5C8.7 16.5 8 15.8 8 15v-1.5" stroke="#33365B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                            <circle cx="17.5" cy="16.5" r="0.9" stroke="#33365B" strokeWidth="1.2" />
                                        </svg>

                                        <span>المرحلة الثانوية</span>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                <section className="mb-12 px-2">
                    <h2 className="text-xl md:text-2xl font-bold text-center mb-8" style={{ color: '#33365B' }}>
                        كيف يعمل موقع معدلي؟
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {steps.map((step) => (
                            <div key={step.number} className="relative">
                                <div className="bg-white rounded-xl p-6 text-center h-full" style={{ border: '1px solid #e5e7eb' }}>
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-lg font-bold" style={{ backgroundColor: '#33365B' }}>
                                        {step.number}
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2" style={{ color: '#33365B' }}>
                                        {step.title}
                                    </h3>
                                    <p style={{ color: '#6c757d' }}>
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-12 px-2">
                    <h2
                        className="text-xl md:text-2xl font-bold text-center mb-8"
                        style={{ color: "#33365B" }}
                    >
                        مميزات موقع معدلي
                    </h2>

                    <div className="flex justify-center">
                        <div className="inline-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl p-5 text-center hover:shadow-lg transition-shadow duration-300 w-64"
                                    style={{ border: "1px solid #e5e7eb" }}
                                >
                                    <div className="flex justify-center mb-3">
                                        {feature.icon}
                                    </div>

                                    <h3 className="text-lg font-semibold mb-2" style={{ color: "#33365B" }}>
                                        {feature.title}
                                    </h3>

                                    <p className="text-sm" style={{ color: "#6c757d" }}>
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mb-12 px-2">
                    <div className="bg-white rounded-2xl shadow p-6 md:p-8" style={{ border: "1px solid #e5e7eb" }}>
                        <h2 className="text-xl md:text-2xl font-bold text-center mb-8" style={{ color: "#33365B" }}>
                            الأسئلة الشائعة
                        </h2>
                        <Faq>
                            <Faq.Item index={0}>
                                {(open, toggle) => (
                                    <>
                                        <Faq.Question isOpen={open} onClick={toggle}>
                                            كيف يتم حساب المعدل؟
                                        </Faq.Question>
                                        <Faq.Answer isOpen={open}>
                                            يقوم موقع حاسبة معدلي بحساب المعدل بقسمة مجموع الدرجات الموزونة
                                            على إجمالي الحصص وفق النظام المعتمد من وزارة التعليم.
                                        </Faq.Answer>
                                    </>
                                )}
                            </Faq.Item>

                            <Faq.Item index={1}>
                                {(open, toggle) => (
                                    <>
                                        <Faq.Question isOpen={open} onClick={toggle}>
                                            هل يدعم الموقع جميع مسارات المرحلة الثانوية؟
                                        </Faq.Question>
                                        <Faq.Answer isOpen={open}>
                                            نعم، يدعم موقع حاسبة معدلي مسارات الثانوية الخمس جميعها
                                            (المسار العام، الصحة والحياة، علوم الحاسب والهندسة،
                                            إدارة الأعمال، المسار الشرعي).
                                        </Faq.Answer>
                                    </>
                                )}
                            </Faq.Item>

                            <Faq.Item index={2}>
                                {(open, toggle) => (
                                    <>
                                        <Faq.Question isOpen={open} onClick={toggle}>
                                            هل يتم احتساب مادة المواظبة ضمن المعدل؟
                                        </Faq.Question>
                                        <Faq.Answer isOpen={open}>
                                            نعم، يتم احتساب مادة المواظبة ضمن المعدل حسب الإجراءات التنفيذية للائحة تقويم الطالب المعتمدة من وزارة التعليم، ويكون وزنها (نصابها) خمس حصص أسبوعية.
                                        </Faq.Answer>

                                    </>
                                )}
                            </Faq.Item>
                        </Faq>
                    </div>
                </section>
                <style jsx global>{`
          body {
            background-color: #ffffff;
            color: #2c3e50;
          }

          ::-webkit-scrollbar {
            width: 8px;
          }

          ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb {
            background: #33365B;
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: #2a2d4a;
          }
        `}</style>
            </main>
        </>
    );
}