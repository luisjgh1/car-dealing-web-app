var setster_widget_options = {};

setster_widget_options.display = "hidden";  
setster_widget_options.uri = "haddadandpartners";
setster_widget_options.placement = "hidden";  
setster_widget_options.buttonName = "";
setster_widget_options.setsterURL = "https://www.setster.com/widget/"; 
setster_widget_options.defaultService = "53129"; 
setster_widget_options.defaultProvider = "28881"; 

setTimeout(function() {
  var setster_widget = new Setster.setster_widget(setster_widget_options);
}, 100)
