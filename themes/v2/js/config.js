const api321 = 'http://localhost:8081/api';
// do not update manualy line 1 api321 see build.sh to update its value

import axios from 'axios'

const setHeader = async () => {
  let counter = 0;
  while(true) {
    if(typeof axios !== 'undefined' && window.api321) {
      axios.defaults.headers.common['dealerCode'] = window.api321.dealerCode;
      break;
    }
    if(counter == 25) {
      break;
    }
    counter++;
    await sleep(100);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const serverUrls = {
  getPopularCars: api321 + '/cars',
  getCarById: api321 + '/cars/',
  getMakes: api321 + '/makes',
  getModels: api321 + '/models',
  getBodyTypes: api321 + '/body-types',
  searchRelatedCars: api321 + '/search/',
  searchCars: api321 + '/search/',
}

export const headerConfig = (dealerCode) => ({
  // it comes from the app.js file of every site
  headers: {'dealerCode': dealerCode}
})

setHeader();
