import { LOAD_USER, SET_USER } from '../types';

export const userReducer = (state = "", action) => {
    switch (action.type) {
        case LOAD_USER: 
            return action.user;
        case SET_USER: 
            return action.userName;

        default: return state;
    }
}
