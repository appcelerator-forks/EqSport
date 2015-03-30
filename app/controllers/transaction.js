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
		console.log(transactionDetails); 
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
				layout: "horizontal",
				width:"100%",
				height:Ti.UI.SIZE,
				top:10,
				bottom:10
			});
			
			var venueLabel = $.UI.create('Label',{
				left :5,
				height:Ti.UI.SIZE,
				classes : ['description_text'], 
				text:  transactionDetails[i].venue,
				width: "25%"
			});
			var raceLabel = $.UI.create('Label',{
				classes : ['description_text'],  
				height:Ti.UI.SIZE,
				text:  transactionDetails[i].race,
				width: "25%"
			});
			
			 
			var poolLabel = $.UI.create('Label',{
				classes : ['description_text'],  
				height:Ti.UI.SIZE,
				textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
				text:  transactionDetails[i].pool + " "+ transactionDetails[i].runner,
				width: "25%"
			}); 
			
			var ba = transactionDetails[i].betAmount;
			if(ba == ""){
				var finalRes = "-";
			}else{ 
				var finalRes = ba.substr(0, ba.length - 2) + "."+ba.substr(-2, 2);
			}
			 
			var amountView = Titanium.UI.createView({ 
				height:Ti.UI.SIZE,
				width: "auto",
				right:10
			});
			
			var betAmountLabel = $.UI.create('Label',{
				classes : ['description_text'],  
				height:Ti.UI.SIZE,
				text: finalRes,
				textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT 
			});
			amountView.add(betAmountLabel);
			
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
			contentView.add(venueLabel);
			contentView.add(raceLabel);
			contentView.add(poolLabel); 
			contentView.add(amountView);
			 
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
 