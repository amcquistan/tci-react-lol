// redux/reducers/authReducer.js

import {
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  AUTH_CHECK_SUCCESS,
  AUTH_CHECK_FAIL,
  LOGOUT_USER
} from '../actions/types';

function initState() {
  return {
    user: null,
    signupMessage: '',
    isAuthenticated: false,
    signUpErrorMessage: '',
    authenticationErrorMessage: ''
  };
}

const initialState = initState();

export default function(state = initialState, action) {
  console.log('authReducer action', action);
  switch(action.type) {
    case SIGNUP_USER_SUCCESS:
      return { ...state, signUpErrorMessage: '' };
    case SIGNUP_USER_FAIL:
      return { ...state, signUpErrorMessage: action.payload.errorMessage };
    case LOGIN_USER_SUCCESS:
      return { ...state, isAuthenticated: true, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, authenticationErrorMessage: action.payload.errorMessage, user: null, isAuthenticated: false };
    case AUTH_CHECK_SUCCESS:
      return { ...state, isAuthenticated: true, user: action.payload };
    case AUTH_CHECK_FAIL:
      const newState = initState();
      newState.authenticationErrorMessage = state.authenticationErrorMessage;
      newState.signUpErrorMessage = state.signUpErrorMessage
      return newState;
    case LOGOUT_USER:
      return initState();
    default:
      return state;
  }
}

