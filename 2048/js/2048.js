//(function(){

//// TODO: 全局变量？就算不能完全取消全局变量，能不能减少数量?
var gameExcel = [];
var emptyDivs = [];
var scores = parseInt(document.getElementById("score").innerHTML);
const row = 4;
const col = 4;
const invalidValue = "";

function addLoadEvent(func){
    var oldonload = window.onload;
    if(typeof window.onload != 'function'){
        window.onload = func;
    }
    else{
        window.onload = function(){
            oldonload();
            func();

            //alert(1);
        }
    }
}

addLoadEvent(initGridItems);
addLoadEvent(initGame);

//alert(3);
//window.onload();
//alert(3);

function initGame(){
    emptyDivs = [];
    scores = 0;
    document.getElementById("score").innerHTML = scores;
    var endPage = document.getElementById("end");
    endPage.style.display="none";
    //// TODO: 出现了很多次的4 这个魔幻数字，修改
    for(var i=0;i < row;i++) {
        for (var j = 0; j < col; j++) {
            setDivValue(gameExcel[i][j],invalidValue);
            gameExcel[i][j].innerHTML = invalidValue;
            gameExcel[i][j].setAttribute("class","myGrid");
        }
    }


    refreshEmptyDivs(emptyDivs);
    fillOneDivItem(emptyDivs);
    refreshEmptyDivs(emptyDivs);
    fillOneDivItem(emptyDivs);
}

function initGridItems() {
    var game = document.getElementById("Game");

    //// TODO: div必须要代码生成吗？
    for (var i = 0; i < row; i++) {
        var arr = [];
        for (var j = 0; j < col; j++) {
            var m = i * row + j;
            var dv = document.createElement("div");
            dv.setAttribute("id", makeElemId(m));
            game.appendChild(dv);
            arr.push(dv);
        }
        gameExcel.push(arr);
    }
}

function makeElemId(i){
    return "Grid" + i;
}

function makeClassName(i){
    return "myGrid"+" v"+i;
}

function setDivValue(divElem, value){
    divElem.setAttribute("GameValue", value);
    divElem.innerHTML = value;
    if(value === invalidValue){
        divElem.setAttribute("class", "myGrid");
    }
    else{
        divElem.setAttribute("class", makeClassName(value));
    }


}

function getDivValue(divElem){
    return divElem.getAttribute("GameValue");
}

function refreshEmptyDivs(empty_divs){
    empty_divs.length = 0;

    for(var i=0;i<row;i++){
        for(var j=0;j<col;j++){
            if(invalidValue === getDivValue(gameExcel[i][j])){
                empty_divs.push(gameExcel[i][j]);
            }
        }
    }

    return empty_divs;
}

function fillOneDivItem(empty_divs){
    var nNumber =Math.round(Math.random()*(empty_divs.length-1));
    var num=(Math.random()<0.8 ? 2 : 4);
    setDivValue(empty_divs[nNumber], num);
}

//// TODO: leftAddNum是什么意思？
//// TODO: 这个函数必须这么长？缩短
function leftMoveSum(divs) {
    var add = false;
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col-1; j++) {
            if (gameExcel[i][j].innerHTML != invalidValue && gameExcel[i][j].innerHTML == gameExcel[i][j+1].innerHTML) {
                setDivValue(gameExcel[i][j], 2 * gameExcel[i][j].innerHTML);
                setDivValue(gameExcel[i][j+1], invalidValue);

                add = true;
                scores += parseInt(getDivValue(gameExcel[i][j]));
                document.getElementById("score").innerHTML = scores;

                if((j+1)==1 && gameExcel[i][j+2].innerHTML != invalidValue && gameExcel[i][j+2].innerHTML == gameExcel[i][j+3].innerHTML){
                    setDivValue(gameExcel[i][j+2], 2 * gameExcel[i][j+2].innerHTML);
                    setDivValue(gameExcel[i][j+3], invalidValue);

                    add = true;
                    scores += parseInt(getDivValue(gameExcel[i][j+2]));
                    document.getElementById("score").innerHTML = scores;
                }
            }
        }
    }
    return add;

}

//// TODO: 修改为递归形式
//// TODO: left_move 和 up_move很像，能不能合并?
function leftMove(divs){
    var move = false;
    for(var i=0;i<row;i++){
        var m = -1;
        for (var j = 0; j < divs[i].length; ++j){
            //// TODO: 魔幻比较方式，建议修改
            if (invalidValue === getDivValue(divs[i][j])){
                if (-1 === m){
                    m = j;
                }
            }
            else{
                if (-1 != m){
                    //// TODO: 这个地方建议修改，逻辑太乱
                    setDivValue(divs[i][m], getDivValue(divs[i][j]));
                    setDivValue(divs[i][j], invalidValue);
                    m++;
                    move = true;
                }
            }
        }
    }
    return move;
}

//// TODO: leftRightReverse函数命名不合适
function rowReverse(divs){
    for (var i=0;i<row;i++){
        divs[i].reverse();
    }
    return divs;
}


//// TODO: upAddNum是什么意思？
//// TODO: 这个函数必须这么长？缩短
function upMoveSum(divs) {
    var add = false;
    for (var j = 0; j < col; j++) {
        for (var i = 0; i < row-1; i++) {
            if (gameExcel[i][j].innerHTML != invalidValue && gameExcel[i][j].innerHTML == gameExcel[i + 1][j].innerHTML) {
                setDivValue(gameExcel[i][j], 2 * gameExcel[i][j].innerHTML);
                setDivValue(gameExcel[i + 1][j], invalidValue);

                add = true;
                scores += parseInt(getDivValue(gameExcel[i][j]));
                document.getElementById("score").innerHTML = scores;

                if ((i + 1) == 1 && gameExcel[i + 2][j].innerHTML != invalidValue && gameExcel[i + 2][j].innerHTML == gameExcel[i + 3][j].innerHTML) {
                    setDivValue(gameExcel[i + 2][j], 2 * gameExcel[i + 2][j].innerHTML);
                    setDivValue(gameExcel[i+3][j], invalidValue);

                    add = true;
                    scores += parseInt(getDivValue(gameExcel[i+2][j]));
                    document.getElementById("score").innerHTML = scores;
                }
            }
        }
    }
    return add;
}


function upMove(divs){
    var move = false;
    for(var j=0;j<col;j++){
        var m = -1;
        for (var i = 0; i <row; ++i){
            if (invalidValue === getDivValue(divs[i][j])){
                if (-1 == m){
                    m = i;
                }
            }
            else{
                if (-1 != m){
                    setDivValue(divs[m][j], getDivValue(divs[i][j]));
                    setDivValue(divs[i][j],invalidValue);
                    m++;
                    move = true;
                }
            }
        }
    }
    return move;
}

function cloReverse(divs){
    for (var j=0;j<col;j++){
        for(var i=0;i<row/2;i++){
            var arr = divs[i][j];
            divs[i][j] = divs[3-i][j];
            divs[3-i][j] = arr;
        }
    }
    return divs;
}

//// TODO: 函数太长
document.onkeydown=function(e){
    e=window.event||e;

    //// TODO：相比switch case，有没有更好的方式?
    switch(e.keyCode){
        case 37: //左键
            var moveLeft = leftMove(gameExcel);
            var addLeft = leftMoveSum(gameExcel);
            leftMove(gameExcel);

            if(moveLeft || addLeft){
                refreshEmptyDivs(emptyDivs);
                fillOneDivItem(emptyDivs);
            }
            else {
                refreshEmptyDivs(emptyDivs);
                if (emptyDivs.length < 1) {
                    gameOver();
                }
            }


            break;
        case 38: //向上键
            var moveUp = upMove(gameExcel);
            var addUp = upMoveSum(gameExcel);
            upMove(gameExcel);

            if(moveUp || addUp) {
                refreshEmptyDivs(emptyDivs);
                fillOneDivItem(emptyDivs);
            }
            else {
                refreshEmptyDivs(emptyDivs);
                if (emptyDivs.length < 1) {
                    gameOver();
                }
            }
            break;

        case 39: //右键
            rowReverse(gameExcel);
            var moveRight =leftMove(gameExcel);
            var addRight =leftMoveSum(gameExcel);
            leftMove(gameExcel);
            rowReverse(gameExcel);

            if(moveRight || addRight) {
                refreshEmptyDivs(emptyDivs);
                fillOneDivItem(emptyDivs);
            }
            else {
                refreshEmptyDivs(emptyDivs);
                if (emptyDivs.length < 1) {
                    gameOver();
                }
            }
            break;

        case 40: //向下键
            cloReverse(gameExcel);
            var moveDown = upMove(gameExcel);
            var addDown = upMoveSum(gameExcel);
            upMove(gameExcel);
            cloReverse(gameExcel);

            if(moveDown || addDown) {
                refreshEmptyDivs(emptyDivs);
                fillOneDivItem(emptyDivs);
            }
            else {
                refreshEmptyDivs(emptyDivs);
                if (emptyDivs.length < 1) {
                    gameOver();
                }
            }
            break;
        default:
            break;
    }
};


function gameOver() {
    var endPage = document.getElementById("end");
    endPage.style.display="inline";
    var gameAgain = document.getElementById("again");

    gameAgain.onclick = function(){
        //// FIX: 这前面的代码为什么不在initGame中？

        initGame();
    };

}

//})();


(function() {
    var endPage = document.getElementById("end");
    endPage.style.display="inline";
    var gameAgain = document.getElementById("again");

    gameAgain.onclick = function(){
        //// FIX: 这前面的代码为什么不在initGame中？

        initGame();
    };

})();
//function Person(n){
//    var age = 0;
//    var address = "a";
//    var name = n;
//
//    return {
//        getName : function (){
//            return name;
//        },
//        changeInfo: function (a, addr){
//            age = a;
//            address = addr;
//        },
//        getAge: function (){
//            return age;
//        },
//        getAddress: function (){
//            return address;
//        },
//        getAge1: function (){
//            return age;
//        }
//    };
//}
//
//var p = Person("lsy");
//alert(p.getName());
//
//p.changeInfo(1, "b");
//alert(p.getAddress());
//alert(p.getAge());
//


//var f = function (){};
//function f(){};


//var f_test = function (){
//    alert(2);
//};  // 匿名函数对象
//f_test();



//function f111(){
//    var iii = 0;
//    alert(iii);
//
//    return function (){
//        alert(iii);
//    };
//}
//
//var bbb = f111();
//bbb();



//function sum_array(arr, sum_func){
//    var ret_arr = [];
//    for (var i = 0; i < arr.length; i = i+2){
//        ret_arr.push(sum_func(arr[i], arr[i+1]));
//    }
//
//    return ret_arr;
//}
//
//var arr_t = [0,1,2,3,4,5,6,7];


//alert(sum_array(arr_t, function (i, j){    return i + j;}));

//alert(sum_array(arr_t, function (i, j){
//    return i*j;
//}));


//alert(sum_array(arr_t, function (i){
//    return function (i1,j1){
//        i+=1;
//        return i1 + j1 + i;
//    }
//}(9)));


