if(Ti.Platform.osname == "android"){
	$.picker1.setSelectedRow(0,false);
	$.picker2.setSelectedRow(0,false);
}

if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad"){ 
	$.picker1.setSelectedRow(0,3,false);
	$.picker2.setSelectedRow(0,3,false);
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
		$.raceNoLabel.text = venue;
	}
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
		width:"33%"
	});
	
	var leftLabel+i = Ti.UI.createLabel({
		color: "black",
		text: arr[i].value
	});
	
	var centerView+i = Titanium.UI.createView({
		width:"33%"
	});
	
	var centerLabel+i = Ti.UI.createLabel({
		color: "black",
		text: arr[i].value
	});
	
	var rightView+i = Titanium.UI.createView({
		width:"33%"
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

function showVenue() {
	$.venueView.height = 250;
	$.venueContentView.height = 250;
	$.pickerView1.height = 250;
	$.pickerView1.setVisible(true);
	$.done1.setVisible(true);
	$.picker1.setVisible(true);
	return false;
}

function showRaceNo() {
	$.raceNoView.height = 250;
	$.raceNoContentView.height = 250;
	$.pickerView2.height = 250;
	$.pickerView2.setVisible(true);
	$.done2.setVisible(true);
	$.picker2.setVisible(true);
	return false;
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