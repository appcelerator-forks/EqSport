exports.createAlert = function(tt,msg){
	var box = Titanium.UI.createAlertDialog({
		title: tt,
		message: msg
	});
	box.show();
};


exports.popup = function(subView,config){
    //Popup win
	var popupWin = Ti.UI.createWindow({
		backgroundImage : "/images/Transparent.png",
		opacity            : 0, 
		id                : "popupWin"
	});
	
	//View that used to show the msg
	var popupView = Ti.UI.createView({
		width    : config.width,
		height    : config.height,
		backgroundColor : "#000000",
		borderRadius : 10,
		borderColor : "#565656",
		borderWidth : 1
	}); 
	 
	popupView.add(subView ); 
	popupWin.add(popupView);
 
	//Event to close the popup window
	popupWin.addEventListener("click", function(e){
		if(e.source.id != null){
			popupWin.close();
		}
	});
		
	var matrix = Ti.UI.create2DMatrix(); 
	matrix = matrix.scale(1.3, 1.3);
	  
	popupWin.addEventListener('open', function(){
	    if (Titanium.Platform.name == 'android') {
    		popupWin.activity.actionBar.hide();
		}
	    
	    var a = Ti.UI.createAnimation({
		    transform : matrix,
		    opacity: 1, 
		    duration : 500, 
		});
		popupWin.animate(a);  
	}); 
	 
	return popupWin;
};