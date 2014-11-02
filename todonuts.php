<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>main</title>
	<link rel="stylesheet" href="./todonuts.css">
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"> </script>
	<script type="text/javascript" src="http://yourdomain/jquery.js"></script>
	<script type="text/javascript" src="./jCal/jquery.animate.clip.js"></script>
	<script type="text/javascript" src="./jCal/jCal.min.js"></script>
	<link rel="stylesheet" type="text/css" href="./jCal/jCal.css">
</head>
<body>
	
	<?php
		$var="Hello World!!!";
	?>
	<div id="header">
		<!-- <a href="./test2.php">
			<div class="title-image">
				<img class="image1" src="./sharegoals02.gif">
				<div class="title-name">
					<h3> 目標を達成するアプリ</h3>
					<img class="image2" src="./sharegoalstitle.gif">
				</div>
			</div>
		</a> -->
		<h1>title</h1>
		<div class="my-account">
			<p>log inする</p>
		</div>
	</div>
	<div id="body">
		<div id="list">
			<div id="calendar" class="jcalendar-selects">
			</div>
			<div id="task-list">
				<li class="usr"><h5>ユーザ1</h5></li>
				<li id="task1" class="list"><h5>タスク1</h5></li>
				<li id="task2" class="list"><h5>タスク２</h5></li>
				<li id="task3" class="point"><h5>タスク３</h5></li>
					<li class="detail"><h6>11/4まで<br>達成率:30%<br>コメント:</h6></li>
				<li class="list new"><h5>＋新規</h5></li>
				<li class="usr"><h5>ユーザ2</h5></li>
				<li id="task4" class="list "><h5>タスク１</h5></li>
				<li id="task5" class="list"><h5>タスク２</h5></li>
				<li id="task6" class="list"><h5>ya</h5></li>
				<li id="task7" class="list"><h5>ya</h5></li>
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
		engraph.css("margin-left",(-width/2-100)+"px");
		if(windowwidth < max+300){
			$("#select-date").css("margin-left",(windowwidth/2-max)+"px");
		}else{
			$("#select-date").css("margin-left",(-width/2)+"px");
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
				console.log("a");
				if(windowwidth-300 > windowheight-100){ shorter = windowheight-100;
				}else{ shorter = windowwidth-300; }
				engraph.css("width",shorter+"px");
				width=engraph.width();
			}
			engraph.css("height",width+"px");
			engraph.css("margin-left",(-width/2-100)+"px");
			if(windowwidth < max+300){
				$("#select-date").css("margin-left",(windowwidth/2-max)+"px");
			}else{
				$("#select-date").css("margin-left",(-width/2)+"px");;
			}
		};
	</script>
</body>

</html>