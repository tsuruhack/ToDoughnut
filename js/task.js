
function task(num,title,date,memo,place,category){
	this.num=num;
	this.titlename=title;
	this.date=date;
	this.memo=memo;
	this.place=place;
	this.category=category;
}
function usr(num,task){
	this.num=num;
	this.task=task;
}
var User1 = [];
var i=0;

$(function(){
	//リストの動作
	$(".detail").hide();
	$(".menu").hide();
	$(".input-task").hide();
	$(".usr").click(function(){
		if($("+ul",this).css("display")=="none"){
			$("+ul",this).slideDown("fast");
			$(this).css("background-color","#555");
		}else{
			$("+ul",this).slideUp("fast");
			$(this).css("background-color","#999");
		}
	});
	$(document).on("click",".list",function(){
		if($("+.detail",this).css("display")){
			$("+.detail",this).slideDown("fast");
			$(this).addClass("point");
			$(this).removeClass("list");
			// $(this).removeAttr("class");
			// $(this).attr({"class":"point"});
		}
	});

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
			$(this).html("<h5>＋新規</h5>");
		}
	});
	//ここまでリストの動作
	//リストから新規作成するとき
	//OKボタンが押されたとき
	$(document).on("click","#simpleOK",function(){
	//	$("#form1").submit(function(){
		var task_title="タスク"+i;
		var date=$("#date").val();
		var day=date.match(/\d+/g)[0]*100+date.match(/\d+/g)[1]*1+date.match(/\d+/g)[2];
		var memo="なし";
		if($("#task-title").val()) task_title=$("#task-title").val();
		if($("#memo").val()) memo=$("#memo").val();
		

		User1.push(new task(j,task_title,day,memo,null,null,null));
		User1=_.sortBy(User1,'date');
		//console.log(User1);
		
		$(".task-icon").remove();
		for(var j=0;User1[j];j++){
			//console.log(j);
			
			task_title=User1[j].titlename;
			memo=User1[j].memo;
			day=User1[j].date;

			$(".menu").append("<div class='task-icon'><li id='task"+j+"' class='list'><h5 data-sort='name'>"+task_title+"</h5><h7 data-sort='date'>"+parseInt((day%10000)/100)+"/"+(day%100)+"</h7><button class='finish right'>完了</button></li><li id='detail"+j+"' class='detail'><h6>タスク:"+task_title+"</h6><h6>期限:"+parseInt((day%10000)/100)+"月"+(day%100)+"日<br>コメント:"+memo+"</h6></li></div>");
			$("+.detail","#task"+j).hide();

			$("#task-title").val("");
			$("#memo").val("");
		}
		i++;
	});

	$(document).on("click",".finish",function(){
		
		var n= $(this).parent("li").attr("id").substr(4,1);
		$("#detail"+n).remove();
		$("#task"+n).remove();
		User1.splice(n,1);
		//console.log(User1);
	});

	$(document).on("click",".day",function(){
		alert($(".monthName").text()+" "+this.innerHTML);
	});
});