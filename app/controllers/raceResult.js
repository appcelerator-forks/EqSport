// $.picker1.setSelectedRow(0,false);
// $.picker2.setSelectedRow(0,false);

//var isKeyboardFocus = 0;

var transformPicker = Titanium.UI.create2DMatrix().scale(0.8);

if(Ti.Platform.osname == "android"){
	$.picker.width = "100%";
	$.picker.top = 50;
}

if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad"){ 
	$.picker.width = "125%";
	$.picker.transform = transformPicker;
	$.picker.top = -20;
}

var value = new Date();
var dayInt = ("0"+value.getDate()).slice(-2);
var monthInt = ("0"+(value.getMonth()+1)).slice(-2);
var yearInt = value.getFullYear();
$.picker.value = value;

displayDate(dayInt.toString(),monthInt.toString(),yearInt.toString());

// var toDisplay = dayInt.toString() + "/" + monthInt.toString() + "/" + yearInt.toString();
// 
// $.date.text = toDisplay;

function back(){	
	$.raceNo.removeEventListener('blur', submitText);
	$.mainView.removeEventListener('click', hideKeyboard);
	DRAWER.navigation("member",1);
}

function showDate(){
	$.dateContainer.height = 275;
	$.dateView.height = 275;
	$.pickerView.show();
}

function displayDate(day,month,year){
	var string = day + "/" + month + "/" + year;
	$.date.text = string;
}

function done(){
	//isKeyboardFocus = 1;
	console.log("done");
	$.pickerView.hide();
	$.dateContainer.height = 50;
	$.dateView.height = 50;
	value = $.picker.value;
	dayInt = ("0"+value.getDate()).slice(-2);
	monthInt = ("0"+(value.getMonth()+1)).slice(-2);
	yearInt = value.getFullYear() ;
	
	var day = dayInt.toString();
	var month = monthInt.toString();
	var year = yearInt.toString();
	var date = day + month + year;
	
	displayDate(day,month,year);
	
	if($.raceNo.value != "")
	{
		console.log("api");
		//hideKeyboard();
		API.getRTOResults({
			raceNumber : $.raceNo.value,
			raceDate: date
		});
	}
	else
	{
		//$.raceNo.focus();
		//triggerRace();
	}
}

function submitText()
{
	$.raceNo.removeEventListener('blur', submitText);
	console.log("submitText");
	
	if($.raceNo.value != "")
	{
		value = $.picker.value;
		dayInt = ("0"+value.getDate()).slice(-2);
		monthInt = ("0"+(value.getMonth()+1)).slice(-2);
		yearInt = value.getFullYear() ;
		
		var day = dayInt.toString();
		var month = monthInt.toString();
		var year = yearInt.toString();
		var date = day + month + year;
		
		
		console.log("sending api");
		API.getRTOResults({
			raceNumber : $.raceNo.value,
			raceDate: date
		});
	}
}


//$.raceNo.addEventListener('focus', done);

function triggerRace()
{
	$.pickerView.hide();
	$.dateContainer.height = 50;
	$.dateView.height = 50;
	$.raceNo.focus();
	//isKeyboardFocus = 1;
	$.raceNo.addEventListener('blur', submitText);
	//alert("trigger");
}

function hideKeyboard(e) {
	// if(isKeyboardFocus == 1)
	// {
// 		
		// isKeyboardFocus = 0;
		// return;
	// }
	// else{
		// $.raceNo.blur();
		// isKeyboardFocus = 0;
		// //done();
		// submitText();
	// }
	console.log(e.source);
	if (e.source != '[object raceNo]') {
		$.raceNo.blur();
		//isKeyboardFocus = 0;
	}
}

$.mainView.addEventListener('click', hideKeyboard);
/*
for(var i=0, i < arr.length, i++)
{
	var contentView+i = Titanium.UI.createView({
		layout: "horizontal",
		width:"100%",
		height:60
	});
	
	var leftView+i = Titanium.UI.createView({
		width:"25%"
	});
	
	var leftLabel+i = Ti.UI.createLabel({
		color: "black",
		text: arr[i].value
	});
	
	var centerView+i = Titanium.UI.createView({
		width:"44.9%"
	});
	
	var centerLabel+i = Ti.UI.createLabel({
		color: "black",
		text: arr[i].value
	});
	
	var rightView+i = Titanium.UI.createView({
		width:"30%"
	});
	
	var rightLabel+i = Ti.UI.createLabel({
		color: "black",
		text: arr[i].value
	});
	
	var lineView = Titanium.UI.createView({
		backgroundColor: "#A5A5A5",
		width:"90%",
		height:1
	});
	
	var centerLineView = Titanium.UI.createView({
		layout: "composite",
		width:"100%",
		height: 1,
		bottom: 2
	});
	
	leftView+i.add(leftLabel+i);
	centerView+i.add(centerLabel+i);
	rightView+i.add(rightLabel+i);
	contentView+i.add(leftView+i);
	contentView+i.add(centerView+i);
	contentView+i.add(rightView+i);
	centerLineView.add(lineView);
	$.scrollView.add(contentView+i);
	$.scrollView.add(centerLineView);
}
*/

function done2()
{
	$.venueView.height = 50;
	$.venueContentView.height = 50;
	$.pickerView2.height = 50;
	$.pickerView2.setVisible(false);
	$.done2.setVisible(false);
	$.picker2.setVisible(false);
}

function showVenue() {
	$.venueView.height = 250;
	$.venueContentView.height = 250;
	$.pickerView2.height = 250;
	$.pickerView2.setVisible(true);
	$.done2.setVisible(true);
	$.picker2.setVisible(true);
	//return false;
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
	//reload result view
	//refresh(e.row.race_id);
}
