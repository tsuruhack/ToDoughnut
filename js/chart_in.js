// なにかしらのデータを用意
var dataset5 = [19, 12, 13, 14, 15];
var dataset5_text_out = ["妖怪ウォッチ", "妖怪ウォッチ", "妖怪ウォッチ", "妖怪ウォッチ", "妖怪ウォッチ"];
// アニメーション用にもうひとつ用意
var dataset6 = [16, 17, 18, 19, 20];

// SVGの横幅
var width = 480;

// SVGの縦幅
var height = 480;

// 円の大きさ
var radius = Math.min(width, height) / 2 - 10;

// 外側の円の大きさ
var outerRadius = radius - 80;

// 内側の円の大きさ。
// 穴をあけるときは数値を設定。0にすると穴はあかない。
var innerRadius = radius - 150;

// 色を10色用意する関数。色は下記の通り。
// #1f77b4 #ff7f0e #2ca02c #d62728 #9467bd
// #8c564b #e377c2 #7f7f7f #bcbd22 #17becf
var color = d3.scale.category10();

// 円を生成します。
// sortにnullを与えると、データの順番通りに円グラフを作成します。
// 指定しない場合は、値の大きい順になります。
// D3.jsでは関数のが引数にデータが入ります。
var pie = d3.layout.pie().value(function(d) {
    return d;
}).sort(null);

// 円の大きさの設定を適用します。
var arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);

// SVG作成
// selectでhtmlのタグ/class/idなどで選択します。
var svg = d3.select("#chart_in")

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

var g = svg

// 円はpathというタグで描画されるので、selectAllでまとめてタグを選択します。
.selectAll("path")

// dataでデータを設定します
// 円グラフの場合は、事前に準備したpieを利用しないといけません。
.data(pie(dataset5))

// 要素を自動で増やす時は、enterを使用します。
.enter()

//文字と一緒に円を扱いたいので、gを追加します。
// dataとenterがあるので、データの分だけ自動で増えます。
.append("g");

// 円と文字を個別に設定するので、切ります。

//円を描画します。
g

// 円を描くpathを追加します。
.append("path")

// fillはsvgの塗りの属性です。
// 関数で設定するとdataとindexを使えるので、事前に用意したcolorから
// indexで色を取り出して設定します。
.attr("fill", function(d, i) {
    return color(i);
})

// d属性でpathをどう描くか決めます。
// 事前に用意したarcで円を設定できるので、それを入れます。
.attr("d", arc)

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
            return arc(interpolate(t)); // 時間に応じて処理
        }
    });

//文字を描画します。
g

// 文字をを描くtextを追加します。
.append("text")

// 文字の位置を円の要素の中心にします。
.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })

// 文字の大きさを設定します。
.attr("font-size", "10")

.attr("fill", "#ffffff")

// 文字の開始位置をセンターにします。
.style("text-anchor", "middle")

//文字の内容を入れます。
.text(function(d, i) { return dataset3_text_out[i]; })

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
            return arc(interpolate(t)); // 時間に応じて処理
        }
    });

//clickイベントの関数を記述します。
function arcAnime(newdata, newdata_text) {
    svg
    .selectAll("path")
    // 新しいデータを設定します。
    .data(pie(newdata))
    // トランジションを設定するとアニメーションさせることができます。
    .transition()
    // アニメーションの秒数を設定します。
    .duration(800)
    // アニメーションの間の数値を補完します。
    .attrTween("d", function(d) {
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
            return arc(interpolate(t));
        };
    });

    svg
    .selectAll("text")
    // 新しいデータを設定します。
    .data(pie(newdata))
    //文字を更新します。
    .text(function(d, i) { return newdata_text[i]; })
    // トランジションを設定。
    .transition()
     // アニメーションの秒数を設定。
    .duration(800)
    // アニメーションの間の数値を補完。
    .attrTween("transform", function(d) {
        var interpolate = d3.interpolate(arc.centroid(this._current), arc.centroid(d));
        this._current = d;
        return function(t) {
                return "translate(" + interpolate(t) + ")";
        };
    });

}