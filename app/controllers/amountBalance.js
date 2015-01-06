var library = Alloy.createCollection('balance'); 
var details = library.getBalance(); 

Ti.API.info(details.amount);
$.amount.text = details.amount.substring(2);
$.date.text = details.date;
$.time.text = details.time;

function menuToggle(e){
	var fn = 'toggleLeftWindow';
    $.drawer[fn]();
}