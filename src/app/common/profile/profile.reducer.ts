import { Action } from '@ngrx/store';
import { ActionTypes } from './profile.actions';

const initalState = () => ({
  passwordForm: {
    isOpen: false,
    strength: '',
    newPass: '',
    confirmPass: false,
    confirmPassValid: false,
    touched: false
  },
  dateChanging: false,
  nameChanging: false,
  profileData: {
    name: '',
    dateOfBirth: '',
    avatar: {
      original: {
        src: ''
      },
      image: {
        src: ''
      }
    },
  },
  profileResetData: {
    name: '',
    dateOfBirth: '',
    avatar: {},
  },
  editedData: {
    dateOfBirth: {
      data: {
        formatted: ''
      }
    },
    name: '',
    avatar: {},
  }
});

export const profileReducer = (state = initalState(), action: Action) => {
  const {type, payload} = action;

  switch (type) {
    case ActionTypes.PROFILE_FETCHED : {
      return Object.assign({}, state, { profileData: payload, profileResetData: payload});
    }
    // NAME
    case ActionTypes.NAME_CHANGING : {
      console.log(state);
      return Object.assign({}, state, { nameChanging: true});
    }
    case ActionTypes.NAME_CHANGED : {
      const { editedData } = state;
      const result = Object.assign({}, editedData, { name: payload });

      return Object.assign({}, state, { editedData: result});
    }
    case ActionTypes.NAME_CONFIRMED : {
      const { profileData, editedData: {
        name
      } } = state;
      const result = Object.assign({}, profileData, { name });

      return Object.assign({}, state, { profileData: result, nameChanging: false});
    }
    case ActionTypes.NAME_CANCEL : {
      return Object.assign({}, state, { nameChanging: false});
    }

    // BIRTHDATE
    case ActionTypes.DATE_CHANGING : {
      return Object.assign({}, state, { dateChanging: true});
    }
    case ActionTypes.DATE_CHANGED : {
      const { editedData } = state;
      const result = Object.assign({}, editedData, { dateOfBirth: payload });

      return Object.assign({}, state, { editedData: result});
    }
    case ActionTypes.DATE_CONFIRMED : {
      const { profileData, editedData: {
        dateOfBirth: {
          data : {
            formatted
          }
        }
      } } = state;
      const result = Object.assign({}, profileData, { dateOfBirth: formatted });

      return Object.assign({}, state, { profileData: result, dateChanging: false});
    }
    case ActionTypes.DATE_CANCEL : {
      return Object.assign({}, state, { dateChanging: false});
    }

    // AVATAR
    case ActionTypes.CHANGE_AVATAR_IMAGE : {
      const { editedData } = state;
      const result = Object.assign({}, editedData, {avatar: payload });

      return Object.assign({}, state, { editedData: result });
    }
    case ActionTypes.CONFIRM_AVATAR_IMAGE : {
      const { profileData, editedData: {
        avatar
      }} = state;
      const result = Object.assign({}, profileData, { avatar });

      return Object.assign({}, state, {profileData: result });
    }

    // Password
    case ActionTypes.TOGGLE_PASSWORD_FORM : {
      const { passwordForm } = state;
      const result = Object.assign({}, passwordForm, { isOpen: payload });

      return Object.assign({}, state, { passwordForm: result });
    }
    case ActionTypes.PASSWORD_CHANGE_STRENGTH : {
      const { passwordForm } = state;
      const result = Object.assign({}, passwordForm, { strength: payload });

      return Object.assign({}, state, { passwordForm: result });
    }
    case ActionTypes.SET_NEW_PASS : {
      const { passwordForm } = state;
      const result = Object.assign({}, passwordForm, { newPass: payload, touched: true });

      return Object.assign({}, state, { passwordForm: result });
    }
    case ActionTypes.SET_CONFIRM_PASS : {
      const { passwordForm } = state;
      const result = Object.assign({}, passwordForm, { confirmPass: payload });

      return Object.assign({}, state, { passwordForm: result });
    }

    default : {
      return state;
    }
  }
};
