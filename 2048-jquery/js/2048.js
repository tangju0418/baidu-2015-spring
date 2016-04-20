(function(){

    var gameExcel = [];
    var emptyDivs = [];
    var fillDivs = [];
    var scores = $("#score").html();

    const row = 4;
    const col = 4;
    const invalidValue = "";
    var box_width = 100;
    var box_height = 100;
    var box_space = 10;

    $(document).ready(initGridItems);
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
        scores = 0;
        $("#score").html(scores);
        $("#end").hide();

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
                var fill = [];
                var $box = $("<div></div>").addClass("myGrid").attr({
                    'id':makeElemId(m),
                    'value': invalidValue
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
                fill.push(invalidValue);
            }
            gameExcel.push(arr);
            fillDivs.push(fill);
        }
    }

    function makeElemId(i){
        return "Grid" + i;
    }

    function makeClassName(i){
        return "myGrid"+" v"+i;
    }

    function setDivValue(idNumber, value){
        var i = Math.floor(idNumber / 4);
        var j = idNumber % 4;
        $(gameExcel[i][j]).attr("value",value);

        var $box = $("<div></div>").addClass(makeClassName(value)).html(value).attr({
            'value' : value
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
        $box.appendTo($("#Game"));
        fillDivs[i][j] = $box;
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
        var boxId = $(empty_divs[nNumber]).attr("id");
        var idNumber = parseInt(boxId.replace("Grid",""));
        setDivValue(idNumber,num);
    }

    function leftMove(divs){
        var move = false;
        for(var i=0;i<row;i++){
            var m = 0;
            for(var j=0;j<col;j++){
                if($(divs[i][j]).attr("value")=== invalidValue){
                    m++;
                }
                else {
                    if(m!=0) {
                        move = true;
                        var left = (j - m) * (box_width + box_space) + box_space;
                        $(fillDivs[i][j]).animate({
                            'left': left + 'px'
                        }, 200);
                        fillDivs[i][j - m] = fillDivs[i][j];
                        $(divs[i][j - m]).attr("value", ($(fillDivs[i][j]).attr("value")));
                        fillDivs[i][j] = invalidValue;
                        $(divs[i][j]).attr("value", invalidValue);
                    }
                }
            }
        }
        return move;
    }
    function rightMove(divs){
        var move = false;
        for(var i=0;i<row;i++){
            var m = 0;
            for(var j=col-1;j>-1;j--){
                if($(divs[i][j]).attr("value")=== invalidValue){
                    m++;
                }
                else{
                    if(m!=0) {
                        move = true;
                        var left = (j + m) * (box_width + box_space) + box_space;
                        $(fillDivs[i][j]).animate({
                            'left': left + 'px'
                        }, 200);
                        fillDivs[i][j + m] = fillDivs[i][j];
                        $(divs[i][j + m]).attr("value", $(fillDivs[i][j]).attr("value"));
                        fillDivs[i][j] = invalidValue;
                        $(divs[i][j]).attr("value", invalidValue);
                    }
                }
            }
        }
        return move;
    }
    function upMove(divs){
        var move = false;
        for(var j=0;j<col;j++){
            var m = 0;
            for(var i=0;i<row;i++){
                if($(divs[i][j]).attr("value")=== invalidValue){
                    m++;
                }
                else{
                    if(m!=0) {
                        move = true;
                        var top = (i - m) * (box_width + box_space) + box_space;
                        $(fillDivs[i][j]).animate({
                            'top': top + 'px'
                        }, 200);
                        fillDivs[i - m][j] = fillDivs[i][j];
                        $(divs[i - m][j]).attr("value", $(fillDivs[i][j]).attr("value"));
                        fillDivs[i][j] = invalidValue;
                        $(divs[i][j]).attr("value", invalidValue);
                    }
                }
            }
        }
        return move;
    }
    function downMove(divs){
        var move = false;
        for(var j=0;j<col;j++){
            var m = 0;
            for(var i=row-1;i>-1;i--){
                if($(divs[i][j]).attr("value")=== invalidValue){
                    m++;
                }
                else{
                    if(m!=0) {
                        move = true;
                        var top = (i + m) * (box_width + box_space) + box_space;
                        $(fillDivs[i][j]).animate({
                            'top': top + 'px'
                        }, 200);
                        fillDivs[i + m][j] = fillDivs[i][j];
                        $(divs[i + m][j]).attr("value", $(fillDivs[i][j]).attr("value"));
                        fillDivs[i][j] = invalidValue;
                        $(divs[i][j]).attr("value", invalidValue);
                    }
                }
            }
        }
        return move;
    }

    function changeDivValue(div,i1,j1,i2,j2){
        var val = 2*parseInt($(div[i1][j1]).attr("value"));
        $(fillDivs[i1][j1]).html(val);
        $(fillDivs[i1][j1]).attr("value",val);
        $(div[i1][j1]).attr("value",val);
        $(div[i2][j2]).attr("value",invalidValue);
        $(fillDivs[i2][j2]).remove();
        fillDivs[i2][j2] = invalidValue;
        scores += parseInt(val);
        $("#score").html(scores);
    }


    function leftMoveSum(divs) {
        var add = false;
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col-1; j++) {
                if ($(divs[i][j]).attr("value") != invalidValue && $(divs[i][j]).attr("value") === $(divs[i][j+1]).attr("value")) {
                    changeDivValue(divs, i,j,i,j+1);
                    add = true;

                    if((j+1)===1 && $(divs[i][j+2]).attr("value") != invalidValue && $(divs[i][j+2]).attr("value") === $(divs[i][j+3]).attr("value")){
                        changeDivValue(divs,i,j+2,i,j+3);
                        add = true;
                    }
                }
            }
        }
        return add;
    }
    function rightMoveSum(divs) {
        var add = false;
        for (var i = 0; i < row; i++) {
            for (var j = col-1; j > 0; j--) {
                if ($(divs[i][j]).attr("value") != invalidValue && $(divs[i][j]).attr("value") === $(divs[i][j-1]).attr("value")) {
                    changeDivValue(divs, i,j,i,j-1);
                    add = true;

                    if((j-1)===2 && $(divs[i][j-2]).attr("value") != invalidValue && $(divs[i][j-2]).attr("value") === $(divs[i][j-3]).attr("value")){
                        changeDivValue(divs,i,j-2,i,j-3);
                        add = true;
                    }
                }
            }
        }
        return add;
    }

    function upMoveSum(divs) {
        var add = false;
        for (var j = 0; j < col; j++) {
            for (var i = 0; i < row-1; i++) {

                if ($(divs[i][j]).attr("value") != invalidValue && $(divs[i][j]).attr("value") === $(divs[i+1][j]).attr("value")) {
                    changeDivValue(divs, i,j,i+1,j);
                    add = true;

                    if ((i + 1) === 1 && $(divs[i+2][j]).attr("value") != invalidValue && $(divs[i+2][j]).attr("value") === $(divs[i+3][j]).attr("value")) {
                        changeDivValue(divs,i+2,j,i+3,j);
                        add = true;
                    }
                }
            }
        }
        return add;
    }
    function downMoveSum(divs) {
        var add = false;
        for (var j = 0; j < col; j++) {
            for (var i = row-1; i > 0; i--) {

                if ($(divs[i][j]).attr("value") != invalidValue && $(divs[i][j]).attr("value") === $(divs[i-1][j]).attr("value")) {
                    changeDivValue(divs, i,j,i-1,j);
                    add = true;

                    if ((i - 1) === 2 && $(divs[i-2][j]).attr("value") != invalidValue && $(divs[i-2][j]).attr("value") === $(divs[i-3][j]).attr("value")) {
                        changeDivValue(divs,i-2,j,i-3,j);
                        add = true;
                    }
                }
            }
        }
        return add;
    }

    function gameJudgment(condition1,condition2){
        if(condition1 || condition2){
            refreshEmptyDivs(emptyDivs);
            var judgment = setTimeout(function(){ fillOneDivItem(emptyDivs);},200);
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

        var moveRight =rightMove(gameExcel);
        var addRight =rightMoveSum(gameExcel);
        rightMove(gameExcel);
        gameJudgment(moveRight,addRight);
    }

    function process_down_key_down(){
        var moveDown = downMove(gameExcel);
        var addDown = upMoveSum(gameExcel);
        downMove(gameExcel);
        gameJudgment(moveDown,addDown);
    }

    document.onkeydown=function(e) {
        e = window.event || e;

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

        for (var i = 0; i < func_mapper.length; i++) {
            if (func_mapper[i].key_code === e.keyCode) {
                func_mapper[i].func();
                break;
            }
        }
    };

    function gameOver() {
        $("#end").show();
        var $gameAgain = $("#again");

        $gameAgain.bind('click',function(){
            for (var i = 0; i < row; i++) {
                for (var j = 0; j < col; j++) {
                    fillDivs[i][j].remove();
                    fillDivs[i][j] = invalidValue;
                    $(gameExcel[i][j]).attr("value",invalidValue)
                }
            }
            initGame();
        });
    }

})();
