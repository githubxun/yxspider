/**
 * Created by xun on 2014/8/8.
 * 爬虫数据抓取监控器
 */
var async = require('async')
    ,ConnectServer = require('../net/ConnectServer')
    ,Message = require('../entity/Message')
    ,reason = require('../tools/Exception');

function CrawlMonitor(config){
    this.connectServer = new ConnectServer(config);
}

CrawlMonitor.prototype = {
    //爬虫时间计时器
    monitor:function(target, callback){
        var start = new Date();
        var message = new Message({
            url: target.url(),
            deep: target.deep()
        });
        var start = new Date().getTime();
        this.connectServer.load(target, function(status, data){
            var end = new Date().getTime();
            if(status){
                message.status(false);
                message.error(reason.message(status));
            }
            else{
                message.status(true);
                message.data(data);
            }

            message.time(end-start);
            callback(message);
        });
    }
}



//向外提供接口
module.exports = CrawlMonitor;
