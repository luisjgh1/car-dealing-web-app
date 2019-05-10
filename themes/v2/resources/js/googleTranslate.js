function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}
function changeLanguageEnglish() {
  var selectField = document.querySelector("#google_translate_element select");
  for(var i=0; i < selectField.children.length; i++){
    var option = selectField.children[i];
    // find desired langauge and change the former language of the hidden selection-field 
    if(option.value=='en'){
      selectField.selectedIndex = i;
      // trigger change event afterwards to make google-lib translate this side
      selectField.dispatchEvent(new Event('change'));
      break;
    }
  }
}
function changeLanguageSpanish() {
  var selectField = document.querySelector("#google_translate_element select");
  for(var i=0; i < selectField.children.length; i++){
    var option = selectField.children[i];
    // find desired langauge and change the former language of the hidden selection-field 
    if(option.value=='es'){
      selectField.selectedIndex = i;
      // trigger change event afterwards to make google-lib translate this side
      selectField.dispatchEvent(new Event('change'));
      break;
    }
  }
}