//音乐播放器需要实现的功能
//1.播放音乐，暂停音乐。
//2.点击播放音乐时需要实现的功能。
//  1.进度条
//  2.时间
//3.列表和歌词的转换
//4.歌曲获取并添加到列表
//5.音量可调节大小

var music = {
    init:function(){
        console.log('music ok');
        this.musplay = $('.mus_play');
        this.bind();
        this.start();
    },
    bind:function(){
        var _this = this;
        this.musplay.on('click',function(){
            event.preventDefault();
            if(_this.musplay.hasClass('icon-music_play')){
                _this.musplay.addClass('icon-music_pause').removeClass('icon-music_play');
                $('audio').trigger('play');
            }else{
                _this.musplay.addClass('icon-music_play').removeClass('icon-music_pause');
                $('.audio').trigger('pause');
            }
        });
    },
    start:function(){
        this.getDate();
    },
    getDate:function(){
        $.ajax({
            url:'./js/music.json',
            type:'GET'
        }).done(function(ret){
            console.log(ret);
        })
    }
}
var app = {
    init:function(){
        console.log('app ok');
        this.list = $('.auther .mus-list');
        this.musword = $('.mus-word div');
        this.bind();
        music.init();
    },
    bind:function(){
        console.log('bind ok');
        var _this = this;
        this.list.on('click',function(){
            _this.musword.css('display','none');
            if ($('.auther .mus-list').hasClass('active')){
                $('.auther .mus-list').removeClass('active');
                _this.musword.eq(0).css('display','block');
            }else{
                $('.auther .mus-list').addClass('active');
                _this.musword.eq(1).css('display', 'block');
            }
        })
    }
};

app.init();