/**
 * Created by Administrator on 2016/10/11.
 */

(function () {
    /*
     * 事件监听工具兼容处理
     * 参数：
     *   dom:传入的节点对象
     *   eventName:事件名  如：click、mousedown...
     */
    function on(dom,eventName,fn){
        if(dom.addEventListener){    //标准模式下
            dom.addEventListener(eventName,fn);
        }else{   //IE低版本模式下
            dom.attachEvent("on" + eventName,fn);
        }
    }
    /*
     fn是一个函数定义
     */
    $.fn.lplmousewheel = function(fn){
        //this[0]    原生的节点对象
        //document   原生的节点对象
        function handler(e){
            if(e.wheelDelta==120||e.detail==-3){
                e.direction = "up";
            }else{
                e.direction = "down";
            }
            fn(e);
        }
        on(this[0],"mousewheel",handler)
        on(this[0],"DOMMouseScroll",handler)
    }
}())



