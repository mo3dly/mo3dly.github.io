"use client";

import { useEffect, useRef } from "react";

declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
}

type Props = {
    slot: string;
    format?: string;
    fullWidthResponsive?: boolean;
    className?: string;
};

export default function AdUnit({
    slot,
    format = "auto",
    fullWidthResponsive = true,
    className = "",
}: Props) {
    const insRef = useRef<HTMLModElement>(null);
    const pushed = useRef(false);

    useEffect(() => {
        if (pushed.current) return;
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            pushed.current = true;
        } catch (e) {
            console.error("AdSense push failed:", e);
        }
    }, []);

    return (
        <div className={`w-full overflow-hidden ${className}`}>
            <ins
                ref={insRef}
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-4968434285942225"
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
            />
        </div>
    );
}

