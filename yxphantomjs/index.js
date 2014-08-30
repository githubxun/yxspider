/**
 * 向外提供phantomjs的启动接口
 */
var spawn = require('child_process').spawn
    ,fs = require('fs')
    ,config = require('./config').SERVER
    ,ls = null;

var index = module.exports = {
    /**
     * 启动phantomjs爬虫服务
     */
    run:function(_config){
        config = _config ? _config : config;
        // 点号表示当前文件所在路径
        //var path = fs.realpathSync('.')+"\\node_modules\\phantomjs";
        //var path = fs.realpathSync('.');
        //console.log("file path : "+ path);
        console.log('start phantom server');
        ls = spawn('cmd', ['/s', '/c',config.bat]);
        ls.stdout.on('data', function (data) {
            console.log('phantom server start success !');
            //console.log(data.toString());
        });
        ls.stderr.on('data', function (data) {
            console.log('phantom server start error !');
            console.log(data.toString());
        });
        ls.on('close', function (code) {
            console.log('phantom server closed !');
            console.log('child process exited with code ' + code);
        });
    }
}

//index.run();
