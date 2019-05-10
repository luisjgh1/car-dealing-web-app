export function compareCarsTab(widgetsContainer) {
  var tabContainer=document.createElement('div');
  tabContainer.className="compare-cars-tab";
  
  var tabLink=document.createElement('a');
  tabLink.className="compare-cars-tab-link";
  tabLink.href="/compare";

  var tabContent=document.createElement('button');
  tabContent.className="compare-cars-tab-content";

  var compareCarsNumber = 0;
  if(localStorage.getItem('compareCars') !== null)
    compareCarsNumber = JSON.parse(localStorage.getItem('compareCars')).length;

  var tabNumber=document.createElement('p');
  tabNumber.className="compare-cars-tab-number";
  var tabNumberText=document.createTextNode(compareCarsNumber);
  tabNumber.appendChild(tabNumberText);
  tabContent.appendChild(tabNumber);

  var tabTitle=document.createElement('p');
  tabTitle.className="compare-cars-tab-title";
  var tabTitleText=document.createTextNode('Compare cars');
  tabTitle.appendChild(tabTitleText);
  tabContent.appendChild(tabTitle);

  tabLink.appendChild(tabContent);
  tabContainer.appendChild(tabLink);
  widgetsContainer.appendChild(tabContainer);
}

export function editCompareCars(newCar) {

  var currentCompareCars = localStorage.getItem('compareCars');
  var newCompareCars;
  if(currentCompareCars !== null) {
    currentCompareCars = JSON.parse(currentCompareCars);
    
    if(currentCompareCars.includes(newCar)) {
      newCompareCars = currentCompareCars.filter(compareCar => compareCar !== newCar);
    } else {

      if(currentCompareCars.length === 4) {
        return 'full';
      } else {
        newCompareCars = currentCompareCars.concat(newCar);
      }

    }
    
  } else {
    newCompareCars = [newCar];
  }

  localStorage.setItem('compareCars', JSON.stringify(newCompareCars));
  $(".compare-cars-tab-number").first().text(newCompareCars.length);
  return 'ok';

}

export function checkCompareCars(newCar) {

  var currentCompareCars = localStorage.getItem('compareCars');
  var checked = false;
  if(currentCompareCars !== null) {
    currentCompareCars = JSON.parse(currentCompareCars);
    
    if(currentCompareCars.includes(newCar)) {
      checked = true;
    }

  }
  
  return checked;
}
