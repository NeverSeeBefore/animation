

/**
 *
 * @param {string} container
 */
function ball(mainId) {
    const main = document.getElementById(mainId);
    const { container } = init(main);
    bindEvent(main, container)
    // const { getDegs } = bindEvent(main, container);
    // const cancelAutoScroll = autoScroll(container, 50);

    return {

    }
}

function initCord(container) {
    // <div class="cord">
    //         <div class="x">x</div>
    //         <div class="y">y</div>
    //         <div class="z">z</div>
    //     </div>
    const cordDiv = document.createElement('div');
    cordDiv.className = 'cord';
    const xDiv = document.createElement('div');
    const yDiv = document.createElement('div');
    const zDiv = document.createElement('div');
    xDiv.className = 'x';
    yDiv.className = 'y';
    zDiv.className = 'z';
    cordDiv.appendChild(xDiv);
    cordDiv.appendChild(yDiv);
    cordDiv.appendChild(zDiv);
    container.appendChild(cordDiv);
    return cordDiv;
}

function init(main) {
    const container = document.createElement('div');
    container.className = 'ball-container';
    const fragment = document.createDocumentFragment();


    // const itemCount = 32;
    // const layerCount = 5;

    // const radius = getRedius(itemCount);
    // console.log('球表面积 4πr²', 4 * Math.PI * 50 ** 2);
    // const xStep = 0;
    // const yStep = radius * 2 / itemCount;
    // const zStep = 0;

    // for (let i = 0; i < itemCount; i++) {
    //     // const item = createItem(xStep, );
    // }
    // // while (total >= 1) {
    // //     const xStep = 360 / total;
    // //     for (let i = 0; i < total; i++) {
    // //         const item1 = createItem(i * xStep + initDeg, l * yStep + initDeg, 50);
    // //         const item2 = createItem(i * xStep + initDeg, -l * yStep + initDeg, 50);
    // //         fragment.appendChild(item1);
    // //         fragment.appendChild(item2);
    // //     }
    // //     total -= 1;
    // //     console.log(total);
    // //     l++;
    // // }


    const itemCount = 1000;
    const round = 20;
    const xStep = 0;
    const yStep = 360 * round / itemCount;
    const zStep = 180 / itemCount;
    // 所有元素个数 1001
    // 构成球形环绕20圈
    // 构成半球绕10圈
    // 10圈 = 360 * 10 = 3600
    // 半球 500个元素，递进499次
    // x = 500n
    // 1    --- 0
    // 2    --- 499n
    // 3    --- 498n
    // 250  --- 251n
    // 251  --- 250n
    // 500  --- n
    // 500n * 249 + 251n = 3600
    // n = 0.02885748411;

    // 0
    // 90
    // 89
    // 70
    // 50
    // 30
    // const getYstep = (function() {
    //     // const totalDistance = round * 360;
    //     // const halfDistance = totalDistance / 2;
    //     let traveledDistance = 0;
    //     let d = 0.02885748411
    //     let maxStep = itemCount * d;
    //     console.log('maxStep', maxStep);
    //     return function (index) {
    //         // maxStep = maxStep - (500 - index) * d
    //         // traveledDistance += step;
    //         // if (index>100 && index < 200) {
    //         //     console.log(maxStep);
    //         // }
    //         // return traveledDistance;
    //         return (500 - index) * d
    //     }
    // })()
    function easeOutQuad(pos) {
        return -((pos - 1) ** 2 - 1);
    }
    

    let lastY = 0;
    for (let i = 0; i < itemCount - 500; i++) {
        // const item = createItem(xStep * i, yStep * i % 360, -90 + zStep * i, 110, 0, 0);
        // const y = lastY + yStep * (1-easeOutQuad(i/1000))
        const y = lastY +21*yStep
        console.log('gap', y - lastY, easeOutQuad(i/1000));
        lastY = y;
        const item = createItem(xStep * i, y % 360, -90 + zStep * i, 110, 0, 0);
        fragment.appendChild(item);
    }

    initCord(fragment);
    container.appendChild(fragment);
    main.appendChild(container);
    return {
        container
    }
}

// 计算n个元素所需的球形半径
function getRedius(itemCount) {
    // 圆表面积 4πr²
    // 单个元素面积 20*48=960
    return Math.ceil(Math.sqrt((32 * 960 / (4 * Math.PI))))
}

let index = 0;
function createItem(rx, ry, rz, tx, ty, tz) {
    const span = document.createElement('span');
    span.className = 'item';
    // span.innerText = ++index;
    // span.style.transform = `translate(-50%, -50%) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) translateZ(100px)`;
    // span.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) translateX(${tx}) translatY(${ty}) translateZ(${tz}))`;
    // span.style.transform = ` translate(${tx}px, ${ty}px, ${tz}px)`;
    // span.style.transform = `rotate3d(1, 1, 1, ${r3d}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`
    span.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) translate3d(${tx}px, ${ty}px, ${tz}px) rotateY(90deg)`
    return span;
}

function bindEvent(target, thing) {
    let degX = 45; degY = 45; frameId = null;
    // target.addEventListener('mousedown', (e) => {
    //     const originX = e.clientX;
    //     const originY = e.clientY;
    //     console.log('mouse down');
    //     target.onmousemove = function (e) {
    //         const movedX = e.clientX - originX;
    //         const movedY = e.clientY - originY;
    //         // console.log('mouse move', movedX, movedY);
    //         degX -= movedY * 0.01;
    //         degY += movedX * 0.01;
    //         if (frameId !== null) {
    //             cancelAnimationFrame(frameId);
    //         }
    //         frameId = requestAnimationFrame(() => {
    //             thing.style.transform = `rotateX(${degX % 360}deg) rotateY(${degY % 360}deg)`;
    //             frameId = null;
    //         })
    //     };
    // })

    let direction = null;
    target.addEventListener('mousedown', (e) => {
        let originX = e.clientX;
        let originY = e.clientY;
        console.log('mouse down');
        target.onmousemove = function (e) {

            const movedX = e.clientX - originX;
            const movedY = e.clientY - originY;
            originX = e.clientX;
            originY = e.clientY;
            if (movedX === 0 && movedY === 0) {
                return;
            }
            if (direction === null) {
                if (Math.abs(movedX) > Math.abs(movedY)) {
                    direction = movedX > 0 ? 'right' : 'left';
                }
                else {
                    direction = movedY > 0 ? 'down' : 'up';
                }
            }
            else {
                if (direction === 'up' || direction === 'down') {
                    direction = movedY > 0 ? 'down' : 'up';
                }
                else if (direction === 'left' || direction === 'right') {
                    direction = movedX > 0 ? 'right' : 'left';
                }
            }

            console.log('dorection', direction);
            switch (direction) {
                case 'right':
                    degY = (degY - movedX * 0.1) % 360;
                    break;
                case 'left':
                    degY = (degY - movedX * 0.1) % 360;
                    break;
                case 'down':
                    degX = (degX + movedY * 0.1) % 360;
                    break;
                case 'up':
                    degX = (degX + movedY * 0.1) % 360;
                    break;
            }
            if (frameId !== null) {
                cancelAnimationFrame(frameId);
            }
            frameId = requestAnimationFrame(() => {
                thing.style.transform = `rotateX(${degX}deg) rotateY(${degY}deg)`;
                frameId = null;
            })
        };
    })
    target.addEventListener('mouseup', (e) => {
        console.log('mouse up', degX, degY);
        target.onmousemove = null;
        direction = null;
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


ball('main');