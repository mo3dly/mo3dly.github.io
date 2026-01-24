import type { Term } from "@/types/term";

interface TermRange {
    start: Date;
    end: Date;
    term: Term;
}

const TERM_RANGES: TermRange[] = [
    { start: new Date(2025, 7, 31), end: new Date(2026, 0, 17), term: "first" },
    { start: new Date(2026, 0, 18), end: new Date(2026, 7, 22), term: "second" },

    { start: new Date(2026, 7, 23), end: new Date(2027, 0, 16), term: "first" },
    { start: new Date(2027, 0, 17), end: new Date(2027, 7, 21), term: "second" },

    { start: new Date(2027, 7, 22), end: new Date(2028, 0, 15), term: "first" },
    { start: new Date(2028, 0, 16), end: new Date(2028, 7, 19), term: "second" },

    { start: new Date(2028, 7, 20), end: new Date(2029, 0, 13), term: "first" },
    { start: new Date(2029, 0, 14), end: new Date(2029, 7, 18), term: "second" }
];

const getNowInRiyadh = (): Date => {
    return new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Riyadh" })
    );
};

export function getTerm(date: Date = getNowInRiyadh()): Term | null {
    const range = TERM_RANGES.find(
        ({ start, end }) => date >= start && date <= end
    );

    return range?.term ?? null;
}