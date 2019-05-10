const bodyTypes = [
  { name: 'Sedan', cars: 176 },
  { name: 'SUV', cars: 54 },
  { name: 'Pickup', cars: 63 },
  { name: 'Hatchback', cars: 12 },
  { name: 'Minivan', cars: 8 },
  { name: 'Coupe', cars: 9 },
  { name: 'Wagon', cars: 18 },
  { name: 'Convertible', cars: 5 },
]

window.onload = function () {
  new Vue({
    el: '#bodytype',
    data() {
      return {
        bodyTypes: [],
        carCondition: 'new'
      }
    },
    mounted() {
      this.fetchBodyType()
    },
    methods: {
      fetchBodyType() {
        this.bodyTypes = bodyTypes
      },
      changeCarCondition(activeCarCondition) {
        this.carCondition = activeCarCondition
      },
      activeTabClasses(activeCarCondition) {
        if(activeCarCondition === this.carCondition) return [ 'text-primary-color' ];
        return [ 'full-yellow-underline', 'text-secondary' ];
      },
    },
    template: `
    <div class="container py-5">
      <div class="d-flex justify-content-center">
        <span class="cursor-pointer font-weight-3 px-3" :class="activeTabClasses('pre-owned')" @click="changeCarCondition('new')">New cars</span>
        <span>|</span>
        <span class="cursor-pointer font-weight-3 px-3" :class="activeTabClasses('new')" @click="changeCarCondition('pre-owned')">Pre-owned cars</span>
      </div>
      <div class="row">
        <div class="col-6 col-md-3 my-4" v-for="bodyType in bodyTypes">
          <a :href="'#!' + bodyType.name.toLowerCase()" class="no-underline-hover">
            <div class="background-gray h-100 py-5 position-relative">
              <img :src="'../imag/' + bodyType.name.toLowerCase() + '-thumbnail.png'" :alt="bodyType.name + ' body type'" class="img-fluid position-absolute absolute-center img-black-and-white">
            </div>
            <p class="text-center text-secondary-blue font-weight-3">{{ bodyType.name }}<span class="font-weight-normal">({{ bodyType.cars }})</span></p>
          </a>
        </div>
      </div>
      <div class="row justify-content-center pt-5 pb-2">
        <div class="col-7 col-md-3 px-0 px-md-5">
          <div class="style-button-form-learn">
            See all our {{ carCondition }} cars
          </div>
        </div>
      </div>
    </div>
    `
  });
}