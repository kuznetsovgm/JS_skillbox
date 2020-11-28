import { INCREMENT, DECREMENT } from '../types';
import { lock, unlock } from './themeActions'

export function increment() {
    return {type: INCREMENT};
}

export function decrement() {
    return {type: DECREMENT};
}

export function asyncIncrement() {
    return function(dispatch) {
        dispatch(lock());
        setTimeout(() => {
            dispatch(increment());
            dispatch(unlock());
        }, 1000);
    }

}