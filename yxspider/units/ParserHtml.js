/**
 * Created by xun on 14-8-14.
 */
var htmlparser = require("htmlparser");

function ParserHtml(){

}

ParserHtml.prototype = {
    parser:function(html){
        var handler = new htmlparser.DefaultHandler(
            function (error, dom) {
                console.log(JSON.stringify(dom));
            }
            ,{ verbose: false, ignoreWhitespace: true, enforceEmptyTags: true }
        );
        var parser = new htmlparser.Parser(handler);
        parser.parseComplete(html);
        //sys.puts(sys.inspect(handler.dom, false, null));
    }
}


module.exports = ParserHtml;
