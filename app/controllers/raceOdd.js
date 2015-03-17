var args = arguments[0] || {}; 
var param_runner_position = args.runner || "";
var param_runner_id = args.runner_id || "";
var param_venue = args.venue || "";
var param_race_id = args.race_id || "1";
DRAWER.disableDrawer();
//var param_race_id = 2;
var raceCardInfo = Alloy.createCollection('raceCardInfo'); 
var raceCardDetails = Alloy.createCollection('raceCardDetails');
var infoValue = raceCardInfo.getRaceCardInfo();
 
var detailsValue = raceCardDetails.getRaceCardDetails(param_race_id);
var favourite = Alloy.createCollection('favourite');

var apiFlag = false;
Ti.App.Properties.setString('module',"member");
Ti.App.Properties.setString('root',"0");
var raceNo;
var venue;

if(param_venue != ""){
	venue = param_venue;
}
COMMON.construct($);
COMMON.showLoading();
 
setPicker1();  
if(Ti.Platform.osname == "android") {
	if(param_race_id == "1") {
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
	 
	setPicker2();
	if(Ti.Platform.osname == "android") { 
		var selectedRunner = 0;
		if(param_runner_position != ""){
			selectedRunner = parseInt(param_runner_position) - 1;
			if(selectedRunner == "0") {
				if(param_race_id == "1") { 
					API.futureRace({
						raceNo: param_runner_id,
						venue: param_venue
					});
				}
				param_runner_position =   "";
				param_runner_id =  "";
				param_venue =  "";
				param_race_id =  "1";
			} else {
				$.picker2.setSelectedRow(0,selectedRunner,false);
			}
		} else {
			
			if(param_runner_id != ""){ 
				API.futureRace({
					raceNo: param_runner_id,
					venue: param_venue
				});
				param_runner_position =   "";
				param_runner_id =  "";
				param_venue =  "";
				param_race_id =  "1";
			}else{ 
				if(raceNo == null) { 
					API.futureRace({
						raceNo: $.picker2.getSelectedRow(0).title,//1,//$.picker2.getSelectedRow(0).title
						venue: venue
					});
				} else { 
					apiFlag = true;
					API.futureRace({
						raceNo: detailsValue[0].runner_id,
						venue: venue
					});
				}
			}
			
		}
	} if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad") { 
		var selectedRunner = 0;
		if(param_runner_position != ""){ 
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
		$.picker1.add(data);
	}
	 
	$.picker1.setSelectedRow(0,venueIndex,false);
	 
	if(Ti.Platform.osname == "android") { 
		if(param_race_id != "1") {
			var raceIndex = infoValue[venueIndex].id;
			refresh(raceIndex.toString());
		}
	} 
}

function setPicker2(){  
	raceNo = detailsValue[0].runner_id;
	for(var i=0; i < detailsValue.length; i++){
		var rec = detailsValue[i].runner_id; 
	  	var row = Ti.UI.createPickerRow({
	   		title: rec.toString(),
	   		titleData: rec.toString()
	  	}); 
	  	$.picker2.add(row);
		 
	} 
	if(Ti.Platform.osname == "android") { 
		if(param_race_id != "1") { 
			API.futureRace({
				raceNo: param_runner_id,
				venue: param_venue
			});
			
			param_runner_position =   "";
			param_runner_id =  "";
			param_venue =  "";
			param_race_id =  "1";
		}
	} 
}
 
function back(){	
	DRAWER.enableDrawer();	
	Ti.App.Properties.setString('module',"");
	DRAWER.navigation("member",1);
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
	if(param_race_id != "1") { 
		API.futureRace({
			raceNo: raceNo,
			venue: param_venue
		});
		param_runner_position =   "";
		param_runner_id =  "";
		param_venue =  "";
		param_race_id =  "1";
	} else { 
		if(apiFlag == false) {
			API.futureRace({
				raceNo: raceNo,
				venue: venue
			});
		}
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
		$.mtr.text = "Min to Race: " + data.min_to_race;
		
		var win_odd = data.win_odd;
		var win = win_odd.split("$");
		var runner = data.runner;
		var run = runner.split("$");
		var pla_odd = data.pla_odd;
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
	apiFlag = false;
}

function tableBetEvent(contentView,runner,race_id){
	contentView.addEventListener('click', function(e){ 
		if(runner != "" && runner != '-'){
			Ti.App.Properties.setString('module','raceOdd');
			Ti.App.Properties.setString('presetRunner', parseInt(runner));
			//Ti.App.Properties.setString('presetBet', race_id);
			DRAWER.navigation("play",1,{venue: venue, runner: runner, race_id: race_id});
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

function done1() {
	$.venueView.height = 50;
	$.venueContentView.height = 50;
	$.pickerView1.height = 50;
	$.pickerView1.setVisible(false);
	$.done1.setVisible(false);
	$.picker1.setVisible(false);
}

function done2() {
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