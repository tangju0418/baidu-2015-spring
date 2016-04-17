(function(){

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
        }
    }
}

addLoadEvent(initGridItems);
addLoadEvent(initGame);

function mapExcel(arr,func,val){
    for(var i=0;i < row;i++) {
        for(var j = 0; j < col; j++){
            func(arr[i][j],val);
        }
    }
}
function initGame(){
    emptyDivs = [];
    scores = 0;
    document.getElementById("score").innerHTML = scores.toString();
    var endPage = document.getElementById("end");
    endPage.style.display="none";
    mapExcel(gameExcel,setDivValue,invalidValue);


    refreshEmptyDivs(emptyDivs);
    fillOneDivItem(emptyDivs);
    refreshEmptyDivs(emptyDivs);
    fillOneDivItem(emptyDivs);
}

function initGridItems() {
    var game = document.getElementById("Game");
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
    mapExcel(gameExcel,function(arr,val){
            if(val === getDivValue(arr)){
                empty_divs.push(arr);
            }
    },invalidValue);
    return empty_divs;
}

function fillOneDivItem(empty_divs){
    var nNumber =Math.round(Math.random()*(empty_divs.length-1));
    var num=(Math.random()<0.8 ? 2 : 4);
    setDivValue(empty_divs[nNumber], num);
}


function leftMoveSum(divs) {
    var add = false;
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col-1; j++) {
            if (gameExcel[i][j].innerHTML != invalidValue && gameExcel[i][j].innerHTML == gameExcel[i][j+1].innerHTML) {
                setDivValue(gameExcel[i][j], 2 * gameExcel[i][j].innerHTML);
                setDivValue(gameExcel[i][j+1], invalidValue);

                add = true;
                scores += parseInt(getDivValue(gameExcel[i][j]));
                document.getElementById("score").innerHTML = scores.toString();

                if((j+1)==1 && gameExcel[i][j+2].innerHTML != invalidValue && gameExcel[i][j+2].innerHTML == gameExcel[i][j+3].innerHTML){
                    setDivValue(gameExcel[i][j+2], 2 * gameExcel[i][j+2].innerHTML);
                    setDivValue(gameExcel[i][j+3], invalidValue);

                    add = true;
                    scores += parseInt(getDivValue(gameExcel[i][j+2]));
                    document.getElementById("score").innerHTML = scores.toString();
                }
            }
        }
    }
    return add;
}

function leftMove(divs){
    var move = false;
    for(var i=0;i<row;i++){
        for(var j=0;j<col-1;j++){
            if(getDivValue(divs[i][j])=== invalidValue){
                move = true;
                leftMoveInRow(divs,i,j,j+1);
                break;
            }
        }
    }
    return move;
}

function leftMoveInRow(divs, i,j,index){
    for (var column = index; column < divs[i].length; ++column){
        if (getDivValue(divs[i][column])!= invalidValue){
            setDivValue(divs[i][j], divs[i][column].innerHTML);
            setDivValue(divs[i][column], invalidValue);

            leftMoveInRow(divs ,i,j+1,column+1);
            return ;
        }
    }
}

function rowReverse(divs){
    for (var i=0;i<row;i++){
        divs[i].reverse();
    }
    return divs;
}

function upMoveSum(divs) {
    var add = false;
    for (var j = 0; j < col; j++) {
        for (var i = 0; i < row-1; i++) {
            if (gameExcel[i][j].innerHTML != invalidValue && gameExcel[i][j].innerHTML == gameExcel[i + 1][j].innerHTML) {
                setDivValue(gameExcel[i][j], 2 * gameExcel[i][j].innerHTML);
                setDivValue(gameExcel[i + 1][j], invalidValue);

                add = true;
                scores += parseInt(getDivValue(gameExcel[i][j]));
                document.getElementById("score").innerHTML = scores.toString();

                if ((i + 1) == 1 && gameExcel[i + 2][j].innerHTML != invalidValue && gameExcel[i + 2][j].innerHTML == gameExcel[i + 3][j].innerHTML) {
                    setDivValue(gameExcel[i + 2][j], 2 * gameExcel[i + 2][j].innerHTML);
                    setDivValue(gameExcel[i+3][j], invalidValue);

                    add = true;
                    scores += parseInt(getDivValue(gameExcel[i+2][j]));
                    document.getElementById("score").innerHTML = scores.toString();
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

function colReverse(divs){
    for (var j=0;j<col;j++){
        for(var i=0;i<row/2;i++){
            var arr = divs[i][j];
            divs[i][j] = divs[3-i][j];
            divs[3-i][j] = arr;
        }
    }
    return divs;
}

    function gameJudgment(condition1,condition2){
        if(condition1 || condition2){
            refreshEmptyDivs(emptyDivs);
            fillOneDivItem(emptyDivs);
        }
        else {
            refreshEmptyDivs(emptyDivs);
            if (emptyDivs.length < 1) {
                gameOver();
            }
        }
    }

    function process_left_key_down(){
        var moveLeft = leftMove(gameExcel);
        var addLeft = leftMoveSum(gameExcel);
        leftMove(gameExcel);
        gameJudgment(moveLeft,addLeft);
    }

    function process_up_key_down(){
        var moveUp = upMove(gameExcel);
        var addUp = upMoveSum(gameExcel);
        upMove(gameExcel);
        gameJudgment(moveUp,addUp);
    }

    function process_right_key_down(){
        rowReverse(gameExcel);
        var moveRight =leftMove(gameExcel);
        var addRight =leftMoveSum(gameExcel);
        leftMove(gameExcel);
        rowReverse(gameExcel);
        gameJudgment(moveRight,addRight);
    }

    function process_down_key_down(){
        colReverse(gameExcel);
        var moveDown = upMove(gameExcel);
        var addDown = upMoveSum(gameExcel);
        upMove(gameExcel);
        colReverse(gameExcel);
        gameJudgment(moveDown,addDown);
    }

document.onkeydown=function(e){
    e=window.event||e;

    var func_mapper = [
        {
            key_code: 37,
            func: process_left_key_down
        },
        {
            key_code: 38,
            func: process_up_key_down
        },
        {
            key_code: 39,
            func: process_right_key_down
        },
        {
            key_code: 40,
            func: process_down_key_down
        }
    ];

    for ( var i= 0;i<func_mapper.length;i++){
        if (func_mapper[i].key_code === e.keyCode){
            func_mapper[i].func();
            break;
        }
    }



    //switch(e.keyCode){
    //    case 37: //左键
    //        var moveLeft = leftMove(gameExcel);
    //        var addLeft = leftMoveSum(gameExcel);
    //        leftMove(gameExcel);
    //        gameJudgment(moveLeft,addLeft);
    //        break;
    //
    //    case 38: //向上键
    //        var moveUp = upMove(gameExcel);
    //        var addUp = upMoveSum(gameExcel);
    //        upMove(gameExcel);
    //        gameJudgment(moveUp,addUp);
    //        break;
    //
    //    case 39: //右键
    //        rowReverse(gameExcel);
    //        var moveRight =leftMove(gameExcel);
    //        var addRight =leftMoveSum(gameExcel);
    //        leftMove(gameExcel);
    //        rowReverse(gameExcel);
    //        gameJudgment(moveRight,addRight);
    //        break;
    //
    //    case 40: //向下键
    //        cloReverse(gameExcel);
    //        var moveDown = upMove(gameExcel);
    //        var addDown = upMoveSum(gameExcel);
    //        upMove(gameExcel);
    //        cloReverse(gameExcel);
    //        gameJudgment(moveDown,addDown);
    //        break;
    //
    //    default:
    //        break;
    //}
};


function gameOver() {
    var endPage = document.getElementById("end");
    endPage.style.display="inline";
    var gameAgain = document.getElementById("again");

    gameAgain.onclick = function(){
        initGame();
    };
}

})();


