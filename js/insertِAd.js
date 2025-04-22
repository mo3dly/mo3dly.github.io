window.addEventListener('DOMContentLoaded', function () {
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

    const container = document.querySelector('.container');
    if (container) {
        const ad1 = createAdElement();
        container.parentNode.insertBefore(ad1, container);
    }

    const footer = document.querySelector('footer');
    const ad2 = createAdElement();

    if (footer) {
        footer.parentNode.insertBefore(ad2, footer);
    } else {
        document.body.appendChild(ad2);
    }
});