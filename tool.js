/**
 * Created by chenxiaohuan on 2016/12/27.
 */

//判断ie/7/8
function isIE() {
    var isIE6 = navigator.userAgent.toLowerCase().indexOf("msie 6") > -1; //IE6
    //判断ie6/7/8
    var ua = navigator.userAgent.toLocaleLowerCase();
    var ie = 0;
    if(ua.indexOf('ie 6') > -1 || ua.indexOf('ie 7') > -1  || ua.indexOf('ie 8') > -1 ){
        ie = 1;//判断IE 6/7/8
    }
}

//判断图片是否加载完成
function imgIsComp() {
    if(!img.complete){
        img.on('load',function(){
            //已加载完
        });
    }else{
        //未加载完
    }
}

//移动端判断是否支持html5元素
function isSupportElem() {
    var i = document.createElement("input");
    i.setAttribute("type", "date");
    return i.type !== "text"; //当浏览器不支持这个输入类型，将返回"text"。
}

//验证5个中文10个英文
function checkName(value, byteLength,obj) {
    var newvalue = value.replace(/[^\x00-\xff]/g, "**");
    var length = newvalue.length;
    if (length * 1 <=byteLength * 1){
        return;
    }
    var limitDate = newvalue.substr(0, byteLength);
    var count = 0;
    var limitvalue = "";
    for (var i = 0; i < limitDate.length; i++) {
        var flat = limitDate.substr(i, 1);
        if (flat == "*") {
            count++;
        }
    }
    var size = 0;
    var istar = newvalue.substr(byteLength * 1 - 1, 1);
    if (count % 2 == 0) {
        size = count / 2 + (byteLength * 1 - count);
        limitvalue = value.substr(0, size);
    } else {
        size = (count - 1) / 2 + (byteLength * 1 - count);
        limitvalue = value.substr(0, size);
    }
    obj.val(limitvalue);
    return;
}

//追加节点
function appendChildRoot(){
    var oFragmeng = document.createDocumentFragment();//创建文档碎片
    var html = '<span>mss</span>';
    var div = document.createElement('div');
    div.innerHTML = html;
    oFragmeng.appendChild(div);
    document.getElementById('xxx').appendChild(oFragmeng);
}

//获取指定范围内的随机数
function areaRandom(max, min){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//生成随机字母字符串
function generateRandomAlphaNum(len) {
    var rdmString = "";
    for( ; rdmString.length < len; rdmString  += Math.random().toString(36).substr(2));
    return  rdmString.substr(0, len);
}

//验证是否为数字
function isNumber(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}

//验证是否为数组
function isArray(obj){
    return Object.prototype.toString.call(obj) === '[object Array]' ;
}

//获取数组中的最大值和最小值
function getArrayMax(arr){
    //var numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411];
    //var maxInNumbers = Math.max.apply(Math, numbers);//122205
    //var minInNumbers = Math.min.apply(Math, numbers);//-85411
    return Math.max.apply(Math, arr);
}

function getArrayMin(arr){
    //var numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411];
    //var maxInNumbers = Math.max.apply(Math, numbers);//122205
    //var minInNumbers = Math.min.apply(Math, numbers);//-85411
    return Math.min.apply(Math, arr);
}


//去除字符串前后空格
function trimspace(str){
    return this.replace(/^\s+|\s+$/g, '');
}

//移除所有的’-‘
function trimlink(){
    '2016-05-25'.replace(new RegExp('-','g'),'');//20160525
}

//获取滚动条宽度
function getScrollWidth() {
    var noScroll, scroll, oDiv = document.createElement("DIV");
    oDiv.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
    noScroll = document.body.appendChild(oDiv).clientWidth;
    oDiv.style.overflowY = "scroll";
    scroll = oDiv.clientWidth;
    document.body.removeChild(oDiv);
    return noScroll-scroll;
}

//ajax
function ajax(params) {
    params = params || {};
    if (!params.url) {
        throw new Error('Necessary parameters are missing.'); //必要参数未填
    }
    var options = {
        url: params.url || '',
        type: (params.type || 'GET').toUpperCase(),
        timeout: params.timeout || 5000,
        async: true,
        complete: params.complete || function() {},
        error: params.error || function() {},
        success: params.success || function() {},
        dataType: params.dataType || 'json',
        data: params.data || {},
        jsonp: 'callback',
        jsonpCallback: ('jsonp_' + Math.random()).replace('.', '')
    };
    var formatParams = function(json) {
        var arr = [];
        for (var i in json) {
            arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(json[i]));
        }
        return arr.join("&");
    };
    if (options.dataType == 'jsonp') {
        //插入动态脚本及回调函数
        var $head = document.getElementsByTagName('head')[0];
        var $script = document.createElement('script');
        $head.appendChild($script);
        window[options.jsonpCallback] = function(json) {
            $head.removeChild($script);
            window[options.jsonpCallback] = null;
            hander && clearTimeout(hander);
            options.success(json);
            options.complete();
        };
        //发送请求
        options.data[options.jsonp] = options.jsonpCallback;
        $script.src = options.url + '?' + formatParams(options.data);
        //超时处理
        var hander = setTimeout(function() {
            $head.removeChild($script);
            window[options.jsonpCallback] = null;
            options.error();
            options.complete();
        }, options.timeout);
    } else {
        //创建xhr对象
        var xhr = new(self.XMLHttpRequest || ActiveXObject)("Microsoft.XMLHTTP");
        if (!xhr) {
            return false;
        }
        //发送请求
        options.data = formatParams(options.data);
        if (options.type == 'POST') {
            xhr.open(options.type, options.url, options.async);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            xhr.send(options.data);
        } else {
            xhr.open(options.type, options.url + '?' + options.data, options.async);
            xhr.send(null);
        }
        //超时处理
        var requestDone = false;
        setTimeout(function() {
            requestDone = true;
            if (xhr.readyState != 4) {
                xhr.abort();
            }
        }, options.timeout);
        //状态处理
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && !requestDone) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    var data = options.dataType == "xml" ? xhr.responseXML : xhr.responseText;
                    console.log(data);
                    if (options.dataType == "json") {
                        try {
                            data = JSON.parse(data);
                        } catch (e) {
                            data = eval('(' + data + ')');
                        }
                    }
                    options.success(data);
                } else {
                    options.error();
                }
                options.complete();
            }
        };
    }
}



