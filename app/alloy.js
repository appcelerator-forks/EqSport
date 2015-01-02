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

var API = require('api');
var getValueFromXml = function(xml, parent,child){
	var parentNode =  xml.getElementsByTagName(parent).item(0); 
	var childNode = parentNode.getElementsByTagName(child).item(0).textContent;
	return childNode;
};