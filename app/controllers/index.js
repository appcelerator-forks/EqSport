DRAWER.initDrawer($);
// event 
Ti.App.addEventListener("app:refreshMenu", function(e) {
	DRAWER.initMenu($);
});