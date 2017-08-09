import { Action } from '@ngrx/store';

import {
  LOG_IN,
  LOG_OUT,
  LOG_ERROR,
  FETCH_LOGIN
} from '../constants';

export class loginAction implements Action {
  type = LOG_IN;

  constructor(public payload) {}
}

export class logoutAction implements Action {
  type = LOG_OUT;

  constructor() {}
}

export class loginErrorAction implements Action {
  type = LOG_ERROR;

  constructor(public payload) {}
}

export class fetchLoginAction implements Action {
  type = FETCH_LOGIN;

  constructor(public payload) {}
}
