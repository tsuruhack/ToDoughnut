var gcCalendarID;
var gcEventList = [];
var gcEventDetails = [];
var gcViewdata = [];
/*
gcViewdata{
	posi:[]//予定のドーナツ内の位置 48配列
	summary:[]//予定のタイトル
	description:[]//予定の詳細
	isnull:int//予定が入っていないときtrue
}*/
var sequence = 0;
var hasLoadedEvent = 0;
var gcTimedistance = 0;

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
function getEventList(callback){
	gcEventList = [];
	//if(!date){
		var nowDate = new Date();
	//}
	var nen = nowDate.getFullYear();
	var tuki = nowDate.getMonth();
	var niti = nowDate.getDate();
	var ampm = parseInt(nowDate.getHours() /12 )*12;
	console.log('apmp'+ampm);
	var hosei = (gcTimedistance*43200000) ;//今の時刻からどれだけ離れているかgcTimedistance1で12時間分
	var startDate = new Date(nen,tuki,niti,ampm);
	console.log(startDate);
	//（日本限定でいいや補正）
	//hosei += (1000 * 60 * 60 * 9);
	var startTime = startDate.getTime() + hosei;
	startDate.setTime(startTime);
	console.log(startDate);
    var endDate = new Date(startDate.getTime() + 43200000);
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
      //console.debug(resp);
      for (var i in resp.items){
        // 予定開始日時/終了日時とイベントIDを表示用の48配列に入れる
        var a = resp.items[i];
        console.log(a);
		sttime = startDate.getTime();
		edtime = endDate.getTime();
        console.debug('start:' + a.start.dateTime + ' end:' + a.end.dateTime + 
        'summary:' + a.summary + ' eventid:' + a.id);
		//startTimeを設定
		var ji = Number(a.start.dateTime.substr(11,2));
		//var ji = a.start.date.substr(5,2);
		var hun = Number(a.start.dateTime.substr(14,2));
		//var hun = a.start.date.substr(8,2);
		ji = (ji % 12) * 4;
		hun = (hun / 15);
		var x = ji + hun;
		
		//endTimeを設定
		var ji = Number(a.end.dateTime.substr(11,2));
		//var ji = a.end.date.substr(5,2);
		var hun = Number(a.end.dateTime.substr(14,2));
		//var hun = a.end.date.substr(8,2);
		ji = (ji % 12) * 4;
		hun = (hun / 15);
		var y = ji + hun;
		console.log('xy'+a.summary+x+y);
		if(x>y){
		
		}
		
		a.start['d_posi'] = x; 
		a.end['d_posi'] = y; 
		gcEventList.push(a);
		getEvent(i);
      }
	  set_gcViewdata();
	  repaintView();
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
   ,'orderBy':'startTime'
   ,'singleEvents':true
  });
  // リクエスト実行
  request.execute(function(resp){
    //console.debug(resp);
    var a = resp.result;
    console.debug('start:' + a.start.dateTime + ' end:' + a.end.dateTime +
    'summary:' + a.summary + ' eventid:' + a.id);
    gcEventDetails.push(a);
	if(callback) callback();
	hasLoadedEvent = 1;
  });
}

/* eventをinsertする */
function insertEvent(sum,st,ed,loc,des){
  gapi.client.load('calendar', 'v3', function(){
  var resource = {
    'summary': sum, // 予定のタイトル
    'start': { // 開始日・時刻
      'dateTime': st
     },
    'end': { // 終了日・時刻
      'dateTime': ed
     },
    'location': loc, // 場所
    'description': des // 説明
  };
 
  var request = gapi.client.calendar.events.insert({
    'calendarId': gcCalendarID,// デフォルトカレンダー：'primary'
    'resource': resource
  });
 
  request.execute(function(resp){
     //console.debug(resp);
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
    'resource': resource 
  });
  // リクエスト実行
  request.execute(function(resp){
  });
}

/*googleAPI connect ways*/
function connectGC(){//OAuth認証から始めて初日のデータを返す
	hasLoadedEvent = 1;
	authorizeCalender(getCalenderList,getEventList);
}
function changeDayGC(){//OAuth認証は済んでいる状態
	hasLoadedEvent = 1;
	getEventList();
}
function insertGC(d,i){
	console.log('huhahahahahahaha');
	//insertEvent();
}


function get_hasLoadedEvent(){
	return hasLoadedEvent;
}

//画面に表示する用に使う配列を作成
function set_gcViewdata(){
	gcViewdata = [];
	gcViewdata['posi'] = [];
	gcViewdata['summary'] = [];
	gcViewdata['description'] = [];
	gcViewdata['isNull'] = 0;
	var starr = [];
	var edarr = [];
	var cnt = gcEventList.length-1;
	console.log(cnt);
	
	if(cnt==-1){//予定が何も無かったとき
		gcViewdata.posi.push(1);
		gcViewdata['isNull'] = 1;
	}
	for(var i=0;i<=cnt;i++){
		console.log(gcEventList[i].start.d_posi);
		starr[i] = gcEventList[i].start.d_posi;
		edarr[i] = gcEventList[i].end.d_posi;
		
		/* positionを設定 */
		if(i==0){
			var x = starr[i];
		}else{
			var x = (starr[i]-edarr[i-1]);
		}
		gcViewdata.posi.push(x)
		var y = (edarr[i]-starr[i]);
		if(y<0){
			y = 48;
		}
		gcViewdata.posi.push(y);
		gcViewdata.summary.push('');
		gcViewdata.summary.push(gcEventList[i].summary);
		gcViewdata.description.push('');
		gcViewdata.description.push(gcEventList[i].description);

	}
	i--;
	if(edarr[i]<48){
		gcViewdata.posi.push(48-edarr[i]);
	}
	
	
	//配列を0埋め
	gcViewdata.summary.push('');
	gcViewdata.description.push('');
	for(var i = 0;i<48;i++){
		if(!gcViewdata.posi[i]){
			gcViewdata.posi[i] = 0;
		}
	}
	
	console.log('gcViewposi:'+gcViewdata.posi);
	console.log('gcViewsum:'+gcViewdata.summary);
}

