/**
 * Created by xun on 14-8-13.
 */

var http = require('http')
    ,ParserHtml = require('./ParserHtml')
    ,phantom = require('yxphantomjs');

run();
function run(){
    phantom.run({});
    setTimeout(function(){
        var data = {
            path:"http://www.baidu.com/",
            level:0
        }
        CrawlData(data);
    },2000);
}


function CrawlData(target){
    var data = JSON.stringify(target);

    var options = {
        hostname: '127.0.0.1',
        port: 5000,
        path: '/',
        method: 'POST',
        headers:{
            "Content-Type": 'application/json',
            "Content-Length": new Buffer(data).length
        }
    };

    var req = http.request(options, function(res) {
        var data = '';
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            data = data + chunk;
        });
        res.on('end', function (chunk) {
            console.log('data :' + data);
            //run();
            complete(data);
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

// write data to request body
    req.write(data);
    req.end();
}

function complete(html){
    var parserHtml = new ParserHtml();
    parserHtml.parser(html);
}
