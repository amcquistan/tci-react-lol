// redux/actions/authActions.js

import {
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  AUTH_CHECK_SUCCESS,
  AUTH_CHECK_FAIL,
  LOGOUT_USER,
  REQUEST_CHANGE_PASSWORD_SUCCESS,
  REQUEST_CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL
} from './types';

import axios from 'axios';
import { Auth } from 'aws-amplify';

export const signupUser = ({ email, password }) => async dispatch => {
  try {
    const { user } = await Auth.signUp({ username: email, password, attributes: { email } });
    console.log(user);
    dispatch({ type: SIGNUP_USER_SUCCESS });
    return user;
  } catch (e) {
    e.message = e.message || 'Error signing up';
    dispatch({ type: SIGNUP_USER_FAIL, payload: { errorMessage: e.message }});
    throw e;
  }
};

export const loginUser = ({ email, password }) => async dispatch => {
  try {
    const user = await Auth.signIn(email, password);
    console.log(user);
    dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
    return user;
  } catch (e) {
    e.message = e.message || 'Error logging in';
    dispatch({ type: LOGIN_USER_FAIL, payload: { errorMessage: e.message } });
    throw e;
  }
};

export const logoutUser = () => async dispatch => {
  try {
    await Auth.signOut();
  } catch(e) {
    console.log('Error logging out', e);
    localStorage.clear();
  }
  dispatch({ type: LOGOUT_USER });
};

export const checkAuthStatus = () => async dispatch => {
  try {
    const session = await Auth.currentSession();
    axios.defaults.headers.common['Authorization'] = `Bearer ${session.getAccessToken().jwtToken}`;
    const user = await Auth.currentAuthenticatedUser();
    dispatch({ type: AUTH_CHECK_SUCCESS, payload: user });
    return user;
  } catch(e) {
    dispatch({ type: AUTH_CHECK_FAIL });
    throw e;
  }
};

export const requestChangePassword = ({ email }) => async dispatch => {
  try {
    const response = await Auth.forgotPassword(email);
    dispatch({ type: REQUEST_CHANGE_PASSWORD_SUCCESS });
    return response;
  } catch (e) {
    console.log('Error requsting change of password', e);
    dispatch({ type: REQUEST_CHANGE_PASSWORD_FAIL });
    throw e;
  }
};

export const changePassword = ({ email, code, password }) => async dispatch => {
  try {
    const response = await Auth.forgotPasswordSubmit(email, code, password);
    dispatch({ type: CHANGE_PASSWORD_SUCCESS });
    return response;
  } catch(e) {
    console.log('Error chaning password', e);
    dispatch({ type: CHANGE_PASSWORD_FAIL });
    throw e;
  }
};