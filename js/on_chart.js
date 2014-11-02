window.onload = initialize;
function initialize() {
    document.getElementById( "chart_out" ).onmousemove = changeRed;
    document.getElementById( "chart_out" ).onmouseout = changeGray;
}
function changeGray(e) {
    document.getElementById( "changeBackgroundColor" ).style.backgroundColor = "gray";
}
function changeRed() {
    document.getElementById( "changeBackgroundColor" ).style.backgroundColor = "red";
    // 出力テスト
	console.log(e);
}