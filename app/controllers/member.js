var balance = Alloy.createCollection('balance'); 
var info = Alloy.createCollection('info');
var infoDetails = info.getInfo();

if(Ti.Platform.osname == "android"){
	$.scrollView.overScrollMode = Titanium.UI.Android.OVER_SCROLL_NEVER;
} 
function menuToggle(e){
	// var fn = 'toggleLeftWindow';
    // $.drawer[fn]();
    DRAWER.closeToggle();
}

function play(){
	API.favourite();
	DRAWER.navigation("play");
}

function withdrawal(){
	DRAWER.navigation("withdrawal");
}

function amountBalance(){
	balance.resetBalance();
	API.checkBalance({
		account: infoDetails[0].account,
		pin: infoDetails[0].pin
	});
	// DRAWER.navigation("amountBalance");
	
	// var win = Alloy.createController("amountBalance").getView();
	// Alloy.Globals.Drawer.setCenterWindow(win); 
	// Alloy.Globals.Drawer.closeLeftWindow();
}

function transaction(){ 
	DRAWER.navigation("transaction");
}

function raceCard(){
	API.raceCard({
			title : "raceCard"
		});
	//DRAWER.navigation("raceCard");
}

function raceOdd(){  
	API.raceCard({
			title : "raceOdd"
		});
	// DRAWER.navigation("raceOdd");
}

function raceResult(){  
	DRAWER.navigation("raceResult");
}
