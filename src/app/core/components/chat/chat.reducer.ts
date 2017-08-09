import { Action } from "@ngrx/store";
import { ActionTypes } from './chat.actions';

const initalState = () => ({
  open: false,
  adminOnline: false,
  messages: [],
  unreadedMessages: 0
});

export const chatReducer = (state = initalState(), action: Action) => {
  const {type} = action;

  switch (type) {
    case ActionTypes.OPEN : {
      return Object.assign({}, state, {open: true, unreadedMessages: 0})
    }
    case ActionTypes.CLOSE: {
      return Object.assign({}, state, {open: false})
    }
    case ActionTypes.ADMIN: {
      return Object.assign({}, state, {adminOnline: action.payload})
    }
    case ActionTypes.MESSAGE: {
      const unreadedMessages = state.open ? 0 : ++state.unreadedMessages;

      return Object.assign({}, state, {messages: [...state.messages, action.payload], unreadedMessages})
    }
    case ActionTypes.CLEAR: {
      return Object.assign({}, initalState())
    }
    default : {
      return state
    }
  }
};
