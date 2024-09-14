


function renderSquare() {
    const oContainer = document.getElementsByClassName('square-list')[0];
    const width = window.innerWidth;
    const squareCount = Math.ceil(width / 50);

    const oSquares = Array.from(oContainer.childNodes)
    oSquares.splice(squareCount);
    const existLength = oSquares.length;

    console.log('---', oSquares.length, squareCount)
    for (let index = existLength; index < squareCount; index++) {
        const square = document.createElement('div')
        square.className = 'square';
        oSquares.push(square);
    }
    oSquares.forEach((square, index) => {
        square.style.animationDelay = `${-0.5 * index}s`
    });

    // oSquares.sort(() => Math.random() - 0.5 > 0.5 ? -1 : 1); //  ! 排序不好使 不知道为什么

    console.log('---', oSquares.length, squareCount,oSquares)

    oContainer.replaceChildren(...oSquares);
}


// 防抖函数
function debounce(fn, delay) {
    let timer = null;
    return function () {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, delay);
    }
}


const debounceRenderSquare = debounce(renderSquare, 50);

debounceRenderSquare()
window.addEventListener('resize', debounceRenderSquare)
