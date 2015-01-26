var arr = [];
API.getRTOResults({
	raceNumber : "",
	raceDate: ""
});
 
 var result = [];

var apiResult = function(e){  
	removeAllChildren($.scrollView);
	arr = e.raceResult;
	displayDate(arr[0].raceDay,arr[0].raceMonth,arr[0].raceYear);
	var locations = [];
	for(var i=0; i < arr.length; i++){
		locations.push(arr[i].location); 
		result[i]=[arr[i].location, arr[i].raceRow1, arr[i].raceRow2, arr[i].raceRow3, arr[i].raceNo];
	}
	if($.picker2.columns[0]) {
	    var _col = $.picker2.columns[0];
	        var len = _col.rowCount; 
	        for(var x = len-1; x >= 0; x-- ){
	                var _row = _col.rows[x];
	                _col.removeRow(_row);
	        }
	}
	setPicker2(locations);
	if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad") { 
		$.picker2.setSelectedRow(0,0,false);
	}
	 
};
Ti.App.addEventListener('raceResult', apiResult);

function setPicker2(location){  
	for(var i = 0 ; i < location.length; i++){
		var data = Ti.UI.createPickerRow({title:location[i]});
		//$.pickerColumn1.addRow(data);
		$.picker2.add(data);
	}
	 
}

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
	
	if($.raceNo.value != "") {
	 
		API.getRTOResults({
			raceNumber : $.raceNo.value,
			raceDate: date
		});
 
	} else { 
	}
}

function submitText()
{
	$.raceNo.removeEventListener('blur', submitText); 
	
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
		
		 
		API.getRTOResults({
			raceNumber : $.raceNo.value,
			raceDate: date
		});
	}
}

function triggerRace()
{
	$.pickerView.hide();
	$.dateContainer.height = 50;
	$.dateView.height = 50;
	$.raceNo.focus();
	$.raceNo.addEventListener('blur', submitText);
}

function hideKeyboard(e) { 
	if (e.source != '[object raceNo]') {
		$.raceNo.blur();
	}
}

$.mainView.addEventListener('click', hideKeyboard);

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
		$.pickerView2.height = 50;
		$.pickerView2.setVisible(false);
		$.done2.setVisible(false);
		$.picker2.setVisible(false);
		$.venueLabel.text = venue;
	} 
	refresh(venue);
}

function refresh(venue){
	removeAllChildren($.scrollView);
	var index = null;
	
	//find index
	for(var i = 0; i<result.length; i++)
	{
		if(result[i][0] == venue)
		{
			index = i;
		}
	}
	
	if(index != null)
	{
		var contentView = Titanium.UI.createView({
			layout: "horizontal",
			width:"100%",
			height:60
		});
		
		var leftView = Titanium.UI.createView({
			width:"25%"
		});
		
		var leftLabel = Ti.UI.createLabel({
			color: "black",
			text: result[index][1]
		});
		
		var centerView = Titanium.UI.createView({
			width:"44.9%"
		});
		
		var centerLabel = Ti.UI.createLabel({
			color: "black",
			text: result[index][2]
		});
		
		var rightView = Titanium.UI.createView({
			width:"30%"
		});
		
		var rightLabel = Ti.UI.createLabel({
			color: "black",
			text: result[index][3]
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
		
		leftView.add(leftLabel);
		centerView.add(centerLabel);
		rightView.add(rightLabel);
		contentView.add(leftView);
		contentView.add(centerView);
		contentView.add(rightView);
		centerLineView.add(lineView);
		$.scrollView.add(contentView);
		$.scrollView.add(centerLineView);
		$.raceTitle.text = result[index][4];
		$.resultTitle.text = (result[index][2]).replace("-", ",");
	}
	else
	{
		var contentView = Titanium.UI.createView({
			layout: "horizontal",
			width:"100%",
			height:60
		});
		
		var leftView = Titanium.UI.createView({
			width:"25%"
		});
		
		var leftLabel = Ti.UI.createLabel({
			color: "black",
			text: "-"
		});
		
		var centerView = Titanium.UI.createView({
			width:"44.9%"
		});
		
		var centerLabel = Ti.UI.createLabel({
			color: "black",
			text: "-"
		});
		
		var rightView = Titanium.UI.createView({
			width:"30%"
		});
		
		var rightLabel = Ti.UI.createLabel({
			color: "black",
			text: "-"
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
		
		leftView.add(leftLabel);
		centerView.add(centerLabel);
		rightView.add(rightLabel);
		contentView.add(leftView);
		contentView.add(centerView);
		contentView.add(rightView);
		centerLineView.add(lineView);
		$.scrollView.add(contentView);
		$.scrollView.add(centerLineView);
		$.raceTitle.text = "-";
		$.resultTitle.text = "-";
	}
	
}
