/**Include Drawer Library**/
var NappDrawerModule = require('dk.napp.drawer'); 

/**Include System Model**/
var balance    = Alloy.createCollection('balance');
var info       = Alloy.createCollection('info');
var rtoResults = Alloy.createCollection('rtoResults');

/** Initialize variable**/
var nappDrawer = null;
var menu_no = "1";

function createMyDrawer(leftMenuWindow){
	nappDrawer = NappDrawerModule.createDrawer({
			fullscreen:true, 
			//leftWindow: createLeftMenu(),
			leftWindow: leftMenuWindow,
			centerWindow: createCenterNavWindow(), 
			//closeDrawerGestureMode: NappDrawerModule.CLOSE_MODE_ALL,
			openDrawerGestureMode: NappDrawerModule.OPEN_MODE_ALL,
			showShadow: false, //no shadow in iOS7
			leftDrawerWidth: 200, 
			rightDrawerWidth: 200, 
			statusBarStyle: NappDrawerModule.STATUSBAR_WHITE,  // remember to set UIViewControllerBasedStatusBarAppearance to false in tiapp.xml
			orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
	});	
	
	if (Ti.Platform.osname == 'iphone') {
	    nappDrawer.setCloseDrawerGestureMode(NappDrawerModule.CLOSE_MODE_ALL); 
	}
	 
	nappDrawer.addEventListener('windowDidOpen', function(e) {
	});
	
	nappDrawer.addEventListener('windowDidClose', function(e) {
	});
}

function refreshMenu(){
	nappDrawer = null;
 	var leftmenu = Alloy.createController("menu"+Alloy.Globals.menuType).getView();
	createMyDrawer(leftmenu);
	 
	nappDrawer.open(); 
}
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
 

var navigation = function(target, skipToggle){
	var newWin = openNewNavWindow(target);
	nappDrawer.setCenterWindow(newWin);
	
	if(skipToggle != 1){
		nappDrawer.toggleLeftWindow();
	}
	
};

function getLeftMenu(){
	//var leftmenu = Alloy.createController("menu"+Alloy.Globals.menuType).getView();
	//nappDrawer.leftWindow = leftmenu; 
	var leftmenu = Alloy.createController("menu1").getView();
	nappDrawer.setLeftWindow(leftmenu); 
};


/**API function to call **/
exports.initDrawer = function (){ 
	var leftmenu = Alloy.createController("menu1").getView();
	createMyDrawer(leftmenu);
	
	nappDrawer.open(); 
};


exports.navigation = function(target,isSkipToggle){ 
	 
	navigation(target , isSkipToggle); 
};

exports.closeToggle = function(target){ 
	nappDrawer.toggleLeftWindow();
};

exports.initMenu = function(){ 
	refreshMenu();
	navigation("member",1);  
	//
};

exports.logout = function(){
	Alloy.Globals.menuType = "1";
	info.resetInfo();  
	refreshMenu();
	navigation("home",1);
};


