export default {
  name: 'contactDetails',
  template: `
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card p-3">
          <form @submit.prevent="submitForm()">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="firstName">{{ formData.firstName.label }}</label>
                  <input type="text" class="form-control" id="firstName" @change="updateFormData('firstName', $event.target.value)" required :placeholder="formData.firstName.placeholder">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="lastName">{{ formData.lastName.label }}</label>
                  <input type="text" class="form-control" id="lastName" @change="updateFormData('lastName', $event.target.value)" required :placeholder="formData.lastName.placeholder">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="email">{{ formData.email.label }}</label>
                  <input type="email" class="form-control" id="email" @change="updateFormData('email', $event.target.value)" required :placeholder="formData.email.placeholder">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="phone">{{ formData.phone.label }}</label>
                  <input type="tel" class="form-control" id="phone" @change="updateFormData('phone', $event.target.value)" required :placeholder="formData.phone.placeholder">
                </div>
              </div>
              <div class="d-flex justify-content-center w-100 button-sm">
                <button type="submit" class="style-button-form-learn m-0">Next</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  props: { formData: Object },
  data() {
    return {
    }
  },
  methods: {
    updateFormData(field, value) {
      this.$emit('changed', { field: field, value: value })
    },
    submitForm() {
      this.$emit('next');
    }
  },
};