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
  OPEN:           type('[Header] Open Navigation'),
  CLOSE:  type('[Header] Close Navigation'),
  FETCH_COUNT_CREATED:  type('[Header] Fetch count created'),
  FETCH_COUNT_SUBSCRIBED:  type('[Header] Fetch count subscribed'),
  FETCH_COUNT_APPROVE:  type('[Header] Fetch count approve'),
  COUNT_SUBSCRIBED:  type('[Header] Count subscribed'),
  COUNT_CREATED:  type('[Header] Count created'),
  COUNT_APPROVE:  type('[Header] Count approve'),
};

export class OpenNavigation implements Action {
  type = ActionTypes.OPEN;

  constructor() {}
}

export class CloseNavigation implements Action {
  type = ActionTypes.CLOSE;

  constructor() {}
}

export class FetchCountCreated implements Action {
  type = ActionTypes.FETCH_COUNT_CREATED;

  constructor() {}
}

export class FetchCountSubscribed implements Action {
  type = ActionTypes.FETCH_COUNT_SUBSCRIBED;

  constructor() {}
}

export class FetchCountApproved implements Action {
  type = ActionTypes.FETCH_COUNT_APPROVE;

  constructor() {}
}

export class CountCreatedChange implements Action {
  type = ActionTypes.COUNT_CREATED;

  constructor(public payload: number) {}
}

export class CountSubscribedChange implements Action {
  type = ActionTypes.COUNT_SUBSCRIBED;

  constructor(public payload: number) {}
}

export class CountApproveChange implements Action {
  type = ActionTypes.COUNT_APPROVE;

  constructor(public payload: number) {}
}
