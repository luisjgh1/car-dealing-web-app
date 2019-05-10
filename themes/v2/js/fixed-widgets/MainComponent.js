import { compareCarsTab } from './CompareCarsTab';
import { accessibilityButtons } from './Accessibility';

$(document).ready(function() {
  var widgetsContainer=document.createElement('div');
  widgetsContainer.className="widgets-container";

  compareCarsTab(widgetsContainer);
  accessibilityButtons(widgetsContainer);
  
  $('body').append(widgetsContainer);

});
