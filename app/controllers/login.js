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
		API.login({
			"acc_no" : account,
			"acc_pin" : password
		});
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