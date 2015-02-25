var value = new Date();
Ti.App.Properties.setString('root',"0");
Ti.App.Properties.setString('module',"member");
var dayInt = value.getDate();
var monthInt = ("0"+(value.getMonth()+1)).slice(-2);
var yearInt = value.getFullYear();
$.picker.value = value;

displayDate(dayInt.toString(),monthInt.toString(),yearInt.toString());
 
function back() {
	Ti.App.Properties.setString('module',"");
	DRAWER.navigation("member",1);
}
 

function showDate(){
	if(Ti.Platform.osname == "android") {
		$.dateView.height = 285;
	}
	
	if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad") {
		$.dateView.height = 335;
	}
	$.pickerView.show();
}

function displayDate(day,month,year){
	var string = day + "/" + month + "/" + year;
	$.date.text = string;
}

function done(){
	$.pickerView.hide();
	$.dateView.height = 70;
	value = $.picker.value;
	dayInt = value.getDate();
	monthInt = ("0"+(value.getMonth()+1)).slice(-2);
	yearInt = value.getFullYear() ;
	
	var day = dayInt.toString();
	var month = monthInt.toString();
	var year = yearInt.toString();
	var date = year+"-"+day+"-" + month;
	
	displayDate(day,month,year);
	
	//transaction api
	API.getRTOHistory({
		myView : $.transactionView
	});
}

function populateData(e){
	var detailsValue = e.result;
	for(var i=0; i < detailsValue.length; i++) {
		var contentView = Titanium.UI.createView({
			layout: "vertical",
			width:"100%",
			height:"80"
		});
		
		var leftLabel = $.UI.create('Label',{
			left :15,
			classes : ['description_text'], 
			text: "Date : " +timeFormat(detailsValue[i].date)
		});
		
		var centerView = Titanium.UI.createView({
			width:"100%",
			layout: "vertical"
		});
		
		var centerLabel = $.UI.create('Label',{
			classes : ['description_text'], 
			left :15,
			text: "Pool : " +detailsValue[i].pool
		});
		
		var raceLabel = $.UI.create('Label',{
			classes : ['description_text'], 
			left :15,
			text: "Race : " +detailsValue[i].race
		});
		
		var runnerLabel = $.UI.create('Label',{
			classes : ['description_text'], 
			left :15,
			text: "Runner : " +detailsValue[i].runner
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
		
		
		centerView.add(centerLabel);
		centerView.add(raceLabel);
		centerView.add(runnerLabel); 
		centerView.add(leftLabel);
		contentView.add(centerView);
		//contentView+i.add(rightView+i);
		centerLineView.add(lineView);
		$.scrollView.add(contentView);
		$.scrollView.add(centerLineView);
	}
}

API.todayTransactionHistory({
	sTranid : "1234567904",
	sTellerId : "9999",
	sTellerPin : "9999",
	sAccId : "18558705",
	sRto : "1",
	sNfo : "0",
	sDeposits : "0",
	sWithdrawal : "0",
	sAccountAccess : "0",
	sAccountRelease : "0",
	sDXP : "0",
	sCurrentDayTransactions : "1"
});

API.getRTOHistory({
	myView : $.transactionView
});

$.transactionView.addEventListener('historyResult',function(e){  
	populateData({result : e.historyResult});
});