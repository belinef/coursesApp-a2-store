import { Action } from "@ngrx/store";
import { ActionTypes } from './adminChat.actions';

const initalState = () => ({
  whatToShow: 'close',
  usersOnline: [],
  chatWith: '',
  usersChatHistory: {},
  usersUnreadedMessages: {}
});

export const adminChatReducer = (state = initalState(), action: Action) => {
  const {type} = action;

  switch (type) {
    case ActionTypes.SHOW_LIST : {
      return Object.assign({}, state, {whatToShow: 'list', chatWith: ''})
    }
    case ActionTypes.CLOSE_LIST: {
      return Object.assign({}, state, {whatToShow: 'close', chatWith: ''})
    }
    case ActionTypes.SHOW_CHAT: {
      return Object.assign({}, state, {whatToShow: 'chat', chatWith: action.payload})
    }
    case ActionTypes.USERS: {
      return Object.assign({}, state, {usersOnline: [...action.payload]})
    }
    case ActionTypes.UNREADED_MESSAGE: {
      const {usersUnreadedMessages} = state;
      const {user} = action.payload;
      const resultedUnreadedMessages = Object.assign({},
        usersUnreadedMessages,
        { [user] : typeof usersUnreadedMessages[user] === 'number' ? ++usersUnreadedMessages[user] : 1});

      return Object.assign({}, state, {usersUnreadedMessages: resultedUnreadedMessages});
    }

    case ActionTypes.CLEAR_UNREADED_MESSAGE: {
      const {usersUnreadedMessages} = state;
      const {user} = action.payload;
      const resultedUnreadedMessages = Object.assign({},
        usersUnreadedMessages,
        { [user] : 0});

      return Object.assign({}, state, {usersUnreadedMessages: resultedUnreadedMessages});
    }
    case ActionTypes.ADMIN_MESSAGE: {
      const {usersChatHistory} = state;
      const {sendTo, message} = action.payload;
      const resultedHistory = Object.assign({},
        usersChatHistory,
        { [sendTo] : usersChatHistory[sendTo] ? [...usersChatHistory[sendTo], {user: 'admin' , message}] : [{user: 'admin' , message}]});

      return Object.assign({}, state, {usersChatHistory: resultedHistory});
    }
    case ActionTypes.USER_MESSAGE: {
      const {usersChatHistory} = state;
      const {user, message} = action.payload;
      const resultedHistory = Object.assign({},
        usersChatHistory,
        { [user] : usersChatHistory[user] ? [...usersChatHistory[user], {user, message}] : [{user, message}]});

      return Object.assign({}, state, {usersChatHistory: resultedHistory});
    }
    case ActionTypes.CLEAR_ALL: {
      return Object.assign({}, initalState())
    }
    default : {
      return state
    }
  }
};
