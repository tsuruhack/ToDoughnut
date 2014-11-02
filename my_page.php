<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>D3.js サンプル</title>
<link rel="stylesheet" href="css/main.css">
<style>
.chart_in{
	position: absolute;
	top: 98px;
	left: 99px;
}
.chart_in svg{
	border-radius: 100%;
	border-color: gray;
}
.clock{
	position: absolute;
	width: 200px;
	height: 200px;
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
#changeBackgroundColor {
    width: 400px;
    padding: 30px;
    font-size: 30px;
    background-color: gray;
    color: white;
    text-align: center;
    font-size: 10px;
    border-radius: 10px;
}
#colorSelector {
    width: 360px;
    margin-top: 5px;
    text-align: center;
    font-size: 16px;
}
#colorSelectorRed {
    background-color: red;
    color: white;
}
#colorSelectorBlue {
    background-color: blue;
    color: white;
}
#colorSelectorGreen {
    background-color: green;
    color: white;
}
</style>
<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src="http://code.jquery.com/jquery-2.1.1.js"></script>
<script type="text/javascript" src="js/jquery.balloon.js"></script>
</head>
<body>
	<div class="chart_in" id="chart_in"></div>
	<div id="chart_out"></div>
        <div>
            <input type="button" value="データ1" id="btn1" />
            <input type="button" value="データ2" id="btn2" />
        </div>
        <div id="analog-clock">
        <div id="numbers-container"></div>
        <div id="small-grad-container"></div>
        <div id="hour-hand" class="transition"></div>
        </div>
        <div id="changeBackgroundColor" ></div>
        <script src="./js/clock.js"></script>
        <script src="./js/chart_in.js"></script>
        <script src="./js/chart_out.js"></script>
</body>
</html>