import Datepicker from 'vuejs-datepicker'
import vueSlider from 'vue-slider-component'
import PopularCarsComponent from '../popular-cars/PopularCarsComponent'
import axios from 'axios'
import { serverUrls } from '../config'

const firstStep = `
    <div v-if="step === 1" class="modal-body"><button class="close position-absolute t-0 r-0 z-index1 mr-4 mt-3" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"><img src="./imag/close.svg"/></span></button>
        <div class="row">
            <div class="col gray-zone">
                <div class="header-text">Get a $25 Visa® gift card just for test driving any of our cars </div><img src="./imag/gift-card.png" /></div>
            <div class="col">
                <div class="paragraph first">Receive a $25 Visa reward card when you test drive any of our cars!</div>
                <div class="paragraph">Complimentary - no purchase necessary. It’sz our way of saying thank you for considering us.</div>
                <div class="paragraph">Be quick, offer ends 06/30/19</div>
                <div class="email-label">Email address</div><input class="email" v-model="email" placeholder="Your email" />
                <div class="row">
                    <div class="custom-checkbox"></div>
                    <div class="paragraph label">Email me favorite deals</div>
                </div>
                <div class="row gutter">
                    <div class="terms-and-conditions">By signing up you accept our <span>Terms & Conditions.</span></div><button v-on:click="next()" class="grad-btn">Next</button></div>
            </div>
        </div>
    </div>
`

const secondStep = `
    <div v-if="step === 2" class="modal-body"><button class="close position-absolute t-0 r-0 z-index1 mr-4 mt-3" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"><img src="./imag/close.svg"/></span></button>
        <div class="row">
            <div class="col gray-zone">
                <div class="header-text">Get a $25 Visa® gift card just for test driving any of our cars </div><img src="./imag/gift-card.png" /></div>
            <div class="col">
                <div class="paragraph">Select test drive date</div>
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
                <div class="paragraph">Select available test drive time</div>
                <div class="big-box">
                    <div class="row date-tabs">
                        <div v-bind:class="{active: shift === 'morning'}" class="tab-label morning" v-on:click="setShift('morning')">Morning</div>
                        <div v-bind:class="{active: shift === 'afternoon'}" class="tab-label afternoon" v-on:click="setShift('afternoon')">Afternoon</div>
                        <div v-bind:class="{active: shift === 'evening'}" class="tab-label evening" v-on:click="setShift('evening')">Evening</div>
                    </div>
                    <div class="row time-labels" v-if="shift === 'morning'">
                        <span 
                            v-on:click="timeSelected = time" 
                            class="label" v-bind:class="{active: 
                            timeSelected === time}"
                            v-for="time in morning"
                        >
                            {{ time }}
                        </span>
                    </div>
                    <div class="row time-labels" v-if="shift === 'afternoon'">
                        <span 
                            v-on:click="timeSelected = time" 
                            class="label" v-bind:class="{active: 
                            timeSelected === time}"
                            v-for="time in afternoon"
                        >
                            {{ time }}
                        </span>
                    </div>
                    <div class="row time-labels" v-if="shift === 'evening'">
                        <span 
                            v-on:click="timeSelected = time" 
                            class="label" v-bind:class="{active: 
                            timeSelected === time}"
                            v-for="time in evening"
                        >
                            {{ time }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
`

const MainTemplate = `
    <div class="modal fade" id="giftCardModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content gift-card-modal">
                ${firstStep}
                ${secondStep}
            </div>
        </div>
    </div>
`

window.onload = function () {
  new Vue({
    el: '#giftCardModal1',
    template: MainTemplate,
    data: {
        email: '',
        step: 1,
        dates: [
            {
                day: 'MON',
                date: 26,
                month: 'FEB'
            },
            {
                day: 'TUE',
                date: 27,
                month: 'FEB'
            },
            {
                day: 'TUE',
                date: 28,
                month: 'FEB'
            },
        ],
        morning: [
            '8:00 AM',
            '8:30 AM',
            '9:00 AM',
            '9:30 AM',
            '10:00 AM',
            '10:15 AM',
            '10:30 AM',
            '10:45 AM',
            '11:00 AM',
            '11:15 AM',
            '11:30 AM',
            '11:45 AM',
        ],
        afternoon: [
            '12:00 PM',
            '12:30 PM',
            '1:00 PM',
            '1:30 PM',
            '2:00 PM',
            '2:30 PM',
            '3:00 PM',
            '3:30 PM',
            '4:00 PM',
            '4:15 PM',
            '4:30 PM',
            '4:45 PM',
        ],
        evening: [
            '8:00 AM',
            '8:30 AM',
            '9:00 AM',
            '9:30 AM',
            '10:00 AM',
            '10:15 AM',
            '10:30 AM',
            '10:45 AM',
            '11:00 AM',
            '11:15 AM',
            '11:30 AM',
            '11:45 AM',
        ],
        shift: 'morning',
        timeSelected: '8:00 AM',
        testDriveDates: [],
        selectedTestDriveDate: {}
    },
    created() {
        this.getTestDriveDates();
    },
    methods: {
        next: function() {
            this.step += 1
        },
        setShift: function(shift) {
            this.shift = shift
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
        getTestDriveDateClasses(date) {
            if(this.selectedTestDriveDate.monthDay === date.monthDay) {
                return ["test-drive-selected-date"];
            }
            return ["test-drive-unselected-date"];
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
    }
  })
}