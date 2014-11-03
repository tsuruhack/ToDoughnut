// Validating Empty Field
function insertClick() {
	var summary = $('#namepop').val();//summary
	var stpop = new Date($('#stpop').val());//startdate
	var edpop = new Date($('#edpop').val());//enddate
	var msgpop = $('#msgpop').val();//description
	
	var jisa = stpop.getTime() - (9*1000*60*60);
	var stpop2 = new Date();
	stpop2.setTime(jisa);
		
	jisa = stpop.getTime() - (9*1000*60*60);
	var edpop2 = new Date();
	edpop2.setTime(jisa);
	
	var stiso = stpop2.toISOString();
	var ediso = edpop2.toISOString();
	insertEvent(summary,stpop2,edpop2,msgpop);//googleCalendarAPI.js
	div_hide();
}

//Function To Display Popup
function div_show() {
document.getElementById('abc').style.display = "block";
}

//Function to Hide Popup
function div_hide(){
document.getElementById('abc').style.display = "none";
}