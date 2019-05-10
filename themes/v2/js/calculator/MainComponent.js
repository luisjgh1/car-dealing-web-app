window.onload = function () {
  new Vue({
    el: '#calculator',
    data() {
      return {
        showFinancialClosures: true,
        activeTab: 'carPrice',
        creditScoreOptions: [
          { text: 'Very poor(< 600)', percentage: 7.9 },
          { text: 'Poor(600 - 679)', percentage: 6.4 },
          { text: 'Fair(680 - 719)', percentage: 4.9 },
          { text: 'Good(720 - 780)', percentage: 3.4 },
          { text: 'Excellent(> 780)', percentage: 1.9 },
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
          creditInterestRate: '',
          tradeinValue: '',
          months: '',
          monthlyPayment: '',
          // rentCharge: '',
          interestRate: '',
          residualPercentage: 55,
          taxRate: 6.25,
        }
      }
    },
    methods: {
      getByCarPrice(type) {
        if(type === 'finance') {
          if(!this.form.carPrice || !this.form.interestRate || !this.form.months) return 0;
          const dp = this.form.downPayment ? parseFloat(this.form.downPayment) : 0
          const t = this.form.tradeinValue ? parseFloat(this.form.tradeinValue) : 0
          const P = parseFloat(this.form.carPrice) - dp - t
          const ir = (parseFloat(this.form.interestRate) / 100) / 12
          const n = parseFloat(this.form.months)
          const x1 = ir*((1+ir)**n)
          const x2 = ((1+ir)**n) - 1
          const total = P*(x1/x2)
          return total;
        }
        if(type === 'lease') {
          if(!this.form.carPrice || !this.form.months || !this.form.residualPercentage || !this.form.interestRate || !this.form.taxRate) return 0;
          const dp = this.form.downPayment ? parseFloat(this.form.downPayment) : 0
          const t = this.form.tradeinValue ? parseFloat(this.form.tradeinValue) : 0
          const P = parseFloat(this.form.carPrice) - dp - t
          const nrP = parseFloat(this.form.carPrice) // not reduced price
          const n = parseFloat(this.form.months)
          // const rc = parseFloat(this.form.rentCharge)
          const ir = parseFloat(this.form.interestRate)
          const rp = parseFloat(this.form.residualPercentage)
          const rv = nrP*(rp/100) // Residual Value
          const mf = ir/2400 // Money factor (Interest Rate)
          const df = (P-rv)/n // Depreciation Fee
          const ff = (P+rv)*mf // Financing Fee
          // const mf = rc/((P+rv)*n) // Money factor (Rent Charge)
          const lp = df+ff // Lease payment
          const simple = (((nrP-dp-t)-(nrP*(rp/100)))/n)+(((nrP-dp-t)+(nrP*(rp/100)))*(ir/2400))
          const total = lp
          return simple;
        }
        if(type === 'dueSign') {
          if(!this.form.carPrice || !this.form.months || !this.form.residualPercentage || !this.form.interestRate || !this.form.taxRate) return 0;
          const n = parseFloat(this.form.months)
          const tr = parseFloat(this.form.taxRate) / 100
          const lp = this.getByCarPrice('lease') // Lease payment
          const total = lp*n*tr
          return total;
        }
      },
      getByMonthlyBudget(type) {
        if(type === 'finance') {
          if(!this.form.monthlyPayment || !this.form.months || !this.form.interestRate) return 0;
          const dp = this.form.downPayment ? parseFloat(this.form.downPayment) : 0
          const t = this.form.tradeinValue ? parseFloat(this.form.tradeinValue) : 0
          const mp = parseFloat(this.form.monthlyPayment)
          const ir = (parseFloat(this.form.interestRate) / 100) / 12
          const n = parseFloat(this.form.months)
          const x1 = mp*(((1+ir)**n) - 1)
          const x2 = ir*((1+ir)**n)
          const total = (x1/x2)+dp+t
          return total;
        }
        if (type === 'lease') {
          if(!this.form.monthlyPayment || !this.form.months || !this.form.residualPercentage || !this.form.interestRate || !this.form.taxRate) return 0;
          const dp = this.form.downPayment ? parseFloat(this.form.downPayment) : 0
          const t = this.form.tradeinValue ? parseFloat(this.form.tradeinValue) : 0
          const mp = parseFloat(this.form.monthlyPayment)
          const n = parseFloat(this.form.months)
          const ir = parseFloat(this.form.interestRate)
          const rp = parseFloat(this.form.residualPercentage)
          // This names were made for sake of comprehension
          const a = dp
          const b = t
          const d = n
          const e = ir
          const f = rp
          const x = mp
          // const rc = parseFloat(this.form.rentCharge)
          const x1 = 240000*d*x
          const x2 = 240000*a
          const x3 = 240000*b
          const x4 = 100*e*a*d
          const x5 = 100*e*b*d
          const y = x1 + x2 + x3 + x4 + x5
          const y1 = 240000
          const y2 = 2400*f
          const y3 = 100*e*d
          const y4 = e*d*f
          const z = y1 - y2 + y3 + y4
          const total = y/z
          return total;
        }
      },
      toggleFinancialClosures() {
        this.showFinancialClosures = !this.showFinancialClosures
      },
      setInterestRate(rate) {
        this.form.interestRate = rate
      },
      changeActiveTab(value, tabName) {
        $(`#${tabName} a:first-child`).tab('show')
        this.activeTab = value
      },
      activeTabClasses(value) {
        if(this.activeTab === value) {
          return [ 'full-yellow-underline', 'text-secondary' ];
        }
        return [ 'text-primary-color' ];
      },
      formatNumber(number, symbol) {
        if(number < 0) return symbol + '0';
        return symbol + number.toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
      }
    },
    template: `
    <div class="bg-white">
      <div class="container py-5">
        <div class="d-flex justify-content-center">
          <span class="cursor-pointer font-weight-3 px-3" :class="activeTabClasses('carPrice')" @click="changeActiveTab('carPrice', 'monthlyCalculatorTab')">By car price</span>
          <span>|</span>
          <span class="cursor-pointer font-weight-3 px-3" :class="activeTabClasses('monthly')" @click="changeActiveTab('monthly', 'carCalculatorTab')">By monthly budget</span>
        </div>
        <!-- By car price -->
        <template v-if="activeTab === 'carPrice'">
          <nav class="nav nav-tabs calculatorTab" id="carCalculatorTab" role="tablist">  
            <a class="nav-item nav-link active p-4" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Finance Calculator</a>
            <a class="nav-item nav-link p-4" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Lease Calculator</a>
          </nav>
          <div class="tab-content calculatorTabContent" id="carCalculatorTabContent">
            <!-- Car Finance -->
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
                        <select type="text" class="form-control" v-model="form.creditInterestRate" @change="setInterestRate($event.target.value)">
                          <option value="" disabled selected>Select</option>
                          <option :value="option.percentage" v-for="option in creditScoreOptions">{{ option.text }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Interest rate (APR)*</label>
                        <div class="input-group">
                          <input type="text" class="form-control m-0" :placeholder="form.creditInterestRate" v-model="form.interestRate">
                          <div class="input-group-append">
                            <span class="input-group-text">%</span>
                          </div>
                        </div>
                        <small v-if="form.creditInterestRate" class="form-text text-muted">Based on your score, the average rate is {{ form.creditInterestRate }}%.</small>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Trade-in Value</label>
                        <a href="#" class="float-md-right">Get Black Book value</a>
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
                  <p class="text-secondary font-weight-3 blue-underline">{{ formatNumber(getByCarPrice('finance'), '$') }} per month</p>
                  <a class="text-primary-color no-underline-hover font-weight-bold" href="/pre-approved">Get pre-approved</a>
                  <div class="d-block">
                    <a href="/search" class="no-underline-hover d-inline-block">
                      <div class="style-button-form-learn yellow-button my-4 py-3 pl-3 pr-5">Show me cars</div>
                    </a>
                  </div>
                  <a class="text-primary-color no-underline-hover font-weight-bold" href="#!" v-if="showFinancialClosures" @click="toggleFinancialClosures">Close financial disclosures</a>
                  <a class="text-primary-color no-underline-hover font-weight-bold" href="#!" v-if="!showFinancialClosures" @click="toggleFinancialClosures">Read financial disclosures</a>
                </div>
              </div>
            </div>
            <!-- Car Lease -->
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
                      <div class="form-group">
                        <label>Trade-in Value</label>
                        <a href="#" class="float-md-right">Get Black Book value</a>
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
                    <div class="col-md-6 offset-md-6">
                      <div class="form-group">
                        <label>Interest Rate*</label>
                        <div class="input-group">
                          <input type="text" class="form-control m-0" v-model="form.interestRate">
                          <div class="input-group-append">
                            <span class="input-group-text">%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 p-4 border-left">
                  <p class="text-secondary mb-3">Based on your inputs, your estimated payment</p>
                  <p class="text-secondary font-weight-3 blue-underline mb-0">{{ formatNumber(getByCarPrice('lease'), '$') }} per month</p>
                  <small class="form-text text-muted mt-4">Amount due at signing is {{ formatNumber(getByCarPrice('dueSign'), '$') }}</small>
                  <a class="text-primary-color no-underline-hover font-weight-bold mt-4" href="/pre-approved">Get pre-approved</a>
                  <div class="d-block">
                    <a href="/search" class="no-underline-hover d-inline-block">
                      <div class="style-button-form-learn yellow-button my-3 py-3 pl-3 pr-5">Show me cars</div>
                    </a>
                  </div>
                  <a class="text-primary-color no-underline-hover font-weight-bold" href="#!" v-if="showFinancialClosures" @click="toggleFinancialClosures">Close financial disclosures</a>
                  <a class="text-primary-color no-underline-hover font-weight-bold" href="#!" v-if="!showFinancialClosures" @click="toggleFinancialClosures">Read financial disclosures</a>
                </div>
              </div>
            </div>
          </div>
        </template>
        <!-- By monthly budget -->
        <template v-if="activeTab === 'monthly'">
          <nav class="nav nav-tabs calculatorTab" id="monthlyCalculatorTab" role="tablist">  
            <a class="nav-item nav-link active p-4" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Finance Calculator</a>
            <a class="nav-item nav-link p-4" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Lease Calculator</a>
          </nav>
          <div class="tab-content calculatorTabContent" id="monthlyCalculatorTabContent">
            <!-- Monthly Finance -->
            <div class="tab-pane show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <div class="row">
                <div class="col-md-8 p-4">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Desired monthly payment*</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">$</span>
                          </div>
                          <input type="text" class="form-control m-0" v-model="form.monthlyPayment">
                          <div class="input-group-append">
                            <span class="input-group-text">per month</span>
                          </div>
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
                        <select type="text" class="form-control" v-model="form.creditInterestRate" @change="setInterestRate($event.target.value)">
                          <option value="" disabled selected>Select</option>
                          <option :value="option.value" v-for="option in creditScoreOptions">{{ option.text }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Interest rate (APR)*</label>
                        <div class="input-group">
                          <input type="text" class="form-control m-0" :placeholder="form.creditInterestRate" v-model="form.interestRate">
                          <div class="input-group-append">
                            <span class="input-group-text">%</span>
                          </div>
                        </div>
                        <small v-if="form.creditInterestRate" class="form-text text-muted">Based on your score, the average rate is {{ form.creditInterestRate }}%.</small>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Trade-in Value</label>
                        <a href="#" class="float-md-right">Get Black Book value</a>
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
                  <p class="text-secondary mb-3">Based on your inputs, you can afford to spend</p>
                  <p class="text-secondary font-weight-3 blue-underline">{{ formatNumber(getByMonthlyBudget('finance'), '$') }}</p>
                  <a class="text-primary-color no-underline-hover font-weight-bold" href="/pre-approved">Get pre-approved</a>
                  <div class="d-block">
                    <a href="/search" class="no-underline-hover d-inline-block">
                      <div class="style-button-form-learn yellow-button my-4 py-3 pl-3 pr-5">Show me cars</div>
                    </a>
                  </div>
                  <a class="text-primary-color no-underline-hover font-weight-bold" href="#!" v-if="showFinancialClosures" @click="toggleFinancialClosures">Close financial disclosures</a>
                  <a class="text-primary-color no-underline-hover font-weight-bold" href="#!" v-if="!showFinancialClosures" @click="toggleFinancialClosures">Read financial disclosures</a>
                </div>
              </div>
            </div>
            <!-- Monthly Lease -->
            <div class="tab-pane" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <div class="row">
                <div class="col-md-8 p-4">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Desired monthly payment*</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">$</span>
                          </div>
                          <input type="text" class="form-control m-0" v-model="form.monthlyPayment">
                          <div class="input-group-append">
                            <span class="input-group-text">per month</span>
                          </div>
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
                        <label>Trade-in Value</label>
                        <a href="#" class="float-md-right">Get Black Book value</a>
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
                    <div class="col-md-6 offset-md-6">
                      <div class="form-group">
                        <label>Interest Rate*</label>
                        <div class="input-group">
                          <input type="text" class="form-control m-0" v-model="form.interestRate">
                          <div class="input-group-append">
                            <span class="input-group-text">%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 p-4 border-left">
                  <p class="text-secondary mb-3">Based on your inputs, you can afford to spend</p>
                  <p class="text-secondary font-weight-3 blue-underline mb-0">{{ formatNumber(getByMonthlyBudget('lease'), '$') }}</p>
                  <small class="form-text text-muted mt-4">Amount due at signing is {{ formatNumber(getByCarPrice('dueSign'), '$') }}</small>
                  <a class="text-primary-color no-underline-hover font-weight-bold mt-4" href="/pre-approved">Get pre-approved</a>
                  <div class="d-block">
                    <a href="/search" class="no-underline-hover d-inline-block">
                      <div class="style-button-form-learn yellow-button my-3 py-3 pl-3 pr-5">Show me cars</div>
                    </a>
                  </div>
                  <a class="text-primary-color no-underline-hover font-weight-bold" href="#!" v-if="showFinancialClosures" @click="toggleFinancialClosures">Close financial disclosures</a>
                  <a class="text-primary-color no-underline-hover font-weight-bold" href="#!" v-if="!showFinancialClosures" @click="toggleFinancialClosures">Read financial disclosures</a>
                </div>
              </div>
            </div>
          </div>
        </template>
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
