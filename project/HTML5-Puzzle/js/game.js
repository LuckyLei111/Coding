var time = 0;   //初始化时间
var pause = true;

//保存div可移动的位置编号
var d_mark = new Array(
    [0],
    [2,4],
    [1,3,5],
    [2,6],
    [1,5,7],
    [2,4,6,8],
    [3,5,9],
    [4,8],
    [5,7,9],
    [6,8]
);
//保存div可移动的实际位置
var g_divXY = new Array(
    [0],
    [0,0],
    [120,0],
    [240,0],
    [0,120],
    [120,120],
    [240,120],
    [0,240],
    [120,240],
    [240,240],
);
//获取点击的div编号
var d = new Array(10);  //保存div编号;
d[1]=1;d[2]=2;d[3]=3;d[4]=4;d[5]=5;d[6]=6;d[7]=7;d[8]=8;d[9]=0;


function $(selector){
    return document.querySelector(selector);
}
function move(id){
    //点击开始计时
    if(pause == true){
        stats();
    }
    //移动函数
    var i = 1;
    for(i = 1;i<10;++i){
        if(d[i] == id)
        break;
    }
    //for循环用于找出div的位置
    console.log('点击的'+i);
    var sd_target = 0;  //保存小div的移动的位置,0表示不能移动		//i = 8
    sd_target = whereDiv(i)
    if(sd_target != 0){
        //不等于0时,则可以移动
        d[i]=0;
        d[sd_target] = id;
        $('.a'+id).style.left = g_divXY[sd_target][0]+"px";
        $('.a'+id).style.top = g_divXY[sd_target][1]+"px";
    };

    var finish_fg = true;   //设置是否完成; true为完成

    for(a = 1;a < 9; ++a){
        if(d[a] != a){
            console.log('判断d是否匹配:'+d[a]+'不等于'+a);
            var finish_fg = false;
        }
    }
    console.log(finish_fg);
    if(finish_fg == true){
        setTimeout(function(){
            alert('666');
            clearInterval(onSetTime);
        },300)
    }
};
//判断是否可以移动
function whereDiv(val){
    //判断是否可以移动函数,参数是被点击的div的编号;		
    //alert('hello'+d_mark[val].length);
    var j = 0;
    var move_flog = false;  //true时可以动,false时，不可移动;
    console.log(d_mark[val].length);
    console.log(d[d_mark[val][2]]);
    for(j = 0; j < d_mark[val].length; ++j){
        if(d[d_mark[val][j]] == 0){
            move_flog = true;
            break;
            //如果点击的div有0时,说明div可以移动的，则跳出循环。
        }
    }
    if(move_flog == true){
        console.log(d_mark[val][j])
        return d_mark[val][j];
    }else{
        return 0;
    }
}
//计时函数
function toNum(n){
    if(n.toString().length == 1){
        return '0'+n
    }else{
        return n;
    }
}
function d_timing(){
    time+=1;
    var min = parseInt(time/60);    //分钟
    var sec = time%60;
    console.log(toNum(min)+':'+toNum(sec));
    $('.time_cost').innerHTML = toNum(min)+':'+toNum(sec);
}
function stats(){
    if(pause){
        console.log('开始啦');
        $('.onff').innerHTML = "暂停";
        pause = false;
        onSetTime = setInterval(d_timing,1000);
    }else{
        console.log('暂停了')
        $('.onff').innerHTML = "开始";
        clearInterval(onSetTime);
        pause = true;
    }
}
function reset(){
    random_d();
    time = 0;
    pause = true;
    $('.time_cost').innerHTML = '00:00';
    $('.onff').innerHTML = "开始";
    if(pause == true){
        clearInterval(onSetTime);
    }
}
//随机打乱方块;
function random_d(){
    for(var i = 9; i > 1; --i){
        var num = parseInt(Math.random()*(i-1)+1);;
        console.log('d的初始编号'+d[i]);
        console.log('随机生成后的编号'+d[num]);
        if(d[i] !=0){
            $('.a'+d[i]).style.left = g_divXY[num][0]+"px";
            $('.a'+d[i]).style.top = g_divXY[num][1]+"px";
        }
        if(d[num] !=0){
            $('.a'+d[num]).style.left = g_divXY[i][0]+"px";
            $('.a'+d[num]).style.top = g_divXY[i][1]+"px";
        }
        var let = d[num];
        d[num] = d[i];
        d[i] = let;
    }
}
window.onload = function(){
    random_d();
};