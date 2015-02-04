var args = arguments[0] || {}; 
Ti.App.Properties.setString('root',"1");
var pHeight = Ti.Platform.displayCaps.platformHeight;
$.scrollView.height = pHeight - 50; 

if(Ti.Platform.osname == "android") {
	$.scrollView.overScrollMode = Titanium.UI.Android.OVER_SCROLL_NEVER;
}

if(Alloy.Globals.menuType == "1"){
	$.bannerPublicBtn.setVisible(true);
	$.bannerMemberBtn.setVisible(false);
	$.bannerMemberBtn.height = 0;
}else{
	$.bannerMemberBtn.setVisible(true);
	$.bannerPublicBtn.setVisible(false);
	$.bannerPublicBtn.height = 0;
}
	
function goTo(e){ 
	Ti.App.Properties.setString('module',"home");
	DRAWER.navigation("eq_"+e.source.mod,1);
}
  
function login(){  
	DRAWER.navigation("login",1);
}

function signUp(){
	DRAWER.navigation("signUp",1);
}

function logout(){
	DRAWER.logout();
}
