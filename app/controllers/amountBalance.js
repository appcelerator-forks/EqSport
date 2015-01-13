/* Use when API is ready
var library = Alloy.createCollection('balance'); 
var details = library.getBalance(); 

Ti.API.info(details.amount);
$.amount.text = details.amount.substring(2);
$.date.text = details.date;
$.time.text = details.time;*/

function menuToggle(e){
	DRAWER.closeToggle();
}

function back(){	
	DRAWER.navigation("member");
}

function topUp(){	
	DRAWER.navigation("topUp");
}