// Validating Empty Field
function insertClick() {
	var summary = $('#namepop').val();//summary
	var stpop = new Date($('#stpop').val());//startdate
	var edpop = new Date($('#edpop').val());//enddate
	var msgpop = $('#msgpop').val();//description
	var stiso = stpop.toISOString();
	var ediso = edpop.toISOString();
	insertEvent(summary,stpop,edpop,msgpop);//googleCalendarAPI.js
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