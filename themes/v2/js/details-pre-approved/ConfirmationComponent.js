export default {
  name: 'confirmation',
  template: `
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card px-4 py-5">
          <div class="row">
            <div class="col-md-10 offset-md-1">
              <p class="text-center mb-5">{{ confirmationData.thanksText }} {{ form.firstName }}.<br>{{ confirmationData.confirmationText.firstText }} <span class="font-weight-bold">{{ form.email }}</span> {{ confirmationData.confirmationText.secondText }} {{ form.car }} {{ confirmationData.confirmationText.thirdText }}</p>
              <div class="row">
                <div class="col-md-12">
                  <div class="d-md-flex justify-content-between">
                    <div class="style-button-form-learn">{{ confirmationData.tradeValueButtonText }}</div>
                    <div class="style-button-form-learn yellow-button">{{ confirmationData.testDriveButtonText }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  props: {
    confirmationData: Object,
    form: Object,
  },
};