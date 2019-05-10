import Datepicker from 'vuejs-datepicker'; 

const carServices = [
  'Oil change',
  'Tire check',
  'Air filter replacement',
  'Spark plugs replacement'
];

const scheduleModalItems = [
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
];

const availableTimes = {
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
};

window.onload = function () {
  new Vue({
    el: '#book-service',
    data() {
      return {
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
        services: [],
        scheduleModalItems: scheduleModalItems,
        currentModalItem: 1,
        availableTimes: {},
        disabledDates: { 
          to: new Date(Date.now() - 8640000)
        }
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        this.services = carServices;
        this.availableTimes = availableTimes;
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
        return moment(date, 'X').format(dateFormat);
      }
    },
    components: { 
      vueDatepicker: Datepicker,
    },
    template: `
    <div class="d-block">
      <form @submit.prevent="handleOpenModal()">
        <div class="form-group">
          <select class="form-control mr-0 mr-md-2" v-model="serviceForm.service" required>
            <option value="" disabled selected>Select type of service needed</option>
            <option v-for="service in services">{{ service }}</option>
          </select>
          <button type="submit" class="style-button-form-learn yellow-button ml-4 ml-md-0 mt-3">Next</button>
        </div>
      </form>
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
  });
}