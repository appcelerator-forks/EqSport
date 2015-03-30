var eqUrl = Ti.App.Properties.getString('eqUrl');
API.getDomainUrl(); 
DRAWER.initDrawer();

DRAWER.logout();

// event 
Ti.App.addEventListener("app:refreshMenu", function(e) {
	DRAWER.initMenu();
});


