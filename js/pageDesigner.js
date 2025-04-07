function createStars() {
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 3 + 2}px`;
        star.style.height = star.style.width;
        star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
        starsContainer.appendChild(star);
    }
}

function buildGradePage(subjects, gradeName) {
    let body = document.querySelector('body');
    
    let container = document.createElement('div');
    container.classList.add('container');

    container.innerHTML = `<h1>📚 حاسبة المعدل <p>للصف ${gradeName}</p></h1>`;

    const form = document.createElement('form');
    form.id = 'subjectsForm';

    subjects.forEach(subject => {
        const inputGroup = document.createElement('div');
        inputGroup.classList.add('input-group');

        const label = document.createElement('label');
        label.textContent = subject.name;

        const input = document.createElement('input');
        input.type = 'number';
        input.inputMode = 'numeric';
        input.pattern = '[0-9]*';
        input.placeholder = 'أدخل الدرجة (0 - 100)';
        input.min = '0';
        input.max = '100';
        input.value = '100';
        input.setAttribute('value', '100')
        input.dataset.weight = subject.weight;
        input.dataset.name = subject.name;
        input.classList.add('subjectInput');

        inputGroup.appendChild(label);
        inputGroup.appendChild(input);
        form.appendChild(inputGroup);
    });

    container.appendChild(form);

    const submit = document.createElement('button');
    submit.textContent = 'احسب المعدل الآن ✨';
    submit.id = 'calculate';
    submit.type = "submit";
    container.appendChild(submit);

    body.appendChild(container);

    body.innerHTML += `<footer class="footer">
        <p>جميع الحقوق محفوظة © 2025</p>
        <div class="footer-links">
          <a href="/privacy.html">سياسة الخصوصية</a>
        </div>
    </footer>`
}


function showGradesTable(data) {
    let container = document.querySelector('.container');
    
    container.innerHTML = `
        <div class="loading-overlay" id="loadingOverlay">
            <div class="loading-spinner"></div>
            <div class="loading-text">جاري حساب الدرجات...</div>
        </div>
        <h1>📊 عرض الدرجات</h1>
        <table class="grades-table" id="gradesTable">
            <thead>
                <tr><th>المادة</th><th>الدرجة</th></tr>
            </thead>
            <tbody></tbody>
        </table>
        <div class="total-grade">
            <h2>المعدل النهائي</h2>
            <p id="final-grade">0.0</p>
        </div>
    `;

    setTimeout(() => {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.style.opacity = '0';
            loadingOverlay.style.display = 'none';
            displayGrades(data);
        }
    }, 1500);
}

function displayGrades(data) {
    const gradesTableBody = document.querySelector('#gradesTable tbody');
    const finalGradeElement = document.getElementById('final-grade');

    gradesTableBody.innerHTML = data.subjects.map(subject => 
        `<tr><td>${subject.name}</td><td>${subject.grade}</td></tr>`
    ).join('');

    finalGradeElement.textContent = data.average;
}