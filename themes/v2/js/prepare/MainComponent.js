import AppraisalScheduleComponent from './AppraisalScheduleComponent';
import OnlineAppraisalComponent from './OnlineAppraisalComponent';

window.onload = function () {
  new Vue({
    el: '#prepare',
    components: {
      appraisalSchedule: AppraisalScheduleComponent,
      onlineAppraisal: OnlineAppraisalComponent,
    }
  });
}
