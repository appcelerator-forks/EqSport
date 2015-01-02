/*********************
*** SETTING / API ***
**********************/
var API_DOMAIN = "175.143.112.185";
var XHR = require("xhr");
var xhr = new XHR();

// APP authenticate user and key
var USER  = 'TESTWEBSEUID';
var KEY   = 'TESTWEBSEPWD';
var loginUrl	  = "http://"+API_DOMAIN+"/webse/mytelelink.asp?REQTYPE=2&USERNAME="+USER+"&PWD="+KEY+"&TLACC=60938004&TLPIN=7337"; 
 
/*********************
**** API FUNCTION*****
**********************/
//login to app
exports.login = function (ex){
	
	var url = loginUrl;
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       	var username = getValueFromXml(this.responseXML, 'LOGIN' , 'USERNAME');
			console.log(username); 
	       
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
