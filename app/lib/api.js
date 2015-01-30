/*********************
*** SETTING / API ***
**********************/
var API_DOMAIN = Ti.App.Properties.getString('eqUrl');//175.143.114.122
var XHR = require("xhr");
var xhr = new XHR();
 
// APP authenticate user and key
var USER  = 'TESTWEBSEUID';
var KEY   = 'TESTWEBSEPWD';
//var resultNdividend  = "http://"+API_DOMAIN+"/webse/mytelelink.asp?REQTYPE=31&USERNAME="+USER+"&PWD="+KEY+"&TLACC=60938004&TLPIN=7337"; 
//var resultNdividend = "http://"+API_DOMAIN+"/webse/mytelelink.asp?REQTYPE=31&USERNAME="+USER+"&PWD="+KEY;


 //http://175.143.113.177/webse/mytelelink.asp?REQTYPE=31&USERNAME=TESTWEBSEUID&PWD=TESTWEBSEPWD
/*********************
**** API FUNCTION*****
**********************/
//Get App URL
exports.getDomainUrl = function (ex){
	
	var url = "http://54.169.180.5/eqsport/api/getDomain?user=eqsport&key=06b53047cf294f7207789ff5293ad2dc"; 
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) { 
	     	var res = JSON.parse(this.responseText); 
	        if(res.status == "success"){
	        	Ti.App.Properties.setString('eqUrl',res.data); 
	        } 
	       
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) { 
	     	alert("Cannot connect to the server");
	     	
	     },
	     timeout : 10000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send(); 
};

//login to app
exports.login = function (ex){
	var loginUrl = "http://"+Ti.App.Properties.getString('eqUrl')+"/webse/mytelelink.asp?REQTYPE=2&USERNAME="+USER+"&PWD="+KEY; 
	var url		 = loginUrl+"&TLACC="+ex.acc_no+"&TLPIN="+ex.acc_pin; 
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
	var checkBalance  = "http://"+Ti.App.Properties.getString('eqUrl')+"/webse/mytelelink.asp?REQTYPE=4&USERNAME="+USER+"&PWD="+KEY; 
	var url = checkBalance+"&TLACC="+ex.account+"&TLPIN="+ex.pin; 
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
	     		
				var library = Alloy.createCollection('balance'); 
	     		library.resetBalance();
	     		// Insert to local DB
		       	var chkBalance = Alloy.createModel('balance', { 
					amount: amount, 
					date: date,
					time: time,
				}); 
				chkBalance.save(); 
				
	     	}
	     	result = "1";
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) { 
	     	//alert("An error occurs");
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
	var requestRaceResultWithDate = "http://"+Ti.App.Properties.getString('eqUrl')+"/webse/mytelelink.asp?REQTYPE=31&USERNAME="+USER+"&PWD="+KEY;

	if(ex.raceNumber == "" && ex.raceDate == ""){
		var url = requestRaceResultWithDate;
	}else{
		var url = requestRaceResultWithDate+"&RACENO="+ex.raceNumber+"&RACEDATE="+ex.raceDate;
	}
	
	//
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       	var respcode = getValueFromXml(this.responseXML, 'RTORESULTS' , 'RESPCODE');
	       	
	       	if(respcode == "1") {
	     		var errdesc = getValueFromXml(this.responseXML, 'RTORESULTS' , 'ERRDESC');
	     		alert(errdesc);
	     	} else { 
		       	var no_race_result = getValueFromXml(this.responseXML, 'RTORESULTS' , 'NOOFRACESRESULTS');
		       	
		       	var ary = [];
		       	if(no_race_result > 0){

		       		for(var i=1; i <= no_race_result; i++){
		       			var obj = {};
		       			
		       			//obj["resultno"]  = getValueFromXml(this.responseXML, 'RTORESULTS' , 'RESULTNO'+i);
		       			raceDate = obj["raceDate"]  = getValueFromXml(this.responseXML, 'RESULTNO'+i , 'RACEDATE'); 
		       			obj["raceDay"] 	 = getValueFromXml(this.responseXML, 'RESULTNO'+i , 'DAY'); 
		       			obj["raceNo"]  	 = getValueFromXml(this.responseXML, 'RESULTNO'+i , 'RACENO'); 
		       			obj["location"]  = getValueFromXml(this.responseXML, 'RESULTNO'+i , 'LOCATION'); 
		       			obj["result"]    = getValueFromXml(this.responseXML, 'RESULTNO'+i , 'RESULT'); 
		       			var resultData  = getValueFromXml(this.responseXML, 'RESULTNO'+i , 'RESULT'); 
		       			
		       			var dateDetail  = raceDate.split("/");
		       			obj["raceDay"]  	 = dateDetail[0]; 
		       			obj["raceMonth"]  	 = dateDetail[1]; 
		       			obj["raceYear"]  	 = dateDetail[2]; 
		       			
		       			var dataByRow   = resultData.split("\n");
		       			var dataByRace  = dataByRow[0].split(":");
		       			var dataByDetail= dataByRow[2].split(" ");
		       			obj["raceNo"]  	 = dataByRace[1]; 
		       			obj["raceRow1"]  = dataByDetail[0];  
		       			obj["raceRow2"]  = dataByDetail[1];  
		       			obj["raceRow3"]  = dataByDetail[2];  
		       			
		       			ary.push(obj);  
		       		} 
		       	}
		      
		        Ti.App.fireEvent('raceResult', {raceResult: ary});
		       	 
			}
	       	
	       	
	     
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     	//alert("An error occurs");
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
	var submitRaceBet = "http://"+Ti.App.Properties.getString('eqUrl')+"/J2me/v3/SubmitRaceBet.asp";
	var url = submitRaceBet + "?UID=" +ex.msisdn+ "||" + ex.account + "||" +ex.pin+ "||" +ex.date+ "||" +ex.time+ "||" +ex.venue+ "||" +ex.raceNo+ "||" +ex.pool+ "||" +ex.bet+ "||0||" +ex.runner; 
	console.log(url);
	var myView = ex.myView;
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	     	var res = getValueFromPipe(this.responseXML); 
	     	
	     	if(res.Status =="Good") {
	     	//if(res.response =="Status:Good") {
	     		var transactionInfo = Alloy.createCollection('transactions');    
	       		transactionInfo.addTransaction({
					balance: (res.Balance).trim().toString(), 
					date: (res.Date).toString(),
					location: (res.Location).toString(),
					poolType: (res.PoolType).toString(),
					race: (res.Race).toString(),
					raceTime: (res.RaceTime).toString(),
					runner: (res.Runner).toString(),
					status: (res.Status).toString(),
					transactionID: (res.TransactionID).toString(),
					unitAmount: (res.UnitAmount).trim().toString()
				}); 
 				 
	       		myView.fireEvent('submitSuccess');
	       		COMMON.createAlert("Bet Success","Transaction Successful");
	       		return false;
	       } else   {
 				var a = Titanium.UI.createAlertDialog({
					title: "Error Code: "+res.Status +" - "+res.ErrorNumber,
					 message:  res.ErrorDescription
				});
				a.show();
				myView.fireEvent('submitFailed' );
				 
				return false;
	       }
	      
	      //Ti.API.fireEvent('submitSuccess');
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     	//alert("An error occurs");
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
	var confirmRaceBet = "http://"+Ti.App.Properties.getString('eqUrl')+"/j2me/v3/ConfirmRaceBet.asp";

	var url = confirmRaceBet+"?UID="+ex.msisdn+"||"+ex.pin+"||"+ex.date+ex.time+"||"+ex.raceNo+"||"+ex.runner+"||"+ex.pool; 
 	var myView = ex.myView;
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	       	var res = getValueFromPipe(this.responseXML);   
	       if(res.response =="Success") { 
	       	
	       		myView.fireEvent('confirmSuccess');
	       		return false;
	       } else { 
	       }
	      
	      //Ti.App.fireEvent('confirmSuccess');
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     	//alert("An error occurs");
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
	var url = "http://"+Ti.App.Properties.getString('eqUrl')+"/j2me/v3/FavOdds_Track.asp";
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) { 
	       	var res = getValueForFavOdd(this.responseXML); 
	     	
	     	if(res != ""){
	     		var library = Alloy.createCollection('favourite'); 
		     		library.resetInfo();
		     	
		     	var favouriteInfo = Alloy.createModel('favourite', { 
					min_to_race: res[0].min_to_race,
					pla_odd: res[0].pla_odd, 
					race_date: res[0].race_date,
					race_no: res[0].race_no,
					runner: res[0].runner, 
					time: res[0].time,
					venue: res[0].venue,
					win_odd: res[0].win_odd
				}); 
				favouriteInfo.save(); 
	     	} 
	     	
	     	if(ex.skip == ""){
	     		DRAWER.navigation("play",1);
	     	} else if(ex.skip == "2"){
	     		DRAWER.navigation("play",2);
	     	}
	     	
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     	//alert("An error occurs : Favourite");
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
	//var url =  "http://54.169.180.5/eqsport/raceCard.php";
	var url =  "http://"+Ti.App.Properties.getString('eqUrl')+"/j2me/v3/Racelist_Track.asp"; 

	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	     	var res = getValueFromDollarAndPipe(this.responseXML);   
	     	if( res.id > 0 ) { 
		     	var library = Alloy.createCollection('raceCardInfo'); 
		     		library.resetInfo();
	     		var library2 = Alloy.createCollection('raceCardDetails'); 
	     			library2.resetDetails();
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
					
					//Insert to local DB
					var raceCardDetails = Alloy.createModel('raceCardDetails', { 
						race_id:res.id,
						runner_id: runner_id, 
						runner_date: runner_date,
						runner_time: runner_time
					}); 
					raceCardDetails.save(); 
				}
			}else{
			 
				if(ex.from == "menu"){ 
	     			Ti.App.fireEvent("alertDisable");
	     		}else{
	     			Ti.App.fireEvent("disablePlay");
	     		}
	     		
	     		return false;
			}
			
			if(ex.title == "play") {
				if(ex.from == "menu"){ 
					API.favourite({skip: "2"});
				}else{
					API.favourite({skip: ""});
				}
				
			} else{
	     		//DRAWER.navigation(ex.title,1); 
	     	}
	     
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     	if(ex.from == "menu"){ 
	     		Ti.App.fireEvent("alertDisable");
	     	}else{
	     		Ti.App.fireEvent("disablePlay");
	     	}
	     		
	     	return false;
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
			if(config.tabFrameToClose === false){
				
			}else{
				popupWin.close();
			}
			
		}
	});
		
	var matrix = Ti.UI.create2DMatrix(); 
	matrix = matrix.scale(1.3, 1.3);
	  
	popupWin.addEventListener('open', function(){
	    if (Titanium.Platform.name == 'android') {
    		popupWin.activity.actionBar.hide();
		}
	    
	    var a = Ti.UI.createAnimation({
		    transform : matrix,
		    opacity: 1, 
		    duration : 500, 
		});
		popupWin.animate(a);  
	}); 
	 
	return popupWin;
};

//private function
function onErrorCallback(e) {
	var common = require('common');
	// Handle your errors in here
	common.createAlert("Error", e);
};