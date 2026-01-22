'use client';

import { Faq } from "@/components/Faq";
import BackButton from "@/components/BackButton";

export default function FAQ() {
    return (
        <>
            <head>
                <title>معدلي - الاسئلة الشائعة</title>
                <meta name="description" content="الاسئلة الشائعة عن موقع معدلي وطريقة حساب المعدل  " />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="canonical" href="https://mo3dly.github.io/faq/" />
            </head>
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
            </main >
        </>
    )
}