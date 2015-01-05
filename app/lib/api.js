/*********************
*** SETTING / API ***
**********************/
var API_DOMAIN = "175.143.112.185";
var XHR = require("xhr");
var xhr = new XHR();

// APP authenticate user and key
var USER  = 'TESTWEBSEUID';
var KEY   = 'TESTWEBSEPWD';
var loginUrl	  = "http://"+API_DOMAIN+"/webse/mytelelink.asp?REQTYPE=2&USERNAME="+USER+"&PWD="+KEY; 
var checkBalance  = "http://"+API_DOMAIN+"/webse/mytelelink.asp?REQTYPE=4&USERNAME="+USER+"&PWD="+KEY+"&TLACC=60938004&TLPIN=7337"; 
var resultNdividend  = "http://"+API_DOMAIN+"/webse/mytelelink.asp?REQTYPE=31&USERNAME="+USER+"&PWD="+KEY+"&TLACC=60938004&TLPIN=7337"; 
 
 
 http://175.143.113.177/webse/mytelelink.asp?REQTYPE=31&USERNAME=TESTWEBSEUID&PWD=TESTWEBSEPWD
/*********************
**** API FUNCTION*****
**********************/
//login to app
exports.login = function (ex){
	var url = loginUrl+"&TLACC="+ex.acc_no+"&TLPIN="+ex.acc_pin;
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
		       	var occuptation = getValueFromXml(this.responseXML, 'LOGIN' , 'OCCUPTATION');
		       	var race 	 = getValueFromXml(this.responseXML, 'LOGIN' , 'RACE');
		       	var nation 	 = getValueFromXml(this.responseXML, 'LOGIN' , 'NATION');
		       	var oldic 	 = getValueFromXml(this.responseXML, 'LOGIN' , 'OLDIC');
		       	var newic	 = getValueFromXml(this.responseXML, 'LOGIN' , 'NEWIC');
		       	var address  = getValueFromXml(this.responseXML, 'LOGIN' , 'ADDRESS');
		       	var msisdn 	 = getValueFromXml(this.responseXML, 'LOGIN' , 'MSISDN');
		       	var email 	 = getValueFromXml(this.responseXML, 'LOGIN' , 'EMAIL');
		       	
		       	//Insert to local DB
		       	
		       	// go to next view
		       	
	     	}
	       	 
	       
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     	
	     },
	     timeout : 10000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
};

//check user balance
exports.resultNdividend = function (ex){
	var url = resultNdividend;
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       	var respcode = getValueFromXml(this.responseXML, 'ACCDETAILS' , 'RESPCODE');
	       	
	       	if(respcode == "1"){
	     		var errdesc = getValueFromXml(this.responseXML, 'ACCDETAILS' , 'ERRDESC');
	     		alert(errdesc);
	     	}else{
	     		//success	
	     	}
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     	
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
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       	var respcode = getValueFromXml(this.responseXML, 'ACCDETAILS' , 'RESPCODE');
	       	
	       	if(respcode == "1"){
	     		var errdesc = getValueFromXml(this.responseXML, 'ACCDETAILS' , 'ERRDESC');
	     		alert(errdesc);
	     	}else{
	     		//success	
	     	}
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     	
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
	       	var no_race_result = getValueFromXml(this.responseXML, 'RTORESULTS' , 'NOOFRACESRESULTS');
	       	
	       	if(no_race_result > 0){
	       		for(var i=1; i <= no_race_result; i++){
	       			var resultno = getValueFromXml(this.responseXML, 'RTORESULTS' , 'RESULTNO'+i);
	       			
	       			var raceDate = getValueFromXml(this.responseXML, 'RESULTNO'+i , 'RACEDATE'); 
	       			var raceDay = getValueFromXml(this.responseXML, 'RESULTNO'+i , 'DAY'); 
	       			var raceNo = getValueFromXml(this.responseXML, 'RESULTNO'+i , 'RACENO'); 
	       			var location = getValueFromXml(this.responseXML, 'RESULTNO'+i , 'LOCATION'); 
	       			var result = getValueFromXml(this.responseXML, 'RESULTNO'+i , 'RESULT'); 
	       			 
	       		}
	       		
	       	}
	     
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     	
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
