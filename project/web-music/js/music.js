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
