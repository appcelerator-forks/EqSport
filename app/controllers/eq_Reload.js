var args = arguments[0] || {}; 
Ti.App.Properties.setString('root',"0"); 
if(Ti.Platform.osname == "android") {
	$.topupView.overScrollMode = Titanium.UI.Android.OVER_SCROLL_NEVER;
}

function closeWindow(){ 
    DRAWER.navigation("home");
}
 
$.topupView.addEventListener('scroll', function(sc) { 
	console.log(sc.x+"="+sc.y ); 
//	PRODUCT.reloadFromScroll(e);
});