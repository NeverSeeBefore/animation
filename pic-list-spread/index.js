var timer = setTimeout(() => {
    $('wrapper').removeClass('init');
}, 200);

$(".item").on("click", function(e) {
    // console.log(e);
    $(this).addClass("active");
    $('.wrapper').addClass("wrapper-active");
})

$(".close").on('click', function (e){
    // console.log(e);
    e.stopPropagation();
    $('.active').removeClass('active');
    $('.wrapper-active').removeClass('wrapper-active');
    // console.log($('.wrapper-active'));
})