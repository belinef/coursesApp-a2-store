import {StoreModule} from "@ngrx/store";
import {
  authorsListReducer,
  coursesListReducer,
  currentCourseReducer,
  loginReducer,
  notificationsReducer
} from "./reducers";

import { headerReducer } from '../core/components/header/header.reducer'
import { chatReducer } from '../core/components/chat/chat.reducer'
import { adminChatReducer } from '../core/components/adminChat/adminChat.reducer'
import { profileReducer } from '../common/profile/profile.reducer';

const {name, logged, avatar} = sessionStorage.getItem('login') ? JSON.parse(sessionStorage.getItem('login')) : {
  name: '',
  logged: false,
  avatar: ''
};

export const Store = StoreModule.provideStore({
    courses: coursesListReducer,
    currentCourse: currentCourseReducer,
    authorsList: authorsListReducer,
    notification: notificationsReducer,
    login: loginReducer,
    header: headerReducer,
    chat: chatReducer,
    adminChat: adminChatReducer,
    profile: profileReducer,
  },
  {
    login: {
      name,
      logged,
      error: false,
      avatar
    }
  });
