import PopularCarsComponent from '../popular-cars/PopularCarsComponent'
import { editCompareCars, checkCompareCars } from '../fixed-widgets/CompareCarsTab';

// const carDetails = {
//   images: [
//     'https://via.placeholder.com/750x500',
//     'https://via.placeholder.com/150',
//     'https://via.placeholder.com/250',
//     'https://via.placeholder.com/350',
//     'https://via.placeholder.com/350x750',
//     'https://via.placeholder.com/450x750',
//     'https://via.placeholder.com/550x750',
//     'https://via.placeholder.com/850x500',
//     'https://via.placeholder.com/950x500',
//   ],
//   price: 30000,
//   discountPercent: 15,
//   condition: 'Brand new',
//   name: '2019 Ford Fusion LT Sedan',
//   miles: 30000,
//   phone: '839-123-1151',
//   monthlyEstimate: '$670',
//   monthlyLease: '$770',
//   views: 234,
//   interested: 8,
//   fuelType: 'Gasoline',
//   transmission: '6-Speed Automatic',
//   driveTrain: 'FWD',
//   engine: '4 Cylinder',
//   interiorColor: 'Black',
//   exteriorColor: 'White',
//   stock: 'Q7980A',
//   vin: 'G1ZB5EB8AF118152',
//   rating: 9,
//   vehicleHistory: [],
//   goodDeal: 'CarStory',
//   features: [
//     'Supercharged', 'Four wheel drive', 'Power Steering',
//     'Supercharged', 'Four wheel drive', 'Power Steering',
//     'Supercharged', 'Four wheel drive', 'Power Steering',
//     'Supercharged', 'Four wheel drive', 'Power Steering',
//     'Supercharged', 'Four wheel drive', 'Power Steering',
//     'Supercharged', 'Four wheel drive', 'Power Steering',
//     'Supercharged', 'Four wheel drive', 'Power Steering',
//     'Supercharged', 'Four wheel drive', 'Power Steering'
//   ]
// };

window.onload = function () {
  new Vue({
    el: '#car-details',
    data() {
      return {
        car: {},
        selectedImage: '',
        interested: false,
        intervalCounter: {},
        compareVehicle: false,
        testDriveDates: [],
        selectedTestDriveDate: {}
      }
    },
    created() {
      this.fetchCar();
      this.getTestDriveDates();
    },
    methods: {
      fetchCar() {
        carDetails.name = carDetails.year + ' ' + carDetails.make + ' ' + carDetails.model;
        this.car = carDetails;
        this.selectedImage = carDetails.images ? carDetails.images[0] : "https://via.placeholder.com/750x500";
      },
      getTestDriveDates() {
        let dates = []
        let singleDate = {}
        for (let index = 0; index < 7; index++) {
          if(index === 0) {
            singleDate.weekDay = moment().format('ddd')
            singleDate.monthDay = moment().format('DD')
            singleDate.month = moment().format('MMM')
          } else {
            singleDate.weekDay = moment().add(index, 'day').format('ddd')
            singleDate.monthDay = moment().add(index, 'day').format('DD')
            singleDate.month = moment().add(index, 'day').format('MMM')
          }
          dates.push(singleDate)
          singleDate = {}
        }
        this.selectedTestDriveDate = dates[0]
        this.testDriveDates = dates
      },
      setTestDriveDate(date) {
        this.selectedTestDriveDate = date
      },
      selectImage(image) {
        this.selectedImage = image;
      },
      scrollUpStart(elementName) {
        var element = document.getElementById(elementName);
        this.counter = setInterval(function() {
          element.scrollTop += -4;
        }, 10);
      },
      scrollDownStart(elementName) {
        var element = document.getElementById(elementName);
        this.counter = setInterval(function() {
          element.scrollTop += 4;
        }, 10);
      },
      scrollLeftStart(elementName) {
        var element = document.getElementById(elementName);
        this.counter = setInterval(function() {
          element.scrollLeft += -4;
        }, 10);
      },
      scrollRightStart(elementName) {
        var element = document.getElementById(elementName);
        this.counter = setInterval(function() {
          element.scrollLeft += 4;
        }, 10);
      },
      scrollImagesEnd() {
        clearInterval(this.counter);
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
      getTestDriveDateClasses(date) {
        if(this.selectedTestDriveDate.monthDay === date.monthDay) {
          return ["test-drive-selected-date"];
        }
        return ["test-drive-unselected-date"];
      },
      getDetailsCalculatorLink() {
        let link = '/details-calculator'
        link += '?image=' + encodeURIComponent(this.selectedImage) // First image
        link += '&name=' + encodeURIComponent(this.car.name)
        link += '&price=' + encodeURIComponent(this.car.price)
        if(this.car.discountPercent) link += '&discountPercent=' + encodeURIComponent(this.car.discountPercent)
        link += '&vin=' + encodeURIComponent(this.car.vin)
        return link;
      },
      getUnixTimestampDate(offerTimestamp) {
        return moment.unix(offerTimestamp).format("MM/DD/YYYY")
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
        if(number < 0) return symbol + '0';
        return symbol + parseInt(number).toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
      },
    },
    components: {
      popularCars: PopularCarsComponent,
    },
    template: `
    <div class="car-details">
      <div class="background-gray">
        <div class="container py-4">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a class="text-dark-blue font-weight-3 no-underline-hover" href="/search">Back to search</a></li>
            </ol>
          </nav>
          <div class="row">
            <div class="col-md-8">
              <div class="card details-card">
                <div class="row image-slides-desktop">
                  <div class="col-md-10 pr-md-0 h-100">
                    <div class="d-flex justify-content-center align-items-center h-100" :class="{ 'discountDetailImg': car.discountPercent }">
                      <span class="z-index1" v-if="car.discountPercent">{{ car.discountPercent }}%<br>Off</span>
                      <img :src="selectedImage" class="img-fluid selected-image p-2" alt="Car image">
                    </div>
                  </div>
                  <div class="col-md-2 pl-md-0 images-scroll">
                    <div class="scroll-up" @mousedown="scrollUpStart('images-container')" @mouseup="scrollImagesEnd"></div>
                    <div id="images-container">
                      <img v-for="(image, index) in car.images" :src="image" @click="selectImage(image)" class="img-fluid w-100 single-image" alt="Car image">
                    </div>
                    <div class="scroll-down" @mousedown="scrollDownStart('images-container')" @mouseup="scrollImagesEnd"></div>
                  </div>
                </div>
                <div class="image-slides-mobile">
                  <div id="carImagesMobile" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators details-indicators">
                      <li data-target="#carImagesMobile" :data-slide-to="index" :class="{active: index === 0}" v-for="(image, index) in car.images"></li>
                    </ol>
                    <div class="carousel-inner">
                      <div class="carousel-item" v-for="(image, index) in car.images" :class="{ active: index === 0 }">
                        <div class="d-flex justify-content-center">
                          <div class="d-block">
                            <img class="img-fluid" :src="image" alt="Car detail image">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="px-3">
                  <div class="d-flex justify-content-between align-items-center pt-3">
                    <div class="d-flex">
                      <h3 class="text-secondary-gray font-weight-3 mb-0 pr-3">{{ car.name }}</h3>
                      <a class="d-flex align-items-center" href="#!"><img class="p-0" src="../imag/share.svg" alt="Share vehicle"></a>
                    </div>
                    <div class="form-check form-check-inline input-container m-0">
                      <label class="form-check-label" :for="'details-compare'">
                        <input class="form-check-input" type="checkbox" :id="'details-compare'" :value="car.name" @change.prevent="editCompareCars($event.target)" :checked="checkCompareCars(car.name)">
                        <span class="checkmark"></span>
                        <span class="font-size-1 line-height-1 text-secondary font-weight-normal">Compare</span>
                      </label>
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="row">
                        <div class="col-5">
                          <span class="text-secondary">Condition: </span>
                        </div>
                        <div class="col-7">
                          <span class="font-weight-3 text-secondary">{{ car.condition }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="row">
                        <div class="col-5">
                          <span class="text-secondary">Mileage: </span>
                        </div>
                        <div class="col-7">
                          <span class="font-weight-3 text-secondary">{{ formatNumber(car.miles, '') }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="row pb-3">
                        <div class="col-5">
                          <span class="text-secondary">Fuel Type: </span>
                        </div>
                        <div class="col-7">
                          <span class="font-weight-3 text-secondary">{{ car.fuelType }}</span>
                        </div>
                      </div>
                      <div class="row pb-3">
                        <div class="col-5">
                          <span class="text-secondary">Transmission: </span>
                        </div>
                        <div class="col-7">
                          <span class="font-weight-3 text-secondary">{{ car.transmission }}</span>
                        </div>
                      </div>
                      <div class="row pb-3">
                        <div class="col-5">
                          <span class="text-secondary">Drivetrain: </span>
                        </div>
                        <div class="col-7">
                          <span class="font-weight-3 text-secondary">{{ car.driveTrain }}</span>
                        </div>
                      </div>
                      <div class="row pb-3">
                        <div class="col-5">
                          <span class="text-secondary">Engine: </span>
                        </div>
                        <div class="col-7">
                          <span class="font-weight-3 text-secondary">{{ car.engine }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="row mb-3">
                        <div class="col-5">
                          <span class="text-secondary">Interior Color: </span>
                        </div>
                        <div class="col-7">
                          <span class="font-weight-3 text-secondary">{{ car.interiorColor }}</span>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-5">
                          <span class="text-secondary">Exterior Color: </span>
                        </div>
                        <div class="col-7">
                          <span class="font-weight-3 text-secondary">{{ car.exteriorColor }}</span>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-5">
                          <span class="text-secondary">Stock: </span>
                        </div>
                        <div class="col-7">
                          <span class="font-weight-3 text-secondary">{{ car.stock }}</span>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-5">
                          <span class="text-secondary">VIN: </span>
                        </div>
                        <div class="col-7">
                          <span class="font-weight-3 text-secondary">{{ car.vin }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr>
                  <div class="row pb-4">
                    <div class="col-md-6">
                      <span class="text-secondary">Vehicle history report </span>
                      <span class="font-weight-3 text-secondary">{{ car.historyReport }}</span>
                      <a class="text-secondary-blue font-weight-3 no-underline-hover ml-1" href="#!">Get it free</a>
                    </div>
                    <div class="col-md-6">
                      <img src="../imag/carfax_1.png" alt="car fax" class="img-fluid">
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-4 mb-5 details-tabs">
                <nav>
                  <div class="nav nav-tabs" role="tablist">
                    <a class="nav-item nav-link active" id="features-tab" data-toggle="tab" href="#features" role="tab" aria-controls="features" aria-selected="true">Features</a>
                    <a class="nav-item nav-link" id="safety-tab" data-toggle="tab" href="#safety" role="tab" aria-controls="safety" aria-selected="false">Safety</a>
                    <a class="nav-item nav-link" id="options-tab" data-toggle="tab" href="#options" role="tab" aria-controls="options" aria-selected="false">Options</a>
                    <a class="nav-item nav-link" id="specs-tab" data-toggle="tab" href="#specs" role="tab" aria-controls="specs" aria-selected="false">Specs</a>
                  </div>
                </nav>
                <div class="tab-content bg-white px-3 py-4 ">
                  <div class="tab-pane fade show active" id="features" role="tabpanel" aria-labelledby="features-tab">
                    <div class="row relative">
                      <div class="col-6 py-1" v-for="feature in car.features">
                        <span class="text-secondary">{{ feature }}</span>
                      </div>
                      <a href="#!" class="see-more-text text-dark-blue font-weight-3 no-underline-hover">See more</a>
                    </div>

                  </div>
                  <div class="tab-pane fade" id="safety" role="tabpanel" aria-labelledby="safety-tab">I'm safety</div>
                  <div class="tab-pane fade" id="options" role="tabpanel" aria-labelledby="options-tab">I'm options</div>
                  <div class="tab-pane fade" id="specs" role="tabpanel" aria-labelledby="specs-tab">I'm specs</div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card text-secondary mb-5 pb-4">
                <div class="px-3">
                  <div class="d-flex px-3 pt-3">
                    <img class="pt-0 pr-3" src="../imag/tag-new.svg" alt="new car">
                    <span class="">Just arrived</span>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-6">
                      <p>Price: </p>
                    </div>
                    <div class="col-6">
                      <p class="font-weight-3">{{ formatNumber(car.price, '$') }}</p>
                    </div>
                    <!-- <template v-if="car.discountPercent">
                      <del class="font-weight-3">{{ formatNumber(car.price, '$') }}</del>
                      <h3 class="font-weight-3">{{ formatNumber(car.price*(1-(car.discountPercent/100)), '$') }}</h3>
                    </template>
                    <h3 v-else class="font-weight-3">{{ formatNumber(car.price, '$') }}</h3> -->
                  </div>
                  <div class="row mb-3">
                    <div class="col-6 d-flex align-items-center">
                      <p class="mb-0">Est. payment: </p>
                    </div>
                    <div class="col-6">
                      <div class="d-flex align-items-center">
                        <p class="mb-0"><span class="font-weight-3">{{ formatNumber(getMonthlyPayment(car.price), '$') }}</span> / mo</p>
                        <a class="border rounded mb-0 ml-2 p-1" :href="getDetailsCalculatorLink()">
                          <img class="pt-0" src="../imag/financing-calculate.svg" alt="calculate payments">
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="car-offer-container p-3">
                  <div class="car-offer-inner py-2">
                    <p class="car-offer-title">Manager's special offer:</p>
                    <p class="car-offer-title">{{ car.offer.title }} with car purchase</p>
                    <div class="car-offer-date pt-2">
                      <img src="../imag/unlocked.svg" alt="maximum offer date">
                      <p>Valid until {{ getUnixTimestampDate(car.offer.date._seconds) }}</p>
                    </div>
                  </div>
                </div>
                <div class="px-3 py-2">
                  <a href="/pre-approved" class="d-flex align-items-center justify-content-center no-underline-hover text-secondary-blue font-weight-3 py-2">
                    <img class="pt-0" src="../imag/timer.svg" alt="save time pre-approved">
                    <span>Save time, get pre-approved</span>
                  </a>
                  <a href="/prepare" class="d-flex align-items-center justify-content-center no-underline-hover text-secondary-blue font-weight-3 py-2">
                    <img class="pt-0" src="../imag/cash.svg" alt="cash value trade-in">
                    <span>Value my trade-in</span>
                  </a>
                  <hr>
                  <p class="text-center font-size-6">Choose a date for your test drive:</p>
                  <div class="test-drive-container">
                    <button class="test-drive-prev-arrow" @mousedown="scrollLeftStart('test-drive-dates')" @mouseup="scrollImagesEnd"></button>
                    <div id="test-drive-dates">
                      <button class="d-flex flex-column justify-content-between align-items-center rounded px-3 py-2 mr-3" v-for="date in testDriveDates" :class="getTestDriveDateClasses(date)" @click="setTestDriveDate(date)">
                        <span class="test-drive-weekDay">{{ date.weekDay }}</span>
                        <span class="test-drive-monthDay">{{ date.monthDay }}</span>
                        <span class="test-drive-month">{{ date.month }}</span>
                      </button>
                    </div>
                    <button class="test-drive-next-arrow" @mousedown="scrollRightStart('test-drive-dates')" @mouseup="scrollImagesEnd"></button>
                  </div>
                  <div class="style-button-form-learn dark-blue-button font-size-2 font-weight-3 w-max mx-auto pl-4 my-4">
                    Schedule a test drive
                  </div>
                  <p class="text-secondary text-center mb-0">FREE with no obligation to buy.<br>Cancel anytime.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <popular-cars viewRelatedCars :carProps="car"></popular-cars>
    </div>
    `
  });
  $('.carousel').each(function () {
    var $carousel = $(this);
    var hammertime = new Hammer(this, {
        recognizers: [
            [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }]
        ]
    });
    hammertime.on('swipeleft', function () {
        $carousel.carousel('next');
    });
    hammertime.on('swiperight', function () {
        $carousel.carousel('prev');
    });
  });
}