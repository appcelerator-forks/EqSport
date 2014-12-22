var args = arguments[0] || {};

var module= require('dk.napp.drawer'); 

function doMenuClick(e){ 
	switch(e.index){
		case 0: 
			var win = Alloy.createController("eq_Card").getView();  
			Alloy.Globals.Drawer.setCenterWindow(win); 
			Alloy.Globals.Drawer.closeLeftWindow();
			Alloy.Globals.Drawer.setOpenDrawerGestureMode(module.OPEN_MODE_ALL);  
			break;
	 
		
	}
}

function navigation(target){
 	var win = Alloy.createController("eq_"+target).getView();
	Alloy.Globals.Drawer.setCenterWindow(win); 
	Alloy.Globals.Drawer.closeLeftWindow();
}
