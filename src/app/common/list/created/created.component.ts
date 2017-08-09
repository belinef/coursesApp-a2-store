import {Component} from "@angular/core";
import {Store} from "@ngrx/store";
import {AbstractListComponent} from "../abstract/abstractList";
import {coursesActions} from "../../../Store/actions";
import {Router} from "@angular/router";


@Component({
  selector: 'cdp-courses-list',
  styleUrls: ['../list.component.styles.css'],
  templateUrl: '../list.component.tmpl.html'
})
export class CreatedListComponent extends AbstractListComponent {
  listType: string = 'created';

  constructor(protected store: Store<any>,
              protected router: Router) {
    super();
  }

  deleteCourse(id) {
    this.store.dispatch(new coursesActions.CoursesDeleting({id}));
  }

  editCourse(id) {
    this.router.navigate(['edit', id]);
  }
}
