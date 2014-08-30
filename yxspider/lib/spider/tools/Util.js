/**
 * Created by xun on 2014/8/8.
 * 工具类
 */

var util = {
    /**
     * 验证注册的爬虫事件类型是否正确
     * @param name  爬虫事件类型
     * @returns {boolean}  如果正确返回true，否则返回false
     */
    regEventType:function(name){
        var reg = /(before|success|error|complete|end)/;
        return reg.test(name);
    },
    /**
     * 获取数据类型
     * @param type
     * @param obj
     * @returns {string}
     */
    typeOf:function(obj){
        var _type = Object.prototype.toString.call(obj);
        var types = {
            '[object Null]':'null',
            '[object Undefined]':'undefined',
            '[object Number]':'number',
            '[object Array]':'array',
            '[object Object]':'object',
            '[object String]':'string',
            '[object Date]':'date',
            '[object Function]':'function',
            '[object Regexp]':'regexp',
            '[object Boolean]':'boolean'
        }
        return types[_type];
    },
    /**
     * 根据url判断数据类型
     * @param url
     */
    checkType:function(tag){
        var type = "链接";
        if(tag.name == "a"){
            type = "链接";
        }else if(tag.name == "iframe"){
            type = "链接";
        }else if(tag.name == "img"){
            type = "图片";
        }
    }
}



//向外提供接口
module.exports = util;
