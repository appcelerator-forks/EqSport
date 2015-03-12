COMMON.construct($);
COMMON.showLoading();
DRAWER.disableDrawer();
var value = new Date();
Ti.App.Properties.setString('root',"0");
Ti.App.Properties.setString('module',"member");
var dayInt = value.getDate();
var monthInt = ("0"+(value.getMonth()+1)).slice(-2);
var yearInt = value.getFullYear();
$.picker.value = value;
var info = Alloy.createCollection('info');
var transaction = Alloy.createCollection('transactionResult');
var transactionDetails;

var infoDetails = info.getInfo(); 

displayDate(dayInt.toString(),monthInt.toString(),yearInt.toString());
 
function back() {
	DRAWER.enableDrawer();	
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

function done(){
	COMMON.showLoading();
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
	 
	populateData();
	//transaction api
	/*API.getRTOHistory({
		myView : $.transactionView
	});*/
}

function displayDate(day,month,year){
	var string = day + "/" + month + "/" + year;
	$.date.text = string;
	
	var datetimenow = currentDateTime();
	
	if(datetimenow.substr(0,10) == year+"-"+month+"-"+day){ 
		var curDate = new Date();
		API.todayTransactionHistory({
			sTranid : "C809382"+curDate.getTime(),
			sTellerId : "9999",
			sTellerPin : "9999",
			sAccId : infoDetails[0].account,
			sRto : "1",
			sNfo : "0",
			sDeposits : "0",
			sWithdrawal : "0",
			sAccountAccess : "0",
			sAccountRelease : "0",
			sDXP : "0",
			sCurrentDayTransactions : "1",
			myView : $.transactionView
		});
	}else{ 
		transactionDetails = transaction.getTransResInfoByDate(string);
	}
	 
}



function populateData(e){
	removeAllChildren($.scrollView);
	$.summaryLbl.text = "Total transaction(s) found : "+transactionDetails.length;
	if(transactionDetails.length <= 0){
		var contentView = Titanium.UI.createView({
				layout: "vertical",
				width:"100%",
				height:"80"
		});
		var centerView = Titanium.UI.createView({
				width:"100%",
				top:20,
				layout: "vertical"
		});
		var leftLabel = $.UI.create('Label',{
				left :15,
				classes : ['description_text'], 
				text: "No record "
		});
 
		centerView.add(leftLabel);
		contentView.add(centerView);
		$.scrollView.add(contentView); 
	}else{  
		for(var i=0; i < transactionDetails.length; i++) {
			var contentView = Titanium.UI.createView({
				layout: "vertical",
				width:"100%",
				height:"80"
			});
			
			var leftLabel = $.UI.create('Label',{
				left :15,
				classes : ['description_text'], 
				text: "Date : " +timeFormat(transactionDetails[i].date)
			});
			
			var centerView = Titanium.UI.createView({
				width:"100%",
				layout: "vertical"
			});
			
			var centerLabel = $.UI.create('Label',{
				classes : ['description_text'], 
				left :15,
				text: "Pool : " +transactionDetails[i].pool
			});
			
			var raceLabel = $.UI.create('Label',{
				classes : ['description_text'], 
				left :15,
				text: "Race : " +transactionDetails[i].race
			});
			
			var runnerLabel = $.UI.create('Label',{
				classes : ['description_text'], 
				left :15,
				text: "Runner : " +transactionDetails[i].runner
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
	
	COMMON.hideLoading();
}



API.getRTOHistory({
	myView : $.transactionView
});

$.transactionView.addEventListener('todayResult',function(e){  
	transactionDetails = e.todayResult;
	populateData(); 
});
$.picker.addEventListener('change', function(e){ 
	var datetimenow = currentDateTime();
});
 