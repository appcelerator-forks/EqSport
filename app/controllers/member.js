if(Ti.Platform.osname == "android"){
	$.scrollView.overScrollMode = Titanium.UI.Android.OVER_SCROLL_NEVER;
} 
function menuToggle(e){
	var fn = 'toggleLeftWindow';
    $.drawer[fn]();
}

function play()
{
	var win = Alloy.createController("play").getView();
	Alloy.Globals.Drawer.setCenterWindow(win); 
	Alloy.Globals.Drawer.closeLeftWindow();
}

function withdrawal()
{
	var win = Alloy.createController("withdrawal").getView();
	Alloy.Globals.Drawer.setCenterWindow(win); 
	Alloy.Globals.Drawer.closeLeftWindow();
}

function amountBalance()
{
	API.checkBalance();
	// var win = Alloy.createController("amountBalance").getView();
	// Alloy.Globals.Drawer.setCenterWindow(win); 
	// Alloy.Globals.Drawer.closeLeftWindow();
}

function transaction()
{
	var win = Alloy.createController("transaction").getView();
	Alloy.Globals.Drawer.setCenterWindow(win); 
	Alloy.Globals.Drawer.closeLeftWindow();
}

function raceCard()
{
	var win = Alloy.createController("raceCard").getView();
	Alloy.Globals.Drawer.setCenterWindow(win); 
	Alloy.Globals.Drawer.closeLeftWindow();
}

function raceOdd()
{ 
	var win = Alloy.createController("raceOdd").getView(); 
	Alloy.Globals.Drawer.setCenterWindow(win); 
	Alloy.Globals.Drawer.closeLeftWindow();
}

function raceResult()
{ 
	var win = Alloy.createController("raceResult").getView(); 
	Alloy.Globals.Drawer.setCenterWindow(win); 
	Alloy.Globals.Drawer.closeLeftWindow();
}
