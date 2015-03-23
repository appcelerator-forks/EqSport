var eqUrl = Ti.App.Properties.getString('eqUrl');
API.getDomainUrl(); 
DRAWER.initDrawer();

Ti.App.Properties.setString('presetRunner', "");
Ti.App.Properties.setString('presetBet', "");
DRAWER.logout();

// event 
Ti.App.addEventListener("app:refreshMenu", function(e) {
	DRAWER.initMenu();
});


