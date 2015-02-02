var args = arguments[0] || {};
COMMON.construct($);

function submit(){
	COMMON.showLoading();
	var account = $.account.value;
	var pin = $.pin.value;

	if(account == ""){
		alert("no email/account");
		COMMON.hideLoading();
	}else if(pin == ""){
		alert("no pin");
		COMMON.hideLoading();
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
