import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type Props = { value: number; size?: number };

export default function DrawrProgressbar({ value, size }: Props) {
    const percentage = Math.floor(value);
    const dim = size ?? 112;

    return (
        <div style={{ width: dim, height: dim }} className="flex items-center justify-center">
            <CircularProgressbar
                value={percentage}
                text={`${value.toFixed(2)}%`}
                strokeWidth={8}
                styles={buildStyles({
                    strokeLinecap: "butt",
                    pathColor: "var(--primary)",
                    trailColor: "rgba(51,54,91,0.12)",
                    textColor: "var(--primary)",
                    textSize: "14px",
                })}
            />
        </div>

    );
}