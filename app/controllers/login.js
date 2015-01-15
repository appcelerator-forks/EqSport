var args = arguments[0] || {};
 
function submit(){
	var account = $.account.value;
	var pin = $.pin.value;

	if(account == ""){
		alert("no email/account");
	}else if(pin == ""){
		alert("no pin");
	}else{
		API.login({
			acc_no : account,
			acc_pin: pin
		});
	}
}

function newAccount(){
	DRAWER.navigation("signUp",1);
}

function close(){ 
	DRAWER.navigation("home",1);
}

function skip(){
	DRAWER.navigation("home",1);
}
