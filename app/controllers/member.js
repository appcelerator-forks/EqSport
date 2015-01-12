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
	//API.checkBalance();
	DRAWER.navigation("amountBalance");
	
	// var win = Alloy.createController("amountBalance").getView();
	// Alloy.Globals.Drawer.setCenterWindow(win); 
	// Alloy.Globals.Drawer.closeLeftWindow();
}

function transaction(){ 
	DRAWER.navigation("transaction");
}

function raceCard(){
	DRAWER.navigation("raceCard");
}

function raceOdd(){  
	DRAWER.navigation("raceOdd");
}

function raceResult(){  
	DRAWER.navigation("raceResult");
}
