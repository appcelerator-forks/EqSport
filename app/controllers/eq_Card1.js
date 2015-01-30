var args = arguments[0] || {};
Ti.App.Properties.setString('root',"0");
if(Ti.Platform.osname == "android"){
	$.scrollView.overScrollMode = Titanium.UI.Android.OVER_SCROLL_NEVER;
}