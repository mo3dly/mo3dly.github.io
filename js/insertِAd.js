function createAdElement(className) {
    const adDiv = document.createElement('div');
    adDiv.className = `ad ${className}`;

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

function cleanAndInsertAd(targetSelector, className, positionCallback) {
    const existingAd = document.querySelector(`.ad.${className}`);
    if (existingAd) existingAd.remove();

    const target = document.querySelector(targetSelector);
    if (target) {
        const ad = createAdElement(className);
        positionCallback(ad, target);
    }
}

function checkAndFixAds() {
    cleanAndInsertAd('.container', 'ad-before-container', (ad, container) => {
        container.parentNode.insertBefore(ad, container);
    });

    const footer = document.querySelector('footer');
    if (footer) {
        cleanAndInsertAd('footer', 'ad-before-footer', (ad, footer) => {
            footer.parentNode.insertBefore(ad, footer);
        });
    } else {
        cleanAndInsertAd('body', 'ad-before-footer', (ad, body) => {
            document.body.appendChild(ad);
        });
    }
}

window.onload = function () {
    checkAndFixAds();

    const observer = new MutationObserver(() => {
        checkAndFixAds();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });
};