import { AbstractCourseDetailed } from '../../abstract/singleCourse';
import { Location } from '@angular/common';
import {AuthorsService} from "../../../core/services/authors/authors.service";
import { coursesActions , authorsActions} from '../../../Store/actions';
import moment from 'moment';

export abstract class EditableCourseAbstract extends AbstractCourseDetailed {

  protected abstract get location() : Location;
  protected abstract get authorsService() : AuthorsService;
  public authors$: any;

  constructor() {
    super()
  }

  dateChange(value){
    const date = Date.parse(value);

    this.store.dispatch(new coursesActions.SingleCourseUpdated({date}));
  }

  get humanDate(){
    return moment(this.currentCourse$.date).format('YYYY-MM-DD');
  }

  handleSaveCourse () {
    this.store.dispatch(new coursesActions.SingleCourseSaving(this.currentCourse$));
  }

  handleCancel () {
    this.location.back();
  }

  ngOnInit() {
    super.ngOnInit();

    this.authors$ = this.store.select('authorsList');
  }

  searchAuthor(query) {
    this.store.dispatch(new authorsActions.AuthorsFetching(query));

  }

  addAuthor(author) {
    this.store.dispatch(new authorsActions.AuthorsAdding(author));
  }

  authorsChanged(data) {
    this.inputChange('authors', data);
  }

  inputChange(prop, value) {
    this.store.dispatch(new coursesActions.SingleCourseUpdated({[prop] : value}));
  }
}
