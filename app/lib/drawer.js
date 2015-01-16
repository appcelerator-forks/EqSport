/**Include Drawer Library**/
var NappDrawerModule = require('dk.napp.drawer'); 

/**Include System Model**/
var balance    = Alloy.createCollection('balance');
var info       = Alloy.createCollection('info');
//var rtoResults = Alloy.createCollection('rtoResults');
 
var users = info.getInfo(); 
if(users.length == 0){
	Alloy.Globals.menuType = "1";
}else{
	Alloy.Globals.menuType = "2";
}


/** Initialize variable**/
var nappDrawer = null;
var menu_no = "1";

function createMyDrawer(leftMenuWindow){
	nappDrawer = NappDrawerModule.createDrawer({
			fullscreen:true,  
			leftWindow: leftMenuWindow,
			centerWindow: createCenterNavWindow(), 
			//closeDrawerGestureMode: NappDrawerModule.CLOSE_MODE_ALL,
			openDrawerGestureMode: NappDrawerModule.OPEN_MODE_ALL,
			showShadow: false,  
			leftDrawerWidth: 200,  
			animationMode: NappDrawerModule.ANIMATION_NONE,  
			statusBarStyle: NappDrawerModule.STATUSBAR_WHITE,  
			orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
	});	
	
	if (Ti.Platform.osname == 'iphone') {
	    nappDrawer.setCloseDrawerGestureMode(NappDrawerModule.CLOSE_MODE_ALL); 
	}
	 
}

function refreshMenu(){
	nappDrawer = null; 
	createMyDrawer(Alloy.createController("menu"+Alloy.Globals.menuType).getView());
	nappDrawer.open(); 
}

/**Private function**/
var createCenterNavWindow = function(){	
	var leftBtn = Ti.UI.createButton();
	leftBtn.addEventListener("click", function(){
		nappDrawer.toggleLeftWindow();
	});
	  
	if(Alloy.Globals.menuType == "1"){
		var navController = openNewNavWindow('home');
	}else{
		var navController = openNewNavWindow('member');
	}
	
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

/**API function to call **/
exports.initDrawer = function (){  
	refreshMenu();
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
};

exports.logout = function(){
	Alloy.Globals.menuType = "1";
	info.resetInfo();  
	refreshMenu();
	navigation("home",1);
};


