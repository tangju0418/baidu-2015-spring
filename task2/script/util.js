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

alert(abObj.a);
alert(abObj.b.b1[0]);

alert(tarObj.a);      // 1
alert(tarObj.b.b1[0]);    // "hello"