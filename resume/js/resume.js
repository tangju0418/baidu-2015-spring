
window.onload = function hover(){
    var rightDiv = document.getElementById("right");
    var mainDiv = rightDiv.getElementsByTagName("div");
    for(var i=0;i<mainDiv.length;i++){
        mainDiv[i].onmouseover = function(){
            this.style.background = "#d6f8b4";
            this.style.lineHeight= "26px";
            this.style.fontSize = "20px"
        };
        mainDiv[i].onmouseout = function(){
            this.style.background = "";
            this.style.lineHeight= "24px";
            this.style.fontSize = "18px"
        };
    }
};