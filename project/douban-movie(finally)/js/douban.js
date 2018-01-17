var dateItem = {
    isLoading: function ($viewport, $content){
        return $viewport.height() + $viewport.scrollTop() + 10 > $content.height()
    },
    createNode:function(movie){
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
            });
            return movieTypeArr.join('、');
        });
        $node.find('.detail .director').text(function () {
            var directorArr = [];
            movie.directors.forEach(function (item) {
                directorArr.push(item.name);
            })
            return directorArr.join('、');
        });
        $node.find('.detail .Starring').text(function () {
            var StarringArr = [];
            movie.casts.forEach(function (item) {
                StarringArr.push(item.name);
            })
            return StarringArr.join('、');
        });
        return $node;
    }
}

var top250 = {
    init:function(){
        console.log('top250 ok');
        this.$element = $('#top250');
        this.$cont = $('#top250 .cont');
        this.index = 0
        this.isFinish = false;
        this.isLoading = false;
        // this.bind();
        // this.start();
        //初始化
    },
    bind:function(){
        console.log('bind ok');
        var _this = this;
        this.$element.scroll(function(){
            if (!_this.isFinish && dateItem.isLoading(_this.$element, _this.$cont)) {
                _this.start();
            };
        });
    },
    start: function () {
        var _this = this
        this.getData(function (data) {
            _this.render(data)
        })
    },
    getData:function(callback){
        console.log('getDate ok');
        var _this = this;
        if(_this.isLoading)return
        _this.isLoading = true;
        $.ajax({
            url: 'http://api.douban.com/v2/movie/top250',
            type:'GET',
            data:{
                count: _this.index || 0
            },
            dataType:'jsonp'
        }).done(function(ret){
            _this.index += 10;
            if(_this.index >=ret.total){
                _this.isFinish = true;
            }
            console.log(_this.index);
            callback && callback(ret);
        }).fail(function(){
            console.log('Err')
        }).always(function(){
            _this.isLoading = false;
        })
    },
    render:function(data){
        var _this = this;
        data.subjects.forEach(function(data){
            _this.$cont.appendTo(dateItem.createNode(data));
        });
    }
}

var beimei = {
    init:function(){
        console.log('beimei ok');
        this.$element = $('#beimei')
        this.$cont = $('#beimei .cont');
        this.bind();
        this.start();
    },
    bind:function(){
        console.log('biemei bind ok')
    },
    start:function(){
        console.log('beimei start ok')
        this.getDate();
    },
    getDate:function(){
        console.log('getDate ok')
        $.ajax({
            url: 'http://api.douban.com/v2/movie/us_box',
            type: 'GET',
            dataType: 'jsonp'
        }).done(function(ret){
            console.log(ret);
        }).fail(function(){
            
        })
    }
}

var ssuo = {
    init:function(){
        console.log('ssuo ok');
    }
}

var app = {
    init:function(){
        this.tabs = $('footer div');
        this.panel = $('main section');
        this.bind();

        top250.init();
        beimei.init();
        ssuo.init();
    },
    bind:function(){
        var _this = this;
        this.tabs.on('click',function(){
            $(this).addClass('active').siblings().removeClass('active');
            _this.panel.eq($(this).index()).fadeIn().siblings().hide();
        })
    }
}
app.init();