/**Include Drawer Library**/
var NappDrawerModule = require('dk.napp.drawer'); 

/**Include System Model**/
var balance    = Alloy.createCollection('balance');
var info       = Alloy.createCollection('info');
var rtoResults = Alloy.createCollection('rtoResults');

/** Initialize variable**/
var nappDrawer = null;

/**Private function**/
var createCenterNavWindow = function(){	
	var leftBtn = Ti.UI.createButton({title:"Left"});
	leftBtn.addEventListener("click", function(){
		nappDrawer.toggleLeftWindow();
	});
	 
	var navController = openNewNavWindow('home');

	return navController;
};

var openNewNavWindow = function(target){
	var win = Alloy.createController(target).getView();
	if (Titanium.Platform.name == 'android') {
    	var navController =  win;
	}else{
		 
		var myWin = Ti.UI.createWindow({ 
			navBarHidden: true
		});
		myWin.add(win);
		var navController =  Ti.UI.iOS.createNavigationWindow({
			window : myWin
		});
	}
	return navController;
};

var createLeftMenu = function(obj){
	var win = Ti.UI.createView({backgroundColor: '#262626'});
	
	var data=[];
	var isUser =  info.getInfo(); 
	var title = ['HOME', 'EQLINK CARD', 'PLAY WITH EQLINK', 'WIN WITH EQLINK', 'RELOAD EQLINK'];
 
	if (isUser.length > 0 ) {
		title.push('MY ACCOUNT', 'PLAY', 'LOGOUT');
	}
	else {
		title.push('MEMBER LOGIN');
	}
	
	var style = obj.createStyle({
        classes: 'menuLabel',
        apiName: 'Button',
        color: 'white'
    });
    
    
	for (var i=0; i<title.length; i++) {
		var row = Ti.UI.createTableViewRow({
			height : '50'
    	});	
    	
    	var lbl = Ti.UI.createLabel({
			text : title[i]
		}); 
		lbl.applyProperties(style);
		row.add(lbl);
    	data.push(row);
	}
	
	var style2 = obj.createStyle({
        classes: 'menuTable' 
    });
    
    
	var tableView = Ti.UI.createTableView({
		data:data
	});
	tableView.applyProperties(style2);
	tableView.addEventListener("click", function(e){ 
		switch(e.index){
			case 0: 
			navigation("home");   
			break;
		case 1:   
			navigation("eq_Card"); 
			break;
		case 2:   
			navigation("eq_Play"); 
			break;
		case 3:   
			navigation("eq_Win");
			break; 
	 	case 4: 
	 		navigation("eq_Reload");
			break;
		case 5: 
			var isUser =  info.getInfo(); 
	 		if (isUser.length > 0 ) {
				navigation("member");
			}
			else {
				navigation("login");
			}
			break;
		case 6:  
			navigation("play");
			break;
	 
		case 7: 
			// balance.resetBalance();
			// info.resetInfo();
			// rtoResults.resetResults(); 
			// navigation("amountBalance");
			logout(obj);
			break;
		}
	});
	
	win.add(tableView);
	return win;
};

var navigation = function(target, skipToggle){
	var newWin = openNewNavWindow(target);
	nappDrawer.setCenterWindow(newWin);
	
	if(skipToggle != 1){
		nappDrawer.toggleLeftWindow();
	}
	
};

var logout = function(obj){
	info.resetInfo();  
	//nappDrawer.setLeftWindow(createLeftMenu(obj)); 
	navigation("home");
};

/**API function to call **/
exports.initDrawer = function (obj){ 
	var drawer = NappDrawerModule.createDrawer({
		fullscreen:true, 
		leftWindow: createLeftMenu(obj),
		centerWindow: createCenterNavWindow(), 
		//closeDrawerGestureMode: NappDrawerModule.CLOSE_MODE_ALL,
		openDrawerGestureMode: NappDrawerModule.OPEN_MODE_ALL,
		showShadow: false, //no shadow in iOS7
		leftDrawerWidth: 200, 
		statusBarStyle: NappDrawerModule.STATUSBAR_WHITE,  // remember to set UIViewControllerBasedStatusBarAppearance to false in tiapp.xml
		orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
	});
	if (Ti.Platform.osname == 'iphone') {
	    drawer.setCloseDrawerGestureMode(NappDrawerModule.CLOSE_MODE_ALL);
	}
	nappDrawer = drawer;
	
	drawer.addEventListener('windowDidOpen', function(e) {
	});
	
	drawer.addEventListener('windowDidClose', function(e) {
	});
	
	drawer.open(); 
};


exports.navigation = function(target){
	navigation(target , 1); 
};

exports.closeToggle = function(target){
	console.log("closeToggle");
	nappDrawer.toggleLeftWindow();
};

exports.initMenu = function(obj){  
	//nappDrawer.setLeftWindow(createLeftMenu(obj)); 
	navigation("member");
};
