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

    let inputCounter = 0;

    subjects.forEach((subject) => {
        if (subject.weight === 0) return;

        const inputGroup = document.createElement('div');
        inputGroup.classList.add('input-group');

        const label = document.createElement('label');
        label.textContent = subject.name;

        const input = document.createElement('input');
        input.type = 'number';
        input.inputMode = 'decimal';
        input.pattern = '[0-9]*';
        input.placeholder = 'أدخل الدرجة (0 - 100)';
        input.min = '0';
        input.max = '100';
        input.value = '100';
        input.setAttribute('value', '100');
        input.dataset.weight = subject.weight;
        input.dataset.name = subject.name;
        input.classList.add('subjectInput');

        inputGroup.appendChild(label);
        inputGroup.appendChild(input);
        form.appendChild(inputGroup);

        inputCounter++;

        if (inputCounter % 5 === 0) {
            const adBanner = createAdBanner();
            form.appendChild(adBanner);
        }
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
    </footer>`;
}

function createAdBanner() {
    const adDiv = document.createElement('div');
    adDiv.className = 'ad';

    const script1 = document.createElement('script');
    script1.type = 'text/javascript';
    script1.textContent = `
        atOptions = {
            'key' : '1fa960edbaecaab085ced55d3c14a84f',
            'format' : 'iframe',
            'height' : 50,
            'width' : 320,
            'params' : {}
        };
    `;

    const script2Src = '//www.highperformanceformat.com/1fa960edbaecaab085ced55d3c14a84f/invoke.js';

    if (!document.querySelector('script[src="' + script2Src + '"]')) {
        const script2 = document.createElement('script');
        script2.type = 'text/javascript';
        script2.src = script2Src;

        adDiv.appendChild(script1);
        adDiv.appendChild(script2);
    }

    return adDiv;
}

function showGradesTable(data) {
    const container = document.querySelector('.container');
    
    container.innerHTML = "";

    const overlay = document.createElement("div");
    overlay.className = "loading-overlay";
    overlay.id = "loadingOverlay";

    const spinner = document.createElement("div");
    spinner.className = "loading-spinner";

    const text = document.createElement("div");
    text.className = "loading-text";
    text.textContent = "جاري حساب الدرجات...";

    overlay.appendChild(spinner);
    overlay.appendChild(text);
    container.appendChild(overlay);

    const title = document.createElement("h1");
    title.textContent = "📊 عرض الدرجات";
    container.appendChild(title);

    const table = document.createElement("table");
    table.className = "grades-table";
    table.id = "gradesTable";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    const subjectHeader = document.createElement("th");
    subjectHeader.textContent = "المادة";

    const gradeHeader = document.createElement("th");
    gradeHeader.textContent = "الدرجة";

    headerRow.appendChild(subjectHeader);
    headerRow.appendChild(gradeHeader);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    table.appendChild(tbody);

    container.appendChild(table);

    const totalGrade = document.createElement("div");
    totalGrade.className = "total-grade";

    const totalTitle = document.createElement("h2");
    totalTitle.textContent = "المعدل النهائي";

    const finalGrade = document.createElement("p");
    finalGrade.id = "final-grade";
    finalGrade.textContent = "0.0";

    totalGrade.appendChild(totalTitle);
    totalGrade.appendChild(finalGrade);

    container.appendChild(totalGrade);


    setTimeout(() => {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.style.opacity = '0';
            loadingOverlay.style.display = 'none';
            displayGrades(data);

            const back = document.createElement("button");
            back.textContent = "↩️ رجوع";
            back.onclick = () => location.reload();
            container.appendChild(back);
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
