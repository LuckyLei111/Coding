var app = {
    init: function(){
        this.$tabs = $('footer>div');
        this.$panels = $('section');
        this.bind();

        top250.init();  // Top250
        usBox.init();   // 北美榜单
        search.init();  // 搜索功能
    },
    bind: function(){
        var _this = this;
        this.$tabs.on('click', function(){
            $(this).addClass('active').siblings().removeClass('active');
            _this.$panels.eq($(this).index()).fadeIn().siblings().hide();
        })
    }
}
app.init();


var top250 = {
    init: function(){
        this.$element = $('#top250')
        this.isLoading = false
        this.index = 0
        this.isFinish = false
        this.clock;
        this.bind()
        this.start()
    },

    bind: function(){
        var _this = this
        this.$element.scroll(function(){
            if(_this.clock){
                clearTimeout(clock);
            }else{
                clock = setTimeout(function(){
                    if(_this.$element.find('.container').height() - 10 <= _this.$element.height() + _this.$element.scrollTop())
                    {
                        _this.start()
                        console.log('true');
                    }else{
                        console.log('false')
                    }
                });
            }
        });
    },

    start: function(){
        var _this = this;
        this.getData(function(data){
            _this.render(data)
        })
    },
    getData: function(callback){
        var _this = this
        if(_this.isLoading) return;
        _this.isLoading = true
        _this.$element.find('.loading').show()
        
        $.ajax({
            url: 'http://api.douban.com/v2/movie/top250',
            data:{
                start: _this.index || 0
            },
            dataType: 'jsonp'
        }).done(function(ret){
            _this.index+=20;
            if(_this.index >= ret.total){
                _this.isFinish = true;
            }
            callback&&callback(ret);
        }).fail(function(){
            console.log('数据异常');
        }).always(function(){
            _this.isLoading = false;
            _this.$element.find('.loading').hide();
        })
        
    },

    render: function(data){
        var _this = this;

        data.subjects.forEach(function(movie){
            var tpl = `<div class="item">
                            <a href="#">
                                <div class="cover">
                                    <img src="http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
                                </div>
                                <div class="detail">
                                    <h2>霸王别姬</h2>
                                    <div class="extra"><span class="score">9.3分</span> / <span class="collect">1000收藏</span></div>
                                    <div class="extra"><span class="year">1994</span> <span class="type">剧情、爱情</span></div>
                                    <div class="extra">导演: <span class="director">张艺谋<</span></div>
                                    <div class="extra">主演: <span class="actor">张艺谋、张艺谋、张艺谋</span></div>
                                </div>
                            </a>
                        </div>`;
            var $node = $(tpl);
            $node.find('.cover img').attr('src',movie.images.medium)
            $node.find('.detail h2').text(movie.title);
            $node.find('.score').text(movie.rating.average);
            $node.find('.collect').text(movie.collect_count);
            $node.find('.year').text(movie.year);
            $node.find('.type').text(movie.genres.join('/'));
            $node.find('.director').text(function(){
                var directorArr = [];
                movie.directors.forEach(function(item){
                    directorArr.push(item.name);
                })
                return directorArr.join('、');
            });
            $node.find('.actor').text(function(){
                var actorArr = [];
                movie.casts.forEach(function(item){
                    actorArr.push(item.name);
                })
                return actorArr.join('、');
            });
            _this.$element.find('.container').append($node);
        });
    }
}

var usBox = {
    init: function(){
        console.log('usBox');
        this.$element = $('#beimei');
        this.start()
    },
    start: function(){
        var _this = this;
        this.getData(function(data){
            _this.render(data)
        })
    },
    getData: function(callback){
        var _this = this
        _this.isLoading = true
        _this.$element.find('.loading').show()

        $.ajax({
            url: 'http://api.douban.com/v2/movie/us_box',
            dataType: 'jsonp'
        }).done(function(ret){
            callback&&callback(ret);
        }).fail(function(){
            console.log('数据异常');
        }).always(function(){
            _this.$element.find('.loading').hide();
        })
        
    },

    render: function(data){
        var _this = this;
        data.subjects.forEach(function(movie){
            movie = movie.subject;
            var tpl = `<div class="item">
                            <a href="#">
                                <div class="cover">
                                    <img src="http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
                                </div>
                                <div class="detail">
                                    <h2>霸王别姬</h2>
                                    <div class="extra"><span class="score">9.3分</span> / <span class="collect">1000收藏</span></div>
                                    <div class="extra"><span class="year">1994</span> <span class="type">剧情、爱情</span></div>
                                    <div class="extra">导演: <span class="director">张艺谋<</span></div>
                                    <div class="extra">主演: <span class="actor">张艺谋、张艺谋、张艺谋</span></div>
                                </div>
                            </a>
                        </div>`;
            var $node = $(tpl);
            $node.find('.cover img').attr('src',movie.images.medium);
            $node.find('.detail h2').text(movie.title);
            $node.find('.score').text(movie.rating.average);
            $node.find('.collect').text(movie.collect_count);
            $node.find('.year').text(movie.year);
            $node.find('.type').text(movie.genres.join('/'));
            $node.find('.director').text(function(){
                var directorArr = [];
                movie.directors.forEach(function(item){
                    directorArr.push(item.name);
                })
                return directorArr.join('、');
            });
            $node.find('.actor').text(function(){
                var actorArr = [];
                movie.casts.forEach(function(item){
                    actorArr.push(item.name);
                })
                return actorArr.join('、');
            });
            _this.$element.find('.container').append($node);
        });
    }
}

var search = {
    init: function(){
        console.log('search ok')
        this.$element = $('#search');
        this.keyword = '';
        this.isLoading = false;
        this.index = 0;
        this.bind();

    },
    bind: function(){
        var _this = this;
        this.$element.find('.button').click(function(){
            _this.$element.find('.container>.item').remove()
            _this.keyword = _this.$element.find('input').val();
            _this.$element.find('.loading').show()
            _this.start();
        })
    },
    start: function(){
        var _this = this;
        this.getData(function(data){
            _this.render(data)
        })
    },
    getData: function(callback){
        var _this = this
        $.ajax({
            url: 'http://api.douban.com/v2/movie/search',
            data: {
                q: _this.keyword,
            },
            dataType: 'jsonp'
        }).done(function(ret){
            callback&&callback(ret);
        }).fail(function(){
            console.log('数据异常');
        }).always(function(){
            _this.$element.find('.loading').hide();
        })
        
    },

    render: function(data){
        var _this = this;
        if(data.subjects == ''){
            var $notfound = "<div class='item notfound'>很抱歉，没有找到与<span>\“"+ _this.keyword +"\”</span>相关的电影</div>";
            _this.$element.find('.container').append($notfound);
        }
        data.subjects.forEach(function(movie){
            var tpl = `<div class="item">
                            <a href="#">
                                <div class="cover">
                                    <img src="http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
                                </div>
                                <div class="detail">
                                    <h2>霸王别姬</h2>
                                    <div class="extra"><span class="score">9.3分</span> / <span class="collect">1000收藏</span></div>
                                    <div class="extra"><span class="year">1994</span> <span class="type">剧情、爱情</span></div>
                                    <div class="extra">导演: <span class="director">张艺谋<</span></div>
                                    <div class="extra">主演: <span class="actor">张艺谋、张艺谋、张艺谋</span></div>
                                </div>
                            </a>
                        </div>`;
            var $node = $(tpl);
            $node.find('.cover img').attr('src',movie.images.medium);
            $node.find('.detail h2').text(movie.title);
            $node.find('.score').text(movie.rating.average);
            $node.find('.collect').text(movie.collect_count);
            $node.find('.year').text(movie.year);
            $node.find('.type').text(movie.genres.join('/'));
            $node.find('.director').text(function(){
                var directorArr = [];
                movie.directors.forEach(function(item){
                    directorArr.push(item.name);
                })
                return directorArr.join('、');
            });
            $node.find('.actor').text(function(){
                var actorArr = [];
                movie.casts.forEach(function(item){
                    actorArr.push(item.name);
                })
                return actorArr.join('、');
            });
            _this.$element.find('.container').append($node);
        });
    }
}