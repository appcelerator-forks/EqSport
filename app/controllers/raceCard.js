// var res = API.raceCard({
	// title: ""
// });

var raceCardInfo = Alloy.createCollection('raceCardInfo'); 
var raceCardDetails = Alloy.createCollection('raceCardDetails');
var infoValue = raceCardInfo.getRaceCardInfo();
var detailsValue = raceCardDetails.getRaceCardDetails("1");

setPicker1(); 

function setPicker1(){ 
	console.log("infoValue.length: "+infoValue.length);
	for(var i = 0 ; i < infoValue.length; i++){
		var venue = infoValue[i].venue;
		var race_id = infoValue[i].id;
		var data = Ti.UI.createPickerRow({title:venue.toString(),race_id:race_id.toString()});
		//$.pickerColumn1.addRow(data);
		$.picker1.add(data);
	}
	 
}

if(Ti.Platform.osname == "android"){
	$.picker1.setSelectedRow(0,false);
}
if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad"){ 
	//$.picker1.setSelectedRow(0,3,false);
	$.picker1.setSelectedRow(0,0,false);
}
//$.picker2.setSelectedRow(0,false);

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
	//reload result view
	refresh(e.row.race_id);
}

function refresh(race_id){
	removeAllChildren($.scrollView);
	// if($.picker1.columns[0]) {
	    // var _col = $.picker1.columns[0];
	        // var len = _col.rowCount;
	        // console.log("len: "+len);
	        // for(var x = len-1; x >= 0; x-- ){
	                // var _row = _col.rows[x];
	                // _col.removeRow(_row);
	        // }
	// }
	detailsValue = raceCardDetails.getRaceCardDetails(race_id);
	
	$.date.text = detailsValue[0].runner_date;
	for(var i=0; i < detailsValue.length; i++)
	{
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
		$.scrollView.add(contentView);
		$.scrollView.add(centerLineView);
	}
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

function done1()
{
	$.venueView.height = 50;
	$.venueContentView.height = 50;
	$.pickerView1.height = 50;
	$.pickerView1.setVisible(false);
	$.done1.setVisible(false);
	$.picker1.setVisible(false);
}

function showVenue() {
	$.venueView.height = 250;
	$.venueContentView.height = 250;
	$.pickerView1.height = 250;
	$.pickerView1.setVisible(true);
	$.done1.setVisible(true);
	$.picker1.setVisible(true);
	//return false;
}