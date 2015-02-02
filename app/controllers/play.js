var args = arguments[0] || {}; 
var param_runner_id = args.runner || "";
var param_race_id = args.race_id || "";
Ti.App.Properties.setString('root',"0");
var cur_mod = Ti.App.Properties.getString('module'); 
if(cur_mod == "" || cur_mod == "member"){
	Ti.App.Properties.setString('module',"member");
}
var popWindow = 0;
var balance = Alloy.createCollection('balance'); 
var info = Alloy.createCollection('info');
var bet = Alloy.createCollection('betInfo');
var raceCardInfo = Alloy.createCollection('raceCardInfo'); 
var raceCardDetails = Alloy.createCollection('raceCardDetails');
var favourite = Alloy.createCollection('favourite');
 

var balanceInfo = balance.getBalance();
var infoValue = raceCardInfo.getRaceCardInfo();
var detailsValue = raceCardDetails.getRaceCardDetails("1");
  
var infoDetails = info.getInfo(); 

var cancelBtn;
var confirmBtn;
var pop;
var runnerIndex;
var dateFormatted;
var timeFormatted;
var timeFormatted24;
var timeStop = Ti.App.Properties.getString('timeStop') || "";

function successCallBack(){
	hideLoading();
}
 

//update balnce from server
API.checkBalance({
	account: infoDetails[0].account,
	pin: infoDetails[0].pin
});

var containerView = Ti.UI.createView({
	layout: "composite",
	height:"100%",
	width:"100%",
	backgroundColor: "black"
}); 

var presetBet = Ti.App.Properties.getString('presetBet') || "";
$.bet.value = presetBet;
if(param_runner_id != "" && param_runner_id != "-"){
	$.runner.value = param_runner_id;
}else{
	var presetRunner = Ti.App.Properties.getString('presetRunner') || "";
	$.runner.value = presetRunner;
	if(presetBet != "" && presetRunner != ""){
		timeCounter();
	}
}


//var column1 = Ti.UI.createPickerColumn();
$.balance.text = "Your available balance is " + balanceInfo.amount; 
setPicker1(); 

		
function timeCounter(){ 
	var d = new Date(); 
	var curTime = d.getTime();	 
	 
	if(curTime >= timeStop){
		$.bet.value = "";
		$.runner.value = "";
		return false;
	} 
	setTimeout(function(){
		timeCounter(); 
	}, 1000);
}

function refresh(index){ 
	if($.picker2.columns[0]) {
	    var _col = $.picker2.columns[0];
	        var len = _col.rowCount; 
	        for(var x = len-1; x >= 0; x-- ){
	                var _row = _col.rows[x];
	                _col.removeRow(_row);
	        }
	}
	detailsValue = raceCardDetails.getRaceCardDetails(index);
	setPicker2();
	// if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad") { 
		// $.picker2.setSelectedRow(0,0,false);
	// }
}

function setPicker1(){ 
	for(var i = 0 ; i < infoValue.length; i++){
		var venue = infoValue[i].venue;
		var race_id = infoValue[i].id;
		var data = Ti.UI.createPickerRow({title:venue.toString(),race_id:race_id.toString()});
		//$.pickerColumn1.addRow(data);
		$.picker1.add(data);
	}
	 
}

function setPicker2(){ 
	
	var lookup = {};
	var counter = 0 ;
	for (var g = 0;g < detailsValue.length; g++) {
	    lookup[detailsValue[g].runner_id] = counter;
	    counter++;
	}

	//param_race_id
	for(var i=0; i < detailsValue.length; i++){
		var rec = detailsValue[i].runner_id;
		var row = Ti.UI.createPickerRow({
	    	title: rec.toString()
	  	}); 
	  	$.picker2.add(row);
		/*var favouriteInfo = favourite.getFavouriteInfoByVenueAndRaceNo(venue,detailsValue[i].runner_id);  
	 
		if(favouriteInfo.length > 0){
			var rec = detailsValue[i].runner_id;
			var row = Ti.UI.createPickerRow({
		    	title: rec.toString()
		  	}); 
		  	$.picker2.add(row);
		 }*/
	}
	 
	if(param_race_id != ""){  
		$.picker2.setSelectedRow(0,lookup[param_race_id],true); 
	}else{
		$.picker2.setSelectedRow(0,0,true); 
	}
}
 
 
if(Ti.Platform.osname == "android"){
	$.picker1.setSelectedRow(0,false);
	$.picker2.setSelectedRow(0,false);
	$.picker3.setSelectedRow(0,false);
	 
	$.scrollView2.scrollType = "horizontal";
	$.scrollView2.overScrollMode = Titanium.UI.Android.OVER_SCROLL_NEVER;
	$.scrollView.overScrollMode = Titanium.UI.Android.OVER_SCROLL_NEVER;
	

}

if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad"){ 
	// $.picker1.setSelectedRow(0,(infoValue.length-1),false);
	// //$.picker2.setSelectedRow(0,(detailsValue.length-1),false);
	// $.picker3.setSelectedRow(0,8,false);
	$.picker1.setSelectedRow(0,0,false);
	$.picker3.setSelectedRow(0,0,false);
}


function done1() {
	$.venueView.height = 50;
	$.venueContentView.height = 50;
	$.pickerView1.height = 50;
	$.pickerView1.setVisible(false);
	$.done1.setVisible(false);
	$.picker1.setVisible(false);
}

function done2(){
	$.raceNoView.height = 50;
	$.raceNoContentView.height = 50;
	$.pickerView2.height = 50;
	$.pickerView2.setVisible(false);
	$.done2.setVisible(false);
	$.picker2.setVisible(false);
}

function done3(){
	$.poolView.height = 50;
	$.poolContentView.height = 50;
	$.pickerView3.height = 50;
	$.pickerView3.setVisible(false);
	$.done3.setVisible(false);
	$.picker3.setVisible(false);
}


function reset(){
	$.runner.value = "";
	$.bet.value = "";
}

function showVenue() {
	$.venueView.height = 160;
	$.venueContentView.height = 160;
	$.pickerView1.height = 160;
	$.pickerView1.setVisible(true);
	$.done1.setVisible(true);
	$.picker1.setVisible(true);
	return false;
}

function showRaceNo() {
	$.raceNoView.height = 160;
	$.raceNoContentView.height = 160;
	$.pickerView2.height = 160;
	$.pickerView2.setVisible(true);
	$.done2.setVisible(true);
	$.picker2.setVisible(true);
	return false;
}

function showPool() {
	$.poolView.height = 160;
	$.poolContentView.height = 160;
	$.pickerView3.height = 160;
	$.pickerView3.setVisible(true);
	$.done3.setVisible(true);
	$.picker3.setVisible(true);
	return false;
}
 
function backPlay(){	 
	var mod = Ti.App.Properties.getString('module');
	$.mainView.removeEventListener('click', hideKeyboard);
	// $.mainView.removeEventListener('confirmSuccess', submit); 
	// $.mainView.removeEventListener('submitSuccess', successCallBack);
	// $.mainView.removeEventListener('submitFailed',fail);

	if(mod == ""){
		DRAWER.navigation("member",1);
	}else{
		Ti.App.Properties.setString('module',"");
		DRAWER.navigation(mod,1);
	} 
}


function venue(e){  
	venue = e.row.title;
	if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad"){
		$.venueView.height = 50;
		$.venueContentView.height = 50;
		$.pickerView1.height = 50;
		$.pickerView1.setVisible(false);
		$.done1.setVisible(false);
		$.picker1.setVisible(false);
		$.venueLabel.text = venue;
	}
	$.venue.text = "Venue: " + venue;
	refresh(e.row.race_id);
}

function raceNo(e){
	runnerIndex = e.rowIndex;
	raceNo = e.row.title; 
	 
	if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad"){
		$.raceNoView.height = 50;
		$.raceNoContentView.height = 50;
		$.pickerView2.height = 50;
		$.pickerView2.setVisible(false);
		$.done2.setVisible(false);
		$.picker2.setVisible(false);
		$.raceNoLabel.text = raceNo;
	}
	$.venue.text = "Venue: " + venue;
	$.race.text = "Race: " + raceNo;
	favouriteOdd(raceNo);
}

function pool(e){
	pool = e.row.title; 
	if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad"){
		$.poolView.height = 50;
		$.poolContentView.height = 50;
		$.pickerView3.height = 50;
		$.pickerView3.setVisible(false);
		$.done3.setVisible(false);
		$.picker3.setVisible(false);
		$.poolLabel.text = pool;
	}
}
 
function favouriteOdd(selectedRow){ 
	console.log(selectedRow);
	var favouriteInfo = favourite.getFavouriteInfoByRaceNo(selectedRow);
 
	if(favouriteInfo == "") {
		$.mtr.text = "Min to Race:-";
		
		$.a1.text = "-";
		$.a2.text = "-";
		$.a3.text = "-";
		$.a4.text = "-";
		
		$.b1.text = "-";
		$.b2.text = "-";
		$.b3.text = "-";
		$.b4.text = "-";
		
		$.c1.text = "-";
		$.c2.text = "-";
		$.c3.text = "-";
		$.c4.text = "-";
	} else {
		$.mtr.text = "Min to Race:" + favouriteInfo[0].min_to_race;
		
		var runner = favouriteInfo[0].runner;
		var run = runner.split("$");
		
		var win_odd = favouriteInfo[0].win_odd;
		var win = win_odd.split("$");
		
		var pla_odd = favouriteInfo[0].pla_odd;
		var pla = pla_odd.split("$");
		
		$.a1.text = run[0];
		$.a2.text = run[1];
		$.a3.text = run[2];
		$.a4.text = run[3];
		
		$.b1.text = win[0];
		$.b2.text = win[1];
		$.b3.text = win[2];
		$.b4.text = win[3];
		
		$.c1.text = pla[0];
		$.c2.text = pla[1];
		$.c3.text = pla[2];
		$.c4.text = pla[3];
	}
}


function process(){
	var bets = bet.getBetInfo(); 
	if(Ti.Platform.osname == "android"){
		var textfield = Ti.UI.createTextField();
		var dialog = Ti.UI.createAlertDialog({
		    title: 'Enter Pin No.',
		   	androidView: textfield,
		    buttonNames: ['Confirm', 'Cancel']
		});
		
	}else{
		var dialog = Ti.UI.createAlertDialog({
		    title: 'Enter Pin No.',
		   	style: Ti.UI.iPhone.AlertDialogStyle.SECURE_TEXT_INPUT,
		    buttonNames: ['Confirm', 'Cancel']
		});
	}
	
	dialog.show();
	
	dialog.addEventListener('click', function(e){ 
		
		if(e.index == 0) { 
			
			dialog.hide();
			var betPin;
			if(Ti.Platform.osname == "android"){
				betPin = textfield.value;
			}else{
				betPin = e.text;
			}
			 
			if(betPin == bets[0].pin) {
				cancelBtn.removeEventListener('click',cancel);
				confirmBtn.removeEventListener('click',process); 
				// $.mainView.removeEventListener('submitFailed',fail);
				// $.mainView.removeEventListener('confirmSuccess',submit); 
				// $.mainView.removeEventListener('submitSuccess', successCallBack);
				
				
				//Submit API Calling
				API.submitRaceBet({
					myView : $.mainView,
					msisdn:bets[0].msisdn,
					account: bets[0].account, 
					pin: bets[0].pin,
					date: bets[0].date,
					time: timeFormatted24,
					venue: bets[0].venue,
					raceNo: bets[0].raceNo,
					pool: bets[0].pool,
					bet: bets[0].bet,
					runner: bets[0].runner
				});
			} else {
				COMMON.createAlert("Validation Error","Wrong Pin No.");
			}
		}
	});
	 
	 
}

function confirm(){
	showLoading();
	bet.resetInfo(); 
	// $.mainView.addEventListener('submitFailed',fail);
	// $.mainView.addEventListener('confirmSuccess',submit); 
	// $.mainView.addEventListener('submitSuccess', successCallBack);
	//Check balance and bet amount
	// var blnDet = balance.getBalance(); 
	// var blnAmt = 0;
	// if(blnDet != ""){
		// blnAmt = blnDet.amount.substring(2);
	// }
//  
	// if(parseInt(blnAmt) < parseInt($.bet.value)){
		// COMMON.createAlert("Bet Error","Insufficient amount to place bet. Please top up. Thanks.");
		// return;
	// }
	
	if(venue == "" || raceNo =="" || pool == "" || $.runner.value == "" || $.bet.value == "") {
		COMMON.createAlert("Bet Error","Fields cannot be empty");
		return;
	}
	
	if($.bet.value <= 1) {
		COMMON.createAlert("Bet Error","Minimum bet: 2");
		return;
	}
	
	if(pool == "WIN" || pool == "PLA" || pool == "WIN / PLA") {
		if($.bet.value % 5 == 0) {
			
		} else {
			COMMON.createAlert("Bet Error","Bet value must be multiple of 5 for WIN, PLA or WIN / PLA");
			return;
		}
	} else {
		if($.bet.value % 2 == 0) {
			
		} else {
			COMMON.createAlert("Bet Error","Bet value must be multiple of 2 for QIN, EXA, QPS, TRI, FC4 or TRO");
			return;
		}
	}
	var oriData = detailsValue[runnerIndex].runner_date;
	var res = oriData.split("/");
	var month = ("0"+res[0]).slice(-2);
	var day = ("0"+res[1]).slice(-2);
	var year = res[2];
	dateFormatted = month + day +year; 
	var oriTime = detailsValue[runnerIndex].runner_time;
	var temp = oriTime.split(" ");
	var res = temp[0].split(":");
	var hour = ("0"+res[0]).slice(-2);
	var minute = ("0"+res[1]).slice(-2);
	var second = ("0"+res[2]).slice(-2);
	timeFormatted = hour + minute + second;
	
	var betInfo = Alloy.createModel('betInfo', { 
		msisdn:infoDetails[0].msisdn,
		account: (infoDetails[0].account).toString(), 
		pin: infoDetails[0].pin.toString(),
		date: dateFormatted,
		time: detailsValue[runnerIndex].runner_time,
		venue: venue,
		raceNo: raceNo,
		pool: pool,
		bet: $.bet.value,
		runner: $.runner.value
	}); 
	betInfo.save(); 
	
	
				
	API.confirmRaceBet({
		myView : $.mainView,
		msisdn: infoDetails[0].msisdn,
		pin: infoDetails[0].pin,
		date: dateFormatted,
		time: timeFormatted,
		raceNo: raceNo,
		runner: $.runner.value,
		pool: pool
	});
}
 

function addClickEvent(myView, popView){
	myView.addEventListener('click', function(e){
		if(e.source.btnAction == "cancel"){
			hideLoading();
			cancel();
		}else{ 
			process(); 
		}
	});
}

function cancel(){
	 
	cancelBtn.removeEventListener('click',cancel);
	confirmBtn.removeEventListener('click',process);
	popWindow = 0;
	pop.close(); 
}

function hideKeyboard(e) {  
    if (e.source != '[object TextField]') {
		$.runner.blur();
		$.bet.blur();
	}
	/*
	if (e.source != '[object bet]') {
		$.bet.blur();
	}
	 */
	if($.bet.value != "" || $.runner.value != ""){ 
		var d = new Date(); 
		timeStop = d.getTime() + (15* 60 * 1000); // 1 minute
		Ti.App.Properties.setString('timeStop', timeStop);
		Ti.App.Properties.setString('presetRunner', $.runner.value);
		Ti.App.Properties.setString('presetBet', $.bet.value);
		timeCounter(); 
	}
	
}
$.runner.addEventListener('change',function(e){ 
	Ti.App.Properties.setString('presetRunner', $.runner.value); 
});

$.bet.addEventListener('change',function(e){ 
	Ti.App.Properties.setString('presetBet', $.bet.value); 
});

$.mainView.addEventListener('click', hideKeyboard);



function hideLoading(){
	$.activityIndicator.hide();
	$.loadingBar.opacity = "0";
	$.loadingBar.height = "0";
	$.loadingBar.top = "0"; 
}

function showLoading(){
	 
	$.activityIndicator.show();
	$.loadingBar.opacity = "1";
	$.loadingBar.zIndex = "100";
	$.loadingBar.height = "120";
	 
	if(Ti.Platform.osname == "android"){
		 
		$.loadingBar.top =  (DPUnitsToPixels(Ti.Platform.displayCaps.platformHeight) / 2) -50; 
		$.activityIndicator.style = Ti.UI.ActivityIndicatorStyle.BIG;
		$.activityIndicator.top = 0; 
	}else if (Ti.Platform.name === 'iPhone OS'){
		$.loadingBar.top = (Ti.Platform.displayCaps.platformHeight / 2) -50; 
		$.activityIndicator.style = Ti.UI.iPhone.ActivityIndicatorStyle.BIG;
	}  
 
}

$.mainView.addEventListener('confirmSuccess',function(){
	 if(popWindow == "1"){
		 return false;
	 }
	
	var bets = bet.getBetInfo();

	var oriTime = bets[0].time; 
	var temp = oriTime.split(" ");
	var res = temp[0].split(":");
	var hourInt = parseInt(res[0]);
	if(temp[1]=='PM' && hourInt > 12){
		hourInt = hourInt + 12;
		
	}
	
	var hour = ("0"+hourInt.toString()).slice(-2);
	var minute = ("0"+res[1]).slice(-2);
	var second = ("0"+res[2]).slice(-2);
	
	timeFormatted24 = hour + minute + second; 
	var confirmView = Ti.UI.createView({
		layout: "vertical",
		height:"100%",
		width:"100%"
	});
	
	var titleView = Ti.UI.createView({
		layout: "composite",
		height:"15%",
		width:"100%",
		backgroundColor:"#EA431A"
	});
	
	var titleLabel = Ti.UI.createLabel({
		color: '#ffffff',
		font: { fontSize:16 },
		text: 'Bet Confirmation',
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		width: Ti.UI.SIZE, 
		height: Ti.UI.SIZE,
		left: 10
	});
	
	var contentView = Ti.UI.createScrollView({
		layout: "vertical",
		height:"85%",
		width:"100%",
		backgroundColor:"#EFEFEF",
		scrollType: "vertical",
		showVerticalScrollIndicator: false,
  		showHorizontalScrollIndicator: false,
	});
	 
	var horizontalView1 = Ti.UI.createView({
		layout:"horizontal",
		height:"35",
		width:"100%",
		top: 10
	});
	
	var horizontalView2 = Ti.UI.createView({
		layout:"horizontal",
		height:"35",
		width:"100%"
	});
	
	var horizontalView3 = Ti.UI.createView({
		layout:"horizontal",
		height:"35",
		width:"100%"
	});
	
	var horizontalView4 = Ti.UI.createView({
		layout:"horizontal",
		height:"35",
		width:"100%"
	});
	
	var horizontalView5 = Ti.UI.createView({
		layout:"horizontal",
		height:"35",
		width:"100%"
	});
	
	var venueLabel = Ti.UI.createLabel({
		color: 'black',
		text: 'Venue',
		width: "40%",
		left: 10
	});
	
	var raceNoLabel = Ti.UI.createLabel({
		color: 'black',
		text: 'Race No.',
		width: "40%",
		left: 10
	});
	
	var poolLabel = Ti.UI.createLabel({
		color: 'black',
		text: 'Pool',
		width: "40%",
		left: 10
	});
	
	var runnerLabel = Ti.UI.createLabel({
		color: 'black',
		text: 'Runner*',
		width: "40%",
		left: 10
	});
	
	var betLabel = Ti.UI.createLabel({
		color: 'black',
		text: 'Bet (RM)',
		width: "40%",
		left: 10
	});
	
	var venueLabelValue = Ti.UI.createLabel({
		color: 'black',
		text: bets[0].venue,
		width: "50%"
	});
	
	var raceNoLabelValue = Ti.UI.createLabel({
		color: 'black',
		text: bets[0].raceNo,
		width: "50%"
	});
	
	var poolLabelValue = Ti.UI.createLabel({
		color: 'black',
		text: bets[0].pool,
		width: "50%"
	});
	
	var runnerLabelValue = Ti.UI.createLabel({
		color: 'black',
		text: bets[0].runner,
		width: "50%"
	});
	
	var betLabelValue = Ti.UI.createLabel({
		color: 'black',
		text: bets[0].bet,
		width: "50%"
	});
	
	var centerImageView = Ti.UI.createView({
		layout: "composite",
		height:"80",
		width: "100%",
	});
	
	var imageView = Ti.UI.createView({
		layout: "horizontal",
		height: Ti.UI.SIZE,
		width: Ti.UI.SIZE,
	});
	
	cancelBtn = Ti.UI.createImageView({
		image:'/images/Button_Cancel.png',
		btnAction : "cancel",
		width: 80,
		height: 80,
		right: 10
	});

	confirmBtn = Ti.UI.createImageView({
		image:'/images/Button_Confirm.png',
		btnAction : "confirm",
		width: 80,
		height: 80,
		left: 10
	});
	
	horizontalView1.add(venueLabel);
	horizontalView1.add(venueLabelValue);
	horizontalView2.add(raceNoLabel);
	horizontalView2.add(raceNoLabelValue);
	horizontalView3.add(poolLabel);
	horizontalView3.add(poolLabelValue);
	horizontalView4.add(runnerLabel);
	horizontalView4.add(runnerLabelValue);
	horizontalView5.add(betLabel);
	horizontalView5.add(betLabelValue);
	imageView.add(cancelBtn);
	imageView.add(confirmBtn);
	centerImageView.add(imageView);
	contentView.add(horizontalView1);
	contentView.add(horizontalView2);
	contentView.add(horizontalView3);
	contentView.add(horizontalView4);
	contentView.add(horizontalView5);
	contentView.add(centerImageView);
	titleView.add(titleLabel);
	confirmView.add(titleView);
	confirmView.add(contentView);
	containerView.add(confirmView);
	var config = [];
	config.width = "70%";
	config.height = "70%";
	config.tabFrameToClose = false;
	//$.mainView.add(containerView);
	popWindow = 1;
	pop = API.popup(containerView,config);
	pop.open({fullscreen:true, navBarHidden: true}); 
	
	addClickEvent(cancelBtn,pop); 
	addClickEvent(confirmBtn,pop);  
}); 
$.mainView.addEventListener('submitSuccess', function(){
 	API.checkBalance({
		account: infoDetails[0].account,
		pin: infoDetails[0].pin
	});
	
	setTimeout(function(){
		balanceInfo2 = balance.getBalance();
		console.log("new balance : "+ balanceInfo2.amount);
		$.balance.text = "Your available balance is " + balanceInfo2.amount; 
	}, 5000);
	popWindow = 0;
	pop.close();
	$.runner.value = "";
	$.bet.value = "";
	Ti.App.Properties.setString('presetRunner', "");
	Ti.App.Properties.setString('presetBet', ""); 
	hideLoading();
 });
$.mainView.addEventListener('submitFailed',function(){
	cancelBtn.removeEventListener('click',cancel);
	confirmBtn.removeEventListener('click',process);
 
	$.runner.value = "";
	$.bet.value = "";
	popWindow = 0;
	pop.close();
	hideLoading();
});