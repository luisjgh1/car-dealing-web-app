import Datepicker from 'vuejs-datepicker'
import vueSlider from 'vue-slider-component'
import PopularCarsComponent from '../popular-cars/PopularCarsComponent'
import axios from 'axios'
import { serverUrls } from '../config'

// Search Form
const SearchFormTemplate = `
<div>
  <nav class="nav nav-tabs d-none d-md-flex" id="myTab" role="tablist">
    <a class="nav-item nav-link active yellow-underline">{{ searchBox.tabOneText }}</a>
    <!-- <a @click="changeIconColor('tabTwo')" class="nav-item nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">{{ searchBox.tabTwoText }}
      <img class="d-block img-item-nav" :src="searchBox.tabTwoIcon"/>
    </a> -->
  </nav>
  <div class="tab-content" id="myTabContent">
    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
      <form class="py-1 px-3" @submit.prevent="submitForm">
        <div class="row px-3 pt-4 d-flex justify-content-between">
          <div class="col-md-6 px-0">
            <div class="d-flex justify-content-between">
              <div class="form-check form-check-inline input-container">
                <label class="form-check-label text-secondary" for="inlineRadio1">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" @change="onChangeCondition('new')" id="inlineRadio1" value="new">
                  <span class="checkmark"></span>
                  <span class="input-text">New Cars ({{ newCars }})</span>
                </label>
              </div>
              <div class="form-check form-check-inline input-container">
                <label class="form-check-label text-secondary" for="inlineRadio3">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" @change="onChangeCondition('preowned')" id="inlineRadio3" value="preowned">
                  <span class="checkmark"></span>
                  <span class="input-text">Pre-Owned cars ({{ preownedCars }})</span>
                </label>
              </div>
            </div>
          </div>
          <div class="col-md-6 d-none d-md-block">
            <div class="row">
              <div class="col-md-6">
                <vue-slider v-model="form.price" v-bind="sliderOptions"
                  :bgStyle="desktopSliderStyles.bgStyle"
                  :height="desktopSliderStyles.height"
                  :sliderStyle="desktopSliderStyles.sliderStyle"
                  :tooltipStyle="desktopSliderStyles.tooltipStyle"
                  :processStyle="desktopSliderStyles.processStyle">
                </vue-slider>
              </div>
              <div class="col-md-6">
                <a href="/search" class="no-underline-hover font-weight-3 text-secondary-blue font-size-5 pl-0 pl-md-2">Advanced Search</a>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6 col-md-3 d-flex align-items-center">
            <select class="w-100" id="selectBrand" v-model="form.make" placeholder="Find make" @change="onChangeMake()">
              <option v-for="make in makes" :value="make.id">{{make.name}}</option>
            </select>
          </div>
          <div class="col-6 col-md-3 d-flex align-items-center">
            <select class="w-100" id="selectModel" v-model="form.model" placeholder="Find model" @change="onChangeModel()">
              <option v-for="model in models" :value="model.currentBodytype">{{model.name}}</option>
            </select>
          </div>
          <div class="col-md-3 d-none d-md-flex align-items-center">
            <select class="w-100" id="selectBodyType" v-model="form.bodyType" placeholder="Find body type">
              <option v-for="bodytype in bodytypes" :value="bodytype.id">{{bodytype.name}}</option>
            </select>
          </div>
          <div class="d-none d-md-inline-block col-md-3">
            <button class="style-button-form-learn yellow-button" type="submit">Find your next car</button>
          </div>
        </div>
        <div class="d-md-none row pt-4">
          <div class="col-2 text-center">
            <span>{{ formatNumber(form.price[0], '$') }}k</span>
          </div>
          <div class="col-8 px-0">
            <vue-slider v-model="form.price" v-bind="sliderOptions"
              :bgStyle="mobileSliderStyles.bgStyle"
              :height="mobileSliderStyles.height"
              :sliderStyle="mobileSliderStyles.sliderStyle"
              :tooltipStyle="mobileSliderStyles.tooltipStyle"
              :processStyle="mobileSliderStyles.processStyle">
            </vue-slider>
          </div>
          <div class="col-2 text-center">
            <span>{{ formatNumber(form.price[1], '$') }}k</span>
          </div>
          <div class="col-12 justify-content-center d-flex py-3">
            <button class="style-button-form-learn yellow-button mx-0" type="submit">Find your next car</button>
          </div>
          <div class="col-12 text-center pb-4">
            <a href="/search" class="no-underline-hover font-weight-3 text-secondary-blue font-size-5 pl-0 pl-md-2">Advanced Search</a>
          </div>
        </div>
      </form>
    </div>
    <!-- <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
      <div class="row p-3">
        <div class="col-md-6">
          <p class="font-weight-bold">Schedule an Appointment:</p>
          <form @submit.prevent="handleOpenModal()">
            <div class="form-group d-md-flex">
              <select class="form-control mr-0 mr-md-2" v-model="serviceForm.service" required>
                <option value="" disabled selected>Select type of service needed</option>
                <option v-for="service in services">{{ service }}</option>
              </select>
              <button type="submit" class="style-button-form-learn ml-4 ml-md-2 yellow-button">Next</button>
            </div>
          </form>
        </div>
        <div class="col-md-4">
          <p class="font-weight-bold">Service Center Hours:</p>
          <div class="d-flex justify-content-between font-size-1">
            <span>Mon - Fri</span>
            <span>10:00 AM - 9:00 PM</span>
          </div>
          <div class="d-flex justify-content-between font-size-1">
            <span>Sat</span>
            <span>9:00 AM - 4:00 PM</span>
          </div>
        </div>
        <div class="col-md-2">
          <p class="font-weight-bold">Call us:</p>
          <span class="font-size-1"><i class="fas fa-volume-phone"></i> 839-923-111</span>
        </div>
      </div>
    </div> -->
  </div>
  <!-- Modal -->
  <div class="modal fade" id="serviceModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header justify-content-between">
          <span></span>
          <h5 class="modal-title text-dark font-weight-bold font-italic text-center" id="exampleModalLabel">Schedule a Service</h5>
          <button type="button" class="close ml-0" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body p-0">
          <div class="background-gradient-white-gray">
            <div class="schedule-indicators px-5 pt-3 pb-5">
              <div class="background-line w-md-85"></div>
              <div
                class="indicator"
                :class="item.classes"
                v-for="(item, index) in scheduleModalItems"
                @click="scrollItem(index)"
              >
                <span v-if="index >= currentModalItem">{{ index+1 }}</span>
                <span v-else>&zwnj;</span>
                <p class="indicator-label">{{ item.name }}</p>
              </div>
            </div>
          </div>
          <div id="serviceScheduleCarousel" class="carousel slide" data-ride="carousel" data-interval="false">
            <div class="carousel-inner">
              <div class="carousel-item" v-for="(item, index) in scheduleModalItems" :class="{active: index === 1}">
                <!-- Day and Time -->
                <template v-if="index === 1">
                  <div class="row blue-banner px-4 py-3">
                    <div class="col-md-3">
                      <span class="font-size-1 text-white">Selected service:</span>
                    </div>
                    <div class="col-md-9">
                      <select class="form-control mr-0 mr-md-2" v-model="serviceForm.service" required>
                        <option v-for="service in services">{{ service }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="row p-4 py-md-4 px-md-5">
                    <div class="col-md-6">
                      <div class="mx-1">
                        <span class="font-size-1 font-weight-bold text-secondary">Select date:</span>
                        <!-- Date -->
                        <div class="d-flex justify-content-center">
                          <div class="d-block">
                            <vue-datepicker v-model="serviceForm.date" :inline="true" :disabledDates="disabledDates" monday-first></vue-datepicker>
                          </div>
                        </div>
                        <!-- Date -->
                      </div>
                    </div>
                    <div class="col-md-6 font-size-1 text-center">
                      <div class="mx-1">
                        <span class="font-weight-bold text-secondary">Select available time:</span>
                        <div class="row position-relative rounded date-time-border">
                          <div class="background-line left-10 top-10 visible-lg"></div>
                          <div class="col-md-4 text-light-gray-3">
                            <p class="font-weight-bold text-gray-1">Morning</p>
                            <p class="time-item rounded py-2 mb-0" :class="{'text-secondary': time.available}" @click="selectTime($event, time)" v-for="time in availableTimes.morning">{{ time.time }}</p>
                          </div>
                          <div class="col-md-4 text-light-gray-3">
                            <p class="font-weight-bold text-secondary">Afternoon</p>
                            <p class="time-item rounded py-2 mb-0" :class="{'text-secondary': time.available}" @click="selectTime($event, time)" v-for="time in availableTimes.afternoon">{{ time.time }}</p>
                          </div>
                          <div class="col-md-4 text-light-gray-3">
                            <p class="font-weight-bold text-secondary-blue">Evening</p>
                            <p class="time-item rounded py-2 mb-0" :class="{'text-secondary': time.available}" @click="selectTime($event, time)" v-for="time in availableTimes.evening">{{ time.time }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-content-center w-100 mt-4">
                      <button type="button" class="style-button-form-learn button-sm yellow-button" @click="scrollItem((currentModalItem + 1), true)">Next</button>
                    </div>
                  </div>
                </template>
                <!-- Contact Details -->
                <template v-if="index === 2">
                  <div class="row blue-banner px-4 py-3">
                    <div class="col-md-2">
                      <span class="font-size-1 text-white">Selected:</span>
                    </div>
                    <div class="col-md-10">
                      <p class="font-weight-bold text-white"><span class="font-italic font-weight-normal">{{ serviceForm.service }}</span> | {{ formatDate(serviceForm.date.getTime(), 'MMM D') }}, {{ serviceForm.date.getFullYear() }} - {{ serviceForm.time }}</p>
                    </div>
                  </div>
                  <div class="px-4 py-3">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="firstName">First name</label>
                          <input v-model="serviceForm.firstName" type="text" class="form-control" id="firstName" placeholder="First name">
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="lastName">Last name</label>
                          <input v-model="serviceForm.lastName" type="text" class="form-control" id="lastName" placeholder="Last name">
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="email">Email address</label>
                          <input v-model="serviceForm.email" type="email" class="form-control" id="email" placeholder="email@domain.com">
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="phone">Phone number</label>
                          <input v-model="serviceForm.phone" type="tel" class="form-control" id="phone" placeholder="xxx-xxx-xxxx">
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <label for="comment">Comment</label>
                          <textarea v-model="serviceForm.comment" class="form-control" id="comment" rows="3" placeholder="Add comment"></textarea>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-content-end align-items-center w-100 mt-4 pr-4">
                      <span class="text-blue no-underline-hover font-weight-bold mx-3 cursor-pointer" href="#!" @click="scrollItem(currentModalItem - 1)">Back</span>
                      <button type="button" class="style-button-form-learn yellow-button" @click="scrollItem((currentModalItem + 1), true)">Book appointment</button>
                    </div>
                  </div>
                </template>
                <!-- Confirmation -->
                <template v-if="index === 3">
                  <div class="p-4">
                    <p class="text-center">Thanks {{ serviceForm.firstName }}.</p>
                    <p class="text-center">We'll send a booking confirmation to your mobile phone and <span class="font-weight-bold">{{ serviceForm.email }}</span> shortly.</p>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="pl-5 pr-4 py-2">
                        <div class="row">
                          <div class="col-md-2">
                            <i class="fa fa-calendar"></i>
                          </div>
                          <div class="col-md-10">
                            <span>{{ formatDate(serviceForm.date.getTime(), 'dddd') }}</span>
                            <span class="font-weight-bold">{{ formatDate(serviceForm.date.getTime(), 'MMM D') }}, {{ serviceForm.date.getFullYear() }} - {{ serviceForm.time }}</span>
                          </div>
                        </div>
                        <span class="text-blue py-3 font-weight-bold cursor-pointer font-size-1">Add to your calendar</span>
                        <div class="row">
                          <div class="col-md-2">
                            <i class="fa fa-map-marker"></i>
                          </div>
                          <div class="col-md-10">
                            <span>92 East Adamo Drive, Tampa, Florida</span>
                          </div>
                        </div>
                        <span class="text-blue py-3 font-weight-bold cursor-pointer font-size-1">Get directions</span>
                        <div class="row">
                          <div class="col-md-2">
                            <i class="fas fa-phone-volume"></i>
                          </div>
                          <div class="col-md-10">
                            <span>{{ phoneNumber }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="pr-3">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2951.904903148685!2d-71.0579319!3d42.2805533!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e37b841ef37cad%3A0xcaa88261d6b2b82e!2s35+Granville+St%2C+Boston%2C+MA+02124%2C+EE.+UU.!5e0!3m2!1ses-419!2sco!4v1542994109039" width="100%" height="200" frameborder="0" style="border:0; margin-right: 30px" allowfullscreen=""></iframe>
                      </div>
                      <button class="btn yellow-button my-4 px-4 text-white font-weight-bold" @click="scrollItem((currentModalItem + 1), true)">OK</button>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `

// Search Input
const SearchInputTemplate = `
  <form class="form form-inline my-2 my-lg-0">
    <input class="display-none form-control mr-sm-2 radiu-position input-find" placeholder="Find your next car" v-model="form.query" type="search" />
    <i class=".display-none.fas.fa-microphone.microphone.style-microphone" />
    <img class="display-none search-imag" src="./imag/icon-search.svg" alt="" />
  </form>
`

// Latest Reviews
const LatestReviewsTemplate = `
  <div class="px-0 px-md-4 d-md-flex justify-content-between">
    <template v-for="review in reviews">
      <div v-if="review.stars" class="stars-review">
        <div class="review-image">
          <img class="img-fluid" :src="review.image">
        </div>
        <div class="stars-container">
          <template v-for="num in review.stars | 0">
            <i class="fas fa-star"></i>
          </template>
          <template v-if="review.stars % 1 !== 0">
              <i class="fa fa-star-half-o"></i>
            <template v-for="num in (4 - (review.stars | 0))">
              <i class="far fa-star"></i>
            </template>
          </template>
          <template v-else>
            <template v-for="num in (5 - (review.stars | 0))">
                <i class="far fa-star"></i>
              </template>
          </template>
        </div>
        <p class="text-center font-weight-bold text-dark-blue">{{ review.stars }} STARS</p>
      </div>
      <div v-if="review.rating" class="rating-review">
        <div class="review-image">
          <img class="img-fluid" :src="review.image">
        </div>
        <div class="rating-score">
          <p class="mb-0 text-white font-weight-1">RATING:</p>
          <p class="mb-0 text-white font-weight-2">{{ review.rating }}</p>
        </div>
      </div>
    </template>
  </div>
`

// Latest Reviews mock data
const latestReviews = [
  {
    image: './imag/google-review.jpg',
    stars: 5,
  },
  {
    image: './imag/edmunds-review.jpg',
    stars: 4.9,
  },
  {
    image: './imag/cars-review.jpeg',
    stars: 4.8,
  },
  {
    image: './imag/surecritic-review.svg',
    stars: 4.4,
  },
  {
    image: './imag/bbb-review.png',
    rating: 'A+',
  }
];

// Popular Cars mock data
const mockData = [
  {
    image: './imag/car-5.png',
    price: 22400,
    type: 'Pre-owned',
    name: '2018 Chevrolet Tahoe',
    miles: '58,369 miles',
    discountPercent: '15%',
    discountedPrice: '$19,040',
    monthlyEstimate: '$439',
    buttonText: 'More'
  },
  {
    image: './imag/car-6.png',
    price: 24100,
    type: 'Pre-owned',
    name: '2018 Chevrolet Tahoe',
    miles: '58,369 miles',
    monthlyEstimate: '$439',
    buttonText: 'More'
  },
  {
    image: './imag/car-7.png',
    price: 24100,
    type: 'Pre-owned',
    name: '2018 Chevrolet Tahoe',
    miles: '58,369 miles',
    monthlyEstimate: '$439',
    buttonText: 'More'
  },
  {
    image: './imag/car-8.png',
    price: 34100,
    type: 'Pre-owned',
    name: '2018 Chevrolet Tahoe',
    miles: '58,369 miles',
    monthlyEstimate: '$439',
    buttonText: 'More'
  },
  {
    image: './imag/car-5.png',
    price: 22400,
    type: 'Pre-owned',
    name: '2018 Chevrolet Tahoe',
    miles: '58,369 miles',
    discountPercent: '15%',
    discountedPrice: '$19,040',
    monthlyEstimate: '$439',
    buttonText: 'More'
  },
  {
    image: './imag/car-6.png',
    price: 24100,
    type: 'Pre-owned',
    name: '2018 Chevrolet Tahoe',
    miles: '58,369 miles',
    monthlyEstimate: '$439',
    buttonText: 'More'
  }
]

window.onload = function () {

  // search box component
  Vue.component('search-box', {
    template: SearchFormTemplate,
    data() {
      return {
        // find cars
        selectBrandRef: null,
        priceSliderMinText: '$3K',
        priceSliderMin: 3000,
        priceSliderMaxText: '$50K',
        priceSliderMax: 50000,
        newCars: 176,
        certifiedPreownedCars: 93,
        preownedCars: 129,
        results: [],
        makes: [],
        models: [],
        bodytypes: [],
        form: {
          price: [3, 50],
          make: '',
          model: '',
          bodyType: ''
        },
        searchBox: searchBox,
        phoneNumber: phoneNumber,
        // service your car
        serviceForm: {
          service: '',
          date: new Date(),
          time: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          comment: ''
        },
        sliderOptions: {
          width: "100%",
          height: 8,
          dotSize: 16,
          disabled: false,
          show: true,
          tooltip: "always",
          enableCross: false,
          value: [3, 50],
          min: 3,
          max: 50,
          formatter: "${value}K",
          mergeFormatter: "${value1}K-${value2}K"
        },
        desktopSliderStyles: {
          bgStyle: {
            "backgroundColor": "#d4d4d4",
          },
          height: "3",
          sliderStyle: {
            "backgroundColor": "#fff",
            "borderStyle": "solid",
            "borderColor": "#00adef",
            "borderWidth": "2px"
          },
          tooltipStyle: {
            "backgroundColor": "rgba(0,0,0,0)",
            "borderColor": "rgba(0,0,0,0)",
            "color": "#00adef",
            "marginBottom": "-10px"
          },
          processStyle: {
            "backgroundColor": "#d4d4d4"
          },
        },
        mobileSliderStyles: {
          bgStyle: {
            "backgroundColor": "#d4d4d4",
          },
          height: "3",
          sliderStyle: {
            "backgroundColor": "#fff",
            "borderStyle": "solid",
            "borderColor": "#00adef",
            "borderWidth": "3px",
            "padding": "9px",
            "marginTop": "-3px"
          },
          tooltipStyle: {
            "display": "none"
          },
          processStyle: {
            "backgroundColor": "#d4d4d4"
          },
        },
        services: [
          'Oil change',
          'Tire check',
          'Air filter replacement',
          'Spark plugs replacement'
        ],
        scheduleModalItems: [
          {
            name: 'Service',
            classes: ['item-done']
          },
          {
            name: 'Day & Time',
            classes: ['item-current']
          },
          {
            name: 'Contact Details',
            classes: ['item-undone']
          },
          {
            name: 'Confirmation',
            classes: ['item-undone']
          }
        ],
        currentModalItem: 1,
        availableTimes: {
          morning: [
            {
              time: '12:00PM',
              available: false
            },
            {
              time: '12:30PM',
              available: false
            },
            {
              time: '1:00PM',
              available: false
            },
            {
              time: '1:30PM',
              available: true
            },
            {
              time: '2:00PM',
              available: false
            },
          ],
          afternoon: [
            {
              time: '3:00PM',
              available: false
            },
            {
              time: '3:30PM',
              available: false
            },
            {
              time: '3:45PM',
              available: true
            },
            {
              time: '4:00PM',
              available: true
            },
            {
              time: '4:30PM',
              available: true
            },
          ],
          evening: [
            {
              time: '4:45PM',
              available: true
            },
          ]
        },
        disabledDates: {
          to: new Date(Date.now() - 8640000)
        }
      }
    },
    methods: {
      onChangeMake: async function({ target: { value: make } }) {
        this.form.make = make
        this.models = await this.fetchModels(make)
        console.log(this.models);
        this.selectModelRef.select2({
          placeholder: 'Select some model',
          disabled: false
        })
      },
      onChangeCondition: async function(condition){
          console.log(condition);
           this.selectBrandRef.select2({ placeholder: 'Select some brand', disabled: false });
      },
      onChangeModel: async function({ target: { value: btype } }) {
        // this.form.model = btype
        // console.log(btype)
        // this.bodytypes = await this.fetchBodytypes(btype)
        // this.selectBodyTypeRef.select2({ placeholder: 'Select body type', disabled: false })
      },
      submitForm: function() {
        console.log(this.form.bodyType)
        console.log(this.form.brand)
        console.log(this.form.model)
        console.log(this.form.price)
      },
      search: async function() {
        const results = await axios.get(serverUrls.searchCars + this.query)
        this.results = results
      },
      fetchMakes: async function() {
        let response = await axios.get(serverUrls.getMakes)
        console.log('Make: ', response.data)
        return response.data
      },
      fetchModels: async function(make) {
        let response = await axios.get(`${serverUrls.getModels}?currentMake=${ make }`)
        console.log('Make: ', response.data)
        return response.data
      },
      fetchBodytypes: async function() {
        let response = await axios.get(serverUrls.getBodyTypes)
        console.log('bodyType2:', response)
        return response.data
      },
      changeIconColor: function (tab) {
        let tabOneIconArray = this.searchBox.tabOneIcon.split('/');
        let tabTwoIconArray = this.searchBox.tabTwoIcon.split('/');
        let tabOneIconName = '';
        let tabTwoIconName = '';
        if(tab === 'tabOne') {
          tabOneIconName = 'icon-car.svg';
          tabTwoIconName = 'icon-no-card-white.svg';
        }
        if(tab === 'tabTwo') {
          tabOneIconName = 'icon-car-white.svg';
          tabTwoIconName = 'icon-no-card.svg';
        }
        tabOneIconArray[tabOneIconArray.length - 1] = tabOneIconName;
        tabTwoIconArray[tabTwoIconArray.length - 1] = tabTwoIconName;
        this.searchBox.tabOneIcon = tabOneIconArray.join('/');
        this.searchBox.tabTwoIcon = tabTwoIconArray.join('/');
      },
      handleOpenModal() {
        $('#serviceModal').appendTo("body").modal('show');
      },
      scrollItem(index, next) {
        if ((index > 0 && index <= this.currentModalItem) || next) {
          if(index >= this.scheduleModalItems.length) {
            $('#serviceModal').modal('hide');
            index = 1;
          }
          $('#serviceScheduleCarousel').carousel(index);
          this.currentModalItem = index;
          this.scheduleModalItems.forEach((item, itemIndex) => {
            if(itemIndex < index) item.classes = ['item-done'];
            if(itemIndex === index) item.classes = ['item-current'];
            if(itemIndex > index) item.classes = ['item-undone'];
          });
        }
      },
      selectTime(event, time) {
        if(time.available) {
          $('.time-item').filter(function() { return $(this).hasClass('text-white') }).addClass('text-secondary');
          $('.time-item').removeClass('background-light-blue text-white');
          $(event.target).addClass('background-light-blue text-white');
          $(event.target).removeClass('text-secondary');
          this.serviceForm.time = time.time;
        }
      },
      formatDate(date, dateFormat) {
        return moment(date, 'x').format(dateFormat);
      },
      formatNumber(number, symbol) {
        if(number < 0) return symbol + '0';
        return symbol + number.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
      }
    },
    async mounted() {
      this.selectBrandRef = $('#selectBrand')
      this.selectModelRef = $('#selectModel')
      this.selectBodyTypeRef = $('#selectBodyType')
      this.selectBrandRef.select2({ placeholder: 'Select some brand', disabled: true })
      this.selectModelRef.select2({ placeholder: 'Select brand first', disabled: true })
      this.selectBodyTypeRef.select2({ placeholder: 'Select body type', disabled: false })
      this.bodytypes = await this.fetchBodytypes()
      this.makes = await this.fetchMakes();
      this.selectBrandRef.on('select2:select', this.onChangeMake.bind(this));
      this.selectModelRef.on('select2:select', this.onChangeModel.bind(this));
    },
    components: {
      vueDatepicker: Datepicker,
      vueSlider: vueSlider,
    }
  })

  // search input component
  Vue.component('search-input', {
    template: SearchInputTemplate,
    data() {
      return {
        form: {
          query: ''
        }
      }
    }
  })

  // latest reviews component
  Vue.component('latest-reviews', {
    template: LatestReviewsTemplate,
    data() {
      return {
        reviews: latestReviews,
      }
    }
  })

  // search box instance
  new Vue({
    el: '#search-box',
  })

  // popular cars instance
  new Vue({
    el: '#popular-cars',
    template: `
      <div class="background-gray">
        <popular-cars viewPopularCars viewAllCars></popular-cars>
      </div>
    `,
    components: {
      popularCars: PopularCarsComponent
    }
  })
  
  // latest reviews instance
  new Vue({
    el: '#latest-reviews',
  })

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