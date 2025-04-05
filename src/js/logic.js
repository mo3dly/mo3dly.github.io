function selectGrade(card) {
    const cards = document.querySelectorAll('.grade-card');
    cards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
}


function proceed() {
    const selected = document.querySelector('.grade-card.selected');
    if (selected) {
        let gradeNumber = selected.dataset;  
        window.location.href = `/grades/${gradeNumber}`;
    } else {
        alert('الرجاء اختيار الفصل أولاً');
    }
}