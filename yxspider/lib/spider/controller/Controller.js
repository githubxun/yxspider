/**
 * Created by xun on 2014/8/7.
 * 爬虫控制器
 */
var async = require('async')
    ,_ = require('underscore')
    ,phantom = require('yxphantomjs')
    ,reason = require('../tools/Exception')
    ,Queue = require('../entity/Queue')          //队列
    ,util = require('../tools/Util')            //工具对象
    ,CrawlData = require('./CrawlData')         //爬取数据
    ,ParserData = require('./ParserData');

function Controller(config){
    this.queue = new Queue();//队列
    this.sucessQueue = new Queue();
    this.errorQueue = new Queue();
    this.crawlData = new CrawlData(config.SPIDER_SERVER || {});   //监控器对象
    this.parserData = new ParserData(config.PARSER || {}); //数据分析对象
    this.running = false;               //当前是否正在爬取数据，默认为false
    this.status = 0;                     //0：未启动；1：爬取中；2：暂停；3：停止
    this.deep = config.SPIDER_SERVER.deep;//爬虫爬取的最大深度

    this.events = {
        before:[],//爬取每一个目标开始之前【事件数组,下同】
        success:[],//爬取每一个目标成功结束
        error:[],//爬取每一个目标失败
        complete:[],//爬取每一个目标结束【无论成功或者失败都会执行】
        end:[]//爬虫结束
    };
    //初始化默认事件
    if(config.events){
        for(var name in config.events){
            if(util.regEventType(name)){
                if(util.typeOf(config.events[name]) == "function"){
                    this.events[name].push(config.events[name]);
                }else{
                    //TODO 注册的爬虫事件句柄无效
                }
            }else{
                //TODO 注册的爬虫事件类型无效
            }
        }
    }

    //启动phantom 服务器
    phantom.run(config.SPIDER_BAT);
}

Controller.prototype = {
    /**
     * 启动爬虫
     * @param urls:['','','']
     */
    start:function(urls){
        if(arguments.length == 0){
            //TODO 传入的参数有误
            return;
        }
        var targets = this.parserData.toTarget(urls,0);
        this.queue.concat(targets);
        this.status = 0;
        this._run();
    },//启动爬虫
    _run:function(){
        var that = this;
        //循环爬取数据
        async.whilst(whilstTest,whilstTrue,whilstResult);
        //爬虫运行条件判断【以下条件停止爬虫：1.当队列中不再有待爬取目标；2.手动暂停了爬虫运行；3.手动停止了爬虫运行】
        function whilstTest(){
            var status = false;
            if(that.queue.size()>0 && that.status <2){
                status = true;
            }
            return status;
        }
        //do whilst
        function whilstTrue(callback){
            this.status = 1;
            var target = that.queue.pop();
            //已经爬取过的url不再爬取
            if(that.sucessQueue.containUrl(target)||that.errorQueue.containUrl(target)){
                callback(null);
                return;
            }
            async.waterfall([
                //运行before函数句柄
                function(callback){
                    excute('before',target);
                    callback(null);
                },
                //抓取数据
                function(callback){
                    that.crawlData.monitor(target,function(message){
                        if(message.status()){
                            that.sucessQueue.push(target);
                        }
                        else{
                            that.errorQueue.push(target);
                        }
                        callback(null, message);
                    });
                },
                //解析数据
                function(message, callback){
                    that.status = 0;
                    //抓取成功
                    if(message.status()){
                        that.parserData.parser(message ,function(status, result){
                            if(status){
                                excute('error', reason.message(status));
                            }else{
                                excute('success', result);
                                that.queue.concat(result.urls);
                            }
                            callback(null, result);
                        });
                    }
                    else{
                        excute('error', message.error());
                        callback(null);
                    }
                }
            ],function(err,result){//数据抓取结束
                excute('complete',null);
                callback();
            });
        }
        //爬虫运行结束
        function whilstResult(err){
            excute('end');
        }

        //执行句柄函数
        function excute(type,data){
            _.each(that.events[type],function(item, key, list){
                if(util.typeOf(item) == "function"){
                    item(data);
                }
            });
        }
    },//开始运行
    pause:function(){
        this.status = 2;
        this._run();
    },//暂停爬虫
    stop:function(callback){
        this.status = 3;
    },//停止爬虫
    hasNext:function(){ return (this.queue.size()>0) },//爬取队列中是否还有
    getSuccessQueue:function(){ return this.sucessQueue },//获取成功队列中的信息
    getErrorQueue:function(){ return this.errorQueue },//获取失败队列中的信息
    getCurrentQueue:function(){ return this.queue },//获取当前队列中的信息
    updateConfig:function(){},//更新配置信息
    bindEvent:function(eventName,func){
        if(util.regEventType(eventName)){
            if(util.typeOf(func) == "function"){
                this.events[eventName].push(func);
            }else{
                //TODO 注册的爬虫事件句柄无效
            }
        }else{
            //TODO 注册的爬虫事件类型无效
        }
    },
    celarEvent:function(eventName){
        if(util.regEventType(eventName)){
            this.events[eventName] = [];
        }
    },

}

//启动phantomjs服务器
function RunPhantomjs(){
    var process = require('child_process');
    process.execFile('E:\\nodejs\\website\\node_modules\\yxphantomjs\\run_phantomjs.bat',
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            else{
                console.log('exec success ');
            }
        }
    );
    return process;
}

//向外提供接口
module.exports = Controller;
