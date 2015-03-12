// Use when API is ready
var library = Alloy.createCollection('balance'); 
var info = Alloy.createCollection('info'); 
var infoDetails = info.getInfo(); 
Ti.App.Properties.setString('module',"member");

COMMON.construct($);
COMMON.showLoading(); 
DRAWER.disableDrawer();
//update balnce from server
API.checkBalance({
	account: infoDetails[0].account,
	pin: infoDetails[0].pin
});

function getBln(){
	var details = library.getBalance(); 
	 
	if(details != ""){
		$.amount.text = details.amount.substring(2);
		$.date.text = details.date;
		$.time.text = details.time;
	}
	COMMON.hideLoading();
}

setTimeout(function(){
	getBln();
}, 800);	
  
function menuToggle(e){
	DRAWER.closeToggle();
}

function back(){	
	DRAWER.enableDrawer();	
	Ti.App.Properties.setString('module',"");
	DRAWER.navigation("member",1);
}

function topUp(){	
	DRAWER.navigation("topUp",1);
}