import {Component} from "@angular/core";
import {Store} from "@ngrx/store";
import {AbstractListComponent} from "../abstract/abstractList";


@Component({
  selector: 'cdp-courses-list',
  styleUrls: ['../list.component.styles.css'],
  templateUrl: '../list.component.tmpl.html'
})
export class SubscribedListComponent extends AbstractListComponent {
  listType: string = 'subscribed';

  constructor(protected store: Store<any>) {
    super();
  }
}
