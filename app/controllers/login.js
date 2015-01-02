var args = arguments[0] || {};

 
function submit()
{
	var account = $.account.value;
	var password = $.password.value;

	if(account == "")
	{
		Ti.API.info("no email/account");
	}
	else if(password == "")
	{
		Ti.API.info("no password");
	}
	else
	{
		Ti.API.info("member");
		var win = Alloy.createController("login").getView();
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
	// Alloy.Globals.Drawer.setCenterWindow(win); 
	// Alloy.Globals.Drawer.closeLeftWindow();
	Alloy.Globals.iosNavWind.setCenterWindow(win);
	Alloy.Globals.iosNavWind.closeLeftWindow();
	
} 
