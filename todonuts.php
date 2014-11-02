<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>main</title>
	<link rel="stylesheet" href="./todonuts.css">
	<link rel="stylesheet" type="text/css" href="./jCal/jCal.css">
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"> </script>
	<script type="text/javascript" src="http://yourdomain/jquery.js"></script>
	<script type="text/javascript" src="./jCal/jquery.animate.clip.js"></script>
	<script type="text/javascript" src="./jCal/jCal.min.js"></script>
	<script type="text/javascript" src="./js/task.js"></script>
	<script type="text/javascript" src="./js/sort.js"></script>
</head>
<body>
	
	<?php
		$var="Hello World!!!";
	?>
	<div id="header">
		<img class="image1" src="./images/donuts_icon2.gif">
		<div class="title-name"><img class="image2" src="./images/todonuts_title.gif"></div>
		<div class="my-account">
			<p>log inする</p>
		</div>
	</div>
	<div id="body">
		<div id="list">
			<div id="calendar" class="jcalendar-selects">
			</div>
			<div id="task-list">
				<li class="list new"><h5>＋新規</h5></li>
						<li class="input-task">
							<input id="task-title" class='input' type='text' placeholder='task'>
							<input id="date" class="input" type="date" max="3000-12-31T12:00" >
							<textarea id="memo" class='input' type='input' style="height: 60px;" placeholder='memo'></textarea>
							<button id="simpleOK">OK</button>
							<button >詳細</button>
						</li>
				<li ><input class="input search" placeholder='search'/><li>
				<div id="usr1" class="usr"><h5>ユーザ1</h5></div>

				<ul id="hacker-list" class="menu">
					<!-- <li id="task1" class="list"><h5>タスク1</h5></li>
					<li id="task2" class="list"><h5>タスク２</h5></li>
					<li id="task3" class="list"><h5>タスク３</h5></li>
						<li class="detail"><h6>11/4まで<br>達成率:30%<br>コメント:</h6></li>
					 -->
				</ul>
			</div>
		</div>
		<div id="sky"></div>
		<div id="main">
			<!-- <p>Hello World</p> -->
			
			<div id="main-footer">
				<div id="select-date">
					<button class="left"><p>＜</p></button>
					<!-- <button class="left"><p>月</p></button>
					<button class="in"><p>週</p></button>
					<button class="right"><p>日</p></button> -->
					<p id="date">2014年11月1日PM</p>
					<button class="right"><p>＞</p></button>
				</div>
			</div>
			<div id="circle-graph"></div>
		</div>
	</div>
	
	<div id="footer">
		<h2>Tsuruhack©</h2>
	</div>
	<script type="text/javascript">
		$(document).ready(function () {
		$('#calendar').jCal();
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
		window.onresize=function(){
			width=engraph.width();
			windowwidth=window.innerWidth;
			windowheight=window.innerHeight;
			console.log(windowwidth+" "+windowheight);
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
	</script>
</body>

</html>