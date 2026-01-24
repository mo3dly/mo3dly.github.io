"use client";

import React, { useRef, useState } from "react";
import { GPAResult as CalculationResult } from "@/types/gpa";
import { snapdom } from "@zumer/snapdom";

type Props = {
    calculationResult: CalculationResult;
    onReset: () => void;
};

function getTermLabel(term: string | null | undefined) {
    if (!term) return "";
    const t = String(term).toLowerCase();
    if (t === "first") return "الفصل الدراسي الأول";
    if (t === "second") return "الفصل الدراسي الثاني";
    return term;
}

function getGradeLevelLabel(level: number | string | null | undefined) {
    if (level === 7 || String(level) === "7") return "الصف الأول متوسط";
    if (level === 8 || String(level) === "8") return "الصف الثاني متوسط";
    if (level === 9 || String(level) === "9") return "الصف الثالث متوسط";
    return level ? `الصف ${level}` : "";
}

function getGPARating(gpa: number) {
    if (gpa >= 90 && gpa <= 100) return "ممتاز";
    if (gpa >= 80 && gpa < 90) return "جيد جداً";
    if (gpa >= 70 && gpa < 80) return "جيد";
    if (gpa >= 50 && gpa < 70) return "مقبول";
    return "راسب";
}

export default function MidResult({ calculationResult, onReset }: Props) {
    const nodeRef = useRef<HTMLElement | null>(null);
    const subjectsRef = useRef<HTMLTableElement | null>(null);
    const logoImgRef = useRef<HTMLImageElement | null>(null);
    const [logoLoaded, setLogoLoaded] = useState(false);

    const termLabel = getTermLabel(calculationResult.term as unknown as string);
    const gradeLevelLabel = getGradeLevelLabel(calculationResult.gradeLevel as unknown as number);
    const ratingLabel = getGPARating(Number(calculationResult.gpa ?? 0));

    const loadImage = (src: string) =>
        new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = src;
            img.onload = () => resolve(img);
            img.onerror = reject;
        });

    const exportImage = async () => {
        const node = nodeRef.current;
        const subjectsTable = subjectsRef.current;
        const logoEl = logoImgRef.current;

        if (!node || !subjectsTable || !logoEl) return;

        const CSS_CONTENT_WIDTH = 900;
        const OUTPUT_PX_WIDTH = 2160;

        const originalWidth = node.style.width;
        try {
            subjectsTable.hidden = false;

            node.style.width = `${CSS_CONTENT_WIDTH}px`;

            await new Promise((r) => requestAnimationFrame(r));
            const nodeRect = node.getBoundingClientRect();
            const logoRect = logoEl.getBoundingClientRect();

            logoEl.style.visibility = "hidden";

            const scaleForSnap = OUTPUT_PX_WIDTH / nodeRect.width;

            const result = await snapdom.toPng(node, {
                scale: scaleForSnap,
                backgroundColor: "#ffffff",
            });

            if (!(result instanceof HTMLImageElement)) return;

            if (!result.complete) {
                await new Promise<void>((res) => (result.onload = () => res()));
            }

            const imgW = result.naturalWidth;
            const imgH = result.naturalHeight;

            const canvas = document.createElement("canvas");
            canvas.width = imgW;
            canvas.height = imgH;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(result, 0, 0, imgW, imgH);

            const domToImageScale = imgW / nodeRect.width;

            const lx = (logoRect.left - nodeRect.left) * domToImageScale;
            const ly = (logoRect.top - nodeRect.top) * domToImageScale;
            const lw = logoRect.width * domToImageScale;
            const lh = logoRect.height * domToImageScale;

            const logoImg = await loadImage("/icons/mo3dly.png");
            ctx.drawImage(logoImg, lx, ly, lw, lh);

            canvas.toBlob(async (blob) => {
                if (!blob) return;

                const file = new File(
                    [blob],
                    "mo3dly-image.png",
                    { type: "image/png" }
                );

                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    try {
                        await navigator.share({
                            title: "حاسبة معدلي الدراسي",
                            text: "احسب معدلك الدراسي للمرحلة المتوسطة والثانوية في السعودية بسهولة وبدقة 🎯\nوفق نظام وزارة التعليم\n🔗 https://mo3dly.github.io/\n",
                            files: [file],
                        });
                        return;
                    } catch (err) {
                        console.warn("Share cancelled", err);
                    }
                }
                
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = file.name;
                a.click();
                URL.revokeObjectURL(url);
            }, "image/png");
        } catch (e) {
            console.error("Export image failed:", e);
        } finally {
            node.style.width = originalWidth;
            logoEl.style.visibility = "visible";
        }
    };

    return (
        <div className="px-0 sm:px-0">
            <section
                ref={nodeRef as any}
                id="ForImageCapture"
                className="
                w-full
                bg-white
                px-3 py-4
                shadow-none
                border-0
                rounded-none

                sm:mx-auto
                sm:max-w-[720px]
                sm:mt-4
                sm:rounded-2xl
                sm:border sm:border-[#33365B]/10
                sm:bg-gradient-to-b sm:from-white sm:to-gray-50
                sm:shadow-lg
                "
                dir="rtl"
            >
                <div className="flex items-center gap-2 py-2 px-1">
                    <img
                        ref={logoImgRef}
                        src="/icons/mo3dly.webp"
                        alt="شعار معدلي"
                        width={42}
                        height={42}
                        loading="eager"
                        onLoad={() => setLogoLoaded(true)}
                        className="block h-10 w-10 rounded"
                        style={{ objectFit: 'cover' }}
                    />

                    <div className="flex-1 min-w-0">
                        <h1 className="text-base font-bold truncate">معدلي الدراسي</h1>
                        <p className="text-xs text-muted">ادق موقع لحساب المعدل وفق نظام وزارة التعليم</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-2 px-1">
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="text-sm text-gray-600">معدلك</div>
                            <div className="text-xl sm:text-2xl font-extrabold text-[#0f172a]">
                                {Number(calculationResult.gpa)}%
                            </div>
                            <div className="mt-1 text-sm text-gray-500">
                                {gradeLevelLabel} • {termLabel}
                            </div>
                        </div>
                    </div>

                    <div className="px-3 text-right">
                        <div className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-600">
                            <span>التقدير: </span>
                            <span className="font-bold text-[#0f172a]">{ratingLabel}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="mt-1 flex items-start gap-2 text-sm font-medium select-none">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#facc15">
                            <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.3L12 14.9 7.2 16.8l.9-5.3L4.2 7.7l5.4-.8L12 2z" />
                        </svg>
                        <div className="whitespace-normal break-words max-w-[280px] sm:max-w-none">
                            تحتاج تحسب معدلك؟ ابحث في قوقل عن <span className="font-medium">"معدلي الدراسي"</span>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-md border mt-3">
                        <table className="w-full table-auto text-right" id="subjectsTable" ref={subjectsRef}>
                            <thead>
                                <tr className="text-sm text-gray-600">
                                    <th className="px-3 py-2">المادة</th>
                                    <th className="px-3 py-2">درجة الطالب</th>
                                    <th className="px-3 py-2">النسبة الموزونة</th>
                                </tr>
                            </thead>
                            <tbody>
                                {calculationResult.subjects && calculationResult.subjects.length > 0 ? (
                                    calculationResult.subjects.map((s, idx) => (
                                        <tr key={`${s.name}-${idx}`} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                            <td className="px-3 py-2 text-sm">{s.name}</td>
                                            <td className="px-3 py-2 text-sm">{Number(s.gradeValue).toFixed(2)}</td>
                                            <td className="px-3 py-2 text-sm">{Number(s.weightedGrade).toFixed(2)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="px-3 py-4 text-sm text-gray-500 text-center">
                                            لا توجد مواد لعرضها
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-5 text-center text-[11px] text-black-400 select-none">
                        هذه الوثيقة ليست صادرة من نظام نور او اي جهة رسمية في المملكة العربية السعودية
                    </div>
                </div>
            </section>

            <div className="fixed bottom-4 left-1/2 z-50 w-[90%] max-w-[420px] -translate-x-1/2 sm:static sm:mt-4">
                <button
                    onClick={exportImage}
                    aria-label="مشاركة كصورة"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0f172a] px-4 py-3 text-sm font-medium text-white shadow hover:opacity-90 transition disabled:opacity-60"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a3.3 3.3 0 000-1.39l7-4.11A3 3 0 0018 7.91a3.09 3.09 0 10-3.09-3.09c0 .23.03.45.08.66l-7 4.11a3.09 3.09 0 100 4.41l7.05 4.15c-.05.2-.08.41-.08.63A3.09 3.09 0 1018 16.08z" />
                    </svg>
                    مشاركة كصورة
                </button>
                <button
                    onClick={onReset}
                    className="mt-3 flex w-full items-center justify-center gap-2
               rounded-xl border border-[#0f172a]
               bg-white px-4 py-3 text-sm font-medium
               text-[#0f172a] hover:bg-gray-50 transition"
                >
                    إعادة الحساب
                </button>
            </div>
        </div>
    );
}