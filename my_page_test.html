<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>D3.js サンプル</title>
<link rel="stylesheet" href="css/main.css">
<style>
.chart_in{
	position: absolute;
	top: 8px;
}
.clock{
	position: absolute;
	top: 170px;
	left:170px;
}
div#analog-clock div.transition {
    transition: transform 0.1s ease 0s;
    -webkit-transition: -webkit-transform 0.1s ease 0;
}
div#analog-clock div.number {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 172px;
    left: 235px;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    -webkit-transform-origin: 15px 78px;
    -moz-transform-origin: 15px 78px;
}
div#analog-clock div.small-grad {
    position: absolute;
    width: 2px;
    height: 3px;
    top: 170px;
    left: 248px;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-transform-origin: 1px 79px;
    -moz-transform-origin: 1px 79px;
}
div#analog-clock div#hour-hand {
    position: absolute;
    width: 6px;
    height: 75px;
    top: 183px;
    left: 245px;
    background-color: red;
    -webkit-transform-origin: 3px 65px;
    -moz-transform-origin: 3px 65px;
    border-radius: 3px;
}
    svg { border: 1px solid black; }
</style>
<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src="http://code.jquery.com/jquery-2.1.1.js"></script>
</head>
<body>
	<div id="chart_out"></div>
	<div class="chart_in" id="chart_in"></div>
        <div>
            <input type="button" value="データ1" id="btn1" />
            <input type="button" value="データ2" id="btn2" />
        </div>
        <script src="./js/chart_out.js"></script>
        <script src="./js/chart_in.js"></script>
        <div id="analog-clock">
        <div id="numbers-container"></div>
        <div id="small-grad-container"></div>
        <div id="hour-hand" class="transition"></div>
        </div>
        <script>
        	// 目盛を初期化
var $bigGradContainer = $('#big-grad-container');
var $numberContainer = $('#numbers-container');
for (var i = 0; i < 12; i=i+3) {
    var $thisGrad = $('<div class="big-grad">');
    $thisGrad.css({
        'transform': 'rotate('+(30 * i)+'deg)'
    });
    $thisGrad.appendTo($bigGradContainer);
    var $thisNumner = $('<div class="number">');
    var $innerNumber = $('<div>');
    $thisNumner.css({
        'transform': 'rotate('+(30 * i)+'deg)'
    });
    $innerNumber.css({
        'transform': 'rotate(-'+(30 * i)+'deg)'
    });
    var nowNumber = (i > 0) ? (i) : (12);
    $innerNumber.text(nowNumber);
    $innerNumber.appendTo($thisNumner);
    $thisNumner.appendTo($numberContainer);
}
var $smallGradContainer = $('#small-grad-container');
for (var i = 0; i < 60; i = i + 3) {
    var $thisGrad = $('<div class="small-grad">');
    $thisGrad.css({
        'transform': 'rotate('+(6 * i)+'deg)'
    });
    $thisGrad.appendTo($smallGradContainer);
}

var rotateCountHour = 0;
var time = Math.floor((new Date()).getTime() / 1000);
var hour = time % (60 * 60 * 24);
if (hour == 0) {
    rotateCountHour++;
}
var rotateCountScond = 0;
var clockFunc = function(){
    var time = Math.floor((new Date()).getTime() / 1000);
    var second = time % 60;
    if (second == 0) {
        rotateCountScond ++;
    }
    $('#hour-hand').css({
        'transform':'rotate('+((360*rotateCountScond)+(360/60)*second)+'deg)'
    });
};
setInterval(clockFunc, 1000);
        </script>
</body>
</html>
