var args = arguments[0] || {};

var module= require('dk.napp.drawer'); 

initMenu(true);

function initMenu(isMember){
	var data=[];
	
	var title = ['EQLINK CARD', 'PLAY WITH EQLINK', 'WIN WITH EQLINK', 'RELOAD EQLINK'];
	
	if (isMember) {
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
			var win = Alloy.createController("eq_Card").getView();  
			Alloy.Globals.Drawer.setCenterWindow(win); 
			Alloy.Globals.Drawer.closeLeftWindow();
			Alloy.Globals.Drawer.setOpenDrawerGestureMode(module.OPEN_MODE_ALL);  
			break;
		case 1: 
			var win = Alloy.createController("eq_Play").getView();  
			Alloy.Globals.Drawer.setCenterWindow(win); 
			Alloy.Globals.Drawer.closeLeftWindow();
			Alloy.Globals.Drawer.setOpenDrawerGestureMode(module.OPEN_MODE_ALL);  
			break;
		case 2: 
			var win = Alloy.createController("eq_Win").getView();  
			Alloy.Globals.Drawer.setCenterWindow(win); 
			Alloy.Globals.Drawer.closeLeftWindow();
			Alloy.Globals.Drawer.setOpenDrawerGestureMode(module.OPEN_MODE_ALL);  
			break;
		case 3: 
			var win = Alloy.createController("eq_Reload").getView();  
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
