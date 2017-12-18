// var oImg = document.querySelectorAll('img');
// var windowH = window.innerHeight;   //可视区域的高度
// var scorllTop = this.scrollY;       //滚动的距离；





lazyRender()

var clock

$(window).on('scroll', function () {
    if (clock) {
        clearTimeout(clock)
    }
    clock = setTimeout(function () {
        console.log('hello')
        lazyRender()
    }, 100)

})

function lazyRender() {
    $('.box img').each(function () {
        if (checkShow($(this)) && !isLoaded($(this))) {
            loadImg($(this))
        }
    })
}

function checkShow($img) {
    var scrollTop = $(window).scrollTop()
    var windowHeight = $(window).height()
    var offsetTop = $img.offset().top

    if (offsetTop < scrollTop + windowHeight && offsetTop > scrollTop) {
        //同时满足图片到文档的距离小于滚动的距离加上可视区的距离 和 图片到文档的距离大于滚动距离，返回true
        return true
    }
    return false
}

//检查图片的自定义属性值是否全等于图片的src值，也就是检查真实图片是否已经加载
function isLoaded($img) {
    return $img.attr('daresrc') === $img.attr('src')
}

//修改图片的src值
function loadImg($img) {
    $img.attr('src', $img.attr('daresrc'))
}