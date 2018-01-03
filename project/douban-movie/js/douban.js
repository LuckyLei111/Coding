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
        count:20
    },
    dataType: 'jsonp'
}).done(function (ret) {
    setDate(ret);
}).fail(function() {
    console.log('Error')   
})

function setDate(ret) {
    var moData = ret.subjects;
    console.log(moData);
    for (var vel in moData) {
        console.log(moData[vel]);
    }
}
