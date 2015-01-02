var args = arguments[0] || {};

function menuToggle(e){
	var fn = 'toggleLeftWindow';
    $.drawer[fn]();
}