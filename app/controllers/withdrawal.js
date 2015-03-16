Ti.App.Properties.setString('root',"0");
Ti.App.Properties.setString('module',"member");
DRAWER.disableDrawer();
function back(){
	DRAWER.enableDrawer();	
	Ti.App.Properties.setString('module',"");	 
	DRAWER.navigation("member",1);
}