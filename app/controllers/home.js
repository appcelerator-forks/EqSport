var args = arguments[0] || {};

function goTo(e){
	navigation(e.source.mod);
}

function navigation(target){
 	var win = Alloy.createController("eq_"+target).getView();
	Alloy.Globals.Drawer.setCenterWindow(win); 
	Alloy.Globals.Drawer.closeLeftWindow();
}
