import { INCREMENT, DECREMENT } from '../types';

const initialState = 0;

export default function counterReducer(state = initialState, action) {
    if (action.type === INCREMENT) {
        return ++state;
    }
    if (action.type === DECREMENT) {
        return --state;
    }

    return state;
}