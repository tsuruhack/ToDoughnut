var gcCalendarID;
var gcEventList = [];
var gcEventDetails = [];
var gcViewdata =　[];//posi,summary
var sequence = 0;
var hasLoadedEvent = 0;

/*dateをdatetime型かtimestamp型に変換する*/
function getMySQLDate(dt, dtype) {
	var timestamp = dt.getFullYear()+
	                (String(dt.getMonth()+101).substr(1,2))+
	                (String(dt.getDate()+100).substr(1,2)+
	                (String(dt.getHours()+100).substr(1,2))+
	                (String(dt.getMinutes()+100).substr(1,2))+
	                (String(dt.getSeconds()+100).substr(1,2)));
	if (dtype=="timestamp") return timestamp;

	timestamp.match(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/);
	var datetime = RegExp.$1+'-'+RegExp.$2+'-'+RegExp.$3+
			' '+RegExp.$4+':'+RegExp.$5+':'+RegExp.$6;
	if (dtype=="datetime") return datetime;
}

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
      //authorizeButton.style.visibility = 'hidden';
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
function getEventList(callback,date){
	gcEventList = [];
	//var startDate = date;
	var nowDate = new Date();
	var nen = nowDate.getFullYear();
	var tuki = nowDate.getMonth();
	var niti = nowDate.getDate();
	var ampm = 0;
	var startDate = new Date(nen,tuki,niti,ampm);
    var endDate = new Date(startDate.getTime() + 43200000);
	console.log('start:'+startDate);
	console.log('end_:'+endDate);
	var stdate = startDate.toISOString();
	var eddate = endDate.toISOString();
	console.log('st:'+stdate);
	console.log('ed:'+eddate);
	
  gapi.client.load('calendar', 'v3', function(){
    // リクエストメソッド＆パラメータを設定
    var request = gapi.client.calendar.events.list({  // メソッド
      'calendarId': gcCalendarID  // 取得したカレンダーID(または'primary')
	  ,'timeMin':stdate
	  ,'timeMax':eddate
	  ,'orderBy':'startTime'
	  ,'singleEvents':true
    });
    // リクエスト実行
    request.execute(function(resp){
      console.debug(resp);
      for (var i in resp.items){
        // 予定開始日時/終了日時とイベントIDを表示用の48配列に入れる
        var a = resp.items[i];
		sttime = startDate.getTime();
		edtime = endDate.getTime();
        console.debug('start:' + a.start.dateTime + ' end:' + a.end.dateTime + 
        'summary:' + a.summary + ' eventid:' + a.id);
		//startTimeを設定
		var ji = Number(a.start.dateTime.substr(11,2));
		var hun = Number(a.start.dateTime.substr(14,2));
		ji = (ji % 12) * 4;
		hun = (hun / 15);
		var x = ji + hun;
		
		//endTimeを設定
		var ji = Number(a.end.dateTime.substr(11,2));
		var hun = Number(a.end.dateTime.substr(14,2));
		ji = (ji % 12) * 4;
		hun = (hun / 15);
		var y = ji + hun;
		
		if(x>y){
		
		}
		
		a.start['d_posi'] = x; 
		a.end['d_posi'] = y; 
		gcEventList.push(a);
		getEvent(i);
      }
	  if(callback) callback();
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
	hasLoadedEvent = 1;
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

/*googleAPIconnext*/
function connectGC(){
	hasLoadedEvent = 1;
	authorizeCalender(getCalenderList,getEventList);
}

function get_hasLoadedEvent(){
	return hasLoadedEvent;
}

function get_gcEventListPosi(){
	var ret = [];
	var starr = [];
	var edarr = [];
	var cnt = gcEventList.length-1;
	for(var i=0;i<=cnt;i++){
		console.log(gcEventList[i].start.d_posi);
		starr[i] = gcEventList[i].start.d_posi;
		edarr[i] = gcEventList[i].end.d_posi;
	}
	for(var j = 0;j<48;j++){
		if(j<=cnt){
			ret.push(starr[j])
			var x = (edarr[j]-starr[j]);
			if(x<0){
				x = 48;
			}
			ret.push(x);
		}else{
			ret.push(0);
		}
	}
	console.log(ret);
	return ret;
}

//画面に表示する用に使う配列を作成
function set_gcViewdata(){
	gcViewdata = [];
	gcViewdata['posi'] = [];
	gcViewdata['summary'] = [];
	var starr = [];
	var edarr = [];
	var cnt = gcEventList.length-1;
	for(var i=0;i<=cnt;i++){
		console.log(gcEventList[i].start.d_posi);
		starr[i] = gcEventList[i].start.d_posi;
		edarr[i] = gcEventList[i].end.d_posi;
		
		/* positionを設定 */
		if(i==0){
			x = starr[i];
		}else{
			var x = (starr[i]-edarr[i-1]);
		}
		gcViewdata.posi.push(starr[i])
			var y = (edarr[i]-starr[i]);
			if(y<0){
				y = 48;
			}
			gcViewdata.posi.push(x);
			gcViewdata.summary.push('');
			gcViewdata.summary.push(gcEventList[i].summary);
	}
	
	console.debug(gcViewdata);
	
	
	//配列を0埋め
	gcViewdata.summary.push('');
	for(var i = 0;i<48;i++){
		if(!gcViewdata.posi[i]){
			gcViewdata.posi[i] = 0;
		}
	}
	
	console.log(gcViewdata);
}



/*表示の更新*/
/*
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
*/
/* event*/
/*
$('#eventlist').hover(function(){
	console.log(hoverEventlist);
	$(this).fadeTo('fast',.3);
},function(){
	$(this).fadeTo('fast',.1);
});
*/

/*
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
*/


