import {Component} from "@angular/core";
import {Store} from "@ngrx/store";
import {AbstractListComponent} from "../abstract/abstractList";
import {Modal} from "angular2-modal/plugins/bootstrap";

import {AbstractApprovable} from '../../abstract/abstractApprovable';
import {mixClass} from '../../../util';

@Component({
  selector: 'cdp-courses-list',
  styleUrls: ['../list.component.styles.css'],
  templateUrl: '../list.component.tmpl.html'
})
export class ToBeApprovedListComponent extends mixClass(AbstractListComponent, AbstractApprovable) {
  listType: string = 'toBeApproved';

  constructor(
    protected store: Store<any>,
    protected modal: Modal) {
    super();
  }
}
