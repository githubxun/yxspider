
var Controller = require('./lib/spider/controller/Controller');

//爬虫对象
function Spider(config){
    this.controller = new Controller(config||{});
}

//原型链上的方法
Spider.prototype = {
    //启动爬虫
    start:function(urls){
        var that = this;
        setTimeout(function(){
            that.controller.start(urls);
        },2000);
    },
    //暂停爬虫
    pause:function(){this.controller.pause();},
    //停止爬虫
    stop:function(){this.controller.stop();},
    //爬取队列中是否还有
    hasNext:function(){return this.controller.hasNext();},
    //爬取每一个目标开始之前
    onBefore:function(func){this.bindEvent("before", func);},
    //爬取每一个目标成功
    onSuccess:function(){this.bindEvent("success", func);},
    //爬取每一个目标失败
    onError:function(){this.bindEvent("error", func);},
    //爬取每一个目标结束【无论成功或者失败都会执行】
    onComplete:function(){this.bindEvent("complete", func);},
    //爬虫结束
    onEnd:function(){this.bindEvent("end", func);},
    bindEvent:function(eventName, func){this.controller.bindEvent(eventName, func);},
    //获取成功队列中的信息
    getSuccessQueue:function(){return this.controller.getSuccessQueue();},
    //获取失败队列中的信息
    getErrorQueue:function(){return this.controller.getErrorQueue();},
    //获取当前队列中的信息
    getCurrentQueue:function(){return this.controller.getQueue();},
    //更新配置信息
    updateConfig:function(config){this.controller.updateConfig(config);}
}


//向外提供唯一接口
module.exports = Spider;

