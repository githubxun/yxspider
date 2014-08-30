/**
 * Created by xun on 14-8-13.
 */
var webserver = require('webserver')
    ,server = webserver.create()
    ,config = require('../config.js')
    ,Crawl = require('./crawl');

(function PhantomServer(){
    console.log("start phantom server . . . ");
    console.log("phantom server listen to > " + config.SERVER.port);

    /**
     * Currently, the only supported option is keepAlive.
     * If set to true, the webserver will support keep-alive connections.
     * Note: servers that have keep-alive enabled must set a proper Content-Length header in their responses,
     * otherwise clients will not know when the response is finished;
     * additionally, response.close() must be called.
     */
    //var service = server.listen(fullAddress,{'keepAlive': true}, function(request, response) {
    var service = server.listen(config.SERVER.port,function(request, response) {
        console.log("====== get a new http request ======");
        var crawl = new Crawl();
        try{
            crawl.run(request, response);
            setTimeout(function(){
                crawl.stop();
                crawl = null;
            },config.SERVER.time_out)
        }catch(e){
            console.log(e);
            response.statusCode = 200;
            response.write('<html><body></body></html>');
            response.close();
        }
    });
})();


//开启phantom http服务
//PhantomServer();


