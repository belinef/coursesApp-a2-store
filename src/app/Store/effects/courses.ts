import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect , toPayload} from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { coursesActions, notificationsActions} from '../actions';
import {FETCH_COURSES, COURSE_DELETING, FETCH_SEARCH, FETCH_SINGLE, SINGLE_SAVING} from '../constants';
import {CoursesService} from "../../core/services/courses/courses.service";
import { Router } from '@angular/router';

import { ActionTypes, SubscribtionFinished, ApprovingFinished, RejectionFinished } from '../../common/list/list.actions';

//

@Injectable()
export class CoursesEffects {
  private url: string = '/api/courses';  // URL to web API
  constructor(
    private http: Http,
    private actions$: Actions,
    private coursesService: CoursesService,
    private router : Router
  ) {}

  @Effect()
  coursePending$ = this.actions$
    .ofType(FETCH_COURSES)
    .switchMap(() =>
      Observable.of(new coursesActions.CoursesPending())
    );

  @Effect()
  courseLoading$ = this.actions$
    .ofType(FETCH_COURSES)
    .map(toPayload)
    .switchMap((listType) =>
      this.coursesService.getCourses(listType).map((coursesList) => new coursesActions.CoursesLoaded({ courses: coursesList}))
    );

  @Effect()
  courseRemoving$ = this.actions$
    .ofType(COURSE_DELETING)
    .map(toPayload)
    .switchMap(({id}) =>
      this.coursesService.deleteCourse(id).map(({id}) => new coursesActions.CoursesDelete({id}))
    );


  @Effect()
  courseSearch$ = this.actions$
    .ofType(FETCH_SEARCH)
    .switchMap(() =>
      Observable.of(new coursesActions.CoursesPending())
    );

  @Effect()
  courseSearching$ = this.actions$
    .ofType(FETCH_SEARCH)
    .map(toPayload)
    .switchMap(({query, listType}) =>
      this.coursesService.searchCourses(query, listType).map((coursesList) => new coursesActions.CoursesLoaded({ courses: coursesList}))
    );

  @Effect()
  singleFetching$ = this.actions$
    .ofType(FETCH_SINGLE)
    .map(toPayload)
    .switchMap(({id}) =>
      this.coursesService.getCourseById(id).map((course) => new coursesActions.SingleCourseLoaded(course))
    );

  @Effect()
  singleSaving$ = this.actions$
    .ofType(SINGLE_SAVING)
    .map(toPayload)
    .switchMap(course => {
      return course.id ?
        this.coursesService.updateCourse(course.id, course)
          .map(({id}) => {
              this.router.navigate(['details', id]);

              return new notificationsActions.Notifycation({show: true, message: 'Update success', type : 'success'})
            })
        :
        this.coursesService.createCourse(course)
          .map(({id}) => {
            this.router.navigate(['details', id]);

            return new notificationsActions.Notifycation({show: true, message: 'Saved success', type : 'success'})
          })
      }
    );

  @Effect()
  subscribingFetching$ = this.actions$
    .ofType(ActionTypes.SUBSCRIPTION)
    .map(toPayload)
    .switchMap(({id, subscribed}) => this.coursesService.subscribeCourse(id, subscribed).map(({id, subscribed}) => new SubscribtionFinished({id, subscribed}))
    );

  @Effect()
  approvingFetching$ = this.actions$
    .ofType(ActionTypes.APPROVING)
    .map(toPayload)
    .switchMap(({id}) => this.coursesService.approveCourse(id).map(({id }) => new ApprovingFinished({id}))
    );

  @Effect()
  rejectingFetching$ = this.actions$
    .ofType(ActionTypes.REJECTION)
    .map(toPayload)
    .switchMap(({id, reason}) => this.coursesService.rejectCourse(id, reason).map(({id}) => new RejectionFinished({id, reason}))
    );
}
