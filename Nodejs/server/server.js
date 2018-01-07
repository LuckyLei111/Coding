var http = require('http');     //node模块
var path = require('path');     //处理路径 Linux和window
var fs = require('fs');         //用于读取文件
var url = require('url')        //文件路径解析

staticRoot()






































var server = http.createServer(function(req,res) {
    staticRoot(path.join(__dirname, 'static'), req ,res)
})

server.listen(8080);
console.log('http://localhost:8080');