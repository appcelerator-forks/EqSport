function back()
{	
	var win = Alloy.createController("member").getView();
	Alloy.Globals.Drawer.setCenterWindow(win); 
	Alloy.Globals.Drawer.closeLeftWindow();
}

function date()
{
	
}

function venue()
{
	
}

/*
for(var i=0, i < arr.length, i++)
{
	var contentView+i = Titanium.UI.createView({
		layout: "horizontal",
		width:"100%",
		height:60
	});
	
	var leftView+i = Titanium.UI.createView({
		width:"30%"
	});
	
	var leftLabel+i = Ti.UI.createLabel({
		color: "black",
		text: arr[i].value
	});
	
	var rightView+i = Titanium.UI.createView({
		width:"70%"
	});
	
	var rightLabel+i = Ti.UI.createLabel({
		color: "black",
		text: arr[i].value
	});
	
	var lineView = Titanium.UI.createView({
		backgroundColor: "black",
		width:"90%",
		height:1
	});
	
	var centerLineView = Titanium.UI.createView({
		layout: "composite",
		width:"100%",
		height:1
	});
	
	leftView+i.add(leftLabel+i);
	rightView+i.add(rightLabel+i);
	contentView+i.add(leftView+i);
	contentView+i.add(rightView+i);
	centerLineView.add(lineView);
	$.scrollView.add(contentView+i);
	$.scrollView.add(centerLineView);
}
*/
