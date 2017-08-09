import { Action } from "@ngrx/store";
import { ActionTypes } from './header.actions';

const initalState = () => ({
  navigation: 'closed',
  counters : {
    subscribed: 0,
    created: 0,
    approve: 0
  }
});

export const headerReducer = (state = initalState(), action: Action) => {
  const {type} = action;

  switch (type) {
    case ActionTypes.OPEN : {
      return Object.assign({}, state, {navigation: 'open'})
    }
    case ActionTypes.CLOSE: {
      return Object.assign({}, state, {navigation: 'closed'})
    }
    case ActionTypes.COUNT_SUBSCRIBED: {
      const counters = Object.assign({}, state.counters, {subscribed : action.payload});

      return Object.assign({}, state, {counters})
    }
    case ActionTypes.COUNT_CREATED: {
      const counters = Object.assign({}, state.counters, {created : action.payload});

      return Object.assign({}, state, {counters})
    }
    case ActionTypes.COUNT_APPROVE: {
      const counters = Object.assign({}, state.counters, {approve : action.payload});

      return Object.assign({}, state, {counters})
    }
    default : {
      return state
    }
  }
};
