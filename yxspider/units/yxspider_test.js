/**
 * Created by xun on 14-8-16.
 */

var Spider = require('../index')
    ,config = require('../config')
    ,fs = require('fs');


test1();
function test1(){
    config.events = {
        success:function(result){
            var status = false;
            var tags = result.tags;
            for(var key in tags){
                var content = tags[key];
                if(/变形金刚/.test(content)){
                    status = true;
                }
            }
            if(status){
                var url = result.message.url();
                fs.appendFileSync('d:/file.txt', url+"\r\n", {encoding :'utf-8'}, function (err) {
                    console.log("爬虫抓取到目标一次");
                });
            }
        },
        complete:function(){
            console.log("完成一次爬取")
        }
    }

    var spider = new Spider(config);
    spider.start(["http://dy.yunfan.com/"]);
}

