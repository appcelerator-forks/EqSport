var args = arguments[0] || {}; 

setTimeout(function(){ reloadHeaderMenu(); }, 300);

function reloadHeaderMenu(){
	var module = Ti.App.Properties.getString('module');
	var isRoot = Ti.App.Properties.getString('root');
	 
	if(module !== null && module != "" && isRoot != "1"){
		$.leftButton.width = "20";
		if(module == "home"){
			$.leftButton.image = "/images/others_08_oren.png";
		}else{
			$.leftButton.image = "/images/others_08.png";
		}
		
	}else{
		$.leftButton.width = "35";
		$.leftButton.image = "/images/menu_button.png";
	} 

}

 
function menuToggle(e){  
	var module = Ti.App.Properties.getString('module');
	var isRoot = Ti.App.Properties.getString('root');
	if(module !== null && module != ""){
		Ti.App.Properties.setString('module',"");
		DRAWER.navigation(module, 1);
	}else{
		DRAWER.closeToggle();
	}
	
}