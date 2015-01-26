var value = new Date();
var dayInt = value.getDate();
var monthInt = ("0"+(value.getMonth()+1)).slice(-2);
var yearInt = value.getFullYear();
$.picker.value = value;

displayDate(dayInt.toString(),monthInt.toString(),yearInt.toString());
 
function back() {
	DRAWER.navigation("member",1);
}
 

function showDate(){
	if(Ti.Platform.osname == "android")
	{
		$.dateView.height = 285;
	}
	
	if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad")
	{
		$.dateView.height = 335;
	}
	$.pickerView.show();
}

function displayDate(day,month,year){
	var string = day + "/" + month + "/" + year;
	$.date.text = string;
}

function done(){
	$.pickerView.hide();
	$.dateView.height = 70;
	value = $.picker.value;
	dayInt = value.getDate();
	monthInt = ("0"+(value.getMonth()+1)).slice(-2);
	yearInt = value.getFullYear() ;
	
	var day = dayInt.toString();
	var month = monthInt.toString();
	var year = yearInt.toString();
	var date = day + month + year;
	
	displayDate(day,month,year);
	
	//transaction api
}
