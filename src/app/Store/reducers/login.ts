import {Action} from "@ngrx/store";
import {
  LOG_IN,
  LOG_OUT,
  LOG_ERROR
} from '../constants';

const initalState = () => ({
  name: '',
  logged : false,
  error : false,
  avatar: ''
});

export const loginReducer = (state = initalState(), action: Action) => {
  const {type, payload} = action;

  switch (type) {
    case LOG_IN : {
      return Object.assign({}, state, payload)
    }
    case LOG_OUT : {
      return Object.assign({}, initalState())
    }
    case LOG_ERROR : {
      return Object.assign({}, state, payload)
    }
    default : {
      return state
    }
  }
};
