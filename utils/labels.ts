export function getPathwayLabel(pathway: string | null | undefined) {
  if (!pathway) return "";

  switch (pathway) {
    case "cy":
      return "السنة الأولى المشتركة";
    case "gen":
      return "المسار العام";
    case "eng":
      return "مسار علوم الحاسب والهندسة";
    case "hlth":
      return "مسار الصحة والحياة";
    case "biz":
      return "مسار إدارة الأعمال";
    case "shar":
      return "المسار الشرعي";
    default:
      return "";
  }
}

export function getTermLabel(term: string | null | undefined) {
    if (!term) return "";
    const t = String(term).toLowerCase();
    if (t === "first") return "الفصل الدراسي الأول";
    if (t === "second") return "الفصل الدراسي الثاني";
    return term;
}

export function getGradeLevelLabel(level: number | string | null | undefined) {
    if (level === 7 || String(level) === "7") return "الصف الأول متوسط";
    if (level === 8 || String(level) === "8") return "الصف الثاني متوسط";
    if (level === 9 || String(level) === "9") return "الصف الثالث متوسط";
    return level ? `الصف ${level}` : "";
}

export function getGPARating(gpa: number, gradeLevel: number) {
    if (gradeLevel === 7 || gradeLevel === 8 || gradeLevel === 9) {
        if (gpa >= 90 && gpa <= 100) return "ممتاز";
        if (gpa >= 80) return "جيد جداً";
        if (gpa >= 70) return "جيد";
        if (gpa >= 50) return "مقبول";
        return "راسب";
    }

    if (gradeLevel === 10 || gradeLevel === 11 || gradeLevel === 12) {
        if (gpa >= 95 && gpa <= 100) return "ممتاز مرتفع";
        if (gpa >= 90) return "ممتاز";
        if (gpa >= 85) return "جيد جداً مرتفع";
        if (gpa >= 80) return "جيد جداً";
        if (gpa >= 75) return "جيد مرتفع";
        if (gpa >= 70) return "جيد";
        if (gpa >= 65) return "مقبول مرتفع";
        if (gpa >= 60) return "مقبول";
        if (gpa >= 50) return "ضعيف";
        return "راسب";
    }

    return "";
}