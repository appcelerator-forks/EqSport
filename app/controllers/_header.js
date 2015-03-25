var args = arguments[0] || {}; 

setTimeout(function(){ reloadHeaderMenu(); }, 100);

function reloadHeaderMenu(){
	var module = Ti.App.Properties.getString('module');
	var isRoot = Ti.App.Properties.getString('root');
	 
	if(module !== null && module != "" && isRoot != "1"){
		$.leftButton.width = "20";
		$.leftButton.mod   = "back";
		if(module == "home" || module == "member"){
			$.leftButton.image = "/images/others_08_oren.png";
		}else{
			$.leftButton.image = "/images/others_08.png";
		} 
	}else{
		$.leftButton.width = "35";
		$.leftButton.image = "/images/menu_button.png";
		$.leftButton.mod   = "menu";
	} 

}

 
function menuToggle(e){  
	var module = Ti.App.Properties.getString('module');
	var isRoot = Ti.App.Properties.getString('root');
	
	DRAWER.enableDrawer();	
	if(module !== null && module != ""){
		Ti.App.Properties.setString('module',"");
		DRAWER.navigation(module, 1 );
		
	}else{ 
		if($.leftButton.mod == "menu"){
			DRAWER.closeToggle();
		}
		
	}
	
}