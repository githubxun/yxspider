/**
 * Created by xun on 2014/8/7.
 * 爬取的目标对象
 */
function Target(option){
    option = option || {};
    this._parent = option.parent || null;     //爬虫抓取的父级对象
    this._deep = option.deep || 0;          //当前url的深度
    this._url = option.url || "";
    this._type = option.type || null;

    this.url = function(){
        if(arguments.length>0){
            this._url = arguments[0];
        }else{
            return this._url;
        }
    };
    this.parent = function(){
        if(arguments.length>0){
            this._parent = arguments[0];
        }else{
            return this._parent;
        }
    };
    this.deep = function(){
        if(arguments.length>0){
            this._deep = arguments[0];
        }else{
            return this._deep;
        }
    };
    this.type = function(){
        if(arguments.length>0){
            this._type = arguments[0];
        }else{
            return this._type;
        }
    };
}

//向外提供接口
module.exports = Target;