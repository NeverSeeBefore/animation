

/**
 *
 * @param {string} container
 */
function ball(mainId) {
    const { main, container } = init(mainId);
    // const { getDegs } = bindEvent(main, container);
    const cancelAutoScroll = autoScroll(container, 50);
    return {

    }
}

function init(mainId) {
    const main = document.getElementById(mainId);
    const container = document.createElement('div');
    container.className = 'ball-container';
    // const level = 5;
    // const count = 10;
    // const xStep = 180 / level;
    // const yStep = 360 / count;
    // const initDeg = 0;
    // const fragment = document.createDocumentFragment();
    // const total = level * count;
    // for (let i = 0; i < total; i++) {
    //     // const item = createItem((i / count >>> 0) * xStep + initDeg, i % count * yStep + initDeg, 45);
    //     fragment.appendChild(item);
    // }

    const count = 10;
    const initDeg = 0;
    const fragment = document.createDocumentFragment();
    let total = count;
    const yStep = 180 / count;
    let l = 1;
    while(total >= 1) {
        const xStep = 360 / total;
        for(let i = 0; i < total; i ++) {
            const item1 = createItem(i * xStep + initDeg, l * yStep + initDeg, 45);
            const item2 = createItem(i * xStep + initDeg, -l * yStep + initDeg, 45);
            fragment.appendChild(item1);
            fragment.appendChild(item2);
        }
        total -= 1;
        console.log(total);
        l ++;
    }
    container.appendChild(fragment);
    main.appendChild(container);
    return {
        main,
        container
    }
}
function createItem(x, y, z) {
    const span = document.createElement('span');
    span.className = 'item';
    // span.innerText = 'a';
    span.style.transform = `translate(-50%, -50%) rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg) translateZ(100px)`;
    return span;
}
function bindEvent(target, thing) {
    let degX = 0; degY = 0; frameId = null;
    target.addEventListener('mousedown', (e) => {
        const originX = e.clientX;
        const originY = e.clientY;
        console.log('mouse down');
        target.onmousemove = function (e) {
            const movedX = e.clientX - originX;
            const movedY = e.clientY - originY;
            // console.log('mouse move', movedX, movedY);
            degX -= movedY * 0.01;
            degY += movedX * 0.01;
            if (frameId !== null) {
                cancelAnimationFrame(frameId);
            }
            frameId = requestAnimationFrame(() => {
                thing.style.transform = `rotateX(${degX % 360}deg) rotateY(${degY % 360}deg)`;
                frameId = null;
            })
        };
    })
    target.addEventListener('mouseup', (e) => {
        console.log('mouse up');
        target.onmousemove = null;
    })
    return {
        getDegs: () => {
            return {
                degX,
                degY
            }
        }
    }
}

function autoScroll(target, spaceTime) {
    let lastUpdate, frameId = null, degX = 0, degY = 0;
    const callback = (timeStamp) => {
        if (lastUpdate === undefined) {
            lastUpdate = timeStamp;
        }
        const deviation = timeStamp - lastUpdate;

        if (deviation >= spaceTime) {
            // console.log(true, deviation);
            lastUpdate = timeStamp;
            degX += 1;
            degY += 1;
            target.style.transform = `rotateX(${degX % 360}deg) rotateY(${degY % 360}deg)`;
        }
        frameId = requestAnimationFrame(callback);
    }
    frameId = requestAnimationFrame(callback);
}

ball('main');