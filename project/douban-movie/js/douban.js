$('footer div').click(function(){
    var index = $(this).index()
    $('section').hide().eq(index).slideDown()
    $(this).addClass('active').siblings().removeClass('active')
})
//tab切换
$.ajax({
    url:'http://api.douban.com/v2/movie/top250',
    type:'GET',
    data:{
        start:0,
        count:250
    },
    dataType: 'jsonp'
}).done(function (ret) {
    setDate(ret);
}).fail(function() {
    console.log('Error')   
})
function setDate(ret) {
    var moData = ret.subjects;
    for (var i = 0; i < moData.length; i++) {
        console.log(moData[i].alt)
        console.log(moData[i].title);
        console.log(moData[i].genres);
        console.log(moData[i].casts)
        console.log(moData[i].images.small);
        console.log(moData[i].rating.average);
        console.log(moData[i].collect_count)
        console.log(moData[i].directors)
    }
}
