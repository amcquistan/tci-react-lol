// redux/reducers/listReducer.js

import { 
  FETCH_LISTS_SUCCESS,
  FETCH_LISTS_FAIL,

  CREATE_LIST_SUCCESS,
  CREATE_LIST_FAIL,

  UPDATE_LIST_SUCCESS,
  UPDATE_LIST_FAIL,

  DELETE_LIST_SUCCESS,
  DELETE_LIST_FAIL
 } from "../actions/types";

function initState() {
  return {
    lists: [],
    fetchListErrorMessage: '',
    createListErrorMessage: '',
    updateListErrorMessage: '',
    deleteListErrorMessage: ''
  };
}

function updateState(key, value, oldState = null) {
  const newState = oldState ? { ...oldState } : initState();
  newState[key] = value;
  return newState;
}

const initialState = initState();

export default function(state = initialState, action) {
  console.log('listReducer action', action);

  switch(action.type) {
    case FETCH_LISTS_SUCCESS:
      return updateState('lists', action.payload);
    case FETCH_LISTS_FAIL:
      return updateState('fetchListErrorMessage', action.error.message);
    case CREATE_LIST_SUCCESS:
      return updateState('lists', state.lists.concat([action.payload]));
    case CREATE_LIST_FAIL:
      return updateState('createListErrorMessage', action.error.message, state);
    case UPDATE_LIST_SUCCESS:
      const updatedList = action.payload;
      const listsCopy = state.lists.slice();
      const idx = listsCopy.findIndex((item) => item.id === updatedList.id);
      listsCopy[idx] = updatedList;
      return updateState('lists', listsCopy);
    case UPDATE_LIST_FAIL:
      return updateState('updateListErrorMessage', action.error.message, state);
    case DELETE_LIST_SUCCESS:
      // assume fresh list fetch after successful delete so ... just return empty state
      return initState();
    case DELETE_LIST_FAIL:
      return updateState('deleteListErrorMessage', action.error.message, state);
    default:
      return state;
  }
}
