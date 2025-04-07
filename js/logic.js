let selectedGrade = null;
let selectedTerm = null;
let choosingTerm = false;

function selectGrade(card) {
    const cards = document.querySelectorAll('.grade-card');
    cards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    selectedGrade = card.dataset.grade;
}

function proceed() {
    if (!choosingTerm) {
        if (selectedGrade) {
            choosingTerm = true;
            document.querySelector('.grade-selection').style.display = 'none';
            document.querySelector('.term-selection').style.display = 'flex';
            document.querySelector('h1').innerText = '📅 اختر الفصل الدراسي';
            document.querySelector('.next-button').innerText = 'التالي →';
        } else {
            alert('الرجاء اختيار الصف أولاً');
        }
    } else {
        if (selectedTerm) {
            window.location.href = `/grades/${selectedGrade}/term${selectedTerm}.html`;
        } else {
            alert('الرجاء اختيار الفصل الدراسي أولاً');
        }
    }
}

function selectTerm(card) {
    const cards = document.querySelectorAll('.term-card');
    cards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    selectedTerm = card.dataset.term;
}

function calculateAverage(subjects, gradeNumber) {
    let totalWeightedGrade = 0;
    let totalWeight = 0;
    const processedSubjects = [];

    subjects.forEach(subject => {
        const grade = parseFloat(subject.grade);
        const weight = parseFloat(subject.weight);

        const weightedGrade = grade * weight;
        processedSubjects.push({
            name: subject.name,
            grade: grade,
            weightedGrade: weightedGrade
        });

        totalWeightedGrade += weightedGrade;
        totalWeight += weight;
    });

    if (Number(gradeNumber) < 10) {
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