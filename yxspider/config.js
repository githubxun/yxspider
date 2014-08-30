/**
 * Created by xun on 2014/8/7.
 * 爬虫配置文件
 */

exports.SPIDER_SERVER = {
    hostname:"127.0.0.1",
    port:9000,
    path:"/",
    method:"post",
    time_out: 1000*60*2,
    deep:5   //垂直爬取的深度
}

exports.SPIDER_BAT = {
    bat:"E:\\nodejs\\website\\node_modules\\yxphantomjs\\start.bat"//启动爬虫的bat文件地址
}

//数据分析参数配置
exports.PARSER = {
    content_tags_regex: /(meta|title|h1|h2|h3|h4|h5|label|a|div|li|td|button|area)/,    //挑选出这些标签的值
    url_tags_regex: /(img|a|iframe)/                    //抓取的目标节点
}