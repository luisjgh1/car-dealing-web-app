const PopularCarsTemplate = `
  <div v-if="popularCars.length">
    <section class="text-center background-pay-car card-mobile">
      <div class="carousel slide" id="carousel-card" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item" v-for="(car, index) in popularCars" :class="{active: index === 0}">
            <div class="card">
              <img class="card-img-top" :src="car.image" alt="Card image cap" />
              <div class="div-pay">{{ car.price }}</div>
              <div class="card-body card-body-height">
                <p class="pre-owned">{{ car.type }}</p>
                <p class="text-pre-owned">{{ car.name }}</p>
                <p class="miles">{{ car.miles }}</p>
                <p class="miles">{{ car.monthlyEstimate }}</p>
                <button class="style-button-form-learn" href="#">{{ car.buttonText }}</button>
              </div>
            </div>
          </div>
        </div>
        <a class="carousel-control-prev" href="#carousel-card" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next" href="#carousel-card" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a>
      </div>
      <button class="btn btn-primary color props-button-card" href="#">VIEW ALL CARS</button>
    </section>
    <section class="text-center background-pay-car card-web">
      <h1 class="paddin">Popular Cars</h1>
      <div class="car-div">
        <div class="row">
          <div class="col" v-for="car in popularCars">
            <div class="card"><img class="card-img-top" :src="car.image" />
              <div class="div-pay">{{ car.price }}</div>
              <div class="card-body card-body-height">
                <p class="pre-owned">{{ car.type }}</p>
                <p class="text-pre-owned">{{ car.name }}</p>
                <p class="miles">{{ car.miles }}</p>
                <p class="miles">{{ car.monthlyEstimate }}</p>
                <button class="style-button-form-learn" href="#">{{ car.buttonText }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="props-button" href="#" role="button">VIEW ALL CARS</button>
    </section>
  </div>
`

  const SearchFormTemplate = `
    <form class="py-1 px-4 form-width" @submit.prevent="submitForm">
      <div class="row padding-check">
        <div class="col-md-4">
          <select class="w-100" id="selectBrand" v-model="form.brand" placeholder="Find brand" @change="onChangeBrand()">
            <option v-for="make in makes" :value="make">{{make}}</option>
          </select>
        </div>
        <div class="col-md-4">
          <select class="w-100" id="selectModel" v-model="form.model" placeholder="Find model">
            <option v-for="model in models" :value="model">{{model}}</option>
          </select>
        </div>
        <div class="col-md-4 d-flex align-items-center justify-content-between">
          <div class="pr-3 pb-1">
            {{form.priceMax}}
          </div>
          <label for="range">{{ priceSliderMinText }}</label>
          <input class="custom-range mx-2" id="customRange" v-model="form.priceMax" type="range" name="range" step="100" :min="priceSliderMin" :max="priceSliderMax" />
          <label for="range">{{ priceSliderMaxText }}</label>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <button class="style-button-form-learn mr-5" type="submit">FIND YOUR NEXT CAR</button><a href="#"></a>
        </div>
      </div>
    </form>
  `

const SearchInputTemplate = `
  <form class="form form-inline my-2 my-lg-0">
    <input class="display-none form-control mr-sm-2 radiu-position input-find" placeholder="Find your next car" v-model="form.query" type="search" />
    <i class=".display-none.fas.fa-microphone.microphone.style-microphone" />
    <img class="display-none search-imag" src="./imag/icon-search.svg" alt="" />
  </form>
`

const mockData = [
  {
    image: './imag/car-1.jpg',
    price: '$22,400',
    type: 'PRE OWNED',
    name: '2018 Chevrolet Tahoe LT',
    miles: '58,369 miles',
    monthlyEstimate: 'Finance: $439 est/month',
    buttonText: 'SHOW MORE'
  },
  {
    image: './imag/car-2.jpg',
    price: '$24,100',
    type: 'PRE OWNED',
    name: '2018 Chevrolet Tahoe LT',
    miles: '58,369 miles',
    monthlyEstimate: 'Finance: $439 est/month',
    buttonText: 'SHOW MORE'
  },
  {
    image: './imag/car-3.jpg',
    price: '$24,100',
    type: 'PRE OWNED',
    name: '2018 Chevrolet Tahoe LT',
    miles: '58,369 miles',
    monthlyEstimate: 'Finance: $439 est/month',
    buttonText: 'SHOW MORE'
  },
  {
    image: './imag/car-4.jpg',
    price: '$34,100',
    type: 'PRE OWNED',
    name: '2018 Chevrolet Tahoe LT',
    miles: '58,369 miles',
    monthlyEstimate: 'Finance: $439 est/month',
    buttonText: 'SHOW MORE'
  }
]

window.onload = function () {
  // popular cars component
  Vue.component('popular-cars', {
    template: PopularCarsTemplate,
    data() {
      return {
        popularCars: []
      }
    },
    created() {
      this.fetchPopularCars()
    },
    methods: {
      fetchPopularCars: async function () {
        console.log('fetching')
        this.popularCars = mockData
      }
    }
  })

  Vue.component('search-form', {
    template: SearchFormTemplate,
    data() {
      return {
        selectBrandRef: null,
        priceSliderMinText: '3K',
        priceSliderMin: 3000,
        priceSliderMaxText: '50K',
        priceSliderMax: 50000,
        results: [],
        makes: [],
        models: [],
        form: {
          priceMax: 3000,
          brand: '',
          model: ''
        }
      }
    },
    methods: {
      onChangeBrand: async function({ target: { value: brand } }) {
        this.form.brand = brand
        this.models = await this.fetchModels(brand)
        this.selectModelRef.select2({
          placeholder: 'Select some model',
          disabled: false
        })
      },
      onChangeModel: async function({ target: { value: model } }) {
        this.form.model = model
      },
      submitForm: function() {
        console.log('submitting form', this.form)
      },
      search: async function() {
        const results = await axios.get(`https://us-central1-ignition-225318.cloudfunctions.net/api/ford/search/${this.query}`)
        this.results = results
      },
      fetchMakes: async function() {
        const { data } = await axios.get(`https://us-central1-ignition-225318.cloudfunctions.net/api/ford/makes`)
        return data.map(e => e.make)
      },
      fetchModels: async function(make) {
        const { data } = await axios.get(`https://us-central1-ignition-225318.cloudfunctions.net/api/ford/makes/${make}/models`)
        return data.map(e => e.model)
      }
    },
    async mounted() {
      this.selectBrandRef = $('#selectBrand')
      this.selectModelRef = $('#selectModel')
      this.selectBrandRef.select2({ placeholder: 'Loading', disabled: true })
      this.selectModelRef.select2({ placeholder: 'Select brand first', disabled: true })
      this.makes = await this.fetchMakes()
      this.selectBrandRef.select2({
        placeholder: 'Select some brand',
        disabled: false
      })

      this.selectBrandRef.on('select2:select', this.onChangeBrand.bind(this));
      this.selectModelRef.on('select2:select', this.onChangeModel.bind(this));
    }
  })

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

  new Vue({
    el: '#search-form',
  })

  new Vue({
    el: '#popular-cars',
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