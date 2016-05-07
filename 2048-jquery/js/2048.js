(function(){

    var emptyDivs = [];
    var fillDivs = [];
    var scores = $("#score").html();

    const row = 4;
    const col = 4;
    const invalidValue = "";
    var box_width = 100;
    var box_height = 100;
    var box_space = 10;
    if(document.body.clientWidth<475) {
        box_width = parseInt(window.screen.width/4.75);
        box_height = box_width;
        box_space = parseInt(box_width*0.15);
        $("#information").css({
            "width":window.screen.width-2*box_space
        });
        $("#title").css({
            "width":window.screen.width-2*box_space,
            "font-size": box_width*0.8
        });
        $("#game2048").css({
            "width":window.screen.width
        });
        $("#main").css({
            "width":window.screen.width,
            "height":window.screen.width
        });
        $("#gameScore").css({
            "width":window.screen.width*0.4,
            "font-size": box_space*2.0,
            "margin-left":-(window.screen.width*0.4+box_space)
        });
        $(".v2,.v4,.v8").css("font-size",box_width*0.18);
        $(".v16,.v32,.v64").css("font-size",box_width*0.15);
        $(".v128,.v256,.v512").css("font-size",box_width*0.11);
        $(".v1024,.v2048,.v4096").css("font-size",box_width*0.08);
    }


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
            var fill = [];
            for (var j = 0; j < col; j++) {
                var $box = $("<div></div>").addClass("myGrid").css({
                    'z-index' :2,
                    'width' : box_width+'px',
                    'height' : box_height+'px',
                    'left' : (j*(box_width+box_space)+box_space)+'px',
                    'top' : (i*(box_height+box_space)+box_space)+'px',
                    'line-height' : box_height+'px'
                });
                $box.appendTo($("#Game"));
                fill.push(invalidValue);
            }
            fillDivs.push(fill);
        }
    }

    function makeClassName(i){
        return "myGrid"+" v"+i;
    }

    function setDivValue(idNumber, value){
        var i = Math.floor(idNumber / 4);
        var j = idNumber % 4;

        var $box = $("<div></div>").addClass(makeClassName(value)).attr({
            'value' : value
        }).css({
            'z-index' :3,
            'width' : '0px',
            'height' : '0px',
            'left' : (j*(box_width+box_space)+box_space+box_width/2)+'px',
            'top' : (i*(box_height+box_space)+box_space+box_height/2)+'px',
            'line-height' : box_height+'px'
        }).appendTo($("#Game"));

        fillDivs[i][j] = $box;

        $box.delay(150).animate({
            'width': box_width + 'px',
            'height': box_height + 'px',
            'left': (j * (box_width + box_space) + box_space) + 'px',
            'top': (i * (box_height + box_space) + box_space) + 'px'
        },100,jQuery.linear ,function(){
            $box.html(value)
        })
    }

    function refreshEmptyDivs(empty_divs){
        empty_divs.length = 0;
        for(var i=0;i < row;i++) {
            for(var j = 0; j < col; j++){
                if(fillDivs[i][j]===invalidValue){
                    empty_divs.push(i*4+j);
                }
            }
        }
        return empty_divs;
    }

    function fillOneDivItem(empty_divs){
        var nNumber =Math.round(Math.random()*(empty_divs.length-1));
        var num=(Math.random()<0.8 ? 2 : 4);
        var idNumber = empty_divs[nNumber];
        setDivValue(idNumber,num);
    }

    function Moving(divs,i1,j1,i2,j2,value){
        var left = j1 * (box_width + box_space) + box_space;
        var top = i1 * (box_height + box_space) + box_space;

        var $obj_2 =  $(divs[i2][j2]);
        divs[i1][j1] = divs[i2][j2];
        divs[i2][j2] = invalidValue;

        $obj_2.animate({
            'left': left + 'px',
            'top':top +'px'
            }, 150);
    }

    function AddMoving(divs,i1,j1,i2,j2,value){
        var left = j1 * (box_width + box_space) + box_space;
        var top = i1 * (box_height + box_space) + box_space;

        var $obj_1 =  $(divs[i1][j1]);
        var $obj_2 =  $(divs[i2][j2]);
        $obj_2.attr("value",value);
        divs[i1][j1] = divs[i2][j2];
        divs[i2][j2] = invalidValue;

        scores+=parseInt(value);
        $("#score").html(scores);

        $obj_2.animate({
                'left': left + 'px',
                'top': top + 'px'
            }, 150,jQuery.linear ,function(){
            $obj_2.html(value);
            $obj_2.removeClass().addClass(makeClassName(value));
            $obj_1.remove();
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
                if(divs[i][j]=== invalidValue){
                    m++;
                }
                else {
                    box.push(divs[i][j]);
                    var len = box.length;
                    var value = $(divs[i][j]).attr("value");
                    if(len>1 && $(box[len-1]).attr("value") === $(box[len-2]).attr("value")){
                        n++;
                        box = [];
                        add = true;
                        AddMoving(divs,i,j-m-n,i,j,2*value);
                    }
                    else {
                        if(m!=0 || n!=0){
                            move = true;
                            Moving(divs,i,j-m-n,i,j,value);
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
                if(divs[i][j]=== invalidValue){
                    m++;
                }
                else {
                    box.push(divs[i][j]);
                    var len = box.length;
                    var value = $(divs[i][j]).attr("value");
                    if(len>1 && $(box[len-1]).attr("value") === $(box[len-2]).attr("value")){
                        n++;
                        box = [];
                        add = true;
                        AddMoving(divs,i,j+m+n,i,j,2*value);
                    }
                    else {
                        if(m!=0 || n!=0){
                            move = true;
                            Moving(divs,i,j+m+n,i,j,value);
                        }

                    }
                }
            }
        }
        return (move || add);
    }

    function upMove(divs){
        var move = false;
        var add = false;
        for(var j=0;j<col;j++){
            var m = 0;
            var n = 0;
            var box = [];
            for(var i=0;i<row;i++){
                if(divs[i][j]=== invalidValue){
                    m++;
                }
                else {
                    box.push(divs[i][j]);
                    var len = box.length;
                    var value = $(divs[i][j]).attr("value");
                    if(len>1 && $(box[len-1]).attr("value") === $(box[len-2]).attr("value")){
                        n++;
                        box = [];
                        add = true;
                        AddMoving(divs,i-m-n,j,i,j,2*value);
                    }
                    else {
                        if(m!=0 || n!=0){
                            move = true;
                            Moving(divs,i-m-n,j,i,j,value);
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
                if(divs[i][j]=== invalidValue){
                    m++;
                }
                else {
                    box.push(divs[i][j]);
                    var len = box.length;
                    var value = $(divs[i][j]).attr("value");
                    if(len>1 && $(box[len-1]).attr("value") === $(box[len-2]).attr("value")){
                        n++;
                        box = [];
                        add = true;
                        AddMoving(divs,i+m+n,j,i,j,2*value);
                    }
                    else {
                        if(m!=0 || n!=0){
                            move = true;
                            Moving(divs,i+m+n,j,i,j,value);
                        }
                    }
                }
            }
        }
        return (move || add);
    }

    function gameJudgment(condition){
            refreshEmptyDivs(emptyDivs);
            if(condition){
                fillOneDivItem(emptyDivs);
            }
            else {
                if (emptyDivs.length < 1) {
                    gameOver();
                }
            }
    }

    function process_left_key_down(){
        if($("#end").is(":hidden")){
            var moveLeft = leftMove(fillDivs);
            gameJudgment(moveLeft);
        }
    }

    function process_up_key_down(){
        if($("#end").is(":hidden")) {
            var moveUp = upMove(fillDivs);
            gameJudgment(moveUp);
        }
    }

    function process_right_key_down(){
        if($("#end").is(":hidden")) {
            var moveRight = rightMove(fillDivs);
            gameJudgment(moveRight);
        }
    }

    function process_down_key_down(){
        if($("#end").is(":hidden")) {
            var moveDown = downMove(fillDivs);
            gameJudgment(moveDown);
        }
    }
    $(document).ready(function() {
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
        var startx = 0;
        var starty = 0;
        var endx = 0;
        var endy = 0;

        document.onkeydown = function (e) {
            e = window.event || e;

            for (var i = 0; i < func_mapper.length; i++) {
                if (func_mapper[i].key_code === e.keyCode) {
                    func_mapper[i].func();
                    break;
                }
            }
        };
        document.addEventListener('touchstart',function(e){
            e.preventDefault();
            startx = e.touches[0].pageX;
            starty = e.touches[0].pageY;
        });
        document.addEventListener('touchend',function(e){
            e.preventDefault();
            endx = e.changedTouches[0].pageX;
            endy = e.changedTouches[0].pageY;

            var deltax=endx-startx;
            var deltay=endy-starty;
            if(Math.abs(deltax)<(0.1*box_width) && Math.abs(deltay)<(0.1*box_width)){
                if($(e.target).hasClass("btn")) {
                    $(e.target).trigger("click");
                }
                return ;
            }
            if(Math.abs(deltax)>Math.abs(deltay)){
                if(deltax>0){ // right
                    func_mapper[2].func();
                }else{  // left
                    func_mapper[0].func();
                }
            }else{
                if(deltay>0){  // bottom
                    func_mapper[3].func();
                }else{   // top
                    func_mapper[1].func();
                }
            }
        });
    });

    function gameOver() {
        $("#end").show();
        var $gameAgain = $("#again");

        $gameAgain.bind('click',function(){
            for (var i = 0; i < row; i++) {
                for (var j = 0; j < col; j++) {
                    fillDivs[i][j].remove();
                    fillDivs[i][j] = invalidValue;
                }
            }
            initGame();
        });
    }

})();
