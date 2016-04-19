(function(){

    var gameExcel = [];
    var emptyDivs = [];
    var $scores = $("#score").html();
    const row = 4;
    const col = 4;
    const invalidValue = "";
    var box_width = 100;
    var box_height = 100;
    var box_space = 10;



    //$(document).ready(initGridItems);
    $(document).ready(initGame);

    function mapExcel(arr,func,val){
        for(var i=0;i < row;i++) {
            for(var j = 0; j < col; j++){
                func(arr[i][j],val);
            }
        }
    }
    function initGame(){
        emptyDivs = [];
        $scores = 0;
        $("#score").html($scores);
        $("#end").css("display","none");
        initGridItems();

        refreshEmptyDivs(emptyDivs);
        fillOneDivItem(emptyDivs);
        refreshEmptyDivs(emptyDivs);
        fillOneDivItem(emptyDivs);
    }

    function initGridItems() {

        for (var i = 0; i < row; i++) {
            var arr=[];
            for (var j = 0; j < col; j++) {
                var m = i*4 + j;
                //arr.push(0);
                var $box = $("<div></div>").addClass("myGrid").attr({
                    'id':makeElemId(m),
                    'value': invalidValue,
                }).css({
                    'z-index' :2,
                    'width' : box_width+'px',
                    'height' : box_height+'px',
                    'left' : (j*(box_width+box_space)+box_space)+'px',
                    'top' : (i*(box_height+box_space)+box_space)+'px',
                    'line-height' : box_height+'px'
                });
                $box.appendTo($("#Game"));
                arr.push($box);
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

    function setDivValue(boxId, value){
        var idNumber = parseInt(boxId.replace("Grid",""));
        var i = Math.floor(idNumber / 4);
        var j = idNumber % 4;
        $(gameExcel[i][j]).attr("value",value);

        var $box = $("<div></div>").addClass(makeClassName(value)).attr({
            'value': value
        }).css({
            'z-index' :3,
            'width' : '0px',
            'height' : '0px',
            'left' : (j*(box_width+box_space)+box_space+box_width/2)+'px',
            'top' : (i*(box_height+box_space)+box_space+box_height/2)+'px',
            'line-height' : box_height+'px'
        }).animate({
            'width': box_width + 'px',
            'height': box_height + 'px',
            'left': (j * (box_width + box_space) + box_space) + 'px',
            'top': (i * (box_height + box_space) + box_space) + 'px'
        },100);
        $box.html(value).appendTo($("#Game"));
    }

    function refreshEmptyDivs(empty_divs){

        empty_divs.length = 0;
        mapExcel(gameExcel,function(arr,val){
            if(val === $(arr).attr("value")){
                empty_divs.push(arr);
            }
        },invalidValue);
        return empty_divs;
    }

    function fillOneDivItem(empty_divs){
        var nNumber =Math.round(Math.random()*(empty_divs.length-1));
        var num=(Math.random()<0.8 ? 2 : 4);
        var boxId = $(empty_divs[nNumber]).attr("id").toString();

        setDivValue(boxId,num);
    }


//    function leftMoveSum(divs) {
//        var add = false;
//        for (var i = 0; i < row; i++) {
//            for (var j = 0; j < col-1; j++) {
//                if (gameExcel[i][j].innerHTML != invalidValue && gameExcel[i][j].innerHTML == gameExcel[i][j+1].innerHTML) {
//                    setDivValue(gameExcel[i][j], 2 * gameExcel[i][j].innerHTML);
//                    setDivValue(gameExcel[i][j+1], invalidValue);
//
//                    add = true;
//                    $scores += parseInt(getDivValue(gameExcel[i][j]));
//                    $("#score").html($scores);
//
//                    if((j+1)==1 && gameExcel[i][j+2].innerHTML != invalidValue && gameExcel[i][j+2].innerHTML == gameExcel[i][j+3].innerHTML){
//                        setDivValue(gameExcel[i][j+2], 2 * gameExcel[i][j+2].innerHTML);
//                        setDivValue(gameExcel[i][j+3], invalidValue);
//
//                        add = true;
//                        $scores += parseInt(getDivValue(gameExcel[i][j+2]));
//                        $("#score").html($scores);
//                    }
//                }
//            }
//        }
//        return add;
//    }
//
//    function leftMove(divs){
//        var move = false;
//        for(var i=0;i<row;i++){
//            for(var j=0;j<col-1;j++){
//                if(getDivValue(divs[i][j])=== invalidValue){
//
//                    if(leftMoveInRow(divs,i,j,j+1)){
//                        move = true;
//                    }
//                    break;
//                }
//            }
//        }
//        return move;
//    }
//
//    function leftMoveInRow(divs, i,j,index){
//        for (var column = index; column < divs[i].length; ++column){
//            if (getDivValue(divs[i][column])!= invalidValue){
//                setDivValue(divs[i][j], divs[i][column].innerHTML);
//                setDivValue(divs[i][column], invalidValue);
//
//                leftMoveInRow(divs ,i,j+1,column+1);
//                return true;
//            }
//        }
//
//        return false;
//    }
//
//    function rowReverse(divs){
//        for (var i=0;i<row;i++){
//            divs[i].reverse();
//        }
//        return divs;
//    }
//
//    function upMoveSum(divs) {
//        var add = false;
//        for (var j = 0; j < col; j++) {
//            for (var i = 0; i < row-1; i++) {
//                if (gameExcel[i][j].innerHTML != invalidValue && gameExcel[i][j].innerHTML == gameExcel[i + 1][j].innerHTML) {
//                    setDivValue(gameExcel[i][j], 2 * gameExcel[i][j].innerHTML);
//                    setDivValue(gameExcel[i + 1][j], invalidValue);
//
//                    add = true;
//                    $scores += parseInt(getDivValue(gameExcel[i][j]));
//                    $("#score").html($scores);
//
//                    if ((i + 1) == 1 && gameExcel[i + 2][j].innerHTML != invalidValue && gameExcel[i + 2][j].innerHTML == gameExcel[i + 3][j].innerHTML) {
//                        setDivValue(gameExcel[i + 2][j], 2 * gameExcel[i + 2][j].innerHTML);
//                        setDivValue(gameExcel[i+3][j], invalidValue);
//
//                        add = true;
//                        $scores += parseInt(getDivValue(gameExcel[i+2][j]));
//                        $("#score").html($scores);
//                    }
//                }
//            }
//        }
//        return add;
//    }
//
//    function upMove(divs){
//        var move = false;
//        for(var j=0;j<col;j++){
//            var m = -1;
//            for (var i = 0; i <row; ++i){
//                if (invalidValue === getDivValue(divs[i][j])){
//                    if (-1 == m){
//                        m = i;
//                    }
//                }
//                else{
//                    if (-1 != m){
//                        setDivValue(divs[m][j], getDivValue(divs[i][j]));
//                        setDivValue(divs[i][j],invalidValue);
//                        m++;
//                        move = true;
//                    }
//                }
//            }
//        }
//        return move;
//    }
//
//    function colReverse(divs){
//        for (var j=0;j<col;j++){
//            for(var i=0;i<row/2;i++){
//                var arr = divs[i][j];
//                divs[i][j] = divs[3-i][j];
//                divs[3-i][j] = arr;
//            }
//        }
//        return divs;
//    }
//
//    function gameJudgment(condition1,condition2){
//        if(condition1 || condition2){
//            refreshEmptyDivs(emptyDivs);
//            fillOneDivItem(emptyDivs);
//        }
//        else {
//            refreshEmptyDivs(emptyDivs);
//            if (emptyDivs.length < 1) {
//                gameOver();
//            }
//        }
//    }
//
//    function process_left_key_down(){
//        var moveLeft = leftMove(gameExcel);
//        var addLeft = leftMoveSum(gameExcel);
//        leftMove(gameExcel);
//        gameJudgment(moveLeft,addLeft);
//    }
//
//    function process_up_key_down(){
//        var moveUp = upMove(gameExcel);
//        var addUp = upMoveSum(gameExcel);
//        upMove(gameExcel);
//        gameJudgment(moveUp,addUp);
//    }
//
//    function process_right_key_down(){
//        rowReverse(gameExcel);
//        var moveRight =leftMove(gameExcel);
//        var addRight =leftMoveSum(gameExcel);
//        leftMove(gameExcel);
//        rowReverse(gameExcel);
//        gameJudgment(moveRight,addRight);
//    }
//
//    function process_down_key_down(){
//        colReverse(gameExcel);
//        var moveDown = upMove(gameExcel);
//        var addDown = upMoveSum(gameExcel);
//        upMove(gameExcel);
//        colReverse(gameExcel);
//        gameJudgment(moveDown,addDown);
//    }
//
//    document.onkeydown=function(e) {
//        e = window.event || e;
//
//        var func_mapper = [
//            {
//                key_code: 37,
//                func: process_left_key_down
//            },
//            {
//                key_code: 38,
//                func: process_up_key_down
//            },
//            {
//                key_code: 39,
//                func: process_right_key_down
//            },
//            {
//                key_code: 40,
//                func: process_down_key_down
//            }
//        ];
//
//        for (var i = 0; i < func_mapper.length; i++) {
//            if (func_mapper[i].key_code === e.keyCode) {
//                func_mapper[i].func();
//                break;
//            }
//        }
//    }
//
//    function gameOver() {
//        var endPage = document.getElementById("end");
//        endPage.style.display="inline";
//        var gameAgain = document.getElementById("again");
//
//        gameAgain.onclick = function(){
//            initGame();
//        };
//    }
//
})();


