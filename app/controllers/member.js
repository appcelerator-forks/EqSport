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
	DRAWER.navigation("play",1);
}

function withdrawal(){
	DRAWER.navigation("withdrawal",1);
}

function amountBalance(){
	balance.resetBalance();
	API.checkBalance({
		account: infoDetails[0].account,
		pin: infoDetails[0].pin
	});
	// DRAWER.navigation("amountBalance",1);
	
	// var win = Alloy.createController("amountBalance").getView();
	// Alloy.Globals.Drawer.setCenterWindow(win); 
	// Alloy.Globals.Drawer.closeLeftWindow();
}

function transaction(){ 
	DRAWER.navigation("transaction",1);
}

function raceCard(){
	API.raceCard({
			title : "raceCard"
		});
	//DRAWER.navigation("raceCard",1);
}

function raceOdd(){  
	API.raceCard({
			title : "raceOdd"
		});
	// DRAWER.navigation("raceOdd",1);
}

function raceResult(){  
	DRAWER.navigation("raceResult",1);
}
