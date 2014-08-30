/**
 * Created by xun on 2014/8/7.
 * 爬虫抓取数据对象
 */
function Message(message){
    message = message || {};

    this._url = message.url || "";         //抓取数据的地址
    this._time = message.time || 0;        //抓取数据总共所用时间
    this._data = message.data || null;       //抓取到的数据
    this._status = message.status || false;//是否抓取成功，默认为false
    this._error = message.error || null;
    this._deep = message.deep || 0;        //抓取数据的深度

    this.url = function(){
        if(arguments.length>0){
            this._url = arguments[0];
        }else{
            return this._url;
        }
    };
    this.time = function(){
        if(arguments.length>0){
            this._time = arguments[0];
        }else{
            return this._time;
        }
    };
    this.data = function(){
        if(arguments.length>0){
            this._data = arguments[0];
        }else{
            return this._data;
        }
    };
    this.status = function(){
        if(arguments.length>0){
            this._status = arguments[0];
        }else{
            return this._status;
        }
    };
    this.type = function(){
        if(arguments.length>0){
            this._type = arguments[0];
        }else{
            return this._type;
        }
    };
    this.size = function(){
        if(arguments.length>0){
            this._size = arguments[0];
        }else{
            return this._size;
        }
    };
    this.deep = function(){
        if(arguments.length>0){
            this._deep = arguments[0];
        }else{
            return this._deep;
        }
    };
    this.error = function(){
        if(arguments.length>0){
            this._error = arguments[0];
        }else{
            return this._error;
        }
    }
}

//向外提供接口
module.exports = Message;
