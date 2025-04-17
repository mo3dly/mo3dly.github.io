let selectedGrade = null;

function selectGrade(card) {
    const cards = document.querySelectorAll('.grade-card');
    cards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    selectedGrade = card.dataset.grade;
}

function proceed() {
    if (selectedGrade) {
        window.location.href = `/grades/${selectedGrade}`;
    } else {
        alert('الرجاء اختيار الصف أولاً');
    }
}

let selectedTerm = null;

function extractGradeFromUrl() {
    const regex = /\/grades\/(\d+)/;
    const match = window.location.pathname.match(regex);
    
    if (match) {
        selectedGrade = match[1];
    }
}

extractGradeFromUrl(); // اول ما تتحمل الصفحة  

function selectTerm(card) {
    const cards = document.querySelectorAll('.term-card');
    cards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    selectedTerm = card.dataset.term;
}

function proceedTerm() {
    if (selectedTerm) {
        window.location.href = `/grades/${selectedGrade}/term${selectedTerm}.html`;
    } else {
        alert('الرجاء اختيار الفصل الدراسي أولاً');
    }
}


function calculateAverage(subjects, gradeNumber) {
    let totalWeightedGrade = 0;
    let totalWeight = 0;
    const processedSubjects = [];

    subjects.forEach(subject => {
        const grade = parseFloat(subject.grade);
        const weight = parseFloat(subject.weight);

        if (weight === 0) return;

        const weightedGrade = grade * weight;
        processedSubjects.push({
            name: subject.name,
            grade: grade,
            weightedGrade: weightedGrade
        });

        totalWeightedGrade += weightedGrade;
        totalWeight += weight;
    });

    if (parseInt(gradeNumber) < 10) {
        console.log("Added")
        totalWeightedGrade += 200 // (100 * 1) + (100 * 1)
        totalWeight += 2 // 1 + 1
    }

    const average = (totalWeightedGrade / totalWeight).toFixed(2);

    return { average: average, subjects: processedSubjects };
}

function startCalculatorApp(gradeName, gradeNumber, termNumber) {
    fetch(`./weights/term-${termNumber}.json`)
        .then(response => response.json())
        .then(data => {
            buildGradePage(data, gradeName);

            document.addEventListener('click', function(event) {
                if (event.target.id === 'calculate') {
                    const inputs = document.querySelectorAll('.subjectInput');

                    const subjects = Array.from(inputs).map(input => ({
                        name: input.dataset.name,
                        weight: parseFloat(input.dataset.weight),
                        grade: parseFloat(input.value)
                    }));

                    const result = calculateAverage(subjects, gradeNumber);

                    showGradesTable(result);
                }
            });
        })
        .catch(error => {
            console.error(error);
        });
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}