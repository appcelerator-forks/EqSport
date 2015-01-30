var raceCardInfo = Alloy.createCollection('raceCardInfo'); 
var raceCardDetails = Alloy.createCollection('raceCardDetails');
var infoValue = raceCardInfo.getRaceCardInfo();
var detailsValue = raceCardDetails.getRaceCardDetails("1");
var favourite = Alloy.createCollection('favourite');
Ti.App.Properties.setString('module',"member");
Ti.App.Properties.setString('root',"0");
setPicker1(); 
 
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
	//console.log(detailsValue);
	for(var i=0; i < detailsValue.length; i++){
		var favouriteInfo = favourite.getFavouriteInfoByVenueAndRaceNo(venue,detailsValue[i].runner_id);  
	 
		if(favouriteInfo.length > 0){
			var rec = detailsValue[i].runner_id;
		  	var row = Ti.UI.createPickerRow({
		   	 title: rec.toString()
		  	}); 
		  	$.picker2.add(row);
		}
	  	
	}
}

if(Ti.Platform.osname == "android"){
	$.picker1.setSelectedRow(0,false);
	$.picker2.setSelectedRow(0,false);
}

if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad"){ 
	// $.picker1.setSelectedRow(0,3,false);
	// $.picker2.setSelectedRow(0,3,false);
	$.picker1.setSelectedRow(0,0,false);
	//$.picker2.setSelectedRow(0,0,false);
}

function back(){	
	Ti.App.Properties.setString('module',"");
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
	refresh(e.row.race_id);
}

function changeRaceNo(e){
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
	raceOdd(venue,raceNo);
}

function raceOdd(venue,raceNo){
	removeAllChildren($.scrollView);
	
	var favouriteInfo = favourite.getFavouriteInfoByVenueAndRaceNo(venue,raceNo);  
	if(favouriteInfo == "") {
		$.mtr.text = "Min to Race: -";
		var win = "-";
		var run = "-";
		var pla = "-";
	} else {
		$.mtr.text = "Min to Race: " + favouriteInfo[0].min_to_race;
		
		var win_odd = favouriteInfo[0].win_odd;
		var win = win_odd.split("$");
		var runner = favouriteInfo[0].runner;
		var run = runner.split("$");
		var pla_odd = favouriteInfo[0].pla_odd;
		var pla = pla_odd.split("$"); 
	}
 
	for(var i=0; i < win.length; i++) { 
		var contentView = Titanium.UI.createView({
			layout: "horizontal",
			width:"100%",
			height:60
		});
		
		var leftView = Titanium.UI.createView({
			width:"33%"
		});
		
		var leftLabel = Ti.UI.createLabel({
			color: "black",
			text: win[i]
		});
		
		var centerView = Titanium.UI.createView({
			width:"33%"
		});
		
		var centerLabel = Ti.UI.createLabel({
			color: "black",
			text: run[i]
		});
		
		var rightView = Titanium.UI.createView({
			width:"33%"
		});
		
		var rightLabel = Ti.UI.createLabel({
			color: "black",
			text: pla[i]
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
		tableBetEvent(contentView,run[i], raceNo);
		$.scrollView.add(contentView);
		$.scrollView.add(centerLineView);
	}
}

function tableBetEvent(contentView,runner,race_id){
	contentView.addEventListener('click', function(e){ 
		if(runner != "" && runner != '-'){
			Ti.App.Properties.setString('module','raceOdd');
			DRAWER.navigation("play",1,{runner: runner, race_id: race_id});
		}
	});
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
	if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad"){
		$.venueView.height = 50;
		$.venueContentView.height = 50;
		$.pickerView1.height = 50;
		$.pickerView1.setVisible(false);
		$.done1.setVisible(false);
		$.picker1.setVisible(false);
		$.venueLabel.text = venue;
	}
	
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