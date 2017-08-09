import {Action} from "@ngrx/store";

import { ActionTypes } from '../../common/list/list.actions'

export const coursesListReducer = (state = {
                                       courses: [],
                                       loading: false
                                     }, action: Action) => {
  const {type, payload} = action;

  const coursesReduce = {
    COURSES_LOADED: () => {
      const {courses} = payload;
      return Object.assign({},{courses, loading: false})
    },
    COURSES_PENDING: () => {
      return Object.assign({}, {courses: [], loading: true})
    },
    COURSE_DELETE: () => {
      let { courses } = state;

      courses = courses.map((course) => {
        return course.id === payload.id ? Object.assign({},course, {removed: true}): course
      });

      return Object.assign({},{courses, loading: false})
    },
    [ActionTypes.SUBSCRIBED]:()=> {
      let { courses } = state;
      const {id , subscribed} = payload;

      courses = courses.map((course) => {
        return course.id === payload.id ? Object.assign({},course, {subscribed}) : course
      });

      return Object.assign({},{courses, loading: false})
    },

    [ActionTypes.APPROVED]:()=> {
      let { courses } = state;

      courses = courses.map((course) => {
        return course.id === payload.id ? Object.assign({},course, {removed : true}): course
      });

      return Object.assign({},{courses, loading: false})
    },


    [ActionTypes.REJECTED]:()=> {
      let { courses } = state;

      courses = courses.map((course) => {
        return course.id === payload.id ? Object.assign({},course, {rejected : true}): course
      });

      return Object.assign({},{courses, loading: false})
    },

    DELETE_COMPLETE: () => {
      let { courses } = state;

      courses = courses.filter(({removed}) => !removed);

      return Object.assign({},{courses, loading: false})
    },
    DEFAULT: () => state
  };

  return (coursesReduce[type] || coursesReduce.DEFAULT)();
};
