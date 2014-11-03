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

function analog_clock(){
    today = new Date();
    var minute = today.getMinutes();
    var hour = today.getHours();
    $('#hour-hand').css({
        'transform':'rotate('+hour*30+minute/2+'deg)'
    });
    //console.log(hour,minute); 
    setTimeout("analog_clock()",1000);
}

$(document).ready(function(){
    analog_clock();
});

