/**
 * Created by xun on 14-8-13.
 */
var webpage = require('webpage')
    ,async = require('async')
    ,config = require('../config');

function Crawl(){
    this.returned = false;
    this.page = webpage.create();
    this.page.viewportSize = config.PAGE.viewportSize;
    this.page.clipRect = config.PAGE.clipRect;
    this.page.settings = config.PAGE.settings;
    this.req = null;
    this.res = null;
}

Crawl.prototype = {
    run: function(req,res){
        console.log("start crawl data . . .");
        var that = this;
        that.req = req;
        that.res = res;
        var data = tools.parser(req);
        async.parallel({
            content:function(callback){
                that.page.open(data._url, function (status) {
                    console.log('open page '+ status);
                    callback(null,status);
                });
                that.page.onError = function(msg, trace) {
                    console.log('open page '+ msg);
                    callback(null);
                };
            }
        },function(err,result){
            that.returned = true;
            if(config.PAGE.saveImage){
                that.page.render('./yxspider_imgs/'+data._url+'.png');
            }
            res.statusCode = 200;
            res.headers = {
                'Cache': 'no-cachse',
                'Content-Type': 'text/html;charset=utf8'
                //'Connection': 'Keep-Alive',
                //'Keep-Alive': 'timeout=5, max=100',
                //'Content-Length': tools.calculateLength(content)
                //'Content-Length': content.length
            };
            var content = that.page.content;
            res.write(content);
            res.close();
            //that.page.stop();
        });
    },
    stop:function(){
        if(!this.returned){
            this.page.stop();
            this.res.statusCode = 200;
            this.res.write('<html><body></body></html>');
            this.res.close();
        }
    }
}

var tools = {
    parser:function(req){
        var post = req.post;
        return JSON.parse(post);
    }
}


module.exports = Crawl;



