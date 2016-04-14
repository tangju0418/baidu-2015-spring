var grid = [];
var emptyDivs = [];

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

    for(var i=0;i<4;i++) {
        for (var j = 0; j < 4; j++) {
            setDivValue(grid[i][j], "");
            grid[i][j].innerHTML = "";
        }
    }

    refreshEmptyDivs(emptyDivs);
    fillOneDivItem(emptyDivs);
    refreshEmptyDivs(emptyDivs);
    fillOneDivItem(emptyDivs);
}

function initGridItems() {
    var game = document.getElementById("Game");

    for (var i = 0; i < 4; i++) {
        var arr = [];
        for (var j = 0; j < 4; j++) {
            var m = i * 4 + j;
            var dv = document.createElement("div");
            dv.setAttribute("class", "myGrid");

            dv.setAttribute("id", makeElemId(m));
            setDivValue(dv, "");
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

    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if("" === getDivValue(grid[i][j])){
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


function addSum(){

}


document.onkeydown=function(e){
    e=window.event||e;
    switch(e.keyCode){
        case 37: //左键

            for(var i=0;i<4;i++){
                for(var j=0;j<4;j++) {
                    if ("" === getDivValue(grid[i][j])) {
                        if (m == -1) {
                            var m = j;
                            for (var n=m; n < 4; n++) {
                                if ("" != getDivValue(grid[i][n])) {
                                    var arr = [];
                                    arr[0][0] = grid[i][m];
                                    grid[i][m] = grid[i][n];
                                    grid[i][n] = grid[i][m];

                                    m++;
                                }
                            }
                        }
                    }
                }
            }
            refreshEmptyDivs(emptyDivs);
            fillOneDivItem(emptyDivs);
            break;
        case 38: //向上键

            break;
        case 39: //右键

            break;
        case 40: //向下键

            break;
        default:
            break;
    }
};

//var arr1 = [];
//for(i = 0; i < 4;++i){
//    var arr2 = [];
//    for (j = 0; j < 4; ++j){
//        arr2.push(i*4 + j);
//    }
//
//    arr1.push(arr2);
//}


