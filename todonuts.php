<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>main</title>

	<link rel="stylesheet" href="./css/todonuts.css">
	<link rel="stylesheet" type="text/css" href="./jCal/jCal.css">
	<script src="http://code.jquery.com/jquery-2.1.1.js"></script>
	<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
	<script src="https://apis.google.com/js/client.js"></script>
	<script src="/js/googleCalendarAPI.js"></script>
	<script type="text/javascript" src="js/jquery.balloon.js"></script>
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
		<img class="image1" src="./images/donuts_icon3.gif">
		<div class="title-name"><img class="image2" src="./images/todonuts_title.gif"></div>
		<div class="my-account">
			<p id="authorizeButton" onClick="connectGC();">log inする</p>
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
					<button id="btn1" class="left"><p>＜</p></button>
					<!-- <button class="left"><p>月</p></button>
					<button class="in"><p>週</p></button>
					<button class="right"><p>日</p></button> -->
					<p id="date">2014年11月1日PM</p>
					<button id="btn2" class="right"><p>＞</p></button>
				</div>
			</div>

			<!--ここからドーナツグラフ-->
			<div id="circle-graph">
			    <div id="chart_out">
			    	<div id="old-clock"><img class="clock-board" src="./images/clock.gif"></div>
			    </div>
				<div class="chart_in" id="chart_in"></div>
			    <div id="analog-clock">
			    	<div id="hour-hand" class="transition"></div>
			    </div>
		        <!-- <div>
		            <input type="button" value="前の日" id="btn1" />
		            <input type="button" value="次の日" id="btn2" />
		            <button id="authorizeButton" onClick="connectGC();">connect</button>
		        </div> -->
		        <!-- <div id="analog-clock">
		        	<div id="numbers-container"></div>
		        	<div id="small-grad-container"></div>
		        	<div id="hour-hand" class="transition"></div>
		        </div> -->
		        
				<div id="changeBackgroundColor" ></div>

			</div>
	</div>
	
	<div id="footer">
		<h2>Tsuruhack©</h2>
	</div>
	<script type="text/javascript">
		window.onload = function(){
			connectGC();
		}

		$(document).ready(function () {
			$('#calendar').jCal();
		});
	</script>
	<script src="./js/clock.js"></script>
    <script src="./js/chart_in.js"></script>
    <script src="./js/chart_out.js"></script>
</body>

</html>