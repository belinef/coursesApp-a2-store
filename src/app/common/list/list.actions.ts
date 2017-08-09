import { Action } from '@ngrx/store';
import { type } from '../../util';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  SUBSCRIBED:           type('[List] Subscribtion Finished'),
  SUBSCRIPTION:           type('[List] Subscribtion Process'),
  APPROVING:           type('[List] Approving Process'),
  APPROVED:           type('[List] Approving Finished'),
  REJECTION:           type('[List] Rejection Process'),
  REJECTED:           type('[List] Rejection Finished'),
};

export class SubscribtionFinished implements Action {
  type = ActionTypes.SUBSCRIBED;

  constructor(public payload: {id : string, subscribed: boolean}) {}
}

export class SubscribtionProccess implements Action {
  type = ActionTypes.SUBSCRIPTION;

  constructor(public payload: {id : string, subscribed: boolean}) {}
}

export class ApprovingProccess implements Action {
  type = ActionTypes.APPROVING;

  constructor(public payload: {id : string}) {}
}

export class ApprovingFinished implements Action {
  type = ActionTypes.APPROVED;

  constructor(public payload: {id : string}) {}
}

export class RejectionProccess implements Action {
  type = ActionTypes.REJECTION;

  constructor(public payload: {id : string, reason: string}) {}
}

export class RejectionFinished implements Action {
  type = ActionTypes.REJECTED;

  constructor(public payload: {id : string, reason: string}) {}
}
