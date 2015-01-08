var args = arguments[0] || {};
 
function submit()
{
	var account = $.account.value;
	var pin = $.pin.value;

	if(account == "")
	{
		alert("no email/account");
	}
	else if(pin == "")
	{
		alert("no pin");
	}
	else
	{
		API.login({
			acc_no : account,
			acc_pin: pin
		});
	}
}

function newAccount()
{
	
}

function close()
{
	Ti.API.info("close");
	var win = Alloy.createController("home").getView();
	Alloy.Globals.Drawer.setCenterWindow(win); 
	Alloy.Globals.Drawer.closeLeftWindow();
}

function skip()
{
	var win = Alloy.createController("home").getView();
	Alloy.Globals.Drawer.setCenterWindow(win); 
	Alloy.Globals.Drawer.closeLeftWindow();
}
