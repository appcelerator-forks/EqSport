/*********************
*** SETTING / API ***
**********************/
var API_DOMAIN = "175.139.227.132";
var XHR = require("xhr");
var xhr = new XHR();

// APP authenticate user and key
var USER  = 'TESTWEBSEUID';
var KEY   = 'TESTWEBSEPWD';
var loginUrl	  = "http://"+API_DOMAIN+"/webse/mytelelink.asp?REQTYPE=2&USERNAME="+USER+"&PWD="+KEY; 
var checkBalance  = "http://"+API_DOMAIN+"/webse/mytelelink.asp?REQTYPE=4&USERNAME="+USER+"&PWD="+KEY+"&TLACC=60938004&TLPIN=7337"; 
//var resultNdividend  = "http://"+API_DOMAIN+"/webse/mytelelink.asp?REQTYPE=31&USERNAME="+USER+"&PWD="+KEY+"&TLACC=60938004&TLPIN=7337"; 
 var resultNdividend = "http://"+API_DOMAIN+"/webse/mytelelink.asp?REQTYPE=31&USERNAME="+USER+"&PWD="+KEY;
 
 //http://175.143.113.177/webse/mytelelink.asp?REQTYPE=31&USERNAME=TESTWEBSEUID&PWD=TESTWEBSEPWD
/*********************
**** API FUNCTION*****
**********************/
//login to app
exports.login = function (ex){
	
	var url = loginUrl+"&TLACC="+ex.acc_no+"&TLPIN="+ex.acc_pin;
	console.log(url);
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	     	var respcode = getValueFromXml(this.responseXML, 'LOGIN' , 'RESPCODE');
	     	if(respcode == "1"){
	     		var errdesc  = getValueFromXml(this.responseXML, 'LOGIN' , 'ERRDESC');
	     		alert(errdesc);
	     	}else{
	     		var username = getValueFromXml(this.responseXML, 'LOGIN' , 'USERNAME');
		       	var sex 	 = getValueFromXml(this.responseXML, 'LOGIN' , 'SEX');
		       	var dob		 = getValueFromXml(this.responseXML, 'LOGIN' , 'DOB');
		       	var occupation = getValueFromXml(this.responseXML, 'LOGIN' , 'OCCUPTATION');
		       	var race 	 = getValueFromXml(this.responseXML, 'LOGIN' , 'RACE');
		       	var nation 	 = getValueFromXml(this.responseXML, 'LOGIN' , 'NATION');
		       	var oldic 	 = getValueFromXml(this.responseXML, 'LOGIN' , 'OLDIC');
		       	var newic	 = getValueFromXml(this.responseXML, 'LOGIN' , 'NEWIC');
		       	var address  = getValueFromXml(this.responseXML, 'LOGIN' , 'ADDRESS');
		       	var msisdn 	 = getValueFromXml(this.responseXML, 'LOGIN' , 'MSISDN');
		       	var email 	 = getValueFromXml(this.responseXML, 'LOGIN' , 'EMAIL');
		       	
		       	//Insert to local DB
		       	// var userInfo = Alloy.createModel('info', { 
					// username: username, 
					// sex: sex,
					// dob: dob,
					// occupation: occupation,
					// race: race,
					// nation: nation,
					// oldic: oldic,
					// newic: newic,
					// address: address,
					// msisdn: msisdn,
					// email: email
				// }); 
				// userInfo.save(); 
				
		       	// go to next view
		       	var win = Alloy.createController("member").getView();
				Alloy.Globals.Drawer.setCenterWindow(win); 
				Alloy.Globals.Drawer.closeLeftWindow();
	     	}
	       
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     	alert("Unable to login");
	     	
	     },
	     timeout : 10000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
};

//check user balance
exports.checkBalance = function (ex){
	var url = checkBalance;
	//var url = "http://54.169.180.5/eqsport/balanceRequest.php";
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       	var respcode = getValueFromXml(this.responseXML, 'ACCDETAILS' , 'RESPCODE');
	       	
	       	if(respcode == "1"){
	     		var errdesc = getValueFromXml(this.responseXML, 'ACCDETAILS' , 'ERRDESC');
	     		alert(errdesc);
	     	}else{
	     		//success	
	     		var message = getValueFromXml(this.responseXML, 'ACCDETAILS' , 'MSG');
	     		var arr = message.split(" ");
	     		var amount = arr[5];
	     		var date = arr[3];
	     		var time = arr[4];
	     		
	     		// Insert to local DB
		       	var checkBalance = Alloy.createModel('balance', { 
					amount: amount, 
					date: date,
					time: time,
				}); 
				checkBalance.save(); 
				
				// go to next view
				var win = Alloy.createController("amountBalance").getView();
				Alloy.Globals.Drawer.setCenterWindow(win); 
				Alloy.Globals.Drawer.closeLeftWindow();
	     	}
	     
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     	console.log("An error occurs");
	     	var win = Alloy.createController("amountBalance").getView();
			Alloy.Globals.Drawer.setCenterWindow(win); 
			Alloy.Globals.Drawer.closeLeftWindow();
	     },
	     timeout : 10000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
};


//get RTO Results
exports.getRTOResults = function(ex){
	var url = "http://54.169.180.5/eqsport/test_xml.php";
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       	var respcode = getValueFromXml(this.responseXML, 'RTORESULTS' , 'RESPCODE');
	       	
	       	if(respcode == "1")
	       	{
	     		var errdesc = getValueFromXml(this.responseXML, 'ACCDETAILS' , 'ERRDESC');
	     		alert(errdesc);
	     	}
	     	else
	     	{
	     	
		       	var no_race_result = getValueFromXml(this.responseXML, 'RTORESULTS' , 'NOOFRACESRESULTS');
		       	
		       	var ary = [];
		       	if(no_race_result > 0){

		       		for(var i=1; i <= no_race_result; i++){
		       			var obj = {};
		       			
		       			obj["resultno"]  = getValueFromXml(this.responseXML, 'RTORESULTS' , 'RESULTNO'+i);
		       			obj["raceDate"]  = getValueFromXml(this.responseXML, 'RESULTNO'+i , 'RACEDATE'); 
		       			obj["raceDay"] 	 = getValueFromXml(this.responseXML, 'RESULTNO'+i , 'DAY'); 
		       			obj["raceNo"]  	 = getValueFromXml(this.responseXML, 'RESULTNO'+i , 'RACENO'); 
		       			obj["location"]  = getValueFromXml(this.responseXML, 'RESULTNO'+i , 'LOCATION'); 
		       			obj["result"]    = getValueFromXml(this.responseXML, 'RESULTNO'+i , 'RESULT'); 
		       			 
		       			ary.push(obj);
		       			 
		       			//var arr[i] = [resultno, raceDate, raceDay, raceNo, location, result] ;
		       		}
		       	
		       	}
		       	Ti.API.info(ary);
		       	//Insert to local DB
		       	// var getRTOResults = Alloy.createModel('rtoResults', { 
					// no_race_result: no_race_result, 
					// // resultno: resultno,
					// // raceDate: raceDate,
					// // raceDay: raceDay,
					// // raceNo: raceNo,
					// // location: location,
					// // result: result
					// arr: arr
				// }); 
				// getRTOResults.save(); 
			}
	       	
	       	
	     
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     	alert("An error occurs");
	     },
	     timeout : 10000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
};

exports.submitRaceBet= function(ex){
	var url = "http://54.169.180.5/eqsport/submitRaceBet.php"; 
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       	var res = getValueFromPipe(this.responseXML);
	       console.log(res);
	      
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     	alert("An error occurs");
	     },
	     timeout : 10000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
};

exports.confirmRaceBet= function(ex){
	var url = "http://54.169.180.5/eqsport/confirmRaceBet.php"; 
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       	var res = getValueFromPipe(this.responseXML);
	       console.log(res);
	      
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     	alert("An error occurs");
	     },
	     timeout : 10000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
};

//private function
function onErrorCallback(e) {
	var common = require('common');
	// Handle your errors in here
	common.createAlert("Error", e);
};