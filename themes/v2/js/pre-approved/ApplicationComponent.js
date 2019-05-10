export default {
  name: 'application',
  template: `
    <form @submit.prevent="submitForm()">
      <div class="card mx-0 w-100 h-100">
        <div class="px-5 pt-5 pb-4">
          <!-- Personal Information -->
          <p class="font-weight-3 yellow-underline d-inline-block">{{ formData.personalInformation.title }}</p>
          <div class="row">
            <div class="col-md-6">
              <label>{{ formData.personalInformation.birthDate.label }}</label>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <select type="text" class="form-control" v-model="form.birthDate.month" @change="handleMonthSelect($event.target.value)">
                      <option value="" disabled selected>Month</option>
                      <option :value="month" v-for="month in date.months">{{ month }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <select type="text" class="form-control" v-model="form.birthDate.day">
                      <option value="" disabled selected>Day</option>
                      <option :value="day" v-for="day in date.days">{{ day }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <select type="text" class="form-control" v-model="form.birthDate.year">
                      <option value="" disabled selected>Year</option>
                      <option :value="year" v-for="year in date.years">{{ year }}</option>
                    </select>
                  </div>
                </div>
              </div>
              <label>{{ formData.personalInformation.socialSecurityNumber.label }}</label>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <input type="text" class="form-control" maxlength="3" placeholder="XXX" v-model="form.socialSecurityNumber.areaNumber">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <input type="text" class="form-control" maxlength="2" placeholder="XX" v-model="form.socialSecurityNumber.groupNumber">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <input type="text" class="form-control" maxlength="4" placeholder="XXXX" v-model="form.socialSecurityNumber.serialNumber">
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <label>{{ formData.personalInformation.educationLevel.label }}</label>
              <div class="form-group">
                <select type="text" class="form-control" v-model="form.educationLevel">
                  <option value="" disabled selected>Select</option>
                  <option :value="option" v-for="(option, index) in formData.personalInformation.educationLevel.options">{{ option }}</option>
                </select>
              </div>
              <label>{{ formData.personalInformation.verifySocialSecurityNumber.label }}</label>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <input type="text" class="form-control" maxlength="3" placeholder="XXX" v-model="verifySocialSecurityNumber.areaNumber" @change="verifyInput('socialSecurityNumber', 'verifySocialSecurityNumber', 'socialSecurityNumberVerified', ['areaNumber', 'groupNumber', 'serialNumber'])">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <input type="text" class="form-control" maxlength="2" placeholder="XX" v-model="verifySocialSecurityNumber.groupNumber" @change="verifyInput('socialSecurityNumber', 'verifySocialSecurityNumber', 'socialSecurityNumberVerified', ['areaNumber', 'groupNumber', 'serialNumber'])">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <input type="text" class="form-control" maxlength="4" placeholder="XXXX" v-model="verifySocialSecurityNumber.serialNumber" @change="verifyInput('socialSecurityNumber', 'verifySocialSecurityNumber', 'socialSecurityNumberVerified', ['areaNumber', 'groupNumber', 'serialNumber'])">
                  </div>
                </div>
              </div>
              <small v-if="!socialSecurityNumberVerified" class="form-text text-danger">The security social numbers are not the same.</small>
            </div>
          </div>
        </div>
        <hr>
        <!-- Present Address -->
        <div class="px-5 py-4">
          <p class="font-weight-3 yellow-underline d-inline-block">{{ formData.presentAddress.title }}</p>
          <div class="row">
            <div class="col-md-6">
              <label>{{ formData.presentAddress.address.label }}</label>
              <div class="form-group">
                <input type="text" class="form-control" :placeholder="formData.presentAddress.address.placeholder" v-model="form.presentAddress.address">
              </div>
            </div>
            <div class="col-md-6">
              <label>{{ formData.presentAddress.other.label }}</label>
              <div class="form-group">
                <input type="text" class="form-control" placeholder="XXXX" v-model="form.presentAddress.other">
              </div>
            </div>
            <div class="col-md-6">
              <label>{{ formData.presentAddress.city.label }}</label>
              <div class="form-group">
                <input type="text" class="form-control" :placeholder="formData.presentAddress.city.placeholder" v-model="form.presentAddress.city">
              </div>
            </div>
            <div class="col-md-6">
              <div class="row">
                <div class="col-md-6">
                  <label>{{ formData.presentAddress.state.label }}</label>
                  <select type="text" class="form-control" v-model="form.presentAddress.state">
                    <option value="" disabled selected>{{ formData.presentAddress.state.placeholder }}</option>
                    <option :value="option" v-for="option in formData.presentAddress.state.options">{{ option }}</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label>{{ formData.presentAddress.zipCode.label }}</label>
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="XXXXX" v-model="form.presentAddress.zipCode">
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <label>{{ formData.presentAddress.residenceType.label }}</label>
              <div class="form-group">
                <select type="text" class="form-control" v-model="form.presentAddress.residenceType">
                  <option value="" disabled selected>{{ formData.presentAddress.residenceType.placeholder }}</option>
                  <option :value="option" v-for="option in formData.presentAddress.residenceType.options">{{ option }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <label>{{ formData.presentAddress.monthlyRent.label }}</label>
              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">$</span>
                  </div>
                  <input type="text" class="form-control m-0" placeholder="XXXX" v-model="form.presentAddress.monthlyRent" aria-describedby="buyerPresentMonthlyRent">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <label>{{ formData.presentAddress.addressTime.label }}</label>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <select type="text" class="form-control" v-model="form.presentAddress.addressTime.year">
                      <option value="" disabled selected>Years</option>
                      <option :value="(year-1)" v-for="year in 81">{{ year-1 }} Year(s)</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <select type="text" class="form-control" v-model="form.presentAddress.addressTime.month">
                      <option value="" disabled selected>Months</option>
                      <option :value="(month-1)" v-for="month in 13">{{ month-1 }} Month(s)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <template v-if="parseInt(form.presentAddress.addressTime.year) < 2">
          <hr>
          <!-- Previous Address -->
          <div class="px-5 py-4">
            <p class="font-weight-3">{{ formData.previousAddress.title }}</p>
            <p class="yellow-underline d-inline-block">{{ formData.previousAddress.subtitle }}</p>
            <div class="row">
              <div class="col-md-6">
                <label>{{ formData.previousAddress.address.label }}</label>
                <div class="form-group">
                  <input type="text" class="form-control" :placeholder="formData.previousAddress.address.placeholder" v-model="form.previousAddress.address">
                </div>
              </div>
              <div class="col-md-6">
                <label>{{ formData.previousAddress.other.label }}</label>
                <div class="form-group">
                  <input type="text" class="form-control" placeholder="XXXX" v-model="form.previousAddress.other">
                </div>
              </div>
              <div class="col-md-6">
                <label>{{ formData.previousAddress.city.label }}</label>
                <div class="form-group">
                  <input type="text" class="form-control" :placeholder="formData.previousAddress.city.placeholder" v-model="form.previousAddress.city">
                </div>
              </div>
              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-6">
                    <label>{{ formData.previousAddress.state.label }}</label>
                    <select type="text" class="form-control" v-model="form.previousAddress.state">
                      <option value="" disabled selected>{{ formData.previousAddress.state.placeholder }}</option>
                      <option :value="option" v-for="option in formData.previousAddress.state.options">{{ option }}</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label>{{ formData.previousAddress.zipCode.label }}</label>
                    <div class="form-group">
                      <input type="text" class="form-control" placeholder="XXXXX" v-model="form.previousAddress.zipCode">
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <label>{{ formData.previousAddress.addressTime.label }}</label>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <select type="text" class="form-control" v-model="form.previousAddress.addressTime.year">
                        <option value="" disabled selected>Years</option>
                        <option :value="(year-1)" v-for="year in 81">{{ year-1 }} Year(s)</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <select type="text" class="form-control" v-model="form.previousAddress.addressTime.month">
                        <option value="" disabled selected>Months</option>
                        <option :value="(month-1)" v-for="month in 13">{{ month-1 }} Month(s)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <hr>
        <!-- Present Employment -->
        <div class="px-5 py-4">
          <p class="font-weight-3 yellow-underline d-inline-block">{{ formData.employmentInformation.presentEmployment.title }}</p>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>{{ formData.employmentInformation.presentEmployment.type.label }}</label>
                <select type="text" class="form-control" v-model="form.employmentInformation.presentEmployment.type">
                  <option value="" disabled selected>{{ formData.employmentInformation.presentEmployment.type.placeholder }}</option>
                  <option :value="option" v-for="option in formData.employmentInformation.presentEmployment.type.options">{{ option }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>{{ formData.employmentInformation.presentEmployment.status.label }}</label>
                <select type="text" class="form-control" v-model="form.employmentInformation.presentEmployment.status">
                  <option value="" disabled selected>{{ formData.employmentInformation.presentEmployment.status.placeholder }}</option>
                  <option :value="option" v-for="option in formData.employmentInformation.presentEmployment.status.options">{{ option }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>{{ formData.employmentInformation.presentEmployment.name.label }}</label>
                <input type="text" class="form-control" v-model="form.employmentInformation.presentEmployment.name" :placeholder="formData.employmentInformation.presentEmployment.name.label">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>{{ formData.employmentInformation.presentEmployment.jobTitle.label }}</label>
                <input type="text" class="form-control" v-model="form.employmentInformation.presentEmployment.jobTitle" :placeholder="formData.employmentInformation.presentEmployment.jobTitle.label">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>{{ formData.employmentInformation.presentEmployment.employerPhone.label }}</label>
                <input type="text" class="form-control" v-model="form.employmentInformation.presentEmployment.employerPhone" placeholder="XXX-XXX-XXXX">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>{{ formData.employmentInformation.presentEmployment.workingTime.label }}</label>
                <div class="row">
                  <div class="col-md-6">
                    <select type="text" class="form-control" v-model="form.employmentInformation.presentEmployment.workingTime.years">
                      <option value="" disabled selected>Years</option>
                      <option :value="(year-1)" v-for="year in 81">{{ year-1 }} Year(s)</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <select type="text" class="form-control" v-model="form.employmentInformation.presentEmployment.workingTime.months">
                      <option value="" disabled selected>Months</option>
                      <option :value="(month-1)" v-for="month in 13">{{ month-1 }} Month(s)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>{{ formData.employmentInformation.presentEmployment.grossSalary.label }}</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">$</span>
                  </div>
                  <input type="text" class="form-control m-0" v-model="form.employmentInformation.presentEmployment.grossSalary">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>{{ formData.employmentInformation.presentEmployment.incomeFrequency.label }}</label>
                <div class="row">
                  <div class="col-md-6">
                    <select type="text" class="form-control" v-model="form.employmentInformation.presentEmployment.incomeFrequency">
                      <option value="" disabled selected>Select</option>
                      <option :value="option" v-for="option in formData.employmentInformation.presentEmployment.incomeFrequency.options">{{ option }}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>{{ formData.employmentInformation.presentEmployment.anotherIncome.label }}</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <div class="row">
                  <div class="col-md-6">
                    <div class="position-relative d-inline-flex cursor-pointer" @click="setValueToPath('this.buyerPresentEmploymentAnotherIncome', true)">
                      <div class="border border-secondary styled-radio-checkbox-container mr-3">
                        <div class="bg-secondary styled-radio-checkbox-content" v-if="buyerPresentEmploymentAnotherIncome"></div>
                      </div>
                      <span>Yes</span>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="position-relative d-inline-flex cursor-pointer" @click="setValueToPath('this.buyerPresentEmploymentAnotherIncome', false)">
                      <div class="border border-secondary styled-radio-checkbox-container mr-3">
                        <div class="bg-secondary styled-radio-checkbox-content" v-if="!buyerPresentEmploymentAnotherIncome"></div>
                      </div>
                      <span>No</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <template v-if="buyerPresentEmploymentAnotherIncome">
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{ formData.employmentInformation.presentEmployment.anotherIncome.grossIncome.label }}</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">$</span>
                    </div>
                    <input type="text" class="form-control m-0" v-model="form.employmentInformation.presentEmployment.grossSalary">
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>{{ formData.employmentInformation.presentEmployment.anotherIncome.incomeFrequency.label }}</label>
                      <select type="text" class="form-control" v-model="form.employmentInformation.presentEmployment.anotherIncome.incomeFrequency">
                        <option value="" disabled selected>Select</option>
                        <option :value="option" v-for="option in formData.employmentInformation.presentEmployment.anotherIncome.incomeFrequency.options">{{ option }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>{{ formData.employmentInformation.presentEmployment.anotherIncome.incomeType.label }}</label>
                      <select type="text" class="form-control" v-model="form.employmentInformation.presentEmployment.anotherIncome.incomeType">
                        <option value="" disabled selected>Select</option>
                        <option :value="option" v-for="option in formData.employmentInformation.presentEmployment.anotherIncome.incomeType.options">{{ option }}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
        <template v-if="parseInt(form.employmentInformation.presentEmployment.workingTime.years) < 2">
          <hr>
          <!-- Previous Employment -->
          <div class="px-5 py-4">
            <p class="font-weight-3 yellow-underline d-inline-block">{{ formData.employmentInformation.previousEmployment.title }}</p>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{ formData.employmentInformation.previousEmployment.type.label }}</label>
                  <select type="text" class="form-control" v-model="form.employmentInformation.previousEmployment.type">
                    <option value="" disabled selected>{{ formData.employmentInformation.previousEmployment.type.placeholder }}</option>
                    <option :value="option" v-for="option in formData.employmentInformation.previousEmployment.type.options">{{ option }}</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{ formData.employmentInformation.previousEmployment.status.label }}</label>
                  <select type="text" class="form-control" v-model="form.employmentInformation.previousEmployment.status">
                    <option value="" disabled selected>{{ formData.employmentInformation.previousEmployment.status.placeholder }}</option>
                    <option :value="option" v-for="option in formData.employmentInformation.previousEmployment.status.options">{{ option }}</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{ formData.employmentInformation.previousEmployment.name.label }}</label>
                  <input type="text" class="form-control" v-model="form.employmentInformation.previousEmployment.name" :placeholder="formData.employmentInformation.previousEmployment.name.label">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{ formData.employmentInformation.previousEmployment.jobTitle.label }}</label>
                  <input type="text" class="form-control" v-model="form.employmentInformation.previousEmployment.jobTitle" :placeholder="formData.employmentInformation.previousEmployment.jobTitle.label">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{ formData.employmentInformation.previousEmployment.employerPhone.label }}</label>
                  <input type="text" class="form-control" v-model="form.employmentInformation.previousEmployment.employerPhone" placeholder="XXX-XXX-XXXX">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{ formData.employmentInformation.previousEmployment.workingTime.label }}</label>
                  <div class="row">
                    <div class="col-md-6">
                      <select type="text" class="form-control" v-model="form.employmentInformation.previousEmployment.workingTime.years">
                        <option value="" disabled selected>Years</option>
                        <option :value="(year-1)" v-for="year in 81">{{ year-1 }} Year(s)</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <select type="text" class="form-control" v-model="form.employmentInformation.previousEmployment.workingTime.months">
                        <option value="" disabled selected>Months</option>
                        <option :value="(month-1)" v-for="month in 13">{{ month-1 }} Month(s)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{ formData.employmentInformation.previousEmployment.grossSalary.label }}</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">$</span>
                    </div>
                    <input type="text" class="form-control m-0" v-model="form.employmentInformation.previousEmployment.grossSalary">
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{ formData.employmentInformation.previousEmployment.incomeFrequency.label }}</label>
                  <div class="row">
                    <div class="col-md-6">
                      <select type="text" class="form-control" v-model="form.employmentInformation.previousEmployment.incomeFrequency">
                        <option value="" disabled selected>Select</option>
                        <option :value="option" v-for="option in formData.employmentInformation.previousEmployment.incomeFrequency.options">{{ option }}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <hr>
        <!-- Co-Buyer Information -->
        <div class="px-5 py-4">
          <p class="font-weight-3 yellow-underline d-inline-block">{{ formData.cobuyerInformation.title }}</p>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>{{ formData.cobuyerInformation.label }}</label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <div class="row">
                  <div class="col-md-6">
                    <div class="position-relative d-inline-flex cursor-pointer" @click="setValueToPath('this.cobuyerAccepted', true)">
                      <div class="border border-secondary styled-radio-checkbox-container mr-3">
                        <div class="bg-secondary styled-radio-checkbox-content" v-if="cobuyerAccepted"></div>
                      </div>
                      <span>Yes</span>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="position-relative d-inline-flex cursor-pointer" @click="setValueToPath('this.cobuyerAccepted', false)">
                      <div class="border border-secondary styled-radio-checkbox-container mr-3">
                        <div class="bg-secondary styled-radio-checkbox-content" v-if="!cobuyerAccepted"></div>
                      </div>
                      <span>No</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <template v-if="cobuyerAccepted">
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{ formData.cobuyerInformation.relationship.label }}</label>
                  <select type="text" class="form-control" v-model="form.cobuyer.relationship">
                    <option value="" disabled selected>{{ formData.cobuyerInformation.relationship.placeholder }}</option>
                    <option :value="option" v-for="option in formData.cobuyerInformation.relationship.options">{{ option }}</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{ formData.cobuyerInformation.educationLevel.label }}</label>
                  <select type="text" class="form-control" v-model="form.cobuyer.educationLevel">
                    <option value="" disabled selected>{{ formData.cobuyerInformation.educationLevel.placeholder }}</option>
                    <option :value="option" v-for="option in formData.cobuyerInformation.educationLevel.options">{{ option }}</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{ formData.cobuyerInformation.firstName.label }}</label>
                  <input type="text" class="form-control" v-model="form.cobuyer.firstName">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{ formData.cobuyerInformation.lastName.label }}</label>
                  <input type="text" class="form-control" v-model="form.cobuyer.lastName">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{ formData.cobuyerInformation.birthDate.label }}</label>
                  <div class="row">
                    <div class="col-md-4">
                      <div class="form-group">
                        <select type="text" class="form-control" v-model="form.cobuyer.birthDate.month" @change="handleMonthSelect($event.target.value)">
                          <option value="" disabled selected>Month</option>
                          <option :value="month" v-for="month in date.months">{{ month }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <select type="text" class="form-control" v-model="form.cobuyer.birthDate.day">
                          <option value="" disabled selected>Day</option>
                          <option :value="day" v-for="day in date.days">{{ day }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <select type="text" class="form-control" v-model="form.cobuyer.birthDate.year">
                          <option value="" disabled selected>Year</option>
                          <option :value="year" v-for="year in date.years">{{ year }}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{ formData.cobuyerInformation.phone.label }}</label>
                  <input type="tel" class="form-control" v-model="form.cobuyer.phone" placeholder="XXX-XXXX-XXXX">
                </div>
              </div>
              <div class="col-md-6">
                <label>{{ formData.cobuyerInformation.socialSecurityNumber.label }}</label>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <input type="text" class="form-control" maxlength="3" placeholder="XXX" v-model="form.cobuyer.socialSecurityNumber.areaNumber">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <input type="text" class="form-control" maxlength="2" placeholder="XX" v-model="form.cobuyer.socialSecurityNumber.groupNumber">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <input type="text" class="form-control" maxlength="4" placeholder="XXXX" v-model="form.cobuyer.socialSecurityNumber.serialNumber">
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <label>{{ formData.cobuyerInformation.verifySocialSecurityNumber.label }}</label>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <input type="text" class="form-control" maxlength="3" placeholder="XXX" v-model="cobuyerVerifySocialSecurityNumber.areaNumber" @change="verifyInput('socialSecurityNumber', 'cobuyerVerifySocialSecurityNumber', 'cobuyerSocialSecurityNumberVerified', ['areaNumber', 'groupNumber', 'serialNumber'], 'cobuyer')">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <input type="text" class="form-control" maxlength="2" placeholder="XX" v-model="cobuyerVerifySocialSecurityNumber.groupNumber" @change="verifyInput('socialSecurityNumber', 'cobuyerVerifySocialSecurityNumber', 'cobuyerSocialSecurityNumberVerified', ['areaNumber', 'groupNumber', 'serialNumber'], 'cobuyer')">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <input type="text" class="form-control" maxlength="4" placeholder="XXXX" v-model="cobuyerVerifySocialSecurityNumber.serialNumber" @change="verifyInput('socialSecurityNumber', 'cobuyerVerifySocialSecurityNumber', 'cobuyerSocialSecurityNumberVerified', ['areaNumber', 'groupNumber', 'serialNumber'], 'cobuyer')">
                    </div>
                  </div>
                </div>
                <small v-if="!cobuyerSocialSecurityNumberVerified" class="form-text text-danger">The security social numbers are not the same.</small>
              </div>
            </template>
          </div>
        </div>
        <template v-if="cobuyerAccepted">
          <hr>
          <!-- Co-buyer Address -->
          <div class="px-5 py-4">
            <p class="font-weight-3 yellow-underline d-inline-block">{{ formData.cobuyerAddress.title }}</p>
            <div class="row">
              <div class="col-12">
                <div class="form-check input-container">
                  <label class="form-check-label" for="cobuyer-address-checkbox" @click.prevent="setValueToPath('this.cobuyerSameAddress', '!this.cobuyerSameAddress')">
                    <input class="form-check-input" type="checkbox" value="" id="cobuyer-address-checkbox" :checked="cobuyerSameAddress">
                    <span class="checkmark"></span>
                    {{ formData.cobuyerAddress.label }}
                  </label>
                </div>
              </div>
            </div>
            <div class="row" v-if="!cobuyerSameAddress">
              <div class="col-md-6">
                <label>{{ formData.cobuyerAddress.address.label }}</label>
                <div class="form-group">
                  <input type="text" class="form-control" :placeholder="formData.cobuyerAddress.address.placeholder" v-model="form.cobuyer.address.address">
                </div>
              </div>
              <div class="col-md-6">
                <label>{{ formData.cobuyerAddress.other.label }}</label>
                <div class="form-group">
                  <input type="text" class="form-control" placeholder="XXXX" v-model="form.cobuyer.address.other">
                </div>
              </div>
              <div class="col-md-6">
                <label>{{ formData.cobuyerAddress.city.label }}</label>
                <div class="form-group">
                  <input type="text" class="form-control" :placeholder="formData.cobuyerAddress.city.placeholder" v-model="form.cobuyer.address.city">
                </div>
              </div>
              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-6">
                    <label>{{ formData.cobuyerAddress.state.label }}</label>
                    <select type="text" class="form-control" v-model="form.cobuyer.address.state">
                      <option value="" disabled selected>{{ formData.cobuyerAddress.state.placeholder }}</option>
                      <option :value="option" v-for="option in formData.cobuyerAddress.state.options">{{ option }}</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label>{{ formData.cobuyerAddress.zipCode.label }}</label>
                    <div class="form-group">
                      <input type="text" class="form-control" placeholder="XXXXX" v-model="form.cobuyer.address.zipCode">
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <label>{{ formData.cobuyerAddress.addressTime.label }}</label>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <select type="text" class="form-control" v-model="form.cobuyer.address.addressTime.year">
                        <option value="" disabled selected>Years</option>
                        <option :value="(year-1)" v-for="year in 81">{{ year-1 }} Year(s)</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <select type="text" class="form-control" v-model="form.cobuyer.address.addressTime.month">
                        <option value="" disabled selected>Months</option>
                        <option :value="(month-1)" v-for="month in 13">{{ month-1 }} Month(s)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <!-- Co-buyer Employment Information -->
          <div class="px-5 py-4">
            <p class="font-weight-3 yellow-underline d-inline-block">{{ formData.cobuyerEmployment.title }}</p>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{ formData.cobuyerEmployment.type.label }}</label>
                  <select type="text" class="form-control" v-model="form.cobuyer.employment.type">
                    <option value="" disabled selected>{{ formData.cobuyerEmployment.type.placeholder }}</option>
                    <option :value="option" v-for="option in formData.cobuyerEmployment.type.options">{{ option }}</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{ formData.cobuyerEmployment.status.label }}</label>
                  <select type="text" class="form-control" v-model="form.cobuyer.employment.status">
                    <option value="" disabled selected>{{ formData.cobuyerEmployment.status.placeholder }}</option>
                    <option :value="option" v-for="option in formData.cobuyerEmployment.status.options">{{ option }}</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{ formData.cobuyerEmployment.name.label }}</label>
                  <input type="text" class="form-control" v-model="form.cobuyer.employment.name" :placeholder="formData.cobuyerEmployment.name.label">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{ formData.cobuyerEmployment.jobTitle.label }}</label>
                  <input type="text" class="form-control" v-model="form.cobuyer.employment.jobTitle" :placeholder="formData.cobuyerEmployment.jobTitle.label">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{ formData.cobuyerEmployment.employerPhone.label }}</label>
                  <input type="text" class="form-control" v-model="form.cobuyer.employment.employerPhone" placeholder="XXX-XXX-XXXX">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{ formData.cobuyerEmployment.workingTime.label }}</label>
                  <div class="row">
                    <div class="col-md-6">
                      <select type="text" class="form-control" v-model="form.cobuyer.employment.workingTime.years">
                        <option value="" disabled selected>Years</option>
                        <option :value="(year-1)" v-for="year in 81">{{ year-1 }} Year(s)</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <select type="text" class="form-control" v-model="form.cobuyer.employment.workingTime.months">
                        <option value="" disabled selected>Months</option>
                        <option :value="(month-1)" v-for="month in 13">{{ month-1 }} Month(s)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{ formData.cobuyerEmployment.grossSalary.label }}</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">$</span>
                    </div>
                    <input type="text" class="form-control m-0" v-model="form.cobuyer.employment.grossSalary">
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{ formData.cobuyerEmployment.incomeFrequency.label }}</label>
                  <div class="row">
                    <div class="col-md-6">
                      <select type="text" class="form-control" v-model="form.cobuyer.employment.incomeFrequency">
                        <option value="" disabled selected>Select</option>
                        <option :value="option" v-for="option in formData.cobuyerEmployment.incomeFrequency.options">{{ option }}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{ formData.cobuyerEmployment.anotherIncome.label }}</label>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="position-relative d-inline-flex cursor-pointer" @click="setValueToPath('this.cobuyerPresentEmploymentAnotherIncome', true)">
                        <div class="border border-secondary styled-radio-checkbox-container mr-3">
                          <div class="bg-secondary styled-radio-checkbox-content" v-if="cobuyerPresentEmploymentAnotherIncome"></div>
                        </div>
                        <span>Yes</span>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="position-relative d-inline-flex cursor-pointer" @click="setValueToPath('this.cobuyerPresentEmploymentAnotherIncome', false)">
                        <div class="border border-secondary styled-radio-checkbox-container mr-3">
                          <div class="bg-secondary styled-radio-checkbox-content" v-if="!cobuyerPresentEmploymentAnotherIncome"></div>
                        </div>
                        <span>No</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <template v-if="cobuyerPresentEmploymentAnotherIncome">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>{{ formData.cobuyerEmployment.anotherIncome.grossIncome.label }}</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                      </div>
                      <input type="text" class="form-control m-0" v-model="form.cobuyer.employment.grossSalary">
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>{{ formData.cobuyerEmployment.anotherIncome.incomeFrequency.label }}</label>
                        <select type="text" class="form-control" v-model="form.cobuyer.employment.anotherIncome.incomeFrequency">
                          <option value="" disabled selected>Select</option>
                          <option :value="option" v-for="option in formData.cobuyerEmployment.anotherIncome.incomeFrequency.options">{{ option }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>{{ formData.cobuyerEmployment.anotherIncome.incomeType.label }}</label>
                        <select type="text" class="form-control" v-model="form.cobuyer.employment.anotherIncome.incomeType">
                          <option value="" disabled selected>Select</option>
                          <option :value="option" v-for="option in formData.cobuyerEmployment.anotherIncome.incomeType.options">{{ option }}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </template>
        <hr>
        <!-- Buyer Consent -->
        <div class="px-5 py-4">
          <p class="font-weight-3 yellow-underline d-inline-block">{{ formData.buyerConsent.title }}</p>
          <div class="py-2">
            <p class="font-weight-3 text-secondary">{{ formData.buyerConsent.regulationB.title }}</p>
            <p class="font-weight-3 text-secondary font-size-1">{{ formData.buyerConsent.regulationB.subtitle }}</p>
            <div class="row">
              <div class="col-12">
                <div class="form-check input-container">
                  <label class="form-check-label" for="buyer-regulationB-checkbox" @click.prevent="setValueToPath('this.buyerConsentRegulationB', '!this.buyerConsentRegulationB')">
                    <input class="form-check-input" type="checkbox" value="" id="buyer-regulationB-checkbox" :checked="buyerConsentRegulationB" required>
                    <span class="checkmark"></span>
                    {{ formData.buyerConsent.regulationB.checkboxText }}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="py-2">
            <p class="font-weight-3 text-secondary">{{ formData.buyerConsent.authorization.title }}</p>
            <p class="font-weight-3 text-secondary font-size-1">{{ formData.buyerConsent.authorization.subtitle.firstText }}<a :href="formData.buyerConsent.authorization.subtitle.policyLink.url">{{ formData.buyerConsent.authorization.subtitle.policyLink.text }}</a>{{ formData.buyerConsent.authorization.subtitle.secondText }}</p>
            <div class="row">
              <div class="col-12">
                <div class="form-check input-container">
                  <label class="form-check-label" for="buyer-authorization-checkbox" @click.prevent="setValueToPath('this.buyerConsentAuthorization', '!this.buyerConsentAuthorization')">
                    <input class="form-check-input" type="checkbox" value="" id="buyer-authorization-checkbox" :checked="buyerConsentAuthorization" required>
                    <span class="checkmark"></span>
                    {{ formData.cobuyerConsent.authorization.checkboxText }}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <template v-if="cobuyerAccepted">
          <hr>
          <!-- Co-Buyer Consent -->
          <div class="px-5 py-4">
            <p class="font-weight-3 yellow-underline d-inline-block">{{ formData.cobuyerConsent.title }}</p>
            <div class="py-2">
              <p class="font-weight-3 text-secondary">{{ formData.cobuyerConsent.regulationB.title }}</p>
              <p class="font-weight-3 text-secondary font-size-1">{{ formData.cobuyerConsent.regulationB.subtitle }}</p>
              <div class="row">
                <div class="col-12">
                  <div class="form-check input-container">
                    <label class="form-check-label" for="buyer-regulationB-checkbox" @click.prevent="setValueToPath('this.coBuyerConsentRegulationB', '!this.coBuyerConsentRegulationB')">
                      <input class="form-check-input" type="checkbox" value="" id="buyer-regulationB-checkbox" :checked="coBuyerConsentRegulationB" :required="cobuyerAccepted">
                      <span class="checkmark"></span>
                      {{ formData.cobuyerConsent.regulationB.checkboxText }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="py-2">
              <p class="font-weight-3 text-secondary">{{ formData.cobuyerConsent.authorization.title }}</p>
              <p class="font-weight-3 text-secondary font-size-1">{{ formData.cobuyerConsent.authorization.subtitle.firstText }}<a :href="formData.cobuyerConsent.authorization.subtitle.policyLink.url">{{ formData.cobuyerConsent.authorization.subtitle.policyLink.text }}</a>{{ formData.cobuyerConsent.authorization.subtitle.secondText }}</p>
              <div class="row">
                <div class="col-12">
                  <div class="form-check input-container">
                    <label class="form-check-label" for="buyer-authorization-checkbox" @click.prevent="setValueToPath('this.coBuyerConsentAuthorization', '!this.coBuyerConsentAuthorization')">
                      <input class="form-check-input" type="checkbox" value="" id="buyer-authorization-checkbox" :checked="coBuyerConsentAuthorization" :required="cobuyerAccepted">
                      <span class="checkmark"></span>
                      {{ formData.cobuyerConsent.authorization.checkboxText }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div class="px-5 pb-5">
          <button type="submit" class="style-button-form-learn py-3 px-4 font-size-2 montserrat-font font-weight-2">
            <div class="pr-3">{{ formData.submitButtonText }}</div>
          </button>
        </div>
      </div>
    </form>
  `,
  props: { formData: Object },
  data() {
    return {
      // Form
      form: {
        // Personal Information
        birthDate: {
          month: '',
          year: '',
          day: '',
        },
        educationLevel: '',
        socialSecurityNumber: {
          areaNumber: '',
          groupNumber: '',
          serialNumber: '',
        },
        // Present Address
        presentAddress: {
          address: '',
          other: '',
          city: '',
          state: '',
          zipCode: '',
          residenceType: '',
          monthlyRent: '',
          addressTime: {
            year: '',
            month: '',
          },
        },
        // Previous Address
        previousAddress: {
          address: '',
          other: '',
          city: '',
          state: '',
          zipCode: '',
          addressTime: {
            year: '',
            month: '',
          },
        },
        // Employment Information
        employmentInformation: {
          // Present Employment
          presentEmployment: {
            type: '',
            status: '',
            name: '',
            jobTitle: '',
            employerPhone: '',
            workingTime: {
              years: '',
              months: '',
            },
            grossSalary: '',
            incomeFrequency: '',
            anotherIncome: {
              grossIncome: '',
              incomeFrequency: '',
              incomeType: '',
            },
          },
          // Previous Employment
          previousEmployment: {
            type: '',
            status: '',
            name: '',
            jobTitle: '',
            employerPhone: '',
            workingTime: {
              years: '',
              months: '',
            },
            grossSalary: '',
            incomeFrequency: '',
            anotherIncome: {
              grossIncome: '',
              incomeFrequency: '',
              incomeType: '',
            },
          },
        },
        // Cobuyer Information
        cobuyer: {
          relationship: '',
          educationLevel: '',
          firstName: '',
          lastName: '',
          birthDate: {
            month: '',
            day: '',
            year: '',
          },
          phone: '',
          socialSecurityNumber: {
            areaNumber: '',
            groupNumber: '',
            serialNumber: '',
          },
          address: {
            address: '',
            other: '',
            city: '',
            state: '',
            zipCode: '',
            addressTime: {
              year: '',
              month: '',
            },
          },
          employment: {
            type: '',
            status: '',
            name: '',
            jobTitle: '',
            employerPhone: '',
            workingTime: {
              years: '',
              months: '',
            },
            grossSalary: '',
            incomeFrequency: '',
            anotherIncome: {
              grossIncome: '',
              incomeFrequency: '',
              incomeType: '',
            },
          }
        },
      },
      // Helpers
      date: {
        days: [],
        months: [],
        years: []
      },
      // Personal Information Data
      verifySocialSecurityNumber: {
        areaNumber: '',
        groupNumber: '',
        serialNumber: '',
      },
      socialSecurityNumberVerified: true,
      // Present Employment Data
      buyerPresentEmploymentAnotherIncome: false,
      // Co-buyer Information
      cobuyerAccepted: false,
      cobuyerVerifySocialSecurityNumber: {
        areaNumber: '',
        groupNumber: '',
        serialNumber: '',
      },
      cobuyerSocialSecurityNumberVerified: true,
      // Co-buyer Address
      cobuyerSameAddress: false,
      // Cobuyer Present Employment Data
      cobuyerPresentEmploymentAnotherIncome: false,
      // Buyer consent
      buyerConsentRegulationB: false,
      buyerConsentAuthorization: false,
      // Co-buyer consent
      coBuyerConsentRegulationB: false,
      coBuyerConsentAuthorization: false,
    }
  },
  created() {
    this.getMonthsAndYears()
  },
  methods: {
    getMonthsAndYears() {
      const currentYear = moment().year();
      const years = [];
      for (let index = currentYear; index >= (currentYear-100); index--) {
        years.push(index);
      }
      this.date.years = years;
      this.date.months = moment.months();
    },
    handleMonthSelect(selectedMonth) {
      const selectedMonthNumber = moment().month(selectedMonth).format("MM");
      const monthDaysNumber = moment('2012-' + selectedMonthNumber, 'YYYY-MM').daysInMonth();
      this.date.days = [];
      for (let index = 0; index < monthDaysNumber; index++) {
        this.date.days.push(index+1);
      }
      this.form.birthDate.month = selectedMonth;
    },
    verifyInput(inputName, verifyInputName, verifiedName, childElements, parent) {
      if (childElements) {
        let different = false;
        childElements.forEach(element => {
          if(parent) {
            if (this.form[parent][inputName][element] !== this[verifyInputName][element]) {
              different = true;
            }
          } else {
            if (this.form[inputName][element] !== this[verifyInputName][element]) {
              different = true;
            }
          }
        });
        if(different) {
          this[verifiedName] = false;
          return;
        }
        this[verifiedName] = true;
        return;
      }
      if(parent) {
        if(this.form[parent][inputName] !== this[verifyInputName]) this[verifiedName] = false;
      } else {
        if(this.form[inputName] !== this[verifyInputName]) this[verifiedName] = false;
      }
    },
    setValueToPath(varName, value) {
      eval(varName + '=' + value);
    },
    submitForm() {
      if(this.cobuyerAccepted && this.cobuyerSameAddress) this.form.cobuyer.address = this.form.presentAddress;
      this.$emit('next', this.form);
    }
  },
};