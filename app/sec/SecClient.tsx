"use client";

import Link from "next/link";
import BackButton from "@/components/BackButton";
import { Faq } from "@/components/Faq";

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        itemListElement: [
                            {
                                "@type": "ListItem",
                                position: 1,
                                name: "الرئيسية",
                                item: "https://mo3dly.github.io",
                            },
                            {
                                "@type": "ListItem",
                                position: 2,
                                name: "المرحلة الثانوية",
                                item: "https://mo3dly.github.io/sec",
                            },
                        ],
                    }),
                }}
            />

            <main className="container mx-auto px-4 py-8">
                <section className="mx-auto max-w-3xl rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
                    <BackButton />

                    <section className="mb-8 text-right">
                        <h2
                            id="start"
                            className="text-xl font-bold text-gray-800 sm:text-2xl"
                        >
                            الصف الدراسي
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            اختر صفك الدراسي لحساب المعدل وفق نظام وزارة التعليم
                        </p>
                    </section>

                    <section className="mb-10">
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                            <Link
                                href="/grades/10"
                                className="flex items-center justify-center rounded-xl border border-black/10 bg-gray-50 p-4 sm:p-6 text-center transition hover:bg-gray-100 hover:shadow">
                                <h3 className="text-lg font-semibold text-gray-700">
                                    الاول ثانوي
                                </h3>
                            </Link>

                            <Link
                                href="/grades/11"
                                className="flex items-center justify-center rounded-xl border border-black/10 bg-gray-50 p-4 sm:p-6 text-center transition hover:bg-gray-100 hover:shadow">
                                <h3 className="text-lg font-semibold text-gray-700">
                                    الثاني ثانوي
                                </h3>
                            </Link>

                            <Link
                                href="/grades/12"
                                className="flex items-center justify-center rounded-xl border border-black/10 bg-gray-50 p-4 sm:p-6 text-center transition hover:bg-gray-100 hover:shadow">
                                <h3 className="text-lg font-semibold text-gray-700">
                                    الثالث ثانوي
                                </h3>
                            </Link>
                        </div>
                    </section>

                    <section>
                        <div className="my-12 flex items-center gap-4">
                            <div className="h-px flex-1 bg-gray-200" />
                            <span className="text-sm text-gray-400">الأسئلة الشائعة</span>
                            <div className="h-px flex-1 bg-gray-200" />
                        </div>

                        <Faq>
                            <Faq.Item index={0}>
                                {(open, toggle) => (
                                    <>
                                        <Faq.Question isOpen={open} onClick={toggle}>
                                            كيف يتم حساب المعدل للمرحلة الثانوية؟
                                        </Faq.Question>
                                        <Faq.Answer isOpen={open}>
                                            تقوم وزارة التعليم بحساب المعدل للمرحلة الثانوية عن طريق ضرب درجة كل مادة في عدد حصصها الأسبوعية، ثم جمع نواتج الضرب لجميع المواد. بعد ذلك يُقسَم المجموع على إجمالي عدد الحصص الأسبوعية
                                            فسوينا حاسبة معدلي عشان تختصر عليك هذي الحسابات وتغنيك عن كل هالدوخة 😉
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
                                            نعم، يدعم موقع معدلي مسارات الثانوية الخمس جميعها
                                            (المسار العام، الصحة والحياة، علوم الحاسب والهندسة،
                                            إدارة الأعمال، المسار الشرعي).
                                        </Faq.Answer>
                                    </>
                                )}
                            </Faq.Item>
                        </Faq>
                    </section>
                </section>
            </main>
        </>
    );
}