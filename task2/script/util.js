function  isArray(arr){
    if(arr.constructor==Array){
        return true;
    }
    else{
        return false;
    }
}
function isFunction(fn){
    if(typeof(fn)=="function"){
        return true;
    }
    else{
        return false;
    }
}
function cloneObject(src){
    if(src == null||typeof(src)!='object'){
        return src;
    }
    if(src instanceof Date){
        var clone = new Date(src.getData());
        return clone;
    }
    if(src instanceof Array){
        clone=[];
        for (var i= 0;i<src.length;i++){
            clone[i]=src[i];
        }
        return clone;
    }
    if(src instanceof Object){
        clone = {};
        for(var key in src){
            clone[key]=cloneObject(src[key]);
        }
        return clone;
    }
}

var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

//alert(abObj.a);
//alert(abObj.b.b1[0]);
//
//alert(tarObj.a);      // 1
//alert(tarObj.b.b1[0]);    // "hello"

function uniqueArray(arr) {
    var newArray = [];
    for (var i in arr) {
        if (arr[i] !== '' && newArray.indexOf(arr[i]) < 0 ) {
            newArray.push(arr[i]);
        }
    }
    return newArray;
}
var a = [1, 3, 5, 7, 5, 3];
var b = uniqueArray(a);
//alert(b);
function simpleTrim(str) {
    var len = str.length;
    for (var i = 0; i < len; i++) {
        if (str[i] === ' ' || str[i] === '\t') {
        } else {
            break;
        }
    }
    if (i === len) {
        return '';
    }
    for (var j = len; j > 0; j--) {
        if (str[j - 1] === ' ' || str[j - 1] === '\t') {
        } else {
            break;
        }
    }

    return str.substring(i, j);
}
var str = '   hi!  ';
str = simpleTrim(str);
//alert(str);

function each(arr,fn){
    for(var i in arr){
       fn(arr[i],i);
    }
}
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
   // alert(index + ': ' + item)
}
each(arr, output);
