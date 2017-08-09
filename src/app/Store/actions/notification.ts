import { Action } from '@ngrx/store';

import {
  NOTIFICATION_SHOW
} from '../constants';

export class Notifycation implements Action {
  type = NOTIFICATION_SHOW;

  constructor(public payload) {}
}
