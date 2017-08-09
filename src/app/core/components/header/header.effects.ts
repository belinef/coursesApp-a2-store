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
import { DELETE_COMPLETE, SINGLE_SAVING } from '../../../Store/constants';
import { CountCreatedChange, CountSubscribedChange, CountApproveChange, ActionTypes} from './header.actions';
import { CoursesService } from "../../services/courses/courses.service";
import { ActionTypes as listActionsTypes} from '../../../common/list/list.actions';

@Injectable()
export class HeaderEffects {
  constructor(
    private http: Http,
    private actions$: Actions,
    private coursesService: CoursesService,
  ) {}

  @Effect()
  fetchingSubscribedCount$ = this.actions$
    .ofType(ActionTypes.FETCH_COUNT_SUBSCRIBED)
    .switchMap(() => {
      return this.coursesService.getCount('subscribed').map((count: number) => new CountSubscribedChange(count))
    });

  @Effect()
  subscribingToggling = this.actions$
    .ofType(listActionsTypes.SUBSCRIBED)
    .switchMap(() => {
      return this.coursesService.getCount('subscribed').map((count: number) => new CountSubscribedChange(count))
    });

  @Effect()
  fetchingCreatedCount$ = this.actions$
    .ofType(ActionTypes.FETCH_COUNT_CREATED)
    .switchMap(() => {
      return this.coursesService.getCount('created').map((count: number) => new CountCreatedChange(count))
      }
    );

  @Effect()
  fetchingApproveCount$ = this.actions$
    .ofType(ActionTypes.FETCH_COUNT_APPROVE)
    .switchMap(() => {
        return this.coursesService.getCount('approve').map((count: number) => new CountApproveChange(count))
      }
    );

  @Effect()
  ApproveCount$ = this.actions$
    .ofType(listActionsTypes.APPROVED)
    .switchMap(() => {
        return this.coursesService.getCount('approve').map((count: number) => new CountApproveChange(count))
      }
    );

  @Effect()
  createdDeleted$ = this.actions$
    .ofType(DELETE_COMPLETE)
    .switchMap(() => {
        return this.coursesService.getCount('created').map((count: number) => new CountCreatedChange(count))
      }
    );

  @Effect()
  authorsAdding$ = this.actions$
    .ofType(SINGLE_SAVING)
    .map(toPayload)
    .switchMap(() => this.coursesService.getCount('created').map((count: number) => new CountCreatedChange(count))
    );
}
