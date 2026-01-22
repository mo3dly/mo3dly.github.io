'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Faq } from "@/components/Faq";
import Script from "next/script";

export default function Home() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [showGradeDialog, setShowGradeDialog] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState<'middle' | 'secondary' | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const toggleFaq = (index: number) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const openGradeDialog = () => {
        setShowGradeDialog(true);
        setSelectedLevel(null);
        setIsDialogOpen(true);
    };

    const closeGradeDialog = () => {
        setShowGradeDialog(false);
        setIsDialogOpen(false);
    };

    const selectLevel = (level: 'middle' | 'secondary') => {
        setSelectedLevel(level);
    };

    useEffect(() => {
        if (isDialogOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isDialogOpen]);

    const middleGrades = [
        { name: 'أول متوسط', link: '/grades/7/' },
        { name: 'ثاني متوسط', link: '/grades/8/' },
        { name: 'ثالث متوسط', link: '/grades/9/' }
    ];

    const secondaryGrades = [
        { name: 'أول ثانوي', link: '/grades/10/' },
        { name: 'ثاني ثانوي', link: '/grades/11/' },
        { name: 'ثالث ثانوي', link: '/grades/12/' }
    ];

    const steps = [
        { number: 1, title: 'اختر مرحلتك الدراسية', description: '' },
        { number: 2, title: 'أدخل درجات المواد', description: '' },
        { number: 3, title: 'احصل على المعدل', description: '' }
    ];

    const features = [
        {
            icon: (
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 17L9 12" stroke="#33365B" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 17L12 7" stroke="#33365B" strokeWidth="2" strokeLinecap="round" />
                    <path d="M15 17L15 10" stroke="#33365B" strokeWidth="2" strokeLinecap="round" />
                    <path d="M18 17L18 13" stroke="#33365B" strokeWidth="2" strokeLinecap="round" />
                    <rect x="4" y="4" width="16" height="16" rx="2" stroke="#33365B" strokeWidth="2" />
                </svg>
            ),
            title: 'دقة حسابية',
            description: 'مطابق لنظام الوزارة'
        },
        {
            icon: (
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#33365B" strokeWidth="2" />
                    <path d="M12 6L12 12L16 14" stroke="#33365B" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            title: 'سرعة',
            description: 'نتائج فورية'
        },
        {
            icon: (
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#33365B" strokeWidth="2" />
                    <path d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19Z" stroke="#33365B" strokeWidth="2" />
                    <path d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z" stroke="#33365B" strokeWidth="2" />
                </svg>
            ),
            title: 'أمان',
            description: 'بياناتك محمية'
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
                        "@type": "WebSite",
                        name: "معدلي الدراسي",
                        url: "https://mo3dly.github.io/",
                        description:
                            "معدلي أول موقع دقيق لحساب المعدل الدراسي لطلاب المرحلتين المتوسطة والثانوية في السعودية وفق نظام وزارة التعليم.",

                        potentialAction: [
                            {
                                "@type": "SiteNavigationElement",
                                name: "أول متوسط",
                                url: "https://mo3dly.github.io/grades/7/",
                            },
                            {
                                "@type": "SiteNavigationElement",
                                name: "ثاني متوسط",
                                url: "https://mo3dly.github.io/grades/8/",
                            },
                            {
                                "@type": "SiteNavigationElement",
                                name: "ثالث متوسط",
                                url: "https://mo3dly.github.io/grades/9/",
                            },
                            {
                                "@type": "SiteNavigationElement",
                                name: "أول ثانوي",
                                url: "https://mo3dly.github.io/grades/10/",
                            },
                            {
                                "@type": "SiteNavigationElement",
                                name: "ثاني ثانوي",
                                url: "https://mo3dly.github.io/grades/11/",
                            },
                            {
                                "@type": "SiteNavigationElement",
                                name: "ثالث ثانوي",
                                url: "https://mo3dly.github.io/grades/12/",
                            },
                        ],

                        mainEntity: [
                            {
                                "@type": "Question",
                                name: "كيف يتم حساب المعدل؟",
                                acceptedAnswer: {
                                    "@type": "Answer",
                                    text:
                                        "يقوم موقع معدلي بحساب المعدل بقسمة مجموع الدرجات الموزونة على إجمالي الحصص وفق النظام المعتمد من وزارة التعليم.",
                                },
                            },
                            {
                                "@type": "Question",
                                name: "هل يدعم الموقع جميع مسارات المرحلة الثانوية؟",
                                acceptedAnswer: {
                                    "@type": "Answer",
                                    text:
                                        "نعم، يدعم موقع معدلي مسارات الثانوية الخمس جميعها بما فيها المسار العام، الصحة والحياة، علوم الحاسب والهندسة، إدارة الأعمال، والمسار الشرعي.",
                                },
                            },
                            {
                                "@type": "Question",
                                name: "هل الخدمة مجانية؟",
                                acceptedAnswer: {
                                    "@type": "Answer",
                                    text:
                                        "نعم، جميع خدمات موقع معدلي مجانية بالكامل ولا تتطلب أي رسوم.",
                                },
                            },
                            {
                                "@type": "Question",
                                name: "هل يتم حفظ بياناتي؟",
                                acceptedAnswer: {
                                    "@type": "Answer",
                                    text:
                                        "لا، لا يتم حفظ أي بيانات دراسية، وجميع العمليات تتم مباشرة على جهاز المستخدم.",
                                },
                            },
                        ],
                    }),
                }}
            />

            <main className="mx-auto max-w-5xl px-4 md:px-6 py-8" style={{
                backgroundColor: '#f5f7fa',
                color: '#2c3e50'
            }}>
                <div className="text-center mb-10">
                    <div className="mb-4">
                        <h1 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: '#33365B' }}>
                            مرحباً بك في موقع <span style={{ color: '#33365B' }}>معدلي</span>
                        </h1>
                        <p className="text-base md:text-lg" style={{ color: '#6c757d' }}>
                            اول موقع دقيق لحساب معدلك الدراسي للمرحلة المتوسطة والثانوية
                        </p>
                    </div>
                </div>

                <div className="mb-6">
                    <div className="ad-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    </div>
                </div>

                <section className="mb-12 px-2">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 text-center" style={{ border: '1px solid #e5e7eb' }}>
                            <div className="mb-6">
                                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(51, 54, 91, 0.1)' }}>
                                    <svg width="42" height="42" viewBox="0 0 200 280">
                                        <rect x="10" y="10" width="180" height="260" rx="10" fill="#33365B" />
                                        <rect x="20" y="20" width="160" height="50" rx="5" fill="#E8EAF6" />
                                        <rect x="20" y="85" width="35" height="35" rx="5" fill="#C5CAE9" />
                                        <rect x="65" y="85" width="35" height="35" rx="5" fill="#C5CAE9" />
                                        <rect x="110" y="85" width="35" height="35" rx="5" fill="#C5CAE9" />
                                        <rect x="155" y="85" width="35" height="35" rx="5" fill="#7986CB" />
                                        <rect x="20" y="130" width="35" height="35" rx="5" fill="#E8EAF6" />
                                        <rect x="65" y="130" width="35" height="35" rx="5" fill="#E8EAF6" />
                                        <rect x="110" y="130" width="35" height="35" rx="5" fill="#E8EAF6" />
                                        <rect x="155" y="130" width="35" height="35" rx="5" fill="#7986CB" />
                                        <rect x="20" y="175" width="35" height="35" rx="5" fill="#E8EAF6" />
                                        <rect x="65" y="175" width="35" height="35" rx="5" fill="#E8EAF6" />
                                        <rect x="110" y="175" width="35" height="35" rx="5" fill="#E8EAF6" />
                                        <rect x="155" y="175" width="35" height="35" rx="5" fill="#7986CB" />
                                        <rect x="20" y="220" width="35" height="35" rx="5" fill="#E8EAF6" />
                                        <rect x="65" y="220" width="35" height="35" rx="5" fill="#E8EAF6" />
                                        <rect x="110" y="220" width="35" height="35" rx="5" fill="#E8EAF6" />
                                        <rect x="155" y="220" width="35" height="35" rx="5" fill="#7986CB" />
                                    </svg>
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold mb-3" style={{ color: '#33365B' }}>
                                    احسب معدلك الدراسي بدقة مع معدلي
                                </h2>
                                <p className="text-base md:text-lg mb-6" style={{ color: '#6c757d' }}>
                                    اختر صفك فقط، ودع معدلي يحسب معدلك الدراسي بدقة للمرحلتين المتوسطة والثانوية حسب نظام وزارة التعليم في السعودية.
                                </p>
                            </div>

                            <button
                                onClick={openGradeDialog}
                                className="w-full md:w-auto mx-auto px-8 py-4 rounded-xl font-bold text-lg text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group"
                                style={{
                                    backgroundColor: '#33365B',
                                    minWidth: '200px',
                                }}
                            >
                                <span>ابدأ حساب معدلك</span>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                >
                                    <path d="M13 5l7 7-7 7M5 12h14" />
                                </svg>
                            </button>

                        </div>
                    </div>
                </section>

                <div className="mb-6">
                    <div className="ad-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    </div>
                </div>

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
                    <h2 className="text-xl md:text-2xl font-bold text-center mb-8" style={{ color: '#33365B' }}>
                        مميزات موقع معدلي
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white rounded-xl p-5 text-center hover:shadow-lg transition-shadow duration-300" style={{ border: '1px solid #e5e7eb' }}>
                                <div className="flex justify-center mb-3">{feature.icon}</div>
                                <h3 className="text-lg font-semibold mb-2" style={{ color: '#33365B' }}>
                                    {feature.title}
                                </h3>
                                <p className="text-sm" style={{ color: '#6c757d' }}>
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-12 px-2">
                    <div
                        className="bg-white rounded-2xl shadow p-6 md:p-8"
                        style={{ border: "1px solid #e5e7eb" }}
                    >
                        <h2
                            className="text-xl md:text-2xl font-bold text-center mb-8"
                            style={{ color: "#33365B" }}
                        >
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
                                            يقوم موقع معدلي بحساب المعدل بقسمة مجموع الدرجات الموزونة
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
                                            نعم، يدعم موقع معدلي مسارات الثانوية الخمس جميعها
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
                                            هل الخدمة مجانية؟
                                        </Faq.Question>
                                        <Faq.Answer isOpen={open}>
                                            نعم، جميع الخدمات مجانية بالكامل ولا تتطلب أي رسوم.
                                        </Faq.Answer>
                                    </>
                                )}
                            </Faq.Item>

                            <Faq.Item index={3}>
                                {(open, toggle) => (
                                    <>
                                        <Faq.Question isOpen={open} onClick={toggle}>
                                            هل يتم حفظ بياناتي؟
                                        </Faq.Question>
                                        <Faq.Answer isOpen={open}>
                                            لا، نحن لا نخزن أي بيانات دراسية، جميع العمليات
                                            تتم على جهازك مباشرة.
                                        </Faq.Answer>
                                    </>
                                )}
                            </Faq.Item>
                        </Faq>
                    </div>
                </section>

                <div className="mb-8">
                    <div className="ad-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    </div>
                </div>

                {showGradeDialog && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                        <div className="bg-white rounded-2xl max-w-md w-full" style={{ maxHeight: '90vh', overflowY: 'auto', border: '1px solid #e5e7eb' }}>

                            <div className="p-6 border-b" style={{ borderColor: '#e5e7eb' }}>
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold" style={{ color: '#33365B' }}>
                                        اختر مرحلتك الدراسية
                                    </h3>
                                    <button
                                        onClick={closeGradeDialog}
                                        className="text-gray-500 hover:text-gray-700"
                                        style={{ fontSize: '24px', lineHeight: '1' }}
                                    >
                                        ×
                                    </button>
                                </div>
                                <p className="mt-2" style={{ color: '#6c757d' }}>
                                    اختر المرحلة الدراسية ثم الصف المناسب لك
                                </p>
                            </div>

                            <div className="p-6">
                                {!selectedLevel ? (
                                    <div className="space-y-4">
                                        <button
                                            onClick={() => selectLevel('middle')}
                                            className="w-full p-4 rounded-xl border hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 text-right flex items-center justify-between"
                                            style={{ borderColor: '#e5e7eb' }}
                                        >
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 rounded-full flex items-center justify-center ml-4" style={{ backgroundColor: 'rgba(51, 54, 91, 0.1)' }}>
                                                    <span className="text-lg" style={{ color: '#33365B' }}>م</span>
                                                </div>
                                                <div className="text-right">
                                                    <h4 className="font-bold" style={{ color: '#33365B' }}>المرحلة المتوسطة</h4>
                                                </div>
                                            </div>
                                            <span style={{ color: '#6c757d' }}>→</span>
                                        </button>

                                        <button
                                            onClick={() => selectLevel('secondary')}
                                            className="w-full p-4 rounded-xl border hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 text-right flex items-center justify-between"
                                            style={{ borderColor: '#e5e7eb' }}
                                        >
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 rounded-full flex items-center justify-center ml-4" style={{ backgroundColor: 'rgba(51, 54, 91, 0.1)' }}>
                                                    <span className="text-lg" style={{ color: '#33365B' }}>ث</span>
                                                </div>
                                                <div className="text-right">
                                                    <h4 className="font-bold" style={{ color: '#33365B' }}>المرحلة الثانوية</h4>
                                                    <p className="text-sm" style={{ color: '#6c757d' }}>جميع مسارات الثانوية متوفرة</p>
                                                </div>
                                            </div>
                                            <span style={{ color: '#6c757d' }}>→</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <button
                                            onClick={() => setSelectedLevel(null)}
                                            className="mb-6 flex items-center text-sm hover:text-gray-700 transition-colors duration-200"
                                            style={{ color: '#6c757d' }}
                                        >
                                            <span className="ml-2">←</span>
                                            العودة للخيارات
                                        </button>

                                        <h4 className="font-bold mb-4" style={{ color: '#33365B' }}>
                                            {selectedLevel === 'middle' ? 'المرحلة المتوسطة' : 'المرحلة الثانوية'}
                                        </h4>

                                        <div className="space-y-3">
                                            {(selectedLevel === 'middle' ? middleGrades : secondaryGrades).map((grade, index) => (
                                                <Link href={grade.link} key={index} onClick={closeGradeDialog}>
                                                    <div className="p-4 rounded-lg border hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                                                        style={{ borderColor: '#e5e7eb' }}>
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center">
                                                                <div className="w-8 h-8 rounded-full flex items-center justify-center ml-3" style={{ backgroundColor: 'rgba(51, 54, 91, 0.1)' }}>
                                                                    <span className="text-sm font-bold" style={{ color: '#33365B' }}>
                                                                        {index + 1}
                                                                    </span>
                                                                </div>
                                                                <span className="font-semibold" style={{ color: '#33365B' }}>
                                                                    {grade.name}
                                                                </span>
                                                            </div>
                                                            <span style={{ color: '#6c757d' }}>
                                                                ←
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <style jsx global>{`
          body {
            background-color: #f5f7fa;
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