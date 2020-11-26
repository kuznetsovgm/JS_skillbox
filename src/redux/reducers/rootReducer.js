import { combineReducers } from 'redux';
import counterReducer from '../reducers/counterReducer';
import themeReducer from '../reducers/themeReducer';

export const rootReducer = combineReducers({counter: counterReducer, theme: themeReducer});
