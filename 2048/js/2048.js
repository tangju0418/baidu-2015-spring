

//// TODO: 全局变量？就算不能完全取消全局变量，能不能减少数量?
var grid = [];          //// 命名方式不合适
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


function initGame(){
    emptyDivs = [];
    var endPage = document.getElementById("end");
    endPage.style.display="none";
    //// TODO: 出现了很多次的4 这个魔幻数字，修改
    for(var i=0;i < row;i++) {
        for (var j = 0; j < col; j++) {
            setDivValue(grid[i][j],invalidValue);
            grid[i][j].innerHTML = invalidValue;
            grid[i][j].setAttribute("class","myGrid");
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
        grid.push(arr);
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
}

function getDivValue(divElem){
    return divElem.getAttribute("GameValue");
}

function refreshEmptyDivs(empty_divs){
    empty_divs.length = 0;

    for(var i=0;i<row;i++){
        for(var j=0;j<col;j++){
            if(invalidValue === getDivValue(grid[i][j])){
                empty_divs.push(grid[i][j]);
            }
        }
    }

    return empty_divs;
}

function fillOneDivItem(empty_divs){
    var nNumber =Math.round(Math.random()*(empty_divs.length-1));
    var num=(Math.random()<0.8 ? 2 : 4);

    empty_divs[nNumber].innerHTML=num;
    setDivValue(empty_divs[nNumber], empty_divs[nNumber].innerHTML);
    empty_divs[nNumber].setAttribute("class",makeClassName(num));
}

//// TODO: leftAddNum是什么意思？
//// TODO: 这个函数必须这么长？缩短
function leftAddNum(divs) {
    var add = false;
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col-1; j++) {
            if (grid[i][j].innerHTML != invalidValue && grid[i][j].innerHTML == grid[i][j+1].innerHTML) {
                setDivValue(grid[i][j], 2 * grid[i][j].innerHTML);
                grid[i][j].innerHTML = getDivValue(grid[i][j]);
                grid[i][j].setAttribute("class", makeClassName(getDivValue(grid[i][j])));
                add = true;

                scores += parseInt(getDivValue(grid[i][j]));
                document.getElementById("score").innerHTML = scores;

                setDivValue(grid[i][j+1], invalidValue);
                grid[i][j+1].innerHTML = invalidValue;
                grid[i][j+1].setAttribute("class", "myGrid");
                if((j+1)==1 && grid[i][j+2].innerHTML != invalidValue && grid[i][j+2].innerHTML == grid[i][j+3].innerHTML){
                    setDivValue(grid[i][j+2], 2 * grid[i][j+2].innerHTML);
                    grid[i][j+2].innerHTML = getDivValue(grid[i][j+2]);
                    grid[i][j+2].setAttribute("class", makeClassName(getDivValue(grid[i][j+2])));
                    add = true;

                    scores += parseInt(getDivValue(grid[i][j+2]));
                    document.getElementById("score").innerHTML = scores;

                    setDivValue(grid[i][j+3], invalidValue);
                    grid[i][j+3].innerHTML = invalidValue;
                    grid[i][j+3].setAttribute("class", "myGrid");
                }
            }
        }
    }
    return add;

}

//// TODO: 修改为递归形式
//// TODO: left_move 和 up_move很像，能不能合并?
function left_move(divs){
    var move = false;
    for(var i=0;i<row;i++){
        var m = -1;
        for (var j = 0; j < divs[i].length; ++j){
            //// TODO: 魔幻比较方式，建议修改
            if (invalidValue === getDivValue(divs[i][j])){
                if (-1 == m){
                    m = j;
                }
            }
            else{
                if (-1 != m){
                    //// TODO: 这个地方建议修改，逻辑太乱
                    setDivValue(divs[i][m], getDivValue(divs[i][j]));
                    divs[i][m].innerHTML = getDivValue(divs[i][m]);
                    divs[i][m].setAttribute("class",makeClassName(getDivValue(divs[i][m])));

                    setDivValue(divs[i][j], invalidValue);
                    divs[i][j].innerHTML = invalidValue;
                    divs[i][j].setAttribute("class","myGrid");
                    m++;
                    move = true;
                }
            }
        }
    }
    return move;
}

//// TODO: 函数命名不合适
function leftRightReverse(divs){
    for (var i=0;i<row;i++){
        divs[i].reverse();
    }
    return divs;
}

//// TODO: upAddNum是什么意思？
//// TODO: 这个函数必须这么长？缩短
function upAddNum(divs) {
    var add = false;
    for (var j = 0; j < col; j++) {
        for (var i = 0; i < row-1; i++) {
            if (grid[i][j].innerHTML != invalidValue && grid[i][j].innerHTML == grid[i + 1][j].innerHTML) {
                setDivValue(grid[i][j], 2 * grid[i][j].innerHTML);
                grid[i][j].innerHTML = getDivValue(grid[i][j]);
                grid[i][j].setAttribute("class", makeClassName(getDivValue(grid[i][j])));
                add = true;

                scores += parseInt(getDivValue(grid[i][j]));
                document.getElementById("score").innerHTML = scores;

                setDivValue(grid[i + 1][j], invalidValue);
                grid[i + 1][j].innerHTML = invalidValue;
                grid[i + 1][j].setAttribute("class", "myGrid");
                if ((i + 1) == 1 && grid[i + 2][j].innerHTML != invalidValue && grid[i + 2][j].innerHTML == grid[i + 3][j].innerHTML) {
                    setDivValue(grid[i + 2][j], 2 * grid[i + 2][j].innerHTML);
                    grid[i+2][j].innerHTML = getDivValue(grid[i+2][j]);
                    grid[i+2][j].setAttribute("class", makeClassName(getDivValue(grid[i+2][j])));
                    add = true;

                    scores += parseInt(getDivValue(grid[i+2][j]));
                    document.getElementById("score").innerHTML = scores;

                    setDivValue(grid[i+3][j], invalidValue);
                    grid[i+3][j].innerHTML = invalidValue;
                    grid[i+3][j].setAttribute("class", "myGrid");
                }
            }
        }
    }
    return add;
}


function up_move(divs){
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
                    divs[m][j].innerHTML = getDivValue(divs[m][j]);
                    divs[m][j].setAttribute("class",makeClassName(getDivValue(divs[m][j])));
                    setDivValue(divs[i][j],invalidValue);
                    divs[i][j].innerHTML = invalidValue;
                    divs[i][j].setAttribute("class","myGrid");
                    m++;
                    move = true;
                }
            }
        }
    }
    return move;
}

function upDownReverse(divs){
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
            var moveLeft = left_move(grid);
            var addLeft = leftAddNum(grid);
            left_move(grid);

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
            var moveUp = up_move(grid);
            var addUp = upAddNum(grid);
            up_move(grid);

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
            leftRightReverse(grid);
            var moveRight =left_move(grid);
            var addRight =leftAddNum(grid);
            left_move(grid);
            leftRightReverse(grid);

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
            upDownReverse(grid);
            var moveDown = up_move(grid);
            var addDown = upAddNum(grid);
            up_move(grid);
            upDownReverse(grid);

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
        //// TODO: 这前面的代码为什么不在initGame中？

        initGame();
    };

}