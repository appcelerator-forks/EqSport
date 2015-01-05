$.drawer.open();


Alloy.Globals.Drawer = $.drawer;
Alloy.Globals.iosNavWind = $.iosNavWind;
function menuToggle(e){
	var fn = 'toggleLeftWindow';
    $.drawer[fn]();
}

function doMenuClick(e){
	switch(e.index){
		case 0: 
			var win = Alloy.createController("home").getView();
			Alloy.Globals.Drawer.setCenterWindow(win); 
			//Alloy.Globals.Drawer.closeLeftWindow();
			//Alloy.Globals.Drawer.setOpenDrawerGestureMode(module.OPEN_MODE_ALL);
			break;
	}
}
