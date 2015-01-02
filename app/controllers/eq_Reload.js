var args = arguments[0] || {};

function closeWindow(){
    //$.eq_Reload.close();
    Ti.API.info("close");
    var win = Alloy.createController("home").getView();
	Alloy.Globals.Drawer.setCenterWindow(win); 
	Alloy.Globals.Drawer.closeLeftWindow();
}