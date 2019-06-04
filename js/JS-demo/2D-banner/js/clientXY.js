function $(selector) {
    return document.querySelector(selector);
}
document.addEventListener('mousemove', function (evt) {
    var x = evt.clientX;//获取鼠标的位置
    var y = evt.clientY;
    var winWidth = window.innerWidth / 2; //窗口宽度
    var winHeight = window.innerHeight / 2;
    var rx = x - winWidth;
    var ry = winHeight - y;
    var max = 20;
    var dx = ($('.box').getBoundingClientRect().width / max) * (rx / -winWidth);
    var dy = ($('.box').getBoundingClientRect().height / max) * (ry / winHeight);
    $('.box').style['transform'] = 'translate(' + dx + 'px,' + dy + 'px)';
});