import {Action} from "@ngrx/store";
import {course} from '../../models/course';
import {SINGLE_UPDATE, SINGLE_LOADED, SINGLE_EMPTY} from '../constants';
import { ActionTypes } from '../../common/list/list.actions'

export const currentCourseReducer = (state = course(), action: Action) => {
  const {type, payload} = action;

  //experement with SWITCH
  switch (type) {
    case SINGLE_LOADED : {
      return Object.assign({}, payload)
    }
    case SINGLE_EMPTY : {
      return Object.assign({}, course())
    }
    case SINGLE_UPDATE : {
      return Object.assign({}, state, payload)
    }
    case ActionTypes.APPROVED : {
      return Object.assign({}, state, {rejected: false, approvable: false})
    }
    case ActionTypes.REJECTED : {
      return Object.assign({}, state, {rejected: true, reason: payload.reason})
    }
    default : {
      return state
    }
  }
};
