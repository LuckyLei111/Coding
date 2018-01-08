$('footer div').click(function(){
    var index = $(this).index()
    $('section').hide().eq(index).fadeIn()
    $(this).addClass('active').siblings().removeClass('active')
})
//tab切换

$.ajax({
    url:'http://api.douban.com/v2/movie/top250',
    type:'GET',
    data:{
        start:0,
        count:20
    },
    dataType: 'jsonp'
}).done(function (ret) {
    console.log(ret);
    setDate(ret);
}).fail(function() {
    console.log('Error')   
});

function setDate(data) {
    var moData = data.subjects;
    var mloading = "";
    mloading += "<div class=\"loading\"><span class=\"iconfont icon-loading\"><\/span><\/div>\n";
    for (var a in moData) {
        var strVar = "";
        strVar += "<div class=\"item\">\n";
        strVar += "                <a href=\"" + moData[a].alt+"\">\n";
        strVar += "                    <div class=\"cover\"><img src=\"" + moData[a].images.large +"\" alt=\"\"><\/div>\n";
        strVar += "                    <div class=\"detail\">\n";
        strVar += "                        <h2>" + moData[a].title+"<\/h2>\n";
        strVar += "                        <div><span>" + moData[a].rating.average + "<\/span>评分/<span>" + moData[a].collect_count +"<\/span>收藏<\/div>\n";
        strVar += "                        <div><span class=\"year\">" + moData[a].year + "<\/span>/<span class=\"type\">" + moData[a].genres[0]+moData[a].genres[1] +"<\/span><\/div>\n";
        strVar += "                        <div>导演：<span>" + moData[a].directors[0].name +"<\/span><\/div>\n";
        strVar += "                        <div>主演：<span>柊瑠美、入野自由、夏木真理<\/span><\/div>\n";
        strVar += "                    <\/div>\n";
        strVar += "                <\/a>\n";
        strVar += "             <\/div>\n";
        $('#top250').append(strVar);
    }
    $('#top250').append(mloading);
}
onClickTop();
function onClickTop(){
    var scorllTop = $('#top250').scorllTop;
    console.log(scorllTop);
}
