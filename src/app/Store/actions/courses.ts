import { Action } from '@ngrx/store';

import {
  COURSES_LOADED,
  COURSE_DELETE,
  COURSES_PENDING,
  DELETE_COMPLETE,
  FETCH_COURSES,
  FETCH_SEARCH,
  FETCH_SINGLE,
  SINGLE_LOADED,
  SINGLE_UPDATE,
  SINGLE_EMPTY,
  SINGLE_SAVING,
  COURSE_DELETING
} from '../constants';

export class CoursesFetching implements Action {
  type = FETCH_COURSES;

  constructor(public payload: string) {}
}

export class CoursesSearching implements Action {
  type = FETCH_SEARCH;

  constructor(public payload) {}
}

export class CoursesLoaded implements Action {
  type = COURSES_LOADED;

  constructor(public payload) {}
}

export class CoursesPending implements Action {
  type = COURSES_PENDING;

  constructor() { }
}

export class CoursesDelete implements Action {
  type = COURSE_DELETE;

  constructor(public payload) { }
}

export class CoursesDeleted implements Action {
  type = DELETE_COMPLETE;

  constructor() { }
}

export class CoursesDeleting implements Action {
  type = COURSE_DELETING;

  constructor(public payload) { }
}

export class FetchingSingleCourse implements Action {
  type = FETCH_SINGLE;

  constructor(public payload) { }
}

export class SingleCourseLoaded implements Action {
  type = SINGLE_LOADED;

  constructor(public payload) { }
}

export class EmptyCourse implements Action {
  type = SINGLE_EMPTY;

  constructor() { }
}

export class SingleCourseUpdated implements Action {
  type = SINGLE_UPDATE;

  constructor(public payload) { }
}

export class SingleCourseSaving implements Action {
  type = SINGLE_SAVING;

  constructor(public payload) { }
}
