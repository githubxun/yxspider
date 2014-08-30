/**
 * Created by xun on 2014/8/8.
 * 解析爬虫获取的数据
 */
var Target = require('../entity/Target')
    ,htmlparser = require("htmlparser")
    ,reason = require('../tools/Exception')
    ,_ = require('underscore')
    ,util = require('../tools/Util');        //工具类


function ParserData(_config){
    this.config = _config;
}

ParserData.prototype = {
    //解析数据
    parser:function(message,callback){
        var that = this;
        var result = {
            message: message
        };

        var handler = new htmlparser.DefaultHandler(
            function (error, dom) {
                if(error){
                    callback(reason.PARSER_DATA_ERROR_CODE, error);
                }else{
                    result.tags = that.fitlerTags(dom);
                    result.urls = that.fitlerUrls(dom, message);

                    callback(null, result);
                }
            }
            ,{ verbose: false, ignoreWhitespace: true, enforceEmptyTags: false }
        );
        var parser = new htmlparser.Parser(handler);
        parser.parseComplete(message.data());
    },
    //提取出配置文件中需要获取其值的节点
    fitlerTags:function(doms){
        var results = {};
        var tags = filter(this.config.content_tags_regex, doms);

        for(var i = 0,len = tags.length;i<len;i++){
            var tag = tags[i];
            if(tag.name.toLowerCase() == "meta" && tag.attribs){
                if(results['meta']){
                    results['meta'] = results['meta'] + getAttributeContent(tag);
                }else{
                    results['meta'] = getAttributeContent(tag);
                }
            }else{
                if(results[tag.name]){
                    results[tag.name] = results[tag.name] + getInnerHTML(tag).join('');
                }else{
                    results[tag.name] = getInnerHTML(tag).join('');
                }
            }
        }

        return results;
    },
    //筛选出当前抓取数据中的子地址，作为下一次抓取的目标源
    fitlerUrls:function(doms, message){
        var results = [];
        var tags = filter(this.config.url_tags_regex, doms);
        for(var i= 0,len= tags.length;i<len;i++){
            var tag = tags[i];
            if(tag.attribs){
                var url = tag.attribs.href || tag.attribs.src;
                if(url !=null && url != "" && /^(\d|\w)/.test(url)){
                    var target = new Target({
                        parent: message.url(),
                        deep: message.deep()+1,
                        type: util.checkType(tag),
                        url: url
                    });
                    results.push(target);
                }
            }
        }
        return results;
    },
    /**
     * 把data数据对象转换为target对象
     * @param data 类型可为string/array
     */
    toTarget:function(data,deep){
        if(util.typeOf(data)=="array"){
            var targets = [];
            for(var i = 0,len = data.length;i<len;i++){
                var target = new Target({url:data[i],deep:deep});
                targets.push(target);
            }
            return targets;
        }
        else if(util.typeOf(data)=="string"){
            var target = new Target({url:data,deep:deep});
            return [target];
        }
    }
}


//挑选目标节点
function filter(regex, dom){
    var tags = [];
    if(util.typeOf(dom) == "object"){
        if(dom.children){
            for(var i = 0, len= dom.children.length; i< len;i++){
                tags = tags.concat(filter(regex, dom.children[i]));
            }
        }
        if(dom.type == "tag" && regex.test(dom.name)){
            tags.push(dom);
        }
    }else if(util.typeOf(dom) == "array"){
        for(var i = 0, len=dom.length; i<len; i++){
            tags = tags.concat(filter(regex, dom[i]));
        }
    }
    return tags;
}
//获取tag中的innerHTML
function getInnerHTML(tag){
    var html = tag.data ? [tag.data] : [];
    var children = tag.children;
    if(children){
        for(var j = 0,size=children.length;j<size;j++){
            var child = children[j];
            html = html.concat(getInnerHTML(child));
        }
    }
    return html;
}
//获取tag中的attribute中的所有值
function getAttributeContent(tag){
    var content = "";
    if(tag.attribs){
        for(var key in tag.attribs){
            content = content + tag.attribs[key];
        }
    }
    return content;
}

//向外提供接口
module.exports = ParserData;

