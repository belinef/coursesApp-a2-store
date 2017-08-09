import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { coursesActions } from '../../Store/actions';

export abstract class AbstractCourseDetailed {
  public abstract pageType : string;
  public currentCourse$ : any;

  protected abstract get activatedRoute() : ActivatedRoute;
  protected abstract get router() : Router;
  protected abstract get store(): Store<any>

  ngOnInit() {
    let sub = this.activatedRoute.params.subscribe(({id}) => {
      if(id) {
        this.store.dispatch(new coursesActions.FetchingSingleCourse({id}))
      } else {
        this.store.dispatch(new coursesActions.EmptyCourse())
      }
    });

    this.store.select('currentCourse').subscribe(course => {
      this.currentCourse$ = course;
    });
  }

  get prettyCourseDuration(): string {
    const {duration} = this.currentCourse$,
      hours = Math.floor(duration / 60),
      minutes = duration % 60;

    return duration ? `${hours || ''} ${hours ? 'hour' : ''}${hours > 1 ? 's' : ''} ${minutes || '0'} min.` : 'not specified';
  }
}
