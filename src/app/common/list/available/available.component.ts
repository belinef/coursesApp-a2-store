import {Component} from "@angular/core";
import {Store} from "@ngrx/store";
import {AbstractListComponent} from "../abstract/abstractList";


@Component({
  selector: 'cdp-courses-list',
  styleUrls: ['../list.component.styles.css'],
  templateUrl: '../list.component.tmpl.html'
})
export class AvailableListComponent extends AbstractListComponent {
  listType: string = 'available';

  constructor(protected store: Store<any>) {
    super();
  }
}
