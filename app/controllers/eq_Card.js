var args = arguments[0] || {};
Ti.App.Properties.setString('root',"0");
var menu = [{id: 0, title: "Info", controller: 'eq_Card1'}, {id: 1, title: "T&C", controller: 'eq_Card3'}];
DRAWER.disableDrawer();	
function goSlide(event){
	var index = event.source.mod;
	var arrViews = $.scrollableView.getViews();
	
	switch(index){
		case "0":
			$.lbl1.backgroundColor = "#FFFFFF";
			$.lbl1.color = "#494949";
			$.lbl1.borderColor = "#FFFFFF";
			// $.lbl2.backgroundColor = "#D1D1D1";
			// $.lbl2.color = "#838383";
			//$.lbl2.borderColor = "#ADADAD";
			$.lbl3.backgroundColor = "#D1D1D1";
			$.lbl3.color = "#838383";
			$.lbl3.borderColor = "#ADADAD";
			break;
		 
		case "1":
			$.lbl1.backgroundColor = "#D1D1D1";
			$.lbl1.color = "#838383";
			$.lbl1.borderColor = "#ADADAD";
			// $.lbl2.backgroundColor = "#D1D1D1";
			// $.lbl2.color = "#838383";
			// $.lbl2.borderColor = "#ADADAD";
			$.lbl3.backgroundColor = "#FFFFFF";
			$.lbl3.color = "#494949";
			$.lbl3.borderColor = "#FFFFFF";
			break;
	}
	 
	$.scrollableView.scrollToView(arrViews[index]);
}

function scrollend(event){
	//moveHoverTo(event.currentPage);
	if(event.currentPage == 0){
		Ti.App.fireEvent('Ti:table_refresh');
	}
}

$.scrollableView.addEventListener("scrollend", scrollend);

function closeWindow(){ 	 
	DRAWER.navigation("home");
}

/**********************
 * Clear object and memory
 **********************/
var clearObject = function(){  
	menu = null; 
	args = null;
	Ti.App.removeEventListener("clearObject", clearObject);
};
Ti.App.addEventListener("clearObject", clearObject);	
