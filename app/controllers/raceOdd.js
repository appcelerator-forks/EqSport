var args = arguments[0] || {}; 
var param_runner_position = args.runner || "";
var param_runner_id = args.runner_id || "";
var param_venue = args.venue || "";
var param_race_id = args.race_id || "1";
//var param_race_id = 2;
var raceCardInfo = Alloy.createCollection('raceCardInfo'); 
var raceCardDetails = Alloy.createCollection('raceCardDetails');
var infoValue = raceCardInfo.getRaceCardInfo();
console.log("param_race_id: "+param_race_id);
var detailsValue = raceCardDetails.getRaceCardDetails(param_race_id);
console.log("***detailsValue***");
console.log(detailsValue);
var favourite = Alloy.createCollection('favourite');

Ti.App.Properties.setString('module',"member");
Ti.App.Properties.setString('root',"0");
var raceNo;
var venue;
COMMON.construct($);
COMMON.showLoading();

if(param_runner_position == ""){
	if(Ti.Platform.osname == "android"){
		/* console.log("outer setter");
		var selectedRunner = 0;
		if(param_runner_position != ""){
			selectedRunner = param_runner_position;	
		}*/
		//$.picker1.setSelectedRow(0,0,false);
		//$.picker2.setSelectedRow(0,0,false);
	}
}


setPicker1(); 
console.log("splitter");
if(Ti.Platform.osname == "android")
{
	if(param_race_id == "1")
	{
		setPicker2();
	}
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
	console.log("detailsValue refresh");
	console.log(detailsValue);
	setPicker2();
	if(Ti.Platform.osname == "android")
	{
		console.log("hello");
		var selectedRunner = 0;
		if(param_runner_position != ""){
			selectedRunner = parseInt(param_runner_position) - 1;
			if(selectedRunner == "0")
			{
				if(param_race_id == "1")
				{
					console.log("API 1");
					API.futureRace({
						raceNo: param_runner_id,
						venue: param_venue
					});
				}
			}
			else
			{
				$.picker2.setSelectedRow(0,selectedRunner,false);
			}
		}
		else
		{
			
			if(param_runner_id != ""){
				console.log("API 2");
				API.futureRace({
					raceNo: param_runner_id,
					venue: param_venue
				});
			}else{
				console.log("$.picker2");
				console.log($.picker2.getSelectedRow(0));
				console.log(raceNo);
				console.log(venue);
				//console.log($.picker2.getSelectedRow(0).titleData);
				// API.futureRace({
					// raceNo: $.picker2.getSelectedRow(0).title,
					// venue: venue
				// });
				if(raceNo == null)
				{
					console.log("raceNo null");
					console.log($.picker2.getSelectedRow(0).title);
					console.log("API 3");
					API.futureRace({
						raceNo: $.picker2.getSelectedRow(0).title,
						venue: venue
					});
				}
				else
				{
					console.log("raceNo NOT null");
					console.log("API 4");
					API.futureRace({
						raceNo: raceNo,
						venue: venue
					});
				}
			}
			
		}
	}
	if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad")
	{
		//$.picker2.setSelectedRow(0,(detailsValue.length-1),false);
		var selectedRunner = 0;
		if(param_runner_position != ""){
			console.log("param_runner_position: " +param_runner_position);
			selectedRunner = parseInt(param_runner_position) - 1;	
		}
		$.picker2.setSelectedRow(0,selectedRunner,false);
	}
}

function setPicker1(){  
	var venueIndex = 0;
	for(var i = 0 ; i < infoValue.length; i++){
		var venue1 = infoValue[i].venue;
		if(param_venue == venue1)
		{
			venueIndex = i;
			
		}
		var race_id = infoValue[i].id;
		var data = Ti.UI.createPickerRow({title:venue1.toString(),race_id:race_id.toString()});
		//$.pickerColumn1.addRow(data);
		$.picker1.add(data);
	}
	console.log("venueIndex: "+venueIndex);
	$.picker1.setSelectedRow(0,venueIndex,false);
	console.log("start mytest");
	if(Ti.Platform.osname == "android")
	{
		console.log(param_runner_position);
		if(param_race_id != "1")
		{
			var raceIndex = infoValue[venueIndex].id;
			refresh(raceIndex.toString());
		}
	}
	console.log("end mytest");
}

function setPicker2(){  
	for(var i=0; i < detailsValue.length; i++){
		var rec = detailsValue[i].runner_id;
		console.log("rec");
		console.log(rec);
	  	var row = Ti.UI.createPickerRow({
	   		title: rec.toString(),
	   		titleData: rec.toString()
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
	console.log("start mytest picker2");
	if(Ti.Platform.osname == "android")
	{
		console.log(param_runner_position);
		if(param_race_id != "1")
		{
			console.log("param_runner_id: "+param_runner_id);
			console.log("param_venue: "+param_venue);
			console.log("API 5");
			API.futureRace({
				raceNo: param_runner_id,
				venue: param_venue
			});
		}
	}
	console.log("end mytest picker2");
}



if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad"){ 
	// $.picker1.setSelectedRow(0,3,false);
	// $.picker2.setSelectedRow(0,3,false);
	//$.picker1.setSelectedRow(0,0,false);
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
	//raceOdd(venue,raceNo);
	console.log("API 6");
	console.log("raceNo: "+raceNo);
	console.log("venue: "+venue);
	if(param_race_id != "1")
	{
		console.log("if");
		API.futureRace({
			raceNo: raceNo,
			venue: param_venue
		});
	}
	else
	{
		console.log("else");
		API.futureRace({
			raceNo: raceNo,
			venue: venue
		});
	}
}

function raceOdd(data){
	COMMON.showLoading();
	removeAllChildren($.scrollView);
	if(data == "") {
		$.mtr.text = "Min to Race: -";
		var win = "-";
		var run = "-";
		var pla = "-";
	} else {
		$.mtr.text = "Min to Race: " + data[0].min_to_race;
		
		var win_odd = data[0].win_odd;
		var win = win_odd.split("$");
		var runner = data[0].runner;
		var run = runner.split("$");
		var pla_odd = data[0].pla_odd;
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
	COMMON.hideLoading();
}

function tableBetEvent(contentView,runner,race_id){
	contentView.addEventListener('click', function(e){ 
		if(runner != "" && runner != '-'){
			Ti.App.Properties.setString('module','raceOdd');
			Ti.App.Properties.setString('presetRunner', parseInt(runner));
			Ti.App.Properties.setString('presetBet', race_id);
			DRAWER.navigation("play",1,{runner: runner, race_id: race_id});
		}
	});
} 

function showVenue() {
	$.venueView.height = 250;
	$.venueContentView.height = 250;
	$.pickerView1.height = 250;
	$.pickerView1.setVisible(true);
	$.done1.setVisible(true);
	$.picker1.setVisible(true);
	$.venueLabel.text = venue;
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

Ti.App.addEventListener("futureRace", function(e) {
	raceOdd(e.returnData);
});