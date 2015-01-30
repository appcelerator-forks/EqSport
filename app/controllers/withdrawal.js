Ti.App.Properties.setString('root',"0");
Ti.App.Properties.setString('module',"member");
function back(){
	Ti.App.Properties.setString('module',"");	 
	DRAWER.navigation("member",1);
}