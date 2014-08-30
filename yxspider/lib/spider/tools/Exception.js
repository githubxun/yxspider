/**
 * Created by xun on 2014/8/7.
 * 异常数据库
 */
var Exception = {};

var NOT_TARGET_INSTANCE_CODE = exports.NOT_TARGET_INSTANCE_CODE = 1;
Exception[NOT_TARGET_INSTANCE_CODE] = "压入爬虫抓取目标队列的对象不是目标对象实例";

var SPIDER_TIME_OUT = exports.SPIDER_TIME_OUT = 10;
Exception[SPIDER_TIME_OUT] = "抓取目标数据超时";

var SPIDER_TIME_WRONG = exports.SPIDER_TIME_WRONG = 11;
Exception[SPIDER_TIME_WRONG] = "抓取目标数据错误";


var GET_DATA_FROM_SPIDER_ERROR_CODE = exports.GET_DATA_FROM_SPIDER_ERROR_CODE = 20;
Exception[GET_DATA_FROM_SPIDER_ERROR_CODE] = "从爬虫服务获取数据发生错误";

var GET_DATA_FROM_SPIDER_TIME_OUT_CODE = exports.GET_DATA_FROM_SPIDER_TIME_OUT_CODE = 21;
Exception[GET_DATA_FROM_SPIDER_TIME_OUT_CODE] = "从爬虫服务获取数据超时";




var PARSER_DATA_ERROR_CODE = exports.PARSER_DATA_ERROR_CODE = 30;
Exception[PARSER_DATA_ERROR_CODE] = "解析数据错误";




var SPIDER_EVENT_WRONG_TYPE = exports.SPIDER_EVENT_WRONG_TYPE = 100;
Exception[SPIDER_EVENT_WRONG_TYPE] = "注册的爬虫事件类型无效";
var SPIDER_EVENT_WRONG_FUNC = exports.SPIDER_EVENT_WRONG_FUNC = 101;
Exception[SPIDER_EVENT_WRONG_FUNC] = "注册的爬虫事件句柄无效";


//向外提供接口
exports.message = function(code){
    return Exception[code];
}
