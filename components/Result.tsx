"use client";

import React, { useRef, useState } from "react";
import { GPAResult as CalculationResult } from "@/types/gpa";
import { snapdom } from "@zumer/snapdom";
import DrawrProgressbar from "@/components/DrawrProgressbar";
import { getPathwayLabel, getTermLabel, getGradeLevelLabel, getGPARating } from "@/utils/labels";
import AdUnit from "@/components/AdUnit";

type Props = {
    calculationResult: CalculationResult;
    onReset: () => void;
};

export default function Result({ calculationResult, onReset }: Props) {
    const nodeRef = useRef<HTMLElement | null>(null);
    const subjectsRef = useRef<HTMLTableElement | null>(null);
    const visibleSubjectsRef = useRef<HTMLDivElement | null>(null);
    const logoImgRef = useRef<HTMLImageElement | null>(null);
    const [logoLoaded, setLogoLoaded] = useState(false);

    const termLabel = getTermLabel((calculationResult?.term as unknown as string) ?? "");
    const gradeLevelLabel = getGradeLevelLabel((calculationResult?.gradeLevel as unknown as number) ?? 0);
    const ratingLabel = getGPARating(
        Number(calculationResult?.gpa ?? 0),
        Number(calculationResult?.gradeLevel ?? 0)
    );
    const pathwayLabel = getPathwayLabel(
        (calculationResult?.pathwaySystem as unknown as string) ?? ""
    );

    const [isCapturing, setIsCapturing] = useState(false);

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

        setIsCapturing(true);

        const CSS_CONTENT_WIDTH = 900;
        const OUTPUT_PX_WIDTH = 2160;

        const originalWidth = node.style.width;
        try {
            subjectsTable.hidden = false;
            if (visibleSubjectsRef.current) visibleSubjectsRef.current.hidden = true;
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

                const file = new File([blob], "mo3dly-image.png", { type: "image/png" });

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
            subjectsRef.current!.hidden = true;
            if (visibleSubjectsRef.current) visibleSubjectsRef.current.hidden = false;
            setIsCapturing(false);
        }
    };

    if (!calculationResult) return null;

    return (
        /* pb-36 + extra bottom gap so fixed buttons never cover content */
        <div className="px-0 sm:px-0 pb-36">
            {isCapturing && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-3 rounded-2xl bg-white px-8 py-6 shadow-xl">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
                        <p className="text-sm font-semibold text-gray-700">جارٍ إنشاء الصورة…</p>
                    </div>
                </div>
            )}

            <section
                ref={nodeRef as any}
                id="ForImageCapture"
                className="
                    w-full bg-white px-3 py-4
                    shadow-none border-0 rounded-none
                    sm:mx-auto sm:max-w-[720px] sm:mt-4
                    sm:rounded-2xl sm:border sm:border-[#33365B]/10
                    sm:bg-gradient-to-b sm:from-white sm:to-gray-50 sm:shadow-lg
                "
                dir="rtl"
            >
                {/* ── Header ── */}
                <div className="flex items-center gap-3 py-2 px-1 mb-1">
                    <img
                        ref={logoImgRef}
                        src="/icons/mo3dly.webp"
                        alt="شعار معدلي"
                        width={44}
                        height={44}
                        loading="eager"
                        onLoad={() => setLogoLoaded(true)}
                        className="block h-11 w-11 rounded-xl"
                        style={{ objectFit: "cover" }}
                    />
                    <div className="flex-1 min-w-0">
                        <h1 className="text-base font-bold truncate text-gray-900">معدلي الدراسي</h1>
                        <p className="text-xs text-gray-400 mt-0.5">أدق موقع لحساب المعدل وفق نظام وزارة التعليم</p>
                    </div>
                </div>

                {/* ── GPA Hero Card ── */}
                <div className="mt-3 rounded-2xl bg-[#f8f9ff] border border-[#33365B]/8 px-4 py-5">
                    {/* Row: progressbar + GPA number */}
                    <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                            <DrawrProgressbar value={Number(calculationResult.gpa.toFixed(2))} size={100} />
                        </div>
                        <div className="flex-1 min-w-0 text-right">
                            <p className="text-xs text-gray-400 mb-1">معدلك الدراسي</p>
                            <div className="text-4xl font-extrabold text-[var(--primary)] leading-none tracking-tight">
                                {calculationResult.gpa.toFixed(2)}
                                <span className="text-xl font-bold text-gray-400 mr-1">%</span>
                            </div>
                        </div>
                    </div>

                    {/* Row: metadata tags */}
                    <div className="mt-4 flex flex-wrap gap-2 justify-end">
                        {gradeLevelLabel && (
                            <span className="rounded-lg bg-white border border-[#33365B]/10 px-3 py-1 text-xs text-gray-600 font-medium">
                                {gradeLevelLabel}
                            </span>
                        )}
                        {pathwayLabel && (
                            <span className="rounded-lg bg-white border border-[#33365B]/10 px-3 py-1 text-xs text-gray-600 font-medium">
                                {pathwayLabel}
                            </span>
                        )}
                        {termLabel && (
                            <span className="rounded-lg bg-white border border-[#33365B]/10 px-3 py-1 text-xs text-gray-600 font-medium">
                                {termLabel}
                            </span>
                        )}
                        <span className="rounded-lg bg-[#33365B] px-3 py-1 text-xs text-white font-semibold">
                            {ratingLabel}
                        </span>
                    </div>
                </div>

                {/* ── Subjects Table ── */}
                <div className="mt-5">
                    {/* SEO tip */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 px-1 select-none">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#facc15" className="flex-shrink-0">
                            <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.3L12 14.9 7.2 16.8l.9-5.3L4.2 7.7l5.4-.8L12 2z" />
                        </svg>
                        <span>
                            تحتاج تحسب معدلك؟ ابحث في قوقل عن:{" "}
                            <span className="font-semibold text-gray-700">"معدلي الدراسي"</span>
                        </span>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-gray-200">
                        <table
                            className="w-full table-auto text-right"
                            id="subjectsTable"
                            ref={subjectsRef}
                            hidden
                        >
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-3 py-2.5 text-xs font-semibold text-gray-500">المادة</th>
                                    <th className="px-3 py-2.5 text-xs font-semibold text-gray-500">الدرجة</th>
                                    <th className="px-3 py-2.5 text-xs font-semibold text-gray-500">الموزونة</th>
                                </tr>
                            </thead>
                            <tbody>
                                {calculationResult.subjects && calculationResult.subjects.length > 0 ? (
                                    calculationResult.subjects.map((s, idx) => (
                                        <tr
                                            key={`${s.name}-${idx}`}
                                            className={`border-b border-gray-100 last:border-0 ${
                                                idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                                            }`}
                                        >
                                            <td className="px-3 py-2.5 text-sm text-gray-800">{s.name}</td>
                                            <td className="px-3 py-2.5 text-sm font-medium text-gray-900">
                                                {Number(s.gradeValue).toFixed(2)}
                                            </td>
                                            <td className="px-3 py-2.5 text-sm font-medium text-[#33365B]">
                                                {Number(s.weightedGrade).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="px-3 py-6 text-sm text-gray-400 text-center">
                                            لا توجد مواد لعرضها
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <p className="mt-4 text-center text-[11px] text-gray-400 select-none px-2 leading-relaxed">
                        هذه الوثيقة ليست صادرة من نظام نور أو أي جهة رسمية في المملكة العربية السعودية
                    </p>
                </div>
            </section>
            
            <AdUnit slot="3746520262" />

            {/* ── Visible subjects summary (outside image capture) ── */}
            {calculationResult.subjects && calculationResult.subjects.length > 0 && (
                <div ref={visibleSubjectsRef} className="mt-4 sm:mx-auto sm:max-w-[720px]" dir="rtl">
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                        <table className="w-full table-auto text-right">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-3 py-2.5 text-xs font-semibold text-gray-500">المادة</th>
                                    <th className="px-3 py-2.5 text-xs font-semibold text-gray-500">الدرجة</th>
                                    <th className="px-3 py-2.5 text-xs font-semibold text-gray-500">الموزونة</th>
                                </tr>
                            </thead>
                            <tbody>
                                {calculationResult.subjects.map((s, idx) => (
                                    <tr
                                        key={`vis-${s.name}-${idx}`}
                                        className={`border-b border-gray-100 last:border-0 ${
                                            idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                                        }`}
                                    >
                                        <td className="px-3 py-2.5 text-sm text-gray-800">{s.name}</td>
                                        <td className="px-3 py-2.5 text-sm font-medium text-gray-900">{Number(s.gradeValue).toFixed(2)}</td>
                                        <td className="px-3 py-2.5 text-sm font-medium text-[#33365B]">{Number(s.weightedGrade).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ── Fixed Action Buttons ── */}
            <div
                className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-gray-100 px-4 pt-3 pb-4"
                style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)" }}
            >
                <div className="mx-auto max-w-[420px] flex flex-col gap-2.5">
                    <button
                        onClick={exportImage}
                        className="w-full rounded-xl bg-[#0f172a] px-4 py-3.5 text-sm font-semibold text-white flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                    >
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                        </svg>
                        مشاركة النتيجة كصورة
                    </button>
                    <button
                        onClick={onReset}
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-semibold text-gray-700 active:scale-[0.98] transition-transform"
                    >
                        احسب معدلاً جديداً
                    </button>
                </div>
            </div>
        </div>
    );
}
