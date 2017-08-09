import { Action } from '@ngrx/store';
import { type } from '../../../util';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  OPEN:           type('[Chat] Open Chat'),
  CLOSE:  type('[Chat] Close Chat'),
  ADMIN:  type('[Chat] Admin in Chat'),
  MESSAGE:  type('[Chat] Admin Message'),
  CLEAR:  type('[Chat] Clear'),
};

export class OpenChat implements Action {
  type = ActionTypes.OPEN;

  constructor() {}
}

export class CloseChat implements Action {
  type = ActionTypes.CLOSE;

  constructor() {}
}

export class AdminStateChange implements Action {
  type = ActionTypes.ADMIN;

  constructor(public payload: boolean) {}
}

export class AdminMessage implements Action {
  type = ActionTypes.MESSAGE;

  constructor(public payload: Object) {}
}

export class ClearAll implements Action {
  type = ActionTypes.CLEAR;

  constructor() {}
}
