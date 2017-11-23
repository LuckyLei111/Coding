var time = 0;   //初始化时间

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
    [0,120],
    [0,240],
    [120,0],
    [120,120],
    [120,240],
    [240,0],
    [240,120],
    [240,120],
)
//获取点击的div编号

var d = new Array(10);  //保存div编号
d[1]=1;d[2]=2;d[3]=3;d[4]=4;d[5]=5;d[6]=6;d[7]=7;d[8]=8;d[9]=0;

function move(id){
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
    //whereDiv函数用于找出被点击的div可以去的位置，如果返回0，表示不能移动;
    console.log('最后得到'+sd_target);
    if(sd_target != 0){
    	console.log("可移动");
    	
    	d[i] = 0;
    	d[g_divXY] = id;
    	document.querySelector('.a1')
    }else{
    	console.log('不可移动');
    }
};

function whereDiv(val){
    //判断是否可以移动函数,参数是被点击的div的编号;		
    //alert('hello'+d_mark[val].length);
    var j = 0;
    var move_flog = false;  //true时可以动,false时，不可移动;	
    for(j = 0; j < d_mark[val].length; ++j){
    	console.log('分别循环的值是'+d[d_mark[val][j]]);
    	//8的length =3
        if(d[d_mark[val][j]] == 0){
            move_flog = true;
            break;
            //如果点击的div有0时,说明div可以移动的，则跳出循环。
        }
    }
    if(move_flog == true){
        return d[d_mark[val][j]];
    }else{
        return 0;
    }
}