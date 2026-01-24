export type GradeLevel = 7 | 8 | 9 | 10 | 11 | 12;

export type Term = "first" | "second";

export type PathwaySystem =
    | "cy"
    | "gen"
    | "eng"    
    | "hlth"
    | "biz"
    | "shar";


export interface SubjectInput {
    name: string;
    weeklyUnits: number;
    gradeValue: number;
}

export interface SubjectResult {
    name: string;
    gradeValue: number;
    weightedGrade: number;
}

export interface GPAResult {
    gradeLevel: GradeLevel;
    term: Term;
    pathwaySystem: PathwaySystem | null;
    gpa: number;
    subjects: SubjectResult[];
}

export type Subject = {
    name: string;
    weight: number;
};

export type SubjectsType = {
    first: Subject[];
    second: Subject[];
};