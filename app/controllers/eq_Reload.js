var args = arguments[0] || {}; 
Ti.App.Properties.setString('root',"0"); 
if(Ti.Platform.osname == "android") {
	$.topupView.overScrollMode = Titanium.UI.Android.OVER_SCROLL_NEVER;
}

$.bankPicker.setSelectedRow(0, 0, false);

function closeWindow(){ 
    DRAWER.navigation("home");
}

function changeBank(e){ 
	$.bankLabel.text = e.selectedValue[0];
	resetBankInfo();  
	switch(e.rowIndex){
		case 0: 
			$.bank0.setVisible(true);
			break;
		case 1: 
			$.bank1.setVisible(true);
			break;
		case 2: 
			$.bank2.setVisible(true);
			break;
		case 3: 
			$.bank3.setVisible(true);
			break;
		case 4: 
			$.bank4.setVisible(true);
			break;
		case 5: 
			$.bank5.setVisible(true);
			break;
		case 6: 
			$.bank6.setVisible(true);
			break;
		case 7: 
			$.bank7.setVisible(true);
			break;
	}
	//$.bankView.text = 
}

function resetBankInfo(){
	$.bank1.setVisible(false);
	$.bank2.setVisible(false);
	$.bank3.setVisible(false);
	$.bank4.setVisible(false);
	$.bank5.setVisible(false);
	$.bank6.setVisible(false);
	$.bank7.setVisible(false);
}

function showBankPicker(){
	$.bankView.height = 160;
	$.bankContentView.height = 160;
	$.bankPicker.height = 160;
	$.bankView.setVisible(true);
	$.bankPicker.setVisible(true); 
	return false; 
}

function donePick() {
	$.bankView.height = 50;  
	$.bankContentView.height = 50;
	$.bankPicker.height = 50;
	$.bankView.setVisible(false); 
	$.bankPicker.setVisible(false);
}
	 
$.topupView.addEventListener('scroll', function(sc) { 
	console.log(sc.x+"="+sc.y ); 
//	PRODUCT.reloadFromScroll(e);
});