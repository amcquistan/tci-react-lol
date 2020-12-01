// redux/reducers/index.js

import { combineReducers } from "redux";
import authReducer from './authReducer';
import listReducer from './listReducer';


const rootReducer = combineReducers({
  auth: authReducer,
  lists: listReducer
});

export default rootReducer;
