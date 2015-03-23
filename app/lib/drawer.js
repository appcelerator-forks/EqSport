/**Include Drawer Library**/
var NappDrawerModule = require('dk.napp.drawer'); 

/**Include System Model**/
var balance    = Alloy.createCollection('balance');
var info       = Alloy.createCollection('info'); 
var drawerFlag = 0; 
var users = info.getInfo(); 
if(users.length == 0){
	Alloy.Globals.menuType = "1";
}else{
	Alloy.Globals.menuType = "2";
}


/** Initialize variable**/
var nappDrawer = null;
var menu_no = "1";

function openDrawerGesture(){
	nappDrawer.setOpenDrawerGestureMode(NappDrawerModule.OPEN_MODE_ALL);  
}

function createMyDrawer(leftMenuWindow){
	nappDrawer = NappDrawerModule.createDrawer({
			fullscreen:true,  
			leftWindow: leftMenuWindow,
			centerWindow: createCenterNavWindow(), 
			//closeDrawerGestureMode: NappDrawerModule.CLOSE_MODE_ALL,
			//openDrawerGestureMode: NappDrawerModule.OPEN_MODE_ALL,
			showShadow: false,  
			leftDrawerWidth: 200,  
			animationMode: NappDrawerModule.ANIMATION_NONE,  
			statusBarStyle: NappDrawerModule.STATUSBAR_WHITE,  
			orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
	});	
	
	if (Ti.Platform.osname == 'iphone') {
	    nappDrawer.setCloseDrawerGestureMode(NappDrawerModule.CLOSE_MODE_ALL); 
	}
	
	openDrawerGesture();
	
	/***DRAWER EVENT***/
	nappDrawer.addEventListener('windowDidOpen', function (e) { 
		drawerFlag = 1; 
	});
	
	nappDrawer.addEventListener('windowDidClose', function (e) { 
		drawerFlag = 0; 
	});

	nappDrawer.addEventListener('android:back', function (e) {
		var mod = Ti.App.Properties.getString('module');
		DRAWER.enableDrawer();	
		if(mod != ""){
			Ti.App.Properties.setString('module',"");
			navigation(mod, 1);
		}else if(drawerFlag == 1){
			var dialog = Ti.UI.createAlertDialog({
			    cancel: 1,
			    buttonNames: ['Cancel','Confirm'],
			    message: 'Would you like to exit EQSport?',
			    title: 'Exit app'
			});
			dialog.addEventListener('click', function(e){
			  
		    	if (e.index === e.source.cancel){
			      //Do nothing
			    }
			    if (e.index === 1){
			    	Ti.App.Properties.removeProperty('oddEnabled');
			    	var activity = Titanium.Android.currentActivity;
					activity.finish();
			    }
			});
			dialog.show(); 
		}else{
			nappDrawer.toggleLeftWindow();
		}
		return false;
	});
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
		var navController = openNewNavWindow('login');
	}else{
		var navController = openNewNavWindow('member');
	}
	
	return navController;
};

var openNewNavWindow = function(target, param){
	if(param == ""){
		var win = Alloy.createController(target).getView();
	}else{
		var win = Alloy.createController(target,param).getView();
	}
	
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
 

var navigation = function(target, skipToggle, param){
	//clear current window cache
	Ti.App.fireEvent("clearObject");
	
	var newWin = openNewNavWindow(target, param);
	nappDrawer.setCenterWindow(newWin);
	
	if(skipToggle != 1){
		nappDrawer.toggleLeftWindow();
	}
};

/**API function to call **/
exports.initDrawer = function (){  
	refreshMenu();
};


exports.navigation = function(target,isSkipToggle, param){  
	navigation(target , isSkipToggle, param); 
};

exports.closeToggle = function(target){ 
	nappDrawer.toggleLeftWindow();
};

exports.initMenu = function(){ 
	refreshMenu();
	navigation("member",1);   
};

exports.isDrawerOpen = function(){
	return drawerFlag;
};

exports.disableDrawer = function(){ 
	nappDrawer.setOpenDrawerGestureMode(NappDrawerModule.OPEN_MODE_NONE); 
};

exports.enableDrawer = function(){  
	openDrawerGesture();
};

exports.logout = function(){
	Alloy.Globals.menuType = "1";
	info.resetInfo();  
	refreshMenu();
	navigation("login",1);
};
