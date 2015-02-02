Ti.App.Properties.setString('module',"");
Ti.App.Properties.setString('root',"1");
var balance = Alloy.createCollection('balance'); 
var info = Alloy.createCollection('info');
var raceCardInfo = Alloy.createCollection('raceCardInfo'); 
var raceCardDetails = Alloy.createCollection('raceCardDetails');
var favourite = Alloy.createCollection('favourite');
var infoDetails = info.getInfo(); 
var clickTime = null; 
var pHeight = Ti.Platform.displayCaps.platformHeight;
$.scrollView.height = pHeight - 50; 

var blnDetails = balance.getBalance(); 
$.accountNo.text = infoDetails[0].account;
if(blnDetails != ""){
	$.credit.text = blnDetails.amount.substring(2);
	$.update.text = "(Last updated on "+blnDetails.date+" "+ blnDetails.time+")"; 
} 
  
API.checkBalance({
	account: infoDetails[0].account,
	pin: infoDetails[0].pin
});

API.raceCard({
	title: ""
});

API.favourite({skip: "1"});

if(Ti.Platform.osname == "android"){
	$.scrollView.overScrollMode = Titanium.UI.Android.OVER_SCROLL_NEVER;
} 
function menuToggle(e){ 
    DRAWER.closeToggle();
}

function play(){ 
	if($.playView.disable == "1"){
		return false;
	} 
	API.raceCard({
		from : "member",
		title: "play"
	});
	DRAWER.navigation("play",1);
}

function withdrawal(){
	
}

function disablePlay(){
	$.playView.image = "/images/Acc_Button01_gray.png";
	$.raceOddView.image = "/images/Acc_Button03_gray.png";
	$.racingView.image = "/images/Acc_Button04_gray.png";
	$.raceOddView.disable = "1";
	$.racingView.disable = "1";
	$.playView.disable = "1";
	Ti.App.removeEventListener("disablePlay", disablePlay);
	Ti.App.removeEventListener("enabledPlay", enabledPlay);
}

function enabledPlay(){
	
	$.playView.image = "/images/Acc_Button01.png";
	$.raceOddView.image = "/images/Acc_Button03.png";
	$.racingView.image = "/images/Acc_Button04.png";
	$.raceOddView.disable = "0";
	$.racingView.disable = "0";
	$.playView.disable = "0";
	Ti.App.removeEventListener("disablePlay", disablePlay);
	Ti.App.removeEventListener("enabledPlay", enabledPlay); 
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
	config.height = "55%";
	 
	var pop = API.popup(subView,config);
	addClickEvent(subView, pop);
	pop.open({fullscreen: true}); 
}

function racing(){
	
	if($.racingView.disable == "1"){
		return false;
	} 
	
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
	pop.open({fullscreen: true}); 
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
	if($.raceOddView.disable == "0"){
		DRAWER.navigation("raceOdd",1);
	} 
}

function raceResult(){  
	DRAWER.navigation("raceResult",1);
}

Ti.App.addEventListener("disablePlay", disablePlay);
Ti.App.addEventListener("enabledPlay", enabledPlay);
