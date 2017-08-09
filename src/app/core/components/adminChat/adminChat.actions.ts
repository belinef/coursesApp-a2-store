import {Action} from "@ngrx/store";
import {type} from "../../../util";

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  SHOW_LIST: type('[AdminChat] Show Users'),
  CLOSE_LIST: type('[AdminChat] Close Users'),
  SHOW_CHAT: type('[AdminChat] Show Chat'),
  USERS: type('[AdminChat] User list changed'),
  USER_MESSAGE: type('[AdminChat] Receive user message'),
  ADMIN_MESSAGE: type('[AdminChat] Receive admin message'),
  UNREADED_MESSAGE: type('[AdminChat] add unreaded count message'),
  CLEAR_UNREADED_MESSAGE: type('[AdminChat] clear unreaded count message'),
  CLEAR_ALL: type('[AdminChat] clear all'),
};

export class OpenUsers implements Action {
  type = ActionTypes.SHOW_LIST;

  constructor() {
  }
}

export class CloseUsers implements Action {
  type = ActionTypes.CLOSE_LIST;

  constructor() {
  }
}

export class OpenChat implements Action {
  type = ActionTypes.SHOW_CHAT;

  constructor(public payload: string) {
  }
}

export class UsersChanged implements Action {
  type = ActionTypes.USERS;

  constructor(public payload: string[]) {
  }
}

export class ReceiveMessage implements Action {
  type = ActionTypes.USER_MESSAGE;

  constructor(public payload: {
                message: string,
                user: string
              }) {
  }
}

export class ReceiveAdminMessage implements Action {
  type = ActionTypes.ADMIN_MESSAGE;

  constructor(public payload: {
                message: string,
                sendTo: string
              }) {
  }
}

export class UnreadedMessage implements Action {
  type = ActionTypes.UNREADED_MESSAGE;

  constructor(public payload: {
                user: string
              }) {
  }
}

export class ClearUnreadedMessage implements Action {
  type = ActionTypes.CLEAR_UNREADED_MESSAGE;

  constructor(public payload: {
                user: string
              }) {
  }
}

export class AdminClearAll implements Action {
  type = ActionTypes.CLEAR_ALL;

  constructor() {}
}
