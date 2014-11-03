
function task(num,titlename,date,memo,place,category){
	this.num=num;
	this.titlename=titlename;
	this.date=date;
	this.memo=memo;
	this.place=place;
	this.category=category;
}
function usr(num,task){
	this.num=num;
	this.task=task;
}
var User1 = [new task(1,"レポート",20141103,"情報工学","H234",null),
			new task(2,"ミーティング",20141106,"","図書館",null)
			];//ユーザー1のタスクを入れる配列
//var User1=[];
var i=0,j=0;

$(function(){
	var abc = new Date();
	var year = abc.getFullYear();
	var month = abc.getMonth()+1;
	var days = abc.getDate();
	//$("#date").text(year+"年"+month+"月"+days+"日");
	$("#show-date").text(year+"年"+month+"月"+days+"日");

	for(var j=0;User1[j];j++){
			//console.log(j);
			
			task_title=User1[j].titlename;
			memo=User1[j].memo;
			day=User1[j].date;
			place=User1[j].place;
			time=User1[j].num;
			var per2d = (""+100*j+"").substr(1,2);

			$(".menu").append("<div class='task-icon'><li id='task"+per2d+"' class='list'><h5 data-sort='name'>"+task_title+"</h5><h7 data-sort='date'>"+parseInt((day%10000)/100)+"/"+(day%100)+"</h7><button class='finish right'>完了</button></li><li id='detail"+per2d+"' class='detail'><h6>タスク:"+task_title+"</h6><h6>場所:"+place+"</h6><h6>期限:"+parseInt((day%10000)/100)+"月"+(day%100)+"日<br>コメント:"+memo+"</h6><h6>目安時間:"+time+"時間</h6></li></div>");
			$("+.detail","#task"+per2d).hide();


			$("#task-title").val("");
			$("#memo").val("");
		}
	//リストの動作
	$(".detail").hide();
	$(".menu").hide();
	$(".input-task").hide();
	$(".detail-setting").hide();
	$(".usr").click(function(){
		if($("+ul",this).css("display")=="none"){
			$("+ul",this).slideDown("fast");
			$(this).css("background-color","#555");
		}else{
			$("+ul",this).slideUp("fast");
			$(this).css("background-color","#999");
		}
	});
	//リストが押されたとき、詳細を表示
	$(document).on("click",".list",function(){
		$(".detail").slideUp("fast");
		$(".point").addClass("list").removeClass("point");
		if($("+.detail",this).css("display")){
			$("+.detail",this).slideDown("fast");
			$(this).addClass("point");
			$(this).removeClass("list");
			// $(this).removeAttr("class");
			// $(this).attr({"class":"point"});
		}
	});
	//詳細を隠す
	$(document).on("click",".point",function(){
		$("+.detail",this).slideUp("fast");
			$(this).addClass("list");
			$(this).removeClass("point");
	});

	$(document).on("click",".new",function(){
		if($("+.input-task",this).css("display")=="none"){
			$("+.input-task",this).slideDown("fast");
			$(this).html("<h5>キャンセル</h5>");
		}else{
			$("+.input-task",this).slideUp("fast");
			$(this).html("<h5>＋新規タスク</h5>");
		}
	});
	//ここまでリストの動作
	//リストから新規作成するとき
	//詳細ボタンが押されたとき
	$(document).on("click","#detail-setting",function(){
		if($(".detail-setting").css("display")=="none"){
			$(".detail-setting").slideDown();
		}else{
			$(".detail-setting").slideUp();
		}
	});
	//OKボタンが押されたとき
	$(document).on("click","#simpleOK",function(){

	//	$("#form1").submit(function(){
		var task_title="タスク"+i;
		var date=$("#date").val();
		var day=date.match(/\d+/g)[0]*100+date.match(/\d+/g)[1]*1+date.match(/\d+/g)[2];
		var memo="";
		var place="";
		var	time=$("#num").val();
		if($("#task-title").val()) task_title=$("#task-title").val();
		if($("#memo").val()) memo=$("#memo").val();
		if($("#place").val()) place=$("#place").val();
		

		User1.push(new task(time,task_title,day,memo,place,null));
		User1=_.sortBy(User1,'date');
		console.log(User1);
		
		$(".task-icon").remove();
		for(var j=0;User1[j];j++){
			//console.log(j);
			
			task_title=User1[j].titlename;
			memo=User1[j].memo;
			day=User1[j].date;
			place=User1[j].place;
			time=User1[j].num;
			var per2d = (""+100*j+"").substr(1,2);

			$(".menu").append("<div class='task-icon'><li id='task"+per2d+"' class='list'><h5 data-sort='name'>"+task_title+"</h5><h7 data-sort='date'>"+parseInt((day%10000)/100)+"/"+(day%100)+"</h7><button class='finish right'>完了</button></li><li id='detail"+per2d+"' class='detail'><h6>タスク:"+task_title+"</h6><h6>場所:"+place+"</h6><h6>期限:"+parseInt((day%10000)/100)+"月"+(day%100)+"日<br>コメント:"+memo+"</h6><h6>目安時間:"+time+"時間</h6></li></div>");
			$("+.detail","#task"+per2d).hide();

			$("#task-title").val("");
			$("#memo").val("");
		}
		i++;

		//User1の配列を円グラフに描写
		cycle=12;
		dataset5 =[0,0,0,0,0,0,0,0,0,0,0,0];
		dataset5_text_out =["","","","","","","","","","","",""];
		for(var j=0;User1[j];j++){
		    dataset5_text_out[j]=User1[j].titlename;
		    dataset5[j]=parseInt(User1[j].num);
		    cycle-=User1[j].num;
		}
		dataset5[11]=cycle;
		dataset5_text_out[11]="予定がありません";
		cycle=12;
		console.log(dataset5,dataset5_text_out);

		arcAnime(dataset5,dataset5_text_out);
	});

	//完了ボタンを押してタスクを消す
	$(document).on("click",".finish",function(){
		
		var n= $(this).parent("li").attr("id").substr(4,2);
		$("#detail"+n).remove();
		$("#task"+n).remove();
		User1.splice(n,1);
		console.log($(this).parent("li").attr("id"));

		//User1の配列を円グラフに描写
		cycle=12;
		dataset5 =[0,0,0,0,0,0,0,0,0,0,0,0];
		dataset5_text_out =["","","","","","","","","","","",""];
		for(var j=0;User1[j];j++){
		    dataset5_text_out[j]=User1[j].titlename;
		    dataset5[j]=parseInt(User1[j].num);
		    cycle-=User1[j].num;
		}
		dataset5[11]=cycle;
		dataset5_text_out[11]="予定がありません";
		cycle=12;
		console.log(dataset5,dataset5_text_out,User1,n);

		arcAnime(dataset5,dataset5_text_out);
	});

	$(document).on("click",".day",function(){
		alert($(".monthName").text()+" "+this.innerHTML);
	});

		
		//circle-graphを常に正方形にする
		var max=600;
		var engraph=$("#circle-graph");
		var width=engraph.width();
		var windowwidth=window.innerWidth,windowheight=window.innerHeight;
		var shorter;


		console.log(windowwidth+" "+windowheight);
		if(windowwidth > max+300 && windowheight > max+100){
			engraph.css("width",max+"px");
			width=engraph.width();
		}else if(windowwidth >= max+300 && windowheight < max+100){
			engraph.css("width",(windowheight-100)+"px");
			width=engraph.width();
		}else if(windowwidth < max+300 && windowheight >= max+100){
			engraph.css("width",(windowwidth-300)+"px");
			width=engraph.width();
		}else{
			if(windowwidth-300 > windowheight-100){ shorter = windowheight-100;
			}else{ shorter = windowwidth-300; }
			engraph.css("width",shorter+"px");
			width=engraph.width();
		}
		engraph.css("height",width+"px");
		engraph.css("margin-left",(-width/2)+"px");
		if(windowwidth < max+300){
			$("#select-date").css("margin-left","0px");
		}else{
			$("#select-date").css("margin-left",(-width/2+100)+"px");
		}
		//画面サイズを変えたら
		window.onresize=function(){
			width=engraph.width();
			windowwidth=window.innerWidth;
			windowheight=window.innerHeight;
			//console.log(windowwidth+" "+windowheight);
			if(windowwidth >= max+300 && windowheight >= max+100){
				engraph.css("width",max+"px");
				width=engraph.width();
			}else if(windowwidth >= max+300 && windowheight < max+100){
				engraph.css("width",(windowheight-100)+"px");
				width=engraph.width();
			}else if(windowwidth < max+300 && windowheight >= max+100){
				engraph.css("width",(windowwidth-300)+"px");
				width=engraph.width();
			}else{
				if(windowwidth-300 > windowheight-100){ shorter = windowheight-100;
				}else{ shorter = windowwidth-300; }
				engraph.css("width",shorter+"px");
				width=engraph.width();
			}
			engraph.css("height",width+"px");
			engraph.css("margin-left",(-width/2)+"px");
			if(windowwidth < max+300){
				$("#select-date").css("margin-left","0px");
			}else{
				$("#select-date").css("margin-left",(-width/2+100)+"px");;
			}
		};
	//});
});