var eqUrl = Ti.App.Properties.getString('eqUrl');
API.getDomainUrl();


DRAWER.initDrawer();
// event 
Ti.App.addEventListener("app:refreshMenu", function(e) {
	DRAWER.initMenu();
});


