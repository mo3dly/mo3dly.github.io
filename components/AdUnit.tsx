"use client";

import { useEffect, useRef } from "react";

declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
}

// A module-level guard also covers React Strict Mode and repeated effect
// execution for the same DOM node, not just re-renders of this component.
const processedAdElements = new WeakSet<HTMLModElement>();

type Props = {
    slot: string;
    format?: string;
    fullWidthResponsive?: boolean;
    layoutKey?: string;
    className?: string;
};

export default function AdUnit({
    slot,
    format = "auto",
    fullWidthResponsive = true,
    layoutKey,
    className = "",
}: Props) {
    const insRef = useRef<HTMLModElement>(null);
    const pushed = useRef(false);

    useEffect(() => {
        const element = insRef.current;
        if (!element || pushed.current || processedAdElements.has(element)) return;
        // AdSense marks an <ins> after processing it. Respect that marker so
        // React re-renders/Strict Mode cannot enqueue the same unit twice.
        if (element.getAttribute("data-adsbygoogle-status")) {
            pushed.current = true;
            return;
        }
        processedAdElements.add(element);
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            pushed.current = true;
        } catch (e) {
            processedAdElements.delete(element);
            console.error("AdSense push failed:", e);
        }
    }, []);

    return (
        <div className={`w-full max-w-full ${className}`} style={{ minWidth: 0 }}>
            <ins
                ref={insRef}
                className="adsbygoogle"
                style={{ display: "block", width: "100%" }}
                data-ad-client="ca-pub-4968434285942225"
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
                {...(layoutKey ? { "data-ad-layout-key": layoutKey } : {})}
            />
        </div>
    );
}
