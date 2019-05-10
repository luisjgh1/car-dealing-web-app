const mockData = {
  image: '../imag/car-1.jpg',
  name: 'New 2018 Ford Edge LT XTE Auto',
  price: '$34,500',
  discountPrice: '$29,890',
  vin: '55SWF8EB7KU286157'
}

window.onload = function () {
  new Vue({
    el: '#details-calculator',
    data() {
      return {
        showFinancialClosures: true,
        creditScoreOptions: [
          { text: 'Exceptional (780-850)', value: 'exceptional' },
          { text: 'Good (720-780)', value: 'good' },
          { text: 'Fair (580-720)', value: 'fair' },
          { text: 'Poor (300-580)', value: 'poor' },
        ],
        monthsOptions: [
          { text: '48 Months', value: '48' },
          { text: '36 Months', value: '36' },
          { text: '24 Months', value: '24' },
          { text: '12 Months', value: '12' },
        ],
        form: {
          carPrice: '',
          downPayment: '',
          creditScore: '',
          interestRate: '',
          tradeinValue: '',
          months: '',
        },
        totalPrice: {
          finance: '$560',
          lease: '$340'
        },
        selectedCar: {}
      }
    },
    created() {
      this.fetchSelectedCar();
    },
    methods: {
      fetchSelectedCar() {
        var url_string = window.location.href
        var url = new URL(url_string)
        this.selectedCar.image = decodeURIComponent(url.searchParams.get("image"))
        this.selectedCar.name = decodeURIComponent(url.searchParams.get("name"))
        this.selectedCar.price = decodeURIComponent(url.searchParams.get("price"))
        if(url.searchParams.get("discountPercent"))
          this.selectedCar.discountPercent = decodeURIComponent(url.searchParams.get("discountPercent"))
        this.selectedCar.vin = decodeURIComponent(url.searchParams.get("vin"))
      },
      toggleFinancialClosures() {
        this.showFinancialClosures = !this.showFinancialClosures
      },
      changeActiveTab(value) {
        this.activeTab = value
      },
      activeTabClasses(value) {
        if(this.activeTab === value) {
          return [ 'full-yellow-underline', 'text-secondary' ];
        }
        return [ 'text-primary-color' ];
      },
      formatNumber(number, symbol) {
        number = parseInt(number)
        if(number < 0) return symbol + '0';
        return symbol + number.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
      }
    },
    template: `
    <div class="bg-white">
      <div class="container py-5">
        <div class="row">
          <div class="col-md-3">
            <div class="card p-4 background-primary-color text-white mb-4 mb-md-0">
              <p class="font-weight-bold font-italic">Your car of interest</p>
              <template v-if="selectedCar.discountPercent">
                <div class="discount-details-img">
                  <span class="z-index1">{{ selectedCar.discountPercent }}%<br>Off</span>
                  <img :src="selectedCar.image" alt="car of interest" class="img-fluid mb-4">
                </div>
              </template>
              <img v-else :src="selectedCar.image" alt="car of interest" class="img-fluid mb-4">
              <p class="yellow-underline font-weight-bold font-size-2">{{ selectedCar.name }}</p>
              <div class="style-button-form-learn yellow-button font-size-4 mb-3">Schedule a test drive</div>
              <template v-if="selectedCar.discountPercent">
                <del class="font-size-1">Price: {{ formatNumber(selectedCar.price, '$') }}</del>
                <p class="font-weight-3 font-size-1 m-0">Sale Price: {{ formatNumber(selectedCar.price*(1-(selectedCar.discountPercent/100)), '$') }}</p>
              </template>
              <p v-else class="font-size-1 m-0">Price: {{ formatNumber(selectedCar.price, '$') }}</p>
              <p class="font-size-1 m-0">VIN: {{ selectedCar.vin }}</p>
            </div>
          </div>
          <div class="col-md-9">
            <nav class="nav nav-tabs calculatorTab" id="carCalculatorTab" role="tablist">  
              <a class="nav-item nav-link active p-4" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Finance Calculator</a>
              <a class="nav-item nav-link p-4" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Lease Calculator</a>
            </nav>
            <div class="tab-content calculatorTabContent" id="carCalculatorTabContent">
              <!-- Finance -->
              <div class="tab-pane show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div class="row">
                  <div class="col-md-8 p-4">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Car price*</label>
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">$</span>
                            </div>
                            <input type="text" class="form-control m-0" v-model="form.carPrice">
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Down Payment</label>
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">$</span>
                            </div>
                            <input type="text" class="form-control m-0" v-model="form.downPayment">
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Credit score*</label>
                          <select type="text" class="form-control" v-model="form.creditScore">
                            <option value="" disabled selected>Select</option>
                            <option :value="option.value" v-for="option in creditScoreOptions">{{ option.text }}</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Interest rate (APR)*</label>
                          <div class="input-group">
                            <input type="text" class="form-control m-0" placeholder="3.4" v-model="form.interestRate">
                            <div class="input-group-append">
                              <span class="input-group-text">%</span>
                            </div>
                          </div>
                          <small class="form-text text-muted">Based on your score, the average rate is 3.4%.</small>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group position-relative">
                          <label>Trade-in Value</label>
                          <a href="#" class="float-md-right black-book no-underline-hover">Get Black<br>Book value</a>
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">$</span>
                            </div>
                            <input type="text" class="form-control m-0" v-model="form.tradeinValue">
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Number of months*</label>
                          <select type="text" class="form-control" v-model="form.months">
                            <option value="" disabled selected>Select</option>
                            <option :value="option.value" v-for="option in monthsOptions">{{ option.text }}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 p-4 border-left">
                    <p class="text-secondary mb-3">Based on your inputs, your estimated payment</p>
                    <p class="text-secondary font-weight-3 blue-underline">{{ totalPrice.finance }} per month</p>
                    <div class="d-block">
                      <a href="/details-pre-approved" class="no-underline-hover d-md-inline-block">
                        <div class="style-button-form-learn my-4 py-3 pl-3 pr-5">Get pre-approved</div>
                      </a>
                    </div>
                    <a class="text-primary-color no-underline-hover font-weight-bold" href="#!" v-if="showFinancialClosures" @click="toggleFinancialClosures">Close financial disclosures</a>
                    <a class="text-primary-color no-underline-hover font-weight-bold" href="#!" v-if="!showFinancialClosures" @click="toggleFinancialClosures">Read financial disclosures</a>
                  </div>
                </div>
              </div>
              <!-- Lease -->
              <div class="tab-pane" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <div class="row">
                  <div class="col-md-8 p-4">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Car price*</label>
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">$</span>
                            </div>
                            <input type="text" class="form-control m-0" v-model="form.carPrice">
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Down Payment</label>
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">$</span>
                            </div>
                            <input type="text" class="form-control m-0" v-model="form.downPayment">
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group position-relative">
                          <label>Trade-in Value</label>
                          <a href="#" class="float-md-right black-book no-underline-hover">Get Black<br>Book value</a>
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <span class="input-group-text">$</span>
                            </div>
                            <input type="text" class="form-control m-0" v-model="form.tradeinValue">
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Number of months*</label>
                          <select type="text" class="form-control" v-model="form.months">
                            <option value="" disabled selected>Select</option>
                            <option :value="option.value" v-for="option in monthsOptions">{{ option.text }}</option>
                          </select>
                        </div>
                      </div>
                      <div class="ml-2 ml-md-4 visible-lg">
                        <a class="text-primary-color no-underline-hover font-weight-bold" href="#!" v-if="showFinancialClosures" @click="toggleFinancialClosures">Close financial disclosures</a>
                        <a class="text-primary-color no-underline-hover font-weight-bold" href="#!" v-if="!showFinancialClosures" @click="toggleFinancialClosures">Read financial disclosures</a>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 p-4 border-left">
                    <p class="text-secondary mb-3">Based on your inputs, your estimated payment</p>
                    <p class="text-secondary font-weight-3 blue-underline mb-0">{{ totalPrice.lease }} per month</p>
                    <small class="form-text text-muted mt-4">Amount due at signing is $0</small>
                    <div class="d-block">
                      <a href="details-pre-approved" class="no-underline-hover d-md-inline-block">
                        <div class="style-button-form-learn my-3 py-3 pl-3 pr-5">Get pre-approved</div>
                      </a>
                    </div>
                    <div class="visible-sm">
                      <a class="text-primary-color no-underline-hover font-weight-bold" href="#!" v-if="showFinancialClosures" @click="toggleFinancialClosures">Close financial disclosures</a>
                      <a class="text-primary-color no-underline-hover font-weight-bold" href="#!" v-if="!showFinancialClosures" @click="toggleFinancialClosures">Read financial disclosures</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="d-block text-secondary mt-5" v-if="showFinancialClosures">
          <p class="font-weight-3">Finance Disclosures</p>
          <p class="font-size-1">The payment estimator is not an advertisement or offer for specific terms of credit and actual terms may vary. Payment amounts presented are for illustrative purposes only and may not be available. Not all models are available in all states. Actual vehicle price may vary by Dealer.</p>
          <p class="font-size-1 font-weight-3">Finance Transactions:</p>
          <p class="font-size-1">The Estimated Monthly Payment amount calculated is based on the variables entered, the price of the vehicle you entered, the term you select, the down payment you enter, the Annual Percentage Rate (APR) you select, and any net trade-in amount. The payment estimate displayed does not include taxes, licence, and/or registration fees. Payment amount is for illustrate purposes only. Actual prices may vary by Dealer. Payment amounts may be different due to various factors such as fees, special, rebates, term, down payment, APR, net trade-in, and applicable tax rate. Actual APR is based on available finance programs and the creditworthiness of the customer. Not all customers will qualify for credit or for the lowest rate. Please contact an authorized dealer for actual rates, program details and actual terms.</p>
          <p class="font-size-1 font-weight-3">Lease Transactions:</p>
          <p class="font-size-1">The Amount Due at Signing is the amount to be paid by the lessee prior to or at signing of the lease or by delivery of the vehicle. The Amount Due at Signing displayed is and estimate and does not include taxes, title, license and/or registration fees. It includes the first month's payment, and acquisition fee, and down payment, less any net trade-in amount. The Estimated Monthly Payment shown is based on the variables entered, the price of the vehicle you entered, the term you select, the down payment you enter, the annual mileage you select, any net trade-in amount, and [Manufacturer name] current lease program. A security deposit may be required depending on creditworthiness. The payment estimate displayed does not include taxes, title, license and/or registration fees. Payment amount is for illustrative purposes only.</p>
        </div>
      </div>
    </div>
    `
  });
}
