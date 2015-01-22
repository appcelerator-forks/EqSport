var balance = Alloy.createCollection('balance'); 
var info = Alloy.createCollection('info');
var bet = Alloy.createCollection('betInfo');
var raceCardInfo = Alloy.createCollection('raceCardInfo'); 
var raceCardDetails = Alloy.createCollection('raceCardDetails');
var favourite = Alloy.createCollection('favourite');
var info = Alloy.createCollection('info');
var bet = Alloy.createCollection('betInfo');
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

var containerView = Ti.UI.createView({
	layout: "composite",
	height:"100%",
	width:"100%",
	backgroundColor: "black"
}); 
//var column1 = Ti.UI.createPickerColumn();
//$.balance.text = "Your available balance is " + balanceInfo.amount;

setPicker1(); 

function refresh(index){
	console.log("refresh");
	if($.picker2.columns[0]) {
	    var _col = $.picker2.columns[0];
	        var len = _col.rowCount;
	        console.log("len: "+len);
	        for(var x = len-1; x >= 0; x-- ){
	                var _row = _col.rows[x];
	                _col.removeRow(_row);
	        }
	}
	detailsValue = raceCardDetails.getRaceCardDetails(index);
	setPicker2();
	if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad")
	{
		//$.picker2.setSelectedRow(0,(detailsValue.length-1),false);
		$.picker2.setSelectedRow(0,0,false);
	}
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
	for(var i=0; i < detailsValue.length; i++){
	  var rec = detailsValue[i].runner_id;
	  var row = Ti.UI.createPickerRow({
	    title: rec.toString()
	  }); 
	  $.picker2.add(row);
	}
	 
}


 
if(Ti.Platform.osname == "android"){
	$.bet.addEventListener('focus', function f(e){
	    $.bet.blur();
	    $.bet.removeEventListener('focus', f);
	});
}

if(Ti.Platform.osname == "android"){
	$.picker1.setSelectedRow(0,false);
	$.picker2.setSelectedRow(0,false);
	$.picker3.setSelectedRow(0,false);
}

if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad"){ 
	// $.picker1.setSelectedRow(0,(infoValue.length-1),false);
	// //$.picker2.setSelectedRow(0,(detailsValue.length-1),false);
	// $.picker3.setSelectedRow(0,8,false);
	$.picker1.setSelectedRow(0,0,false);
	$.picker3.setSelectedRow(0,0,false);
}

if(Ti.Platform.osname == "android"){
	$.scrollView2.scrollType = "horizontal";
	$.scrollView2.overScrollMode = Titanium.UI.Android.OVER_SCROLL_NEVER;
	$.scrollView.overScrollMode = Titanium.UI.Android.OVER_SCROLL_NEVER;
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


function success(){
	cancelBtn.removeEventListener('click',cancel);
	confirmBtn.removeEventListener('click',process); 
	pop.close();
	$.runner.value = "";
	$.bet.value = "";
	alert("Transaction Successful");
}
 
function fail()
{
	cancelBtn.removeEventListener('click',cancel);
	confirmBtn.removeEventListener('click',process);
	$.mainView.remove(containerView);
	$.runner.value = "";
	$.bet.value = "";
	pop.close();
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
 
function back(){	
	DRAWER.navigation("member",1);
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
 
function favouriteOdd(selectedRow)
{
	var favouriteInfo = favourite.getFavouriteInfoByRaceNo(selectedRow);
	console.log("favouriteInfo");
	console.log(favouriteInfo);
	if(favouriteInfo == "")
	{
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
	}
	else
	{
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

if(Ti.Platform.osname == "android"){
	$.bet.addEventListener('focus', function f(e){
	    $.bet.blur();
	    $.bet.removeEventListener('focus', f);
	});
} 

function process()
{
	var dialog = Ti.UI.createAlertDialog({
	    title: 'Enter Pin No.',
	    style: Ti.UI.iPhone.AlertDialogStyle.SECURE_TEXT_INPUT,
	    buttonNames: ['Confirm', 'Cancel']
	});
	dialog.show();
	
	dialog.addEventListener('click', function(e){
		var betInfo = Alloy.createCollection('betInfo'); 
		var bet = betInfo.getBetInfo();
		Ti.API.info('e.index: ' + e.index);
	    Ti.API.info('e.text: ' + e.text);
		if(e.index == 0)
		{
			console.log("indexing");
			dialog.hide();
			if(e.text == bet[0].pin)
			{
				//Submit API Calling
				API.submitRaceBet({
					msisdn:bet[0].msisdn,
					account: bet[0].account, 
					pin: bet[0].pin,
					date: bet[0].date,
					time: timeFormatted24,
					venue: bet[0].venue,
					raceNo: bet[0].raceNo,
					pool: bet[0].pool,
					bet: bet[0].bet,
					runner: bet[0].runner
				});
			}
			else
			{
				alert("Wrong Pin No.");
			}
		}
	});
	
	//Submit API Calling
	// API.submitRaceBet({
		// msisdn:bet[0].msisdn,
		// account: bet[0].account, 
		// pin: bet[0].pin,
		// date: bet[0].date,
		// time: timeFormatted24,
		// venue: bet[0].venue,
		// raceNo: bet[0].raceNo,
		// pool: bet[0].pool,
		// bet: bet[0].bet,
		// runner: bet[0].runner
	// });
}

function confirm(){
	bet.resetInfo();
	
	if(venue == "" || raceNo =="" || pool == "" || $.runner.value == "" || $.bet.value == "") {
		alert("Fields cannot be empty");
		return;
	}
	
	if($.bet.value <= 1) {
		alert("Minimum bet: 2");
		return;
	}
	
	if(pool == "WIN" || pool == "PLA" || pool == "WIN / PLA") {
		if($.bet.value % 5 == 0) {
			
		} else {
			alert("Bet value must be multiple of 5 for WIN, PLA or WIN / PLA");
			return;
		}
	} else {
		if($.bet.value % 2 == 0) {
			
		} else {
			alert("Bet value must be multiple of 2 for QIN, EXA, QPS, TRI, FC4 or TRO");
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
		msisdn: infoDetails[0].msisdn,
		pin: infoDetails[0].pin,
		date: dateFormatted,
		time: timeFormatted,
		raceNo: raceNo,
		runner: $.runner.value,
		pool: pool
	});
}

function submit(){
	console.log("submit");
	/*if(venue == "" || raceNo =="" || pool == "" || $.runner.value == "" || $.bet.value == "") {
		alert("Fields cannot be empty");
		return;
	}
	
	if($.bet.value <= 1) {
		alert("Minimum bet: 2");
		return;
	}
	
	if(pool == "WIN" || pool == "PLA" || pool == "WIN / PLA")
	{
		if($.bet.value % 5 == 0)
		{
			
		}
		else
		{
			alert("Bet value must be multiple of 5 for WIN, PLA or WIN / PLA");
			return;
		}
	}
	else
	{
		if($.bet.value % 2 == 0)
		{
			
		}
		else
		{
			alert("Bet value must be multiple of 2 for QIN, EXA, QPS, TRI, FC4 or TRO");
			return;
		}
	}
	console.log("transaction valid");
	console.log(venue);
	console.log(raceNo);
	console.log(pool);
	console.log($.runner.value);
	console.log($.bet.value);*/
	
	var betInfo = Alloy.createCollection('betInfo'); 
	var bet = betInfo.getBetInfo();

	var oriTime = bet[0].time;
	console.log(oriTime);
	var temp = oriTime.split(" ");
	var res = temp[0].split(":");
	var hourInt = parseInt(res[0]);
	if(temp[1]=='PM')
	{
		hourInt = hourInt + 12;
	}
	
	var hour = ("0"+hourInt.toString()).slice(-2);
	var minute = ("0"+res[1]).slice(-2);
	var second = ("0"+res[2]).slice(-2);
	
	timeFormatted24 = hour + minute + second;
	
	console.log("time24"+timeFormatted24);
	
	var confirmView = Ti.UI.createView({
		layout: "vertical",
		height:"100%",
		width:"100%"
	});
	
	var titleView = Ti.UI.createView({
		layout: "composite",
		height:"15%",
		width:"100%",
		backgroundColor:"white"
	});
	
	var titleLabel = Ti.UI.createLabel({
		color: 'black',
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
	
	if(Ti.Platform.osname == "android") {
		contentView.overScrollMode = Titanium.UI.Android.OVER_SCROLL_NEVER;
	}
	
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
		text: bet[0].venue,
		width: "50%"
	});
	
	var raceNoLabelValue = Ti.UI.createLabel({
		color: 'black',
		text: bet[0].raceNo,
		width: "50%"
	});
	
	var poolLabelValue = Ti.UI.createLabel({
		color: 'black',
		text: bet[0].pool,
		width: "50%"
	});
	
	var runnerLabelValue = Ti.UI.createLabel({
		color: 'black',
		text: bet[0].runner,
		width: "50%"
	});
	
	var betLabelValue = Ti.UI.createLabel({
		color: 'black',
		text: bet[0].bet,
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
	//$.mainView.add(containerView);
	pop = API.popup(containerView,config);
	pop.open({fullscreen:true, navBarHidden: true}); 
	addClickEvent(cancelBtn,pop); 
	addClickEvent(confirmBtn,pop);  
}

function addClickEvent(myView, popView){
	myView.addEventListener('click', function(e){
		if(e.source.btnAction == "cancel"){
			cancel();
		}else{ 
			process(); 
		}
	});
}

function cancel(){
	 
	cancelBtn.removeEventListener('click',cancel);
	confirmBtn.removeEventListener('click',process);
	pop.close(); 
}

Ti.API.addEventListener('confirmSuccess', function(e){
	submit();
});

Ti.API.addEventListener('submitSuccess', function(e){
	success();
});

Ti.API.addEventListener('submitFailed', function(e){
	fail();
});