var arr = [];
var firstLoad = true;
var androidLocation;
var official = "";
var venue;
var myPos = 0; 
if(Ti.Platform.osname == "android"){
	$.date.width = "90%"; 
	$.raceNo.textAlign = "left";
}
Ti.App.Properties.setString('module',"member");
Ti.App.Properties.setString('root',"0");
COMMON.construct($);
//COMMON.showLoading();
DRAWER.disableDrawer();
API.getRTOResults({
	myView: $.mainView,
	raceNumber : "",
	raceDate: ""
});
 
var result = [];

var apiResult = function(e){   
	COMMON.showLoading(); 
	$.scrollView.hide();
	removeAllChildren($.scrollView);
	arr = e.raceResult;  
	displayDate(arr[0].raceDay,arr[0].raceMonth,arr[0].raceYear);
	var api_date = new Date(arr[0].raceYear, arr[0].raceMonth-1, arr[0].raceDay);
	$.picker.value = api_date;
	var locations = [];
	for(var i=0; i < arr.length; i++){ 
		locations.push(arr[i].location); 
		result[i]=[arr[i].location, arr[i].raceRow1, arr[i].raceRow2, arr[i].raceRow3, arr[i].raceNo, arr[i].official];
	}
	if($.picker2.columns[0]) {
	    var _col = $.picker2.columns[0];
	        var len = _col.rowCount; 
	        for(var x = len-1; x >= 0; x-- ){
	                var _row = _col.rows[x];
	                _col.removeRow(_row);
	        }
	}
	 
	var thePos = 0;
	if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad"){ 
		thePos = setPicker2(locations,$.venueLabel.text);
		refresh($.venueLabel.text);
		
	}
	
	if(Ti.Platform.osname == "android") {
		thePos = setPicker2(locations,androidLocation); 
		refresh(androidLocation); 
	}
	$.picker2.setSelectedRow(0,thePos,false);
	$.mainView.removeEventListener('raceResult', apiResult);
	$.scrollView.show();
	COMMON.hideLoading();
};
$.mainView.addEventListener('raceResult', apiResult);

function setPicker2(location, selLoc){ 
	 
	for(var i = 0 ; i < location.length; i++){
		var data = Ti.UI.createPickerRow({title:location[i]});
		//$.pickerColumn1.addRow(data);
		if(selLoc == location[i]){
			if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad"){ 
				$.venueLabel.text = location[i];
			}
			androidLocation = location[i];
			myPos = i;
			$.picker2.setSelectedRow(0,i,false);
		}
		
		$.picker2.add(data);
	}
	
	return myPos;
}

var transformPicker = Titanium.UI.create2DMatrix().scale(0.8);

if(Ti.Platform.osname == "android"){
	$.picker.width = "100%";
	$.picker.top = 0;
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
	DRAWER.enableDrawer();	
	Ti.App.Properties.setString('module',"");
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
		firstLoad = false;
	 	$.mainView.addEventListener('raceResult', apiResult);
		API.getRTOResults({
			myView: $.mainView,
			raceNumber : $.raceNo.value,
			raceDate: date
		});
 
	}  
}

function submitText(){
	$.scrollView.hide();
	if($.raceNo.value != "") {
		value = $.picker.value;
		dayInt = ("0"+value.getDate()).slice(-2);
		monthInt = ("0"+(value.getMonth()+1)).slice(-2);
		yearInt = value.getFullYear() ;
		
		var day = dayInt.toString();
		var month = monthInt.toString();
		var year = yearInt.toString();
		var date = day + month + year;
		
		firstLoad = false;
		$.mainView.addEventListener('raceResult', apiResult); 
		API.getRTOResults({
			myView: $.mainView,
			raceNumber : $.raceNo.value,
			raceDate: date
		});
	}
}

function triggerRace(){
	//$.mainView.removeEventListener('raceResult', apiResult);
	$.pickerView.hide();
	$.dateContainer.height = 50;
	$.dateView.height = 50;
	$.raceNo.focus();
}

function keyboardCancel(){
	$.raceNo.blur();
}

function keyboardDone(){
	$.raceNo.blur();
	submitText();
}

$.raceNo.addEventListener('return', function(e){ 
	submitText();
});

function done2()
{
	if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad"){
		$.venueView.height = 50;
		$.venueContentView.height = 50;
	}
	$.pickerView2.height = 50;
	$.pickerView2.setVisible(false);
	$.done2.setVisible(false);
	$.picker2.setVisible(false);
}

function showVenue() {
	if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad"){
		$.venueView.height = 250;
		$.venueContentView.height = 250;
	}
	$.pickerView2.height = 250;
	$.pickerView2.setVisible(true);
	$.done2.setVisible(true);
	$.picker2.setVisible(true);
	return false;
}

var venueIndex = 0;
function changeVenue(e){ 
	COMMON.showLoading();
	venueIndex = e.rowIndex; 
	if(e.row !== null && e.row != "null"){ 
		venue = e.row.title; 
		androidLocation = e.row.title; 
	} 

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
	$.scrollView.hide();
	removeAllChildren($.scrollView);
	var resultArr = []; 
	official = arr[venueIndex].official;  
	var data = (arr[venueIndex].result).split("\n");
  	var resultCounter =1;
  	var resultTitle = "";
	if(!firstLoad) {
		for(var i = 2; i<data.length;i++){
			
			var resultRow = (data[i]).split(" ");
			var contentView = Titanium.UI.createView({
				layout: "horizontal",
				width:"100%",
				height:Ti.UI.SIZE,
				top: 10,
				bottom: 10
			});
			
			var leftView = Titanium.UI.createView({
				width:"25%",
				top:0,
				height: Ti.UI.SIZE,
			});
			
			var leftLabel = $.UI.create('Label',{
				classes : ['medium_text'],
				color: "black",
				top:0,
				text: resultRow[0],//result[index][1]
				height: Ti.UI.SIZE,
			});
			
			var centerView = Titanium.UI.createView({
				width:"44.9%",
				height: Ti.UI.SIZE,
				layout: "vertical"
			});
			
			var	cv = resultRow[1].split(',');
			cv.forEach(function(c) {
				 var centerLabel = $.UI.create('Label',{
				 	classes : ['medium_text'],
					color: "black",
					text: c,
					height: Ti.UI.SIZE,
				});
				centerView.add(centerLabel);
			}); 
			 
			
			var rightView = Titanium.UI.createView({
				width:"30%",
				height: Ti.UI.SIZE,
				layout: "vertical"
			});
		 
			var	rv = resultRow[2].split(',');
			rv.forEach(function(r) {
				 var rightLabel = $.UI.create('Label',{
				 	classes : ['medium_text'],
					color: "black",
					text: r,
					height: Ti.UI.SIZE,
				});
				rightView.add(rightLabel);
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
			 
			var rr = resultRow[1].replace(/,/g,'-');
			var resSplit = rr.split("-");
		 	
		 	
			resSplit.forEach(function(idd) {
				var bool =contains(resultArr, idd);
				if(bool === false){
					if(resultCounter <= 4){ 
						resultArr.push(idd);
						resultCounter++;
					}
					
				}
			}); 
			 
			
			leftView.add(leftLabel); 
			contentView.add(leftView);
			contentView.add(centerView);
			contentView.add(rightView);
			centerLineView.add(lineView);
			$.scrollView.add(contentView);
			$.scrollView.add(centerLineView);
		}
		myres = resultArr.join(',');
		if(resultTitle == "") {
			resultTitle = myres + ",";
		}else {
			resultTitle = resultTitle + myres + ",";
		}
		resultTitle = resultTitle.slice(0, - 1);
		var raceTitle = data[0].split(":");
		$.raceTitle.text = raceTitle[1];
		$.resultLabel.text = "RESULT "+official;
		$.resultTitle.text = resultTitle ;
	} else { 
		for(var i = 2; i<data.length;i++){
			
			var resultRow = (data[i]).split(" ");
			var contentView = Titanium.UI.createView({
				layout: "horizontal",
				width:"100%",
				height:Ti.UI.SIZE,
				top: 10,
				bottom: 10
			});
			
			var leftView = Titanium.UI.createView({
				height:Ti.UI.SIZE,
				top:0,
				width:"25%"
			});
			
			var leftLabel = $.UI.create('Label',{
				classes : ['medium_text'],
				height:Ti.UI.SIZE,
				color: "black",
				top:0,
				text: resultRow[0]
			});
			
			var centerView = Titanium.UI.createView({
				height:Ti.UI.SIZE,
				layout: "vertical",
				width:"44.9%"
			});
			 
			var	cv = resultRow[1].split(',');
			cv.forEach(function(c) { 
				 var centerLabel = $.UI.create('Label',{
					color: "black",
					classes : ['medium_text'],
					text: c,
					height: Ti.UI.SIZE,
				});
				centerView.add(centerLabel);
			}); 
			
			var rightView = Titanium.UI.createView({
				height:Ti.UI.SIZE,
				layout: "vertical",
				width:"30%"
			});
			
			var	rv = resultRow[2].split(',');
			rv.forEach(function(r) {
				if(r.trim() != ""){ 
					var rightLabel = $.UI.create('Label',{
						color: "black",
						classes : ['medium_text'],
						text: r,
						height: Ti.UI.SIZE,
					});
					rightView.add(rightLabel);
				} 
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
			
			var rr = resultRow[1].replace(/,/g,'-');
			var resSplit = rr.split("-");
		 	 
			resSplit.forEach(function(idd) {
				var bool =contains(resultArr, idd);
				if(bool === false){
					if(resultCounter <= 4){ 
						resultArr.push(idd);
						
					}
					 
				}
				resultCounter++;
			}); 
			
			leftView.add(leftLabel);  
			contentView.add(leftView);
			contentView.add(centerView);
			contentView.add(rightView);
			centerLineView.add(lineView);
			$.scrollView.add(contentView);
			$.scrollView.add(centerLineView); 
		} 
		myres = resultArr.join(',');
		if(resultTitle == "") {
			resultTitle = myres + ",";
		}else {
			resultTitle = resultTitle + myres + ",";
		}
		resultTitle = resultTitle.slice(0, - 1);
		var raceTitle = data[0].split(":");
		$.raceTitle.text = raceTitle[1];
		$.resultLabel.text = "RESULT "+official;
		$.resultTitle.text = resultTitle ;
	}
	$.scrollView.show();
	COMMON.hideLoading();
}
function noResult(){
	removeAllChildren($.scrollView);
	$.raceTitle.text = "-";
	$.resultLabel.text = "RESULT (-)";
	$.resultTitle.text = "-" ;
	//firstLoad = true;
	//refresh();
}
$.mainView.addEventListener('noResult', noResult);


/**********************
 * Clear object and memory
 **********************/
var clearObject = function(){ 
	result = null; 
	arr = null; 
	Ti.App.removeEventListener("clearObject", clearObject);
};
Ti.App.addEventListener("clearObject", clearObject);	
