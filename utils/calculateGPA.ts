import type {
    GradeLevel,
    Term,
    PathwaySystem,
    SubjectInput,
    GPAResult
} from "@/types/gpa";

export function calculateGPA(params: {
    gradeLevel: GradeLevel;
    term: Term;
    pathwaySystem?: PathwaySystem | null;
    subjects: SubjectInput[];
}): GPAResult {
    const {
        gradeLevel,
        term,
        pathwaySystem = null,
        subjects
    } = params;

    if (!term) {
        throw new Error("الفصل الدراسي لا يمكن أن يكون فارغ");
    }

    const requiresPathway = gradeLevel >= 10;

    if (requiresPathway && pathwaySystem === null) {
        throw new Error("pathway system مطلوب للصفوف 10 و11 و12");
    }

    if (!subjects.length) {
        throw new Error("يجب إدخال مادة واحدة على الأقل");
    }

    let totalWeightedGrades = 0;
    let totalWeeklyUnits = 0;

    const subjectResults = subjects.map((subject) => {
        const weightedGrade = subject.gradeValue * subject.weeklyUnits;

        totalWeightedGrades += weightedGrade;
        totalWeeklyUnits += subject.weeklyUnits;

        return {
            name: subject.name,
            gradeValue: subject.gradeValue,
            weightedGrade
        };
    });

    const rawGpa = totalWeightedGrades / totalWeeklyUnits;

    const gpa = Math.floor(rawGpa * 100) / 100;

    return {
        gradeLevel,
        term,
        pathwaySystem,
        gpa,
        subjects: subjectResults
    };
}