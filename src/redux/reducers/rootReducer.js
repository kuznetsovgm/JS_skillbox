import { combineReducers } from 'redux';
import { commentReducer } from './commentReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({comments: commentReducer, user: userReducer});
