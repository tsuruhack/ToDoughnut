// なにかしらのデータを用意
var dataset1_out = [];
for (var i=0;i<48;i++){
	dataset1_out[i] = 1;
}

var dataset1_text_out = ["友達と遊ぶ", "宿題をやる", "妖怪ウォッチを見る", "踊る", "祈る", "寝る"];
var dataset1_text_out_mention = ["友達と遊ぶのだー", "宿題をやるぜー！", "妖怪ウォッチを見るうううう", "踊るぜえええええ", "祈る", "寝る"];
// アニメーション用にもうひとつ用意
var dataset2_out = [6, 7, 8, 9, 10, 0];
var dataset2_text_out = ["レポート", "レポート", "レポート", "レポート", "レポート"];
var dataset2_text_out_mention= ["任期満了に伴う熊本市長の３氏\nによる討論会が１日、熊本市北区\n徳王１丁目のテレ",
"うほ!!","うううううううん",
"他人からのアドバイスはいつもありがたいもの。だが時として「余計なお世話」と感じるような意味不明なもの、上から目線のものがあるのも確かだ。今回はマイナビニュース会員のうち男女300名に、仕事で人からも ……",
"say year!"]
// なにかしらのデータを用意
var dataset3_in = [19, 12, 13, 14, 15];
var dataset3_text_in = ["妖怪ウォッチ", "妖怪ウォッチ", "妖怪ウォッチ", "", "妖怪ウォッチ"];
var dataset3_text_in_mention = ["妖怪ウォッチぐへへへへ", "妖怪ウォッチぐへへへへへ", "妖怪ウォッチ", "", "妖怪ウォッチ"];
// アニメーション用にもうひとつ用意
var dataset4_in = [16, 17, 18, 19, 20];
var dataset4_text_in = ["妖怪ウォッチ", "妖怪ウォッチ", "妖怪ウォッチ", "妖怪ウォッチ", "妖怪ウォッチ"];
var dataset4_text_in_mention = ["妖怪ウォッチ", "妖怪ウォッチぬほほほほ", "妖怪ウォッチぬほほほほ", "", "妖怪ウォッチ"];
// SVGの横幅
var width = 480;

// SVGの縦幅
var height = 480;

// 円の大きさ
var radius = Math.min(width, height) / 2 - 10;

// 外側の円の大きさ
var outerRadius = radius - 10;

// 内側の円の大きさ。
// 穴をあけるときは数値を設定。0にすると穴はあかない。
var innerRadius = radius - 80;

// 色を10色用意する関数。色は下記の通り。
// #1f77b4 #ff7f0e #2ca02c #d62728 #9467bd
// #8c564b #e377c2 #7f7f7f #bcbd22 #17becf
var color = d3.scale.category10();

// 円を生成します。
// sortにnullを与えると、データの順番通りに円グラフを作成します。
// 指定しない場合は、値の大きい順になります。
// D3.jsでは関数のが引数にデータが入ります。
var pie_out = d3.layout.pie().value(function(d) {
    return d;
}).sort(null);

// 円の大きさの設定を適用します。
var arc_out = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);

// SVG作成
// selectでhtmlのタグ/class/idなどで選択します。
var svg_out = d3.select("#chart_out")

// appnedでsvgタグを追加します。
.append("svg")

// attrでタグの属性を設定します。
.attr("width", width).attr("height", height)

// appendでsvgのgタグ（グループ要素）を追加します。
// svg内で描画すると、いくつもタグができるので、まとめて動かすときに便利です。
.append("g")

// 描画場所をsvgの中央にします。
.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// 使いまわしたいので、ここで切ります。
// 描画するだけなら続けて描いても同じです。

//#btnにclickイベントを追加します。
d3.select("#btn1").on("click",function (){move_to_left();} , false);
d3.select("#btn2").on("click",function (){move_to_right();} , false);

function move_to_left(){
	gcTimedistance--;
	getEventList(arcAnime_out_left);

    
    abc.setDate(abc.getDate()-1);
    year = abc.getFullYear();
    month = abc.getMonth()+1;
    days = abc.getDate();
    $("#show-date").text(year+"年"+month+"月"+days+"日");
    if(days >= 30) $(".left").click();
    $("#c1d_"+month+"_"+days+"_"+year).addClass("selectedDay");
    $("#c1d_"+month+"_"+(days+1)+"_"+year).removeClass("selectedDay");
    
    //$("#c1d_11_4_2014").addClass("selectedDay");
    reload_graph(User1,year*10000+month*100+days);
        
}

function move_to_right(){
	gcTimedistance++;
	getEventList(arcAnime_out_right);

    $("#c1d_"+month+"_"+days+"_"+year).removeClass("selectedDay");
    abc.setDate(abc.getDate()+1);
    year = abc.getFullYear();
    month = abc.getMonth()+1;
    days = abc.getDate();
    $("#show-date").text(year+"年"+month+"月"+days+"日");
    if(days ==1) $(".right").click();
    $("#c1d_"+month+"_"+days+"_"+year).addClass("selectedDay");
    $("#c1d_"+month+"_"+(days-1)+"_"+year).removeClass("selectedDay");
    
    //$("#c1d_11_4_2014").addClass("selectedDay");
    reload_graph(User1,year*10000+month*100+days);
}


//clickイベントの関数を記述します。
function arcAnime_out_left() {
    svg_out
    .selectAll("path")
    // 新しいデータを設定します。
    .data(pie_out(gcViewdata.posi))
    // トランジションを設定するとアニメーションさせることができます。
    .transition()
    // アニメーションの秒数を設定します。
    .duration(800)
    .attr("fill", function(d, i) {
	if(gcViewdata.isNull==1){
		return "#914C35";
	}else if(gcViewdata.summary[i]==""){
		return "#914C35";//何も予定が無かった場合
	} else{
        return color(i); 
	}})
    // アニメーションの間の数値を補完します。
    .attrTween("d", function(d) {
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
            return arc_out(interpolate(t));
        };
    });

    svg_out
    .selectAll("text")
    // 新しいデータを設定します。
    .data(pie_out(gcViewdata.posi))
    //文字を更新します。
    .text(function(d ,i) {return gcViewdata.isNull==1 && i == 0 ? "予定がありません" : gcViewdata.summary[i]; })
    // トランジションを設定。
    .transition()
     // アニメーションの秒数を設定。
    .duration(800)
    // アニメーションの間の数値を補完。
    .attrTween("transform", function(d) {
        var interpolate = d3.interpolate(arc_out.centroid(this._current), arc_out.centroid(d));
        this._current = d;
        return function(t) {
                return "translate(" + interpolate(t) + ")";
        };
    });
    arcAnime(dataset3_in, dataset3_text_in);
}

//clickイベントの関数を記述します。
function arcAnime_out_right() {
	console.log('gctd:'+gcTimedistance);
    svg_out
    .selectAll("path")
    // 新しいデータを設定します。
    .data(pie_out(gcViewdata.posi))
    // トランジションを設定するとアニメーションさせることができます。
    .transition()
    // アニメーションの秒数を設定します。
    .duration(800)
	.attr("fill", function(d, i) {
	if(gcViewdata.isNull==1){
		return "#914C35";
	}else if(gcViewdata.summary[i]==""){
		return "#914C35";//何も予定が無かった場合
	} else{
        return color(i); 
	}})
    // アニメーションの間の数値を補完します。
    .attrTween("d", function(d) {
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
            return arc_out(interpolate(t));
        };
    });

    svg_out
    .selectAll("text")
    // 新しいデータを設定します。
    .data(pie_out(gcViewdata.posi))
    //文字を更新します。
    .text(function(d, i) {return gcViewdata.isNull==1 && i == 0 ? "予定がありません" : gcViewdata.summary[i]; })
    // トランジションを設定。
    .transition()
     // アニメーションの秒数を設定。
    .duration(800)
    // アニメーションの間の数値を補完。
    .attrTween("transform", function(d) {
        var interpolate = d3.interpolate(arc_out.centroid(this._current), arc_out.centroid(d));
        this._current = d;
        return function(t) {
                return "translate(" + interpolate(t) + ")";
        };
    });
    arcAnime(dataset4_in, dataset4_text_in);
}

function changeRed_out(d, i) {
   document.getElementById( "changeBackgroundColor" ).style.backgroundColor = gcViewdata.isNull == 1 ? "#914C35": color(i);
   $('#changeBackgroundColor').text(gcViewdata.isNull == 1 ? "予定がありません" : gcViewdata.description[i]);
   console.log(i);
}

function changeGray_out(d, i) {
	   document.getElementById( "changeBackgroundColor" ).style.backgroundColor = gray;
	   console.log(i);
	}


function repaintView(){
	
var g_out = svg_out

// 円はpathというタグで描画されるので、selectAllでまとめてタグを選択します。
.selectAll("path")

// dataでデータを設定します
// 円グラフの場合は、事前に準備したpieを利用しないといけません。
.data(pie_out(gcViewdata.posi))

// 要素を自動で増やす時は、enterを使用します。
.enter()
.append("g")
    .on("mouseover",  function(d, i){ changeRed_out(d, i); })
    .on("mouseout",   function(d){ changeGray(); })
	.on("click", function(d,i){ 
		gcSelected.d = d;
		gcSelected.i = i;
		
		//クリックしている場所の時刻を取得しそれをinsertのデフォルトvalueに入れる
		var std = gcNowDate;
		var p = 0;
		for(var j=0;j<i;j++){
			p += gcViewdata.posi[j];
		}
		var hoseigo = std.getTime() + (p*1000*60*15);
		var std2 = new Date();
		std2.setTime(hoseigo);
		var stdate = ToDatetimeT(std2,'datetime');
		$('#stpop').val(stdate);
		hoseigo += (1000*60*60)//endのための1時間後
		std2.setTime(hoseigo);
		stdate = ToDatetimeT(std2,'datetime');
		$('#edpop').val(stdate);
		
		if(gcViewdata.summary[i]==''){//予定をinsert
			div_show();//popupContact.jsにある 
		}//予定をupdate
	});
	
//文字と一緒に円を扱いたいので、gを追加します。
// dataとenterがあるので、データの分だけ自動で増えます。

	
g_out

// 円を描くpathを追加します。
.append("path")

// fillはsvgの塗りの属性です。
// 関数で設定するとdataとindexを使えるので、事前に用意したcolorから
// indexで色を取り出して設定します。
.attr("fill", function(d, i) {
	if(gcViewdata.isNull==1){
		return "#914C35";
	}else if(gcViewdata.summary[i]==""){
		return "#914C35";//何も予定が無かった場合
	} else{
        return color(i); 
	}})


// d属性でpathをどう描くか決めます。
// 事前に用意したarcで円を設定できるので、それを入れます。
.attr("d", arc_out)

// 今の数値を保存します。
.each(function(d) {
    this._current = d;
})
.transition()   // トランジション開始
    .duration(1000) // 1秒間でアニメーションさせる
    .attrTween("d", function(d){    // 指定した範囲で値を変化させアニメーションさせる
        var interpolate = d3.interpolate(
            { startAngle : 0, endAngle : 0 },   // 各円グラフの開始角度
            { startAngle : d.startAngle, endAngle : d.endAngle }    // 各円グラフの終了角度
        );
        return function(t){
            return arc_out(interpolate(t)); // 時間に応じて処理
        }
    });

//文字を描画します。
g_out

// 文字をを描くtextを追加します。
.append("text")

// 文字の位置を円の要素の中心にします。
.attr("transform", function(d) { return "translate(" + arc_out.centroid(d) + ")"; })

// 文字の大きさを設定します。
.attr("font-size", "10")

.attr("fill", function(d) { return "#ffffff"; })

// 文字の開始位置をセンターにします。
.style("text-anchor", "middle")

//文字の内容を入れます。
.text(function(d, i) { 
	return gcViewdata.isNull==1 && i == 0 ? "予定がありません" : gcViewdata.summary[i]; })

//eachで今の数値を保存します。
.each(function(d) {
    this._current = d;
})
.transition()   // トランジション開始
    .duration(1000) // 1秒間でアニメーションさせる
    .attrTween("d", function(d){    // 指定した範囲で値を変化させアニメーションさせる
        var interpolate = d3.interpolate(
            { startAngle : 0, endAngle : 0 },   // 各円グラフの開始角度
            { startAngle : d.startAngle, endAngle : d.endAngle }    // 各円グラフの終了角度
        );
        return function(t){
            return arc_out(interpolate(t)); // 時間に応じて処理
        }
    });
}
