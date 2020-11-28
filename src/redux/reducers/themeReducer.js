import { THEME, LOCK, UNLOCK } from '../types';

const initialState = {
    theme: 'light',
    lock: false,
}

export default function themeReducer(state = initialState, action) {
    if (action.type === THEME) {
        return state = {...state, theme: action.payload};
    }
    if (action.type === LOCK) {
        return {...state, lock: true};
    }
    if (action.type === UNLOCK) {
        return {...state, lock: false};
    }

    return state;
}