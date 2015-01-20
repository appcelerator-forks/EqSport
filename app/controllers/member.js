var balance = Alloy.createCollection('balance'); 
var info = Alloy.createCollection('info');
var raceCardInfo = Alloy.createCollection('raceCardInfo'); 
var raceCardDetails = Alloy.createCollection('raceCardDetails');
var infoDetails = info.getInfo();
var clickTime = null;

if(Ti.Platform.osname == "android"){
	$.scrollView.overScrollMode = Titanium.UI.Android.OVER_SCROLL_NEVER;
} 
function menuToggle(e){
	// var fn = 'toggleLeftWindow';
    // $.drawer[fn]();
    DRAWER.closeToggle();
}

function play(){
	//API.favourite();
	raceCardInfo.resetInfo();
	raceCardDetails.resetDetails();
	API.raceCard({
		title: "play"
	});
	//DRAWER.navigation("play",1);
}

function withdrawal(){ 
	
	// double click prevention
	var currentTime = new Date();
	if (currentTime - clickTime < 1000) {
		return;
	};
	clickTime = currentTime;
	
	//Create subview content
	var subView = Ti.UI.createView({ 
			width : "100%", 
			height : "auto", 
			layout : "horizontal",
			top : 10
	});
	var imaView1 = Ti.UI.createImageView({
		width    : "40%", 
		left : 10,
		right : 10,
		image : "/images/Button02.png"
	});
	var imaView2 = Ti.UI.createImageView({
		width    : "40%", 
		height : "80", 
		left : 10,
		image : "/images/Button03.png"
	});
	
	var label1 = Ti.UI.createLabel({
	  color: '#ffffff',
	  font: { fontSize:8 },
	  left : 10,
		right : 10,
	  text: 'Withdrawal',
	  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, 
	  width: "40%", height: Ti.UI.SIZE
	});
	var label2 = Ti.UI.createLabel({
	  color: '#ffffff',
	  font: { fontSize:8 },
	  left : 10,
	 
	  text: 'Check Account Balance',
	  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, 
	  width: "35%", height: Ti.UI.SIZE
	});
	
	var imaView3 = Ti.UI.createImageView({
		width    : "40%", 
		top    : 10,
		left : 15,
		right : 10,
		bottom : 10,
		image : "/images/Button04.png"
	});
	var label3 = Ti.UI.createLabel({
	  color: '#ffffff',
	  font: { fontSize:8 },
	  left : 30,
		right : 10,
	  text: 'View Transaction',
	  textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT, 
	  width: "95%", height: Ti.UI.SIZE
	});
	
	subView.add(imaView1);	
	subView.add(imaView2);	
	subView.add(label1);	
	subView.add(label2);
	subView.add(imaView3);	
	subView.add(label3);
	var pop = API.popup(subView);
	pop.open({fullscreen:true, navBarHidden: true});
	 
	//DRAWER.navigation("withdrawal",1);
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
