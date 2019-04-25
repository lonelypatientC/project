//格式
(function (window) {
    //定义cao框架的根
    var cao = window.cao ? window.cao : {}


    window.cao = cao;
}(window || {}));


//封装document方法
(function (window) {

    /**
     * @description DOM文档加载完成后执行回调函数
     * @param {function} callback - 执行的回调函数
     */
    window.document.myReady = function (callback) {
        if (document.addEventListener) {
            //标准浏览器及IE9以上
            document.addEventListener("DOMContentLoaded", callback, false);
        } else if (document.attachEvent) {
            //兼容IE8以下
            document.attachEvent("onreadystatechange", function () {
                if (document.readyState == "interactive") {
                    callback(window.event);
                }
            })
        } else { //其他特殊情况
            window.onload = callback;
        };
    }

}(window || {}));


//封装事件方法
(function (window) {
    var cao = window.cao ? window.cao : {}

    //事件方法兼容
    cao.EventUtil = {
        /**
         * @description 封装绑定事件的兼容处理
         * @param {HTMLElement} element - 绑定事件的标签
         * @param {string} eventType - 事件类型
         * @param {function} handler - 回调函数
         * @param {isCapture} isCapture - 是否捕获
         */
        addEvent: function (element, eventType, handler, isCapture) {
            if (element.addEventListener) {
                //标准浏览器
                // isCapture转换为boolean类型
                isCapture = isCapture ? true : false;
                element.addEventListener(eventType, handler, isCapture);
            } else if (element.attachEvent) {
                //IE 8-
                element.attachEvent('on' + eventType, function () {
                    //事件对象兼容
                    return handler.call(element, window.event);
                    //将window.event以实参形式传入handler 并将handler内部的this指向element
                });
            };
        },

        // 获取事件对象
        getEvent: function (e) {
            return e || window.event;
        },

        //获取事件源对象  
        getTarget: function (e) {
            return e.target || e.srcElement;
        },

        //阻止事件冒泡
        stopPropagation: function (e) {
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        },

        //阻止默认事件
        preventDefault: function (e) {
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
        }

    };

    //将上面定义的EventUtil对象赋值给window属性
    window.cao = cao;
}(window || {}));


//封装滑动折叠展开方法
(function (window) {
    //定义cao框架的根
    var cao = window.cao ? window.cao : {}

    /**
     * @description 向上滑动折叠的函数
     * @param {HTMLElement} element - 滑动的标签
     * @param {number} time - 动画持续时间
     * @return {undefined} 没有返回值
     **/
    cao.slideUp = function (element, time) {
        var eleHeight = element.clientHeight;
        var start = Date.now();
        var timer = setInterval(function () {
            // 每次执行时的时间
            var now = Date.now();
            //difftime 时间差
            var difftime = now - start;
            var changeH = difftime / time * eleHeight
            var nowH = eleHeight - changeH;
            element.style.height = nowH + "px";
            if (eleHeight <= changeH) {
                clearInterval(timer);
                element.style.height = eleHeight + "px";
                element.style.display = "none";
            }
        }, 1000 / 60) //一秒执行60次
    }

    /**
     * @description 向下滑动展开的函数
     * @param {HTMLElement} element - 滑动的标签
     * @param {number} time - 动画持续时间
     * @return {undefined} 没有返回值
     **/
    cao.slideDown = function (element, time) {
        element.style.display = "block";
        var eleHeight = element.clientHeight;
        element.style.height = "0"
        var start = Date.now();
        var timer = setInterval(function () {
            // 每次执行时的时间
            var now = Date.now();
            //difftime 时间差
            var difftime = now - start;
            var changeH = difftime / time * eleHeight
            var nowH = changeH;
            element.style.height = nowH + "px";
            if (eleHeight <= changeH) {
                clearInterval(timer);
                element.style.height = eleHeight + "px";
            }
        }, 1000 / 60) //一秒执行60次
    }
    window.cao = cao;
}(window || {}));

//封装数据传输相关方法
(function (window) {
    //定义cao框架的根
    var cao = window.cao ? window.cao : {}

    /**
     *
     * @description 获取url地址参数的方法
     * @param {string} key - 参数名
     * @returns {string} 匹配结果
     */
    cao.getUrlParam = function (key) {
        var reg = new RegExp(key + "=([^&]*)");
        var results = window.location.href.match(reg);
        return results ? decodeURI(results[1]) : null;
    }

    /**
     *
     * @description 获取XMLHTTPRequest对象
     * @returns {object} XMLHTTPRequest对象
     */
    cao.createXMLHttpRequest = function () {

        var xhr = null;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('MSXML2.XMLHTTP.3.0');
        }
        return xhr;
    }
    window.cao = cao;
}(window || {}));

//时间格式化
(function (window) {
    //定义cao框架的根
    var cao = window.cao ? window.cao : {}
    cao.DateFormart = function (ms) {
        if (ms < 0) {
            ms = 0;
        }
        var hour = parseInt(ms / (1000 * 3600));
        var minute = parseInt(ms / (1000 * 60)) % 60;
        var second = parseInt(ms / 1000) % 3600;
        var hourStr = "0" + hour;
        var minuteStr = "0" + minute;
        var secondStr = "0" + second;
        hourStr = hourStr.slice(-2);
        minuteStr = minuteStr.slice(-2);
        secondStr = secondStr.slice(-2);
        str = hourStr + ":" + minuteStr + ":" + secondStr;
        return str;
    }

    window.cao = cao;
}(window || {}));