require ('./resources/scss/style.scss')

// Add scripts in all pages
$(document).ready(function() {

	// Fixed widgets
	var fixedWidgetsScript=document.createElement('script');
	fixedWidgetsScript.type='text/javascript';
	fixedWidgetsScript.src='/js/dist/fixed-widgets/main.js';
	$("body").append(fixedWidgetsScript);

})

console.log("V2 theme is loaded")
