import axios from 'axios'
import { editCompareCars, checkCompareCars } from '../fixed-widgets/CompareCarsTab'
import { headerConfig, serverUrls } from '../config'

// Popular Cars mock data
const mockData = [
  {
    id: 'car-5',
    image: '../imag/car-5.png',
    price: 22400,
    type: 'Pre-owned',
    name: '2018 Chevrolet Tahoe',
    miles: 58369,
    vin: 'VIN NUMBER',
    discountPercent: '15%',
    discountedPrice: '$19,040',
    url: '/under-$10000-jeep-cherokee-silver_2'
  },
  {
    id: 'car-6',
    image: '../imag/car-6.png',
    price: 24100,
    type: 'Pre-owned',
    name: '2018 Chevrolet Tahoe',
    miles: 58369,
    vin: 'VIN NUMBER',
    url: 'under-$15000-dodge-truck-ram-2500-bright-white_11'
  },
  {
    id: 'car-7',
    image: '../imag/car-7.png',
    price: 24100,
    type: 'Pre-owned',
    name: '2018 Chevrolet Tahoe',
    miles: 58369,
    vin: 'VIN NUMBER',
    url: 'under-$15000-jeep-cherokee-silver_1'
  },
  {
    id: 'car-8',
    image: '../imag/car-8.png',
    price: 34100,
    type: 'Pre-owned',
    name: '2018 Chevrolet Tahoe',
    miles: 58369,
    vin: 'VIN NUMBER',
    url: 'under-$30000-dodge-truck-durango-cherry-red_0'
  },
  {
    id: 'car-3',
    image: '../imag/car-5.png',
    price: 22400,
    type: 'Pre-owned',
    name: '2018 Chevrolet Tahoe',
    miles: 58369,
    vin: 'VIN NUMBER',
    discountPercent: '15%',
    discountedPrice: '$19,040',
    url: 'under-$40000-chrysler-200-convert-silver_16'
  },
  {
    id: 'car-4',
    image: '../imag/car-6.png',
    price: 24100,
    type: 'Pre-owned',
    name: '2018 Chevrolet Tahoe',
    miles: '58,369 miles',
    vin: 'VIN NUMBER',
    url: 'under-$40000-dodge-truck-ram-1500-black_10'
  }
];

export default {
  name: 'popular-cars',
  template: `
  <div v-if="popularCars.length">
    <section class="text-center background-pay-car card-mobile">
      <h3 class="text-center font-weight-bold text-dark-blue py-3" v-if="viewPopularCars">Our most popular cars</h3>
      <h3 class="text-center font-weight-bold text-dark-blue py-3" v-if="viewRelatedCars">You may also like</h3>
      <div class="carousel slide" id="carousel-card" data-ride="carousel">
        <ol class="carousel-indicators testimony-carousel-indicators minusmb-1">
          <li data-target='#carousel-card' :data-slide-to="index" v-for="(car, index) in popularCars" :class="{active: index === 0}"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item" v-for="(car, index) in popularCars" :class="{active: index === 0}">
            <div class="card h-100">
              <template v-if="car.discountPercent">
                <div class="discount-img">
                  <span class="z-index1">{{ car.discountPercent }}<br>Off</span>
                  <div class="popular-car-img card-img-top" :style="'--img-url:url(' + car.image + ')'"></div>
                </div>
              </template>
              <template v-else>
                <div class="popular-car-img card-img-top" :style="'--img-url:url(' + car.image + ')'"></div>
              </template>
              <div class="card-body px-2 d-flex flex-column justify-content-between">
                <p class="text-car-model">{{ car.name }}</p>
                <div class="d-flex justify-content-around font-size-4 text-secondary px-2">
                  <span>{{ car.type }}</span>
                  <span>|</span>
                  <span>{{ formatNumber(car.miles, '') }} miles</span>
                  <span>|</span>
                  <span>{{ formatNumber(car.price, '$') }}</span>
                </div>
                <div class="popular-car-financing d-flex align-items-center justify-content-around mx-1">
                  <p class="mb-0">Estimated payment {{ formatNumber(getMonthlyPayment(car.price), '$') }}/m</p>
                  <a :href="getDetailsCalculatorLink(car)"><img class="p-0" src="../imag/financing-calculate.svg" alt="Financing Calculator"></a>
                </div>
                <div class="d-flex justify-content-around align-items-center">
                  <div class="form-check form-check-inline input-container m-0">
                    <label class="form-check-label" :for="'popular-compare-' + (index)">
                      <input class="form-check-input" type="checkbox" :id="'popular-compare-' + (index)" :value="car.id" @change.prevent="editCompareCars($event.target)" :checked="checkCompareCars(car.id)">
                      <span class="checkmark"></span>
                      <span class="font-size-1 line-height-1 text-secondary font-weight-normal">Compare</span>
                    </label>
                  </div>
                  <a class="style-button-form-learn no-underline-hover dark-blue-button" :href="car.url" v-if="car.url">More</a>
                  <a class="style-button-form-learn no-underline-hover dark-blue-button" href="#!" v-else>More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-primary color props-button-card" href="/search">VIEW ALL CARS</button>
    </section>
    <section class="text-center background-pay-car card-web container py-5">
      <h2 class="text-dark-blue font-weight-3 pb-4" v-if="viewPopularCars">Our most popular cars</h2>
      <h2 class="text-dark-blue font-weight-3 pb-4" v-if="viewRelatedCars">You may also like</h2>
      <div class="row">
        <div class="carousel slide" id="popular-car-carousel-web" data-ride="carousel" data-interval="false">
          <div class="carousel-inner">
            <div class="carousel-item" v-for="(carChunks, index) in popularCarsChunked" :class="{active: index === 0}">
              <div class="row">
                <div class="col-3 px-0" v-for="(car, carIndex) in carChunks">
                  <div class="card h-100">
                    <template v-if="car.discountPercent">
                      <div class="discount-img">
                        <span class="z-index1">{{ car.discountPercent }}<br>Off</span>
                        <div class="popular-car-img card-img-top" :style="'--img-url:url(' + car.image + ')'"></div>
                      </div>
                    </template>
                    <template v-else>
                      <div class="popular-car-img card-img-top" :style="'--img-url:url(' + car.image + ')'"></div>
                    </template>
                    <div class="card-body px-2 d-flex flex-column justify-content-between">
                      <p class="text-car-model">{{ car.name }}</p>
                      <div class="d-flex justify-content-around font-size-4 text-secondary px-2">
                        <span>{{ car.type }}</span>
                        <span>|</span>
                        <span>{{ formatNumber(car.miles, '') }} miles</span>
                        <span>|</span>
                        <span>{{ formatNumber(car.price, '$') }}</span>
                      </div>
                      <div class="popular-car-financing d-flex align-items-center justify-content-around mx-1">
                        <p class="mb-0">Estimated payment {{ formatNumber(getMonthlyPayment(car.price), '$') }}/m</p>
                        <a :href="getDetailsCalculatorLink(car)"><img class="p-0" src="../imag/financing-calculate.svg" alt="Financing Calculator"></a>
                      </div>
                      <div class="d-flex justify-content-around align-items-center">
                        <div class="form-check form-check-inline input-container m-0">
                          <label class="form-check-label" :for="'popular-compare-' + ((index*4)+carIndex)">
                            <input class="form-check-input" type="checkbox" :id="'popular-compare-' + ((index*4)+carIndex)" :value="car.id" @change.prevent="editCompareCars($event.target)" :checked="checkCompareCars(car.id)">
                            <span class="checkmark"></span>
                            <span class="font-size-1 line-height-1 text-secondary font-weight-normal">Compare</span>
                          </label>
                        </div>
                        <a class="style-button-form-learn no-underline-hover dark-blue-button" :href="car.url" v-if="car.url">More</a>
                        <a class="style-button-form-learn no-underline-hover dark-blue-button" href="#!" v-else>More</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a class="carousel-control-prev" href="#popular-car-carousel-web" role="button" data-slide="prev">
            <div class="carousel-control-bg">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </div>
          </a>
          <a class="carousel-control-next" href="#popular-car-carousel-web" role="button" data-slide="next">
            <div class="carousel-control-bg">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </div>
          </a>
        </div>
      </div>
      <button class="style-button-form-learn dark-blue-button mt-5" href="/search" role="button" v-if="viewAllCars">View all of our cars</button>
    </section>
  </div>
  `,
  data() {
    return {
      popularCars: [],
      popularCarsChunked: [],
    }
  },
  props: {
    carProps: Object,
    viewPopularCars: Boolean,
    viewRelatedCars: Boolean,
    viewAllCars: Boolean,
  },
  created() {
    if(this.viewPopularCars) this.fetchPopularCars()
    if(this.viewRelatedCars) this.fetchRelatedCars()
  },
  methods: {
    fetchRelatedCars: async function () {
      console.log('fetching related')
      var cars
      try {
        const res = await axios.get(serverUrls.searchRelatedCars + '?type=car', headerConfig(window.api321.dealerCode));
        // const res = await axios.get(serverUrls.searchRelatedCars + '?bodies=' + this.carProps.bodyType);
        // const res = await axios.get(serverUrls.searchRelatedCars + '?makes=Toyota');
        cars = res.data.slice(0,8);
        cars = this.elasticSearchDataNormalization(cars);
      } catch(err) {
        console.log(err);
        cars = mockData;
      }
      const chunkedArray = [];
      const size = 4;
      let index = 0;
      while (index < cars.length) {
        chunkedArray.push(cars.slice(index, index + size));
        index += size;
      }
      this.popularCars = cars;
      this.popularCarsChunked = chunkedArray;
    },
    fetchPopularCars: async function () {
      console.log('fetching popular')
      var cars 
      try {
        const res = await axios.get(serverUrls.getPopularCars);
        cars = res.data.slice(0,8);
        cars = this.firestoreDataNormalization(cars);
      } catch(err) {
        console.log(err);
        cars = mockData;
      }
      const chunkedArray = [];
      const size = 4;
      let index = 0;
      while (index < cars.length) {
        chunkedArray.push(cars.slice(index, index + size));
        index += size;
      }
      this.popularCars = cars;
      this.popularCarsChunked = chunkedArray;
    },
    firestoreDataNormalization(cars) {
      var newCars = [];
      var temporaryCar = {};
      cars.forEach(car => {
        temporaryCar.id = car.id;
        temporaryCar.image = car.images ? car.images[0] : 'https://via.placeholder.com/350x250';
        temporaryCar.price = car.price;
        temporaryCar.type = car.bodytype.name;
        temporaryCar.name = car.year + ' ' + car.make + ' ' + car.model;
        temporaryCar.miles = car.miles ? car.miles : 0;
        temporaryCar.url = car.url ? car.url : '#!';
        temporaryCar.vin = car.vin ? car.vin : 'VIN';
        newCars.push(temporaryCar);
        temporaryCar = {};
      });
      return newCars;
    },
    elasticSearchDataNormalization(cars) {
      var newCars = [];
      var temporaryCar = {};
      console.log('cars: ', cars);
      
      cars.forEach(car => {
        temporaryCar.id = car._source.id ? car._source.id : '';
        temporaryCar.image = car._source.images ? car._source.images[0] : 'https://via.placeholder.com/350x250';
        temporaryCar.price = car._source.price;
        temporaryCar.type = car._source.bodytype ? car._source.bodytype.name : 'TYPE';
        temporaryCar.name = car._source.year + ' ' + car._source.make + ' ' + car._source.model;
        temporaryCar.miles = car._source.miles ? car._source.miles : 0;
        temporaryCar.vin = car._source.vin ? car._source.vin : 'VIN';
        newCars.push(temporaryCar);
        temporaryCar = {};
      });
      return newCars;
    },
    editCompareCars(car) {
      var carEditResult = editCompareCars(car.value)
      car.checked = checkCompareCars(car.value)
      if(carEditResult === 'full')
        $('#maximumCarsModal').modal('show')
    },
    checkCompareCars(car) {
      return checkCompareCars(car);
    },
    getDetailsCalculatorLink(car) {
      let link = '/details-calculator'
      link += '?image=' + encodeURIComponent(car.image)
      link += '&name=' + encodeURIComponent(car.name)
      link += '&price=' + encodeURIComponent(car.price)
      if(car.discountPercent) link += '&discountPercent=' + encodeURIComponent(car.discountPercent)
      link += '&vin=' + encodeURIComponent(car.vin)
      return link;
    },
    getMonthlyPayment(carPrice) {
      const dp = 2000
      const P = parseFloat(carPrice) - dp
      const ir = (parseFloat(4.9) / 100) / 12
      const n = parseFloat(60)
      const x1 = ir*((1+ir)**n)
      const x2 = ((1+ir)**n) - 1
      const total = P*(x1/x2)
      return total;
    },
    formatNumber(number, symbol) {
      if(number || number >= 0) {
        if(symbol) {
          return symbol + parseInt(number).toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
        } else {
          return parseInt(number).toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
        }
      } else {
        return '';
      }
    },
  }
}