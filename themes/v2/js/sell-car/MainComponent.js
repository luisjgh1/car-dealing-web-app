import AppraisalScheduleComponent from './AppraisalScheduleComponent';
import OnlineAppraisalComponent from './OnlineAppraisalComponent';

window.onload = function () {
  new Vue({
    el: '#sell-car',
    components: {
      appraisalSchedule: AppraisalScheduleComponent,
      onlineAppraisal: OnlineAppraisalComponent,
    }
  });
}
