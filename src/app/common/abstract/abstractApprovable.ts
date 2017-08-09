import {Modal} from "angular2-modal/plugins/bootstrap";
import {Store} from "@ngrx/store";
import { ApprovingProccess, RejectionProccess } from '../list/list.actions';


export abstract class AbstractApprovable {
  protected abstract get modal(): Modal;
  protected abstract get store(): Store<any>;

  rejectCourse(id) {
    this.showPromptModal()
      .catch(err => console.log("ERROR"))
      .then(dialog => dialog.result)
      .then(reason => this.store.dispatch(new RejectionProccess({id, reason})))
      .catch(err => console.log("CANCELED"));
  }

  showPromptModal() {
    return this.modal.prompt()
      .showClose(true)
      .title('Reject Reason')
      .open()
  }

  approveCourse(id) {
    this.store.dispatch(new ApprovingProccess({id}))
  }
}
