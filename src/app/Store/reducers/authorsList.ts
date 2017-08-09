import {Action} from "@ngrx/store";
import {AUTHOR_ADDED, AUTHORS_LOADED, AUTHORS_PENDING, AUTHOR_CLEAR} from "../constants";

const initalState = () => ({
  list: [],
  loading: false
});

export const authorsListReducer = (state = initalState(), action: Action) => {
  const {type, payload} = action;

  switch (type) {
    case AUTHORS_PENDING : {
      return Object.assign({}, initalState(), {loading: true})
    }
    case AUTHORS_LOADED : {
      const list = [...payload];

      return Object.assign({}, {list, loading: false})
    }
    case AUTHOR_ADDED : {
      return Object.assign({}, {list : [...state.list, payload], loading: false})
    }
    case AUTHOR_CLEAR : {
      return Object.assign({}, initalState())
    }
    default : {
      return state
    }
  }
};
