$('footer div').click(function () {
    var index = $(this).index()
    $('section').hide().eq(index).fadeIn()
    $(this).addClass('active').siblings().removeClass('active')
})
//tab切换


var index = 0;

var contrent = false;//枷锁机制


start();
function start(){

    if(contrent)return
    contrent = true;
    $.ajax({
        url: 'http://api.douban.com/v2/movie/top250',
        type: 'GET',
        data: {
            start: index,
            count: 10
        },
        dataType: 'jsonp'
    }).done(function (ret) {
        console.log(ret);
        setDate(ret);
        index+=10;
    }).fail(function () {
        console.log('Error')
    }).always(function(){
        contrent = false;
    });
}
function setDate(data) {
    data.subjects.forEach(function (movie) {
        var tpl = '<div class="item">\
            <a href = "#" >\
                <div class="cover"><img src="http://img3.doubanio.com/view/photo/s_ratio_poster/public/p1910830216.jpg" alt=""></div>\
                    <div class="detail">\
                        <h2>千里千寻</h2>\
                        <div><span class="score"></span>评分/<span class="collect"></span></div>\
                        <div><span class="year">2001</span>/<span class="type"></span></div>\
                        <div>导演：<span class="director"></span></div>\
                        <div>主演：<span class="Starring">柊瑠美、入野自由、夏木真理</span></div>\
                    </div>\
                </a>\
            </div >';
        var $node = $(tpl);
        $node.find('.cover img').attr('src', movie.images.medium);
        $node.find('.detail h2').text(movie.title);
        $node.find('.detail .score').text(movie.rating.average);
        $node.find('.detail .collect').text(movie.collect_count);
        $node.find('.detail .year').text(movie.year);
        $node.find('.detail .type').text(function () {
            var movieTypeArr = [];
            movie.genres.forEach(function (item) {
                movieTypeArr.push(item);
            })
            return movieTypeArr.join('、');
        });
        $node.find('.detail .director').text(function () {
            var directorArr = [];
            movie.directors.forEach(function (item) {
                directorArr.push(item.name);
            })
            return directorArr.join('、');
        })
        $node.find('.detail .Starring').text(function () {
            var StarringArr = [];
            movie.casts.forEach(function (item) {
                StarringArr.push(item.name);
            })
            return StarringArr.join('、');
        })
        $('#top250 .loading').before($node);
        if (index == '250') {
            alert('到底了');
        }
    });
}

$('section').on('scroll',function(){
    var loadTop = $('.loading').offset().top;
    var winHeight = $('section').height();
    var loadHeight = $('.loading').height();
    if(loadTop < winHeight + loadHeight){
        console.log('true');
        start();
    }else{
        console.log('false');
    }
})