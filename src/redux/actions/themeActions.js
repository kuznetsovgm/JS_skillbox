import { THEME, LOCK, UNLOCK } from '../types';

export function changeTheme(newTheme) {
    return {
        type: THEME,
        payload: newTheme
    };
}

export function lock() {
    return {type: LOCK};
}

export function unlock() {
    return {type: UNLOCK};
}