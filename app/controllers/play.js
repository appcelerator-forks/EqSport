var balance = Alloy.createCollection('balance'); 
var balanceInfo = balance.getBalance();
var raceCardInfo = Alloy.createCollection('raceCardInfo'); 
var raceCardDetails = Alloy.createCollection('raceCardDetails');
var infoValue = raceCardInfo.getRaceCardInfo();
var detailsValue = raceCardDetails.getRaceCardDetails("1"); 
$.balance.setText("Your available balance is " + balanceInfo.amount);
//console.log(balanceInfo);
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
		$.picker2.setSelectedRow(0,(detailsValue.length-1),false);
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
	 
	/*var list = [];
	for(var j = 0 ; j < detailsValue.length; j++){	
		var geo = detailsValue[j].runner_id;
		list.push(geo); 
	} */
	
	for(var i=0; i < detailsValue.length; i++){
	  var rec = detailsValue[i].runner_id;
	  var row = Ti.UI.createPickerRow({
	    title: rec.toString()
	  });
	  //column1.addRow(row);
	  $.picker2.add(row);
	}
	
	//$.picker2.add(column1);
	 
}

if(Ti.Platform.osname == "android"){
	$.picker1.setSelectedRow(0,false);
	$.picker2.setSelectedRow(0,false);
	$.picker3.setSelectedRow(0,false);
}

if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad"){ 
	$.picker1.setSelectedRow(0,(infoValue.length-1),false);
	//$.picker2.setSelectedRow(0,(detailsValue.length-1),false);
	$.picker3.setSelectedRow(0,8,false);
}

if(Ti.Platform.osname == "android"){
	$.scrollView2.scrollType = "horizontal";
	$.scrollView2.overScrollMode = Titanium.UI.Android.OVER_SCROLL_NEVER;
	$.scrollView.overScrollMode = Titanium.UI.Android.OVER_SCROLL_NEVER;
}

var containerView = Ti.UI.createView({
	layout: "composite",
	height:"100%",
	width:"100%",
	backgroundColor: "black"
});

var cancelBtn;
var confirmBtn;

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
		//$.venue.text = "Venue: " + venue;
	}
	
	refresh(e.row.race_id);
}

function raceNo(e){
	raceNo = e.row.title; 
	if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad"){
		$.raceNoView.height = 50;
		$.raceNoContentView.height = 50;
		$.pickerView2.height = 50;
		$.pickerView2.setVisible(false);
		$.done2.setVisible(false);
		$.picker2.setVisible(false);
		$.raceNoLabel.text = raceNo;
		// $.venue.text = "Venue: " + venue;
		// $.race.text = "Race: " + raceNo;
	}
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

if(Ti.Platform.osname == "android"){
	$.bet.addEventListener('focus', function f(e){
	    $.bet.blur();
	    $.bet.removeEventListener('focus', f);
	});
}

function back(){	
	DRAWER.navigation("member",1);
}

function confirm(){
	
	if(venue == "" || raceNo =="" || pool == "" || $.runner.value == "" || $.bet.value =="" ) {
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
	
	console.log(venue);
	console.log(raceNo);
	console.log(pool);
	console.log($.runner.value);
	console.log($.bet.value);

	
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
	
	if(Ti.Platform.osname == "android")
	{
		contentView.overScrollMode = Titanium.UI.Android.OVER_SCROLL_NEVER;
	}
	
	var horizontalView1 = Ti.UI.createView({
		layout:"horizontal",
		height:"40",
		width:"100%",
		top: 10
	});
	
	var horizontalView2 = Ti.UI.createView({
		layout:"horizontal",
		height:"40",
		width:"100%"
	});
	
	var horizontalView3 = Ti.UI.createView({
		layout:"horizontal",
		height:"40",
		width:"100%"
	});
	
	var horizontalView4 = Ti.UI.createView({
		layout:"horizontal",
		height:"40",
		width:"100%"
	});
	
	var horizontalView5 = Ti.UI.createView({
		layout:"horizontal",
		height:"40",
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
		text: venue,
		width: "50%"
	});
	
	var raceNoLabelValue = Ti.UI.createLabel({
		color: 'black',
		text: raceNo,
		width: "50%"
	});
	
	var poolLabelValue = Ti.UI.createLabel({
		color: 'black',
		text: pool,
		width: "50%"
	});
	
	var runnerLabelValue = Ti.UI.createLabel({
		color: 'black',
		text: $.runner.value,
		width: "50%"
	});
	
	var betLabelValue = Ti.UI.createLabel({
		color: 'black',
		text: $.bet.value,
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
		width: 80,
		height: 80,
		right: 10
	});

	confirmBtn = Ti.UI.createImageView({
		image:'/images/Button_Confirm.png',
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
	var pop = API.popup(containerView,config);
	pop.open({fullscreen:true, navBarHidden: true}); 
	addClickEvent(cancelBtn,pop); 
	confirmBtn.addEventListener('click',process);
}

function addClickEvent(myView, popView){
	myView.addEventListener('click', function(e){
		popView.close(); 
	});
}


function cancel()
{
	cancelBtn.removeEventListener('click',cancel);
	confirmBtn.removeEventListener('click',process);
	$.mainView.remove(containerView);
}

function process()
{
	//send data to server
	
	
	cancelBtn.removeEventListener('click',cancel);
	confirmBtn.removeEventListener('click',process);
	$.mainView.remove(containerView);
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

function hidePicker() {
	$.picker1.setVisible(true);
	$.picker2.setVisible(true);
	$.picker3.setVisible(true);
}

function done1()
{
	$.venueView.height = 50;
	$.venueContentView.height = 50;
	$.pickerView1.height = 50;
	$.pickerView1.setVisible(false);
	$.done1.setVisible(false);
	$.picker1.setVisible(false);
}

function done2()
{
	$.raceNoView.height = 50;
	$.raceNoContentView.height = 50;
	$.pickerView2.height = 50;
	$.pickerView2.setVisible(false);
	$.done2.setVisible(false);
	$.picker2.setVisible(false);
}

function done3()
{
	$.poolView.height = 50;
	$.poolContentView.height = 50;
	$.pickerView3.height = 50;
	$.pickerView3.setVisible(false);
	$.done3.setVisible(false);
	$.picker3.setVisible(false);
}