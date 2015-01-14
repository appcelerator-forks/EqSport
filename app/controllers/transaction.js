var value = new Date();
var dayInt = value.getDate();
var monthInt = ("0"+(value.getMonth()+1)).slice(-2);
var yearInt = value.getFullYear();
$.picker.value = value;

displayDate(dayInt.toString(),monthInt.toString(),yearInt.toString());

// var toDisplay = todayDate.toString() + "/" + todayMonth.toString() + "/" + todayYear.toString();
// 
// $.date.text = toDisplay;

// $.picker.minDate = new Date(2009,0,1);
// $.picker.maxDate = new Date();
// $.picker.value = new Date();

function back()
{
	// $.picker1.removeEventListener('change',venue);
	// $.picker2.removeEventListener('change',raceNo);
	// $.picker3.removeEventListener('change',pool);
	// $.picker4.removeEventListener('change',runner);
	//$.picker.removeEventListener('change',transaction);
	
	DRAWER.navigation("member",1);
}

//$.picker.addEventListener('change',transaction);

// function transaction(e)
// {
	// value = e.value;
	// console.log(value);
// 	
	// /*	for(var i=0, i<array[index].length, i++)
		// {
// 			
		// }
	// */
// }

function showDate(){
	$.dateView.height = 285;
	$.pickerView.show();
}

function displayDate(day,month,year){
	var string = day + "/" + month + "/" + year;
	$.date.text = string;
}

function done(){
	$.pickerView.hide();
	$.dateView.height = 70;
	value = $.picker.value;
	dayInt = value.getDate();
	monthInt = ("0"+(value.getMonth()+1)).slice(-2);
	yearInt = value.getFullYear() ;
	
	var day = dayInt.toString();
	var month = monthInt.toString();
	var year = yearInt.toString();
	var date = day + month + year;
	
	displayDate(day,month,year);
	
	//transaction api
}
