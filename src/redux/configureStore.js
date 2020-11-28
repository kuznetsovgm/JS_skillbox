import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from './middleware/logger';
import { rootReducer } from './reducers/rootReducer';

export default (initialState) => createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(thunkMiddleware)
    )
);