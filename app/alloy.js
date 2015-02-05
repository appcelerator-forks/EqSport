// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Alloy.Globals.menuType = "1";//public

var API = require('api');
var DRAWER = require('drawer');
var COMMON = require('common');
var getValueFromXml = function(xml, parent,child){
	var parentNode =  xml.getElementsByTagName(parent).item(0); 
	var childNode = parentNode.getElementsByTagName(child).item(0).textContent;
	return childNode;
};
 

var extractHistoryValue = function(data){
	/**extract from raw data***/	
	var res = data.split("||");   
 	var ary = []; 
	for(var i=0; i < res.length; i++){
		var obj = {};
	 	
	 	//if return success
		if(res[1] == "S:" || res[1] == "R:"){
			//start grab data and locate to array
			var dateRow = i-2;
			if(dateRow % 4 == 0 ){
				if(res[i] != ""){
					var position = parseInt(dateRow) / 4;
					obj['position'] = position;
					obj['date'] = res[i];
					obj['pool'] = res[i+1];
					obj['race'] = res[i+2];
					obj['runner'] = res[i+3]; 
					ary.push(obj);
				}
			} 
		}else{
		 
		} 
	}
	return ary;	
};

var getValueFromPipe = function(xml){
	var res = getValueFromXml(xml, 'HTML' , 'BODY');
	var data = res.split("||");  
 	var obj = {};
 	
	if(data[1] == "S:" || data[1] == "R:"){
		obj['response'] = data[2];
		for(var i=2; i <= data.length; i++){
			if(i != data.length){
				var inner = data[i].split(":"); 
		       	if(inner[0] !== ""){
		       		//fixed key space
		       		var inner_key = inner[0].replace(" ", ""); 
		       		var val_inner = inner[1];
		       		
		       		//fixed for time format
		       		if(inner.length > 2){
		       			val_inner = inner[1] +":"+inner[2] +":"+inner[3];
		       		}
		       		
		       		obj[inner_key] = val_inner;
		       	}
	    	}
		}
			
	}else{
		obj['response'] = data[2];
	
	} 
	return obj;
};

var getValueFromDollarAndPipe = function(xml){
	var res = getValueFromXml(xml, 'HTML' , 'BODY');
	var data = res.split("||");  
 	var obj = {};
 	
	if(data[1] == "S:" || data[1] == "R:"){
		for(var i=2; i <= data.length; i++){
			if(i != data.length){
				var inner = data[i].split("$");  
		       	if(inner[0] !== ""){
		       		//console.log(inner);
		       		obj['id'] = inner[0];
		       		obj['venue'] = inner[1];
		       		obj['totalRunner'] = inner[2];
		       		var count =1;
		       		for(var i=3; i < 3 + parseInt(inner[2]); i++){
		       			var runner = inner[i].split("*"); 
		       			obj['runner'+count] = runner;
		       			count++;
		       		}
		       		 
		       	}
	      
	    	}
		}
			
	}  
	return obj;
};

var getValueForFavOdd = function(xml){
	var res = getValueFromXml(xml, 'HTML' , 'BODY');
	var data = res.split("||");  
 	
 	var ary = [];
	if(data[1] == "S:" || data[1] == "R:"){ 
		var obj = {};
		//var w_arr = data[5].split("$"); 
		//var p_arr = data[7].split("$"); 
		obj["race_date"]  = data[2];
		obj["race_no"]  = data[3];
		obj["min_to_race"]  = data[4];
		//obj["win_odd"]  = w_arr;
		obj["win_odd"]  = data[5];
		obj["runner"]  = data[6];
		//obj["pla_odd"]  = p_arr;
		obj["pla_odd"]  = data[7];
		obj["venue"]  = data[8];
		obj["time"]  = data[9];
		ary.push(obj);
	} 
	return ary;
};

function mysql_real_escape_string (str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
}

function removeAllChildren(viewObject){
    //copy array of child object references because view's "children" property is live collection of child object references
    var children = viewObject.children.slice(0);
 
    for (var i = 0; i < children.length; ++i) {
        viewObject.remove(children[i]);
    }
}

function PixelsToDPUnits(ThePixels){
  return (ThePixels / (Titanium.Platform.displayCaps.dpi / 160));
}

function DPUnitsToPixels(TheDPUnits){
  return (TheDPUnits * (Titanium.Platform.displayCaps.dpi / 160));
}

function timeFormat(datetime){
	var timeStamp = datetime.split(" ");  
	var newFormat;
	var ampm = "am";
	var date = timeStamp[0].split("/");  
	var time = timeStamp[1].split(":");  
	if(time[0] > 12){
		ampm = "pm";
		time[0] = time[0] - 12;
	}
	
	newFormat = date[0]+"/"+date[1]+"/"+date[2] + " "+ time[0]+":"+time[1]+ " "+ ampm;
	return newFormat;
}

//API.getRTOResults();
