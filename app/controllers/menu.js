var args = arguments[0] || {};
var module= require('dk.napp.drawer'); 
var info =  Alloy.createCollection('info');
initMenu();

function initMenu(){
	var data=[];
	var isUser =  info.getInfo(); 
	var title = ['EQLINK CARD', 'PLAY WITH EQLINK', 'WIN WITH EQLINK', 'RELOAD EQLINK'];
	
	if (isUser.length > 0 ) {
		title.push('MY ACCOUNT', 'PLAY', 'WITHDRAWAL', 'CHECK AMOUNT BALANCE', 'RACE CARD', 'RACE ODD', 'RACE RESULT', 'LOGOUT');
	}
	else {
		title.push('MEMBER LOGIN');
	}
	
	
	var style = $.createStyle({
        classes: 'menuLabel',
        apiName: 'Button',
    });
    
	for (var i=0; i<title.length; i++) {
		var row = Titanium.UI.createTableViewRow({
			height : '50'
    	});	
    	
    	var lbl = Ti.UI.createLabel({
			text : title[i]
		});
		
		lbl.applyProperties(style);
		row.add(lbl);
    	data.push(row);
	}
	
    $.tblMenu.setData(data);
}

function doMenuClick(e){ 
	switch(e.index){
		case 0: 
			navigation("eq_Card");  
			break;
		case 1:   
			navigation("eq_Play"); 
			break;
		case 2:   
			navigation("eq_Win"); 
			break;
		case 3:   
			navigation("eq_Reload");
			break;
	 
		case 11:   
			info.resetInfo();
			initMenu(); 
			navigation("home");
			break;
	}
}

function navigation(target){
	var win = Alloy.createController( target).getView();
	Alloy.Globals.Drawer.setCenterWindow(win);  
	Alloy.Globals.Drawer.setOpenDrawerGestureMode(module.OPEN_MODE_ALL); 
	Alloy.Globals.Drawer.closeLeftWindow();  
}

// event 
Ti.App.addEventListener("app:refreshMenu", function(e) {
	initMenu();
});
