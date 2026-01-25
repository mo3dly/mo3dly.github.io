import React, { useEffect, useRef, useState } from "react";
import { getTerm } from "@/utils/getTerm";
import { calculateGPA } from "@/utils/calculateGPA";
import type {
    GradeLevel,
    PathwaySystem,
    SubjectInput,
    GPAResult,
    SubjectsType,
    Term,
} from "@/types/gpa";


export function useGradePage({ Subjects, defaultGradeLevel, initialLoading = true }: { Subjects: SubjectsType; defaultGradeLevel: GradeLevel; initialLoading?: boolean; }) {
    const [term, setTerm] = useState<Term | "">("");
    const [subjectsInput, setSubjectsInput] = useState<SubjectInput[]>([]);
    const [loading, setLoading] = useState<boolean>(initialLoading);
    const [calculationResult, setCalculationResult] = useState<GPAResult | null>(null);
    const [tempGrades, setTempGrades] = useState<Record<string, string>>({});
    const [errors, setErrors] = useState<Record<string, string | null>>({});
    const [showResult, setShowResult] = useState(false);
    const headingRef = useRef<HTMLHeadingElement | null>(null);

    useEffect(() => {
        const detectedTerm = getTerm();
        const initialTerm = detectedTerm === "first" || detectedTerm === "second" ? detectedTerm : "first";
        setTerm(initialTerm as Term);
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!term) return;
        const initial: Record<string, string> = {};
        const initialErrors: Record<string, string | null> = {};
        Subjects[term].forEach((s) => {
            initial[s.name] = String(100);
            initialErrors[s.name] = null;
        });
        setTempGrades(initial);
        setErrors(initialErrors);
        setSubjectsInput([]);
        setCalculationResult(null);
    }, [term, Subjects]);

    useEffect(() => {
        if (showResult) {
            headingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [showResult]);

    const scrollToTop = () => {
        headingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const readableTerm = term === "second" ? "الفصل الدراسي الثاني" : "الفصل الدراسي الأول";

    const validateField = (name: string, value: string) => {
        if (value.trim() === "") return "لازم تدخل درجة";
        const num = Number(value);
        if (!Number.isFinite(num) || String(value).match(/[^0-9.\-]/)) return "يجب إدخال رقم صالح";
        if (num < 0 || num > 100) return "الدرجة لازم تكون بين 0 و 100";
        return null;
    };

    const handleInputChange = (name: string, value: string) => {
        setTempGrades(prev => ({ ...prev, [name]: value }));
        const err = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: err }));
    };

    const onCalculate = () => {
        if (!term) return;
        const newErrors: Record<string, string | null> = {};
        let hasError = false;
        Subjects[term].forEach((s) => {
            const val = tempGrades[s.name] ?? "";
            const err = validateField(s.name, val);
            newErrors[s.name] = err;
            if (err) hasError = true;
        });
        setErrors(newErrors);
        if (hasError) {
            const firstInvalid = Object.keys(newErrors).find(k => newErrors[k]);
            if (firstInvalid) {
                const el = document.querySelector(`input[data-subject="${CSS.escape(firstInvalid)}"]`) as HTMLInputElement | null;
                el?.focus();
            }
            return;
        }

        const built: SubjectInput[] = Subjects[term].map((s) => ({
            name: s.name,
            weeklyUnits: s.weight,
            gradeValue: Number(tempGrades[s.name] ?? 100)
        }));
        setSubjectsInput(built);

        try {
            const result = calculateGPA({
                gradeLevel: defaultGradeLevel,
                term: term as Term,
                pathwaySystem: null as PathwaySystem | null,
                subjects: built
            });
            setCalculationResult(result);
            setShowResult(true);
        } catch (e: any) {
            setCalculationResult(null);
            alert(e?.message ?? "حدث خطأ أثناء الحساب");
        }
    };

    const anyErrors = Object.values(errors).some(Boolean);

    return {
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
    } as const;
}