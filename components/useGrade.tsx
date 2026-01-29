import React, { useEffect, useRef, useState } from "react";
import { getTerm } from "@/utils/getTerm";
import { calculateGPA } from "@/utils/calculateGPA";
import type {
    PathwaySystem,
    SubjectInput,
    GPAResult,
    SubjectsType,
    SecSubjectsType,
    Term,
} from "@/types/gpa";

type BaseUseGradePageArgs = {
    gradeLevel: 7 | 8 | 9 | 10 | 11 | 12;
    initialLoading?: boolean;
};

type SimpleSubjectsArgs = BaseUseGradePageArgs & {
    Subjects: SubjectsType;
    initialPathway?: never;
    hasPathways?: false | never;
};

type PathwaySubjectsArgs = BaseUseGradePageArgs & {
    Subjects: SecSubjectsType;
    initialPathway?: PathwaySystem | keyof SecSubjectsType | null;
    hasPathways: true;
};

type UseGradePageArgs = SimpleSubjectsArgs | PathwaySubjectsArgs;

export function useGradePage(args: SimpleSubjectsArgs): {
    readonly term: Term | "";
    readonly setTerm: React.Dispatch<React.SetStateAction<Term | "">>;
    readonly subjectsInput: SubjectInput[];
    readonly setSubjectsInput: React.Dispatch<React.SetStateAction<SubjectInput[]>>;
    readonly loading: boolean;
    readonly setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    readonly calculationResult: GPAResult | null;
    readonly setCalculationResult: React.Dispatch<React.SetStateAction<GPAResult | null>>;
    readonly tempGrades: Record<string, string>;
    readonly setTempGrades: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    readonly errors: Record<string, string | null>;
    readonly setErrors: React.Dispatch<React.SetStateAction<Record<string, string | null>>>;
    readonly showResult: boolean;
    readonly setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
    readonly headingRef: React.RefObject<HTMLHeadingElement | null>;
    readonly scrollToTop: () => void;
    readonly readableTerm: string;
    readonly validateField: (name: string, value: string) => string | null;
    readonly handleInputChange: (name: string, value: string) => void;
    readonly onCalculate: () => void;
    readonly anyErrors: boolean;
    readonly currentSubjects: { name: string; weight: number }[];
};

export function useGradePage(args: PathwaySubjectsArgs): {
    readonly term: Term | "";
    readonly setTerm: React.Dispatch<React.SetStateAction<Term | "">>;
    readonly subjectsInput: SubjectInput[];
    readonly setSubjectsInput: React.Dispatch<React.SetStateAction<SubjectInput[]>>;
    readonly loading: boolean;
    readonly setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    readonly calculationResult: GPAResult | null;
    readonly setCalculationResult: React.Dispatch<React.SetStateAction<GPAResult | null>>;
    readonly tempGrades: Record<string, string>;
    readonly setTempGrades: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    readonly errors: Record<string, string | null>;
    readonly setErrors: React.Dispatch<React.SetStateAction<Record<string, string | null>>>;
    readonly showResult: boolean;
    readonly setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
    readonly headingRef: React.RefObject<HTMLHeadingElement | null>;
    readonly scrollToTop: () => void;
    readonly readableTerm: string;
    readonly validateField: (name: string, value: string) => string | null;
    readonly handleInputChange: (name: string, value: string) => void;
    readonly onCalculate: () => void;
    readonly anyErrors: boolean;
    readonly currentSubjects: { name: string; weight: number }[];
    readonly pathway: PathwaySystem | string | null;
    readonly setPathway: React.Dispatch<React.SetStateAction<PathwaySystem | string | null>>;
    readonly availablePathways: string[];
};

export function useGradePage(args: any): any {
    const {
        Subjects,
        gradeLevel,
        initialLoading = true,
        hasPathways = false,
        initialPathway = null,
    } = args;

    const [term, setTerm] = useState<Term | "">("");
    const [pathway, setPathway] = useState<PathwaySystem | string | null>(initialPathway ?? null);
    const [subjectsInput, setSubjectsInput] = useState<SubjectInput[]>([]);
    const [loading, setLoading] = useState<boolean>(initialLoading);
    const [calculationResult, setCalculationResult] = useState<GPAResult | null>(null);
    const [tempGrades, setTempGrades] = useState<Record<string, string>>({});
    const [errors, setErrors] = useState<Record<string, string | null>>({});
    const [showResult, setShowResult] = useState(false);
    const headingRef = useRef<HTMLHeadingElement | null>(null);

    const availablePathways = hasPathways ? Object.keys(Subjects) : [];
    const resolvedPathway = hasPathways
        ? pathway ?? (availablePathways.length ? availablePathways[0] : null)
        : null;

    const currentSubjects = React.useMemo(() => {
        if (!term) return [];

        if (hasPathways) {
            if (!resolvedPathway) return [];
            const byPath = (Subjects as any)[resolvedPathway];
            if (!byPath) return [];
            return (byPath[term as Term] ?? []) as { name: string; weight: number }[];
        } else {
            return ((Subjects as SubjectsType)[term as Term] ?? []) as {
                name: string;
                weight: number;
            }[];
        }
    }, [Subjects, term, hasPathways, resolvedPathway]);

    useEffect(() => {
        const detectedTerm = getTerm();
        const initialTerm =
            detectedTerm === "first" || detectedTerm === "second" ? detectedTerm : "first";
        setTerm(initialTerm as Term);

        if (hasPathways && !pathway && availablePathways.length) {
            setPathway(availablePathways[0]);
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        if (!term) return;

        const initial: Record<string, string> = {};
        const initialErrors: Record<string, string | null> = {};

        currentSubjects.forEach((s) => {
            initial[s.name] = String(100);
            initialErrors[s.name] = null;
        });

        setTempGrades(initial);
        setErrors(initialErrors);
        setSubjectsInput([]);
        setCalculationResult(null);
        setShowResult(false);
    }, [term, resolvedPathway, Subjects, currentSubjects]);

    useEffect(() => {
        if (showResult) {
            headingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [showResult]);

    const scrollToTop = () => {
        headingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const readableTerm =
        term === "second" ? "الفصل الدراسي الثاني" : "الفصل الدراسي الأول";

    const validateField = (name: string, value: string) => {
        if (value.trim() === "") return "لازم تدخل درجة";
        const num = Number(value);
        if (!Number.isFinite(num) || String(value).match(/[^0-9.\-]/))
            return "يجب إدخال رقم صالح";
        if (num < 0 || num > 100) return "الدرجة لازم تكون بين 0 و 100";
        return null;
    };

    const handleInputChange = (name: string, value: string) => {
        setTempGrades((prev) => ({ ...prev, [name]: value }));
        const err = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: err }));
    };

    const onCalculate = () => {
        if (!term) return;
        if (hasPathways && !resolvedPathway) return;

        const newErrors: Record<string, string | null> = {};
        let hasError = false;

        currentSubjects.forEach((s) => {
            const val = tempGrades[s.name] ?? "";
            const err = validateField(s.name, val);
            newErrors[s.name] = err;
            if (err) hasError = true;
        });

        setErrors(newErrors);

        if (hasError) {
            const firstInvalid = Object.keys(newErrors).find((k) => newErrors[k]);
            if (firstInvalid) {
                const el = document.querySelector(
                    `input[data-subject="${CSS.escape(firstInvalid)}"]`
                ) as HTMLInputElement | null;
                el?.focus();
            }
            return;
        }

        const built: SubjectInput[] = currentSubjects.map((s) => ({
            name: s.name,
            weeklyUnits: s.weight,
            gradeValue: Number(tempGrades[s.name] ?? 100),
        }));

        setSubjectsInput(built);

        try {
            const result = calculateGPA({
                gradeLevel: gradeLevel,
                term: term as Term,
                pathwaySystem: (hasPathways ? resolvedPathway : null) as PathwaySystem | null,
                subjects: built,
            });
            setCalculationResult(result);
            setShowResult(true);
        } catch (e: any) {
            setCalculationResult(null);
            alert(e?.message ?? "حدث خطأ أثناء الحساب");
        }
    };

    const anyErrors = Object.values(errors).some(Boolean);

    const baseReturn = {
        term,
        setTerm,
        subjectsInput,
        setSubjectsInput,
        loading,
        setLoading,
        calculationResult,
        setCalculationResult,
        tempGrades,
        setTempGrades,
        errors,
        setErrors,
        showResult,
        setShowResult,
        headingRef,
        scrollToTop,
        readableTerm,
        validateField,
        handleInputChange,
        onCalculate,
        anyErrors,
        currentSubjects,
    };

    if (hasPathways) {
        return {
            ...baseReturn,
            pathway: resolvedPathway,
            setPathway,
            availablePathways,
        };
    }

    return baseReturn;
}