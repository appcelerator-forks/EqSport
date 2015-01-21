var balance = Alloy.createCollection('balance'); 
var info = Alloy.createCollection('info');
var raceCardInfo = Alloy.createCollection('raceCardInfo'); 
var raceCardDetails = Alloy.createCollection('raceCardDetails');
var favourite = Alloy.createCollection('favourite');
var infoDetails = info.getInfo(); 
var clickTime = null; 
var pHeight = Ti.Platform.displayCaps.platformHeight;
$.scrollView.height = pHeight - 50; 

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
	balance.resetBalance();
	favourite.resetInfo();
	raceCardInfo.resetInfo();
	raceCardDetails.resetDetails();
	API.raceCard({
		title: "play"
	});
	//DRAWER.navigation("play",1);
}

function withdrawal(){
	
}

function account(){ 
	var config = [];
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
	
	var svTitle = $.UI.create('Label', {
		text:"Account",
		classes: ['description_header'],
			 
		width:'100%',
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,  
	});
	
	var imaView1 = Ti.UI.createImageView({
		width    : "40%", 
		left : 10,
		right : 10, 
		destination : "withdrawal",
		image : "/images/Button02.png"
	});
	var imaView2 = Ti.UI.createImageView({
		width    : "40%",  
		left : 10, 
		destination : "amountBalance",
		image : "/images/Button03.png"
	});
	
	var label1 = Ti.UI.createLabel({
	  color: '#ffffff',
	  font: { fontSize:8 },
	  left : 10,
	  right : 10, 
	  text: 'Withdrawal',
	  destination : "withdrawal",
	  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, 
	  width: "40%" 
	});
	var label2 = Ti.UI.createLabel({
	  color: '#ffffff',
	  font: { fontSize:8 },
	  left : 10, 
	  text: 'Check Account Balance',
	  destination : "amountBalance",
	  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, 
	  width: "35%" 
	});
	var sepView = Ti.UI.createView({ 
			width : "100%", 
			height : "15", 
			layout : "horizontal" 
	});
	var imaView3 = Ti.UI.createImageView({
		width    : "40%",  
		left : 10, 
	    right : 100,
	    destination : "transaction",
		image : "/images/Button04.png"
	});
	var label3 = Ti.UI.createLabel({
	  color: '#ffffff',
	  font: { fontSize:8 },
	  left : 10,
	  text: 'View Transaction',
	  destination : "transaction",
	  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, 
	  width: "40%" 
	});
	
	subView.add(svTitle);
	subView.add(imaView1);	
	subView.add(imaView2);	
	subView.add(label1);	
	subView.add(label2);
	subView.add(sepView);	 
	subView.add(imaView3);	
	subView.add(label3);
	
	config.width = "70%";
	config.height = "50%";
	 
	var pop = API.popup(subView,config);
	addClickEvent(subView, pop);
	pop.open(); 
}

function racing(){
	var config = [];
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
	var svTitle = Ti.UI.createLabel({
	  color: '#ffffff',
	  font: { fontSize:8 },
	  left : 10,
	  right : 10, 
	  text: 'Race Card',
	  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, 
	  width: "40%" 
	});
	var svTitle = $.UI.create('Label', {
		text:"Racing",
		classes: ['description_header'],
		width:'100%',
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,  
	});
		
	var imaView1 = Ti.UI.createImageView({
		width    : "40%", 
		left : 10,
		right : 10, 
		bottom:10,
		destination : "raceCard",
		image : "/images/Button05.png"
	});
	var imaView2 = Ti.UI.createImageView({
		width    : "40%", 
		left : 10, 
		bottom:10,
		destination    : "raceResult",
		image : "/images/Button07.png"
	});
	
	var label1 = Ti.UI.createLabel({
	  color: '#ffffff',
	  font: { fontSize:8 },
	  left : 10,
	  right : 10, 
	  text: 'Race Card',
	  destination    : "raceCard",
	  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, 
	  width: "40%" 
	});
	var label2 = Ti.UI.createLabel({
	  color: '#ffffff',
	  font: { fontSize:8 },
	  left : 10, 
	  text: 'Race Result',
	  destination    : "raceResult",
	  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, 
	  width: "35%" 
	});
	 
	subView.add(svTitle);
	subView.add(imaView1);	
	subView.add(imaView2);	
	subView.add(label1);	
	subView.add(label2); 
	
	config.width = "70%";
	config.height = "30%";
	 
	var pop = API.popup(subView,config);
	addClickEvent(subView, pop);
	pop.open(); 
}

function addClickEvent(myView, popView){
	myView.addEventListener('click', function(e){
		if(e.source.destination != null){
			DRAWER.navigation(e.source.destination,1); 
			popView.close();
		} 
	});
}

function amountBalance(){
	// DRAWER.navigation("amountBalance",1);
	
	// var win = Alloy.createController("amountBalance").getView();
	// Alloy.Globals.Drawer.setCenterWindow(win); 
	// Alloy.Globals.Drawer.closeLeftWindow();
}

function transaction(){ 
	DRAWER.navigation("transaction",1);
}

function raceCard(){
	// API.raceCard({
			// title : "raceCard"
		// });
	DRAWER.navigation("raceCard",1);
}

function raceOdd(){  
	// API.raceCard({
			// title : "raceOdd"
		// });
	DRAWER.navigation("raceOdd",1);
}

function raceResult(){  
	DRAWER.navigation("raceResult",1);
}
