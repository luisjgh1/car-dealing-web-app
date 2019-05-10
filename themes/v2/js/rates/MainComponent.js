const loanMonths = [12, 24, 36, 48, 60];

const carConditions = ['New', 'Used'];

const creditScores = [
  { name: 'Very poor (< 600)', percentage: 7.9 },
  { name: 'Poor (600 - 679)', percentage: 6.4 },
  { name: 'Fair (680 - 719)', percentage: 4.9 },
  { name: 'Good (720 - 780)', percentage: 3.4 },
  { name: 'Excellent (> 780)', percentage: 1.9 },
];

const lenders = [
  {
    state: 'California',
    image: '../imag/bankfirst-logo.png',
    interestRate: 5.29,
    comparisonRate: 5.29,
    minYearTerm: 1,
    minYearTerm: 7
  },
  {
    state: 'California',
    image: '../imag/bankfirst-logo.png',
    interestRate: 5.29,
    comparisonRate: 5.29,
    minYearTerm: 1,
    minYearTerm: 7
  },
  {
    state: 'California',
    image: '../imag/bankfirst-logo.png',
    interestRate: 5.29,
    comparisonRate: 5.29,
    minYearTerm: 1,
    minYearTerm: 7
  },
  {
    state: 'Florida',
    image: '../imag/bankfirst-logo.png',
    interestRate: 5.29,
    comparisonRate: 5.29,
    minYearTerm: 1,
    minYearTerm: 7
  },
  {
    state: 'Florida',
    image: '../imag/bankfirst-logo.png',
    interestRate: 5.29,
    comparisonRate: 5.29,
    minYearTerm: 1,
    minYearTerm: 7
  },
  {
    state: 'Michigan',
    image: '../imag/bankfirst-logo.png',
    interestRate: 5.29,
    comparisonRate: 5.29,
    minYearTerm: 1,
    minYearTerm: 7
  }
]

window.onload = function () {
  new Vue({
    el: '#loan-rates',
    data() {
      return {
        form: {
          state: 'any',
          loanAmount: 29890,
          loanDuration: 36,
          condition: 'New',
          creditScore: '1.9'
        },
        filters: {
          states: [],
          months: loanMonths,
          conditions: carConditions,
          creditScores: creditScores
        },
        lenders: [],
      }
    },
    mounted() {
      this.fetchLenders();
      this.getStates();
    },
    methods: {
      fetchLenders() {
        this.lenders = lenders;
      },
      getStates() {
        let stateList = [];
        this.lenders.forEach(lender => {
          if(!stateList.includes(lender.state)) stateList.push(lender.state)
        })
        this.filters.states = stateList
      },
      getMonthlyPayment() {
        const P = parseFloat(this.form.loanAmount)
        const ir = (parseFloat(this.form.creditScore) / 100) / 12
        const n = parseFloat(this.form.loanDuration)
        const x1 = ir*((1+ir)**n)
        const x2 = ((1+ir)**n) - 1
        const total = P*(x1/x2)
        return total;
      },
      formatNumber(number, symbol) {
        if(number < 0) return symbol + '0';
        return symbol + number.toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
      }
    },
    template: `
      <div class="row">
        <div class="col-md-3 mb-5 mb-md-0">
          <div class="card p-4">
            <div class="form-group">
              <label>State*</label>
              <select class="form-control" v-model="form.state">
                <option value="any">Any</option>
                <option :value="state" v-for="state in filters.states">{{ state }}</option>
              </select>
            </div>
            <div class="form-group">
              <label>Loan amount*</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">$</span>
                </div>
                <input type="number" class="form-control m-0" v-model="form.loanAmount">
              </div>
            </div>
            <div class="form-group">
              <label>Loan duration*</label>
              <select class="form-control" v-model="form.loanDuration">
                <option :value="month" v-for="month in filters.months">{{ month }}</option>
              </select>
            </div>
            <div class="form-group">
              <label>Vehicle condition*</label>
              <select class="form-control" v-model="form.condition">
                <option :value="condition" v-for="condition in filters.conditions">{{ condition }}</option>
              </select>
            </div>
            <div class="form-group">
              <label>Credit Score*</label>
              <select class="form-control" v-model="form.creditScore">
                <option :value="creditScore.percentage" v-for="creditScore in filters.creditScores">{{ creditScore.name }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-md-9 px-0">
          <div class="row mx-0 background-secondary-blue rounded-top pt-3 px-3 visible-flex-lg">
            <div class="col-md-4">
              <p class="text-white font-weight-3">Lenders</p>
            </div>
            <div class="col-md-8">
              <div class="row">
                <div class="col-md-4">
                  <p class="text-white font-weight-3">Interest Rate</p>
                </div>
                <div class="col-md-4">
                  <p class="text-white font-weight-3">Comparison Rate</p>
                </div>
                <div class="col-md-4">
                  <p class="text-white font-weight-3">Monthly Payment</p>
                </div>
              </div>
            </div>
          </div>
          <div class="card px-3 pt-4 pb-2 mx-md-0 mb-4" v-for="(lender, lenderIndex) in lenders" v-if="lender.state === form.state || form.state === 'any'">
            <div class="row pb-3">
              <div class="col-12 col-md-4">
                <img :src="lender.image" alt="lender logo" class="img-fluid">
              </div>
              <div class="col-12 col-md-8">
                <div class="row">
                  <div class="col-4 px-0 px-md-3">
                    <p class="font-size-1 text-center visible-sm">Interest<br>Rate</p>
                    <p class="text-center">{{ lender.interestRate }} % p.a.</p>
                  </div>
                  <div class="col-4 px-0 px-md-3">
                    <p class="font-size-1 text-center visible-sm">Comparison<br>Rate</p>
                    <p class="text-center">{{ lender.comparisonRate }} % p.a.</p>
                  </div>
                  <div class="col-4 px-0 px-md-3">
                    <p class="font-size-1 text-center visible-sm">Monthly<br>Payment</p>
                    <p class="text-primary-color font-weight-3 text-center">{{ formatNumber(getMonthlyPayment(), '$') }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row pb-3">
              <div class="col-md-9 d-flex align-items-end">
                <p class="text-secondary font-size-1 mb-0">Terms form {{ lender.minYearTerm }} to {{ lender.maxYearTerm }} years. Representative example: a 5 years $40.000 loan at {{ lender.interestRate }} cost $34,357.89</p>
              </div>
              <div class="col-md-3">
                <div class="style-button-form-learn mx-md-4">Apply now</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  });
};
