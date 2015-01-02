var args = arguments[0] || {};

function submit()
{
	var account = $.account.value;
	var password = $.password.value;

	if(account == "")
	{
		alert("no email/account");
	}
	else if(password == "")
	{
		alert("no password");
	}
	else
	{
		var url = "http://175.143.112.185/webse/mytelelink.asp?REQTYPE=2&USERNAME="+ account +"&PWD="+ password+"&TLACC=60938004&TLPIN=7337";
		var client = Titanium.Network.createHTTPClient({
				// function called when the response data is available
	    	 	onload : function(e) {
				//var res = JSON.parse(this.responseText);
				Ti.API.info(this.responseText);
		       
		     },
		     // function called when an error occurs, including a timeout
		     onerror : function(e) {
		     	alert("error");
		     },
		     timeout : 10000  // in milliseconds
		});
		client.open("GET",url);
		client.send(); 
		
		Ti.API.info("member");
		var win = Alloy.createController("member").getView();
		Ti.API.info("member1");
		Alloy.Globals.Drawer.setCenterWindow(win);
		Ti.API.info("member2"); 
		Alloy.Globals.Drawer.closeLeftWindow();
		Ti.API.info("member3");
	}
}

function newAccount()
{
	
}

function close()
{
	Ti.API.info("close");
	var win = Alloy.createController("eq_Card").getView();
	Alloy.Globals.Drawer.setCenterWindow(win); 
	Alloy.Globals.Drawer.closeLeftWindow();
}
