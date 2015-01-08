var NappDrawerModule= require('dk.napp.drawer'); 
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