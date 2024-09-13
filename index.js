


const squares = Array.from(document.getElementsByClassName('square'))
squares.sort(() => Math.random() - 0.5)
squares.forEach((item, index) => {
    item.style.animationDelay = `${0.05 * index - 1}s`
})
