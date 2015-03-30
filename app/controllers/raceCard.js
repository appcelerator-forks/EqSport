Ti.App.Properties.setString('root',"0");
Ti.App.Properties.setString('module',"member");
var raceCardInfo = Alloy.createCollection('raceCardInfo'); 
var raceCardDetails = Alloy.createCollection('raceCardDetails');
var infoValue = raceCardInfo.getRaceCardInfo();
var detailsValue = raceCardDetails.getRaceCardDetails("1");
DRAWER.disableDrawer();
if(Ti.Platform.osname == "android"){
	$.date.width = "90%";
}
$.picker1.setSelectedRow(0,0,false);

setPicker1();  
function setPicker1(){  
	for(var i = 0 ; i < infoValue.length; i++){
		var venue = infoValue[i].venue;
		var race_id = infoValue[i].id;
		//venue =  venue.split("(");
		var data = Ti.UI.createPickerRow({title:venue,race_id:race_id.toString()});
		//$.pickerColumn1.addRow(data);
		$.picker1.add(data);
	}
	 
}
 
//$.picker2.setSelectedRow(0,false);

function back(){	
	DRAWER.enableDrawer();	
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
	//reload result view
	refresh(e.row.race_id);
}

function refresh(race_id){
	removeAllChildren($.scrollView);
	 
	detailsValue = raceCardDetails.getRaceCardDetails(race_id);
	console.log(detailsValue);
	var theDate = detailsValue[0].runner_date;
	var dateConvert = theDate.split('/');
	 
	$.date.text = dateConvert[1] + "/"+dateConvert[0]+"/"+dateConvert[2];
	var position = 1;
	for(var i=0; i < detailsValue.length; i++) {
		var contentView = Titanium.UI.createView({
			layout: "horizontal",
			width:"100%",
			height:60
		});
		
		var leftView = Titanium.UI.createView({
			width:"30%"
		});
		
		var leftLabel = Ti.UI.createLabel({
			color: "black",
			text: detailsValue[i].runner_id
		});
		
		var centerView = Titanium.UI.createView({
			width:"70%"
		});
		
		var centerLabel = Ti.UI.createLabel({
			color: "black",
			text: detailsValue[i].runner_time
		});
		
		// var rightView+i = Titanium.UI.createView({
			// width:"20%"
		// });
		
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
		contentView.add(leftView);
		contentView.add(centerView);
		//contentView+i.add(rightView+i);
		centerLineView.add(lineView);
		
		tableCardEvent(contentView,position,race_id,detailsValue[i].runner_id);
		
		$.scrollView.add(contentView);
		$.scrollView.add(centerLineView);
		position++;
	}
}

function tableCardEvent(contentView,runner_position,race_id,runner_id){
	contentView.addEventListener('click', function(e){ 
		if(runner_position != '-'){
			Ti.App.Properties.setString('module','raceCard');
			//Ti.App.Properties.setString('presetRunner', runner); 
			DRAWER.navigation("raceOdd",1,{runner: runner_position, venue: $.picker1.getSelectedRow(0).title, race_id: race_id, runner_id:runner_id});
		}
	});
} 

function done1(){
	$.venueView.height = 50;
	$.venueContentView.height = 50;
	$.pickerView1.height = 50;
	$.pickerView1.setVisible(false);
	$.done1.setVisible(false);
	$.picker1.setVisible(false);
}

function showVenue() {
	if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad"){
		$.venueView.height = 250;
		$.venueContentView.height = 250;
		$.pickerView1.height = 250;
		$.pickerView1.setVisible(true);
		$.done1.setVisible(true);
		$.picker1.setVisible(true);
		
	}
	//return false;
}

/**********************
 * Clear object and memory
 **********************/
var clearObject = function(){ 
	raceCardInfo = null; 
	raceCardDetails = null; 
	infoValue = null; 
	detailsValue = null;  
	Ti.App.removeEventListener("clearObject", clearObject);
};
Ti.App.addEventListener("clearObject", clearObject);	