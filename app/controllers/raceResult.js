// $.picker1.setSelectedRow(0,false);
// $.picker2.setSelectedRow(0,false);

var todayDate = new Date().getDate();
var todayMonth = new Date().getMonth()+1;
var todayYear = new Date().getFullYear();

var toDisplay = todayDate.toString() + "/" + todayMonth.toString() + "/" + todayYear.toString();

$.date.text = toDisplay;

function back(){	
	DRAWER.navigation("member");
}

function raceNo(){
	
}

function date(){
	
}

function showDate(){
	$.dateContainer.height = 265;
	$.dateView.height = 265;
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
	var value = $.picker.value;
	var dayInt = value.getDate();
	var monthInt = value.getMonth()+1;
	var yearInt = value.getFullYear() ;
	
	var day = dayInt.toString();
	var month = monthInt.toString();
	var year = yearInt.toString();
	
	displayDate(day,month,year);
}

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
