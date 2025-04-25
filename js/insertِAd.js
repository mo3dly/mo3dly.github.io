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

    const script2Src = '//www.highperformanceformat.com/1fa960edbaecaab085ced55d3c14a84f/invoke.js';

    if (!document.querySelector(`script[src="${script2Src}"]`)) {
        const script2 = document.createElement('script');
        script2.type = 'text/javascript';
        script2.src = script2Src;

        adDiv.appendChild(script1);
        adDiv.appendChild(script2);
    }

    return adDiv;
}

function cleanAndInsertAd(targetSelector, className, positionCallback) {
    const existingAd = document.querySelector(`.ad.${className}`);
    if (existingAd) existingAd.remove();

    const target = document.querySelector(targetSelector);
    if (target) {
        const ad = createAdElement(className);
        positionCallback(ad, target);
        observeAd(ad, className, targetSelector, positionCallback);
    }
}

function observeAd(adElement, className, targetSelector, positionCallback) {
    const observer = new MutationObserver(() => {
        const target = document.querySelector(targetSelector);
        if (!document.body.contains(adElement) || !target || adElement.parentNode !== target.parentNode) {
            observer.disconnect();
            cleanAndInsertAd(targetSelector, className, positionCallback);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

function waitForElement(selector, timeout = 10000) {
    return new Promise((resolve, reject) => {
        const element = document.querySelector(selector);
        if (element) return resolve(element);

        const observer = new MutationObserver(() => {
            const el = document.querySelector(selector);
            if (el) {
                observer.disconnect();
                resolve(el);
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        setTimeout(() => {
            observer.disconnect();
            reject(new Error(`Timeout waiting for ${selector}`));
        }, timeout);
    });
}

function checkAndFixAds() {
    waitForElement('.container')
        .then(container => {
            cleanAndInsertAd('.container', 'ad-before-container', (ad, container) => {
                container.parentNode.insertBefore(ad, container);
            });
        })
        .catch(console.warn);

    waitForElement('footer')
        .then(footer => {
            cleanAndInsertAd('footer', 'ad-before-footer', (ad, footer) => {
                footer.parentNode.insertBefore(ad, footer);
            });
        })
        .catch(() => {
            cleanAndInsertAd('body', 'ad-before-footer', (ad, body) => {
                document.body.appendChild(ad);
            });
        });
}

window.onload = function () {
    checkAndFixAds();
};