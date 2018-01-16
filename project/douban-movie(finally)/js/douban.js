var top250 = {
    init:function(){
        console.log('top250 ok');
        this.$element = $('#top250');
        this._index = 20
        this.bind();
        //初始化
    },
    bind:function(){
        console.log('bind ok')
        this.start();
        //事件
    },
    start:function(callback){
        console.log('start ok');
        $.ajax({
            url: 'http://api.douban.com/v2/movie/top250',
            type:'GET',
            data:{
                count: this._index || 0
            },
            dataType:'jsonp'
        }).done(function(ret){
            console.log(ret)
        }).fail(function(){
            console.log('Err')
        })
    },
    render:function(){
        //打印数据
    }
}

var beimei = {
    init:function(){
        console.log('beimei ok');
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