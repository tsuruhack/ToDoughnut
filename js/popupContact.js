// Validating Empty Field
function insertClick() {
	document.getElementById('formpop').submit();
	var str = $('#namepop').val();
	console.log(str);
}

//Function To Display Popup
function div_show() {
document.getElementById('abc').style.display = "block";
}

//Function to Hide Popup
function div_hide(){
document.getElementById('abc').style.display = "none";
}