'use client';

import { Faq } from "@/components/Faq";
import BackButton from "@/components/BackButton";
import Script from "next/script";

export default function FAQ() {
    return (
        <>
            <Script
                id="faq-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "كيف يتم حساب المعدل؟",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "يتم احتساب المعدل وفق نظام وزارة التعليم من خلال ضرب درجة كل مادة في عدد حصصها الأسبوعية، ثم جمع نتائج جميع المواد، وبعد ذلك قسمة المجموع على إجمالي عدد الحصص الأسبوعية. ومن هنا جاءت حاسبة معدلي لتقوم بهذه العملية عنك بكل سهولة، وتوفّر عليك الوقت والجهد دون أي تعقيد."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "هل يدعم الموقع جميع مسارات المرحلة الثانوية؟",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "نعم، يدعم موقع معدلي مسارات الثانوية الخمس جميعها (المسار العام، الصحة والحياة، علوم الحاسب والهندسة، إدارة الأعمال، المسار الشرعي)."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "هل تدخل مادتي المواظبة والسلوك ضمن المعدل؟",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "نعم، بعد آخر تحديث لنظام احتساب المعدل من وزارة التعليم، أصبحت مادتا السلوك والمواظبة تُحتسبان ضمن المعدل؛ حيث يُحسب للسلوك وزن حصة أسبوعية واحدة، وللمواظبة وزن خمس حصص أسبوعية."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "هل تدخل مادة النشاط ضمن المعدل؟",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "نعم، إذا كانت مادة النشاط من ضمن مقررات الطالب، فإنها تُحتسب ضمن المعدل، ويختلف وزنها باختلاف الصف الدراسي والمرحلة."
                                }
                            }
                        ]
                    })
                }}
            />
            <main className="mx-auto max-w-5xl px-4 md:px-6 py-8" style={{ backgroundColor: '#f5f7fa', color: '#2c3e50' }}>
                <section className="mb-12 px-2">
                    <div
                        className="bg-white rounded-2xl shadow p-6 md:p-8"
                        style={{ border: "1px solid #e5e7eb" }}
                    >
                        <BackButton />
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
                                            يتم احتساب المعدل وفق نظام وزارة التعليم من خلال ضرب درجة كل مادة في عدد حصصها الأسبوعية، ثم جمع نتائج جميع المواد، وبعد ذلك قسمة المجموع على إجمالي عدد الحصص الأسبوعية.
                                            ومن هنا جاءت حاسبة معدلي لتقوم بهذه العملية عنك بكل سهولة، وتوفّر عليك الوقت والجهد دون أي تعقيد.
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
                                            هل تدخل المواظبة والسلوك ضمن المعدل؟
                                        </Faq.Question>
                                        <Faq.Answer isOpen={open}>
                                            نعم، بعد آخر تحديث لنظام احتساب المعدل من وزارة التعليم، أصبحت مادتا السلوك والمواظبة تُحتسبان ضمن المعدل؛ حيث يُحسب للسلوك وزن حصة أسبوعية واحدة، وللمواظبة وزن خمس حصص أسبوعية.
                                        </Faq.Answer>

                                    </>
                                )}
                            </Faq.Item>

                            <Faq.Item index={3}>
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
                        </Faq>
                    </div>
                </section>
            </main >
        </>
    )
}