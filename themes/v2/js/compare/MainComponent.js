import axios from 'axios'
import { serverUrls } from '../config'
import { editCompareCars } from '../fixed-widgets/CompareCarsTab'

const backupCars = [
  {
    id: 'trial-car',
    images: [
      'https://via.placeholder.com/750x500',
      'https://via.placeholder.com/650x400',
      'https://via.placeholder.com/550x300',
    ],
    name: 'New 2019 Ford Fiesta ST Automatic',
    price: 40903,
    condition: 'Brand new',
    mileage: 2,
    monthlyEstimate: '$670',
    fuelType: 'Gasoline',
    transmission: '6-Speed Automatic',
    driveTrain: 'FWD',
    engine: '4 Cylinder',
    interiorColor: 'Black',
    exteriorColor: 'White',
    esc: true,
    childLocks: true,
    selectTerrainABS: true,
    parkViewCamera: false,
    airbagOccupancySensor: true,
    passengerKneeAirbag: true,
    sideImpactAirbag: true,
    sideImpactBeams: true,
    features: [
      'Supercharged', 'Four wheel drive', 'Power Steering',
      'Supercharged', 'Four wheel drive', 'Power Steering'
    ]
  },
  {
    id: 'trial-car',
    images: [
      'https://via.placeholder.com/750x500',
      'https://via.placeholder.com/650x400',
      'https://via.placeholder.com/550x300',
    ],
    name: 'New Late 2018 Ford Edge DT',
    price: 39850,
    condition: 'Brand new',
    mileage: 28,
    monthlyEstimate: '$670',
    fuelType: 'Gasoline',
    transmission: '6-Speed Automatic',
    driveTrain: 'FWD',
    engine: '4 Cylinder',
    interiorColor: 'Black',
    exteriorColor: 'White',
    esc: true,
    childLocks: true,
    selectTerrainABS: true,
    parkViewCamera: true,
    airbagOccupancySensor: true,
    passengerKneeAirbag: true,
    sideImpactAirbag: false,
    sideImpactBeams: true,
    features: [
      'Supercharged', 'Four wheel drive', 'Power Steering',
      'Supercharged', 'Four wheel drive',
    ]
  },
  {
    id: 'trial-car',
    images: [
      'https://via.placeholder.com/750x500',
      'https://via.placeholder.com/650x400',
      'https://via.placeholder.com/550x300',
    ],
    name: 'New 2019 Ford Focus SEL',
    price: 36903,
    condition: 'Certified pre-owned',
    mileage: 8560,
    monthlyEstimate: '$670',
    fuelType: 'Gasoline',
    transmission: '6-Speed Automatic',
    driveTrain: 'FWD',
    engine: '4 Cylinder',
    interiorColor: 'Black',
    exteriorColor: 'White',
    esc: true,
    childLocks: true,
    selectTerrainABS: false,
    parkViewCamera: true,
    airbagOccupancySensor: true,
    passengerKneeAirbag: true,
    sideImpactAirbag: true,
    sideImpactBeams: true,
    features: [
      'Supercharged', 'Four wheel drive', 'Power Steering',
      'Supercharged'
    ]
  },
  {
    id: 'trial-car',
    images: [
      "https://via.placeholder.com/750x500",
      "https://via.placeholder.com/650x400",
      "https://via.placeholder.com/550x300"
    ],
    name: "New 2019 Ford EcoSport SES",
    price: 33450,
    condition: "Pre-owned",
    mileage: 6400,
    monthlyEstimate: "$670",
    fuelType: "Gasoline",
    transmission: "6-Speed Automatic",
    driveTrain: "FWD",
    engine: "4 Cylinder",
    interiorColor: "Black",
    exteriorColor: "White",
    esc: true,
    childLocks: true,
    selectTerrainABS: false,
    parkViewCamera: true,
    airbagOccupancySensor: true,
    passengerKneeAirbag: true,
    sideImpactAirbag: true,
    sideImpactBeams: true,
    features: [
      "Supercharged",
      "Four wheel drive",
      "Power Steering",
      "Supercharged"
    ]
  }
];

const monthlyPaymentsData = {
  months: [ 60, 48, 36, 24, 12 ],
  interestRates: [
    { name: 'Very poor', creditScore: '< 600', percentage: 7.9 },
    { name: 'Poor', creditScore: '600 - 679', percentage: 6.4 },
    { name: 'Fair', creditScore: '680 - 719', percentage: 4.9 },
    { name: 'Good', creditScore: '720 - 780', percentage: 3.4 },
    { name: 'Excellent', creditScore: '> 780', percentage: 1.9 },
  ],
};

window.onload = function () {
  Vue.use(VueDraggable.default);

  new Vue({
    el: '#compare-vehicles',
    data() {
      return {
        cars: [],
        disabledButton: false,
        selectors: {
          finance: true,
          features: true,
          topFeatures: true,
          safety: true
        },
        monthlyPayments: {
          months: 60,
          interestPercent: 4.9,
          downPayment: 2000
        },
        monthlyPaymentsData: monthlyPaymentsData,
        carAdded: false,
        dragAndDropOtions: {
          dropzoneSelector: '.car-compare-container',
          draggableSelector: '.car-compare-card',
          onDrop: function(event) {
            var card = $(event.items[0]);
            card.addClass('col-sm-3');
            card.children().addClass('p-2').removeClass('border-0');
            card.find('*').not('.card').each(function()
            {
              $(this).css('display', '');
            });
          },
          onDragstart: function(event) {
            var card = $(event.items[0]);
            setTimeout(() => {
              card.removeClass('col-sm-3');
              card.children().removeClass('p-2').addClass('border-0');
              card.find('*').not('.card').each(function()
              {
                $(this).css('display', 'none');
              });
            }, 1);
            // Wait for VueDraggable to get the hover image
          },
          showDropzoneAreas: true,
        }
      }
    },
    created() {
      this.fetchCars();
    },
    beforeMount() {
      
    },
    methods: {
      async fetchCars() {
        if(localStorage.getItem('compareCars')) {
          
          const compareCarsId = JSON.parse(localStorage.getItem('compareCars'))
          await compareCarsId.forEach(async (compareCar, index) => {
            
            const self = this
    
            await axios.get(serverUrls.getCarById + compareCar)
              .then(res => {
                if(res) {
                  self.cars.push(this.serverDataNormalization(res.data))
                }
              })
              .catch(err => {
                self.cars.push(backupCars[index])
                console.log(err)
              })
            
          });
        }

        // After fetching the cars
        setTimeout(() => {
          this.equalizeSectionsHeight(['.header-section', '.finance-section']);
          this.equalizeEachSafetyHeight();
        }, 1000);
      },
      serverDataNormalization(carData) {
        let newData = {}
        newData.id = carData.id
        newData.images = carData.images ? carData.images : ['https://via.placeholder.com/350x250']
        newData.name = ""
        newData.name += carData.year ? carData.year + " " : "-"
        newData.name += carData.make ? carData.make + " " : "-"
        newData.name += carData.model ? carData.model : "-"
        newData.price = carData.price ? carData.price : "-"
        newData.condition = carData.condition ? carData.condition : "-"
        newData.mileage = carData.miles ? carData.miles : "0"
        newData.fuelType = carData.fuelType ? carData.fuelType : "-"
        newData.transmission = carData.description ? carData.description : "-"
        newData.driveTrain = carData.description ? carData.description : "-"
        newData.engine = carData.description ? carData.description : "-"
        newData.interiorColor = carData.interiorColor ? carData.interiorColor : "-"
        newData.exteriorColor = carData.exteriorColor ? carData.exteriorColor : "-"
        return newData;
      },
      handleSelectors(selector) {
        this.selectors[selector] = !this.selectors[selector];
        if(selector === 'features') {
          setTimeout(() => {
            this.equalizeSectionsHeight(['.header-section', '.finance-section']);
          }, 1);
          // Timeout to wait for Vue to render data
        }
        if(selector === 'safety') {
          setTimeout(() => {
            this.equalizeEachSafetyHeight();
          }, 1);
          // Timeout to wait for Vue to render data
        }
      },
      addCar() {
        console.log(this.cars.length)
        if(this.cars.length < 4) {
          this.cars.push(additionalCar);
          this.carAdded = true
          setTimeout(() => {
            this.equalizeSectionsHeight(['.header-section', '.finance-section']);
            this.equalizeEachSafetyHeight();
          }, 1);
          // Timeout to wait for Vue to render data
        }else {
          $('#maximumCarsCompare').modal('show')
        }
      },
      getMonthlyPayment(car) {
        const dp = this.monthlyPayments.downPayment
        const P = parseFloat(car.price) - dp
        const ir = (parseFloat(this.monthlyPayments.interestPercent) / 100) / 12
        const n = parseFloat(this.monthlyPayments.months)
        const x1 = ir*((1+ir)**n)
        const x2 = ((1+ir)**n) - 1
        const total = P*(x1/x2)
        return total;
      },
      formatNumber(number, symbol) {
        if(number) {
          if(symbol) {
            return symbol + parseInt(number).toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
          } else {
            return parseInt(number).toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
          }
        } else {
          return '';
        }
      },
      checkSafetyMark(mark) {
        return {
          'accepted-checkmark': mark, 'cancelled-checkmark': !mark
        }
      },
      interestRateClasses(ratePercentage) {
        if(ratePercentage === this.monthlyPayments.interestPercent) return 'selected-interest-rate';
        return;
      },
      equalizeSectionsHeight(selectedSections) {
        var features = null;
        var maxHeight = 0;
        selectedSections.forEach((sectionName) => {
          var sectionElements = $(sectionName)
          sectionElements.each(function () {
            if($(this).height() > maxHeight) {
              maxHeight = $(this).height();
            }
          });
          sectionElements.css('height', maxHeight + 'px');
          if(sectionName !== '.header-section')
            sectionElements.first().css('height', (maxHeight+40) + 'px');
        })
      },
      equalizeEachSafetyHeight() {
        var safety = $('.safety-section');
        var boxHeights = []; // Get height of all titles
        safety.first().children('.selector-gray-underline').each(function () {
          boxHeights.push($(this).height());
        });
        safety.each(function (containerIndex) {
          if (containerIndex !== 0) {
            $(this).children().each(function (paragraphIndex) {
              // Set title height to each element
              $(this).height(boxHeights[paragraphIndex]);
            });
          }
        });
      },
      handlerDeleteCar(carIndex, carId) {
        this.cars.splice(carIndex, 1)
        // Code to work even without firestore data
        if(carId === 'trial-car') {
          let localCompareCars = JSON.parse(localStorage.getItem('compareCars'))
          localCompareCars.splice(0, 1)
          localStorage.setItem('compareCars', JSON.stringify(localCompareCars))
          $(".compare-cars-tab-number").first().text(localCompareCars.length);
        } else {
          editCompareCars(carId) // Only line required
        }
      },
      handlerDisableAddButton() {
       if(this.cars.length < 4) {
        return 'add-vehicle-button'
       }else {
        return 'add-vehicle-button-disabled'
       }
      }
    },
    template: `
    <div class="container pb-4 py-sm-and-down-0">
      <nav aria-label="breadcrumb" class="position-relative">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a class="text-dark-blue font-weight-bold no-underline-hover" href="/">Home</a></li>
          <li class="breadcrumb-item"><a class="text-dark-blue font-weight-bold no-underline-hover" href="/search">Find your next Car</a></li>
          <li class="breadcrumb-item active" aria-current="page">Compare Vehicle</li>
        </ol>
        <button v-bind:class="handlerDisableAddButton()" @click="addCar()">Add vehicle</button>
      </nav>
      <div class="compare-section mt-5 mt-md-0">
        <!-- Blue Selector -->
        <div class="compare-selectors px-1vw px-md-4 rounded">
          <div id="selector-content" class="font-weight-1">
            <div class="selectors header-section">
              <div class="d-block pt-4 mt-2">
                <div class="form-check input-container">
                  <label class="form-check-label" for="finance-checkbox" @click.prevent="handleSelectors('finance')">
                    <input class="form-check-input" type="checkbox" value="" id="finance-checkbox" :checked="selectors.finance">
                    <span class="checkmark"></span>
                    At a glance
                  </label>
                </div>
                <div class="form-check input-container">
                  <label class="form-check-label" for="top-features-checkbox" @click.prevent="handleSelectors('topFeatures')">
                    <input class="form-check-input" type="checkbox" value="" id="top-features-checkbox" :checked="selectors.topFeatures">
                    <span class="checkmark"></span>
                    Top Features
                  </label>
                </div>
                <div class="form-check input-container">
                  <label class="form-check-label" for="safety-checkbox" @click.prevent="handleSelectors('safety')">
                    <input class="form-check-input" type="checkbox" value="" id="safety-checkbox" :checked="selectors.safety">
                    <span class="checkmark"></span>
                    Safety
                  </label>
                </div>
              </div>
            </div>
            <!-- At a Glance -->
            <div class="finance-section py-2" v-if="selectors.finance">
              <p class="font-weight-3" >At a glance</p>
              <p class="selector-gray-underline">Price</p>
              <p class="selector-gray-underline">Condition</p>
              <p class="selector-gray-underline">Mileage</p>
              <p class="selector-gray-underline">Monthly payment</p>
              <a class="font-size-1 no-underline-hover font-weight-3 text-secondary-blue" href="#!" data-toggle="modal" data-target="#monthlyPaymentModal">{{ monthlyPayments.months }} months, {{ monthlyPayments.interestPercent }}% interest, {{ formatNumber(monthlyPayments.downPayment, '$') }} down</a>
              <!-- Monthly Payment Modal -->
              <div class="modal fade" id="monthlyPaymentModal" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <div class="d-block">
                        <button type="button" class="close float-right" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 class="modal-title text-center py-3 text-dark font-weight-3 font-italic">Adjust Payment Terms</h5>
                        <p class="px-4 text-secondary">Please adjust the options below so we can estimate the most accurate monthly payments.</p>
                      </div>
                    </div>
                    <div class="modal-body">
                      <label class="font-weight-bold text-secondary">Estimated credit score or interest rate.</label>
                      <div class="d-flex justify-content-between mb-3">
                        <div
                          class="card text-center m-0 p-2 cursor-pointer"
                          :class="interestRateClasses(rate.percentage)"
                          v-for="rate in monthlyPaymentsData.interestRates"
                          @click="monthlyPayments.interestPercent = rate.percentage"
                        >
                          <p class="m-0 text-secondary">{{ rate.percentage }}%</p>
                          <p class="m-0 font-weight-3">{{ rate.name }}</p>
                          <p class="m-0 text-secondary">{{ rate.creditScore }}</p>
                        </div>
                      </div>
                      <div class="form-row mb-3">
                        <div class="col-md-6 form-group">
                          <label class="font-weight-bold text-secondary">Number of months</label>
                          <select type="number" class="form-control" v-model="monthlyPayments.months">
                            <option :value="months" v-for="months in monthlyPaymentsData.months">{{ months }} months</option>
                          </select>
                        </div>
                        <div class="col-md-6 form-group">
                          <label class="font-weight-bold text-secondary">Down payment</label>
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">$</span>
                            </div>
                            <input
                              class="form-control"
                              type="number"
                              min="0"
                              v-model="monthlyPayments.downPayment"
                            >
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <p class="text-secondary font-size-1">All tax, title and vehicle registration fess are additional. See dealer for complete details.</p>
                        </div>
                        <div class="col-md-6">
                          <button type="button" class="style-button-form-learn yellow-button no-after p-3 font-weight-2 font-size-5 montserrat-font" data-dismiss="modal" aria-label="Close">
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Top Features -->
            <div class="top-features-section py-2" v-if="selectors.topFeatures">
              <p class="font-weight-3">Top Features</p>
              <p class="selector-gray-underline">Fuel Type</p>
              <p class="selector-gray-underline">Transmission</p>
              <p class="selector-gray-underline">Drivetrain</p>
              <p class="selector-gray-underline">Engine</p>
              <p class="selector-gray-underline">Interior Color</p>
              <p class="selector-gray-underline">Exterior Color</p>
            </div>
            <!-- Safety -->
            <div class="safety-section py-2" v-if="selectors.safety">
              <p class="font-weight-3">Safety</p>
              <p class="selector-gray-underline">ESC</p>
              <p class="selector-gray-underline">Rear child safety locks</p>
              <p class="selector-gray-underline">Selec-Terrain ABS</p>
              <p class="selector-gray-underline">Park View back-up camera</p>
              <p class="selector-gray-underline">Airbag Occupancy Sensor</p>
              <p class="selector-gray-underline">Passenger Knee Airbag</p>
              <p class="selector-gray-underline">Rear Side-Impact Airbag</p>
              <p class="selector-gray-underline">Side Impact Beams</p>
            </div>
          </div>
        </div>
        <!-- Web -->
        <div class="row compare-grid compare-web" v-drag-and-drop:options="dragAndDropOtions">
          <div class="car-compare-container d-flex">
            <div class="col-sm-3 p-0 car-compare-card" v-for="(car, carIndex) in cars">
              <div class="card m-0 p-2 h-100">
                <div class="header-section">
                  <div class="row">
                    <div class="col-12">
                      <div class="float-right trash" @click="handlerDeleteCar(carIndex, car.id)">
                        <i class="fa fa-trash "></i>
                      </div>
                    </div>
                  </div>
                  <!-- Images Carousel -->
                  <div :id="'car-compare-carousel-' + carIndex" class="carousel slide overflow-hidden" data-interval="false">
                    <ol class="carousel-indicators">
                      <li :data-target="'#car-compare-carousel-' + carIndex" :data-slide-to="imageIndex" v-for="(image, imageIndex) in car.images" :class="{ active: imageIndex === 0 }"></li>
                    </ol>
                    <div class="carousel-inner">
                      <div class="carousel-item" :class="{ active: imageIndex === 0 }" v-for="(image, imageIndex) in car.images">
                        <div class="d-block w-100">
                          <img :src="image" alt="car compare image" class="img-fluid">
                        </div>
                      </div>
                    </div>
                    <a class="carousel-control-prev p-0 show-hover-l" :href="'#car-compare-carousel-' + carIndex" role="button" data-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next p-0 show-hover-r" :href="'#car-compare-carousel-' + carIndex" role="button" data-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                  <h5 class="font-weight-1 font-size-2 text-secondary-blue pt-3">{{ car.name }}</h5>
                  <div class="px-3 pt-3">
                    <div class="style-button-form-learn yellow-button">Schedule test drive</div>
                    <br><br>
                  </div>
                </div>
                <!-- At a Glance -->
                <div class="finance-section title-top-margin py-2" v-if="selectors.finance">
                  <p class="car-gray-underline">{{ formatNumber(car.price, '$') }}</p>
                  <p class="car-gray-underline">{{ car.condition }}</p>
                  <p class="car-gray-underline">{{ formatNumber(car.mileage) }}</p>
                  <p class="car-gray-underline">{{ formatNumber(getMonthlyPayment(car), '$') }}</p>
                  <div class="px-3 pt-3">
                    <div class="style-button-form-learn">Get pre-approved</div>
                  </div>
                </div>
                <!-- Top Features -->
                <div class="top-features-section title-top-margin py-2" v-if="selectors.topFeatures">
                  <p class="car-gray-underline">{{ car.fuelType }}</p>
                  <p class="car-gray-underline">{{ car.transmission }}</p>
                  <p class="car-gray-underline">{{ car.driveTrain }}</p>
                  <p class="car-gray-underline">{{ car.engine }}</p>
                  <p class="car-gray-underline">{{ car.interiorColor }}</p>
                  <p class="car-gray-underline">{{ car.exteriorColor }}</p>
                </div>
                <!-- Safety -->
                <div class="safety-section title-top-margin py-2" v-if="selectors.safety">
                  <p class="car-gray-underline" :class="checkSafetyMark(car.esc)">&zwnj;</p>
                  <p class="car-gray-underline" :class="checkSafetyMark(car.childLocks)">&zwnj;</p>
                  <p class="car-gray-underline" :class="checkSafetyMark(car.selectTerrainABS)">&zwnj;</p>
                  <p class="car-gray-underline" :class="checkSafetyMark(car.parkViewCamera)">&zwnj;</p>
                  <p class="car-gray-underline" :class="checkSafetyMark(car.airbagOccupancySensor)">&zwnj;</p>
                  <p class="car-gray-underline" :class="checkSafetyMark(car.passengerKneeAirbag)">&zwnj;</p>
                  <p class="car-gray-underline" :class="checkSafetyMark(car.sideImpactAirbag)">&zwnj;</p>
                  <p class="car-gray-underline" :class="checkSafetyMark(car.sideImpactBeams)">&zwnj;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Mobile -->
        <div class="compare-mobile">
          <div id="compareMobileCarousel" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#compareMobileCarousel" :data-slide-to="index" :class="{active: index === 0}" v-for="(car, index) in cars"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item" :class="{ active: index === 0 }" v-for="(car, index) in cars">
                <div class="card m-0 p-2 h-100 w-100">
                  <div class="image-section">
                    <img :src="car.image" alt="" class="img-fluid">
                    <h5 class="font-weight-1 font-size-2 text-secondary-blue">{{ car.name }}</h5>
                  </div>
                  <!-- At a Glance -->
                  <div class="finance-section title-top-margin py-2" v-if="selectors.finance">
                      <p class="car-gray-underline">{{ formatNumber(car.price, '$') }}</p>
                      <p class="car-gray-underline">{{ car.condition }}</p>
                      <p class="car-gray-underline">{{ formatNumber(car.mileage) }}</p>
                      <p class="car-gray-underline">{{ car.monthlyEstimate }}</p>
                  </div>
                  <!-- Top Features -->
                  <div class="top-features-section title-top-margin py-2" v-if="selectors.topFeatures">
                    <p class="car-gray-underline">{{ car.fuelType }}</p>
                    <p class="car-gray-underline">{{ car.transmission }}</p>
                    <p class="car-gray-underline">{{ car.driveTrain }}</p>
                    <p class="car-gray-underline">{{ car.engine }}</p>
                    <p class="car-gray-underline">{{ car.interiorColor }}</p>
                    <p class="car-gray-underline">{{ car.exteriorColor }}</p>
                  </div>
                  <!-- Safety -->
                  <div class="safety-section title-top-margin py-2" v-if="selectors.safety">
                    <p class="car-gray-underline" :class="checkSafetyMark(car.esc)">&zwnj;</p>
                    <p class="car-gray-underline" :class="checkSafetyMark(car.childLocks)">&zwnj;</p>
                    <p class="car-gray-underline" :class="checkSafetyMark(car.selectTerrainABS)">&zwnj;</p>
                    <p class="car-gray-underline" :class="checkSafetyMark(car.parkViewCamera)">&zwnj;</p>
                    <p class="car-gray-underline" :class="checkSafetyMark(car.airbagOccupancySensor)">&zwnj;</p>
                    <p class="car-gray-underline" :class="checkSafetyMark(car.passengerKneeAirbag)">&zwnj;</p>
                    <p class="car-gray-underline" :class="checkSafetyMark(car.sideImpactAirbag)">&zwnj;</p>
                    <p class="car-gray-underline" :class="checkSafetyMark(car.sideImpactBeams)">&zwnj;</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <!-- Modal maximum cars compared -->
        <div class="modal fade" id="maximumCarsCompare" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              </div>
              <div class="modal-body text-center">
                  <h5 class="grey-text"><b><i>Maximum cars compared</i></b></h5>
                  <br>
                <div class="container">
                    <p>You can only compared 4 vehicle at a time. Please remove one before you can compare another one.</p>
                </div>
                <br>
                <button type="button" class="btn style-button-form-learn yellow-button" data-dismiss="modal">Ok, got it </button>
                <br><br>
              </div>
            </div>
          </div>
        </div>

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
