import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/toArray";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Actions, Effect, toPayload} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {loginActions, notificationsActions} from "../actions";
import {FETCH_LOGIN, LOG_ERROR, LOG_OUT} from "../constants";
import {LoginService} from "../../core/services/login/login.service";
import {Store} from "@ngrx/store";
import {FetchCountApproved, FetchCountCreated, FetchCountSubscribed} from "../../core/components/header/header.actions";
import { ClearAll } from "../../core/components/chat/chat.actions";
import { AdminClearAll } from "../../core/components/adminChat/adminChat.actions";

@Injectable()
export class LoginEffects {
  constructor(private http: Http,
              private actions$: Actions,
              private loginService: LoginService,
  private store: Store<any>) {
  }

  @Effect()
  fetchLogin$ = this.actions$
    .ofType(FETCH_LOGIN)
    .map(toPayload)
    .switchMap(({user: name, password}) => {
        return this.loginService.checkUser({user: name, password}).map(({logged, error, avatar}) => {
          if (logged) {
            sessionStorage.setItem('login', JSON.stringify({name, logged, error, avatar}));
            this.store.dispatch(new FetchCountSubscribed());
            this.store.dispatch(new FetchCountCreated());
            this.store.dispatch(new FetchCountApproved());

            return new loginActions.loginAction({name, logged, error: false, avatar})
          }
          return new loginActions.loginErrorAction({name, logged, error, avatar})
        })
      }
    );

  @Effect()
  showError$ = this.actions$
    .ofType(LOG_ERROR)
    .map(toPayload)
    .switchMap(({error}) =>
      Observable.of(new notificationsActions.Notifycation({show: true, message: error, type: 'error'}))
    );

  @Effect({dispatch: false})
  logOut = this.actions$
    .ofType(LOG_OUT)
    .switchMap(() => {
      const sub = this.loginService.logOutUser().subscribe(
        () => {
          this.store.dispatch(new ClearAll());
          this.store.dispatch(new AdminClearAll());
        },
        () => ({}),
        () => sub.unsubscribe()
      );
      sessionStorage.setItem('login', JSON.stringify({name: '', logged: false, avatar: ''}));
      return Observable.of({})
    });
}
