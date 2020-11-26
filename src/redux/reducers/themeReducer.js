import { THEME } from '../types';

export default function themeReducer(state = 'light', action) {
    if (action.type === THEME) {
        return state = action.payload;
    }

    return state;
}