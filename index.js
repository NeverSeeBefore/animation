

const millisecondsEnable = false;
const secondsEnable = true;
const clock = new Proxy({ hours: '', minutes: '', seconds: '', milliseconds: '' }, {
    set(target, key, value, receiver) {
        const oldValue = Reflect.get(target, key, receiver);
        Reflect.set(target, key, value, receiver);
        if (
            oldValue !== value
        ) {
            setClock(key, value, clock)
        }
    }
})

function secondsHandler() {
    const date = new Date();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clock.hours = date.getHours();
    clock.minutes = minutes > 9 ? minutes : `0${minutes}`;
    clock.seconds = seconds > 9 ? seconds : `0${seconds}`;
    millisecondsEnable && (clock.milliseconds = date.getMilliseconds());
    requestAnimationFrame(secondsHandler);
}
function drawSecondsIndicator(seconds) {
    const decorationBox = document.getElementsByClassName('decoration')[0];
    const fragment = document.createDocumentFragment();
    const radius = 85;
    let fix = 0;
    let originFixArr = [];
    let fixArr = [];

    /**
     *                  0
     *          [53-59]     [1-7]        
     *      [46-52]             [8-14]
     *  45              ·               15
     *      [38-44]             [16-22]
     *          [31-37]     [23-29]
     *                  30
     * 对于 0 15 30 35 几项，偏移距离为固定的半径x
     * 对于 1-7 每一项。根据半径x和角度的余弦值，可以计算出偏移距离。
     * 对于 8-14项，可以看作 1-7 的反向
     * 其余同理
     * 角度转弧度
     *      角度转弧度 π/180×角度
     *      弧度变角度 180/π×弧度
     */
    const testArr = []
    for (let index = 0; index < 60; index++) {
        const dot = document.createElement('div');
        dot.className = `dot dot-${index}`;
        if (
            index < 8
            ||
            (index >= 15 && index < 22)
            ||
            (index >= 30 && index < 37)
            ||
            (index >= 45 && index < 52)
        ) {
            if (!originFixArr[index] && originFixArr.length < 8) {
                const originFix = radius / Math.cos(index * 6 * Math.PI / 180);
                originFixArr.push(originFix);
                fixArr.push(originFix);
            }
            else if (!fixArr[index]) {
                fixArr = [...fixArr, ...originFixArr]
            }
            fix = fixArr[index];
        }
        else {
            if (!fixArr[index]) {
                fixArr = [...fixArr, ...[...originFixArr].reverse()]
                fixArr.pop();
            }
            fix = fixArr[index];
        }

        // if (index % 15 === 0) {
        //     dot.style.backgroundColor = 'red';
        // }
        dot.style.transform = `translate(-50%, -50%) rotate(${index * 6}deg) translateY(${fix}px)`
        const delay = ((index - seconds - 1) % 60 - 60) * 1000
        dot.style.animationDelay = `${delay}ms`;
        testArr.push(delay);
        fragment.appendChild(dot);
    }
    decorationBox.appendChild(fragment);

    // console.log(originFixArr.map(item => item - radius));
    // console.log(fixArr.map(item => item - radius));
    console.log(testArr);
}

secondsHandler();
drawSecondsIndicator(clock.seconds);


function setClock(key, value, clock) {
    switch (key) {
        case 'hours':
        case 'minutes':
            document.getElementsByClassName('minutes')[0].innerText = `${clock.hours}:${clock.minutes}`;
            break;
        case 'seconds':
        case 'milliseconds':
            let str = ''
            secondsEnable && (str += clock.seconds)
            millisecondsEnable && (str += `:${clock.milliseconds}`)
            document.getElementsByClassName('seconds')[0].innerText = str;
            break;
        default:
            console.log('setClock default', key, value)
            break;
    }

}







