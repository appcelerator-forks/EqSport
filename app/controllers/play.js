//Assign value in case the user didn't change data --- solve by using setSelectedRow
// var venue;
// var raceNo;
// var pool;
// var runner;

if(Ti.Platform.osname == "android")
{
	$.picker1.setSelectedRow(0,false);
	$.picker2.setSelectedRow(0,false);
	$.picker3.setSelectedRow(0,false);
}

if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad")
{
	console.log("ios picker setter");
	$.picker1.setSelectedRow(0,3,false);
	$.picker2.setSelectedRow(0,3,false);
	$.picker3.setSelectedRow(0,8,false);
}

// $.picker4.setSelectedRow(0,false);

// var label = Ti.UI.createLabel({
    // left: 0,
    // text: "JAP (GOOD)",
    // color: 'black',
    // font: {
        // fontFamily:'Arial',
        // fontSize: '14dp',
        // fontStyle: 'normal',
        // fontWeight: 'normal',
        // fontColor: 'black'
    // }
// });
// 
// $.row1.add(label);
// $.row1.title = label.text;

if(Ti.Platform.osname == "android")
{
	$.scrollView2.scrollType = "horizontal";
	$.scrollView2.overScrollMode = Titanium.UI.Android.OVER_SCROLL_NEVER;
	$.scrollView.overScrollMode = Titanium.UI.Android.OVER_SCROLL_NEVER;
}

var containerView = Ti.UI.createView({
	layout: "composite",
	height:"100%",
	width:"100%",
	backgroundColor: "black"
});

var cancelBtn;
var confirmBtn;

function venue(e)
{
	console.log("venue");
	venue = e.row.title;
	console.log(venue);
	if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad")
	{
		$.picker1.visible = false;
		$.venueLabel.text = venue;
	}
}

function raceNo(e)
{
	raceNo = e.row.title;
	console.log(raceNo);
	if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad")
	{
		$.picker2.visible = false;
		$.raceNoLabel.text = raceNo;
	}
}

function pool(e)
{
	pool = e.row.title;
	console.log(pool);
	if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad")
	{
		$.picker3.visible = false;
		$.poolLabel.text = pool;
	}
}

// function runner(e){
	// runner = e.row.title;
	// console.log(runner);
// }

if(Ti.Platform.osname == "android")
{
	$.bet.addEventListener('focus', function f(e){
	    $.bet.blur();
	    $.bet.removeEventListener('focus', f);
	});
}

function back(){	
	DRAWER.navigation("member");
}

function confirm(){
	var confirmView = Ti.UI.createView({
		layout: "vertical",
		height:"80%",
		width:"90%"
	});
	
	var titleView = Ti.UI.createView({
		layout: "composite",
		height:"15%",
		width:"100%",
		backgroundColor:"white"
	});
	
	var titleLabel = Ti.UI.createLabel({
		color: 'black',
		font: { fontSize:25 },
		text: 'Bet Confirmtion',
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		width: Ti.UI.SIZE, 
		height: Ti.UI.SIZE,
		left: 10
	});
	
	var contentView = Ti.UI.createScrollView({
		layout: "vertical",
		height:"85%",
		width:"100%",
		backgroundColor:"#EFEFEF",
		scrollType: "vertical",
		showVerticalScrollIndicator: false,
  		showHorizontalScrollIndicator: false,
	});
	
	if(Ti.Platform.osname == "android")
	{
		contentView.overScrollMode = Titanium.UI.Android.OVER_SCROLL_NEVER;
	}
	
	var horizontalView1 = Ti.UI.createView({
		layout:"horizontal",
		height:"50",
		width:"100%",
		top: 10
	});
	
	var horizontalView2 = Ti.UI.createView({
		layout:"horizontal",
		height:"50",
		width:"100%"
	});
	
	var horizontalView3 = Ti.UI.createView({
		layout:"horizontal",
		height:"50",
		width:"100%"
	});
	
	var horizontalView4 = Ti.UI.createView({
		layout:"horizontal",
		height:"50",
		width:"100%"
	});
	
	var horizontalView5 = Ti.UI.createView({
		layout:"horizontal",
		height:"50",
		width:"100%"
	});
	
	var venueLabel = Ti.UI.createLabel({
		color: 'black',
		text: 'Venue',
		width: "40%",
		left: 10
	});
	
	var raceNoLabel = Ti.UI.createLabel({
		color: 'black',
		text: 'Race No.',
		width: "40%",
		left: 10
	});
	
	var poolLabel = Ti.UI.createLabel({
		color: 'black',
		text: 'Pool',
		width: "40%",
		left: 10
	});
	
	var runnerLabel = Ti.UI.createLabel({
		color: 'black',
		text: 'Runner*',
		width: "40%",
		left: 10
	});
	
	var betLabel = Ti.UI.createLabel({
		color: 'black',
		text: 'Bet (RM)',
		width: "40%",
		left: 10
	});
	
	var venueLabelValue = Ti.UI.createLabel({
		color: 'black',
		text: venue,
		width: "50%"
	});
	
	var raceNoLabelValue = Ti.UI.createLabel({
		color: 'black',
		text: raceNo,
		width: "50%"
	});
	
	var poolLabelValue = Ti.UI.createLabel({
		color: 'black',
		text: pool,
		width: "50%"
	});
	
	var runnerLabelValue = Ti.UI.createLabel({
		color: 'black',
		text: $.runner.value,
		width: "50%"
	});
	
	var betLabelValue = Ti.UI.createLabel({
		color: 'black',
		text: $.bet.value,
		width: "50%"
	});
	
	var centerImageView = Ti.UI.createView({
		layout: "composite",
		height:"100",
		width: "100%",
	});
	
	var imageView = Ti.UI.createView({
		layout: "horizontal",
		height: Ti.UI.SIZE,
		width: Ti.UI.SIZE,
	});
	
	cancelBtn = Ti.UI.createImageView({
		image:'/images/Button_Cancel.png',
		width: 80,
		height: 80,
		right: 10
	});

	confirmBtn = Ti.UI.createImageView({
		image:'/images/Button_Confirm.png',
		width: 80,
		height: 80,
		left: 10
	});
	
	horizontalView1.add(venueLabel);
	horizontalView1.add(venueLabelValue);
	horizontalView2.add(raceNoLabel);
	horizontalView2.add(raceNoLabelValue);
	horizontalView3.add(poolLabel);
	horizontalView3.add(poolLabelValue);
	horizontalView4.add(runnerLabel);
	horizontalView4.add(runnerLabelValue);
	horizontalView5.add(betLabel);
	horizontalView5.add(betLabelValue);
	imageView.add(cancelBtn);
	imageView.add(confirmBtn);
	centerImageView.add(imageView);
	contentView.add(horizontalView1);
	contentView.add(horizontalView2);
	contentView.add(horizontalView3);
	contentView.add(horizontalView4);
	contentView.add(horizontalView5);
	contentView.add(centerImageView);
	titleView.add(titleLabel);
	confirmView.add(titleView);
	confirmView.add(contentView);
	containerView.add(confirmView);
	$.mainView.add(containerView);
	
	cancelBtn.addEventListener('click',cancel);
	confirmBtn.addEventListener('click',process);
}

function cancel()
{
	cancelBtn.removeEventListener('click',cancel);
	confirmBtn.removeEventListener('click',process);
	$.mainView.remove(containerView);
}

function process()
{
	//send data to server
	
	
	cancelBtn.removeEventListener('click',cancel);
	confirmBtn.removeEventListener('click',process);
	$.mainView.remove(containerView);
}

function showVenue()
{
	$.picker1.setVisible(true);
	return false;
	 // $.venueView.height = 300;
	// $.picker1.visible = true;
	// var pickerView = Ti.UI.createView({
		// layout: "composite",
		// height:"Ti.UI.SIZE",
		// width:"100%"
	// });
// 	
	// var picker = Ti.UI.createPicker({
	  // top:50
	// });
// 	
	// var data = [];
	// data[0]=Ti.UI.createPickerRow({title:'Bananas'});
	// data[1]=Ti.UI.createPickerRow({title:'Strawberries'});
	// data[2]=Ti.UI.createPickerRow({title:'Mangos'});
	// data[3]=Ti.UI.createPickerRow({title:'Grapes'});
// 	
	// picker.add(data);
	// picker.selectionIndicator = true;
// 	
	// pickerView.add(picker);
	// $.venueView.add(pickerView);
}

function showRaceNo()
{
	$.picker2.setVisible(true);
	return false;
}

function showPool()
{
	$.picker3.setVisible(true);
	return false;
}
