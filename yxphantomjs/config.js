/**
 * Created by xun on 14-8-13.
 */

/**
 * 服务端口号
 */
exports.SERVER = {
    bat:"E:\\nodejs\\website\\node_modules\\yxphantomjs\\start.bat",
    port:9000,
    time_out:1000*60*2
}

exports.PAGE = {
    saveImage: false,
    viewportSize: { width: 1024, height: 800 },
    clipRect: {top: 0, left: 0, width: 1024, height: 800 },
    settings: {
        javascriptEnabled: false,
        loadImages: false,
        //userAgent: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.31 (KHTML, like Gecko) PhantomJS/19.0'  //phantomJS
        //userAgent: 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0;'  //IE 9.0
        userAgent: 'Opera/9.80 (Windows NT 6.1; U; en) Presto/2.8.131 Version/11.11'  //opera11.11 - windows
        //userAgent: 'Mozilla/5.0 (Windows NT 6.1; rv:2.0.1) Gecko/20100101 Firefox/4.0.1'  //Firefox 4.0.1 – Windows
        //userAgent: 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50'  //safari 5.1 – Windows
        //userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_0) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11'
    }
}

