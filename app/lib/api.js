/*********************
*** SETTING / API ***
**********************/
var API_DOMAIN = "175.143.114.122";
var XHR = require("xhr");
var xhr = new XHR();

// APP authenticate user and key
var USER  = 'TESTWEBSEUID';
var KEY   = 'TESTWEBSEPWD';
var loginUrl	  = "http://"+API_DOMAIN+"/webse/mytelelink.asp?REQTYPE=2&USERNAME="+USER+"&PWD="+KEY; 
var checkBalance  = "http://"+API_DOMAIN+"/webse/mytelelink.asp?REQTYPE=4&USERNAME="+USER+"&PWD="+KEY; 
//var resultNdividend  = "http://"+API_DOMAIN+"/webse/mytelelink.asp?REQTYPE=31&USERNAME="+USER+"&PWD="+KEY+"&TLACC=60938004&TLPIN=7337"; 
//var resultNdividend = "http://"+API_DOMAIN+"/webse/mytelelink.asp?REQTYPE=31&USERNAME="+USER+"&PWD="+KEY;
var requestRaceFavouriteOdds = "http://"+API_DOMAIN+"/j2me/v3/FavOdds_Track.asp";
var requestRaceCard = "http://"+API_DOMAIN+"/j2me/v3/Racelist_Track.asp";
var requestRaceResultWithDate = "http://"+API_DOMAIN+"/webse/mytelelink.asp?REQTYPE=31&USERNAME="+USER+"&PWD="+KEY;
var confirmRaceBet = "http://"+API_DOMAIN+"/j2me/v3/ConfirmRaceBet.asp";
var submitRaceBet = "http://"+API_DOMAIN+"/J2me/v3/SubmitRaceBet.asp";

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
		       	var account	 = ex.acc_no;
		       	var pin      = ex.acc_pin; 
		       	//Insert to local DB
		       	var userInfo = Alloy.createModel('info', { 
					username: username, 
					sex: sex,
					dob: dob,
					occupation: occupation,
					race: race,
					nation: nation,
					oldic: oldic,
					newic: newic,
					address: address,
					msisdn: msisdn,
					email: email,
					account: account,
					pin: pin
				}); 
				userInfo.save();  
				Alloy.Globals.menuType = "2";
    			Ti.App.fireEvent("app:refreshMenu");
 
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
	var url = checkBalance+"&TLACC="+ex.account+"&TLPIN="+ex.pin;
	//var url = "http://54.169.180.5/eqsport/balanceRequest.php";
	console.log(url);
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
	     		console.log(message);
	     		var arr = message.split(" ");
	     		var amount = arr[5];
	     		var date = arr[3];
	     		var time = arr[4];
	     		console.log(time);
	     		
	     		// Insert to local DB
		       	var checkBalance = Alloy.createModel('balance', { 
					amount: amount, 
					date: date,
					time: time,
				}); 
				checkBalance.save(); 
				
				// go to next view
				DRAWER.navigation("amountBalance",1);
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


//get RTO Results / race result with date
exports.getRTOResults = function(ex){
	//var url = "http://54.169.180.5/eqsport/test_xml.php";
	var url = requestRaceResultWithDate+"&RACENO="+ex.raceNumber+"&RACEDATE="+ex.raceDate;
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       	var respcode = getValueFromXml(this.responseXML, 'RTORESULTS' , 'RESPCODE');
	       	
	       	if(respcode == "1")
	       	{
	     		var errdesc = getValueFromXml(this.responseXML, 'RTORESULTS' , 'ERRDESC');
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
	//var url = "http://54.169.180.5/eqsport/submitRaceBet.php"; 
	var url = submitRaceBet + "?UID=" +ex.msisdn+ "||" + ex.account + "||" +ex.pin+ "||" +ex.date+ "||" +ex.time+ "||" +ex.venue+ "||" +ex.raceNo+ "||" +ex.pool+ "||" +ex.bet+ "||0||" +ex.runner; 
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       	var res = getValueFromPipe(this.responseXML);
	       console.log(res);
	      
	      /*if(res.status =="Good")
	       {
	       		Ti.API.fireEvent('submitSuccess');
	       }used when API is ready*/
	      
	      Ti.API.fireEvent('submitSuccess');
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
	//var url = "http://54.169.180.5/eqsport/confirmRaceBet.php"; 
	var url = confirmRaceBet+"?UID="+ex.msisdn+"||"+ex.pin+"||"+ex.date+ex.time+"||"+ex.raceNo+"||"+ex.runner+"||"+ex.pool; 
	console.log(url);
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       	var res = getValueFromPipe(this.responseXML);
	       	console.log(this.responseXML);
	       console.log(res);
	       
	       /*if(res.response =="Success")
	       {
	       		Ti.API.fireEvent('confirmSuccess');
	       }used when API is ready*/
	      
	      Ti.API.fireEvent('confirmSuccess');
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

//favourite odds
exports.favourite = function (ex){
	var url = requestRaceFavouriteOdds;
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	     	console.log("favourite");
	       	var res = getValueFromPipe(this.responseXML);
	       console.log(res);
	     
	     	console.log("favourite api");
	     	DRAWER.navigation("play",1);
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     	alert("An error occurs : Favourite");
	     },
	     timeout : 10000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
};

//raceCard
exports.raceCard = function (ex){
	var url =  requestRaceCard; 
 
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	     	var res = getValueFromDollarAndPipe(this.responseXML);
	     	console.log(res);
			//Insert to local DB
			var raceCardInfo = Alloy.createModel('raceCardInfo', { 
				id: res.id,
				venue: res.venue, 
				totalRunner: res.totalRunner
			}); 
			raceCardInfo.save(); 

			for(var i = 1; i <= res['totalRunner']; i++){
				var runner_id = res['runner'+i][0];
				var runner_date = res['runner'+i][1];
				var runner_time = res['runner'+i][2];
				//console.log(runner_id+'=='+runner_date+"=="+runner_time);
				
				//Insert to local DB
				var raceCardDetails = Alloy.createModel('raceCardDetails', { 
					race_id:res.id,
					runner_id: runner_id, 
					runner_date: runner_date,
					runner_time: runner_time
				}); 
				raceCardDetails.save(); 
			}
			
			if(ex.title == "play")
			{
				API.favourite();
			}
			else
			{
	     		DRAWER.navigation(ex.title,1);
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

exports.popup = function(subView,config){
    //Popup win
	var popupWin = Ti.UI.createWindow({
		backgroundImage : "/images/Transparent.png",
		opacity            : 0, 
		id                : "popupWin"
	});
	
	//View that used to show the msg
	var popupView = Ti.UI.createView({
		width    : config.width,
		height    : config.height,
		backgroundColor : "#000000",
		borderRadius : 10,
		borderColor : "#565656",
		borderWidth : 1
	});
	 
	 
	popupView.add(subView ); 
	popupWin.add(popupView);
 
	//Event to close the popup window
	popupWin.addEventListener("click", function(e){
		if(e.source.id != null){
			popupWin.close();
		}
	});
		
	var matrix = Ti.UI.create2DMatrix(); 
	matrix = matrix.scale(1.3, 1.3);
	  
	var a = Ti.UI.createAnimation({
	    transform : matrix,
	    opacity: 1, 
	    duration : 500, 
	});
	
	popupWin.navBarHidden = true; 
	popupWin.animate(a);  
	return popupWin;
};

//private function
function onErrorCallback(e) {
	var common = require('common');
	// Handle your errors in here
	common.createAlert("Error", e);
};