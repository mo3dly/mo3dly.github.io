const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileClose = document.getElementById('mobileClose');
if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', ()=>{ mobileNav.classList.add('open'); mobileNav.setAttribute('aria-hidden','false'); });
if (mobileClose) mobileClose.addEventListener('click', ()=>{ mobileNav.classList.remove('open'); mobileNav.setAttribute('aria-hidden','true'); });
mobileNav.addEventListener('click', (e)=>{ if (e.target === mobileNav) { mobileNav.classList.remove('open'); mobileNav.setAttribute('aria-hidden','true'); } });

function showSemesterToast(text) {
    const toast = document.getElementById("semester-toast");
    if (!toast) return;

    toast.textContent = text;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}


function loadSubjects(semester) {
    currentSemester = semester;

    const toastText =
        currentSemester === "first"
            ? "تم التحويل إلى الفصل الدراسي الأول"
            : "تم التحويل إلى الفصل الدراسي الثاني";
    showSemesterToast(toastText);

    document.querySelectorAll(".semester-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.semester === semester);
    });

    const subjects = middleSubjects[grade][semester];
    const tableBody = document.getElementById("subjects-table-body");
    tableBody.innerHTML = "";

    subjects.forEach(subject => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${subject.name}</td>
            <td>
                <input
                    type="decimal"
                    class="grade-input"
                    min="0"
                    max="100"
                    step="0.01"
                    placeholder="0 - 100"
                    value="100"
                >
            </td>
        `;
        tableBody.appendChild(row);
    });
}


function calculateAverage() {
    const inputs = document.querySelectorAll(".grade-input");
    const subjects = middleSubjects[grade][currentSemester];

    let totalWeighted = 0;
    let totalWeight = 0;
    subjectsGrades = [];

    let valid = true;

    inputs.forEach((input, index) => {
        const value = parseFloat(input.value);

        if (isNaN(value) || value < 0 || value > 100) {
            input.style.borderColor = "red";
            valid = false;
            return;
        }

        input.style.borderColor = "";

        const weight = subjects[index].weight;
        const weighted = value * weight;

        subjectsGrades.push({
            name: subjects[index].name,
            grade: value,
            weight,
            weightedGrade: weighted
        });

        totalWeighted += weighted;
        totalWeight += weight;
    });

    if (!valid) {
        alert("يرجى إدخال جميع الدرجات بشكل صحيح");
        return;
    }

    const average = totalWeighted / totalWeight;
    document.getElementById("average-result").textContent = average.toFixed(2);

    let gradeText = "";
    let gradeClass = "";

    if (average >= 90) {
        gradeText = "ممتاز";
        gradeClass = "excellent";
    } else if (average >= 80) {
        gradeText = "جيد جداً";
        gradeClass = "very-good";
    } else if (average >= 70) {
        gradeText = "جيد";
        gradeClass = "good";
    } else if (average >= 60) {
        gradeText = "مقبول";
        gradeClass = "acceptable";
    } else {
        gradeText = "راسب";
        gradeClass = "fail";
    }

    const gradeEl = document.getElementById("result-grade");
    gradeEl.textContent = `التقدير: ${gradeText}`;
    gradeEl.className = `result-grade ${gradeClass}`;

    displayResultTable();

    document.querySelector(".card.active-step").style.display = "none";
    document.getElementById("step-result").style.display = "block";
}

function displayResultTable() {
    const tbody = document.getElementById("result-table-body");
    tbody.innerHTML = "";

    subjectsGrades.forEach(s => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${s.name}</td>
            <td>${s.grade}</td>
            <td>${s.weight}</td>
            <td>${s.weightedGrade.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });
}