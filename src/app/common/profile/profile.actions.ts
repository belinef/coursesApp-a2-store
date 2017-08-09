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
  FETCH_PROFILE:           type('[Profile] Fetching'),
  PROFILE_FETCHED:           type('[Profile] Fetched'),

  CHANGE_AVATAR_IMAGE:           type('[Profile] Change avatar'),
  CONFIRM_AVATAR_IMAGE:           type('[Profile] Confirm avatar'),
  FETCH_AVATAR_CHANGE:           type('[Profile] Fetch avatar change'),

  NAME_CHANGING:           type('[Profile] Change name'),
  NAME_CHANGED:           type('[Profile] Changed name'),
  NAME_CONFIRMED:           type('[Profile] Comfirmed name'),
  FETCH_NAME_UPDATE:           type('[Profile] Fetch name update'),
  NAME_CANCEL:           type('[Profile] Cancel name'),

  DATE_CHANGING:           type('[Profile] Change birthDate'),
  DATE_CHANGED:           type('[Profile] Changed birthDate'),
  DATE_CONFIRMED:           type('[Profile] Comfirmed birthDate'),
  FETCH_BIRTHDATE_UPDATE:           type('[Profile] Fetch birthDate update'),
  DATE_CANCEL:           type('[Profile] Cancel birthDate'),

  TOGGLE_PASSWORD_FORM:           type('[Profile] Toggle change password form'),
  PASSWORD_CHANGE_STRENGTH:           type('[Profile] change password strength'),
  SET_NEW_PASS:           type('[Profile] set new pass password'),
  SET_CONFIRM_PASS:           type('[Profile] set confirm password'),
  SAVE_PASS:           type('[Profile] save confirm password'),
  PASSWORD_SAVED:           type('[Profile] password saved'),
};

export class FetchProfile implements Action {
  public type = ActionTypes.FETCH_PROFILE;
}

export class FetchedProfile implements Action {
  public type = ActionTypes.PROFILE_FETCHED;

  constructor(public payload: Object) {}
}

export class ChangeAvatarImage implements Action {
  public type = ActionTypes.CHANGE_AVATAR_IMAGE;

  constructor(public payload: string) {}
}

export class ConfirmAvatarImage implements Action {
  public type = ActionTypes.CONFIRM_AVATAR_IMAGE;

  constructor(public payload: Object) {}
}

export class UpdateAvatarOnServer implements Action {
  public type = ActionTypes.FETCH_AVATAR_CHANGE;

  constructor(public payload: {
                  image: string,
                  original: string
              }) {}
}

export class NameChanging implements Action {
  public type = ActionTypes.NAME_CHANGING;
}

export class NameChanged implements Action {
  public type = ActionTypes.NAME_CHANGED;

  constructor(public payload: string) {}
}

export class UpdateNameOnServer implements Action {
  public type = ActionTypes.FETCH_NAME_UPDATE;

  constructor(public payload: string) {}
}

export class NameConfirmed implements Action {
  public type = ActionTypes.NAME_CONFIRMED;

  constructor(public payload: string) {}
}

export class NameCancel implements Action {
  public type = ActionTypes.NAME_CANCEL;
}

export class BirthDateChanging implements Action {
  public type = ActionTypes.DATE_CHANGING;
}

export class BirthDateChanged implements Action {
  public type = ActionTypes.DATE_CHANGED;

  constructor(public payload: any) {}
}

export class BirthDateConfirmed implements Action {
  public type = ActionTypes.DATE_CONFIRMED;
}

export class UpdateBirthDateOnServer implements Action {
  public type = ActionTypes.FETCH_BIRTHDATE_UPDATE;

  constructor(public payload: string) {}
}

export class BirthDateCancel implements Action {
  public type = ActionTypes.DATE_CANCEL;
}

export class SetPasswordIsOpen implements Action {
  public type = ActionTypes.TOGGLE_PASSWORD_FORM;

  constructor (public payload: boolean) {}
}

export class ChangePasswordStrength implements Action {
  public type = ActionTypes.PASSWORD_CHANGE_STRENGTH;

  constructor (public payload: string) {}
}

export class SetNewPassword implements Action {
  public type = ActionTypes.SET_NEW_PASS;

  constructor (public payload: string) {}
}

export class SetConfirmPassword implements Action {
  public type = ActionTypes.SET_CONFIRM_PASS;

  constructor (public payload: string) {}
}
