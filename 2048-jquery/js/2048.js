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
            var fill = [];
            for (var j = 0; j < col; j++) {
                var m = i*4 + j;
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

    function leftMoving(divs,i1,j1,i2,j2,value){
        var left = j1 * (box_width + box_space) + box_space;
        $(fillDivs[i2][j2]).animate({
            'left': left + 'px'
            }, 150,function(){
                fillDivs[i1][j1] = fillDivs[i2][j2];
                $(divs[i1][j1]).attr("value", value);
                fillDivs[i2][j2] = invalidValue;
                $(divs[i2][j2]).attr("value", invalidValue);
            }
        );
    }
    function leftAddMoving(divs,i1,j1,i2,j2,value){
        var left = j1 * (box_width + box_space) + box_space;
        $(fillDivs[i2][j2]).animate({
                'left': left + 'px'
            }, 150,function(){
                $(fillDivs[i2][j2]).html(value);
                $(fillDivs[i2][j2]).attr("value",value);
                $(fillDivs[i2][j2]).removeClass().addClass(makeClassName(value));
                $(fillDivs[i1][j1]).remove();

                fillDivs[i1][j1] = fillDivs[i2][j2];
                $(divs[i1][j1]).attr("value", value);
                fillDivs[i2][j2] = invalidValue;
                $(divs[i2][j2]).attr("value", invalidValue);
            }
        );
    }

    function leftMove(divs){
        var move = false;
        var add = false;
        for(var i=0;i<row;i++){
            var m = 0;
            var n = 0;
            var box = [];
            for(var j=0;j<col;j++){
                if($(divs[i][j]).attr("value")=== invalidValue){
                    m++;
                }
                else {
                    box.push(fillDivs[i][j]);
                    var len = box.length;
                    var value = $(fillDivs[i][j]).attr("value");
                    if(len>1 && $(box[len-1]).attr("value") === $(box[len-2]).attr("value")){
                        n++;
                        add = true;
                        leftAddMoving(divs,i,j-m-n,i,j,2*value);
                        box = [];
                    }
                    else {
                        if(m!=0 || n!=0){
                            move = true;
                            leftMoving(divs,i,j-m-n,i,j,value);
                        }

                    }
                }
            }
        }
        return (move || add);
    }
    function rightMove(divs){
        var move = false;
        var add = false;
        for(var i=0;i<row;i++){
            var m = 0;
            var n = 0;
            var box = [];
            for(var j=col-1;j>-1;j--){
                if($(divs[i][j]).attr("value")=== invalidValue){
                    m++;
                }
                else {
                    box.push(fillDivs[i][j]);
                    var len = box.length;
                    var value = $(fillDivs[i][j]).attr("value");
                    if(len>1 && $(box[len-1]).attr("value") === $(box[len-2]).attr("value")){
                        n++;
                        add = true;
                        leftAddMoving(divs,i,j+m+n,i,j,2*value);
                        box = [];
                    }
                    else {
                        if(m!=0 || n!=0){
                            move = true;
                            leftMoving(divs,i,j+m+n,i,j,value);
                        }

                    }
                }
            }
        }
        return (move || add);
    }
    function upMoving(divs,i1,j1,i2,j2,value){
        var up = i1 * (box_height + box_space) + box_space;
        $(fillDivs[i2][j2]).animate({
                'top': up + 'px'
            }, 150,function(){
                fillDivs[i1][j1] = fillDivs[i2][j2];
                $(divs[i1][j1]).attr("value", value);
                fillDivs[i2][j2] = invalidValue;
                $(divs[i2][j2]).attr("value", invalidValue);

            }
        );
    }
    function upAddMoving(divs,i1,j1,i2,j2,value){
        var up = i1 * (box_height + box_space) + box_space;
        $(fillDivs[i2][j2]).animate({
                'top': up + 'px'
            }, 150,function(){
                $(fillDivs[i2][j2]).html(value);
                $(fillDivs[i2][j2]).attr("value",value);
                $(fillDivs[i2][j2]).removeClass().addClass(makeClassName(value));
                $(fillDivs[i1][j1]).remove();

                fillDivs[i1][j1] = fillDivs[i2][j2];
                $(divs[i1][j1]).attr("value", value);
                fillDivs[i2][j2] = invalidValue;
                $(divs[i2][j2]).attr("value", invalidValue);

            }
        );
    }

    function upMove(divs){
        var move = false;
        var add = false;
        for(var j=0;j<col;j++){
            var m = 0;
            var n = 0;
            var box = [];
            for(var i=0;i<row;i++){
                if($(divs[i][j]).attr("value")=== invalidValue){
                    m++;
                }
                else {
                    box.push(fillDivs[i][j]);
                    var len = box.length;
                    var value = $(fillDivs[i][j]).attr("value");
                    if(len>1 && $(box[len-1]).attr("value") === $(box[len-2]).attr("value")){
                        n++;
                        add = true;
                        upAddMoving(divs,i-m-n,j,i,j,2*value);
                        box = [];
                    }
                    else {
                        if(m!=0 || n!=0){
                            move = true;
                            upMoving(divs,i-m-n,j,i,j,value);
                        }

                    }
                }
            }
        }
        return (move || add);
    }
    function downMove(divs){
        var move = false;
        var add = false;
        for(var j=0;j<col;j++){
            var m = 0;
            var n = 0;
            var box = [];
            for(var i=row-1;i>-1;i--){
                if($(divs[i][j]).attr("value")=== invalidValue){
                    m++;
                }
                else {
                    box.push(fillDivs[i][j]);
                    var len = box.length;
                    var value = $(fillDivs[i][j]).attr("value");
                    if(len>1 && $(box[len-1]).attr("value") === $(box[len-2]).attr("value")){
                        n++;
                        add = true;
                        upAddMoving(divs,i+m+n,j,i,j,2*value);
                        box = [];
                    }
                    else {
                        if(m!=0 || n!=0){
                            move = true;
                            upMoving(divs,i+m+n,j,i,j,value);
                        }

                    }
                }
            }
        }
        return (move || add);
    }



    function gameJudgment(condition){
        $("#Game").animate({
            'opacity':1
        },150,function(){
            refreshEmptyDivs(emptyDivs);
            if(condition){

                fillOneDivItem(emptyDivs);
            }
            else {
                if (emptyDivs.length < 1) {
                    gameOver();
                }
            }
        });
    }

    function process_left_key_down(){
        var moveLeft = leftMove(gameExcel);

        gameJudgment(moveLeft);
    }

    function process_up_key_down(){
        var moveUp = upMove(gameExcel);
        gameJudgment(moveUp);
    }

    function process_right_key_down(){

        var moveRight =rightMove(gameExcel);
        gameJudgment(moveRight);
    }

    function process_down_key_down(){
        var moveDown = downMove(gameExcel);
        gameJudgment(moveDown);
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
