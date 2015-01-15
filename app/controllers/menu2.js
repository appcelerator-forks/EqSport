var args = arguments[0] || {};

function navMenu(e){
	switch(e.index){
		case 0: 
			DRAWER.navigation("home",2);   
			break;
		case 1:   
			DRAWER.navigation("eq_Card",2); 
			break;
		case 2:   
			DRAWER.navigation("eq_Play",2); 
			break;
		case 3:   
			DRAWER.navigation("eq_Win",2);
			break; 
	 	case 4: 
	 		DRAWER.navigation("eq_Reload",2);
			break;
		case 5: 
			DRAWER.navigation("member",2);
			break;
		case 6:  
			DRAWER.navigation("play",2);
			break;
		case 7: 
		// balance.resetBalance();
		// info.resetInfo();
		// rtoResults.resetResults(); 
		// navigation("amountBalance");
			DRAWER.logout();
			break;
	} 
}
 
	
