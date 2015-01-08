var args = arguments[0] || {}; 


if(Ti.Platform.osname == "android")
{
	$.scrollView.overScrollMode = Titanium.UI.Android.OVER_SCROLL_NEVER;
}

function goTo(e){
	navigation(e.source.mod);
	// if(Ti.Platform.osname == "android")
	// {
		// navigation(e.source.mod);
	// }
	// else
	// {
		// iOSnavigation(e.source.mod);
	// }
}

function navigation(target){
 	var win = Alloy.createController("eq_"+target).getView();
	Alloy.Globals.Drawer.setCenterWindow(win); 
	Alloy.Globals.Drawer.closeLeftWindow();
}

function login()
{ 
	var win = Alloy.createController("login").getView();
	Alloy.Globals.Drawer.setCenterWindow(win); 
	Alloy.Globals.Drawer.closeLeftWindow();
}

 
