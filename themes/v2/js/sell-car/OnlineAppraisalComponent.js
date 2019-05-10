import Datepicker from 'vuejs-datepicker';

const scheduleModalItems = [
  {
    name: 'Contact Details',
    classes: ['item-current']
  },
  {
    name: 'Car Details',
    classes: ['item-undone']
  },
  {
    name: 'Photos',
    classes: ['item-undone']
  }
];

const availableTimes = {
  morning: [
    { time: '12:00PM', available: false },
    { time: '12:30PM', available: false },
    { time: '1:00PM', available: false },
    { time: '1:30PM', available: true },
    { time: '2:00PM', available: false },
  ],
  afternoon: [
    { time: '3:00PM', available: false },
    { time: '3:30PM', available: false },
    { time: '3:45PM', available: true },
    { time: '4:00PM', available: true },
    { time: '4:30PM', available: true },
  ],
  evening: [
    { time: '4:45PM', available: true },
  ]
}

const brands = [
  { value: 'Chevrolet', name: 'Chevrolet' },
  { value: 'Acura', name: 'Acura' },
  { value: 'BMW', name: 'BMW' },
  { value: 'Ford', name: 'Ford' },
  { value: 'Honda', name: 'Honda' },
  { value: 'Jeep', name: 'Jeep' },
  { value: 'Audi', name: 'Audi' },
  { value: 'Toyota', name: 'Toyota' },
  { value: 'Kia', name: 'Kia' },
];

const models = [
  { value: 'BoltEV', name: 'Bolt EV' },
  { value: 'Camaro', name: 'Camaro' },
  { value: 'CityExpress', name: 'City Express' },
  { value: 'Colorado', name: 'Colorado' },
  { value: 'Corvette', name: 'Corvette' },
  { value: 'Cruze', name: 'Cruze' },
];

const conditions = [
  { name: 'New', value: 'new' },
  { name: 'Pre-owned', value: 'pre-owned' },
  { name: 'Certified pre-owned', value: 'certified-pre-owned' },
];

export default {
  name: 'onlineAppraisal',
  template: `
  <!-- Modal -->
  <div class="modal fade" id="onlineAppraisalModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header justify-content-between">
          <span></span>
          <h5 class="modal-title text-dark font-weight-bold font-italic text-center" id="exampleModalLabel">Get a Free Appraisal Online</h5>
          <button type="button" class="close ml-0" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body p-0">
          <div class="background-gradient-white-gray">
            <div class="row">
              <div class="col-md-8 offset-md-2 p-md-0">
                <div class="schedule-indicators mx-5 mx-md-0 pt-3 pb-5">
                  <div class="background-line"></div>
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
            </div>
          </div>
          <div id="onlineAppraisalCarousel" class="carousel slide" data-ride="carousel" data-interval="false">
            <div class="carousel-inner">
              <div class="carousel-item" v-for="(item, index) in scheduleModalItems" :class="{active: index === 0}">
                <!-- Contact Detail -->
                <template v-if="index === 0">
                  <div class="row p-4 py-md-4 px-md-5">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="firstName">First name</label>
                        <input v-model="form.firstName" type="text" class="form-control" id="firstName" placeholder="First name">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="lastName">Last name</label>
                        <input v-model="form.lastName" type="text" class="form-control" id="lastName" placeholder="Last name">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="email">Email address</label>
                        <input v-model="form.email" type="email" class="form-control" id="email" placeholder="email@domain.com">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="phone">Phone number</label>
                        <input v-model="form.phone" type="tel" class="form-control" id="phone" placeholder="xxx-xxx-xxxx">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 offset-md-6 my-4 w-max mx-auto mr-md-0">
                      <button type="button" class="style-button-form-learn m-0 w-max" @click="scrollItem((currentModalItem + 1), true)">Next</button>
                    </div>
                  </div>
                </template>
                <!-- Car Details -->
                <template v-if="index === 1">
                  <div class="px-4 py-3">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <select class="form-control">
                            <option value="" disabled="" selected="">Car Brand</option>
                            <option :value="brand.value" v-for="brand in brands">{{ brand.name }}</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <select class="form-control">
                            <option value="" disabled="" selected="">Car Model</option>
                            <option :value="model.value" v-for="model in models">{{ model.name }}</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Mileage</label>
                          <div class="input-group">
                            <input v-model="form.mileage" class="form-control m-0">
                            <div class="input-group-append">
                              <div class="input-group-text">miles</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>VIN</label>
                          <input v-model="form.vin" class="form-control">
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <select class="form-control">
                            <option value="" disabled="" selected="">Select Year</option>
                            <option :value="getInputYear(index)" v-for="index in 20">{{ getInputYear(index) }}</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <select class="form-control">
                            <option value="" disabled="" selected="">Select Condition</option>
                            <option :value="condition.value" v-for="condition in conditions">{{ condition.name }}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-content-center align-items-center w-100 my-4">
                      <span class="text-primary-color no-underline-hover font-weight-bold mx-3 cursor-pointer" href="#!" @click="scrollItem(currentModalItem - 1)">Back</span>
                      <button type="button" class="style-button-form-learn w-max" @click="scrollItem((currentModalItem + 1), true)">Save</button>
                    </div>
                  </div>
                </template>
                <!-- Photos -->
                <template v-if="index === 2">
                  <div class="row py-0 py-md-4 px-5">
                    <div class="col-6 col-md-2 p-1">
                      <div class="photos-file-container">
                        <div class="photos-file-input">
                          <input class="w-100" type="file" id="exterior-front" @change="onFileChange($event, 'exteriorFront')">
                        </div>
                        <div class="uploaded-img" v-if="form.photos.exteriorFront">
                          <span class="float-right font-size-3 line-height-1 mt-2 mr-2 cursor-pointer" @click="removeImage('exteriorFront')">&times;</span>
                          <img :src="form.photos.exteriorFront" class="img-fluid">
                        </div>
                        <div v-else class="placeholder-span text-secondary p-3">
                          <i class="fa fa-camera"></i>
                          <p class="font-size-4">Exterior Front</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-6 col-md-2 p-1">
                      <div class="photos-file-container">
                        <div class="photos-file-input">
                          <input class="w-100" type="file" id="exterior-back" @change="onFileChange($event, 'exteriorBack')">
                        </div>
                        <div class="uploaded-img" v-if="form.photos.exteriorBack">
                          <span class="float-right font-size-3 line-height-1 mt-2 mr-2 cursor-pointer" @click="removeImage('exteriorBack')">&times;</span>
                          <img :src="form.photos.exteriorBack" class="img-fluid">
                        </div>
                        <div v-else class="placeholder-span text-secondary p-3">
                          <i class="fa fa-camera"></i>
                          <p class="font-size-4">Exterior Back</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-6 col-md-2 p-1">
                      <div class="photos-file-container">
                        <div class="photos-file-input">
                          <input class="w-100" type="file" id="left-side" @change="onFileChange($event, 'leftSide')">
                        </div>
                        <div class="uploaded-img" v-if="form.photos.leftSide">
                          <span class="float-right font-size-3 line-height-1 mt-2 mr-2 cursor-pointer" @click="removeImage('leftSide')">&times;</span>
                          <img :src="form.photos.leftSide" class="img-fluid">
                        </div>
                        <div v-else class="placeholder-span text-secondary p-3">
                          <i class="fa fa-camera"></i>
                          <p class="font-size-4">Left Side</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-6 col-md-2 p-1">
                      <div class="photos-file-container">
                        <div class="photos-file-input">
                          <input class="w-100" type="file" id="right-side" @change="onFileChange($event, 'rightSide')">
                        </div>
                        <div class="uploaded-img" v-if="form.photos.rightSide">
                          <span class="float-right font-size-3 line-height-1 mt-2 mr-2 cursor-pointer" @click="removeImage('rightSide')">&times;</span>
                          <img :src="form.photos.rightSide" class="img-fluid">
                        </div>
                        <div v-else class="placeholder-span text-secondary p-3">
                          <i class="fa fa-camera"></i>
                          <p class="font-size-4">Right Side</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-6 col-md-2 p-1">
                      <div class="photos-file-container">
                        <div class="photos-file-input">
                          <input class="w-100" type="file" id="interior-front" @change="onFileChange($event, 'interiorFront')">
                        </div>
                        <div class="uploaded-img" v-if="form.photos.interiorFront">
                          <span class="float-right font-size-3 line-height-1 mt-2 mr-2 cursor-pointer" @click="removeImage('interiorFront')">&times;</span>
                          <img :src="form.photos.interiorFront" class="img-fluid">
                        </div>
                        <div v-else class="placeholder-span text-secondary p-3">
                          <i class="fa fa-camera"></i>
                          <p class="font-size-4">Interior Front</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-6 col-md-2 p-1">
                      <div class="photos-file-container">
                        <div class="photos-file-input">
                          <input class="w-100" type="file" id="interior-back" @change="onFileChange($event, 'interiorBack')">
                        </div>
                        <div class="uploaded-img" v-if="form.photos.interiorBack">
                          <span class="float-right font-size-3 line-height-1 mt-2 mr-2 cursor-pointer" @click="removeImage('interiorBack')">&times;</span>
                          <img :src="form.photos.interiorBack" class="img-fluid">
                        </div>
                        <div v-else class="placeholder-span text-secondary p-3">
                          <i class="fa fa-camera"></i>
                          <p class="font-size-4">Interior Back</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row px-5 pb-md-4" v-if="extraPhotos">
                    <div class="col-6 col-md-2 p-1" v-for="(photo, index) in form.extraPhotos">
                      <div class="photos-file-container">
                        <div class="photos-file-input">
                          <input class="w-100" type="file" id="interior-back" @change="extraImageOnFileChange($event, index)">
                        </div>
                        <div class="uploaded-img" v-if="photo">
                          <span class="float-right font-size-3 line-height-1 mt-2 mr-2 cursor-pointer" @click="extraImageRemoveImage(index)">&times;</span>
                          <img :src="photo" class="img-fluid">
                        </div>
                        <div v-else class="placeholder-span text-secondary p-3">
                          <i class="fa fa-camera"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p v-if="!extraPhotos" class="text-right cursor-pointer text-secondary-blue font-weight-2 pr-5" @click="toggleExtraPhotos()">+ Add more photos</p>
                  <p v-if="extraPhotos" class="text-right cursor-pointer text-secondary-blue font-weight-2 pr-5" @click="toggleExtraPhotos()">- Hide more photos</p>
                  <div class="d-flex justify-content-center align-items-center w-100 my-4">
                    <span class="text-primary-color no-underline-hover font-weight-bold mx-3 cursor-pointer" href="#!" @click="scrollItem(currentModalItem - 1)">Back</span>
                    <button type="button" class="style-button-form-learn w-max m-0" @click="scrollItem((currentModalItem + 1), true)">Save</button>
                  </div>
                </template>
              </div>
              <!-- Confirmation -->
              <div class="carousel-item">
                <div class="row justify-content-center">
                  <div class="col-md-8">
                    <p class="text-center px-5 py-3">Thanks {{ form.firstName }}.<br>We'll send you an appraisal for your car to <span class="font-weight-3">{{ form.email }}</span> within 3 business days.</p>
                  </div>
                </div>
                <div class="d-flex justify-content-center pb-4">
                  <button type="button" class="style-button-form-learn no-after px-4 py-2 w-max my-0 mx-auto" @click="scrollItem((currentModalItem + 1), true)">OK</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        brand: '',
        model: '',
        mileage: '',
        vin: '',
        year: '',
        condition: '',
        comments: '',
        photos: {
          exteriorFront: '',
          exteriorBack: '',
          leftSide: '',
          rightSide: '',
          interiorFront: '',
          interiorBack: '',
        },
        extraPhotos: [ '', '', '', '', '', '' ]
      },
      scheduleModalItems: [],
      currentModalItem: 0,
      availableTimes: {},
      disabledDates: {
        to: new Date(Date.now() - 8640000)
      },
      phoneNumber: phoneNumber,
      brands: [],
      models: [],
      conditions: [],
      extraPhotos: false,
    }
  },
  mounted() {
    this.fetchInputData()
  },
  methods: {
    fetchInputData() {
      this.scheduleModalItems = scheduleModalItems
      this.availableTimes = availableTimes
      this.brands = brands
      this.models = models
      this.conditions = conditions
    },
    submitForm: function() {
      console.log('submitting form', this.form)
    },
    handleOpenModal(modalName) {
      $(modalName).appendTo("body").modal('show');
    },
    scrollItem(index, next) {
      if ((index <= this.currentModalItem) || next) {
        if(index > this.scheduleModalItems.length) {
          $('#onlineAppraisalModal').modal('hide');
          index = 0;
        }
        $('#onlineAppraisalCarousel').carousel(index);
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
        this.form.time = time.time;
      }
    },
    formatDate(date, dateFormat) {
      return moment(date, 'x').format(dateFormat);
    },
    getInputYear(index) {
      return moment().year() - (index-1);
    },
    onFileChange(e, imageName) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0], imageName);
    },
    createImage(file, imageName) {
      var image = new Image();
      var reader = new FileReader();
      var self = this;

      reader.onload = (e) => {
        self.form.photos[imageName] = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage(imageName) {
      this.form.photos[imageName] = '';
    },
    extraImageOnFileChange(e, index) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.extraImageCreateImage(files[0], index);
    },
    extraImageCreateImage(file, index) {
      var image = new Image();
      var reader = new FileReader();
      var self = this;

      reader.onload = (e) => {
        self.form.extraPhotos.splice(index, 1, e.target.result);
      };
      reader.readAsDataURL(file);
    },
    extraImageRemoveImage(index) {
      this.form.extraPhotos[index] = '';
    },
    toggleExtraPhotos() {
      this.extraPhotos = !this.extraPhotos
    }
  },
  components: {
    vueDatepicker: Datepicker,
  }
}