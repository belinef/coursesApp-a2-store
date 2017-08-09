import { Action } from '@ngrx/store';

import {
  AUTHORS_PENDING,
  AUTHORS_LOADED,
  AUTHOR_ADDED,
  AUTHOR_CLEAR,
  FETCH_AUTHORS,
  AUTHOR_ADDING
} from '../constants';

export class AuthorsFetching implements Action {
  type = FETCH_AUTHORS;

  constructor(public payload) {}
}

export class AuthorsPending implements Action {
  type = AUTHORS_PENDING;

  constructor() {}
}

export class AuthorsLoaded implements Action {
  type = AUTHORS_LOADED;

  constructor(public payload) {}
}

export class AuthorsAdded implements Action {
  type = AUTHOR_ADDED;

  constructor(public payload) {}
}

export class AuthorsAdding implements Action {
  type = AUTHOR_ADDING;

  constructor(public payload) {}
}

export class AuthorsClear implements Action {
  type = AUTHOR_CLEAR;

  constructor() { }
}
