import vueSlider from 'vue-slider-component'
import axios from 'axios'
import { editCompareCars, checkCompareCars } from '../fixed-widgets/CompareCarsTab';
import { serverUrls } from '../config'

const mileages = [
  { amount: 10000, kms: 256 },
  { amount: 50000, kms: 360 },
  { amount: 100000, kms: 650 },
  { amount: 150000, kms: 870 },
  { amount: 200000, kms: 1100 },
  { amount: 300000, kms: 1150 },
];

const colors = [
  { text: 'Black', value: 'black', color: '#111111' },
  { text: 'Blue', value: 'Blue', color: '#2b6893' },
  { text: 'Brown', value: 'Brown', color: '#564644' },
  { text: 'Gray', value: 'Gray', color: '#7e7e7e' },
  { text: 'Green', value: 'Green', color: '#416523' },
  { text: 'Other', value: 'Other', color: '#c2ae9a' },
  { text: 'Red', value: 'Red', color: '#a40011' },
  { text: 'Silver', value: 'Silver', color: '#cacaca' },
  { text: 'White', value: 'White', color: '#ffffff' },
];

const bodies = [
  { name: 'Convertible', img: '../imag/convertible.png' },
  { name: 'Coupe', img: '../imag/coupe.png' },
  { name: 'Hatchback', img: '../imag/hatchback.png' },
  { name: 'Minivan', img: '../imag/minivan.png' },
  { name: 'Pickup', img: '../imag/pickup.png' },
  { name: 'Sedan', img: '../imag/sedan.png' },
  { name: 'SUV', img: '../imag/suv.png' },
  { name: 'Wagon', img: '../imag/wagon.png' },
];

const makes = [
  { name: 'Any', value: 'any' },
  { name: 'Chevrolet' },
  { name: 'Acura' },
  { name: 'BMW' },
  { name: 'Ford' },
  { name: 'Honda' },
  { name: 'Jeep' },
  { name: 'Audi' },
  { name: 'Toyota' },
  { name: 'Kia' },
];

const models = [
  { name: 'Any', value: 'any' },
  { name: 'BoltEV', value: 'Bolt EV' },
  { name: 'Camaro', value: 'Camaro' },
  { name: 'CityExpress', value: 'City Express' },
  { name: 'Colorado', value: 'Colorado' },
  { name: 'Corvette', value: 'Corvette' },
  { name: 'Cruze', value: 'Cruze' },
];

const trims = [
  { name: 'Lorem ipsum dolor', value: '890' },
  { name: 'Lorem ipsum dolor', value: '110' },
  { name: 'Lorem ipsum dolor', value: '250' },
  { name: 'Lorem ipsum dolor', value: '870' },
];

const drivetrains = [
  { name: '4WD', value: '56' },
  { name: 'FWD', value: '90' },
];

const conditions = [
  { name: 'New', value: 'new' },
  { name: 'Pre-owned', value: 'pre-owned' },
  { name: 'Certified pre-owned', value: 'certified-pre-owned' },
];

const transmissions = [
  { name: 'Automatic' },
  { name: 'Manual' },
];

const monthlyPayments = {
  months: [60, 48, 36, 24, 12],
  interestRates: [
    { name: 'Very poor', creditScore: '< 600', percentage: 7.9 },
    { name: 'Poor', creditScore: '600 - 679', percentage: 6.4 },
    { name: 'Fair', creditScore: '680 - 719', percentage: 4.9 },
    { name: 'Good', creditScore: '720 - 780', percentage: 3.4 },
    { name: 'Excellent', creditScore: '> 780', percentage: 1.9 },
  ],
};


window.onload = function () {
  new Vue({
    el: '#app',
    data() {
      return {
        emailSubscribe: '',
        showEmailTopBar: false,
        loading: true,
        shouldSearch: true,
        matches: [],
        filters: {
          minYear: moment().year() - 20,
          maxYear: moment().year(),
          monthlyPayments: {},
          makes: [],
          models: [],
          conditions: [],
          interiorColors: [],
          exteriorColors: [],
          trims: [],
          drivetrains: [],
          transmissions: [],
          mileages: [],
          bodies: [],
        },
        form: {
          conditions: [],
          makes: [],
          models: [],
          transmissions: [],
          mileages: [],
          bodies: [],
          year: 2012,
          price: [],
          exteriorColor: '',
          interiorColor: '',
        },
        sort: {
          keyword: ''
        },
        typeView: {
          list: true,
          grid: false
        },
        mileagesSliderValues: ['0', '120000'],
        priceSliderValues: [0, 65000],
        yearSliderValues: [moment().year()-20, moment().year()],
        sliderOptions: {
          width: "100%",
          height: 8,
          dotSize: 16,
          disabled: false,
          show: true,
          tooltip: "always",
          enableCross: false,
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
            "color": "#00adef"
          },
          processStyle: {
            "backgroundColor": "#d4d4d4"
          }
        },
        sliderYears: {
          value: [
            moment().year() - 20,
            moment().year()
          ],
          min: moment().year() - 20,
          max: moment().year(),
          formatter: "{value}",
          mergeFormatter: "{value1}-{value2}",
        },
        sliderPrices: {
          value: [
            0,
            65000
          ],
          min: 0,
          max: 65000,
          formatter: "${value}",
          mergeFormatter: "${value1}-${value2}",
        },
        sliderMileages: {
          value: [
            0,
            120000
          ],
          min: 0,
          max: 120000,
          mergeFormatter: "{value1}-{value2}",
        },
        years: [moment().year() - 20, moment().year()],
        trims: [],
        drivetrains: [],
        monthlyPayments: {
          min: 0,
          max: 1650,
          months: 60,
          interestPercent: 4.9,
          downPayment: 2000
        },
      };
    },
    async created() {
      this.fetchFilters()
    },
    mounted() {
      let { ...normalizedQuery } = this.parseQueryString()
      this.form = normalizedQuery;
      this.doSearch()
      this.stickySidebar()
      backToTop()
      this.checkShowEmailTopBar()
    },
    methods: {

      queryStringify(object) {
        let queryString = '?';
        for (const key in object) {
          if (object.hasOwnProperty(key)) {

            const element = object[key];

            if (element || key !== "") {
              if (typeof element === 'object') {
                if (element.length > 0) {
                  queryString = `${queryString}&${key}=${element.join(':')}&`
                }

              } else {
                queryString = `${queryString}&${key}=${element}&`;
              }
            }
          }
        }

        return queryString
      },
      parseQueryString() {
        if(!window.location.search) return this.form;
        let queryString = window.location.search.substring(1)
        let params = {}, queries, temp, i, l
        // Split into key/value pairs
        queries = queryString.split("&")
        // Convert the array of strings into an object
        for (i = 0, l = queries.length; i < l; i++) {
          temp = queries[i].split('=')
          let valQuery = temp[1];
          if (temp[0] === 'conditions' || temp[0] === 'makes' || temp[0] === 'models' || temp[0] === 'transmissions' || temp[0] === 'mileages' || temp[0] === 'bodies') {
            valQuery = temp[1].split(':')
          }
          params[temp[0]] = valQuery
        }
        return Object.assign(this.form, params);
      },

      fetchFilters() {
        this.filters.makes = makes;
        this.filters.monthlyPayments = monthlyPayments;
        this.filters.models = models;
        this.filters.mileages = mileages;
        this.filters.interiorColors = colors;
        this.filters.exteriorColors = colors;
        this.filters.bodies = bodies;
        this.filters.trims = trims;
        this.filters.drivetrains = drivetrains;
        this.filters.conditions = conditions;
        this.filters.transmissions = transmissions;
      },
      clearFilters() {
        this.form.conditions = [];
        this.form.makes = [];
        this.form.models = [];
        this.form.transmissions = [];
        this.form.mileages = [];
        this.form.bodies = [];
        this.form.year = { min: 2012, max: moment().year() };
        this.form.minPrice = null;
        this.form.maxPrice = null;
        this.form.exteriorColor = 'Black';
        this.form.interiorColor = 'Black';
        console.log('clear')
        window.history.pushState(null, null, '?');
        this.doSearch()
      },
      doSearch() {
        // get this.form and submit it to backend
        this.loading = true
        this.shouldSearch = false
        const self = this
        // let { price, ...normalizedForm } = this.form
        // normalizedForm.minPrice = this.form.price[0]
        // normalizedForm.maxPrice = this.form.price[1]
        axios.get(serverUrls.searchRelatedCars + window.location.search)
          .then(async res => {
            self.matches = await res.data;

            self.loading = false
            self.shouldSearch = true
          })
          .catch(() => {
            self.matches = []
            self.shouldSearch = true
          });
      },
      setFormValue(valueLabel, formLabel) {
        if(formLabel === 'years') this[formLabel] = this[valueLabel]
        this.form[formLabel] = this[valueLabel]
      },
      getMonthlyPayment(carPrice) {
        const dp = this.monthlyPayments.downPayment
        const P = parseFloat(carPrice) - dp
        const ir = (parseFloat(this.monthlyPayments.interestPercent) / 100) / 12
        const n = parseFloat(this.monthlyPayments.months)
        const x1 = ir*((1+ir)**n)
        const x2 = ((1+ir)**n) - 1
        const total = P*(x1/x2)
        return total;
      },
      stickySidebar() {
        var stickySidebar = new StickySidebar('#sidebar', {
          topSpacing: 20,
          bottomSpacing: 20,
          containerSelector: '#main-content',
          innerWrapperSelector: '.sidebar__inner'
        });
      },
      toggleView(property, currentProperty) {
        this.typeView[property] = true
        this.typeView[currentProperty] = false
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
      interestRateClasses(ratePercentage) {
        if (ratePercentage === this.monthlyPayments.interestPercent) return 'selected-interest-rate';
        return;
      },
      hideEmailTopBar() {
        this.showEmailTopBar = false
      },
      checkShowEmailTopBar() {
        var topBar = localStorage.getItem('searchEmailTopBar')
        if(topBar === 'hide') {
          this.showEmailTopBar = false
          return;
        }
        this.showEmailTopBar = true
      },
      emailListSubscribe() {
        var topBar = localStorage.setItem('searchEmailTopBar', 'hide')
        this.showEmailTopBar = false
      },
      formatNumber(number, symbol) {
        if (typeof number === 'string') number = parseFloat(number);
        return symbol + number.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
      },
    },
    computed: {
      matchesNumber() {
        return this.matches.length;
      }
    },
    filters: {
      capitalize(str) {
        return str && str.charAt(0).toUpperCase() + str.slice(1)
      },
      upperCase(str) {
        return str && str.toUpperCase()
      }
    },
    watch: {
      form: {
        handler: function () {
          if (!this.shouldSearch) return

          console.log(this.form);
          console.log(this.queryStringify(this.form))

          setTimeout(() => {
            window.history.pushState(null, null, this.queryStringify(this.form));
            this.doSearch()
          }, 500)
        },
        deep: true
      },
    },
    components: {
      vueSlider: vueSlider,
    },
    template: `
      <div>
        <div class="background-bright-yellow d-flex justify-content-center w-100 py-3" v-if="showEmailTopBar">
          <div class="d-flex align-items-center py-3">
            <p class="text-secondary-gray font-weight-3 mb-0 pr-3">Get email alerts with special offers and new vehicles</p>
            <form class="form-inline" @submit.prevent="emailListSubscribe()">
              <input type="email" placeholder="Your email address" class="form-control" aria-label='Email' v-model="emailSubscribe" required>
              <input type="submit" class="input-group-text search-email-top-bar-button" value="">
              <div class="submit-arrow"></div>
            </form>
            <button type="button" class="close ml-0" aria-label="Close" @click="hideEmailTopBar()">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>

        <div class="container-fluid background-gray pt-4">
          <div id="main-content" class="row">
            <div id="sidebar" class="col-sm-12 col-lg-4 p-0 pb-4 mb-4">
              <div class="sidebar__inner filters-container">
                <div class="search-sort-container d-md-none p-3">
                  <div class="form-group">
                    <span class="form-label">Sort by:</span>
                    <select class="form-control">
                      <option selected>Selection option</option>
                      <option>Model</option>
                    </select>
                  </div>
                  <div class="button-container">
                    <button class="style-button-form-learn">FILTROS</button>
                  </div>
                </div>
                <div class="d-flex justify-content-between px-4 align-items-center p-4 top-divider">
                  <strong class="font-weight-3 text-dark">{{ matchesNumber }} matches</strong>
                  <a href="javascript:;" @click="clearFilters">
                    <small class="clear-filters">Clear filter</small>
                  </a>
                </div>
                <section class="top-divider">
                  <h5 class="font-weight-3 text-dark">Vehicle condition</h5>
                  <ul class="fixed-height unstyled scrollbar">
                    <li :key="condition.value" v-for="condition in filters.conditions" class="m-0">
                      <div class="form-check form-check-inline input-container m-0">
                        <label class="form-check-label" :for="condition.name">
                          <input class="form-check-input" :id="condition.name" type="checkbox" :value="condition.name" v-model="form.conditions">
                          <span class="checkmark"></span>
                          <span>{{ condition.name }}</span>
                        </label>
                      </div>
                    </li>
                  </ul>
                </section>
                <section class="top-divider px-3">
                  <h5 class="font-weight-3 text-dark">Year</h5>
                  <div class="d-flex justify-content-center mt-5 mb-3 px-3">
                    <vue-slider v-model="yearSliderValues" @mouseup.native="setFormValue('yearSliderValues', 'years')" v-bind="sliderOptions" :value="sliderYears.value" :min="sliderYears.min" :max="sliderYears.max" :formatter="sliderYears.formatter" :mergeFormatter="sliderYears.mergeFormatter"></vue-slider>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <input type="number" class="form-control" id="exampleFormControlInput1" v-model="years[0]">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <input type="number" class="form-control" id="exampleFormControlInput1" v-model="years[1]">
                      </div>
                    </div>
                  </div>
                </section>
                <section class="top-divider">
                  <h5 class="font-weight-3 text-dark">Price</h5>
                  <div class="d-flex justify-content-center mt-5 mb-3 px-3">
                    <vue-slider v-model="priceSliderValues" @mouseup.native="setFormValue('priceSliderValues', 'price')" v-bind="sliderOptions" :value="sliderPrices.value" :min="sliderPrices.min" :max="sliderPrices.max" :formatter="sliderPrices.formatter" :mergeFormatter="sliderPrices.mergeFormatter"></vue-slider>
                  </div>
                  <div class="form-row mt-3">
                    <div class="col-md-6 form-group">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">$</span>
                        </div>
                        <input
                          class="form-control"
                          type="number"
                          min="0"
                          v-model="form.price[0]"
                          placeholder="Min price"
                        >
                      </div>
                    </div>
                    <div class="col-md-6 form-group">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">$</span>
                        </div>
                        <input
                          class="form-control"
                          type="number"
                          min="0"
                          v-model="form.price[1]"
                          placeholder="Max price"
                        >
                      </div>
                    </div>
                  </div>
                  <p class="font-weight-3 text-dark">Monthly payment</p>
                  <a class="font-size-1 no-underline-hover font-weight-bold text-primary-color" href="#" data-toggle="modal" data-target="#monthlyPaymentModal">{{ monthlyPayments.months }} months, {{ monthlyPayments.interestPercent }}% interest, {{ formatNumber(monthlyPayments.downPayment, '$') }} down</a>
                </section>
                <section class="top-divider">
                  <h5 class="font-weight-3 text-dark">Max Mileage</h5>
                  <div class="d-flex justify-content-center mt-5 mb-3 px-3">
                    <vue-slider v-model="mileagesSliderValues" @mouseup.native="setFormValue('mileagesSliderValues', 'mileages')" v-bind="sliderOptions" :value="sliderMileages.value" :min="sliderMileages.min" :max="sliderMileages.max" :formatter="sliderMileages.formatter" :mergeFormatter="sliderMileages.mergeFormatter"></vue-slider>
                  </div>
                  <div class='form-row mt-3'>
                    <div class="col-md-6 form-group">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">$</span>
                        </div>
                        <input
                          class="form-control"
                          type="number"
                          min="0"
                          v-model="form.mileages[0]"
                          placeholder="Min price"
                        >
                      </div>
                    </div>
                    <div class="col-md-6 form-group">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">$</span>
                        </div>
                        <input
                          class="form-control"
                          type="number"
                          min="0"
                          v-model="form.mileages[1]"
                          placeholder="Max price"
                        >
                      </div>
                    </div>
                  </div>
                </section>
                <section class="top-divider">
                  <h5 class="font-weight-3 text-dark">Make</h5>
                  <ul class="fixed-height unstyled scrollbar">
                    <li :key="make.name" v-for="make in filters.makes" class="m-0">
                      <div class="form-check form-check-inline input-container m-0">
                        <label class="form-check-label" :for="make.name">
                          <input class="form-check-input" :id="make.name" type="checkbox" :value="make.name" v-model="form.makes">
                          <span class="checkmark"></span>
                          <span>{{ make.name }}</span>
                        </label>
                      </div>
                    </li>
                  </ul>
                </section>
                <section class="top-divider">
                  <h5 class="font-weight-3 text-dark">Model</h5>
                  <ul class="fixed-height unstyled scrollbar">
                    <li :key="model.name" v-for="model in filters.models" class="m-0">
                      <div class="form-check form-check-inline input-container m-0">
                        <label class="form-check-label" :for="model.name + 'model'">
                          <input :id="model.name + 'model'" type="checkbox" :value="model.name" v-model="form.models" class="form-check-input">
                          <span class="checkmark"></span>
                          <span>{{ model.name }}</span>
                        </label>
                      </div>
                    </li>
                  </ul>
                </section>
                <section class="top-divider mb-3">
                  <h5 class="font-weight-3 text-dark">Exterior color</h5>
                  <div class="row ml-3">
                    <div class="col-md-1">
                      <span class="form-check-input color-container mt-2" v-bind:style="{ background: form.exteriorColor }"></span>
                    </div>
                    <div class="col-md-11">
                      <select type="text" class="form-control" v-model="form.exteriorColor">
                        <option value="" disabled selected>Select</option>
                        <option :value="color.value" v-for="color in filters.exteriorColors">
                          {{ color.text }}
                        </option>
                      </select>
                    </div>
                  </div>
                </section>
                <section class="top-divider mb-3">
                  <h5 class="font-weight-3 text-dark">Interior color</h5>
                  <div class="row ml-3">
                    <div class="col-md-1">
                      <span class="form-check-input color-container mt-2" v-bind:style="{ background: form.interiorColor }"></span>
                    </div>
                    <div class="col-md-11">
                      <select type="text" class="form-control" v-model="form.interiorColor">
                        <option value="" disabled selected>Select</option>
                        <option :value="color.value" v-for="color in filters.interiorColors">
                          {{ color.text }}
                        </option>
                      </select>
                    </div>
                  </div>
                </section>
                <section class="top-divider">
                  <h5 class="font-weight-3 text-dark">Trim</h5>
                  <ul class="fixed-height unstyled scrollbar">
                    <li :key="trim.value" v-for="trim in filters.trims" class="m-0">
                      <div class="form-check form-check-inline input-container m-0">
                        <label class="form-check-label" :for="trim.value + 'trim'">
                          <input :id="trim.value + 'trim'" type="checkbox" :value="trim.value" v-model="trims" class="form-check-input">
                          <span class="checkmark"></span>
                          <span>{{ trim.name }} ({{ trim.value }})</span>
                        </label>
                      </div>
                    </li>
                  </ul>
                </section>
                <section class="top-divider">
                  <h5 class="font-weight-3 text-dark">Body</h5>
                  <ul class="fixed-height unstyled scrollbar">
                    <li :key="body.name" v-for="body in filters.bodies" class="m-0">
                      <div class="form-check form-check-inline input-container m-0">
                        <label class="form-check-label" :for="body.name">
                          <input :id="body.name" type="checkbox" v-model="form.bodies" :value="body.name" class="form-check-input">
                          <span class="checkmark"></span>
                          <img :src="body.img" />
                          <span>{{ body.name }}</span>
                        </label>
                      </div>
                    </li>
                  </ul>
                </section>
                <section class="top-divider">
                  <h5 class="font-weight-3 text-dark">Drivetrain</h5>
                  <ul class="fixed-height unstyled scrollbar">
                    <li :key="drivetrain.value" v-for="drivetrain in filters.drivetrains" class="mb-2">
                      <div class="form-check form-check-inline input-container m-0">
                        <label class="form-check-label" :for="drivetrain.value + 'drivetrain'">
                          <input :id="drivetrain.value + 'drivetrain'" type="checkbox" :value="drivetrain.value" v-model="drivetrains" class="form-check-input">
                          <span class="checkmark"></span>
                          <span>{{ drivetrain.name }} ({{ drivetrain.name }})</span>
                        </label>
                      </div>
                    </li>
                  </ul>
                </section>
                <section class="top-divider">
                  <h5 class="font-weight-3 text-dark">Transmission</h5>
                  <ul class="fixed-height unstyled scrollbar">
                    <li :key="transmission.name" v-for="transmission in filters.transmissions" class="mb-2">
                      <div class="form-check form-check-inline input-container m-0">
                        <label class="form-check-label" :for="transmission.name" :class="{ 'selected-options': form.transmissions.includes(transmission.name) }">
                          <input :id="transmission.name" type="checkbox" :value="transmission.name" v-model="form.transmissions" class="form-check-input">
                          <span class="checkmark"></span>
                          <span>{{ transmission.name }}</span>
                        </label>
                      </div>
                    </li>
                  </ul>
                </section>
              </div>
            </div>
            <div id="content" class="col-sm-12 col-lg-8 pl-5 pr-4 background-gray">
              <div class="search-sort-container d-none d-lg-flex">
                <div class="form-group">
                  <span class="form-label">Sort by:</span>
                  <select class="form-control">
                    <option selected>Selection option</option>
                    <option>Model</option>
                  </select>
                </div>
                <div class="view-container">
                  <i @click="toggleView('list', 'grid')" :class="{ 'active': typeView.list }" class="fas fa-th grid"></i>
                  <i @click="toggleView('grid', 'list')" :class="{ 'active': typeView.grid }" class="fas fa-list list"></i>
                </div>
              </div>
              <div class="row">
                <div v-if="matches.length === 0">
                  <div class="progress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                  </div>
                </div>
                <template v-else-if="typeView.list" v-for="(car, index) in matches">
                  <div class="col-lg-6 col-sm-12 p-0 mb-3">

                    <div class="card h-100">
                      <div class="search-result popular-car-img card-img-top" :style="'--img-url:url(/imag/car-1.jpg)'"></div>
                      <div class="card-body px-3 d-flex flex-column justify-content-between">
                        <p class="text-car-model pb-3">{{ car._source.year }} {{ car._source.make }} {{ car._source.model }}</p>
                        <div class="d-flex justify-content-between font-size-4 text-secondary border-bottom">
                          <span>{{ car._source.condition ? car._source.condition : 'New' }}</span>
                          <span>{{ formatNumber(car._source.miles, '') }} miles</span>
                        </div>
                        <div class="font-size-4 text-secondary">
                          <p class="mb-0">Price: {{ formatNumber(car._source.price, '$') }}</p>
                          <p class="mb-0">Transmission: {{ car._source.transimission ? car._source.transimission : 'Automatic' }}</p>
                          <p class="mb-0">Color: {{ car._source.exteriorColor ? car._source.exteriorColor : 'Silver' }}</p>
                        </div>
                        <div class="popular-car-financing d-flex align-items-center justify-content-around">
                          <p class="mb-0">Estimated payment {{ formatNumber(getMonthlyPayment(car._source.price), '$') }}/m</p>
                          <a href="#!"><img class="p-0" src="../imag/financing-calculate.svg" alt="Financing Calculator"></a>
                        </div>
                        <div class="d-flex justify-content-around align-items-center">
                          <div class="form-check form-check-inline input-container m-0">
                            <label class="form-check-label" :for="'search-compare-' + index">
                              <input class="form-check-input" type="checkbox" :id="'search-compare-' + index" :value="car._id" @change.prevent="editCompareCars($event.target)" :checked="checkCompareCars(car._id)">
                              <span class="checkmark"></span>
                              <span class="font-size-1 line-height-1 text-secondary font-weight-normal">Compare</span>
                            </label>
                          </div>
                          <a class="style-button-form-learn no-underline-hover dark-blue-button" :href="car.url" v-if="car.url">More</a>
                          <a class="style-button-form-learn no-underline-hover dark-blue-button" href="#!" v-else>More</a>
                        </div>
                      </div>
                    </div>
                    
                    <div class="card d-none">
                      <img class="card-img-top" src="/imag/car-1.jpg" alt="Card image cap" />
                      <div class="div-pay">{{ car._source.priceText }}</div>
                      <div class="card-body card-body-height">
                        <div class="d-flex justify-content-between mb-2">
                          <span class="popular-car-type">{{ car._source.condition | upperCase }}</span>
                          <span class="popular-car-type">{{ car._source.miles }} mls</span>
                        </div>
                        <p class="text-car-model">{{ car._source.year }} {{ car._source.make }} {{ car._source.model }}</p>
                        <p class="miles my-0">Transmission: <b>{{ car._source.transmission | capitalize }}</b></p>
                        <p class="miles my-0">Exterior: <b>{{ car._source.exteriorColor | capitalize }}</b></p>
                        <p class="miles my-0 mb-3">Interior: <b>{{ car._source.interiorColor | capitalize }}</b></p>
                        <div class="d-flex justify-content-between mb-3">
                          <a href="javascript:;" class="miles color-primary">Send to my phone</a>
                          <div class="form-check form-check-inline input-container m-0">
                            <label class="form-check-label" :for="'search-compare-' + index">
                              <input class="form-check-input" type="checkbox" :id="'search-compare-' + index" :value="car.name + '-' + index" @change.prevent="editCompareCars($event.target)" :checked="checkCompareCars(car.name + '-' + index)">
                              <span class="checkmark"></span>
                              <span class="font-size-1 line-height-1 text-secondary font-weight-normal">Compare</span>
                            </label>
                          </div>
                        </div>
                        <div class="d-flex justify-content-center">
                          <button class="style-button-form-learn" href="#">More details</button>
                        </div>
                      </div>
                    </div>

                    <div class="card d-lg-none">
                      <div class="card-body card-body-height d-flex pt-none">
                        <div class="grid-image-container">
                          <img class="card-img-top" src="/imag/car-1.jpg" alt="Card image cap" />
                          <div class="div-pay text-center">{{ car._source.priceText }}</div>
                        </div>
                        <div class="pl-3 pr-3 grid-details-container">
                          <div class="title-container">
                            <p class="text-car-model text-center">{{ car._source.year }} {{ car._source.make }} {{ car._source.model }}</p>
                            <div class="d-flex justify-content-between mb-2">
                              <span class="popular-car-type">{{ car._source.condition | upperCase }}</span>
                              <span class="popular-car-type">{{ car._source.miles }} mls</span>
                            </div>
                          </div>
                          <div class="pt-3 pb-3">
                            <p class="miles my-0 mb-2">Transmission: <b>{{ car._source.transmission | capitalize }}</b></p>
                            <p class="miles my-0 mb-2">Exterior: <b>{{ car._source.exteriorColor | capitalize }}</b></p>
                            <p class="miles my-0 mb-3">Interior: <b>{{ car._source.interiorColor | capitalize }}</b></p>
                          </div>
                          <div class="d-flex justify-content-between mb-3">
                            <a href="javascript:;" class="miles color-primary">Send to my phone</a>
                            <div class="form-check form-check-inline input-container m-0">
                              <label class="form-check-label" :for="'search-compare-' + index">
                                <input class="form-check-input" type="checkbox" :id="'search-compare-' + index" :value="car.name + '-' + index" @change.prevent="editCompareCars($event.target)" :checked="checkCompareCars(car.name + '-' + index)">
                                <span class="checkmark"></span>
                                <span class="font-size-1 line-height-1 text-secondary font-weight-normal">Compare</span>
                              </label>
                            </div>
                          </div>
                          <div class="text-center mb-3">
                            <button class="style-button-form-learn" href="#">More details</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                  <!-- Banner section -->
                  <section class="section-much-get big-boxes-search col-12"  v-if="index === 3 || index === 7">
                    <!-- First banner (4 cars) -->
                    <a class="section-get pr-5 no-underline-hover" href="#!" v-if="index === 3">
                      <div class="big-boxes-image"><img src="../imag/icon-blue.svg" width="160" height="100" alt="Car payment pre-approved"></div>
                      <div class="d-block">
                        <p class="style-container-blue font-size-7 font-weight-3 line-height-120">Save 1 hour at the dealership. Get pre-approved</p>
                      </div>
                    </a>
                    <!-- Second banner (8 cars) -->
                    <a class="section-much pr-5 no-underline-hover" href="#!" v-if="index === 7">
                      <div class="big-boxes-image"><img src="../imag/ico_keys.svg" width="120" height="100" alt="Car trade in value"></div>
                      <span class="style-container-yellow font-size-7 font-weight-3 line-height-120">Find out your car's trade-in value</span>
                    </a>
                  </section>
                </template>
                <div v-else-if="typeView.grid" :key="car._id" v-for="car in matches" class="col-sm-12 p-0 mb-3">
                  <div class="card">
                    <div class="card-body card-body-height d-flex">
                      <div class="grid-image-container">
                        <img class="card-img-top" src="/imag/car-1.jpg" alt="Card image cap" />
                        <div class="div-pay text-center">{{ car._source.priceText }}</div>
                      </div>
                      <div class="pl-3 grid-details-container">
                        <div class="title-container">
                          <p class="text-car-model">{{ car._source.year }} {{ car._source.make }} {{ car._source.model }}</p>
                          <div class="d-flex justify-content-between mb-2">
                            <span class="popular-car-type">{{ car._source.condition | upperCase }}</span>
                            <span class="popular-car-type">{{ car._source.miles }} mls</span>
                          </div>
                        </div>
                        <div class="pl-3 pt-3 pb-3">
                          <p class="miles my-0 mb-2">Transmission: <b>{{ car._source.transmission | capitalize }}</b></p>
                          <p class="miles my-0 mb-2">Exterior: <b>{{ car._source.exteriorColor | capitalize }}</b></p>
                          <p class="miles my-0 mb-3">Interior: <b>{{ car._source.interiorColor | capitalize }}</b></p>
                        </div>
                        <div class="d-flex justify-content-between mb-3">
                          <a href="javascript:;" class="miles color-primary">Send to my phone</a>
                          <div class="form-check form-check-inline input-container m-0">
                            <label class="form-check-label" :for="'search-compare-' + index">
                              <input class="form-check-input" type="checkbox" :id="'search-compare-' + index" :value="car.name + '-' + index" @change.prevent="editCompareCars($event.target)" :checked="checkCompareCars(car.name + '-' + index)">
                              <span class="checkmark"></span>
                              <span class="font-size-1 line-height-1 text-secondary font-weight-normal">Compare</span>
                            </label>
                          </div>
                          <div class="d-flex justify-content-center">
                            <button class="style-button-form-learn" href="#">More details</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button class="back-to-top">Back to top</button>
          <!-- Monthly payment Modal -->
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
                      v-for="rate in filters.monthlyPayments.interestRates"
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
                        <option :value="months" v-for="months in filters.monthlyPayments.months">{{ months }} months</option>
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
          <!-- Email alerts Modal -->
          <div class="modal fade" id="emailAlertModal" tabindex="-1" role="dialog" aria-labelledby="emailAlertModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header pb-0">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body p-0">
                  <div class="w-100 d-flex justify-content-center">
                    <img src="../imag/email_1.svg" alt="email alert">
                  </div>
                  <p class="text-center text-secondary py-3">Get emails alerts with special offers and new vehicles.</p>
                  <hr>
                  <div class="px-4">
                    <div class="form-group">
                      <label class="text-secondary font-weight-3" for="inputEmailAlerts">Email address</label>
                      <input type="email" class="form-control" id="inputEmailAlerts" placeholder="Your email">
                    </div>
                    <div class="d-flex justify-content-center">
                      <button class="style-button-form-learn yellow-button text-white">Notify me</button>
                    </div>
                    <p class="text-center text-secondary font-size-5 py-4">By signing up you accept our <a class="no-underline-hover" href="#!">Terms & Conditions.</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Email alerts Modal -->
          <div class="modal fade" id="emailAlertModal" tabindex="-1" role="dialog" aria-labelledby="emailAlertModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header pb-0">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body p-0">
                  <div class="w-100 d-flex justify-content-center">
                    <img src="../imag/email_1.svg" alt="email alert">
                  </div>
                  <p class="text-center text-secondary py-3">Get emails alerts with special offers and new vehicles.</p>
                  <hr>
                  <div class="px-4">
                    <div class="form-group">
                      <label class="text-secondary font-weight-3" for="inputEmailAlerts">Email address</label>
                      <input type="email" class="form-control" id="inputEmailAlerts" placeholder="Your email">
                    </div>
                    <div class="d-flex justify-content-center">
                      <button class="style-button-form-learn yellow-button text-white">Notify me</button>
                    </div>
                    <p class="text-center text-secondary font-size-5 py-4">By signing up you accept our <a class="no-underline-hover" href="#!">Terms & Conditions.</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- No results Modal -->
          <div class="modal fade" id="noResultsModal" tabindex="-1" role="dialog" aria-labelledby="noResultsModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header pb-0">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body p-0">
                  <div class="w-100 d-flex justify-content-center">
                    <img src="../imag/alert_bell.svg" alt="no results alert">
                  </div>
                  <p class="text-secondary pt-3 px-4 m-0">Oops, it looks like we don't have your perfect match. You could try modifying your search criteria or <a class="no-underline-hover" href="#!">clearing the search filter</a>.</p>
                  <p class="text-secondary pb-3 px-4 m-0">Or, leave your email belowa and we can notify you as soon as a perfect match becomes available.</p>
                  <hr>
                  <div class="px-4">
                    <div class="form-group">
                      <label class="text-secondary font-weight-3" for="inputEmailAlerts">Email address</label>
                      <input type="email" class="form-control" id="inputEmailAlerts" placeholder="Your email">
                    </div>
                    <div class="d-flex justify-content-center">
                      <button class="style-button-form-learn yellow-button text-white">Notify me</button>
                    </div>
                    <p class="text-center text-secondary font-size-5 py-4">By signing up you accept our <a class="no-underline-hover" href="#!">Terms & Conditions.</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#emailAlertModal">
          Email alert Modal
        </button>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#noResultsModal">
          no results Modal
        </button>
      </div>
    `
  })
}