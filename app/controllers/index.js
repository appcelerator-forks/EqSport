var eqUrl = Ti.App.Properties.getString('eqUrl');
API.getDomainUrl();


DRAWER.initDrawer();
// event 
Ti.App.addEventListener("app:refreshMenu", function(e) {
	DRAWER.initMenu();
});

 

// $.drawer.addEventListener('android:back', function (e) {
	// mod = Ti.App.Properties.getString('module');
	// if(mod == "storeLocator"){
		// Ti.App.Properties.setString('module', 'index');
		// var nav = Alloy.createController("storeLocator").getView(); 
		// Alloy.Globals.Drawer.setCenterWindow(nav);  
	// }else if(mod == "colourSwatches"){
		// Ti.App.Properties.setString('module', 'index');
		// var nav = Alloy.createController(mod).getView(); 
		// Alloy.Globals.Drawer.setCenterWindow(nav);  
	// }else if(drawerFlag == 1){
		// var dialog = Ti.UI.createAlertDialog({
		    // cancel: 1,
		    // buttonNames: ['Cancel','Confirm'],
		    // message: 'Would you like to exit Sissons Paint?',
		    // title: 'Exit app'
		// });
		// dialog.addEventListener('click', function(e){
// 		  
	    	// if (e.index === e.source.cancel){
		      // //Do nothing
		    // }
		    // if (e.index === 1){
		    	// var activity = Titanium.Android.currentActivity;
				// activity.finish();
		    // }
		// });
		// dialog.show(); 
	// }else{
		// DRAWER.closeToggle();
	// }
//   	
// });