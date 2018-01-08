$('footer div').click(function () {
    var index = $(this).index()
    $('section').hide().eq(index).fadeIn()
    $(this).addClass('active').siblings().removeClass('active')
})
//tab切换

$.ajax({
    url: 'http://api.douban.com/v2/movie/top250',
    type: 'GET',
    data: {
        start: 0,
        count: 20
    },
    dataType: 'jsonp'
}).done(function (ret) {
    console.log(ret);
    setDate(ret);
}).fail(function () {
    console.log('Error')
});

// function setDate(ret) {
//     var moData = ret.subjects;
//     var mloading = "";
//     mloading += "<div class=\"loading\"><span class=\"iconfont icon-loading\"><\/span><\/div>\n";
//     for (var a in moData) {
//         var strVar = "";
//         strVar += "<div class=\"item\">\n";
//         strVar += "                <a href=\"" + moData[a].alt+"\">\n";
//         strVar += "                    <div class=\"cover\"><img src=\"" + moData[a].images.large +"\" alt=\"\"><\/div>\n";
//         strVar += "                    <div class=\"detail\">\n";
//         strVar += "                        <h2>" + moData[a].title+"<\/h2>\n";
//         strVar += "                        <div><span>" + moData[a].rating.average+"<\/span>评分/<span>88888<\/span>收藏<\/div>\n";
//         strVar += "                        <div><span class=\"year\">" + moData[a].year + "<\/span>/<span class=\"type\">" + moData[a].genres[0]+moData[a].genres[1] +"<\/span><\/div>\n";
//         strVar += "                        <div>导演：<span>宫崎骏<\/span><\/div>\n";
//         strVar += "                        <div>主演：<span>柊瑠美、入野自由、夏木真理<\/span><\/div>\n";
//         strVar += "                    <\/div>\n";
//         strVar += "                <\/a>\n";
//         strVar += "             <\/div>\n";
//         var mloading = "";
//         mloading += "<div class=\"loading\"><span class=\"iconfont icon-loading\"><\/span><\/div>\n";
//         $('#top250').append(strVar);
//     }
//     $('#top250').append(mloading);
// }

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
        $('section').eq(0).append($node);
    });
}
