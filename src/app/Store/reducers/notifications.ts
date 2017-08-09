import {Action} from "@ngrx/store";
import {NOTIFICATION_SHOW} from "../constants";

const initalState = () => ({
  show: false,
  type: 'info',
  message : 'info'
});

export const notificationsReducer = (state = initalState(), action: Action) => {
  const {type, payload} = action;

  switch (type) {
    case NOTIFICATION_SHOW : {
      return Object.assign({}, state, payload)
    }
    default : {
      return state
    }
  }
};
