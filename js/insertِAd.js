function createAdElement() {
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

    const script2 = document.createElement('script');
    script2.type = 'text/javascript';
    script2.src = '//www.highperformanceformat.com/1fa960edbaecaab085ced55d3c14a84f/invoke.js';

    adDiv.appendChild(script1);
    adDiv.appendChild(script2);

    return adDiv;
}

function insertAds() {
    if (!document.querySelector('.ad-before-container')) {
        const container = document.querySelector('.container');
        if (container) {
            const ad1 = createAdElement();
            ad1.classList.add('ad-before-container');
            container.parentNode.insertBefore(ad1, container);
        }
    }

    if (!document.querySelector('.ad-before-footer')) {
        const footer = document.querySelector('footer');
        const ad2 = createAdElement();
        ad2.classList.add('ad-before-footer');
        if (footer) {
            footer.parentNode.insertBefore(ad2, footer);
        } else {
            document.body.appendChild(ad2);
        }
    }
}

window.onload = function () {
    insertAds();

    const observer = new MutationObserver(() => {
        insertAds();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
};