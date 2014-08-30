/**
 * Created by xun on 2014/8/7.
 * 爬虫url队列
 */
var Target = require('./Target');

function Queue(){
    var queue = [];//目标队列

    this.push = function(target){
        if(target instanceof Target){
            queue[queue.length] = target;
        }else{
            //TODO 如果target不为Target对象抛出异常
        }
    };
    this.pop = function(){
        if(queue.length>0){
            return queue.splice(0,1)[0];
        }else{
            return null;
        }
    };
    this.hasNext = function(){
        return (queue.length>0);
    };
    this.next = function(){
        return this.pop();
    };
    this.size = function(){
        return queue.length;
    };
    this.getByIndex = function(index){
        return queue[index];
    };
    this.insert = function(index,data){
        queue.splice(index,0,data);
    };
    this.concat = function(arr){
        queue = queue.concat(arr);
    };
    this.containUrl = function(target){
        var status = false;
        for(var i= 0,len = queue.length;i<len;i++){
            var item = queue[i];
            if(item.url() == target.url()){
                status = true;
                break;
            }
        }
        return status;
    }
}

//向外提供接口
module.exports = Queue;