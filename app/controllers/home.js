var args = arguments[0] || {}; 
if(Ti.Platform.osname == "android") {
	$.scrollView.overScrollMode = Titanium.UI.Android.OVER_SCROLL_NEVER;
}

function goTo(e){ 
	DRAWER.navigation("eq_"+e.source.mod);
}
 

function login(){ 
	DRAWER.navigation("login");
}

function signUp()
{
	DRAWER.navigation("signUp");
}
