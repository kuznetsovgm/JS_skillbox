import { THEME } from '../types';

export function changeTheme(newTheme) {
    return {
        type: THEME,
        payload: newTheme
    };
}