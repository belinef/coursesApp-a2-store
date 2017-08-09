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
import { authorsActions, notificationsActions} from '../actions';
import {FETCH_AUTHORS , AUTHOR_ADDING} from '../constants';
import {AuthorsService} from "../../core/services/authors/authors.service";

@Injectable()
export class AuthorsEffects {
  constructor(
    private http: Http,
    private actions$: Actions,
    private authorsService: AuthorsService,
  ) {}

  @Effect()
  authorsPending$ = this.actions$
    .ofType(FETCH_AUTHORS)
    .switchMap(() =>
      Observable.of(new authorsActions.AuthorsPending())
    );

  @Effect()
  authorsLoading$ = this.actions$
    .ofType(FETCH_AUTHORS)
    .map(toPayload)
    .switchMap((query) => {
        return this.authorsService.searchAuthors(query).map(list => new authorsActions.AuthorsLoaded(list))
      }
    );

  @Effect()
  authorsAdding$ = this.actions$
    .ofType(AUTHOR_ADDING)
    .map(toPayload)
    .switchMap((author) => this.authorsService.createAuthor(author).map(({created, error, name}) => {
          return created ?
            new authorsActions.AuthorsAdded(name) :
            new notificationsActions.Notifycation({show: true, message: error, type : 'error'});
      })
    );
}
