const imgs = $("img");
const len = imgs.length;
function init(){
    const deg = 360 / len;
    imgs.each(function (index, ele) {
        $(ele).css({
            transform: 'rotateY(' + index * deg +'deg) translateZ(300px)',
            transition: 'all .5s linear ' + (len - 1 - index)* 0.1 +'s'
        })
    })
}
init();

function bindEvent(){
    let timer, lastX, lastY, nowX, nowY, disX, disY, rotX = 0, rotY = 0;
    $('body').on('mousedown',function(e){
        clearInterval(timer);
        lastX = e.clientX;
        lastY = e.clientY;
        // console.log("mousedown", e);

        $('body').on('mousemove',function(e){
            // console.log("mousedown", e)
            nowX = e.clientX;
            nowY = e.clientY;

            disX = nowX - lastX;
            disY = nowY - lastY;
            rotX -= disY * 0.1;
            rotY += disX * 0.1;
            // console.log(disX,rotY);
            $('.box').css({
                transform: 'rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)'
            })
            
            lastX = nowX;
            lastY = nowY;
        })
        $('body').on('mouseup',function(e){
            // console.log(e);
            $('body').off('mousemove');
            timer = setInterval(() => {
                disX *= 0.98;
                disY *=0.98;

                rotX -= disY * 0.5;
                rotY += disX * 0.5;
                $('.box').css({
                    transform: 'rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)'
                })
                if(Math.abs(disX) < 0.1){
                    disX = 0;
                }
                if(Math.abs(disY) < 0.1){
                    disY = 0;
                }
                if(!disY && !disY){
                    clearInterval(timer);
                }
            }, 20);

        })
        return false;
    })
}
bindEvent();