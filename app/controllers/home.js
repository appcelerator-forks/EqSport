var args = arguments[0] || {}; 
if(Ti.Platform.osname == "android") {
	$.scrollView.overScrollMode = Titanium.UI.Android.OVER_SCROLL_NEVER;
}

function goTo(e){ 
	DRAWER.navigation("eq_"+e.source.mod,1);
}
 

function login(){ 
	DRAWER.navigation("login",1);
}

function signUp()
{
	DRAWER.navigation("signUp",1);
}
