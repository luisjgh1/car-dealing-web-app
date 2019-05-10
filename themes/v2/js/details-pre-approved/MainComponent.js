import ContactDetailsComponent from './ContactDetailsComponent';
import ApplicationComponent from './ApplicationComponent';
import ConfirmationComponent from './ConfirmationComponent';
import PopularCarsComponent from '../popular-cars/PopularCarsComponent';

const stepsIndicators = [
  {
    name: 'Contact Details', classes: ['item-current'], dataLabel: 'contactDetailsData'
  },
  {
    name: 'Application', classes: ['item-undone'], dataLabel: 'applicationData'
  },
  {
    name: 'Confirmation', classes: ['item-undone'], dataLabel: 'confirmationData'
  }
];

const mockData = {
  image: '../imag/car-1.jpg',
  name: 'New 2018 Ford Edge LT XTE Auto',
  price: '$34,500',
  discountPrice: '$29,890',
  vin: '55SWF8EB7KU286157'
}

window.onload = function () {
  new Vue({
    el: '#details-pre-approved',
    data() {
      return {
        currentModalItem: 0,
        stepsIndicators: stepsIndicators,
        // Selected Car
        selectedCar: {},
        // Financing form
        form: {
          car: 'Ford Edge',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        },
        pagesData: {
          // First form slide
          contactDetailsData: firstPageData,
          // Second form slide
          applicationData: secondPageData,
          // Third form slide
          confirmationData: thirdPageData,
        }
      }
    },
    created() {
      this.fetchSelectedCar();
    },
    methods: {
      fetchSelectedCar() {
        this.selectedCar = mockData;
      },
      getBackgroundColor() {
        if(this.currentModalItem === 0) return ['background-gradient-vertical-white-gray'];
        return ['background-light-gray'];
      },
      updateData(event) {
        if(event.parent) {
          this.form[event.parent][event.field] = event.value;
          return;
        }
        this.form[event.field] = event.value;
      },
      scrollItem(index, next) {
        if (index <= this.currentModalItem || next) {
          $('#preApprovalCarousel').carousel(index);
          this.currentModalItem = index;
          this.stepsIndicators.forEach((item, itemIndex) => {
            if(itemIndex < index) item.classes = ['item-done'];
            if(itemIndex === index) item.classes = ['item-current'];
            if(itemIndex > index) item.classes = ['item-undone'];
          });
        }
      },
      formatNumber(number, symbol) {
        return symbol + number.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
      },
      // Application form
      submitFormAndScroll(event) {
        this.form = Object.assign(this.form, event)
        this.scrollItem(2, true)
      }
    },
    components: {
      contactDetails: ContactDetailsComponent,
      application: ApplicationComponent,
      confirmation: ConfirmationComponent,
      popularCars: PopularCarsComponent,
    },
    template: `
      <div class="bg-white">
        <div :class="getBackgroundColor()">
          <div class="container py-5">
            <div class="row">
              <div class="col-md-3">
                <div class="card p-4 background-primary-color text-white mb-4 mb-md-0">
                  <p class="font-weight-bold font-italic">Your car of interest</p>
                  <img :src="selectedCar.image" alt="car of interest" class="img-fluid mb-4">
                  <p class="yellow-underline font-weight-bold font-size-2">{{ selectedCar.name }}</p>
                  <del class="font-size-1">Price: {{ selectedCar.price }}</del>
                  <p class="font-weight-3 font-size-1 m-0">Sale Price: {{ selectedCar.discountPrice }}</p>
                  <p class="font-size-1 m-0">VIN: {{ selectedCar.vin }}</p>
                </div>
              </div>
              <div class="col-md-9">
                <div class="text-center">
                  <h2 v-if="pagesData[stepsIndicators[currentModalItem].dataLabel].title" class="text-secondary-blue font-weight-3">{{ pagesData[stepsIndicators[currentModalItem].dataLabel].title }}</h2>
                  <p v-if="pagesData[stepsIndicators[currentModalItem].dataLabel].subtitle" class="text-secondary font-weight-3">{{ pagesData[stepsIndicators[currentModalItem].dataLabel].subtitle }}</p>
                </div>
                <div class="row">
                  <div class="col-md-6 offset-md-3">
                    <div class="schedule-indicators px-5 pt-3 pb-5">
                      <div class="background-line w-sm-60 w-md-70"></div>
                      <div
                      class="indicator" :class="item.classes"
                      v-for="(item, index) in stepsIndicators"
                      @click="scrollItem(index)"
                      >
                      <span v-if="index >= currentModalItem">{{ index+1 }}</span>
                      <span v-else>&zwnj;</span>
                      <p class="indicator-label">{{ item.name }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="preApprovalCarousel" class="carousel slide" data-ride="carousel" data-interval="false">
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <contact-details :formData="pagesData.contactDetailsData.contactDetails" @changed="updateData($event)" @next="scrollItem(1, true)"></contact-details>
                    </div>
                    <div class="carousel-item">
                      <application :formData="pagesData.applicationData.application" @next="submitFormAndScroll($event)"></application>
                    </div>
                    <div class="carousel-item">
                      <confirmation :confirmationData="pagesData.confirmationData" :form="form"></confirmation>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- First page content -->
        <template v-if="currentModalItem === 0">
          <div class="container pt-5">
            <div class="row mb-4">
              <div class="col-md-10 offset-md-1">
                <h2 class="text-center text-secondary-blue">{{ pagesData.contactDetailsData.preApprovedFeatures.title }}</h2>
                <p class="text-secondary text-center font-size-1">{{ pagesData.contactDetailsData.preApprovedFeatures.subtitle }}</p>
              </div>
            </div>
            <div class="row pt-3 pb-5">
              <div class="col-md-6 py-2 py-md-1" v-for="item in pagesData.contactDetailsData.preApprovedFeatures.items">
                <div class="row">
                  <div class="col-2">
                    <div class="d-flex align-items-center h-100"><img class="img-fluid rounded-circle" :src="item.image"/></div>
                  </div>
                  <div class="col-10">
                    <p class="text-secondary-gray font-weight-bold mb-1">{{ item.title }}</p>
                    <p class="text-secondary font-size-1">{{ item.subtitle }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row m-0">
            <div class="col-md-6 p-0 overflow-hidden visible-lg">
              <img class="img-fluid w-100 absolute-vertical-center position-absolute" :src="pagesData.contactDetailsData.procedureIndications.leftImage" alt="car image">
            </div>
            <div class="col-md-6 p-0 background-primary-color">
              <div class="px-5 py-3">
                <p class="font-size-3 text-white font-weight-2">{{ pagesData.contactDetailsData.procedureIndications.title }}</p>
                <div class="row" v-for="item in pagesData.contactDetailsData.procedureIndications.items">
                  <div class="col-2">
                    <img :src="item.image" alt="car icon images" class="img-fluid">
                  </div>
                  <div class="col-10">
                    <p class="text-white font-weight-bold">{{ item.title }}</p>
                    <p class="text-white font-size-1">{{ item.text }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container py-5">
            <div class="row">
              <div class="col-md-10 offset-md-1">
                <h2 class="text-center text-secondary-blue">{{ pagesData.contactDetailsData.faq.title }}</h2>
                <p class="text-secondary text-center font-size-1">{{ pagesData.contactDetailsData.faq.subtitle }}</p>
              </div>
            </div>
            <div class="accordion" id="faq">
              <div class="faq-card" v-for="(item, index) in pagesData.contactDetailsData.faq.items">
                <div class="faq-card-header collapsed" :id="'heading-'+index" data-toggle="collapse" :data-target="'#collapse-' + index" aria-expanded="false" :aria-controls="'collapse-' + index">
                  <h5 class="mb-0 pr-2">{{ item.title }}</h5>
                </div>
                <div :id="'collapse-' + index" class="faq-card-content collapse" :aria-labelledby="'heading-'+index" data-parent="#faq">
                  <div class="card-body text-secondary">{{ item.text }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <!-- Third page content -->
        <div class="background-gray" v-if="currentModalItem === 2">
          <div class="container">
            <popular-cars viewRelatedCars></popular-cars>
          </div>
        </div>
      </div>
    `
  });
}