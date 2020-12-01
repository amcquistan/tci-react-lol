// redux/actions/listActions.js

import {
  FETCH_LISTS_SUCCESS,
  FETCH_LISTS_FAIL,

  CREATE_LIST_SUCCESS,
  CREATE_LIST_FAIL,

  UPDATE_LIST_SUCCESS,
  UPDATE_LIST_FAIL,

  DELETE_LIST_SUCCESS,
  DELETE_LIST_FAIL
} from "./types";

import axios from 'axios';

export const fetchLists = () => async dispatch => {
  try {
    const resp = await axios.get('/lists/');
    console.log('Fetch lists response', resp);
    dispatch({ type: FETCH_LISTS_SUCCESS, payload: resp.data });
    return resp;
  } catch (e) {
    e.message = e.message || 'Error encountered fetching lists';
    console.log('Error fetching lists', e);
    dispatch({ type: FETCH_LISTS_FAIL, error: e });
    throw e;
  }
};

export const createList = ({ name, completed, items }) => async dispatch => {
  try {
    const resp = await axios.post('/lists/', { name, completed, items });
    console.log('Create list response', resp);
    dispatch({ type: CREATE_LIST_SUCCESS, payload: resp.data });
    return resp;
  } catch (e) {
    e.message = e.message || 'Error encountered creating list';
    console.log('Error creating list', e);
    dispatch({ type: CREATE_LIST_FAIL, error: e });
    throw e;
  }
};

export const updateList = ({ id, name, completed, items }) => async dispatch => {
  try {
    const resp = await axios.put(`/lists/${id}/`, { id, name, completed, items });
    console.log('Update list response', resp);
    dispatch({ type: UPDATE_LIST_SUCCESS, payload: resp.data });
    return resp;
  } catch (e) {
    e.message = e.message || 'Error encountered updating list';
    console.log('Error updating list', e);
    dispatch({ type: UPDATE_LIST_FAIL, error: e });
    throw e;
  }
};

export const deleteList = ({ id }) => async dispatch => {
  try {
    const resp = await axios.delete(`/lists/${id}/`);
    console.log('Delete list response', resp);
    dispatch({ type: DELETE_LIST_SUCCESS });
    return resp;
  } catch (e) {
    e.message = e.message || 'Error encountered deleting list';
    console.log('Error deleting list', e);
    dispatch({ type: DELETE_LIST_FAIL, error: e });
    throw e;
  }
};
