import {FormControl} from "@angular/forms";
import {coursesActions} from "../../../Store/actions";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

import { SubscribtionProccess } from '../list.actions';
import { AbstractApprovable } from '../../abstract/abstractApprovable'

export abstract class AbstractListComponent extends AbstractApprovable {
  public courses$: Observable<any>;
  public searchControl = new FormControl();

  protected abstract get store(): Store<any>;
  abstract listType: string;

  public ngOnInit() {
    this.courses$ = this.store.select('courses');
    this.store.dispatch(new coursesActions.CoursesFetching(this.listType));
  }

  onSubscribe({id, subscribed}) {
    this.store.dispatch(new SubscribtionProccess({id, subscribed}));
  }

  handleSearch() {
    const query = this.searchControl.value;

    this.store.dispatch(new coursesActions.CoursesSearching({query, listType: this.listType}));
  }
}
