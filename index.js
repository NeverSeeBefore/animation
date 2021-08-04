

/**
 * 
 * @param {string} container 
 */
function ball (container) {
    const main = document.getElementById(container);
    init(main);
    return {
        
    }
}

function init(main){
    const fragment = document.createDocumentFragment();
    const step = 360 / 30;
    for (let i = 0; i < 30; i++) {
        const span = document.createElement('span');
        span.className = 'item';
        span.style.transform = `rotate3d(1, 1, 1, ${i * step})  translate3d(-50%, -50%, 50px)`;
        fragment.appendChild(span);
    }
    main.appendChild(fragment);
}


ball('main');