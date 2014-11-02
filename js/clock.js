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