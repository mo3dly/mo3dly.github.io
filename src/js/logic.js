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
        const weightedGrade = subject.grade * subject.weight;
        processedSubjects.push({
            name: subject.name,
            grade: subject.grade,
            weightedGrade: weightedGrade
        });

        totalWeightedGrade += weightedGrade;
        totalWeight += subject.weight;
    });

    if (Number(gradeNumber) < 10) {
        totalWeightedGrade += 200 // (100 * 1) + (100 * 1)
        totalWeight += 2 // 1 + 1
    }

    const average = (totalWeightedGrade / totalWeight).toFixed(2);

    return {average: average, subjects: processedSubjects };
}