/**
 * Created by xun on 2014/8/8.
 * 网络访问
 */
var async = require('async')
    ,http = require('http')
    ,url = require('url')
    ,reason = require('../tools/Exception');

function ConnectServer(config){
    console.log("spider Server runing at port : " + config.port);
    this.timeOut = config.time_out || 1000*15;
    this.options = {
        hostname: config.hostname ,
        port: config.port ,
        path: config.path || '/',
        method: config.method || 'POST',
        headers:{
            "Content-Type": 'application/json'
        }
    }
}

ConnectServer.prototype = {
    load:function(target,callback){
        var returned = false;
        var data = JSON.stringify(target);

        var options = this.options;
        options.headers["Content-Length"] = new Buffer(data).length;

        var req = http.request(options, function(res) {
            returned = true;
            var data = '';
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                data = data + chunk;
            });
            res.on('end', function (chunk) {
                callback(null,data);
            });
        });

        req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
            callback(reason.GET_DATA_FROM_SPIDER_ERROR_CODE,e);
            //run();
        });

        // write data to request body
        console.log("抓取地址：" + data);
        req.write(data);
        req.end();
        //请求超时
        setTimeout(function(){
            if(!returned){
                req.abort();
                callback(reason.GET_DATA_FROM_SPIDER_TIME_OUT_CODE , {});
            }
        },this.timeOut)
    }
}


//向外提供接口
module.exports = ConnectServer;
