const mileages = [
  { amount: 10000, kms: 256 },
  { amount: 50000, kms: 360 },
  { amount: 100000, kms: 650 },
  { amount: 150000, kms: 870 },
  { amount: 200000, kms: 1100 },
  { amount: 300000, kms: 1150 },
];

const colors = [
  { text: 'Black', value: 'black' },
  { text: 'White', value: 'white' },
];

const bodies = [
  { name: 'Sedan' },
  { name: 'SUV' },
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
];

const conditions = [
  { name: 'New', value: 'new' },
  { name: 'Pre-owned', value: 'pre-owned' },
  { name: 'Certified pre-owned', value: 'certified-pre-owned' },
];

const transmissions = [
  { name: 'Automatic' },
  { name: 'Manual' },
]

window.onload = function () {
  new Vue({
    el: '#app',
    data() {
      return {
        matches: [],
        car: {
          image: 'https://via.placeholder.com/150',
          price: '30000',
          type: 'Pre owned',
          name: 'Chevrolet LT',
          miles: 30000,
          monthlyEstimate: '$200',
          buttonText: 'Find out more',
        },
        filters: {
          matches: 0,
          minYear: 2000,
          maxYear: 2020,
          makes: [],
          models: [],
          conditions: [],
          interiorColors: [],
          exteriorColors: [],
          transmissions: [],
          mileages: [],
          bodies: [],
        },
        form: {
          conditions: ['new'],
          makes: [],
          models: [],
          transmissions: [],
          mileages: [],
          bodies: [],
          year: 2012,
          minPrice: null,
          maxPrice: null,
          exteriorColor: 'black',
          interiorColor: 'black',
        },
      }
    },
    created() {
      this.fetchFilters();
    },
    methods: {
      fetchFilters() {
        this.filters.makes = makes;
        this.filters.models = models;
        this.filters.mileages = mileages;
        this.filters.interiorColors = colors;
        this.filters.exteriorColors = colors;
        this.filters.bodies = bodies;
        this.filters.conditions = conditions;
        this.filters.transmissions = transmissions;
      },
      clearFilters() {
        console.log('Clearing')
      },
    },
    watch: {
      form: function (newValue) {
        console.log('new value', newValue)
      }
    },
    template: `
    <div class="container-fluid background-gray pt-4">
      <div class="row">
        <div class="col-3 filters-container p-0 pb-4">
          <div class="d-flex justify-content-between px-4 align-items-center p-4">
            <strong>{{ filters.matches }} Matches</strong>
            <a href="javascript:;" @click="clearFilters">
              <small>Clear filter</small>
            </a>
          </div>
          <section class="top-divider">
            <h5>Vehicle condition</h5>
            <ul class="unstyled">
              <li :key="condition.value" v-for="condition in filters.conditions">
                <input :id="condition.name" type="checkbox">
                <label :for="condition.name">{{ condition.name }}</label>
              </li>
            </ul>
          </section>
          <section class="top-divider">
            <h5>Year</h5>
            <p v-text="form.year"></p>
            <div class="d-flex justify-content-center">
              <input type="range" :min="filters.minYear" :max="filters.maxYear" v-model="form.year">
            </div>
          </section>
          <section class="top-divider">
            <h5>Price</h5>
            <div class="form-group">
              <input
                class="form-control"
                type="number"
                min="0"
                v-model="form.minPrice"
                placeholder="Min price"
                :style="{ flex: 1 }"
              >
            </div>
            <div class="form-group">
              <input
                class="form-control"
                type="number"
                min="0"
                v-model="form.maxPrice"
                placeholder="Max price"
                :style="{ flex: 1 }"
              >
            </div>
          </section>
          <section class="top-divider">
            <h5>Make</h5>
            <ul class="fixed-height unstyled">
              <li :key="make.name" v-for="make in filters.makes" class="d-flex align-items-center">
                <input :id="make.name" type="checkbox" class="mr-1">
                <label :for="make.name">{{ make.name }}</label>
              </li>
            </ul>
          </section>
          <section class="top-divider">
            <h5>Model</h5>
            <ul class="fixed-height unstyled">
              <li :key="model.name" v-for="model in filters.models" class="d-flex align-items-center">
                <input :id="model.name" type="checkbox" class="mr-1">
                <label :for="model.name">{{ model.name }}</label>
              </li>
            </ul>
          </section>
          <section class="top-divider">
            <h5>Exterior color</h5>
            <ul class="fixed-height unstyled">
              <select
                v-model="form.exteriorColor"
              >
                <option v-for="color in filters.exteriorColors">{{ color.text }}</option>
              </select>
            </ul>
          </section>
          <section class="top-divider">
            <h5>Interior color</h5>
            <ul class="fixed-height unstyled">
              <select
                v-model="form.interiorColor"
              >
                <option v-for="color in filters.interiorColors">{{ color.text }}</option>
              </select>
            </ul>
          </section>
          <section class="top-divider">
            <h5>Body</h5>
            <ul class="fixed-height unstyled">
              <li :key="body.name" v-for="body in filters.bodies" class="d-flex align-items-center">
                <input :id="body.name" type="checkbox" class="mr-1">
                <label :for="body.name"> {{ body.name }}</label>
              </li>
            </ul>
          </section>
          <section class="top-divider">
            <h5>Transmission</h5>
            <ul class="fixed-height unstyled">
              <li :key="transmission.name" v-for="transmission in filters.transmissions" class="d-flex align-items-center">
                <input :id="transmission.name" type="checkbox" class="mr-1">
                <label :for="transmission.name">{{ transmission.name }}</label>
              </li>
            </ul>
          </section>
          <section class="top-divider">
            <h5>Mileage</h5>
            <ul class="fixed-height unstyled">
              <li :key="mileage.kms" v-for="mileage in filters.mileages" class="d-flex align-items-center">
                <input :id="mileage.amount" type="checkbox" class="mr-1">
                <label :for="mileage.amount">
                  {{ mileage.amount }} or less ({{ mileage.kms }})
                </label>
              </li>
            </ul>
          </section>
        </div>
        <div class="col-9 px-4 background-gray">
          <div class="row">
            <div class="col-4 p-0 mb-3">
              <div class="card">
                <img class="card-img-top" :src="car.image" alt="Card image cap" />
                <div class="div-pay">{{ car.price }}</div>
                <div class="card-body card-body-height">
                  <p class="popular-car-type">{{ car.type }}</p>
                  <p class="text-car-model">{{ car.name }}</p>
                  <span class="miles">{{ car.miles }}</span>
                  <p class="miles">Finance it for {{ car.monthlyEstimate }} est/mo</p>
                  <button class="style-button-form-learn" href="#">{{ car.buttonText }}</button>
                </div>
              </div>
            </div>
            <div class="col-4 p-0 mb-3">
              <div class="card">
                <img class="card-img-top" :src="car.image" alt="Card image cap" />
                <div class="div-pay">{{ car.price }}</div>
                <div class="card-body card-body-height">
                  <p class="popular-car-type">{{ car.type }}</p>
                  <p class="text-car-model">{{ car.name }}</p>
                  <span class="miles">{{ car.miles }}</span>
                  <p class="miles">Finance it for {{ car.monthlyEstimate }} est/mo</p>
                  <button class="style-button-form-learn" href="#">{{ car.buttonText }}</button>
                </div>
              </div>
            </div>
            <div class="col-4 p-0 mb-3">
              <div class="card">
                <img class="card-img-top" :src="car.image" alt="Card image cap" />
                <div class="div-pay">{{ car.price }}</div>
                <div class="card-body card-body-height">
                  <p class="popular-car-type">{{ car.type }}</p>
                  <p class="text-car-model">{{ car.name }}</p>
                  <span class="miles">{{ car.miles }}</span>
                  <p class="miles">Finance it for {{ car.monthlyEstimate }} est/mo</p>
                  <button class="style-button-form-learn" href="#">{{ car.buttonText }}</button>
                </div>
              </div>
            </div>
            <div class="col-4 p-0 mb-3">
              <div class="card">
                <img class="card-img-top" :src="car.image" alt="Card image cap" />
                <div class="div-pay">{{ car.price }}</div>
                <div class="card-body card-body-height">
                  <p class="popular-car-type">{{ car.type }}</p>
                  <p class="text-car-model">{{ car.name }}</p>
                  <span class="miles">{{ car.miles }}</span>
                  <p class="miles">Finance it for {{ car.monthlyEstimate }} est/mo</p>
                  <button class="style-button-form-learn" href="#">{{ car.buttonText }}</button>
                </div>
              </div>
            </div>
            <div class="col-4 p-0 mb-3">
              <div class="card">
                <img class="card-img-top" :src="car.image" alt="Card image cap" />
                <div class="div-pay">{{ car.price }}</div>
                <div class="card-body card-body-height">
                  <p class="popular-car-type">{{ car.type }}</p>
                  <p class="text-car-model">{{ car.name }}</p>
                  <span class="miles">{{ car.miles }}</span>
                  <p class="miles">Finance it for {{ car.monthlyEstimate }} est/mo</p>
                  <button class="style-button-form-learn" href="#">{{ car.buttonText }}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  })
}