// Use when API is ready
var library = Alloy.createCollection('balance'); 
var info = Alloy.createCollection('info'); 
var infoDetails = info.getInfo(); 

var res = API.checkBalance({
	account: infoDetails[0].account,
	pin: infoDetails[0].pin
});

if(res == "1"){
	getBln();
}

function getBln(){
	var details = library.getBalance(); 
	console.log(details);
	if(details != ""){
		$.amount.text = details.amount.substring(2);
		$.date.text = details.date;
		$.time.text = details.time;
	}
	
}

setTimeout(function(){
	getBln();
}, 800);	

//alert('a');


function menuToggle(e){
	DRAWER.closeToggle();
}

function back(){	
	DRAWER.navigation("member",1);
}

function topUp(){	
	DRAWER.navigation("topUp",1);
}