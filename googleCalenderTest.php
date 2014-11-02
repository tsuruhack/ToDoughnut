<html>
<head>
<script src="https://apis.google.com/js/client.js"></script>
<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
<script type="text/javascript">
var gcCalendarID;
var gcEventList = [];
var gcEventDetails = [];
var sequence = 0;

/* カレンダーへのアクセス権を取得 */
function authorizeCalender(callback1,callback2) {
  var config = {
    'client_id': '250599556001-feoo7v16q3dfqcgn535fnbbjmn95nuj3.apps.googleusercontent.com',
    'scope': 'https://www.googleapis.com/auth/calendar'
  };
  gapi.auth.authorize(config, function(authResult) {
	var authorizeButton = document.getElementById('authorizeButton');
    console.log('login complete');
    console.log(gapi.auth.getToken());
	if(authResult && !authResult.error){
      authorizeButton.style.visibility = 'hidden';
      callback1(callback2);
    }else{
      authorizeButton.style.visibility = '';
      authorizeButton.onclick = handleAuthClick;
    }
  });
}
/* カレンダーIDや名前を取得*/
function getCalenderList(callback){
  gapi.client.load('calendar', 'v3', function(){
    // リクエストメソッド設定(パラメータなし)
    var request = gapi.client.calendar.calendarList.list();
    // リクエスト実行
    request.execute(function(resp){
      console.debug(resp);
      for (var i in resp.items){
        // カレンダーIDとカレンダー名を表示
        console.debug('id:' + resp.items[i].id + ' summary:' + resp.items[i].summary);
		gcCalendarID = resp.items[0].id
      }
	  if(callback) callback();
    });
  });
}
/* イベントの一覧を取得する */
function getEventList(callback){
	gcEventList = [];
	var today = new Date();
    var endDay = new Date(today.getTime() + 60 * 86400000);
  gapi.client.load('calendar', 'v3', function(){
    // リクエストメソッド＆パラメータを設定
    var request = gapi.client.calendar.events.list({  // メソッド
      'calendarId': gcCalendarID  // 取得したカレンダーID(または'primary')
    });
    // リクエスト実行
    request.execute(function(resp){
      console.debug(resp);
      for (var i in resp.items){
        // 予定開始日時/終了日時とイベントIDを表示
        var a = resp.items[i];
        console.debug('start:' + a.start.dateTime + ' end:' + a.end.dateTime + 
        'summary:' + a.summary + ' eventid:' + a.id);
		gcEventList.push(a);
		getEvent(i);
      }
	  if(callback) callback();
	  flush_evlist();
    });
  });
}

/* 個々のeventを取得する */
function getEvent(evnum,callback){
  gcEventDetails = [];
  evid = gcEventList[evnum].id;
  // リクエストメソッド＆パラメータを設定
  var request = gapi.client.calendar.events.get({  // メソッド
    'calendarId': gcCalendarID,  // 対象となるカレンダーのID
    'eventId': evid // 取得したイベントID
  });
  // リクエスト実行
  request.execute(function(resp){
    console.debug(resp);
    var a = resp.result;
    console.debug('start:' + a.start.dateTime + ' end:' + a.end.dateTime +
    'summary:' + a.summary + ' eventid:' + a.id);
    gcEventDetails.push(a);
	if(callback) callback();
  });
}

/* eventをinsertする */
function insertEvent(){
  gapi.client.load('calendar', 'v3', function(){
  var resource = {
    'summary': 'Appointment', // 予定のタイトル
    'start': { // 開始日・時刻
      'dateTime': '2013-04-16T10:00:00.000+09:00'
     },
    'end': { // 終了日・時刻
      'dateTime': '2013-04-16T10:25:00.000+09:00'
     },
    'location': 'Somewhere', // 場所
    'description': 'contents of this event' // 説明   
  };
 
  var request = gapi.client.calendar.events.insert({
    'calendarId': gcCalendarID,// デフォルトカレンダー：'primary'
    'resource': resource
  });
 
  request.execute(function(resp){
     console.debug(resp);
  });
});
}
/* eventをupdateする */
function updateEvent(){
  // リクエストメソッド＆パラメータを設定
  sequence++;
  var resource = {
    'sequence': sequence // あらかじめ元のsequenceを1増やしておく！
  }
  var request = gapi.client.calendar.events.update({  // メソッド
    'calendarId': gcCalenderID,  
    'eventId': 'ncv3g2a5v35pp82jcpsla3k89o',
    'resource': resource // 
  });
  // リクエスト実行
  request.execute(function(resp){
  });
}


/*表示の更新*/

function flush_cid(){
	$('#calender_id').text(gcCalendarID);
}
function flush_evlist(){
	$('.eventlist').text('');
	for(var i in gcEventList){
		$('.eventlist').append('<li><input type="button" value="'+gcEventList[i].summary+'" onClick="getEvent('+i+',flush_evdetails); name = '+i+'"></li>');
	}
}
function flush_evdetails(){
	$('#eventdetails').text('');
	for(var i in gcEventDetails){
		var appstr =  '<dt>'+gcEventDetails[i].summary+'</dd>';
		appstr += '<dd>start:'+gcEventDetails[i].start.dateTime+'</dd>';
		appstr += '<dd>end:'+gcEventDetails[i].end.dateTime+'</dd>'
		$('#eventdetails').append(appstr);	
	}
}

/* event*/
$('#eventlist').hover(function(){
	console.log(hoverEventlist);
	$(this).fadeTo('fast',.3);
},function(){
	$(this).fadeTo('fast',.1);
});

/*進捗管理関数*/
function connectGC(){
	authorizeCalender(getCalenderList,getEventList);
}



</script>
</head>
<body>
	<button id="authorizeButton" onClick="connectGC();">connect</button>
    <button onClick="insertEvent();">insertEvent</button>
    <button onClick="updateEvent();">updateEvent</button>
    <br />
    calender_id<div id="calender_id"></div>
    eventlist<ul><div class="eventlist"></div></ul>
    eventdetails<div id="eventdetails"></div>

</body>
</html>