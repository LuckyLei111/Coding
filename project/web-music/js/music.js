$('.mus_play').on('click', function (event){
    event.preventDefault();
    //$('.audio').trigger('play');
    if ($('.mus_play').hasClass('icon-music_play')) {
        $('.mus_play').addClass('icon-music_pause').removeClass("icon-music_play");
        $('.audio').trigger('play');
    }else{
        $('.mus_play').addClass('icon-music_play').removeClass("icon-music_pause");
        $('.audio').trigger('pause');
    }
});
$.ajax({
    url:"./js/music.json",
    type:'GET',
    dataType:'json'
}).done(function(ret){
    console.log(ret)
}).fail(function(){
    console.log('Error');
})

//音乐播放器需要实现的功能
//1.播放音乐，暂停音乐。
//2.点击播放音乐时需要实现的功能。
//  1.进度条
//  2.时间
//3.列表和歌词的转换
//4.歌曲获取并添加到列表
//5.音量可调节大小

var app = {
    init:function(){
        console.log('app ok');
        this.list = $('.auther .mus-list');
        this.bind();
    },
    bind:function(){
        console.log('bind ok')
        var _this = this;
        this.list.on('click',function(){
            $(this).addClass('active').siblings().removeClass('active');
        })
    }
}
app.init();