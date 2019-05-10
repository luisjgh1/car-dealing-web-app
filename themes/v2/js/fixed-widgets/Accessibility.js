export function accessibilityButtons(widgetsContainer) {
  
  ///////////////
  // Font Size //
  ///////////////
  var fontSizeContainer=document.createElement('div');
  fontSizeContainer.className="accessibility-fontsize";

  // Bigger button
  var fontSizeBiggerContainer=document.createElement('div');
  fontSizeBiggerContainer.className="w-100 pl-3 pr-2";

  var fontSizeBiggerLink=document.createElement('a');
  fontSizeBiggerLink.className="accessibility-fontsize-bigger no-underline-hover";
  fontSizeBiggerLink.href="#!";
  fontSizeBiggerLink.onclick= function() {
    $('body').css({'zoom':1.2})
  };

  var fontSizeBiggerNameSpan=document.createElement('span');
  var fontSizeBiggerNameText=document.createTextNode('A');
  fontSizeBiggerNameSpan.appendChild(fontSizeBiggerNameText);
  
  var fontSizeBiggerLetterSpan=document.createElement('span');
  var fontSizeBiggerLetterText=document.createTextNode('Bigger');
  fontSizeBiggerLetterSpan.appendChild(fontSizeBiggerLetterText);
  
  fontSizeBiggerLink.appendChild(fontSizeBiggerLetterSpan);
  fontSizeBiggerLink.appendChild(fontSizeBiggerNameSpan);
  fontSizeBiggerContainer.appendChild(fontSizeBiggerLink);

  // Normal button
  var fontSizeNormalContainer=document.createElement('div');
  fontSizeNormalContainer.className="w-100 pl-3 pr-2";

  var fontSizeNormalLink=document.createElement('a');
  fontSizeNormalLink.className="accessibility-fontsize-normal no-underline-hover";
  fontSizeNormalLink.href="#!";
  fontSizeNormalLink.onclick= function() {
    $('body').css({'zoom':1.0})
  };

  var fontSizeNormalNameSpan=document.createElement('span');
  var fontSizeNormalNameText=document.createTextNode('A');
  fontSizeNormalNameSpan.appendChild(fontSizeNormalNameText);
  
  var fontSizeNormalLetterSpan=document.createElement('span');
  var fontSizeNormalLetterText=document.createTextNode('Normal');
  fontSizeNormalLetterSpan.appendChild(fontSizeNormalLetterText);
  
  fontSizeNormalLink.appendChild(fontSizeNormalLetterSpan);
  fontSizeNormalLink.appendChild(fontSizeNormalNameSpan);
  fontSizeNormalContainer.appendChild(fontSizeNormalLink);

  // Smaller button
  var fontSizeSmallerContainer=document.createElement('div');
  fontSizeSmallerContainer.className="w-100 pl-3 pr-2";

  var fontSizeSmallerLink=document.createElement('a');
  fontSizeSmallerLink.className="accessibility-fontsize-smaller no-underline-hover";
  fontSizeSmallerLink.href="#!";
  fontSizeSmallerLink.onclick= function() {
    $('body').css({'zoom':0.8})
  };

  var fontSizeSmallerNameSpan=document.createElement('span');
  var fontSizeSmallerNameText=document.createTextNode('A');
  fontSizeSmallerNameSpan.appendChild(fontSizeSmallerNameText);
  
  var fontSizeSmallerLetterSpan=document.createElement('span');
  var fontSizeSmallerLetterText=document.createTextNode('Smaller');
  fontSizeSmallerLetterSpan.appendChild(fontSizeSmallerLetterText);
  
  fontSizeSmallerLink.appendChild(fontSizeSmallerLetterSpan);
  fontSizeSmallerLink.appendChild(fontSizeSmallerNameSpan);
  fontSizeSmallerContainer.appendChild(fontSizeSmallerLink);

  // Add title to container
  var titleContainer=document.createElement('div');
  titleContainer.className="accessibility-fontsize-title-container";
  var titleParagraph=document.createElement('p');
  titleParagraph.className="accessibility-fontsize-title";
  var titleText=document.createTextNode('Font Size');
  titleParagraph.appendChild(titleText);
  titleContainer.appendChild(titleParagraph);
  fontSizeContainer.appendChild(titleContainer);

  // Add buttons to container
  fontSizeContainer.appendChild(fontSizeBiggerContainer);
  fontSizeContainer.appendChild(fontSizeNormalContainer);
  fontSizeContainer.appendChild(fontSizeSmallerContainer);

  //////////////
  // Contrast //
  //////////////
  var contrastContainer=document.createElement('div');
  contrastContainer.className="accessibility-contrast";

  // Change contrast button
  var highContrastLink=document.createElement('a');
  highContrastLink.className="accessibility-contrast-high no-underline-hover";
  highContrastLink.href="#!";
  highContrastLink.onclick= function() {
    if ( $("body .negative-overlay").length) {
      $("body .negative-overlay").remove();
    } else {
      var negativeOverlay=document.createElement('div');
      negativeOverlay.className="negative-overlay";
      $("body").append(negativeOverlay);
    }
  };
  var highContrastText=document.createTextNode('Change Contrast');
  highContrastLink.appendChild(highContrastText);

  // Add button to container
  contrastContainer.appendChild(highContrastLink);

  /////////////////////////////
  // Accessibility Container //
  /////////////////////////////
  var accessibilityContainer=document.createElement('div');
  accessibilityContainer.className="accessibility";
  
  // Show Accessibility Button
  var showAccessibilityButton=document.createElement('button');
  showAccessibilityButton.className="show-accessibility-button";
  var showAccessibilityIcon=document.createElement('i');
  showAccessibilityIcon.className="fas fa-universal-access text-secondary-gray";
  
  var self = showAccessibilityIcon;
  showAccessibilityButton.onclick=function() {
    var container = $(".accessibility");
    if(container.hasClass('show-accessibility')) {
      container.removeClass('show-accessibility');
    } else {
      container.addClass('show-accessibility');
    }
  }

  showAccessibilityButton.append(showAccessibilityIcon);
  // Accessibility content
  var accessibilityContent=document.createElement('div');
  accessibilityContent.className="accessibility-content";
  
  // Add buttons to content container
  accessibilityContent.append(fontSizeContainer);
  accessibilityContent.append(contrastContainer);

  // Add all to main container
  accessibilityContainer.append(showAccessibilityButton);
  accessibilityContainer.append(accessibilityContent);

  /////////////////////////
  // Add buttons to body //
  /////////////////////////
  widgetsContainer.append(accessibilityContainer);

};
