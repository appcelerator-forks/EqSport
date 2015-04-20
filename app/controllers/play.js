var args = arguments[0] || {}; 
var param_venue = args.venue || "";
var param_runner_id = args.runner || "";
var param_race_id = args.race_id || "";

Ti.App.Properties.setString('root',"0");
var cur_mod = Ti.App.Properties.getString('module'); 
COMMON.construct($);
DRAWER.disableDrawer();
if(cur_mod == "" || cur_mod == "member"){
	Ti.App.Properties.setString('module',"member");
}
var popWindow = 0;
var venue;
var raceNo;
var balance = Alloy.createCollection('balance'); 
var info = Alloy.createCollection('info');
var bet = Alloy.createCollection('betInfo');
var raceCardInfo = Alloy.createCollection('raceCardInfo'); 
var raceCardDetails = Alloy.createCollection('raceCardDetails');
var favourite = Alloy.createCollection('favourite'); 
var balanceInfo = balance.getBalance();
var infoValue = raceCardInfo.getRaceCardInfo();
var detailsValue; 
var index; 
var infoDetails = info.getInfo();  
var cancelBtn;
var confirmBtn;
var pop;
var runnerIndex = 0;
var dateFormatted;
var timeFormatted;
var timeFormatted24;
var timeStop = Ti.App.Properties.getString('timeStop') || "";
var androidRaceNo;
$.balance.text = "Your available balance is " + balanceInfo.amount; 
setPicker1(); 

if(Ti.Platform.osname == "android"){ 
	$.picker3.setSelectedRow(0,false); 
	$.scrollView2.scrollType = "horizontal";
	$.scrollView2.overScrollMode = Titanium.UI.Android.OVER_SCROLL_NEVER;
	$.scrollView.overScrollMode = Titanium.UI.Android.OVER_SCROLL_NEVER; 
}

if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad"){  
	$.picker3.setSelectedRow(0,0,false);
} 

function successCallBack(){
	COMMON.hideLoading();
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
	if(param_runner_id == "08"){
		param_runner_id = "8";
	}
	if(param_runner_id == "09"){
		param_runner_id = "9";
	}
	$.runner.value = param_runner_id;
}else{
	var presetRunner = Ti.App.Properties.getString('presetRunner') || "";
	$.runner.value = presetRunner;
	if(presetBet != "" && presetRunner != ""){
		timeCounter();
	}
} 
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
}

function setPicker1(){  
	var race_id; 
	if(param_venue != "") {
		for (var g = 0;g < infoValue.length; g++) {
		    if(infoValue[g].venue == param_venue)  {
		    	index = g;
		    	race_id = infoValue[g].id;
		    }
		}
	}
	
	for(var i = 0 ; i < infoValue.length; i++){
		var venueData = infoValue[i].venue;
		var race_id = infoValue[i].id;
		var data = Ti.UI.createPickerRow({
			title:venueData.toString(),
			race_id:race_id.toString() 
		}); 
		$.picker1.add(data);
	}
	 
	if(param_venue != ""){  
		$.picker1.setSelectedRow(0,index,true); 
		if(Ti.Platform.osname == "android"){ 
			refresh(race_id);
		}
	}else{
		$.picker1.setSelectedRow(0,0,true); 
	}
}

function setPicker2(){ 
	var lookup = {};
	var counter = 0 ;
	for (var g = 0;g < detailsValue.length; g++) {
	    lookup[detailsValue[g].runner_id] = counter;
	    counter++;
	}
 
	for(var i=0; i < detailsValue.length; i++){
		var rec = detailsValue[i].runner_id;
		var row = Ti.UI.createPickerRow({
	    	title: rec.toString()
	  	}); 
	  	$.picker2.add(row); 
	}
	 
	if(param_race_id != ""){  
		$.picker2.setSelectedRow(0,lookup[param_race_id],true); 
		if(Ti.Platform.osname == "android"){
			venue = param_venue;
			raceNo = param_race_id;
			$.venue.text = "Venue: " + venue;
			$.race.text = "Race: " + raceNo;
			favouriteOdd(venue, raceNo);
			param_race_id="";
		}
	}else{ 
		$.picker2.setSelectedRow(0,0,true); 
		if(Ti.Platform.osname == "android"){
			venue = $.picker1.getSelectedRow(0).title;
			raceNo = $.picker2.getSelectedRow(0).title;
			$.venue.text = "Venue: " + venue;
			$.race.text = "Race: " + raceNo;
			favouriteOdd(venue, raceNo);
		}
	}
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
	Ti.App.Properties.setString('presetRunner', "");
	Ti.App.Properties.setString('presetBet', "");
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
	Ti.App.Properties.setString('skipPin',"0");  
	var mod = Ti.App.Properties.getString('module');
	$.mainView.removeEventListener('click', hideKeyboard); 
	DRAWER.enableDrawer();	
	if(mod == ""){ 
		DRAWER.navigation("member",1);
	}else{
		Ti.App.Properties.setString('module',"");
		DRAWER.navigation(mod,1);
	} 
}
 
function changeVenue(e){ 
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
	favouriteOdd(venue, raceNo);
	refresh(e.row.race_id);
}

function changeRaceNo(e){
	runnerIndex = e.rowIndex;
	if((e.row == null) || (e.row == "null")) { 
		raceNo = $.picker2.getSelectedRow(0).title;
	} else { 
		raceNo = e.row.title; 
	}
	 
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
	favouriteOdd(venue, raceNo);
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

function defaultOddsValue(){
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
}

function favouriteOdd(myVenue, myRaceNo){ 
	//var favouriteInfo = favourite.getFavouriteInfoByVenueAndRaceNo(venue,raceNo);  
	defaultOddsValue();
	if(typeof myRaceNo == "undefined" ){
		return false;
	}
	
	if(typeof myRaceNo != "undefined"){
		API.futureRace({
			raceNo: myRaceNo,
			venue: myVenue,
			from : "play"
		}); 
	} 
} 

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    };
}
		
function getRaceOdd(ex){ 
	apiRaceOdd = ex.returnData;
	
	if(apiRaceOdd == "") {
		$.mtr.text = "Min to Race:-";
		defaultOddsValue();
	} else {
		$.mtr.text = "Min to Race:" + apiRaceOdd.min_to_race; 
		var runner = apiRaceOdd.runner;
		var run = runner.split("$"); 
		var win_odd = apiRaceOdd.win_odd;
		var win = win_odd.split("$"); 
		var pla_odd = apiRaceOdd.pla_odd;
		var pla = pla_odd.split("$");
		
		var arrList = [];
		for(var a=0; a < run.length; a++){
			if(run[a] == "08"){
				run[a] = "8";
			}
			if(run[a] == "09"){
				run[a] = "9";
			}
 
			var runList = {};
			runList['runner'] = parseInt(run[a]);
			runList['win'] = parseInt(win[a]);
			runList['pla'] = parseInt(pla[a]);
			arrList.push(runList);
		}
		 
		var my = arrList.sort(dynamicSort("win"));  
		$.a1.text = my[0].runner;
		$.a2.text = my[1].runner;
		$.a3.text = my[2].runner;
		$.a4.text = my[3].runner;
		
		$.b1.text = my[0].win;
		$.b2.text = my[1].win;
		$.b3.text = my[2].win;
		$.b4.text = my[3].win;
		
		$.c1.text = my[0].pla;
		$.c2.text = my[1].pla;
		$.c3.text = my[2].pla;
		$.c4.text = my[3].pla;
	}
}

function process(){
	var bets = bet.getBetInfo(); 
	if(Ti.Platform.osname == "android"){
		var textfield = Ti.UI.createTextField({passwordMask: true,keyboardType : Ti.UI.KEYBOARD_PHONE_PAD});
		var dialog = Ti.UI.createAlertDialog({
		    title: 'Enter Pin No.',
		   	androidView: textfield,
		    buttonNames: ['Confirm', 'Cancel'], 
		}); 
	}else{ 
		var dialog = Ti.UI.createAlertDialog({
		    title: 'Enter Pin No.',
		   	style: Ti.UI.iPhone.AlertDialogStyle.SECURE_TEXT_INPUT,
		    buttonNames: ['Confirm', 'Cancel'],
		    keyboardType : Ti.UI.KEYBOARD_PHONE_PAD
		}); 
	}
	
	dialog.show(); 
	dialog.addEventListener('click', function(e){  
		if(e.index == 0) { 
			
			popWindow = 0;
			pop.close();
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
				Ti.App.Properties.setString('skipPin',"1");  
				doBet(); 
			} else {
				COMMON.createAlert("Validation Error","Wrong Pin No.");
				COMMON.hideLoading();
			}
		}else{
			
		}
	}); 
}

function doBet(){ 
	var bets = bet.getBetInfo(); 
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
}

function confirm(){
	COMMON.showLoading();
	bet.resetInfo();  
	if(venue == "" || raceNo =="" || pool == "" || $.runner.value == "" || $.bet.value == "") {
		COMMON.createAlert("Bet Error","Fields cannot be empty");
		COMMON.hideLoading();
		return;
	}
	
	if($.bet.value <= 1) {
		COMMON.createAlert("Bet Error","Minimum bet: 2");
		COMMON.hideLoading();
		return;
	}
	
	if(pool == "WIN" || pool == "PLA" || pool == "WIN/PLA") {
		if($.bet.value % 5 == 0) {
			
		} else {
			COMMON.createAlert("Bet Error","Bet value must be multiple of 5 for WIN, PLA or WIN/PLA");
			COMMON.hideLoading();
			return;
		}
	} else {
		if($.bet.value % 2 == 0) {
			
		} else {
			COMMON.createAlert("Bet Error","Bet value must be multiple of 2 for QIN, EXA, QPS, TRI, FC4 or TRO");
			COMMON.hideLoading();
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

function addClickEvent(myView){
	myView.addEventListener('click', function(e){
		if(e.source.btnAction == "cancel"){
			COMMON.hideLoading();
			cancel();
		}else{ 
			var skipPin = Ti.App.Properties.getString('skipPin'); 
			if(skipPin == "1"){
				 
				popWindow = 0;
				pop.close();
				doBet(); 
			}else{ 
				process(); 
			} 
		}
	});
}

function cancel(){ 
	cancelBtn.removeEventListener('click',cancel);
	confirmBtn.removeEventListener('click',process);
	popWindow = 0;
	pop.close(); 
}

function dash(){
	var currentValue = $.runner.value;
	$.runner.value = currentValue + "-";
}

function hash(){
	var currentValue = $.runner.value;
	$.runner.value = currentValue + "#";
}

function slash(){
	var currentValue = $.runner.value;
	$.runner.value = currentValue + "/";
}

function asterisk(){
	var currentValue = $.runner.value;
	$.runner.value = currentValue + "*";
}

function questionMark(){
	var currentValue = $.runner.value;
	$.runner.value = currentValue + "?";
}

function hideKeyboard(e) {   
    if (e.source.id != 'TextField' || e.source.id != 'bet' || e.source.id != 'runner') {
    	 
    	if(e.source.id == 'runner'){
			return false;
		}
		if(e.source.id == 'bet'){
			return false;
		}
		
		$.runner.blur();
		$.bet.blur();
		if(Ti.Platform.osname == "android"){
			$.hidden.focus();
		}
	}
	 
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
	
	var loadingView = Ti.UI.createView({
		layout:"horizontal",
		height:"35",
		top:10,
		width:"100%",
		visible: false
	});
	
	var loadingLabel = $.UI.create('Label',{
		color: 'black',
		classes : ['small_text'],
		text: 'Placing bet...',
		width: "100%",
		textAlign: "right",
		right: 10
	});
	loadingView.add(loadingLabel);
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
	contentView.add(loadingView);
	titleView.add(titleLabel);
	confirmView.add(titleView);
	confirmView.add(contentView);
	containerView.add(confirmView);
	var config = [];
	config.width = "70%";
	config.height = "70%";
	config.tabFrameToClose = false;
 
	popWindow = 1;
	pop = API.popup(containerView,config);
	pop.open({fullscreen:true, navBarHidden: true}); 
	
	addClickEvent(cancelBtn); 
	addClickEvent(confirmBtn);  
}); 
$.mainView.addEventListener('submitSuccess', function(){
 	API.checkBalance({
		account: infoDetails[0].account,
		pin: infoDetails[0].pin
	});
	
	setTimeout(function(){
		balanceInfo2 = balance.getBalance(); 
		$.balance.text = "Your available balance is " + balanceInfo2.amount; 
	}, 5000);
 
	API.favourite({skip: "1"});
	favouriteOdd(venue, raceNo);
	$.runner.value = "";
	$.bet.value = "";
	popWindow = 0;
	pop.close();
	Ti.App.Properties.setString('presetRunner', "");
	Ti.App.Properties.setString('presetBet', ""); 
	COMMON.hideLoading();
 });
$.mainView.addEventListener('submitFailed',function(){
	cancelBtn.removeEventListener('click',cancel);
	confirmBtn.removeEventListener('click',process);
 
	$.runner.value = "";
	$.bet.value = "";
	popWindow = 0;
	pop.close();
	COMMON.hideLoading();
});

Ti.App.addEventListener("futureRace", getRaceOdd);

/**********************
 * Clear object and memory
 **********************/
var clearObject = function(){ 
	raceCardInfo = null;  
	bet = null; 
	favourite = null;   
	containerView = null; 
	Ti.App.removeEventListener("futureRace", getRaceOdd);
	Ti.App.removeEventListener("clearObject", clearObject);
};
Ti.App.addEventListener("clearObject", clearObject);	