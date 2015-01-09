var NappDrawerModule= require('dk.napp.drawer'); 
if (Ti.Platform.osname == 'iphone') {
    $.drawer.setCloseDrawerGestureMode(NappDrawerModule.CLOSE_MODE_ALL);
}

$.drawer.open();
Alloy.Globals.Drawer = $.drawer; 
function menuToggle(e){
	var fn = 'toggleLeftWindow';
    $.drawer[fn]();
}

$.drawer.addEventListener('windowDidOpen', function (e) { 
	
});

$.drawer.addEventListener('windowDidClose', function (e) {
	$.destroy(); 
});